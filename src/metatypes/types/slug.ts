import { MetaType } from '../metatype'
import { StringImpl, type StringMetaTypeArgs } from './string'

/**
 * Creates a slug meta type (e.g. "my-blog-post-1").
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ slug: SLUG() })
 * obj.slug = 'Not A Slug' // validation error
 * obj.slug = 'my-blog-post-1' // ok
 * ```
 */
export function SLUG<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: Omit<StringMetaTypeArgs<SLUG, IsNullishT, IsNullableT, IsOptionalT>, 'regexp'>): SLUG {
    return MetaType(StringImpl, {
        // Lowercase letters, digits and dashes
        regexp: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        trim: true,
        ...(args ?? {})
    })
}

export type SLUG = MetaType<string, StringImpl>
