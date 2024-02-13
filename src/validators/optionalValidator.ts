import { ValidatorArgsType } from '../metatypes'

export const OptionalValidator = {
    name: 'Optional',
    validate: ({ value }: ValidatorArgsType) => {
        if (value === undefined) {
            return false
        }

        return true
    }
}
