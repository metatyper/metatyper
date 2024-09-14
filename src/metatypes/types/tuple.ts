import { FreezeObjectDeSerializer } from '../../serializers'
import { MetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeArgsType,
    MetaTypeImpl,
    SerializerArgsType,
    ValidatorArgsType
} from '../metatypeImpl'
import { StructuralMetaTypeImpl } from './_structural'

export type TupleMetaTypeArgs<
    T = any[],
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
    freeze?: IsFrozenT
    serializeSubValues?: boolean
}

export class TupleImpl extends StructuralMetaTypeImpl {
    protected configure() {
        super.configure()

        if (this.metaTypeArgs.freeze) {
            this.builtinDeSerializers.push(FreezeObjectDeSerializer)
        }
    }

    metaTypeValidatorFunc({ value }: ValidatorArgsType) {
        if (value == null) return true

        const subType = this.getSubType() as any[]

        return (
            Array.isArray(value) &&
            value.length === subType.length &&
            subType.every((metaTypeImpl, i) => metaTypeImpl.validate({ value: value[i] }))
        )
    }

    serializeSubValues({ value, ...args }: SerializerArgsType) {
        const subType = this.getSubType() as MetaTypeImpl[]

        if (!value) return value

        return (value as any[]).map((value, i) =>
            subType[i]
                ? subType[i].serialize({
                      value,
                      targetObject: args.targetObject,
                      baseObject: args.baseObject,
                      place: args.place
                  })
                : value
        )
    }

    deserializeSubValues({ value, ...args }: DeSerializerArgsType) {
        const subType = this.getSubType() as MetaTypeImpl[]

        if (!value) return value

        return (value as any[]).map((value, i) =>
            subType[i]
                ? subType[i].deserialize({
                      value,
                      targetObject: args.targetObject,
                      baseObject: args.baseObject,
                      place: args.place
                  })
                : value
        )
    }

    static isCompatible(value: any): boolean {
        return Array.isArray(value)
    }
}

/**
 * metatype that works like an array with precise structure
 *
 * @param subType - array of types
 * @param args - {@link TupleMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: TUPLE([1, 'string', BOOLEAN({ nullish: true })], { nullish: true })
 * }) // as { a: [number, string, boolean | null | undefined] | null | undefined }
 *
 * obj1.a = [1, 'str', true]
 * obj1.a = [1, true, 'str'] //  type & validation error
 * obj1.a = [1] //  type & validation error
 * ```
 */

export function TUPLE<
    T extends any[],
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    PreparedT = { [k in keyof T]: T[k] extends MetaTypeImpl ? unknown : T[k] }
>(
    types: [...T] | ((metaTypeImpl: TupleImpl) => [...T]),
    args?: TupleMetaTypeArgs<
        TUPLE<IsFrozenT extends true ? Readonly<PreparedT> : PreparedT>,
        IsNullishT,
        IsNullableT,
        IsOptionalT,
        IsFrozenT
    >
) {
    return MetaType(TupleImpl, { ...args, subType: types })
}

export type TUPLE<T> = MetaType<T, TupleImpl>
