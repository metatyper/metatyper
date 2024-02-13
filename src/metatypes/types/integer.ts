import {
    GreaterValidatorBuilder,
    LessValidatorBuilder,
    MaxValidatorBuilder,
    MinValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeImpl } from '../metatypeImpl'
import { NumbersMetaTypeArgs } from './number'

export class IntegerImpl extends MetaTypeImpl {
    protected configure() {
        super.configure()

        const metaTypeArgs: NumbersMetaTypeArgs<INTEGER> = this.metaTypeArgs

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
        if (typeof value === 'number' && !Number.isInteger(value)) {
            return Math.trunc(value)
        }

        if (value instanceof Date) {
            return value.getTime()
        }

        if (typeof value === 'bigint') {
            return Number(value)
        }

        if (typeof value === 'boolean') {
            return Number(value)
        }

        if (typeof value === 'string' && /^([-+]?\d+)$/.test(value)) {
            return Number(value)
        }

        return value
    }

    static isCompatible(value: any) {
        return typeof value === 'number' && Number.isInteger(value)
    }
}

/**
 * metatype that similar to number (with integer validation)
 *
 * @param args - {@link NumbersMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: INTEGER({ nullish: true })
 * }) // as { a: number | null | undefined }
 *
 * obj1.a = 1
 * obj1.a = 1.2 // validation error
 * ```
 */
export function INTEGER<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: NumbersMetaTypeArgs<INTEGER, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(IntegerImpl, args)
}

export type INTEGER = MetaType<number, IntegerImpl>
