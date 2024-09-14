import { isEqual } from '../../utils'
import { MetaType } from '../metatype'
import { MetaTypeArgsType, MetaTypeImpl, ValidatorArgsType } from '../metatypeImpl'

export class LiteralImpl extends MetaTypeImpl {
    toString() {
        return `${this.name}<${this.getSubType()}>`
    }

    metaTypeValidatorFunc({ value }: ValidatorArgsType) {
        if (value == null) return true

        return isEqual(this.getSubType(), value)
    }

    static isCompatible(_value: any) {
        return true
    }
}

/**
 * metatype literal value
 *
 * @param args - {@link MetaTypeArgsType}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: LITERAL('1', { nullish: true })
 * }) // as { a: '1' | null | undefined }
 *
 * obj1.a = '1'
 * obj1.a = '2' // type & validation error
 * ```
 */
export function LITERAL<
    T extends number | string | symbol | boolean | bigint,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(subType: T, args?: MetaTypeArgsType<LITERAL<T>, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(LiteralImpl, {
        ...args,
        subType
    })
}

export type LITERAL<T> = MetaType<T, LiteralImpl>
