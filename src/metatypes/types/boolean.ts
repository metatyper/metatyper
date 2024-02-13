import { ReplaceValuesDeSerializerBuilder } from '../../serializers'
import { MetaType } from '../metatype'
import { DeSerializerArgsType, MetaTypeArgs, MetaTypeImpl } from '../metatypeImpl'

export type BooleanMetaTypeArgs<
    T extends boolean = boolean,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> & {
    trueValues?: any[]
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
 * metatype that similar to boolean
 *
 * @param args - {@link MetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: BOOLEAN({ nullish: true })
 * }) // as { a: boolean | null | undefined }
 *
 * obj1.a = true
 * obj1.a = 'true' // type & validation error
 * ```
 */
export function BOOLEAN<
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(args?: MetaTypeArgs<BOOLEAN, IsNullishT, IsNullableT, IsOptionalT>) {
    return MetaType(BooleanImpl, args)
}

export type BOOLEAN = MetaType<boolean, BooleanImpl>
