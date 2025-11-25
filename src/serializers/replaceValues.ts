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

/**
 * Creates a deserializer that replaces specific values/functions with a single target value.
 *
 * @param fromValues - List of literal values or predicate functions to match.
 * @param toValue - Replacement value.
 */
export const ReplaceValuesDeSerializerBuilder = (fromValues: any[], toValue: any) => ({
    name: 'ReplaceValuesDeSerializer',
    deserialize: (args: DeSerializerArgsType) => replacer(args.value, fromValues, toValue)
})
