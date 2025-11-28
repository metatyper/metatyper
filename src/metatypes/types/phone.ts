import { MetaType } from '../metatype'
import { PhoneNumberDeSerializer } from '../../serializers/phoneNumber'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates a phone meta type for E.164-like international phone numbers.
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ phone: PHONE() })
 * obj.phone = '12345' // validation error
 * obj.phone = '+1234567890' // ok
 * ```
 */
export function PHONE<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: Omit<StringMetaTypeArgs<PHONE, IsNullishT, IsNullableT, IsOptionalT>, 'regexp'>): PHONE {
    return MetaType(StringImpl, {
        regexp: /^\+[1-9]\d{1,14}$/,
        trim: true,
        ...(args ?? {}),
        ...(args?.coercion
            ? { deserializers: [PhoneNumberDeSerializer, ...(args?.serializers ?? [])] }
            : {})
    })
}

export type PHONE = MetaType<string, StringImpl>
