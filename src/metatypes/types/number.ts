import {
    GreaterValidatorBuilder,
    LessValidatorBuilder,
    MaxValidatorBuilder,
    MinValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeArgsType, MetaTypeImpl } from '../metatypeImpl'

/** Options for numeric meta types (NUMBER/INTEGER/BIGINT reuse this). */
export type NumbersMetaTypeArgs<
    T = NUMBER,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              /** Inclusive lower bound. */
              min?: number | bigint | Date
              greater?: never
          }
        | {
              /** Exclusive lower bound. */
              greater?: number | bigint | Date
              min?: never
          }
    ) &
    (
        | {
              /** Inclusive upper bound. */
              max?: number | bigint | Date
              less?: never
          }
        | {
              /** Exclusive upper bound. */
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
 * Creates a number meta type (double precision) with optional range constraints.
 *
 * @param args - {@link NumbersMetaTypeArgs} controlling min/max/greater/less and defaults.
 *
 * @example
 * ```ts
 * const obj = Meta({ score: NUMBER({ min: 0 }) })
 * obj.score = 1.2
 * obj.score = 'str' // validation error
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
