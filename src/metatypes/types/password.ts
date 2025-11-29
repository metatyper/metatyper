import { ConfirmPasswordValidatorBuilder } from '../../validators/confirmPasswordValidator'
import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/** Additional options supported by the `PASSWORD` meta type. */
export type PasswordMetaTypeArgs<
    T = PASSWORD,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = StringMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> & {
    /** Require at least one lowercase letter [a-z] (defaults to true). */
    requireLowercase?: boolean
    /** Require at least one uppercase letter [A-Z] (defaults to true). */
    requireUppercase?: boolean
    /** Require at least one digit [0-9] (defaults to true). */
    requireNumber?: boolean
    /** Require at least one non-alphanumeric character (defaults to true). */
    requireSpecial?: boolean
    /** The name of the field that is used to confirm the password. */
    confirmField?: string
}

/**
 * Creates a password meta type with configurable character requirements and length.
 *
 * @param args - {@link PasswordMetaTypeArgs} controlling character classes and length.
 *
 * @example
 * ```ts
 * const obj = Meta({ password: PASSWORD() })
 * obj.password = 'short' // validation error (min 6)
 * obj.password = 'password' // validation error (no number / special / upper)
 * obj.password = 'P@ssw0rd' // ok
 * ```
 */
export function PASSWORD<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: PasswordMetaTypeArgs<PASSWORD, IsNullishT, IsNullableT, IsOptionalT>) {
    const {
        minLength: minLengthArg,
        requireLowercase,
        requireUppercase,
        requireNumber,
        requireSpecial,
        confirmField,
        validators,
        ...rest
    } = args ?? {}

    const minLength = minLengthArg ?? 6

    const needLower = requireLowercase !== false
    const needUpper = requireUppercase !== false
    const needNumber = requireNumber !== false
    const needSpecial = requireSpecial !== false

    let pattern = '^'

    if (needLower) pattern += '(?=.*[a-z])'

    if (needUpper) pattern += '(?=.*[A-Z])'

    if (needNumber) pattern += '(?=.*\\d)'

    if (needSpecial) pattern += '(?=.*[^A-Za-z0-9])'

    pattern += `. {${minLength},}$`.replace(' ', '')

    const regexp = new RegExp(pattern)

    const resultValidators = [...(validators ?? [])]

    if (confirmField) {
        resultValidators.push(ConfirmPasswordValidatorBuilder(confirmField))
    }

    return MetaType(StringImpl, {
        regexp,
        minLength,
        trim: true,
        validators: resultValidators,
        ...rest
    })
}

export type PASSWORD = MetaType<string, StringImpl>
