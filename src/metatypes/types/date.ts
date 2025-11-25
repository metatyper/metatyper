import {
    GreaterValidatorBuilder,
    LessValidatorBuilder,
    MaxValidatorBuilder,
    MinValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeArgsType,
    MetaTypeImpl,
    SerializerArgsType
} from '../metatypeImpl'

/** Options for {@link DATE} meta type (range constraints, defaults, etc.). */
export type DateMetaTypeArgs<
    T = DATE,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              /** Inclusive lower bound (timestamp, bigint or Date). */
              min?: number | bigint | Date
          }
        | {
              /** Exclusive lower bound. */
              greater?: number | bigint | Date
          }
    ) &
    (
        | {
              /** Inclusive upper bound. */
              max?: number | bigint | Date
          }
        | {
              /** Exclusive upper bound. */
              less?: number | bigint | Date
          }
    )

@MetaTypeImpl.registerMetaType()
export class DateImpl extends MetaTypeImpl {
    protected configure() {
        super.configure()

        const metaTypeArgs: DateMetaTypeArgs = this.metaTypeArgs

        if (metaTypeArgs.min != null) {
            const min =
                typeof metaTypeArgs.min === 'number'
                    ? new Date(metaTypeArgs.min)
                    : metaTypeArgs.min

            this.builtinValidators.push(MinValidatorBuilder(min))
        }

        if (metaTypeArgs.max != null) {
            const max =
                typeof metaTypeArgs.max === 'number'
                    ? new Date(metaTypeArgs.max)
                    : metaTypeArgs.max

            this.builtinValidators.push(MaxValidatorBuilder(max))
        }

        if (metaTypeArgs.greater != null) {
            const greater =
                typeof metaTypeArgs.greater === 'number'
                    ? new Date(metaTypeArgs.greater)
                    : metaTypeArgs.greater

            this.builtinValidators.push(GreaterValidatorBuilder(greater))
        }

        if (metaTypeArgs.less != null) {
            const less =
                typeof metaTypeArgs.less === 'number'
                    ? new Date(metaTypeArgs.less)
                    : metaTypeArgs.less

            this.builtinValidators.push(LessValidatorBuilder(less))
        }
    }

    castToType({ value }: DeSerializerArgsType) {
        if (typeof value === 'bigint') {
            value = Number(value)
        }

        if (typeof value === 'number' || typeof value === 'string') {
            return new Date(value)
        }

        return value
    }

    castToRawValue({ value }: SerializerArgsType) {
        return value?.getTime?.() ?? value
    }

    static isCompatible(value: any) {
        return value instanceof Date
    }

    static getCompatibilityScore(_value: any): number {
        return 3
    }
}

/**
 * Creates a `Date` meta type with optional range checks and coercion support.
 *
 * @param args - {@link DateMetaTypeArgs} controlling bounds/default/nullability.
 *
 * @example
 * ```ts
 * const obj = Meta({ createdAt: DATE({ nullish: true }) })
 * obj.createdAt = new Date()
 * obj.createdAt = 1 // validation error
 * ```
 */
export function DATE<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: DateMetaTypeArgs<DATE, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(DateImpl, args)
}

export type DATE = MetaType<Date, DateImpl>
