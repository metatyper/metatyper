import { AnyImpl, MetaType, MetaTypeImpl } from '../metatypes'
import { getDescriptorValue, isClass } from '../utils'
import { MetaObjectsHandler } from './handler'
import { InitialClassPropertyDeclarationInfo, MetaArgsType } from './meta'
import { MetaObjectRegistryInfo, MetaObjectsRegistry } from './registry'
import {
    IsMetaObjectSymbol,
    MetaObjectBaseSymbol,
    MetaObjectBuilderSymbol,
    MetaObjectInitialClassDeclarationsSymbol,
    MetaObjectProtoSymbol,
    MetaObjectRegistryInfoSymbol,
    MetaObjectRegistrySymbol
} from './symbols'

/**
 * Constructs meta objects/classes by wrapping plain prototypes with validation/serialization logic.
 * Acts as a factory as well as a registry synchroniser for meta instances.
 */
export class MetaObjectsBuilder {
    protected static _instance = new MetaObjectsBuilder()

    /** Global builder singleton used by `Meta` utilities. */
    static get instance() {
        return this._instance
    }

    /** Overrides the global singleton (mainly for testing/extensibility). */
    static setDefaultBuilderInstance(builder: MetaObjectsBuilder) {
        this._instance = builder
    }

    registry = new MetaObjectsRegistry()
    handler = new MetaObjectsHandler(this)

    /**
     * Creates a meta object/class/function proxy for a given prototype and meta arguments.
     * Exposed via `Meta()` helper.
     */
    build<T extends object>(protoObject?: T, metaArgs?: MetaArgsType): T {
        if (!(protoObject instanceof Object)) {
            protoObject = {} as T
        }

        if (!metaArgs) {
            metaArgs = {}
        }

        const baseObject = this.createBaseObject(protoObject, metaArgs)

        this.setNewRegistryInfo(baseObject, protoObject, metaArgs)
        this.initBaseObject(baseObject, protoObject, metaArgs.initialValues)

        return this.createProxy(baseObject, protoObject)
    }

    /**
     * Clones an existing meta object by reusing its prototype, args and declarations.
     * Returns `null` when called with a non-meta object.
     */
    copy<T extends object>(metaObject: T) {
        const registryInfo = this.registry.get(metaObject)

        if (!registryInfo) return null

        const protoObject = registryInfo.protoObject
        const metaArgs = registryInfo.metaArgs
        const originalBaseObject = registryInfo.baseObject

        const newBaseObject = this.createBaseObject(protoObject, metaArgs)

        this.setNewRegistryInfo(newBaseObject, protoObject, metaArgs)
        this.copyBaseObject(originalBaseObject, newBaseObject, protoObject)

        return this.createProxy(newBaseObject, protoObject) as T
    }

    /**
     * Reconfigures an existing meta object with new meta arguments.
     * Throws when the provided value is not a meta instance.
     */
    configure<T extends object>(metaObject: T, metaArgs: MetaArgsType): T {
        if (getDescriptorValue(metaObject, IsMetaObjectSymbol)) {
            this.setNewRegistryInfo(
                getDescriptorValue(metaObject, MetaObjectBaseSymbol),
                getDescriptorValue(metaObject, MetaObjectProtoSymbol),
                metaArgs
            )
        } else {
            throw new TypeError('You can configure Meta objects only')
        }

        return metaObject
    }

    /**
     * Stores metadata describing declarations defined via `Meta.declare` so builder can replay them later.
     */
    addInitialClassDeclarationInfo(
        clsOrPrototype: Record<keyof any, any>,
        declarationInfo: InitialClassPropertyDeclarationInfo
    ) {
        if (!(clsOrPrototype instanceof Object)) return

        clsOrPrototype[MetaObjectInitialClassDeclarationsSymbol] = {
            ...(clsOrPrototype[MetaObjectInitialClassDeclarationsSymbol] || {}),
            [declarationInfo.propName]: declarationInfo
        }
    }

    protected getInitialClassDeclarations(baseObject: object, protoObject: object) {
        const registryInfo = this.registry.get(baseObject)

        if (!registryInfo) return []

        const initialClassPropertiesDeclarations = registryInfo.initialClassPropertiesDeclarations

        return Object.values<InitialClassPropertyDeclarationInfo>(
            initialClassPropertiesDeclarations || {}
        ).map((declarationInfo) =>
            this.prepareInitialClassDeclarationInfo(baseObject, protoObject, declarationInfo)
        )
    }

    protected prepareInitialClassDeclarationInfo(
        baseObject: object,
        protoObject: object,
        declarationInfo: InitialClassPropertyDeclarationInfo
    ) {
        const descriptor =
            declarationInfo.descriptor ??
            Reflect.getOwnPropertyDescriptor(protoObject, declarationInfo.propName)
        const metaTypeArgs = declarationInfo.metaTypeArgs

        const registryInfo = this.registry.get(baseObject)
        const autoResolveType = registryInfo?.autoResolveMetaTypes

        let metaTypeImpl: MetaTypeImpl | undefined = undefined

        if (declarationInfo.metaTypeImpl) {
            metaTypeImpl = declarationInfo.metaTypeImpl

            if (metaTypeImpl && metaTypeArgs) {
                metaTypeImpl = metaTypeImpl.rebuild(metaTypeArgs)
            }
        } else if (descriptor && MetaType.isMetaType(descriptor.value)) {
            metaTypeImpl = MetaType.getMetaTypeImpl(descriptor.value)

            if (metaTypeImpl && metaTypeArgs) {
                metaTypeImpl = metaTypeImpl.rebuild(metaTypeArgs)
            }

            descriptor.value = undefined
        } else if (autoResolveType) {
            if (declarationInfo.reflectType) {
                const typeConstructor = declarationInfo.reflectType

                if (typeConstructor === Number) {
                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl(1, metaTypeArgs)
                } else if (typeConstructor === String) {
                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl('str', metaTypeArgs)
                } else if (typeConstructor === Boolean) {
                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl(true, metaTypeArgs)
                } else if (typeConstructor === BigInt) {
                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl(BigInt(0), metaTypeArgs)
                } else if (typeConstructor === Date) {
                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl(new Date(), metaTypeArgs)
                } else if (typeConstructor === Array) {
                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl([null], metaTypeArgs) // any[]
                } else if (typeConstructor === Object) {
                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl(null, metaTypeArgs) // any
                } else if (!typeConstructor) {
                    metaTypeImpl = undefined
                } else if (typeConstructor.prototype) {
                    const fakeInstance = Object.create(typeConstructor.prototype)

                    metaTypeImpl = MetaTypeImpl.getMetaTypeImpl(fakeInstance, metaTypeArgs)
                }
            }
        }

        return {
            propName: declarationInfo.propName,
            descriptor,
            declaration: metaTypeImpl ?? AnyImpl.build(metaTypeArgs)
        }
    }

    protected getNewRegistryInfo(
        baseObject: object,
        protoObject: Record<keyof any, any>,
        metaArgs: MetaArgsType
    ) {
        const existsInfo: MetaObjectRegistryInfo | undefined = this.registry.get(baseObject)
        const newInfo: Partial<MetaObjectRegistryInfo> = {}

        newInfo.metaArgs = existsInfo ? { ...existsInfo.metaArgs, ...metaArgs } : { ...metaArgs }
        newInfo.builder = this

        const { name, type } = this.handler.getObjectNameAndType(protoObject, metaArgs)

        newInfo.name = name
        newInfo.type = type

        newInfo.baseObject = existsInfo?.baseObject ?? baseObject
        newInfo.protoObject = existsInfo?.protoObject ?? protoObject
        newInfo.initialClassPropertiesDeclarations =
            existsInfo?.initialClassPropertiesDeclarations ??
            protoObject[MetaObjectInitialClassDeclarationsSymbol]
        newInfo.declarations = existsInfo?.declarations ?? {}

        newInfo.ignoreProps = metaArgs.ignoreProps ?? existsInfo?.ignoreProps ?? []

        newInfo.safe = metaArgs.safe ?? existsInfo?.safe ?? true

        newInfo.changeHandlers = metaArgs.changeHandlers ?? existsInfo?.changeHandlers ?? []
        newInfo.errorHandlers = metaArgs.errorHandlers ?? existsInfo?.errorHandlers ?? []

        newInfo.validationIsActive =
            metaArgs.validationIsActive ?? existsInfo?.validationIsActive ?? true
        newInfo.serializationIsActive =
            metaArgs.serializationIsActive ?? existsInfo?.serializationIsActive ?? true

        newInfo.metaTypesArgs = metaArgs.metaTypesArgs ?? existsInfo?.metaTypesArgs
        newInfo.autoResolveMetaTypes =
            metaArgs.autoResolveMetaTypes ?? existsInfo?.autoResolveMetaTypes ?? true
        newInfo.metaTypesResolver = metaArgs.metaTypesResolver ?? existsInfo?.metaTypesResolver

        newInfo.dynamicDeclarations =
            metaArgs.dynamicDeclarations ?? existsInfo?.dynamicDeclarations ?? true

        newInfo.metaInstanceArgs = metaArgs.metaInstanceArgs ?? existsInfo?.metaInstanceArgs
        newInfo.buildMetaInstance =
            metaArgs.buildMetaInstance ?? existsInfo?.buildMetaInstance ?? true

        return newInfo as MetaObjectRegistryInfo
    }

    protected setNewRegistryInfo(baseObject: object, protoObject: object, metaArgs: MetaArgsType) {
        const newInfo = this.getNewRegistryInfo(baseObject, protoObject, metaArgs)

        this.registry.set(baseObject, newInfo)
    }

    protected getVirtualDescriptor(
        metaObject: object,
        baseObject: object,
        protoObject: object,
        propName: string | symbol
    ) {
        if (propName === IsMetaObjectSymbol) {
            return { value: true, configurable: true, writable: false }
        }

        if (propName === MetaObjectBaseSymbol) {
            return { value: baseObject, configurable: true, writable: false }
        }

        if (propName === MetaObjectProtoSymbol) {
            return { value: protoObject, configurable: true, writable: false }
        }

        if (propName === MetaObjectBuilderSymbol) {
            return { value: this, configurable: true, writable: false }
        }

        if (propName === MetaObjectRegistrySymbol) {
            return {
                value: this.registry,
                configurable: true,
                writable: false
            }
        }

        if (propName === MetaObjectRegistryInfoSymbol) {
            return {
                value: this.registry.get(metaObject),
                configurable: true,
                writable: false
            }
        }
    }

    protected prepareClassInstance<T extends object>(instance: T, Cls: new (...args: any[]) => T) {
        const registryInfo = this.registry.get(Cls)

        if (!registryInfo) return instance

        if (!registryInfo.buildMetaInstance) return instance

        const metaInstanceArgs =
            registryInfo.metaInstanceArgs === undefined || registryInfo.metaInstanceArgs === 'same'
                ? registryInfo.metaArgs
                : registryInfo.metaInstanceArgs

        if (getDescriptorValue(instance, IsMetaObjectSymbol)) {
            if (metaInstanceArgs) instance = this.configure(instance, metaInstanceArgs)
        } else {
            instance = this.build(instance, metaInstanceArgs)
        }

        return instance
    }

    protected getProxyHandler<T extends object>(baseObject: T, protoObject: T): ProxyHandler<T> {
        const builder = this
        const handler = this.handler

        return {
            get: handler.proxyGetValue.bind(handler),
            set: handler.proxySetValue.bind(handler),
            defineProperty: handler.proxyDefineProperty.bind(handler),
            deleteProperty: handler.proxyDeleteProperty.bind(handler),
            has: handler.proxyHas.bind(handler),
            ownKeys: handler.proxyOwnKeys.bind(handler),
            getOwnPropertyDescriptor(targetObject, propName) {
                const virtualDescriptor = builder.getVirtualDescriptor(
                    targetObject,
                    baseObject,
                    protoObject,
                    propName
                )

                if (virtualDescriptor) return virtualDescriptor

                return handler.proxyGetOwnPropertyDescriptor(targetObject, propName)
            },
            construct(target: any, argArray, newTarget: any) {
                const _this: T = Reflect.construct(target, argArray, newTarget)

                return builder.prepareClassInstance(_this, target)
            }
        }
    }

    protected createProxy<T extends object>(baseObject: T, protoObject: T): T {
        return new Proxy<T>(baseObject, this.getProxyHandler(baseObject, protoObject))
    }

    protected createBaseObject<T extends object>(protoObject: T, metaArgs?: MetaArgsType) {
        let baseObject

        if (protoObject instanceof Function) {
            if (isClass(protoObject)) {
                baseObject = this.createMetaClass(protoObject as any, metaArgs) as T
            } else {
                baseObject = this.createMetaFunction(protoObject as any, metaArgs) as T
            }
        } else {
            baseObject = this.createMetaObject(protoObject, metaArgs)
        }

        return baseObject
    }

    protected createMetaClass<T extends new (...args: any[]) => any>(
        ProtoCls: T,
        _metaArgs?: MetaArgsType
    ) {
        const NewCls = class MetaClass extends ProtoCls {}

        Object.defineProperty(NewCls, 'name', {
            value: ProtoCls.name,
            writable: true,
            configurable: true
        })

        return NewCls as T
    }

    protected createMetaFunction<T extends (...args: any[]) => any>(
        protoFunc: T,
        _metaArgs?: MetaArgsType
    ) {
        function metaFunc(this: MetaObjectsBuilder, ...args: any[]): any {
            return protoFunc.apply(this, args)
        }

        Object.setPrototypeOf(metaFunc, protoFunc)

        // extend instance prototype
        metaFunc.prototype = Object.create(protoFunc.prototype)
        metaFunc.prototype.constructor = metaFunc

        Object.defineProperty(metaFunc, 'name', {
            value: protoFunc.name,
            writable: true,
            configurable: true
        })

        return metaFunc as T
    }

    protected createMetaObject<T extends object>(protoObject: T, _metaArgs?: MetaArgsType) {
        let newObj: any

        if (Array.isArray(protoObject)) {
            newObj = []
        } else {
            newObj = {}
        }

        if (protoObject) {
            Object.setPrototypeOf(newObj, protoObject)
        }

        return newObj as T
    }

    protected initWithInitialClassDeclarations(
        baseObject: object,
        protoObject: object,
        initialValues?: Record<keyof any, any>
    ) {
        const initialDeclarations = this.getInitialClassDeclarations(baseObject, protoObject)

        for (const { propName, descriptor, declaration } of initialDeclarations) {
            let newDescriptor = descriptor && { ...descriptor }

            const initialValue = initialValues?.[propName]

            if (initialValue !== undefined) {
                if (!newDescriptor) {
                    newDescriptor = {
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                }

                newDescriptor.value = initialValue
            }

            this.handler.initProp(baseObject, propName, newDescriptor, declaration)
        }
    }

    protected initWithOwnKeys(
        baseObject: object,
        protoObject: object,
        initialValues?: Record<keyof any, any>
    ) {
        for (const propName of Reflect.ownKeys(protoObject)) {
            let newDescriptor = Reflect.getOwnPropertyDescriptor(protoObject, propName)

            const initialValue = initialValues?.[propName]

            if (initialValue !== undefined) {
                if (!newDescriptor) {
                    newDescriptor = {
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                }

                newDescriptor.value = initialValue
            }

            this.handler.initProp(baseObject, propName, newDescriptor)
        }
    }

    protected initBaseObject(
        baseObject: object,
        protoObject: object,
        initialValues?: Record<keyof any, any>
    ) {
        this.initWithInitialClassDeclarations(baseObject, protoObject, initialValues)
        this.initWithOwnKeys(baseObject, protoObject, initialValues)

        this.handler.initBaseObject(baseObject, protoObject)
    }

    protected copyBaseObject(
        originalBaseObject: object,
        newBaseObject: object,
        protoObject: object
    ) {
        this.handler.initBaseObject(newBaseObject, protoObject)
        this.handler.copyBaseObject(originalBaseObject, newBaseObject)
    }
}
