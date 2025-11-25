import { ValidatorArgsType } from '../metatypes'

/** Creates a validator ensuring string values match the provided regexp. */
export const RegExpValidatorBuilder = (regexp: RegExp | string) => ({
    name: 'RegExp',
    validate: ({ value }: ValidatorArgsType) => {
        return !value || typeof value !== 'string' || new RegExp(regexp).test(value)
    }
})
