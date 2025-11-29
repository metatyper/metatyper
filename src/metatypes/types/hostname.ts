import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates a hostname/domain meta type.
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ host: HOSTNAME() })
 * obj.host = 'not a host' // validation error
 * obj.host = 'example.com' // ok
 * ```
 */
export function HOSTNAME<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: StringMetaTypeArgs<HOSTNAME, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(StringImpl, {
        // Simplified hostname / domain name (no protocol, no path)
        regexp:
            args?.regexp ||
            /^(?=.{1,253}$)(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*$/u,
        trim: true,
        ...(args ?? {})
    })
}

export type HOSTNAME = MetaType<string, StringImpl>
