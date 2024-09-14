import { ToLowerCaseDeSerializer, ToUpperCaseDeSerializer } from '../../serializers'
import {
    MaxLengthValidatorBuilder,
    MinLengthValidatorBuilder,
    NotEmptyValidator,
    RegExpValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeArgsType, MetaTypeImpl } from '../metatypeImpl'

type StringMetaTypeArgs<
    T = STRING,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              notEmpty?: boolean
          }
        | {
              minLength?: number
          }
    ) & {
        maxLength?: number

        regexp?: RegExp | string
        toCase?: 'lower' | 'upper'
    }

@MetaTypeImpl.registerMetaType()
export class StringImpl extends MetaTypeImpl {
    protected configure() {
        super.configure()

        const metaTypeArgs = this.metaTypeArgs as StringMetaTypeArgs

        if (metaTypeArgs.notEmpty) {
            this.builtinValidators.push(NotEmptyValidator)
        }

        if (metaTypeArgs.minLength) {
            this.builtinValidators.push(MinLengthValidatorBuilder(metaTypeArgs.minLength))
        }

        if (metaTypeArgs.maxLength) {
            this.builtinValidators.push(MaxLengthValidatorBuilder(metaTypeArgs.maxLength))
        }

        if (metaTypeArgs.regexp) {
            this.builtinValidators.push(RegExpValidatorBuilder(metaTypeArgs.regexp))
        }

        if (metaTypeArgs.toCase === 'lower') {
            this.builtinDeSerializers.push(ToLowerCaseDeSerializer)
        }

        if (metaTypeArgs.toCase === 'upper') {
            this.builtinDeSerializers.push(ToUpperCaseDeSerializer)
        }
    }

    castToType({ value }: DeSerializerArgsType) {
        if (value instanceof Date) {
            return value.toISOString()
        }

        return String(value)
    }

    static isCompatible(value: any) {
        return typeof value === 'string'
    }

    static getCompatibilityScore(_value: any) {
        return 1
    }
}

/**
 * metatype that similar to string
 *
 * @param args - {@link StringMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: STRING({ nullish: true })
 * }) // as { a: string | null | undefined }
 *
 * obj1.a = 'str'
 * obj1.a = 1 // type & validation error
 * ```
 */
export function STRING<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: StringMetaTypeArgs<STRING, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(StringImpl, args)
}

export type STRING = MetaType<string, StringImpl>
