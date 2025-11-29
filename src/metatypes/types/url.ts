import { urlPattern } from '../../utils/regexp'
import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates a URL meta type with length/regexp/casing options plus standard meta args.
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ website: URL() })
 * obj.website = 'not-a-url' // validation error
 * obj.website = 'https://example.com' // ok
 * ```
 */
export function URL<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: StringMetaTypeArgs<URL, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(StringImpl, {
        regexp: args?.regexp || new RegExp(urlPattern, 'i'),
        trim: true,
        ...(args ?? {})
    })
}

export type URL = MetaType<string, StringImpl>
