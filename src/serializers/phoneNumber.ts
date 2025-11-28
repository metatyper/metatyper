import { type DeSerializerType, type DeSerializerArgsType } from 'src/metatypes/metatypeImpl'

export const PhoneNumberDeSerializer: DeSerializerType = {
    name: 'PhoneNumberSerializer',
    deserialize: ({ value }: DeSerializerArgsType) => {
        if (typeof value === 'string') {
            return value
                .replace(/[^0-9+]/g, '')
                .replace(/^([^+])/, '+$1')
                .replace(/(?!^)\+/g, '')
        }

        return value
    }
}
