import {
    ToLowerCaseDeSerializer,
    ToUpperCaseDeSerializer,
    TrimDeSerializer
} from '../../serializers'
import {
    MaxLengthValidatorBuilder,
    MinLengthValidatorBuilder,
    NotEmptyValidator,
    RegExpValidatorBuilder
} from '../../validators'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeArgsType, MetaTypeImpl } from '../metatypeImpl'

/** Additional options supported by the `STRING` meta type. */
export type StringMetaTypeArgs<
    T = STRING,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              /** Ensures the value is non-empty (alias for `minLength: 1`). */
              notEmpty?: boolean
          }
        | {
              /** Minimum allowed length. */
              minLength?: number
          }
    ) & {
        /** Maximum allowed length. */
        maxLength?: number

        /** Trims whitespace before validation. */
        trim?: boolean

        /** Regular expression (string or RegExp) the value must match. */
        regexp?: RegExp | string
        /** Convert value to lower/upper case during deserialization. */
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

        if (metaTypeArgs.trim) {
            this.builtinDeSerializers.push(TrimDeSerializer)
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
 * Creates a string meta type with length/regexp/casing options plus standard meta args.
 *
 * @param args - {@link StringMetaTypeArgs} controlling min/max length, regexp, casing, etc.
 *
 * @example
 * ```ts
 * const obj = Meta({ name: STRING({ minLength: 3 }) })
 * obj.name = 'John'
 * obj.name = 1 // validation error
 * obj.name = '' // validation error
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
