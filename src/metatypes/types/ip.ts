import { ipv4OrIpv6Pattern } from '../../utils/regexp'
import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates an IP meta type (IPv4 or IPv6) with length/regexp/casing options plus standard meta args.
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ addr: IP() })
 * obj.addr = '999.999.999.999' // validation error
 * obj.addr = '192.168.0.1' // ok
 * ```
 */
export function IP<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: StringMetaTypeArgs<IP, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(StringImpl, {
        regexp: args?.regexp || new RegExp(ipv4OrIpv6Pattern, 'i'),
        trim: true,
        ...(args ?? {})
    })
}

export type IP = MetaType<string, StringImpl>
