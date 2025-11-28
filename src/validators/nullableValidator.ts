import { ValidatorArgsType, type ValidatorType } from '../metatypes'

/** Validator that rejects `null` values. */
export const NullableValidator = {
    name: 'Nullable',
    validate: ({ value }: ValidatorArgsType) => {
        if (value === null) {
            return false
        }

        return true
    }
} as ValidatorType
