import {
    GreaterValidatorBuilder,
    LessValidatorBuilder,
    MaxValidatorBuilder,
    MinValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeArgs,
    MetaTypeImpl,
    SerializerArgsType
} from '../metatypeImpl'

type DateMetaTypeArgs<
    T = DATE,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              min?: number | bigint | Date
          }
        | {
              greater?: number | bigint | Date
          }
    ) &
    (
        | {
              max?: number | bigint | Date
          }
        | {
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
 * metatype that similar to Date
 *
 * @param args - {@link DateMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: DATE({ nullish: true })
 * }) // as { a: Date | null | undefined }
 *
 * obj1.a = new Date()
 * obj1.a = 1 // type & validation error
 * obj1.a = 'str' // type & validation error
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
