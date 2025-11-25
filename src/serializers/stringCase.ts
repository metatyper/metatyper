import { DeSerializerArgsType } from '../metatypes'

/** Deserializer that lowercases string values. */
export const ToLowerCaseDeSerializer = {
    name: 'ToLowerCaseDeSerializer',
    deserialize: ({ value }: DeSerializerArgsType) =>
        typeof value === 'string' ? value.toLowerCase() : value
}

/** Deserializer that uppercases string values. */
export const ToUpperCaseDeSerializer = {
    name: 'ToUpperCaseDeSerializer',
    deserialize: ({ value }: DeSerializerArgsType) =>
        typeof value === 'string' ? value.toUpperCase() : value
}
