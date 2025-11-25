import { IsMetaObjectSymbol } from '../metaobjects/symbols'

const DeepMapCircularRefSymbol = Symbol.for('[[DeepMapCircularRef]]')

const objectsRefIndexMap = new WeakMap()
const copyToOriginalMap = new WeakMap()

/** Determines whether a value is a plain object/array without meta markers or circular refs. */
export function isPlainObject(value: any) {
    return (
        value instanceof Object &&
        (Reflect.getPrototypeOf(value) === Object.prototype ||
            Reflect.getPrototypeOf(value) === Array.prototype) &&
        !value[IsMetaObjectSymbol] &&
        !deepMap.getCircularRefInfo(value)
    )
}

/**
 * Recursively walks an object/array tree, allowing a processing function to transform nodes.
 * Handles circular references and preserves original object references.
 */
export function deepMap(
    obj: object,
    processFunc: (args: {
        value: any
        origValue: any

        parentObj?: object
        key?: any
        keysChain?: any[]

        rootObj: object
        isRootValue: boolean
    }) => any
) {
    const originalToCopyMap = new WeakMap()

    if (!isPlainObject(obj)) {
        return processFunc({
            value: obj,
            origValue: obj,
            isRootValue: true,
            rootObj: obj
        })
    }

    const newObj: any = Array.isArray(obj) ? [] : {}

    copyToOriginalMap.set(newObj, obj)
    originalToCopyMap.set(obj, newObj)

    let circularIndex = 1
    const processingStack: any[] = [obj]

    while (processingStack.length > 0) {
        const origObj = processingStack.pop()
        const newObj = originalToCopyMap.get(origObj)

        Object.entries<any>(origObj).forEach(([key, value]) => {
            if (isPlainObject(value)) {
                if (!originalToCopyMap.has(value)) {
                    const targetValue: any = Array.isArray(value) ? [] : {}

                    copyToOriginalMap.set(targetValue, value)

                    originalToCopyMap.set(value, targetValue)
                    processingStack.push(value)

                    value = targetValue
                } else {
                    const copyObj = originalToCopyMap.get(value)

                    let index

                    if (!objectsRefIndexMap.has(copyObj)) {
                        index = circularIndex++
                        objectsRefIndexMap.set(copyObj, index)
                    } else {
                        index = objectsRefIndexMap.get(copyObj)
                    }

                    value = {
                        [DeepMapCircularRefSymbol]: {
                            index: index,
                            source: copyObj
                        }
                    }
                }
            }

            newObj[key] = value
        })
    }

    function deepProcess(
        curObj: any,
        depth: number,
        parentObj?: any,
        key?: any,
        keysChain?: any[]
    ) {
        if (!isPlainObject(curObj)) {
            return processFunc({
                value: curObj,
                origValue: curObj instanceof Object ? copyToOriginalMap.get(curObj) : curObj,
                isRootValue: curObj === newObj,
                rootObj: newObj,
                parentObj,
                key,
                keysChain
            })
        }

        if (Array.isArray(curObj)) {
            curObj.forEach((value, i) => {
                curObj[i] = deepProcess(value, depth + 1, curObj, i, [...(keysChain ?? []), i])
            })
        } else {
            Object.entries<any>(curObj).forEach(([key, value]) => {
                curObj[key] = deepProcess(value, depth + 1, curObj, key, [
                    ...(keysChain ?? []),
                    key
                ])
            })
        }

        return processFunc({
            value: curObj,
            origValue: copyToOriginalMap.get(curObj),
            isRootValue: curObj === newObj,
            rootObj: newObj,
            parentObj,
            key,
            keysChain
        })
    }

    return deepProcess(newObj, 0)
}

/** Returns circular reference metadata for a value created by `deepMap`. */
deepMap.getCircularRefInfo = (
    obj: object
): {
    source: object
    index: number
} => {
    return (obj && obj instanceof Object && (obj as any)[DeepMapCircularRefSymbol]) || undefined
}

/** Returns the reference index assigned to a copied object (used for inspection). */
deepMap.getRefIndex = (obj: object): number | undefined => {
    return objectsRefIndexMap.get(obj) ?? undefined
}
