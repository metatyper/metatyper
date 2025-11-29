import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates a credit card meta type using common brand regexes (Visa, MasterCard, AmEx, etc.).
 *
 * Uses a pattern adapted from regular-expressions.info:
 * https://www.regular-expressions.info/creditcard.html
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ card: CARD() })
 * obj.card = '1234567890123456' // validation error
 * obj.card = '4111111111111111' // ok
 * ```
 */
export function CARD<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: StringMetaTypeArgs<CARD, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(StringImpl, {
        // https://www.regular-expressions.info/creditcard.html
        regexp:
            args?.regexp ||
            /^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
        trim: true,
        ...(args ?? {})
    })
}

export type CARD = MetaType<string, StringImpl>
