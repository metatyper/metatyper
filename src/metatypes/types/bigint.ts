import {
    GreaterValidatorBuilder,
    LessValidatorBuilder,
    MaxValidatorBuilder,
    MinValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeImpl, SerializerArgsType } from '../metatypeImpl'
import { NumbersMetaTypeArgs } from './number'

@MetaTypeImpl.registerMetaType()
export class BigIntImpl extends MetaTypeImpl {
    protected configure() {
        super.configure()

        const metaTypeArgs: NumbersMetaTypeArgs<BIGINT> = this.metaTypeArgs

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
            return BigInt(value.getTime())
        }

        if (typeof value === 'number') {
            return BigInt(Math.trunc(value))
        }

        if (typeof value === 'boolean') {
            return Number(value)
        }

        if (typeof value === 'string' && /^([-+]?\d+)$/.test(value)) {
            return BigInt(value)
        }

        return value
    }

    castToRawValue({ value }: SerializerArgsType) {
        return typeof value === 'bigint' ? value.toString() : value
    }

    static isCompatible(value: any) {
        return typeof value === 'bigint'
    }

    static getCompatibilityScore(_value: any) {
        return 1
    }
}

/**
 * metatype that similar to bigint
 *
 * @param args - {@link NumbersMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: BIGINT({ nullish: true })
 * }) // as { a: bigint | null | undefined }
 *
 * obj1.a = 1n
 * obj1.a = 1 // type & validation error
 * ```
 */
export function BIGINT<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: NumbersMetaTypeArgs<BIGINT, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(BigIntImpl, args)
}

export type BIGINT = MetaType<bigint, BigIntImpl>
