import { ReplaceValuesDeSerializerBuilder } from '../../serializers'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeArgsType, MetaTypeImpl } from '../metatypeImpl'

/** Additional options supported by the `BOOLEAN` meta type. */
export type BooleanMetaTypeArgs<
    T extends boolean = boolean,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
    /** Values that should be coerced to `true` before validation. */
    trueValues?: any[]
    /** Values that should be coerced to `false` before validation. */
    falseValues?: any[]
}

@MetaTypeImpl.registerMetaType()
export class BooleanImpl extends MetaTypeImpl {
    protected configure() {
        super.configure()

        if (this.metaTypeArgs.trueValues) {
            const trueValues = [...this.metaTypeArgs.trueValues]

            this.builtinDeSerializers.push(ReplaceValuesDeSerializerBuilder(trueValues, true))
        }

        if (this.metaTypeArgs.falseValues) {
            const falseValues = [...this.metaTypeArgs.falseValues]

            this.builtinDeSerializers.push(ReplaceValuesDeSerializerBuilder(falseValues, false))
        }
    }

    castToType({ value }: DeSerializerArgsType) {
        return !!value
    }

    static isCompatible(value: any) {
        return typeof value === 'boolean'
    }

    static getCompatibilityScore(_value: any) {
        return 1
    }
}

/**
 * Creates a boolean meta type with optional coercion lists and standard meta args.
 *
 * @param args - {@link BooleanMetaTypeArgs} controlling coercion/default/nullability.
 *
 * @example
 * ```ts
 * const obj = Meta({ flag: BOOLEAN({ nullish: true }) })
 * obj.flag = true
 * obj.flag = 'true' // validation error
 * ```
 */
export function BOOLEAN<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: BooleanMetaTypeArgs<BOOLEAN, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(BooleanImpl, args)
}

export type BOOLEAN = MetaType<boolean, BooleanImpl>
