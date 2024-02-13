import { DeSerializerArgsType } from '../metatypes'

const replacer = (value: any, fromValues: any[], toValue: any) => {
    for (const fromValue of fromValues) {
        if (fromValue instanceof Function) {
            if (fromValue(value)) {
                return toValue
            }
        } else {
            if (value === fromValue) {
                return toValue
            }
        }
    }

    return value
}

export const ReplaceValuesDeSerializerBuilder = (fromValues: any[], toValue: any) => ({
    name: 'ReplaceValuesDeSerializer',
    deserialize: (args: DeSerializerArgsType) => replacer(args.value, fromValues, toValue)
})
