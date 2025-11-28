import { ValidatorArgsType, type ValidatorType } from '../metatypes'

/** Creates a validator ensuring string values match the provided regexp. */
export const RegExpValidatorBuilder = (regexp: RegExp | string) =>
    ({
        name: 'RegExp',
        context: { regexp },
        validate: ({ value }: ValidatorArgsType) => {
            return !value || typeof value !== 'string' || new RegExp(regexp).test(value)
        }
    }) as ValidatorType
