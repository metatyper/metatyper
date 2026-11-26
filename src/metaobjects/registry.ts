import { MetaTypeArgsType, MetaTypeImpl } from '../metatypes'
import { getDescriptorValue } from '../utils'
import { MetaObjectsBuilder } from './builder'
import {
    InitialClassPropertyDeclarationInfo,
    MetaArgsType,
    MetaChangeHandlerInfoType,
    MetaErrorHandlerInfoType,
    MetaTypesResolver
} from './meta'
import { IsMetaObjectSymbol, MetaObjectBaseSymbol } from './symbols'

/** Classification label used to describe what kind of meta object we are dealing with. */
export type MetaObjectTypeName = 'class' | 'instance' | 'function' | 'array' | 'object'

/** Internal information the builder/handler keep per meta object. */
export type MetaObjectRegistryInfo = {
    /** Meta arguments applied during build. */
    metaArgs: MetaArgsType

    /** Builder instance that created/configures this meta object. */
    builder: MetaObjectsBuilder

    /** Human readable label (used in `toString`). */
    name: string

    /** Classification (class/function/instance/etc). */
    type: MetaObjectTypeName

    /** Actual proxy object exposed to the user. */
    baseObject: object

    /** Original prototype/class/function. */
    protoObject: object

    /** Deferred class property declarations registered via `Meta.declare`. */
    initialClassPropertiesDeclarations: Record<
        string | symbol,
        InitialClassPropertyDeclarationInfo
    >

    /** Current meta type declarations for known properties. */
    declarations: Record<string | symbol, MetaTypeImpl>

    /** Ignored prop list or predicate. */
    ignoreProps: (string | symbol)[] | ((propName: string | symbol) => boolean)

    /** Whether data integrity enforcement is enabled. */
    safe: boolean

    /** Registered change handlers. */
    changeHandlers: MetaChangeHandlerInfoType[]

    /** Registered error handlers. */
    errorHandlers: MetaErrorHandlerInfoType[]

    /** Whether validation is active. */
    validationIsActive: boolean

    /** Whether serialization/deserialization is active. */
    serializationIsActive: boolean

    /** Default meta type arguments or resolver callback. */
    metaTypesArgs: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)

    /** Custom meta type resolver. */
    metaTypesResolver: MetaTypesResolver

    /** Whether auto resolution of types is enabled. */
    autoResolveMetaTypes: boolean

    /** Whether dynamic declarations are allowed. */
    dynamicDeclarations: boolean

    /** Meta arguments used when building instances of meta classes. */
    metaInstanceArgs?: MetaArgsType | 'same'

    /** Whether instances should automatically be wrapped as meta objects. */
    buildMetaInstance?: boolean
}

/** Lightweight registry that keeps metadata for every meta object/base object pair. */
export class MetaObjectsRegistry {
    protected infoMap = new WeakMap<object, MetaObjectRegistryInfo>()

    /** Checks whether registry info exists for the provided proxy or base object. */
    has(metaObjectOrBaseObject: object) {
        let baseObject = metaObjectOrBaseObject

        if (getDescriptorValue(metaObjectOrBaseObject, IsMetaObjectSymbol)) {
            baseObject = getDescriptorValue(metaObjectOrBaseObject, MetaObjectBaseSymbol)
        }

        return this.infoMap.has(baseObject)
    }

    /** Returns a shallow copy of the registry info for the provided proxy/base object. */
    get(metaObjectOrBaseObject: object) {
        let baseObject = metaObjectOrBaseObject

        if (getDescriptorValue(metaObjectOrBaseObject, IsMetaObjectSymbol)) {
            baseObject = getDescriptorValue(metaObjectOrBaseObject, MetaObjectBaseSymbol)
        }

        const info = this.infoMap.get(baseObject)

        return info ? { ...info } : undefined
    }

    /** Stores registry info for the provided proxy/base object. */
    set(metaObjectOrBaseObject: object, info: MetaObjectRegistryInfo) {
        let baseObject = metaObjectOrBaseObject

        if (getDescriptorValue(metaObjectOrBaseObject, IsMetaObjectSymbol)) {
            baseObject = getDescriptorValue(metaObjectOrBaseObject, MetaObjectBaseSymbol)
        }

        return this.infoMap.set(baseObject, info)
    }
}
