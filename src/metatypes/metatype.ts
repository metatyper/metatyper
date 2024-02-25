import { StaticClass } from '../utils'
import { MetaTypeArgs, type MetaTypeImpl } from './metatypeImpl'

export const IsMetaTypeSymbol = Symbol.for('[[IsMetaType]]')
export const MetaTypeImplSymbol = Symbol.for('[[MetaTypeImpl]]')

export type MetaTypeFlag = {
    readonly [IsMetaTypeSymbol]?: true
}

export type MetaTypeBase<ImplT = unknown> = {
    readonly [MetaTypeImplSymbol]?: ImplT | MetaTypeImpl
} & MetaTypeFlag

export type MetaType<T, ImplT = MetaTypeImpl> = T & MetaTypeBase<ImplT>

export type PrepareMetaType<
    T,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = IsNullableT extends true
    ? IsOptionalT extends true
        ? T | null | undefined
        : T | null
    : IsOptionalT extends true
      ? T | undefined
      : T

export function MetaType<
    T = MetaType<unknown>,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(
    metaTypeImpl: MetaTypeImpl,
    metaTypeArgs?:
        | MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT>
        | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT>)
): PrepareMetaType<T, IsNullishT, IsNullableT, IsOptionalT>

export function MetaType<
    T = MetaType<unknown>,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(
    metaTypeImplCls: StaticClass<typeof MetaTypeImpl>,
    metaTypeArgs?:
        | MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT>
        | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT>)
): PrepareMetaType<T, IsNullishT, IsNullableT, IsOptionalT>

export function MetaType<
    T = MetaType<unknown>,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(
    this: any,
    metaTypeImpl: MetaTypeImpl | StaticClass<typeof MetaTypeImpl>,
    metaTypeArgs?:
        | MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT>
        | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT>)
): T {
    if (!this || Reflect.getPrototypeOf(this) !== MetaType.prototype) {
        const MetaTypeAsClass = MetaType as any

        return Object.freeze(new MetaTypeAsClass(metaTypeImpl, metaTypeArgs))
    }

    // is class
    if (metaTypeImpl instanceof Function) {
        metaTypeImpl = metaTypeImpl.build(metaTypeArgs)
    } else if (metaTypeArgs) {
        metaTypeImpl = metaTypeImpl.rebuild(metaTypeArgs)
    }

    Reflect.defineProperty(this, IsMetaTypeSymbol, {
        value: true
    })

    Reflect.defineProperty(this, MetaTypeImplSymbol, {
        value: metaTypeImpl
    })

    return this
}

MetaType.prototype[Symbol.for('nodejs.util.inspect.custom')] = function () {
    return MetaType.getMetaTypeImpl(this).toString()
}

MetaType.prototype.toString = function () {
    return MetaType.getMetaTypeImpl(this).toString()
}

MetaType.prototype.validate = function (
    value: any,
    args?: { safe?: boolean; stopAtFirstError?: boolean }
) {
    const metaTypeImpl = MetaType.getMetaTypeImpl(this)

    return metaTypeImpl.validate({
        value,
        safe: args?.safe,
        stopAtFirstError: args?.stopAtFirstError
    })
}

MetaType.prototype.serialize = function (value: any) {
    const metaTypeImpl = MetaType.getMetaTypeImpl(this)

    return metaTypeImpl.serialize({ value, place: 'serialize' })
}

MetaType.prototype.deserialize = function (value: any) {
    const metaTypeImpl = MetaType.getMetaTypeImpl(this)

    return metaTypeImpl.deserialize({ value, place: 'deserialize' })
}

MetaType.isMetaType = (obj: any) => !!obj && obj instanceof MetaType

MetaType.getMetaTypeImpl = <T extends MetaType<unknown>>(
    obj: T | undefined | null
): T extends MetaType<unknown, infer Impl>
    ? Impl extends MetaTypeImpl
        ? Impl
        : MetaTypeImpl
    : MetaTypeImpl => MetaType.isMetaType(obj) && (obj as any)[MetaTypeImplSymbol]
