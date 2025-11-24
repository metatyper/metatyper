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

export type ValidateMetaTypeArgsType = {
    value: any
    path?: (string | number | symbol)[]
    targetObject?: object
    baseObject?: object
    stopAtFirstError?: boolean
} & Record<string, any>

export type ValidatorArgsType = ValidateMetaTypeArgsType & {
    metaTypeImpl?: MetaTypeImpl
}

export type ValidatorFuncType = (validationArgs: ValidatorArgsType) => boolean | Error
export type ValidatorType = { name?: string; validate: ValidatorFuncType }

export type SerializeMetaTypeArgsType = {
    value: any
    propName?: string | symbol
    targetObject?: object
    baseObject?: object
    place?: SerializePlaceType
} & Record<string, any>

export type SerializerArgsType = SerializeMetaTypeArgsType & {
    metaTypeImpl?: MetaTypeImpl
}

export type SerializeFuncType = (serializeArgs: SerializerArgsType) => any
export type SerializePlaceType = 'get' | 'serialize' | 'unknown'
export type SerializerType = {
    serialize: SerializeFuncType

    name?: string
    serializePlaces?: SerializePlaceType[] | string[]
}

export type DeSerializeMetaTypeArgsType = {
    value: any
    propName?: string | symbol
    targetObject?: object
    baseObject?: object
    place?: DeSerializePlaceType
}
export type DeSerializerArgsType = DeSerializeMetaTypeArgsType & {
    metaTypeImpl?: MetaTypeImpl
}
export type DeSerializeFuncType = (deserializeArgs: DeSerializerArgsType) => any
export type DeSerializePlaceType = 'init' | 'reinit' | 'set' | 'deserialize' | 'unknown'
export type DeSerializerType = {
    deserialize: DeSerializeFuncType

    name?: string
    deserializePlaces?: DeSerializePlaceType[] | string[]
}

/**
 * This represents the arguments for creating a meta type.
 *
 * @param name - A string that overrides the default name of the meta type.
 *               The name is used when displaying the meta type.
 *
 * @param subType - A meta type or a value that defines the type of the nested values in the value.
 *                  For example, if the value is an array, you can use the subType to specify
 *                  the type of the elements in the array.
 *
 * @param default - A value or a function that returns a value that is used as the default value
 *                  for the meta type. The default value is used when the initial value is `undefined`.
 *
 * @param nullish - A boolean indicating whether the value can be `null` or `undefined`.
 *                  If `false`, a `NullableValidator` and an `OptionalValidator` are added to the meta type.
 *                  The default value is `false`.
 *
 * @param nullable - A boolean indicating whether the value can be `null`.
 *                   If `false`, a `NullableValidator` is added to the meta type.
 *                   If `nullish` and `nullable` are contradictory, the value of `nullable` will be chosen.
 *                   Default value is the same as `nullish`
 *
 * @param optional - A boolean indicating whether the value can be `undefined`.
 *                   If `false`, an `OptionalValidator` is added to the meta type.
 *                   If `nullish` and `optional` are contradictory, the value of `optional` will be chosen.
 *                   Default value is the same as `nullish`
 *
 * @param coercion - A boolean that indicates whether the value should be coerced to the expected type or not.
 *                   If `true`, an `CoercionSerializer` is added to the meta type, which tries to convert
 *                   the main value to the appropriate type. For example, if the meta type is a string,
 *                   and the main value is a number, the number will be cast to a string.
 *
 * @param validateType - A boolean that indicates whether the value should be validated against
 *                       the expected type or not. If `true`, a `MetaTypeValidator` is added to the meta type,
 *                       which checks that the main value matches the meta type. Default value is `true`.
 *
 * @param noBuiltinValidators - A boolean that indicates whether the built-in validators should be disabled or not.
 *                              If `true`, the meta type will not use any of the default validators,
 *                              like `MetaTypeValidator` or NullableValidator. Default value is `false`.
 *
 * @param noBuiltinSerializers - A boolean that indicates whether the built-in serializers should be disabled or not.
 *                               If `true`, the meta type will not use any of the default serializers,
 *                               like `CoercionSerializer`. Default value is `false`.
 *
 * @param noBuiltinDeSerializers - A boolean that indicates whether the built-in deserializers should be disabled or not.
 *                                 If `true`, the meta type will not use any of the default deserializers,
 *                                 like `CoercionSerializer` or `ToLowerCaseSerializer` (case argument in STRING).
 *                                 Default value is `false`.
 *
 * @param validators - An array of validators that are used to check the value when it is assigned
 *                     to an object property.
 *
 * @param serializers - An array of serializers that change the value when it is retrieved from the object.
 *                      For example, `obj[prop]` or `Meta.serialize(obj)`.
 *
 * @param deserializers - An array of deserializers that modify the value when it is set to an object property,
 *                        prior to validation. For example, `obj[prop] = 'value'` or
 *                        `Meta.deserialize(metaObject, rawObject)`.
 *
 * @param safe - A boolean that indicates whether validation errors should be thrown
 *               or handled silently in case meta object validation.
 *               Default value is `true`.
 *
 * @typeParam T - The type of the value. This is used to infer the type of the default argument.
 * @typeParam IsNullableT - A boolean that indicates whether the value can be null or undefined.
 *                          This is inferred from the nullable argument.
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

        metaTypeArgs.safe = !!(metaTypeArgs.safe ?? true)

        return metaTypeArgs
    }

    getSubType() {
        return this.prepareSubType(this.metaTypeArgs.subType)
    }

    protected prepareSubType(subType: any) {
        return subType
    }

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

    protected generateId() {
        return (Math.random() + 1).toString(36).substring(7)
    }

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

    static build<T extends MetaTypeImpl>(
        this: new (...metaTypeArgs: any) => T,
        metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    ): T {
        return new this(metaTypeArgs)
    }

    rebuild(metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)) {
        const Cls = this.constructor as typeof MetaTypeImpl

        return Cls.build(Cls.combineMetaTypeArgs(this.metaTypeArgs, metaTypeArgs))
    }

    toString() {
        return `${this.name}`
    }

    [Symbol.for('nodejs.util.inspect.custom')]() {
        return this.toString()
    }

    castToType(deserializationArgs: DeSerializerArgsType) {
        return deserializationArgs?.value
    }

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

    static isCompatible(_value: any) {
        return true
    }

    static getCompatibilityScore(_value: any) {
        return -1
    }

    static registerMetaType() {
        return (type: StaticClass<typeof MetaTypeImpl>) => {
            MetaTypeImpl._metaTypesRegistry[type.name] = type
        }
    }

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

    static getMetaType(
        value: any,
        metaTypeArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    ): MetaType<unknown> | undefined {
        const metaTypeImplInstance = this.getMetaTypeImpl(value, metaTypeArgs)

        if (!metaTypeImplInstance) return

        return MetaType<any>(metaTypeImplInstance)
    }
}
