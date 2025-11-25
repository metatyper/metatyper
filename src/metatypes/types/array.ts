import { FreezeObjectDeSerializer } from '../../serializers'
import { deepMap } from '../../utils'
import {
    MaxLengthValidatorBuilder,
    MinLengthValidatorBuilder,
    NotEmptyValidator
} from '../../validators'
import { MetaTypeValidatorError, ValidationError } from '../../errors'
import { MetaType, PrepareMetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeArgsType,
    MetaTypeImpl,
    SerializerArgsType,
    ValidatorArgsType
} from '../metatypeImpl'
import { StructuralMetaTypeImpl } from './_structural'
import { AnyImpl } from './any'
import { UnionImpl } from './union'

/** Options for {@link ARRAY} meta type controlling length, immutability, etc. */
export type ArrayMetaTypeArgs<
    T = any[],
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              /** Requires at least one element (alias for `minLength: 1`). */
              notEmpty?: boolean
              minLength?: never
          }
        | {
              notEmpty?: never
              /** Minimum allowed length. */
              minLength?: number
          }
    ) & {
        /** Maximum allowed length. */
        maxLength?: number
    } & {
        /** When true, produces frozen arrays on deserialization. */
        freeze?: IsFrozenT
        /** Toggles serialization/deserialization of array items. */
        serializeSubValues?: boolean
    }

@MetaTypeImpl.registerMetaType()
export class ArrayImpl extends StructuralMetaTypeImpl {
    protected prepareMetaTypeArgs(
        metaTypeArgs: MetaTypeArgsType
    ): MetaTypeArgsType<any, boolean, boolean, boolean> {
        metaTypeArgs = super.prepareMetaTypeArgs(metaTypeArgs)

        if (!Reflect.has(metaTypeArgs, 'default') && !metaTypeArgs.optional) {
            metaTypeArgs.default = []
        }

        return metaTypeArgs
    }

    protected prepareNoLazySubType(subType: any): any {
        if (!Array.isArray(subType)) {
            subType = [subType]
        }

        subType = super.prepareNoLazySubType(subType)

        if (subType.length === 0) {
            subType = AnyImpl.build()
        } else if (subType.length === 1) {
            subType = MetaTypeImpl.getMetaTypeImpl(subType[0])
        } else {
            subType = UnionImpl.build({
                subType
            })
        }

        return subType
    }

    protected configure() {
        super.configure()

        if (this.metaTypeArgs.notEmpty) {
            this.builtinValidators.push(NotEmptyValidator)
        }

        if (this.metaTypeArgs.minLength) {
            this.builtinValidators.push(MinLengthValidatorBuilder(this.metaTypeArgs.minLength))
        }

        if (this.metaTypeArgs.maxLength) {
            this.builtinValidators.push(MaxLengthValidatorBuilder(this.metaTypeArgs.maxLength))
        }

        if (this.metaTypeArgs.freeze) {
            this.builtinDeSerializers.push(FreezeObjectDeSerializer)
        }
    }

    protected toStringSubType() {
        return `${this.getSubType()}[]`
    }

    metaTypeValidatorFunc({ value, stopAtFirstError, ...args }: ValidatorArgsType) {
        if (value == null) return true

        if (!Array.isArray(value)) {
            return false
        }

        const subType: MetaTypeImpl | undefined = this.getSubType()

        if (!subType || subType instanceof AnyImpl) {
            return true
        }

        const errors: MetaTypeValidatorError[] = []

        let index = 0

        for (const item of value) {
            if (deepMap.getCircularRefInfo(item)) {
                index++
                continue
            }

            const validationError = subType.validate({
                value: item,
                stopAtFirstError,
                ...args,
                path: args.path ? [...args.path, index] : [index]
            })

            if (validationError) {
                errors.push(...validationError.issues)
            }

            if (stopAtFirstError && errors.length > 0) {
                break
            }

            index++
        }

        if (errors.length > 0) {
            return new ValidationError(errors)
        }

        return true
    }

    serializeSubValues({ value, ...args }: SerializerArgsType) {
        if (!value) return value

        const subType = this.getSubType() as MetaTypeImpl

        return value.map((value: any) =>
            !subType
                ? value
                : subType.serialize({
                      value,
                      targetObject: args.targetObject,
                      baseObject: args.baseObject,
                      place: args.place
                  })
        )
    }

    deserializeSubValues({ value, ...args }: DeSerializerArgsType) {
        if (!value) return value

        const subType = this.getSubType() as MetaTypeImpl

        return value.map((value: any) =>
            !subType
                ? value
                : subType.deserialize({
                      value,
                      targetObject: args.targetObject,
                      baseObject: args.baseObject,
                      place: args.place
                  })
        )
    }

    static isCompatible(value: any): boolean {
        return Array.isArray(value)
    }

    static getCompatibilityScore(_value: any) {
        return 3
    }
}

/**
 * Creates an array meta type with optional item type, length limits, freezing, etc.
 *
 * @param subType - Item schema (meta type, literal, array, or factory). Defaults to {@link ANY}.
 * @param args - {@link ArrayMetaTypeArgs} controlling length/default/nullability.
 *
 * @example
 * ```ts
 * const obj = Meta({
 *      tags: ARRAY(STRING()),
 *      keys: [1, 'string', BOOLEAN()]
 * }) // as { tags: string[], keys: (number | string | boolean)[] }
 * obj.tags = ['foo', 'bar']
 * obj.tags = [1] // validation error
 * obj.keys = ['mystring', 1, 2, 3]
 * obj.keys = ['mystring', 1, 2, 3 {}] // validation error
 * ```
 */
export function ARRAY<
    T = any,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    PreparedT = T extends MetaTypeImpl ? unknown : T,
    ResultT = ARRAY<IsFrozenT extends true ? readonly PreparedT[] : PreparedT[]>
>(
    subType: T[],
    args?: ArrayMetaTypeArgs<ARRAY<T[]>, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function ARRAY<
    T = any,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    PreparedT = T extends MetaTypeImpl ? unknown : T,
    ResultT = ARRAY<IsFrozenT extends true ? readonly PreparedT[] : PreparedT[]>
>(
    subType: () => T[],
    args?: ArrayMetaTypeArgs<ARRAY<T[]>, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function ARRAY<
    T = any,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    PreparedT = T extends MetaTypeImpl ? unknown : T,
    ResultT = ARRAY<IsFrozenT extends true ? readonly PreparedT[] : PreparedT[]>
>(
    subType: T,
    args?: ArrayMetaTypeArgs<ARRAY<T[]>, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function ARRAY(subType?: any, args?: any) {
    return MetaType(ArrayImpl, {
        default: [],
        ...args,
        subType
    })
}

export type ARRAY<T> = MetaType<T, ArrayImpl>
