import { Class } from '../../utils'
import { MetaType } from '../metatype'
import { MetaTypeArgsType, MetaTypeImpl, ValidatorArgsType } from '../metatypeImpl'

export type InstanceMetaTypeArgs<
    T,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
    allowChildren?: boolean
}

@MetaTypeImpl.registerMetaType()
export class InstanceImpl extends MetaTypeImpl {
    protected prepareSubType(subType: any) {
        if (!subType || !(subType instanceof Object)) {
            throw new TypeError('subType must be an instance or class')
        }

        // is it class
        if (subType instanceof Function && subType.prototype) {
            return subType
        }

        // is it instance
        if (Object.getPrototypeOf(subType)['constructor']) {
            // is not instance of the Object
            if (Object.getPrototypeOf(subType)['constructor'] !== Object) {
                return Object.getPrototypeOf(subType)['constructor']
            } else {
                throw new TypeError('subType must be an instance or class')
            }
        }

        throw new TypeError('subType must be an instance or class')
    }

    toString() {
        return `${this.name}<${this.getSubType().name}>`
    }

    metaTypeValidatorFunc({ value }: ValidatorArgsType) {
        if (value == null) return true

        const subType = this.getSubType()

        if (this.metaTypeArgs.allowChildren || this.metaTypeArgs.allowChildren === undefined) {
            return value instanceof subType
        }

        return value['constructor'] === subType
    }

    static isCompatible(value: any) {
        return (
            value instanceof Object &&
            Object.getPrototypeOf(value)['constructor'] &&
            Object.getPrototypeOf(value)['constructor'] !== Object &&
            Object.getPrototypeOf(value)['constructor'] !== Function
        )
    }

    static getCompatibilityScore(_value: any) {
        return 2
    }
}

/**
 * metatype for instances of any class
 *
 * @param args - {@link InstanceMetaTypeArgs}
 *
 * @example
 * ```ts
 * class A {
 *    a = 1
 * }
 *
 * const obj1 = Meta({
 *      a: INSTANCE(A, { nullish: true })
 * }) // as { a: A | null | undefined }
 *
 * obj1.a = new A()
 * obj1.a = {} // type & validation error
 * obj1.a = { a: 1 } // validation error
 * ```
 */
export function INSTANCE<
    T,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(
    subType: Class<T>,
    args?: InstanceMetaTypeArgs<INSTANCE<T>, IsNullishT, IsNullableT, IsOptionalT>
) {
    return MetaType(InstanceImpl, {
        ...args,
        subType
    })
}

export const I = INSTANCE

export type INSTANCE<T> = MetaType<T, InstanceImpl>
