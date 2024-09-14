import {
    GreaterValidatorBuilder,
    LessValidatorBuilder,
    MaxValidatorBuilder,
    MinValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeArgsType, MetaTypeImpl } from '../metatypeImpl'

export type NumbersMetaTypeArgs<
    T = NUMBER,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              min?: number | bigint | Date
              greater?: never
          }
        | {
              greater?: number | bigint | Date
              min?: never
          }
    ) &
    (
        | {
              max?: number | bigint | Date
              less?: never
          }
        | {
              less?: number | bigint | Date
              max?: never
          }
    )

@MetaTypeImpl.registerMetaType()
export class NumberImpl extends MetaTypeImpl {
    protected configure() {
        super.configure()

        const metaTypeArgs: NumbersMetaTypeArgs<NUMBER> = this.metaTypeArgs

        if (metaTypeArgs.min != null) {
            this.builtinValidators.push(MinValidatorBuilder(metaTypeArgs.min))
        }

        if (metaTypeArgs.max != null) {
            this.builtinValidators.push(MaxValidatorBuilder(metaTypeArgs.max))
        }

        if (metaTypeArgs.greater != null) {
            this.builtinValidators.push(GreaterValidatorBuilder(metaTypeArgs.greater))
        }

        if (metaTypeArgs.less != null) {
            this.builtinValidators.push(LessValidatorBuilder(metaTypeArgs.less))
        }
    }

    castToType({ value }: DeSerializerArgsType) {
        if (value instanceof Date) {
            return value.getTime()
        }

        if (typeof value === 'bigint') {
            return Number(value)
        }

        if (typeof value === 'boolean') {
            return Number(value)
        }

        if (typeof value === 'string' && /^([-+]?\d+(\.\d+)?)$/.test(value)) {
            return Number(value)
        }

        return value
    }

    static isCompatible(value: any) {
        return typeof value === 'number' && !Number.isNaN(value)
    }

    static getCompatibilityScore(_value: any) {
        return 1
    }
}

/**
 * metatype that similar to number
 *
 * @param args - {@link NumbersMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: NUMBER(, { nullish: true })
 * }) // as { a: number | null | undefined }
 *
 * obj1.a = 1.2
 * obj1.a = 'str' // type & validation error
 * ```
 */
export function NUMBER<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: NumbersMetaTypeArgs<NUMBER, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(NumberImpl, args)
}

export type NUMBER = MetaType<number, NumberImpl>
