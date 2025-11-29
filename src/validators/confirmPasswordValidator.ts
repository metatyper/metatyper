import { type ValidatorArgsType, type ValidatorType } from '../metatypes'

/** Validator ensuring value is equal to the value of the field with the given name. */
export const ConfirmPasswordValidatorBuilder = (confirmField: string) =>
    ({
        name: 'ConfirmPassword',
        context: { confirmField },
        validate: ({ value, targetObject }: ValidatorArgsType) => {
            if (!targetObject) return true

            if (value == null) return true

            const confirmValue = targetObject[confirmField]

            return value === confirmValue
        }
    }) as ValidatorType
