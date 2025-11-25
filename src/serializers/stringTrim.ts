import { DeSerializerArgsType } from '../metatypes'

/** Deserializer that trims whitespace from string values. */
export const TrimDeSerializer = {
    name: 'TrimDeSerializer',
    deserialize: ({ value }: DeSerializerArgsType) =>
        typeof value === 'string' ? value.trim() : value
}
