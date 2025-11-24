import { DeSerializerArgsType } from '../metatypes'

export const TrimDeSerializer = {
    name: 'TrimDeSerializer',
    deserialize: ({ value }: DeSerializerArgsType) =>
        typeof value === 'string' ? value.trim() : value
}
