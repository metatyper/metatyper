import { IsMetaObjectSymbol } from '../metaobjects/symbols'
import { deepMap } from './deepMap'

export function inspect(value: any) {
    return deepMap(value, ({ value }: any) => {
        const circularRef = deepMap.getCircularRefInfo(value)

        if (circularRef) {
            return `[Circular *${circularRef.index}]`
        }

        if (typeof value === 'string') {
            return `'${value}'`
        }

        if (typeof value === 'bigint') {
            return `${value}n`
        }

        if (value instanceof Date) {
            return `Date(${value.toISOString()})`
        }

        if (
            value instanceof Object &&
            Object.getOwnPropertyDescriptor(value, IsMetaObjectSymbol)?.value
        ) {
            return `${value}`
        }

        if (value instanceof Function) {
            return `[Function: ${value.name || '(anonymous)'}]`
        }

        if (value instanceof Object) {
            if (
                value.toString !== Object.prototype.toString &&
                value.toString !== Array.prototype.toString
            ) {
                return value.toString()
            }

            const sourceRefIndex = deepMap.getRefIndex(value)

            if (Array.isArray(value)) {
                const arrayStrings = value.map((value) => {
                    return `${value}`
                })

                if (sourceRefIndex !== undefined) {
                    return `<ref *${sourceRefIndex}> [ ${arrayStrings.join(', ')} ]`
                } else {
                    return `[ ${arrayStrings.join(', ')} ]`
                }
            } else {
                const objOwnPropsStrings = Object.entries(value)
                    .sort(([key1], [key2]) => key1.localeCompare(key2))
                    .map(([name, value]) => {
                        return `${name}: ${value}`
                    })

                if (sourceRefIndex !== undefined) {
                    return `<ref *${sourceRefIndex}> { ${objOwnPropsStrings.join(', ')} }`
                } else {
                    return `{ ${objOwnPropsStrings.join(', ')} }`
                }
            }
        }

        return `${value}`
    })
}
