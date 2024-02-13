import { DeSerializerArgsType, SerializerArgsType } from '../metatypes'

export const SubValuesSerializer = {
    name: 'SubValuesSerializer',
    serialize: (args: SerializerArgsType) =>
        args.metaTypeImpl && 'serializeSubValues' in args.metaTypeImpl
            ? (args.metaTypeImpl as any).serializeSubValues(args)
            : args.value
}

export const SubValuesDeSerializer = {
    name: 'SubValuesDeSerializer',
    deserialize: (args: DeSerializerArgsType) =>
        args.metaTypeImpl && 'deserializeSubValues' in args.metaTypeImpl
            ? (args.metaTypeImpl as any).deserializeSubValues(args)
            : args.value
}
