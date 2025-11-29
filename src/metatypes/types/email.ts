import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates a email meta type with length/regexp/casing options plus standard meta args.
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ email: EMAIL() })
 * obj.email = 'John' // validation error
 * obj.email = 'vadzimsharai@gmail.com' // ok
 * ```
 */
export function EMAIL<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: StringMetaTypeArgs<EMAIL, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(StringImpl, {
        // https://www.regular-expressions.info/email.html
        regexp: args?.regexp || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        trim: true,
        ...(args ?? {})
    })
}

export type EMAIL = MetaType<string, StringImpl>
