import { StaticClass } from '../utils'
import { MetaTypeArgsType, type MetaTypeImpl } from './metatypeImpl'

/** Symbol flag injected into every runtime meta type wrapper. */
export const IsMetaTypeSymbol = Symbol.for('[[IsMetaType]]')

/** Symbol pointing to the backing `MetaTypeImpl` used by a runtime meta type. */
export const MetaTypeImplSymbol = Symbol.for('[[MetaTypeImpl]]')

/** Describes objects that carry the meta-type marker. */
export type MetaTypeFlag = {
    readonly [IsMetaTypeSymbol]?: true
}

/** Base shape of any meta type wrapper (stores link to `MetaTypeImpl`). */
export type MetaTypeBase<ImplT = unknown> = {
    readonly [MetaTypeImplSymbol]?: ImplT | MetaTypeImpl
} & MetaTypeFlag

// Utility alias that combines resolved TypeScript type with runtime meta flags.
export type MetaType<T, ImplT = MetaTypeImpl> = T & MetaTypeBase<ImplT>

/**
 * Infers nullable/optional output type depending on metatype args.
 * Mirrors what `MetaTypeArgsType.nullish/nullable/optional` controls at runtime.
 */
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
        | MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>
        | ((
              metaTypeImpl: MetaTypeImpl
          ) => MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>)
): PrepareMetaType<T, IsNullishT, IsNullableT, IsOptionalT>

export function MetaType<
    T = MetaType<unknown>,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(
    metaTypeImplCls: StaticClass<typeof MetaTypeImpl>,
    metaTypeArgs?:
        | MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>
        | ((
              metaTypeImpl: MetaTypeImpl
          ) => MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>)
): PrepareMetaType<T, IsNullishT, IsNullableT, IsOptionalT>

/**
 * Creates a runtime meta type wrapper from either an existing implementation instance
 * or an implementation class. The resulting object holds the resolved implementation
 * and exposes validation/serialization helpers.
 *
 * @remarks
 * The `MetaType` factory also provides several helper utilities:
 * - `MetaType.inspect(metaType)` - {@link MetaTypeInspect} - Pretty-prints using the implementation stringifier.
 * - `MetaType.toString(metaType)` - {@link MetaTypeToString} - Returns the implementation string representation.
 * - `MetaType.validate(metaType, value, args)` - {@link MetaTypeValidate} - Validates a value using the backing implementation.
 * - `MetaType.serialize(metaType, value)` - {@link MetaTypeSerialize} - Serializes a value through the meta type serializers.
 * - `MetaType.deserialize(metaType, value)` - {@link MetaTypeDeserialize} - Deserializes a raw value through the meta type serializers.
 * - `MetaType.isMetaType(obj)` - {@link MetaTypeIsMetaType} - Checks whether a value is a runtime meta type wrapper.
 * - `MetaType.getMetaTypeImpl(metaType)` - {@link MetaTypeGetMetaTypeImpl} - Retrieves the bound implementation instance.
 */
export function MetaType<
    T = MetaType<unknown>,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
>(
    this: any,
    metaTypeImpl: MetaTypeImpl | StaticClass<typeof MetaTypeImpl>,
    metaTypeArgs?:
        | MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>
        | ((
              metaTypeImpl: MetaTypeImpl
          ) => MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>)
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

/**
 * Pretty-print meta types using the underlying implementation stringifier.
 */
export function MetaTypeInspect(this: MetaType<unknown>) {
    return MetaType.getMetaTypeImpl(this).toString()
}

MetaType.prototype[Symbol.for('nodejs.util.inspect.custom')] = MetaTypeInspect
MetaType.prototype.inspect = MetaTypeInspect

export function MetaTypeToString(this: MetaType<unknown>) {
    return MetaType.getMetaTypeImpl(this).toString()
}

MetaType.prototype.toString = MetaTypeToString

/**
 * Validates a value using the underlying `MetaTypeImpl`.
 *
 * @param value - Value to validate.
 * @param args - Optional validation options (currently only `stopAtFirstError`).
 */
export function MetaTypeValidate(
    this: MetaType<unknown>,
    value: any,
    args?: { stopAtFirstError?: boolean }
) {
    const metaTypeImpl = MetaType.getMetaTypeImpl(this)

    return metaTypeImpl.validate({
        value,
        path: [],
        stopAtFirstError: args?.stopAtFirstError
    })
}

MetaType.prototype.validate = MetaTypeValidate

/**
 * Serializes a value using the meta type's serializers (used when reading/serializing objects).
 */
export function MetaTypeSerialize(this: MetaType<unknown>, value: any) {
    const metaTypeImpl = MetaType.getMetaTypeImpl(this)

    return metaTypeImpl.serialize({ value, place: 'serialize' })
}

MetaType.prototype.serialize = MetaTypeSerialize

/**
 * Deserializes a raw value (used when writing/deserialize operations).
 */
export function MetaTypeDeserialize(this: MetaType<unknown>, value: any) {
    const metaTypeImpl = MetaType.getMetaTypeImpl(this)

    return metaTypeImpl.deserialize({ value, place: 'deserialize' })
}

MetaType.prototype.deserialize = MetaTypeDeserialize

/** Type guard to check whether a value is a runtime meta type wrapper. */
export function MetaTypeIsMetaType(obj: any) {
    return !!obj && obj instanceof MetaType
}

MetaType.isMetaType = MetaTypeIsMetaType

/**
 * Retrieves the implementation instance bound to a runtime meta type wrapper.
 *
 * @returns The implementation if available, otherwise the base `MetaTypeImpl`.
 */
export function MetaTypeGetMetaTypeImpl<T extends MetaType<unknown>>(
    obj: T | undefined | null
): T extends MetaType<unknown, infer Impl>
    ? Impl extends MetaTypeImpl
        ? Impl
        : MetaTypeImpl
    : MetaTypeImpl {
    return MetaType.isMetaType(obj) && (obj as any)[MetaTypeImplSymbol]
}

MetaType.getMetaTypeImpl = MetaTypeGetMetaTypeImpl
