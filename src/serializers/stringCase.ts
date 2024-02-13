import { DeSerializerArgsType } from '../metatypes'

export const ToLowerCaseDeSerializer = {
    name: 'ToLowerCaseDeSerializer',
    deserialize: ({ value }: DeSerializerArgsType) =>
        typeof value === 'string' ? value.toLowerCase() : value
}

export const ToUpperCaseDeSerializer = {
    name: 'ToUpperCaseDeSerializer',
    deserialize: ({ value }: DeSerializerArgsType) =>
        typeof value === 'string' ? value.toUpperCase() : value
}
