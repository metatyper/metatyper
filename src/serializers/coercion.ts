import { DeSerializerArgsType, SerializerArgsType } from '../metatypes'

/** Serializes values by delegating to the meta type's `castToRawValue` implementation. */
export const CoercionSerializer = {
    name: 'CoercionSerializer',

    serialize: (args: SerializerArgsType) =>
        args.metaTypeImpl ? args.metaTypeImpl.castToRawValue(args) : args.value,
    serializePlaces: ['serialize']
}

/** Deserializes values by delegating to the meta type's `castToType` implementation. */
export const CoercionDeSerializer = {
    name: 'CoercionDeSerializer',

    deserialize: (args: DeSerializerArgsType) =>
        args.metaTypeImpl ? args.metaTypeImpl.castToType(args) : args.value
}
