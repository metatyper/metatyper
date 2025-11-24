import { MetaError } from '../../errors'
import { MetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeArgsType,
    MetaTypeImpl,
    SerializerArgsType,
    ValidatorArgsType
} from '../metatypeImpl'
import { StructuralMetaTypeImpl } from './_structural'

export class UnionImpl extends StructuralMetaTypeImpl {
    protected prepareNoLazySubType(subType: any): any {
        if (!Array.isArray(subType)) {
            subType = [subType]
        }

        return super.prepareNoLazySubType(subType)
    }

    protected getMetaTypeImplOf(value: any): MetaTypeImpl {
        const subType = this.getSubType()

        return subType.find((metaTypeImpl: MetaTypeImpl) => {
            if (
                value != null &&
                !(metaTypeImpl.constructor as typeof MetaTypeImpl).isCompatible(value)
            ) {
                return false
            }

            try {
                value = metaTypeImpl.deserialize({ value })

                const error = metaTypeImpl.validate({ value, path: [] })

                if (error) {
                    return false
                }

                return true
            } catch (e) {
                if (e instanceof MetaError) return false

                throw e
            }
        })
    }

    protected toStringSubType() {
        return this.getSubType().join(' | ')
    }

    metaTypeValidatorFunc({ value }: ValidatorArgsType) {
        return this.getMetaTypeImplOf(value) !== undefined
    }

    serializeSubValues({ value, ...args }: SerializerArgsType) {
        const metaTypeImpl = this.getMetaTypeImplOf(value)

        return (
            metaTypeImpl?.serialize({
                value,
                targetObject: args.targetObject,
                baseObject: args.baseObject,
                place: args.place
            }) ?? value
        )
    }

    deserializeSubValues({ value, ...args }: DeSerializerArgsType) {
        const metaTypeImpl = this.getMetaTypeImplOf(value)

        return (
            metaTypeImpl?.deserialize({
                value,
                targetObject: args.targetObject,
                baseObject: args.baseObject,
                place: args.place
            }) ?? value
        )
    }

    static isCompatible(_value: any) {
        return true
    }
}

/**
 * metatype that works like a union of specified types
 *
 * @param subType - array of types
 * @param args - {@link MetaTypeArgsType}
 *
 * @typeParam T - union of specified types
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: UNION([1, 'string', BOOLEAN({ nullish: true })])
 * }) // as { a: number | string | boolean | null | undefined }
 *
 * obj1.a = 1
 * obj1.a = 'str'
 * obj1.a = true
 * obj1.a = {} // type & validation error
 * ```
 */
export function UNION<
    T,
    TArray extends T[],
    PreparedT = { [k in keyof TArray]: TArray[k] extends MetaTypeImpl ? unknown : TArray[k] }[any],
    DefaultT = PreparedT,
    ResultT = null extends PreparedT
        ? undefined extends PreparedT
            ? UNION<Exclude<PreparedT, null | undefined>> | null | undefined
            : UNION<Exclude<PreparedT, null | undefined>> | null
        : undefined extends PreparedT
          ? UNION<Exclude<PreparedT, null | undefined>> | undefined
          : UNION<PreparedT>
>(
    subType: TArray | (() => TArray),
    args?: MetaTypeArgsType<DefaultT, any> & { serializeSubValues?: boolean }
) {
    return MetaType(UnionImpl, {
        nullish: true as any as false,
        ...args,
        subType
    }) as ResultT
}

export type UNION<T> = T
