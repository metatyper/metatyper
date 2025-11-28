import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates a UUID (v1–v5) meta type with length/regexp/casing options plus standard meta args.
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ id: UUID() })
 * obj.id = 'not-uuid' // validation error
 * obj.id = '550e8400-e29b-41d4-a716-446655440000' // ok
 * ```
 */
export function UUID<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: Omit<StringMetaTypeArgs<UUID, IsNullishT, IsNullableT, IsOptionalT>, 'regexp'>): UUID {
    return MetaType(StringImpl, {
        // Generic v1–v5 UUID (8-4-4-4-12)
        regexp: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
        trim: true,
        toCase: 'lower',
        ...(args ?? {})
    })
}

export type UUID = MetaType<string, StringImpl>
