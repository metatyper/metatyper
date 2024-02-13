import { ValidatorArgsType } from '../metatypes'

export const RegExpValidatorBuilder = (regexp: RegExp | string) => ({
    name: 'RegExp',
    validate: ({ value }: ValidatorArgsType) => {
        return !value || typeof value !== 'string' || new RegExp(regexp).test(value)
    }
})
