import { DeSerializerArgsType, SerializerArgsType } from '../metatypes'

/**
 * Serializer that delegates serialization of entries/children to the meta type implementation.
 * Structural meta types override `serializeSubValues` to customize this behavior.
 */
export const SubValuesSerializer = {
    name: 'SubValuesSerializer',
    serialize: (args: SerializerArgsType) =>
        args.metaTypeImpl && 'serializeSubValues' in args.metaTypeImpl
            ? (args.metaTypeImpl as any).serializeSubValues(args)
            : args.value
}

/**
 * Deserializer counterpart that delegates to `deserializeSubValues` when available on the meta type.
 */
export const SubValuesDeSerializer = {
    name: 'SubValuesDeSerializer',
    deserialize: (args: DeSerializerArgsType) =>
        args.metaTypeImpl && 'deserializeSubValues' in args.metaTypeImpl
            ? (args.metaTypeImpl as any).deserializeSubValues(args)
            : args.value
}
