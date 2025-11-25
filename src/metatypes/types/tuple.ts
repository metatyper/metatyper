import { FreezeObjectDeSerializer } from '../../serializers'
import { MetaTypeValidatorError, ValidationError } from '../../errors'
import { MetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeArgsType,
    MetaTypeImpl,
    SerializerArgsType,
    ValidatorArgsType
} from '../metatypeImpl'
import { StructuralMetaTypeImpl } from './_structural'

/** Options for {@link TUPLE} meta type (freezing, sub-value serialization, etc.). */
export type TupleMetaTypeArgs<
    T = any[],
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
    /** When true, deserialized tuples are frozen. */
    freeze?: IsFrozenT
    /** Toggles serialization/deserialization of tuple entries. */
    serializeSubValues?: boolean
}

export class TupleImpl extends StructuralMetaTypeImpl {
    protected configure() {
        super.configure()

        if (this.metaTypeArgs.freeze) {
            this.builtinDeSerializers.push(FreezeObjectDeSerializer)
        }
    }

    metaTypeValidatorFunc({ value, stopAtFirstError, ...args }: ValidatorArgsType) {
        if (value == null) return true

        const subType = this.getSubType() as any[]

        if (!Array.isArray(value) || value.length !== subType.length) {
            return false
        }

        let i = 0

        const errors: MetaTypeValidatorError[] = []

        for (const subTypeItem of subType) {
            const error = subTypeItem.validate({
                ...args,
                value: value[i],
                stopAtFirstError,
                path: args.path ? [...args.path, i] : [i]
            }) as ValidationError | undefined

            if (error) {
                errors.push(...error.issues)
            }

            if (stopAtFirstError && errors.length > 0) {
                break
            }

            i++
        }

        if (errors.length > 0) {
            return new ValidationError(errors)
        }

        return true
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
 * Creates a tuple meta type with a fixed list of item schemas.
 *
 * @param types - Array (or factory) describing each position in the tuple.
 * @param args - {@link TupleMetaTypeArgs} controlling nullability, freezing, etc.
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
