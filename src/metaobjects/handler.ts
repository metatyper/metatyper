import { DeSerializePlaceType, MetaType, MetaTypeImpl } from '../metatypes'
import { inspect, isClass } from '../utils'
import { type MetaObjectsBuilder } from './builder'
import {
    DeSerializeMetaObjectArgsType,
    MetaArgs,
    MetaChangeHandlerArgsType,
    MetaErrorHandlerArgsType,
    MetaTypesResolver,
    SerializeMetaObjectArgsType,
    ValidateMetaObjectArgsType
} from './meta'
import { MetaObjectRegistryInfo, MetaObjectTypeName, MetaObjectsRegistry } from './registry'

export class MetaObjectsHandler {
    protected _builtinIgnoredProps = [
        'length',
        'toString',
        'toLocaleString',
        'propertyIsEnumerable',
        'valueOf',
        'prototype',
        'apply',
        'call',
        'bind',
        'arguments',
        'caller',
        'constructor'
    ]

    get builtinIgnoredProps(): (string | symbol)[] {
        return [...this._builtinIgnoredProps]
    }

    registry: MetaObjectsRegistry

    constructor(public builder: MetaObjectsBuilder) {
        this.registry = builder.registry
    }

    protected emitChangeEvent(args: MetaChangeHandlerArgsType) {
        const registryInfo = this.registry.get(args.baseObject)
        const changeHandlers = registryInfo?.changeHandlers

        if (!Array.isArray(changeHandlers)) return

        for (const handlerInfo of changeHandlers) {
            const actionFilterResult =
                !handlerInfo.actions ||
                (Array.isArray(handlerInfo.actions) && handlerInfo.actions.includes(args.action))

            const propsFilterResult =
                !handlerInfo.props ||
                (Array.isArray(handlerInfo.props) && handlerInfo.props.includes(args.propName))

            if (actionFilterResult && propsFilterResult) {
                handlerInfo.handler(args)
            }
        }
    }

    protected emitErrorEvent(args: MetaErrorHandlerArgsType) {
        const registryInfo = this.registry.get(args.baseObject)
        const errorHandlers = registryInfo?.errorHandlers

        if (!Array.isArray(errorHandlers)) return

        for (const handlerInfo of errorHandlers) {
            const placeFilterResult =
                !handlerInfo.places ||
                (Array.isArray(handlerInfo.places) && handlerInfo.places.includes(args.errorPlace))

            if (placeFilterResult) {
                handlerInfo.handler(args)
            }
        }
    }

    getObjectNameAndType(protoObject: any, metaArgs: MetaArgs) {
        let name: string
        let type: MetaObjectTypeName

        if (isClass(protoObject)) {
            name = `class ${metaArgs?.name ?? protoObject.name}`
            type = 'class'
        } else if (protoObject instanceof Function) {
            name = `function ${metaArgs?.name ?? protoObject.name}`
            type = 'function'
        } else if (this.registry.has(protoObject.constructor)) {
            name = `instance ${metaArgs?.name ?? protoObject.constructor.name}`
            type = 'instance'
        } else {
            const nameStr = metaArgs?.name ? ' ' + metaArgs?.name : ''

            if (Array.isArray(protoObject)) {
                name = `array${nameStr}`
                type = 'array'
            } else {
                name = `object${nameStr}`
                type = 'object'
            }
        }

        return { name, type }
    }

    isIgnoredProp(
        baseObject: Record<keyof any, any>,
        propName: string | symbol,
        registryInfo?: MetaObjectRegistryInfo
    ) {
        if (typeof propName === 'symbol') return true

        const builtinIgnoredProps = this.builtinIgnoredProps

        if (builtinIgnoredProps.includes(propName)) {
            return true
        }

        if (!registryInfo) registryInfo = this.registry.get(baseObject)

        if (!registryInfo) return true

        const ignoreProps = registryInfo?.ignoreProps || []

        if (ignoreProps instanceof Function) {
            return ignoreProps(propName)
        } else {
            return ignoreProps.includes(propName)
        }
    }

    represent(targetObject: any) {
        const registryInfo = this.registry.get(targetObject)

        if (!registryInfo) {
            let name

            if (targetObject instanceof Function) {
                name = isClass(targetObject) ? 'class' : 'function'
            } else {
                name = Array.isArray(targetObject) ? 'array' : 'object'
            }

            if (targetObject.name) {
                name += ' ' + targetObject.name
            }

            const objOwnPropsStrings = Object.entries(targetObject)
                .sort(([key1], [key2]) => key1.localeCompare(key2))
                .map(([name, value]) => `${name} = ${inspect(value)}`)

            let modifier = ''

            if (Object.isFrozen(targetObject)) {
                modifier = 'frozen '
            } else if (Object.isSealed(targetObject)) {
                modifier = 'sealed '
            }

            return `[${modifier}<meta child> ${name}] { ${objOwnPropsStrings.join('; ')} }`
        }

        const metaObjectsInheritedDeclarationsStack = []

        let curObj = targetObject
        let curRegistryInfo: MetaObjectRegistryInfo | undefined = registryInfo

        while (curObj) {
            if (curRegistryInfo) {
                const declarations = curRegistryInfo.declarations
                const descriptors = Object.getOwnPropertyDescriptors(curObj)

                metaObjectsInheritedDeclarationsStack.push({
                    declarations,
                    descriptors
                })
            }

            curObj = Reflect.getPrototypeOf(curObj)
            curRegistryInfo = this.registry.get(curObj)
        }

        const ownDeclarations = metaObjectsInheritedDeclarationsStack[0].declarations

        const allDeclarations: Record<keyof any, MetaTypeImpl> = {}
        const allDescriptors: Record<keyof any, PropertyDescriptor> = {}

        metaObjectsInheritedDeclarationsStack.reverse()

        metaObjectsInheritedDeclarationsStack.forEach(({ declarations, descriptors }) => {
            Object.assign(allDeclarations, declarations)
            Object.assign(allDescriptors, descriptors)
        })

        const inheritedDeclarations: Record<keyof any, MetaTypeImpl> = {}
        const inheritedDescriptors: Record<keyof any, PropertyDescriptor> = {}

        const ownKeys = Object.keys(ownDeclarations || {})
        const inheritedKeys = Object.keys(allDeclarations).filter((key) => !ownKeys.includes(key))

        inheritedKeys.forEach((propName) => {
            inheritedDeclarations[propName] = allDeclarations[propName]
            inheritedDescriptors[propName] = allDescriptors[propName]
        })

        const objOwnDeclarationStrings = Object.entries(ownDeclarations)
            .sort(([key1], [key2]) => key1.localeCompare(key2))
            .filter(([name]) => {
                const descriptor = allDescriptors[name]

                if (!descriptor || descriptor.enumerable) {
                    return true
                }
            })
            .map(([name, value]) => {
                const descriptor = allDescriptors[name]

                let modifier = ''

                if (descriptor && !descriptor.writable) {
                    modifier = 'readonly '
                }

                return `${modifier}${name}: ${value} = ${inspect(targetObject[name])}`
            })

        const objInheritedDeclarationStrings = Object.entries(inheritedDeclarations)
            .sort(([key1], [key2]) => key1.localeCompare(key2))
            .filter(([name]) => {
                const descriptor = allDescriptors[name]

                if (!descriptor || descriptor.enumerable) {
                    return true
                }
            })
            .map(([name, value]) => {
                const descriptor = allDescriptors[name]

                let modifier = ''

                if (descriptor && !descriptor.writable) {
                    modifier = 'readonly '
                }

                return `[${modifier}${name}]: ${value} = ${inspect(targetObject[name])}`
            })

        let modifier = ''

        if (Object.isFrozen(targetObject)) {
            modifier = 'frozen '
        } else if (Object.isSealed(targetObject)) {
            modifier = 'sealed '
        }

        return `[${modifier}<meta> ${registryInfo.name}] { ${objOwnDeclarationStrings.join('; ')}${
            objOwnDeclarationStrings.length > 0 && objInheritedDeclarationStrings.length > 0
                ? '; '
                : ''
        }${objInheritedDeclarationStrings.join('; ')} }`
    }

    initBaseObject(baseObject: Record<keyof any, any>, _protoObject: Record<keyof any, any>) {
        const handler = this

        Object.defineProperty(baseObject, Symbol.for('nodejs.util.inspect.custom'), {
            value: function toString() {
                return handler.represent(this)
            },
            configurable: true
        })
    }

    copyBaseObject(
        originalBaseObject: Record<keyof any, any>,
        newBaseObject: Record<keyof any, any>
    ) {
        const originalRegistryInfo = this.registry.get(originalBaseObject)
        const newRegistryInfo = this.registry.get(newBaseObject)

        if (!originalRegistryInfo || !newRegistryInfo) return null

        Object.assign(newRegistryInfo.declarations, originalRegistryInfo?.declarations)
        Object.assign(newBaseObject, originalBaseObject)
    }

    initProp(
        baseObject: Record<keyof any, any>,
        propName: string | symbol,
        descriptor?: PropertyDescriptor,
        declaration?: MetaTypeImpl
    ) {
        try {
            if (this.isIgnoredProp(baseObject, propName)) {
                return
            }

            if (descriptor && (descriptor.get || descriptor.set)) {
                return
            }

            if (!descriptor) {
                descriptor = {
                    value: undefined,
                    writable: true,
                    enumerable: true,
                    configurable: true
                }
            }

            const registryInfo = this.registry.get(baseObject)

            const metaTypesArgs = registryInfo?.metaTypesArgs
            const autoResolveType = registryInfo?.autoResolveMetaTypes

            if (MetaType.isMetaType(descriptor.value)) {
                descriptor.value = MetaType.getMetaTypeImpl(descriptor.value)
            }

            if (descriptor.value instanceof MetaTypeImpl) {
                declaration = descriptor.value

                descriptor.value = undefined
            }

            if (!declaration && registryInfo) {
                declaration = registryInfo.declarations[propName]
            }

            if (declaration && metaTypesArgs) {
                declaration = declaration.rebuild(metaTypesArgs)
            }

            if (!declaration && registryInfo && autoResolveType) {
                const metaTypeResolver: MetaTypesResolver =
                    registryInfo.metaTypesResolver ||
                    MetaTypeImpl.getMetaTypeImpl.bind(MetaTypeImpl)

                declaration = metaTypeResolver(descriptor.value, metaTypesArgs)
            }

            if (declaration && registryInfo) {
                if (registryInfo.serializationIsActive) {
                    descriptor.value = declaration.deserialize({
                        value: descriptor.value,
                        place: 'init',
                        propName,
                        baseObject,
                        targetObject: baseObject
                    })
                }

                if (registryInfo.validationIsActive) {
                    declaration.validate({
                        value: descriptor.value,
                        propName,
                        baseObject,
                        targetObject: baseObject
                    })
                }

                registryInfo.declarations[propName] = declaration
            } else {
                return
            }

            const result = Reflect.defineProperty(baseObject, propName, descriptor)

            if (!result) {
                throw new TypeError('Unexpected error in MetaObjectsHandler.initProp')
            }

            this.emitChangeEvent({
                action: 'init',
                targetObject: baseObject,
                baseObject,
                propName,
                descriptor,
                declaration
            })
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject: baseObject,
                baseObject,
                errorPlace: 'init'
            })

            throw error
        }
    }

    proxyGetValue(baseObject: object, propName: string | symbol, targetObject: object) {
        try {
            if (propName === 'toString') {
                const value = Reflect.get(baseObject, propName, targetObject)

                // will replace default toString only
                if (Object.toString === value || Object.prototype.toString === value) {
                    const handlerInstance = this

                    return function toString() {
                        return handlerInstance.represent(targetObject)
                    }
                }

                return value
            }

            // ignore meta logic

            const curDescriptor = Reflect.getOwnPropertyDescriptor(baseObject, propName)

            if (!curDescriptor || curDescriptor.get || curDescriptor.set) {
                return Reflect.get(baseObject, propName, targetObject)
            }

            const registryInfo = this.registry.get(baseObject)

            if (!registryInfo || this.isIgnoredProp(baseObject, propName, registryInfo)) {
                return Reflect.get(baseObject, propName, targetObject)
            }

            // prepare value

            const value = curDescriptor.value

            if (registryInfo.serializationIsActive) {
                const declaration = registryInfo.declarations[propName]

                if (declaration) {
                    return declaration.serialize({
                        value,
                        place: 'get',
                        propName,
                        targetObject,
                        baseObject
                    })
                }
            }

            return value
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject,
                baseObject,
                errorPlace: 'get'
            })

            throw error
        }
    }

    proxySetValue(
        baseObject: object,
        propName: string | symbol,
        newValue: any,
        targetObject: object
    ) {
        try {
            if (Object.isFrozen(targetObject)) {
                throw new TypeError(
                    `Cannot set property ${propName.toString()}, object ${targetObject} is frozen`
                )
            }

            const setValue = (newValue: any) => {
                const result = Reflect.set(baseObject, propName, newValue, targetObject)

                if (!result) {
                    throw new TypeError('Unexpected error in MetaObjectsHandler.proxySetValue')
                }

                return result
            }

            let curObject: any = targetObject
            let isMetaObjectInProtoChain = false
            let descriptor: PropertyDescriptor | undefined = undefined

            while (!descriptor && curObject && !isMetaObjectInProtoChain) {
                descriptor = Reflect.getOwnPropertyDescriptor(curObject, propName)

                if (!descriptor) {
                    curObject = Reflect.getPrototypeOf(curObject)
                    isMetaObjectInProtoChain = this.registry.has(curObject)
                }
            }

            if (descriptor) {
                if (descriptor.set) {
                    return setValue(newValue)
                }

                if (descriptor.get || !descriptor.writable) {
                    throw new TypeError(
                        `Cannot assign to read only property '${propName.toString()}' of object '${targetObject}'`
                    )
                }
            }

            setValue(newValue)

            this.emitChangeEvent({
                action: 'set',
                baseObject,
                targetObject,
                propName,
                prevDescriptor: descriptor,
                descriptor: {
                    value: newValue
                }
            })
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject,
                baseObject,
                errorPlace: 'set'
            })

            throw error
        }

        return true
    }

    proxyDefineProperty(
        baseObject: Record<keyof any, any>,
        propName: string | symbol,
        newDescriptor: PropertyDescriptor
    ) {
        try {
            const curDescriptor = Reflect.getOwnPropertyDescriptor(baseObject, propName)

            if (!curDescriptor && !Object.isExtensible(baseObject)) {
                throw new TypeError(
                    `Cannot define property ${propName.toString()}, object ${baseObject} is not extensible`
                )
            }

            if (
                curDescriptor &&
                !curDescriptor.configurable &&
                (newDescriptor.configurable ||
                    (!curDescriptor.writable && newDescriptor.writable) ||
                    (!curDescriptor.writable && 'value' in newDescriptor) ||
                    (!curDescriptor.enumerable && newDescriptor.enumerable) ||
                    curDescriptor.get !== newDescriptor.get ||
                    curDescriptor.set !== newDescriptor.set)
            ) {
                throw new TypeError(`Cannot redefine property: ${propName.toString()}`)
            }

            const defineDescriptor = (newDescriptor: PropertyDescriptor) => {
                const result = Reflect.defineProperty(baseObject, propName, newDescriptor)

                if (!result) {
                    throw new TypeError(
                        'Unexpected error in MetaObjectsHandler.proxyDefineProperty'
                    )
                }

                return result
            }

            const registryInfo = this.registry.get(baseObject)

            if (!registryInfo || this.isIgnoredProp(baseObject, propName, registryInfo)) {
                return defineDescriptor(newDescriptor)
            }

            const declarations = registryInfo.declarations

            if ('value' in newDescriptor) {
                const dynamicDeclarations = registryInfo.dynamicDeclarations
                const autoResolveMetaType = registryInfo.autoResolveMetaTypes
                const prepareMetaTypeArgs = registryInfo.metaTypesArgs

                let needToAddDeclaration = false
                let declaration: MetaTypeImpl | undefined = declarations[propName]
                let newValue = newDescriptor.value
                let place: DeSerializePlaceType = 'set'

                if (MetaType.isMetaType(newValue)) {
                    if (!dynamicDeclarations) {
                        throw new TypeError('You cannot change declarations of the meta object')
                    }

                    declaration = MetaType.getMetaTypeImpl(newValue)

                    if (declaration) {
                        if (prepareMetaTypeArgs) {
                            declaration = declaration.rebuild(prepareMetaTypeArgs)
                        }

                        needToAddDeclaration = true
                    }

                    newValue = undefined
                    place = 'reinit'
                }

                if (!declaration && autoResolveMetaType && dynamicDeclarations) {
                    declaration = MetaTypeImpl.getMetaTypeImpl(newValue, prepareMetaTypeArgs)

                    if (declaration) needToAddDeclaration = true
                }

                // if there is no MetaType for the value, the property will ignore Meta logic
                if (declaration) {
                    if (registryInfo.serializationIsActive) {
                        newValue = declaration.deserialize({
                            value: newValue,
                            place,
                            propName,
                            targetObject: baseObject
                        })
                    }

                    if (registryInfo.validationIsActive) {
                        declaration.validate({
                            value: newValue,
                            propName,
                            targetObject: baseObject
                        })
                    }
                }

                newDescriptor = {
                    ...newDescriptor,
                    value: newValue
                }

                const prevDeclaration = declarations[propName]
                const prevDescriptor = curDescriptor

                if (needToAddDeclaration && declaration) declarations[propName] = declaration

                try {
                    defineDescriptor(newDescriptor)

                    this.emitChangeEvent({
                        action: 'define',
                        targetObject: baseObject,
                        baseObject,
                        propName,
                        prevDescriptor,
                        descriptor: newDescriptor,
                        prevDeclaration,
                        declaration
                    })

                    return true
                } catch (error) {
                    if (needToAddDeclaration) declarations[propName] = prevDeclaration

                    throw error
                }
            } else {
                const curDeclaration = declarations[propName]

                if (curDeclaration && (newDescriptor.get || newDescriptor.set)) {
                    const dynamicDeclarations = registryInfo.dynamicDeclarations

                    if (!dynamicDeclarations) {
                        throw new TypeError('You cannot change the schema of a meta object')
                    }

                    Reflect.deleteProperty(declarations, propName)
                }

                const prevDescriptor = curDescriptor
                const prevDeclaration = curDeclaration

                defineDescriptor(newDescriptor)

                this.emitChangeEvent({
                    action: 'define',
                    targetObject: baseObject,
                    baseObject,
                    propName,
                    prevDescriptor,
                    descriptor: newDescriptor,
                    prevDeclaration,
                    declaration: declarations[propName]
                })
            }
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject: baseObject,
                baseObject,
                errorPlace: 'define'
            })

            throw error
        }

        return true
    }

    proxyDeleteProperty(baseObject: Record<keyof any, any>, propName: string | symbol) {
        try {
            const curDescriptor = Reflect.getOwnPropertyDescriptor(baseObject, propName)

            if (curDescriptor && !curDescriptor.configurable) {
                throw new TypeError(
                    `Cannot delete property '${propName.toString()}' of ${baseObject}`
                )
            }

            const deleteProperty = () => {
                const result = Reflect.deleteProperty(baseObject, propName)

                if (!result) {
                    throw new TypeError(
                        'Unexpected error in MetaObjectsHandler.proxyDefineProperty'
                    )
                }

                return result
            }

            const registryInfo = this.registry.get(baseObject)

            if (
                !curDescriptor ||
                curDescriptor.get ||
                curDescriptor.set ||
                !registryInfo ||
                this.isIgnoredProp(baseObject, propName, registryInfo)
            ) {
                return deleteProperty()
            }

            const dynamicDeclarations = registryInfo.dynamicDeclarations

            if (!dynamicDeclarations) {
                throw new TypeError('You cannot change declarations of the meta object')
            }

            deleteProperty()

            const declarations = registryInfo.declarations
            const curDeclaration = declarations[propName]

            if (curDeclaration) {
                Reflect.deleteProperty(declarations, propName)
            }

            this.emitChangeEvent({
                action: 'delete',
                targetObject: baseObject,
                baseObject,
                propName,
                prevDescriptor: curDescriptor,
                prevDeclaration: curDeclaration,
                declaration: curDeclaration
            })
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject: baseObject,
                baseObject,
                errorPlace: 'delete'
            })

            throw error
        }

        return true
    }

    proxyHas(targetObject: Record<keyof any, any>, propName: string | symbol) {
        return Reflect.has(targetObject, propName)
    }

    proxyOwnKeys(targetObject: Record<keyof any, any>) {
        return Reflect.ownKeys(targetObject)
    }

    proxyGetOwnPropertyDescriptor(
        targetObject: Record<keyof any, any>,
        propName: string | symbol
    ) {
        return Reflect.getOwnPropertyDescriptor(targetObject, propName)
    }

    validate(
        targetObject: Record<keyof any, any>,
        rawObject: Record<keyof any, any>,
        validateArgs?: ValidateMetaObjectArgsType
    ) {
        const registryInfo = this.registry.get(targetObject)

        const objDeclarations = registryInfo ? registryInfo.declarations : targetObject
        const baseObject = registryInfo ? registryInfo.baseObject : targetObject

        try {
            Object.entries<any>(objDeclarations).forEach(([propName, declarationOrValue]) => {
                const value = rawObject[propName]

                if (MetaType.isMetaType(declarationOrValue)) {
                    declarationOrValue = MetaType.getMetaTypeImpl(declarationOrValue)
                }

                if (!(declarationOrValue instanceof MetaTypeImpl)) {
                    declarationOrValue = MetaTypeImpl.getMetaTypeImpl(
                        declarationOrValue,
                        validateArgs?.metaArgs?.metaTypesArgs
                    )
                }

                if (declarationOrValue) {
                    const result = (declarationOrValue as MetaTypeImpl).validate({
                        ...(validateArgs ?? {}),
                        value,
                        propName,
                        targetObject,
                        baseObject
                    })

                    if (!result) {
                        return false
                    }
                }
            })
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject,
                baseObject,
                errorPlace: 'validate'
            })

            throw error
        }

        return true
    }

    serialize(targetObject: Record<keyof any, any>, serializeArgs?: SerializeMetaObjectArgsType) {
        const registryInfo = this.registry.get(targetObject)

        if (!registryInfo) return null

        const baseObject = registryInfo.baseObject
        const objDeclarations = registryInfo.declarations

        try {
            const raw: Record<string, any> = {}

            Object.entries<MetaTypeImpl>(objDeclarations).forEach(([propName, declaration]) => {
                const value = Reflect.get(baseObject, propName)

                if (registryInfo.serializationIsActive) {
                    raw[propName] = declaration.serialize({
                        ...serializeArgs,
                        value,
                        place: 'serialize',
                        propName,
                        targetObject,
                        baseObject
                    })
                } else {
                    raw[propName] = value
                }
            })

            return raw
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject,
                baseObject,
                errorPlace: 'serialize'
            })

            throw error
        }
    }

    deserialize(
        targetObject: Record<keyof any, any>,
        rawObject: Record<keyof any, any>,
        deserializeArgs?: DeSerializeMetaObjectArgsType
    ) {
        const registryInfo = this.registry.get(targetObject)

        if (!registryInfo) return null

        const baseObject = registryInfo.baseObject
        const declarations = registryInfo.declarations
        const serializationIsActive = registryInfo.serializationIsActive
        const validationIsActive = registryInfo.validationIsActive

        try {
            Object.entries<MetaTypeImpl>(declarations).forEach(([propName, declaration]) => {
                let value = rawObject[propName]

                if (value !== undefined) {
                    if (serializationIsActive) {
                        value = declaration.deserialize({
                            ...deserializeArgs,
                            value,
                            place: 'deserialize',
                            propName,
                            targetObject,
                            baseObject
                        })
                    }

                    if (validationIsActive) {
                        declaration.validate({ value, propName, targetObject })
                    }

                    const prevDescriptor = Reflect.getOwnPropertyDescriptor(targetObject, propName)

                    const result = Reflect.set(baseObject, propName, value)

                    if (!result) {
                        throw new TypeError('Unexpected error in MetaObjectsHandler.deserialize')
                    }

                    this.emitChangeEvent({
                        action: 'deserialize',
                        targetObject,
                        baseObject,
                        propName,
                        prevDescriptor,
                        descriptor: { value },
                        prevDeclaration: declaration,
                        declaration
                    })
                }
            })

            return targetObject
        } catch (error) {
            this.emitErrorEvent({
                error: error as Error,
                targetObject,
                baseObject,
                errorPlace: 'deserialize'
            })

            throw error
        }
    }

    copy<T extends object>(targetObject: T) {
        const registryInfo = this.registry.get(targetObject)

        if (!registryInfo) return null

        return registryInfo.builder.copy(targetObject) as T
    }
}
