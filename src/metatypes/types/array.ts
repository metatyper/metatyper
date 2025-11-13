import { FreezeObjectDeSerializer } from '../../serializers'
import { deepMap } from '../../utils'
import {
    MaxLengthValidatorBuilder,
    MinLengthValidatorBuilder,
    NotEmptyValidator
} from '../../validators'
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

export type ArrayMetaTypeArgs<
    T = any[],
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> &
    (
        | {
              notEmpty?: boolean
              minLength?: never
          }
        | {
              notEmpty?: never
              minLength?: number
          }
    ) & {
        maxLength?: number
    } & {
        freeze?: IsFrozenT
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

    metaTypeValidatorFunc({ value }: ValidatorArgsType) {
        if (value == null) return true

        if (!Array.isArray(value)) {
            return false
        }

        const subType = this.getSubType()

        if (!subType || subType instanceof AnyImpl) {
            return true
        }

        for (const item of value) {
            if (deepMap.getCircularRefInfo(item)) {
                continue
            }

            if (!subType.validate({ value: item })) {
                return false
            }
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
 * metatype that works like an array
 *
 * @param subType - items type or union of items types (default: {@link ANY})
 * @param args - {@link ArrayMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: ARRAY([
 *          1, 'string', BOOLEAN()
 *      ], { default: [] })
 * }) // as { a: (number | string | boolean)[] }
 *
 * obj1.a = [1]
 * obj1.a = [1, 'str']
 * obj1.a = [true, 2]
 * obj1.a = {} // type & validation error
 *
 * const obj2 = Meta({
 *      a: ARRAY( NUMBER({ default: 0 }), { default: [] } )
 * }) // as { a: number[] }
 *
 * obj2.a = [1]
 * obj2.a = ['str'] // type & validation error
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
