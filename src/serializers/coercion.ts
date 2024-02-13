import { DeSerializerArgsType, SerializerArgsType } from '../metatypes'

export const CoercionSerializer = {
    name: 'CoercionSerializer',

    serialize: (args: SerializerArgsType) =>
        args.metaTypeImpl ? args.metaTypeImpl.castToRawValue(args) : args.value,
    serializePlaces: ['serialize']
}

export const CoercionDeSerializer = {
    name: 'CoercionDeSerializer',

    deserialize: (args: DeSerializerArgsType) =>
        args.metaTypeImpl ? args.metaTypeImpl.castToType(args) : args.value
}
