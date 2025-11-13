import {
    DeSerializerArgsType,
    DeSerializerType,
    SerializerArgsType,
    SerializerType
} from '../metatypes'
import { inspect } from '../utils'
import { MetaError } from './meta.error'

export abstract class MetaTypeSerializationError extends MetaError {}

export type SerializerErrorArgsType = SerializerArgsType & {
    subError?: Error
}

export class MetaTypeSerializerError extends MetaTypeSerializationError {
    readonly serializer: SerializerType
    readonly serializerErrorArgs: SerializerErrorArgsType

    constructor(serializer: SerializerType, serializerErrorArgs: SerializerErrorArgsType) {
        const value = inspect(serializerErrorArgs.value)
        const metaTypeImpl = serializerErrorArgs.metaTypeImpl
        const place = serializerErrorArgs.place
        const deserializerName = serializer['name'] ?? serializer.toString()

        const message = `Serializer error { serializer: ${deserializerName}; value: ${value}; metaType: ${metaTypeImpl}; place: ${place};  message: ${serializerErrorArgs.subError?.message ?? 'Serialization failed'} }`

        super(message)
        this.stack = serializerErrorArgs.subError?.stack ?? this.stack

        this.serializer = serializer
        this.serializerErrorArgs = serializerErrorArgs
    }
}

export type DeSerializerErrorArgsType = DeSerializerArgsType & {
    subError?: Error
}

export class MetaTypeDeSerializerError extends MetaTypeSerializationError {
    readonly deserializer: DeSerializerType
    readonly deserializerErrorArgs: DeSerializerErrorArgsType

    constructor(deserializer: DeSerializerType, deserializerErrorArgs: DeSerializerErrorArgsType) {
        const value = inspect(deserializerErrorArgs.value)
        const metaTypeImpl = deserializerErrorArgs.metaTypeImpl
        const place = deserializerErrorArgs.place
        const deserializerName = deserializer['name'] ?? deserializer.toString()

        const message = `DeSerializer error { deserializer: ${deserializerName}; value: ${value}; metaType: ${metaTypeImpl}; place: ${place}; message: ${deserializerErrorArgs.subError?.message ?? 'Deserialization failed'} }`

        super(message)
        this.stack = deserializerErrorArgs.subError?.stack ?? this.stack

        this.deserializer = deserializer
        this.deserializerErrorArgs = deserializerErrorArgs
    }
}
