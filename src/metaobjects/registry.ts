import { MetaTypeArgsType, MetaTypeImpl } from '../metatypes'
import { getDescriptorValue } from '../utils'
import { MetaObjectsBuilder } from './builder'
import {
    InitialClassPropertyDeclarationInfo,
    MetaArgs,
    MetaChangeHandlerInfoType,
    MetaErrorHandlerInfoType,
    MetaTypesResolver
} from './meta'
import { IsMetaObjectSymbol, MetaObjectBaseSymbol } from './symbols'

export type MetaObjectTypeName = 'class' | 'instance' | 'function' | 'array' | 'object'

export type MetaObjectRegistryInfo = {
    metaArgs: MetaArgs
    builder: MetaObjectsBuilder

    name: string
    type: MetaObjectTypeName
    baseObject: object
    protoObject: object

    initialClassPropertiesDeclarations: Record<
        string | symbol,
        InitialClassPropertyDeclarationInfo
    >
    declarations: Record<string | symbol, MetaTypeImpl>

    ignoreProps: (string | symbol)[] | ((propName: string | symbol) => boolean)
    validationIsActive: boolean
    serializationIsActive: boolean

    changeHandlers: MetaChangeHandlerInfoType[]
    errorHandlers: MetaErrorHandlerInfoType[]

    metaTypesArgs: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    metaTypesResolver: MetaTypesResolver
    autoResolveMetaTypes: boolean
    dynamicDeclarations: boolean

    metaInstanceArgs?: MetaArgs | 'same'
    buildMetaInstance?: boolean
}

export class MetaObjectsRegistry {
    protected infoMap = new WeakMap<object, MetaObjectRegistryInfo>()

    has(metaObjectOrBaseObject: object) {
        let baseObject = metaObjectOrBaseObject

        if (getDescriptorValue(metaObjectOrBaseObject, IsMetaObjectSymbol)) {
            baseObject = getDescriptorValue(metaObjectOrBaseObject, MetaObjectBaseSymbol)
        }

        return this.infoMap.has(baseObject)
    }

    get(metaObjectOrBaseObject: object) {
        let baseObject = metaObjectOrBaseObject

        if (getDescriptorValue(metaObjectOrBaseObject, IsMetaObjectSymbol)) {
            baseObject = getDescriptorValue(metaObjectOrBaseObject, MetaObjectBaseSymbol)
        }

        const info = this.infoMap.get(baseObject)

        return info ? { ...info } : undefined
    }

    set(metaObjectOrBaseObject: object, info: MetaObjectRegistryInfo) {
        let baseObject = metaObjectOrBaseObject

        if (getDescriptorValue(metaObjectOrBaseObject, IsMetaObjectSymbol)) {
            baseObject = getDescriptorValue(metaObjectOrBaseObject, MetaObjectBaseSymbol)
        }

        return this.infoMap.set(baseObject, info)
    }
}
