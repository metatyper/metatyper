import { ValidatorArgsType } from '../metatypes'

export const NullableValidator = {
    name: 'Nullable',
    validate: ({ value }: ValidatorArgsType) => {
        if (value === null) {
            return false
        }

        return true
    }
}
