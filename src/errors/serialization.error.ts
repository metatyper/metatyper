import {
    DeSerializerArgsType,
    DeSerializerType,
    SerializerArgsType,
    SerializerType
} from '../metatypes'
import { inspect } from '../utils'
import { MetaError } from './meta.error'

/** Base class for all serialization/deserialization failures emitted by meta types. */
export abstract class MetaTypeSerializationError extends MetaError {}

/** Arguments captured when a serializer throws. */
export type SerializerErrorArgsType = SerializerArgsType & {
    /** Original error raised inside the serializer, if any. */
    subError?: Error
}

/**
 * Error describing a serializer failure (e.g., coercion, custom serializer).
 * Carries the serializer definition plus context (value, meta type, place).
 */
export class MetaTypeSerializerError extends MetaTypeSerializationError {
    readonly serializer: SerializerType
    readonly serializerErrorArgs: SerializerErrorArgsType

    constructor(serializer: SerializerType, serializerErrorArgs: SerializerErrorArgsType) {
        const value = inspect(serializerErrorArgs.value)
        const metaTypeImpl = serializerErrorArgs.metaTypeImpl
        const place = serializerErrorArgs.place
        const serializerName = serializer['name'] ?? serializer.toString()

        const messageStr = serializerErrorArgs.subError
            ? `; message: ${serializerErrorArgs.subError?.message}`
            : ''

        const message = `Serializer error { serializer: ${serializerName}; value: ${value}; metaType: ${metaTypeImpl}; place: ${place}${messageStr} }`

        super(message)
        this.stack = serializerErrorArgs.subError?.stack ?? this.stack

        this.serializer = serializer
        this.serializerErrorArgs = serializerErrorArgs
    }
}

/** Arguments captured when a deserializer throws. */
export type DeSerializerErrorArgsType = DeSerializerArgsType & {
    /** Original error raised inside the deserializer, if any. */
    subError?: Error
}

/**
 * Error describing a deserializer failure (e.g., coercion, custom deserializer).
 * Carries the deserializer definition plus context (value, meta type, place).
 */
export class MetaTypeDeSerializerError extends MetaTypeSerializationError {
    readonly deserializer: DeSerializerType
    readonly deserializerErrorArgs: DeSerializerErrorArgsType

    constructor(deserializer: DeSerializerType, deserializerErrorArgs: DeSerializerErrorArgsType) {
        const value = inspect(deserializerErrorArgs.value)
        const metaTypeImpl = deserializerErrorArgs.metaTypeImpl
        const place = deserializerErrorArgs.place
        const deserializerName = deserializer['name'] ?? deserializer.toString()

        const messageStr = deserializerErrorArgs.subError
            ? `; message: ${deserializerErrorArgs.subError?.message}`
            : ''
        const message = `DeSerializer error { deserializer: ${deserializerName}; value: ${value}; metaType: ${metaTypeImpl}; place: ${place}${messageStr} }`

        super(message)
        this.stack = deserializerErrorArgs.subError?.stack ?? this.stack

        this.deserializer = deserializer
        this.deserializerErrorArgs = deserializerErrorArgs
    }
}
