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
 * Creates a meta type that allows only the provided literal value (with standard meta args).
 *
 * @param subType - Literal value to lock to.
 * @param args - {@link MetaTypeArgsType} controlling nullability/defaults.
 *
 * @example
 * ```ts
 * const obj = Meta({ status: LITERAL('done') })
 * obj.status = 'done'
 * obj.status = 'pending' // validation error
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
