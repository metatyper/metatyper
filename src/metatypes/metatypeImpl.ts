import {
    MetaTypeDeSerializerError,
    MetaTypeSerializerError,
    ValidationError,
    MetaTypeValidatorError
} from '../errors'
import {
    CoercionDeSerializer,
    CoercionSerializer,
    DefaultValueDeSerializerBuilder
} from '../serializers'
import { StaticClass } from '../utils'
import { MetaTypeValidator, NullableValidator, OptionalValidator } from '../validators'
import { MetaType } from './metatype'

/** Arguments passed to `MetaTypeImpl.validate`.
 *
 */
export type ValidateMetaTypeArgsType = {
    /** Value being validated. */
    value: any

    /** Validation path (used for nested structures).
     * @example
     * ```ts
     *
     * const err = OBJECT(ARRAY(STRING())).validate({ myKey: ['str', 5] })
     * const issue = err?.issues[0]
     *
     * issue.path // ['myKey', 1]
     *
     * ```
     */
    path?: (string | number | symbol)[]

    /** Original proxy exposed to the user. */
    targetObject?: object

    /** Base object that stores state (not proxy). */
    baseObject?: object

    /** Stops on first error when `true` (default).
     * If `false`, all errors will be collected and returned as issues in a {@link ValidationError}.
     */
    stopAtFirstError?: boolean
} & Record<string, any>

/** Arguments passed to validators; extends base validation args with meta implementation.
 * Subtype of {@link ValidateMetaTypeArgsType}
 * @property metaTypeImpl - The meta type implementation that is being validated.
 */
export type ValidatorArgsType = ValidateMetaTypeArgsType & {
    metaTypeImpl?: MetaTypeImpl
}

/** Validator function signature.
 * @param validationArgs - The arguments passed to the validator.
 * @returns A boolean indicating whether the value is valid, or an error if the value is invalid.
 */
export type ValidatorFuncType = (validationArgs: ValidatorArgsType) => boolean | Error

/** Validator object shape.
 * @property name - The name of the validator.
 * @property validate - The function that validates the value.
 */
export type ValidatorType = {
    name?: string
    context?: Record<string, any>
    validate: ValidatorFuncType
}

/** Arguments passed when serializing a value via `MetaTypeImpl.serialize`. */
export type SerializeMetaTypeArgsType = {
    /** Value to serialize. */
    value: any
    /** Property name that triggered serialization (optional). */
    propName?: string | symbol
    /** Proxy exposed to the user. */
    targetObject?: object
    /** Base object storing state. */
    baseObject?: object
    /** Which "place" triggered serialization (get/serialize/etc). */
    place?: SerializePlaceType
} & Record<string, any>

/** Serializer arguments extended with the active implementation reference.
 * Subtype of {@link SerializeMetaTypeArgsType}
 * @property metaTypeImpl - The meta type implementation that is being serialized.
 */
export type SerializerArgsType = SerializeMetaTypeArgsType & {
    metaTypeImpl?: MetaTypeImpl
}

/** Serializer function signature.
 * @param serializeArgs - The arguments passed to the serializer.
 * @returns The serialized value.
 */
export type SerializeFuncType = (serializeArgs: SerializerArgsType) => any

/** Places where serialization can be triggered. */
export type SerializePlaceType = 'get' | 'serialize' | 'unknown'

/** Serializer object shape (function + metadata).
 * @property serialize - The function that serializes the value.
 * @property name - The name of the serializer.
 * @property serializePlaces - The places where the serializer can be triggered.
 */
export type SerializerType = {
    serialize: SerializeFuncType

    name?: string
    serializePlaces?: SerializePlaceType[] | string[]
}

/** Arguments passed when deserializing a value via `MetaTypeImpl.deserialize`.
 * Subtype of {@link SerializeMetaTypeArgsType}
 * @property metaTypeImpl - The meta type implementation that is being deserialized.
 */
export type DeSerializeMetaTypeArgsType = {
    /** Value to deserialize. */
    value: any
    /** Property that is being assigned (optional). */
    propName?: string | symbol
    /** Proxy exposed to the user. */
    targetObject?: object
    /** Base object storing state. */
    baseObject?: object
    /** Which "place" triggered deserialization (init/set/etc). */
    place?: DeSerializePlaceType
}

/** Deserializer arguments extended with the active implementation reference.
 * Subtype of {@link DeSerializeMetaTypeArgsType}
 * @property metaTypeImpl - The meta type implementation that is being deserialized.
 */
export type DeSerializerArgsType = DeSerializeMetaTypeArgsType & {
    metaTypeImpl?: MetaTypeImpl
}

/** Deserializer function signature.
 * @param deserializeArgs - The arguments passed to the deserializer.
 * @returns The deserialized value.
 */
export type DeSerializeFuncType = (deserializeArgs: DeSerializerArgsType) => any

/** Places where deserialization can happen.
 * @property init - The value is being initialized.
 * @property reinit - The value is being reinitialized.
 * @property set - The value is being set.
 * @property deserialize - The value is being deserialized.
 * @property unknown - The place is unknown.
 */
export type DeSerializePlaceType = 'init' | 'reinit' | 'set' | 'deserialize' | 'unknown'

/** Deserializer object shape (function + metadata).
 * @property deserialize - The function that deserializes the value.
 * @property name - The name of the deserializer.
 * @property deserializePlaces - The places where the deserializer can be triggered.
 */
export type DeSerializerType = {
    deserialize: DeSerializeFuncType

    name?: string
    deserializePlaces?: DeSerializePlaceType[] | string[]
}

/**
 * Arguments that describe how a meta type behaves (validators, coercion, defaults, etc.).
 *
 * @property name - Overrides the type name used in logs/inspector.
 * @property subType - Meta type or schema describing nested values (arrays, objects, etc.).
 * @property default - Default value or factory used when incoming value is `undefined`.
 * @property nullish - Allows both `null` and `undefined` (shorthand for nullable+optional).
 * @property nullable - Allows `null` (adds {@link NullableValidator} when `false`).
 * @property optional - Allows `undefined` (adds {@link OptionalValidator} when `false`).
 * @property coercion - Enables coercion when serializing/deserializing values.
 * @property validateType - Adds the {@link MetaTypeValidator} to ensure runtime compatibility.
 * @property noBuiltinValidators - Disables all builtin validators when `true`.
 * @property noBuiltinSerializers - Disables all builtin serializers when `true`.
 * @property noBuiltinDeSerializers - Disables all builtin deserializers when `true`.
 * @property validators - Custom validators applied after builtin ones.
 * @property serializers - Custom serializers applied after builtin ones.
 * @property deserializers - Custom deserializers applied after builtin ones.
 * @property safe - Controls data integrity enforcement in meta objects.
 *                  When `true` (default), validation errors are thrown immediately.
 *                  When `false`, invalid data can be written to object fields without throwing;
 *                  errors can be handled via event handling mechanisms instead (see {@link MetaArgsType.errorHandlers}).
 */
export type MetaTypeArgsType<
    T = any,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = {
    name?: string
    subType?: any
    default?: [IsNullableT] extends [true]
        ? T | null
        : T | ((declaration?: MetaTypeImpl) => [IsNullableT] extends [true] ? T | null : T)
    nullish?: IsNullishT
    nullable?: IsNullableT
    optional?: IsOptionalT
    coercion?: boolean
    validateType?: boolean
    noBuiltinValidators?: boolean
    noBuiltinSerializers?: boolean
    noBuiltinDeSerializers?: boolean
    validators?: (ValidatorType | ValidatorFuncType)[]
    serializers?: (SerializerType | SerializeFuncType)[]
    deserializers?: (DeSerializerType | DeSerializeFuncType)[]
    safe?: boolean
} & Record<string, any>

/**
 * Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
 * extend this class to provide specific validation, serialization and compatibility logic.
 */
export class MetaTypeImpl {
    private static readonly _metaTypesRegistry: Record<string, StaticClass<typeof MetaTypeImpl>> =
        {}

    readonly id: string
    readonly name: string
    readonly metaTypeArgs: Readonly<MetaTypeArgsType> = {}
    readonly parentMetaTypeImpl: MetaTypeImpl | undefined

    protected readonly builtinValidators: ValidatorType[] = []
    protected readonly builtinSerializers: SerializerType[] = []
    protected readonly builtinDeSerializers: DeSerializerType[] = []

    /** Normalizes and fills defaults for meta type arguments. */
    protected prepareMetaTypeArgs(metaTypeArgs: MetaTypeArgsType) {
        metaTypeArgs = { ...metaTypeArgs }

        metaTypeArgs.name = metaTypeArgs.name ?? undefined

        metaTypeArgs.noBuiltinValidators = metaTypeArgs.noBuiltinValidators ?? false
        metaTypeArgs.noBuiltinSerializers = metaTypeArgs.noBuiltinSerializers ?? false
        metaTypeArgs.noBuiltinDeSerializers = metaTypeArgs.noBuiltinDeSerializers ?? false

        metaTypeArgs.validators = metaTypeArgs.validators ?? []
        metaTypeArgs.serializers = metaTypeArgs.serializers ?? []
        metaTypeArgs.deserializers = metaTypeArgs.deserializers ?? []

        metaTypeArgs.default = metaTypeArgs.default ?? undefined
        metaTypeArgs.nullish = !!(metaTypeArgs.nullish ?? false)
        metaTypeArgs.nullable = !!(metaTypeArgs.nullable ?? metaTypeArgs.nullish ?? false)
        metaTypeArgs.optional = !!(metaTypeArgs.optional ?? metaTypeArgs.nullish ?? false)
        metaTypeArgs.coercion = !!(metaTypeArgs.coercion ?? false)
        metaTypeArgs.validateType = !!(metaTypeArgs.validateType ?? true)

        // used in metaobjects handler
        metaTypeArgs.safe = !!(metaTypeArgs.safe ?? true)

        return metaTypeArgs
    }

    /** Returns the prepared subtype definition (arrays/objects can override `prepareSubType`). */
    getSubType() {
        return this.prepareSubType(this.metaTypeArgs.subType)
    }

    /** Hook for derived classes to normalize subtype declarations. */
    protected prepareSubType(subType: any) {
        return subType
    }

    /** Adds builtin validators/serializers based on configured arguments. */
    protected configure() {
        if (this.metaTypeArgs.optional === false) {
            this.builtinValidators.push(OptionalValidator)
        }

        if (this.metaTypeArgs.nullable === false) {
            this.builtinValidators.push(NullableValidator)
        }

        if (this.metaTypeArgs.validateType) {
            this.builtinValidators.push(MetaTypeValidator)
        }

        if (this.metaTypeArgs.default !== undefined) {
            this.builtinDeSerializers.push(
                DefaultValueDeSerializerBuilder(this.metaTypeArgs.default)
            )
        }

        if (this.metaTypeArgs.coercion) {
            this.builtinSerializers.push(CoercionSerializer)
            this.builtinDeSerializers.push(CoercionDeSerializer)
        }
    }

    /** Generates a random identifier for debugging/inspection purposes. */
    protected generateId() {
        return (Math.random() + 1).toString(36).substring(7)
    }

    /**
     * Creates a new meta type implementation.
     *
     * @param metaTypeArgs - Arguments or a factory that receives the instance being constructed.
     */
    constructor(
        metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    ) {
        if (metaTypeArgs instanceof Function) {
            metaTypeArgs = metaTypeArgs(this)
        }

        metaTypeArgs = Object.freeze(this.prepareMetaTypeArgs(metaTypeArgs ?? {}))

        this.id = this.generateId()
        this.name =
            metaTypeArgs.name ??
            (this['constructor'] as any).name?.replace('Impl', '')?.toUpperCase()

        Object.defineProperty(this, 'metaTypeArgs', {
            value: metaTypeArgs,
            writable: false,
            configurable: false,
            enumerable: false
        })

        Object.defineProperty(this, 'builtinValidators', {
            value: [],
            writable: false,
            configurable: false,
            enumerable: false
        })

        Object.defineProperty(this, 'builtinSerializers', {
            value: [],
            writable: false,
            configurable: false,
            enumerable: false
        })

        Object.defineProperty(this, 'builtinDeSerializers', {
            value: [],
            writable: false,
            configurable: false,
            enumerable: false
        })

        this.configure()
    }

    /** Instantiates the implementation (used by `MetaType` factory helpers). */
    static build<T extends MetaTypeImpl>(
        this: new (...metaTypeArgs: any) => T,
        metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    ): T {
        return new this(metaTypeArgs)
    }

    /** Rebuilds the current implementation with additional/overriding arguments. */
    rebuild(metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)) {
        const Cls = this.constructor as typeof MetaTypeImpl

        return Cls.build(Cls.combineMetaTypeArgs(this.metaTypeArgs, metaTypeArgs))
    }

    /** String representation displayed in inspectors/logs. */
    toString() {
        return `${this.name}`
    }

    [Symbol.for('nodejs.util.inspect.custom')]() {
        return this.toString()
    }

    /** Hook for structural types to cast raw values before validation. */
    castToType(deserializationArgs: DeSerializerArgsType) {
        return deserializationArgs?.value
    }

    /** Hook for structural types to convert values when serializing. */
    castToRawValue(serializationArgs: SerializerArgsType) {
        return serializationArgs?.value
    }

    private getAllSerializers() {
        const serializers = []

        if (!this.metaTypeArgs.noBuiltinSerializers) {
            serializers.push(...this.builtinSerializers)
        }

        if (this.metaTypeArgs.serializers) {
            serializers.push(
                ...this.metaTypeArgs.serializers.map((v) =>
                    v instanceof Function ? { serialize: v } : v
                )
            )
        }

        return serializers
    }

    /** Runs builtin + custom serializers and returns the final value. */
    serialize(serializationArgs: SerializeMetaTypeArgsType) {
        let value = serializationArgs.value

        const serializers = this.getAllSerializers()

        for (const serializer of serializers) {
            if (
                serializer.serializePlaces &&
                !serializer.serializePlaces.includes(serializationArgs.place || 'unknown')
            ) {
                continue
            }

            try {
                value = serializer.serialize({
                    ...serializationArgs,
                    metaTypeImpl: this,
                    value
                })
            } catch (e) {
                throw new MetaTypeSerializerError(serializer, {
                    ...serializationArgs,
                    metaTypeImpl: this,
                    value,
                    subError: e as Error
                })
            }
        }

        return value
    }

    private getAllDeSerializers() {
        const deserializers = []

        if (!this.metaTypeArgs.noBuiltinDeSerializers) {
            deserializers.push(...this.builtinDeSerializers)
        }

        if (this.metaTypeArgs.deserializers) {
            deserializers.push(
                ...this.metaTypeArgs.deserializers.map((v) =>
                    v instanceof Function ? { deserialize: v } : v
                )
            )
        }

        return deserializers
    }

    /** Runs builtin + custom deserializers and returns the final value. */
    deserialize(deserializationArgs: DeSerializeMetaTypeArgsType) {
        let value = deserializationArgs.value

        const deserializers = this.getAllDeSerializers()

        for (const deserializer of deserializers) {
            if (
                deserializer.deserializePlaces &&
                !deserializer.deserializePlaces.includes(deserializationArgs.place || 'unknown')
            ) {
                continue
            }

            try {
                value = deserializer.deserialize({
                    ...deserializationArgs,
                    metaTypeImpl: this,
                    value
                })
            } catch (e) {
                throw new MetaTypeDeSerializerError(deserializer, {
                    ...deserializationArgs,
                    metaTypeImpl: this,
                    value,
                    subError: e as Error
                })
            }
        }

        return value
    }

    /** Default validator that asks the implementation whether the value is compatible. */
    metaTypeValidatorFunc({ value }: ValidatorArgsType): boolean | Error {
        if (value == null) return true

        return ((this as any).constructor as typeof MetaTypeImpl).isCompatible(value)
    }

    private getAllValidators() {
        const validators = []

        if (!this.metaTypeArgs.noBuiltinValidators) {
            validators.push(...this.builtinValidators)
        }

        if (this.metaTypeArgs.validators) {
            validators.push(
                ...this.metaTypeArgs.validators.map((v) =>
                    v instanceof Function ? { validate: v } : v
                )
            )
        }

        return validators
    }

    /** Runs builtin + custom validators and returns a `ValidationError` when something fails. */
    validate(args: ValidateMetaTypeArgsType): ValidationError | undefined {
        const validators = this.getAllValidators()
        const validatorArgs = {
            value: args.value,
            targetObject: args.targetObject,
            baseObject: args.baseObject,
            path: args.path ?? [],
            stopAtFirstError: args.stopAtFirstError,
            metaTypeImpl: this
        }

        const createNewError = (validator: ValidatorType, subError?: Error) => {
            if (subError instanceof MetaTypeValidatorError) {
                return subError
            }

            if (subError instanceof ValidationError) {
                return subError
            }

            return new MetaTypeValidatorError({
                validator,
                validatorArgs,
                subError
            })
        }

        const errors: MetaTypeValidatorError[] = []

        for (const validator of validators) {
            let newError: MetaTypeValidatorError | ValidationError | undefined = undefined

            try {
                const result = validator.validate(validatorArgs)

                if (!result) {
                    newError = createNewError(validator)
                }

                if (result instanceof Error) {
                    newError = createNewError(validator, result)
                }
            } catch (e) {
                newError = createNewError(validator, e as Error)
            }

            if (newError instanceof MetaTypeValidatorError) {
                errors.push(newError)
            } else if (newError instanceof ValidationError) {
                errors.push(...newError.issues)
            }

            if (newError && (args.stopAtFirstError === undefined || args.stopAtFirstError)) {
                break
            }
        }

        if (errors.length > 0) {
            return new ValidationError(errors)
        }

        return undefined
    }

    /** Checks if the provided value matches the implementation (override in subclasses). */
    static isCompatible(_value: any) {
        return true
    }

    /**
     * Returns a score describing how compatible a value is with this implementation.
     * Higher score wins when resolving meta types dynamically.
     */
    static getCompatibilityScore(_value: any) {
        return -1
    }

    /** Decorator helper that registers an implementation so it can be resolved automatically. */
    static registerMetaType() {
        return (type: StaticClass<typeof MetaTypeImpl>) => {
            MetaTypeImpl._metaTypesRegistry[type.name] = type
        }
    }

    /** Utility that merges two argument objects (or factories). */
    static combineMetaTypeArgs(
        metaTypeArgs1?:
            | MetaTypeArgsType
            | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
            | null,
        metaTypeArgs2?:
            | MetaTypeArgsType
            | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
            | null
    ) {
        if (metaTypeArgs1 instanceof Function || metaTypeArgs2 instanceof Function) {
            return (metaTypeImpl: MetaTypeImpl) => {
                if (metaTypeArgs1 instanceof Function) {
                    metaTypeArgs1 = metaTypeArgs1(metaTypeImpl) || {}
                }

                if (metaTypeArgs2 instanceof Function) {
                    metaTypeArgs2 = metaTypeArgs2(metaTypeImpl) || {}
                }

                return {
                    ...metaTypeArgs1,
                    ...metaTypeArgs2
                }
            }
        } else {
            return {
                ...(metaTypeArgs1 ?? {}),
                ...(metaTypeArgs2 ?? {})
            }
        }
    }

    /**
     * Finds the best registered implementation for the provided value using compatibility score.
     */
    static getMetaTypeImplClass(value: any) {
        let maxCompatibilityScore = -Infinity
        let maxCompatibilityScoreTypeImplCls = undefined

        for (const metaTypeImplCls of Object.values(this._metaTypesRegistry)) {
            if (metaTypeImplCls.isCompatible(value)) {
                const compatibilityScore = metaTypeImplCls.getCompatibilityScore(value)

                if (compatibilityScore > maxCompatibilityScore) {
                    maxCompatibilityScore = compatibilityScore
                    maxCompatibilityScoreTypeImplCls = metaTypeImplCls
                }
            }
        }

        return maxCompatibilityScoreTypeImplCls
    }

    /**
     * Resolves an existing implementation instance for the provided value (value can be
     * a meta type, `MetaTypeImpl`, plain schema, etc.).
     */
    static getMetaTypeImpl(
        value: any,
        metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    ): MetaTypeImpl | undefined {
        if (MetaType.isMetaType(value)) {
            value = MetaType.getMetaTypeImpl(value)
        }

        if (value instanceof MetaTypeImpl) {
            return value
        }

        const metaTypeImplCls = this.getMetaTypeImplClass(value)

        if (!metaTypeImplCls) return

        return metaTypeImplCls.build(this.combineMetaTypeArgs({ subType: value }, metaTypeArgs))
    }

    /**
     * Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).
     */
    static getMetaType(
        value: any,
        metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    ): MetaType<unknown> | undefined {
        const metaTypeImplInstance = this.getMetaTypeImpl(value, metaTypeArgs)

        if (!metaTypeImplInstance) return

        return MetaType<any>(metaTypeImplInstance)
    }
}
