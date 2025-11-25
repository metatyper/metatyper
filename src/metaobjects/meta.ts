import { MetaType, MetaTypeArgsType, MetaTypeBase, MetaTypeImpl } from '../metatypes'
import { getDescriptorValue } from '../utils'
import { MetaObjectsBuilder } from './builder'
import { MetaObjectsHandler } from './handler'
import { MetaObjectRegistryInfo } from './registry'
import {
    IsMetaObjectSymbol,
    MetaObjectBuilderSymbol,
    MetaObjectRegistryInfoSymbol
} from './symbols'

const reflectMetadata = (Reflect as any)['getMetadata']

/** Extra arguments that control how `Meta.validate` reports issues. */
export type ValidateMetaObjectArgsType = {
    /** Meta arguments to apply temporarily while validating. */
    metaArgs?: MetaArgsType

    /** When `true`, validation stops at the first issue (default). */
    stopAtFirstError?: boolean
} & Record<string, any>

/** Extra arguments that control how `Meta.serialize` behaves. */
export type SerializeMetaObjectArgsType = {
    /** Overrides used when building a meta object from a plain schema before serialization. */
    metaArgs?: MetaArgsType
} & Record<string, any>

/** Extra arguments that control how `Meta.deserialize` behaves. */
export type DeSerializeMetaObjectArgsType = {
    /** Overrides used when schema/proto needs to be wrapped into a meta object before deserializing. */
    metaArgs?: MetaArgsType
} & Record<string, any>

/** Lifecycle actions that can trigger a change handler. */
export type MetaChangeHandlerActionType = 'init' | 'set' | 'delete' | 'define' | 'deserialize'

/** Arguments passed to change handlers describing what exactly changed. */
export type MetaChangeHandlerArgsType = {
    /** The action that occurred (e.g. `set`, `delete`). */
    action: MetaChangeHandlerActionType

    /** Proxy object exposed to consumers. */
    targetObject: object

    /** Underlying base object that stores state. */
    baseObject: object

    /** Affected property name or symbol. */
    propName: string | symbol

    /** Descriptor before change (if any). */
    prevDescriptor?: PropertyDescriptor

    /** Descriptor after change (if any). */
    descriptor?: PropertyDescriptor

    /** Previous meta type declaration for the property. */
    prevDeclaration?: MetaTypeImpl

    /** Current meta type declaration for the property. */
    declaration?: MetaTypeImpl
}

/** Registration info for change handlers (which handler, for which actions/props). */
export type MetaChangeHandlerInfoType = {
    /** The handler callback to invoke. */
    handler: (args: MetaChangeHandlerArgsType) => void

    /** Optional action filter; empty array means all actions. */
    actions?: MetaChangeHandlerActionType[]

    /** Optional property filter. */
    props?: (string | symbol)[]
}

/** Places where an error handler can be triggered. */
export type MetaErrorHandlerPlaceType =
    | 'init'
    | 'get'
    | 'set'
    | 'define'
    | 'delete'
    | 'validate'
    | 'deserialize'
    | 'serialize'

/** Arguments passed to an error handler when meta logic throws. */
export type MetaErrorHandlerArgsType = {
    /** The thrown error instance. */
    error: Error

    /** Which lifecycle place raised the error. */
    errorPlace: MetaErrorHandlerPlaceType

    /** Property name involved in the error, if any. */
    propName?: string | symbol

    /** Proxy object exposed to consumers. */
    targetObject: object

    /** Underlying base object. */
    baseObject: object
}

/** Registration info for error handlers (which handler, for which places). */
export type MetaErrorHandlerInfoType = {
    /** The handler callback to invoke. */
    handler: (args: MetaErrorHandlerArgsType) => void

    /** Optional place filter. */
    places?: MetaErrorHandlerPlaceType[]
}

/** Resolves any value into a concrete `MetaTypeImpl`. */
export type MetaTypesResolver = (value: any, args?: MetaTypeArgsType) => MetaTypeImpl

/**
 * Arguments that define how a meta object or class is built and behaves.
 *
 * @property name - Overrides the default display name of the meta object/class.
 * @property initialValues - Initial property values applied before validation/serialization.
 * @property ignoreProps - Properties to ignore or a predicate that decides which props to ignore.
 * @property validationIsActive - Enables/disables validation (enabled by default).
 * @property serializationIsActive - Enables/disables serialization/deserialization (enabled by default).
 * @property changeHandlers - Custom change handlers that react to meta object mutations.
 * @property errorHandlers - Custom error handlers invoked when meta operations throw.
 * @property metaTypesArgs - Meta type arguments or resolver used while building declarations.
 * @property metaTypesResolver - Custom function that resolves a value to a `MetaType` implementation.
 * @property autoResolveMetaTypes - Automatically resolve declarations from initial values.
 * @property dynamicDeclarations - Allow adding new declarations at runtime via property assignments.
 * @property metaInstanceArgs - Extra arguments used when building meta instances for classes (`'same'` to reuse).
 * @property buildMetaInstance - When `false`, skips building meta instances for classes.
 * @property metaBuilder - Custom builder instance to use instead of the global singleton.
 */
export type MetaArgsType = {
    name?: string
    initialValues?: Record<string | symbol, any>
    ignoreProps?: (string | symbol)[] | ((propName: string | symbol) => boolean)
    validationIsActive?: boolean
    serializationIsActive?: boolean
    changeHandlers?: MetaChangeHandlerInfoType[]
    errorHandlers?: MetaErrorHandlerInfoType[]
    metaTypesArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)
    metaTypesResolver?: MetaTypesResolver
    autoResolveMetaTypes?: boolean
    dynamicDeclarations?: boolean
    metaInstanceArgs?: MetaArgsType | 'same'
    buildMetaInstance?: boolean
    metaBuilder?: MetaObjectsBuilder
} & Record<string, any>

/** Metadata describing a class property decorated via `Meta.declare`. */
export type InitialClassPropertyDeclarationInfo = {
    /** Property name on the prototype/constructor. */
    propName: string

    /** Meta type implementation explicitly provided for the property. */
    metaTypeImpl?: MetaTypeImpl

    /** Arguments used to rebuild or tweak the meta type implementation. */
    metaTypeArgs?: MetaTypeArgsType

    /** Property descriptor snapshot at declaration time. */
    descriptor?: PropertyDescriptor

    /** Reflected design type (via reflect-metadata) if available. */
    reflectType: any
}

export type Meta<T> = (T extends new (...args: infer A) => infer R
    ? (new (...args: A) => Meta<R>) & {
          [K in keyof T]: T[K]
      }
    : T extends Record<any, never>
      ? object
      : T) & {
    [IsMetaObjectSymbol]?: true
}
/**
 * Create a Meta object
 *
 * @param protoObject - The plain object used as the prototype/schema for the meta object.
 * @param metaArgs - Configuration arguments ({@link MetaArgsType}) for creating the meta object.
 *
 * @returns A new Meta object
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *   id: NUMBER({ optional: true }),
 *   name: 'John Doe',
 *   stars: NUMBER({ default: 0, min: 0 })
 * })
 *
 * obj1.id = 1
 * obj1.id = 'str' // will throw an validation error
 *
 * class MyCls {
 *      static someClsProp = STRING({ default: '' })
 *
 *      someInstanceProp = NUMBER({ default: 0 })
 * }
 *
 * const MyMetaCls = Meta(MyCls)
 *
 * MyMetaCls.someClsProp = 'str'
 * MyMetaCls.someClsProp = 1 // will throw an validation error
 *
 *
 * const myInstance = new MyMetaCls()
 *
 * myInstance.someInstanceProp = 2
 * myInstance.someInstanceProp = '2' // will throw an validation error
 * ```
 *
 * @remarks
 * The `Meta` function also provides several utility methods.
 * These methods are available on the `Meta` object and can be used to interact with meta objects.
 * The methods are:
 * - `Meta.copy(metaObject)` - {@link MetaCopy} - Creates a copy of a meta object preserving its values, types, prototype and arguments.
 * - `Meta.rebuild(metaObject)` - {@link MetaRebuild} - Rebuilds a meta object using the same original object and arguments, resetting to initial state.
 * - `Meta.isMetaObject(obj)` - {@link MetaIsMetaObject} - Checks if an object is a meta object.
 * - `Meta.isIgnoredProp(propName)` - {@link MetaIsIgnoredProp} - Checks if a property is ignored by Meta.
 * - `@Meta.Class(metaArgs)` - {@link MetaClass} - Decorator for transforming a class into a meta class.
 * - `@Meta.declare(metaType)` - {@link MetaDeclare} - Decorator for declaring meta type information on class properties.
 * - `Meta.serialize(metaObject)` - {@link MetaSerialize} - Serializes a meta object.
 * - `Meta.deserialize(data, protoObject)` - {@link MetaDeserialize} - Deserializes a value into a meta object.
 * - `Meta.toJson(metaObject)` - {@link MetaToJson} - Serializes a meta object into a JSON string.
 * - `Meta.fromJson(data, protoObject)` - {@link MetaFromJson} - Deserializes a JSON string into a meta object.
 * - `Meta.represent(metaObject)` - {@link MetaRepresent} - Generates a textual representation of a meta object.
 * - `Meta.getProto(metaObject)` - {@link MetaProto} - Retrieves the prototype of the meta object.
 * - `Meta.getMetaArgs(metaObject)` - {@link MetaGetMetaArgs} - Retrieves the meta arguments used to create a meta object.
 * - `Meta.validationIsActive(metaObject)` - {@link MetaValidationIsActive} - Checks if validation is active for the given meta object.
 * - `Meta.disableValidation(metaObject)` - {@link MetaDisableValidation} - Disables validation for the specified meta object.
 * - `Meta.enableValidation(metaObject)` - {@link MetaEnableValidation} - Enables validation for the specified meta object.
 * - `Meta.serializationIsActive(metaObject)` - {@link MetaSerializationIsActive} - Checks if serialization is active for the given meta object.
 * - `Meta.disableSerialization(metaObject)` - {@link MetaDisableSerialization} - Disables serialization for the specified meta object.
 * - `Meta.enableSerialization(metaObject)` - {@link MetaEnableSerialization} - Enables serialization for the specified meta object.
 */
export function Meta<T extends object>(protoObject?: T, metaArgs?: MetaArgsType) {
    const builder = metaArgs?.metaBuilder ?? MetaObjectsBuilder.instance

    return builder.build(protoObject, metaArgs) as Meta<T>
}

/**
 * Alias for the `Meta`
 *
 */
export const M = Meta

/**
 * Transforms a class into a meta class using the provided meta arguments.
 *
 * The `Meta.Class` decorator enhances a class by applying meta object behavior to it,
 * allowing for runtime type checking, validation, and serialization based on the specified meta arguments.
 *
 * @param metaArgs - Configuration arguments ({@link MetaArgsType}) for creating the meta class and meta instances.
 *
 * @returns A decorator function that takes a class and returns its meta class equivalent.
 *
 * @example
 * ```ts
 * @Meta.Class({ metaTypesArgs: { optional: true } })
 * class User {
 *   id = NUMBER()
 *   name = STRING({ minLength: 3 })
 * }
 *
 * const user = new User()
 *
 * user.id = 1 // OK
 * user.name = 'John' // OK
 * user.name = 'Jo' // Throws a validation error
 * ```
 */
export function MetaClass(metaArgs?: MetaArgsType) {
    return <T extends new (...args: any[]) => any>(cls: T) => {
        return Meta(cls, metaArgs) as any
    }
}

Meta.Class = MetaClass

/**
 * Decorator for declaring meta type information for class properties.
 *
 * The `declare` decorator allows you to specify meta type information directly on class properties.
 * This facilitates runtime type checking, validation, and serialization/deserialization of property values
 * based on the provided meta type or meta type arguments.
 *
 * @param metaType - The meta type instance to apply to the class property.
 *
 * @returns A decorator function that applies the specified meta type information to the target class property.
 *
 * @example
 * ```ts
 * import { Meta } from 'metatyper'
 *
 * @Meta.Class()
 * class User {
 *   @Meta.declare(NUMBER({ min:0, optional:true }))
 *   id: number | undefined
 * }
 * ```
 */
export function MetaDeclare<T extends object, K extends keyof T = keyof T>(
    metaType: T[K]
): (target: T, propName: K) => void

/**
 * Decorator for declaring meta type information for class properties.
 *
 * The `declare` decorator allows you to specify meta type information directly on class properties.
 * This facilitates runtime type checking, validation, and serialization/deserialization of property values 
 * based on the provided meta type or meta type arguments.
 * 
 * @param metaTypeArgs - The meta type arguments to apply to the class property. 
 *                       The meta type itself will be reflected from the TypeScript property type using reflect-metadata.
 *
 * @returns A decorator function that applies the specified meta type information to the target class property.
 *
 * @example
 * Reflect metatype from class property type:
 * ```ts
 * import 'reflect-metadata'
 *
 * import { Meta } from 'metatyper'
 *
 * @Meta.Class()
 * class Product {

 *   @Meta.declare({ min: 0, optional: true })
 *   price?: number
 * 
 * }
 * ```
 */
export function MetaDeclare<T extends object, K extends keyof T, IsNullableT extends boolean>(
    metaTypeArgs?: MetaTypeArgsType<T[K], IsNullableT>
): (target: T, propName: K) => void

export function MetaDeclare(metaTypeOrArgs?: MetaTypeBase | MetaTypeArgsType | null) {
    return (target: object, propName: string, descriptor?: TypedPropertyDescriptor<any>) => {
        const metaTypeImpl = MetaType.isMetaType(metaTypeOrArgs)
            ? MetaType.getMetaTypeImpl(metaTypeOrArgs as any) ?? undefined
            : undefined

        const metaTypeArgs = MetaType.isMetaType(metaTypeOrArgs)
            ? undefined
            : (metaTypeOrArgs as MetaTypeArgsType)

        const declarationInfo: InitialClassPropertyDeclarationInfo = {
            propName,
            metaTypeImpl,
            metaTypeArgs,
            descriptor,
            reflectType: reflectMetadata ? reflectMetadata('design:type', target, propName) : null
        }

        MetaObjectsBuilder.instance.addInitialClassDeclarationInfo(target, declarationInfo)
    }
}

Meta.declare = Meta.d = MetaDeclare

/**
 * Checks if the provided object is a meta object.
 *
 * This function determines whether the given object has been enhanced with meta object behavior, such as runtime type checking, validation, and serialization capabilities.
 *
 * @param metaObject - The object to check.
 *
 * @returns `true` if the object is a meta object, otherwise `false`.
 *
 * @example
 * ```ts
 * const metaObject = Meta({})
 *
 * console.log(Meta.isMetaObject(metaObject)) // true
 *
 * const plainObject = { id: 1, name: "John" }
 * console.log(Meta.isMetaObject(plainObject)) // false
 * ```
 */
export const MetaIsMetaObject = (Meta.isMetaObject = function isMetaObject(
    metaObject?: object | null
) {
    return getDescriptorValue(metaObject, IsMetaObjectSymbol) || false
})

/**
 * Checks if propName is ignored.
 *
 * @param metaObject - The object to check.
 * @param propName - The property to check.
 *
 * @returns `true` if the property is is ignored, otherwise `false`.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ a: 1 }, { ignoreProps: ['a'] })
 *
 * console.log(Meta.isIgnoredProp(metaObject, 'a')) // true
 * console.log(Meta.isIgnoredProp(metaObject, 'prototype')) // true, because built-in
 * ```
 */
export function MetaIsIgnoredProp(metaObject: object, propName: string | symbol) {
    if (!Meta.isMetaObject(metaObject)) {
        return true
    }

    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.isIgnoredProp(metaObject, propName)
}

Meta.isIgnoredProp = MetaIsIgnoredProp

/**
 * Checks if validation is active for the given meta object.
 *
 * This function determines whether validation is currently enabled for the specified meta object.
 * Validation is a key feature of meta objects,
 * allowing for runtime type checking and constraint validation based on the meta types defined for the object's properties.
 *
 * @param metaObject - The meta object to check for active validation.
 *
 * @returns `true` if validation is active for the meta object, otherwise `false`.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ id: 0 })
 *
 * // Assuming validation is enabled by default or explicitly
 * console.log(Meta.validationIsActive(metaObject)) // true
 *
 * Meta.disableValidation(metaObject)
 *
 * console.log(Meta.validationIsActive(metaObject)) // false
 * ```
 */
export function MetaValidationIsActive(metaObject: object) {
    const registryInfo = getDescriptorValue(
        metaObject,
        MetaObjectRegistryInfoSymbol
    ) as MetaObjectRegistryInfo

    return registryInfo?.validationIsActive ?? false
}

Meta.validationIsActive = MetaValidationIsActive

/**
 * Disables validation for the specified meta object.
 *
 * This function deactivates validation for a meta object,
 * turning off runtime type checking and constraint validation based on the meta types defined for the object's properties.
 * Disabling validation can be useful in scenarios where you need to temporarily bypass validation rules, such as during data migration,
 * testing, or when working with partially complete data models.
 *
 * @param metaObject - The meta object for which to disable validation.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ id: 0 })
 *
 * // Initially, validation is enabled
 * console.log(Meta.validationIsActive(metaObject)) // true
 *
 * Meta.disableValidation(metaObject)
 *
 * console.log(Meta.validationIsActive(metaObject)) // false
 *
 * // Now, assigning invalid values won't throw validation errors
 * metaObject.id = 'not a number' // No validation error
 * ```
 */
export function MetaDisableValidation(metaObject: object) {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        validationIsActive: false
    })
}

Meta.disableValidation = MetaDisableValidation

/**
 * Enables validation for the specified meta object.
 *
 * This function activates validation for a meta object, enabling runtime type checking and
 * constraint validation based on the meta types defined for the object's properties.
 * Use this function to re-enable validation for meta objects, especially after temporarily disabling validation
 * for certain operations or during specific phases of your application's lifecycle.
 *
 * @param metaObject - The meta object for which to enable validation.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ id: 0 })
 *
 * // Initially, validation might be disabled
 * Meta.disableValidation(metaObject)
 *
 * console.log(Meta.validationIsActive(metaObject)) // false
 *
 * // Enabling validation
 * Meta.enableValidation(metaObject)
 *
 * console.log(Meta.validationIsActive(metaObject)) // true
 * ```
 *
 */
export function MetaEnableValidation(metaObject: object) {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        validationIsActive: true
    })
}

Meta.enableValidation = MetaEnableValidation

/**
 * Checks if serialization is active for the given meta object.
 *
 * This function determines whether serialization and deserialization functionalities are currently enabled for the specified meta object.
 * This function is useful for dynamically checking the serialization state of meta objects,
 * especially when working with data that needs to be serialized for storage or network transmission,
 * or when needing to temporarily disable serialization for certain operations.
 *
 * @param metaObject - The meta object to check for active serialization.
 *
 * @returns `true` if serialization is active for the meta object, otherwise `false`.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ id: 0 })
 *
 * // Assuming serialization is enabled by default or explicitly
 * console.log(Meta.serializationIsActive(metaObject)) // true
 *
 * Meta.disableSerialization(metaObject)
 *
 * console.log(Meta.serializationIsActive(metaObject)) // false
 * ```
 */
export function MetaSerializationIsActive(metaObject: object) {
    const registryInfo = getDescriptorValue(
        metaObject,
        MetaObjectRegistryInfoSymbol
    ) as MetaObjectRegistryInfo

    return registryInfo?.serializationIsActive ?? false
}

Meta.serializationIsActive = MetaSerializationIsActive

/**
 * Disables serialization for the specified meta object.
 *
 * This function deactivates serialization and deserialization functionalities for a meta object.
 * By disabling serialization, you prevent the automatic conversion of complex objects into simpler formats suitable for storage or transmission,
 * and vice versa, based on the meta types defined for the object's properties.
 * Disabling serialization can be useful in scenarios where you need to temporarily bypass serialization rules,
 * such as during certain data processing operations or when working with data that should not be altered.
 *
 * @param metaObject - The meta object for which to disable serialization.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ id: NUMBER({ coercion: true, default: 0 }) })
 *
 * // Initially, serialization is enabled
 * console.log(Meta.serializationIsActive(metaObject)) // true
 *
 * Meta.disableSerialization(metaObject)
 *
 * console.log(Meta.serializationIsActive(metaObject)) // false
 *
 * // Now, assigning or retrieving values won't trigger deserialization
 * metaObject.id = '123' // No deserialization occurs and it will throw an validation error
 * ```
 */
export function MetaDisableSerialization(metaObject: object) {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        serializationIsActive: false
    })
}

Meta.disableSerialization = MetaDisableSerialization

/**
 * Enables serialization for the specified meta object.
 *
 * This function activates serialization and deserialization functionalities for a meta object.
 * Use this function to re-enable serialization for meta objects, especially after temporarily disabling serialization
 * for certain operations or during specific phases of your application's lifecycle.
 *
 * @param metaObject - The meta object for which to enable serialization.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ id: NUMBER({ coercion: true, default: 0 }) })
 *
 * // Initially, serialization might be disabled
 * Meta.disableSerialization(metaObject)
 *
 * console.log(Meta.serializationIsActive(metaObject)) // false
 *
 * Meta.enableSerialization(metaObject)
 *
 * console.log(Meta.serializationIsActive(metaObject)) // true
 *
 * // Now, assigning and retrieving values will trigger serialization and deserialization
 * metaObject.id = '123' // Deserialization occurs, converting '123' to number
 * ```
 */
export function MetaEnableSerialization(metaObject: object) {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        serializationIsActive: true
    })
}

Meta.enableSerialization = MetaEnableSerialization

/**
 * Validates a plain object against a meta object schema or a meta object, ensuring it conforms to the defined types and constraints.
 * If the object is valid according to the meta object schema, the function returns undefined.
 * If the object is not valid, it returns `ValidationError`,
 *
 * @param metaObjectOrProto - The meta object or plain object as a schema against which to validate the `rawObject`.
 * @param rawObject - The plain object to validate.
 * @param validateArgs - arguments to customize the validation behavior, such as disabling throwing errors.
 *
 * @example
 * ```ts
 * const userSchema = {
 *   id: NUMBER(),
 *   name: STRING({ minLength: 3 })
 * }
 *
 * const validUser = { id: 1, name: 'John Doe' }
 * const invalidUser = { id: 'not a number', name: 'JD' }
 *
 * const error = Meta.validate(userSchema, validUser)
 * // error === undefined
 *
 * const error = Meta.validate(userSchema, invalidUser)
 * // error instanceof ValidationError
 * ```
 */
export function validateMeta(
    metaObjectOrProto: object,
    rawObject: object,
    validateArgs?: ValidateMetaObjectArgsType
) {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObjectOrProto, MetaObjectBuilderSymbol)?.handler ??
        MetaObjectsBuilder.instance.handler

    return handlerInstance.validate(metaObjectOrProto, rawObject, validateArgs)
}

Meta.validate = validateMeta

/**
 * Serializes a meta object into a plain object.
 * This function is particularly useful when you need to convert a meta object back into a simple JavaScript object,
 * for instance, before sending it over a network or saving it to storage.
 *
 * @typeParam ResultT - The expected result type of the serialized object.
 * If not specified, the result will have the same properties as the original meta object, but with `any` type .
 * @typeParam T - The type of the original meta object.
 *
 * @param metaObject - The meta object or a plain object to serialize.
 * If a plain object is provided, it is first converted into a meta object using the provided `serializeArgs.metaArgs`.
 * @param serializeArgs - arguments to customize the serialization behavior.
 *
 * @returns A new plain object with properties and values serialized from the meta object.
 *
 * @example
 * ```ts
 * const user = Meta({
 *   id: NUMBER(),
 *   name: STRING(),
 *   registrationDate: DATE({ coercion: true })
 * }, {
 *   metaTypesArgs: { optional: true }
 * })
 *
 * user.id = 1
 * user.name = 'John Doe'
 * user.registrationDate = new Date("2024-01-01")
 *
 * // Serializing the meta object to a plain object
 * const serializedUser = Meta.serialize(user)
 *
 * console.log(serializedUser)
 * // Output might be:
 * // {
 * //   id: 1,
 * //   name: 'John Doe',
 * //   registrationDate: 1704067200000  // Date -> date.getTime()
 * // }
 * ```
 */
export function MetaSerialize<ResultT extends object = never, T extends object = object>(
    metaObject: Meta<T> | T,
    serializeArgs?: SerializeMetaObjectArgsType
): [ResultT] extends [never] ? { [key in keyof T]: any } : ResultT {
    if (!Meta.isMetaObject(metaObject)) {
        metaObject = Meta(metaObject, serializeArgs?.metaArgs) as any
    }

    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.serialize(metaObject, serializeArgs) as any
}

Meta.serialize = MetaSerialize

/**
 * Deserializes a raw object into a meta object, updating or creating it based on the provided arguments.
 * This function is particularly useful for converting plain objects into structured, validated meta objects,
 * enabling runtime type checking, validation, and serialization capabilities.
 *
 * If the first argument is already a meta object,
 * it updates this object with new properties from the raw object,
 * applying any necessary deserialization and validation according to the meta object's schema.
 * If the first argument is a plain object or class,
 * a new meta object is created using the provided `deserializeArgs.metaArgs` and the properties from the raw object.
 *
 * @typeParam T - The type of the target meta object.
 *
 * @param metaObjectOrProto - The meta object to update, or a simple object/class from which to create a new meta object.
 * @param rawObject - The plain object containing new properties to deserialize into the meta object.
 * @param deserializeArgs - arguments to customize the deserialization behavior, including `metaArgs` to apply if creating a new meta object.
 *
 * @returns The updated or newly created meta object with properties deserialized from the raw object.
 *
 * @example
 * ```ts
 * const userMeta = Meta({
 *   id: NUMBER({ default: 0 }),
 *   name: STRING({ default: '' }),
 *   isActive: BOOLEAN({ default: true })
 * })
 *
 * // Deserializing updates into an existing meta object
 * const updatedUserMeta = Meta.deserialize(userMeta, { id: 2, name: 'Jane Doe' })
 * console.log(updatedUserMeta) // Meta object with updated id and name
 * console.log(updatedUserMeta === userMeta) // true
 *
 * // Creating a new meta object from a raw object
 * const newUserMeta = Meta.deserialize({ id: NUMBER(), name: STRING() }, { id: 3, name: "Alice" })
 * console.log(newUserMeta) // New meta object with id and name from rawObject
 * ```
 */
export function MetaDeserialize<T extends object>(
    metaObjectOrProto: Meta<T> | T,
    rawObject: object,
    deserializeArgs?: DeSerializeMetaObjectArgsType
): Meta<T> {
    if (Meta.isMetaObject(metaObjectOrProto)) {
        const handlerInstance: MetaObjectsHandler =
            getDescriptorValue(metaObjectOrProto, MetaObjectBuilderSymbol)?.handler ??
            MetaObjectsBuilder.instance.handler

        return handlerInstance.deserialize(metaObjectOrProto, rawObject, deserializeArgs) as any
    } else {
        let preparedMetaArgs: MetaArgsType = { ...(deserializeArgs?.metaArgs ?? {}) }

        preparedMetaArgs = {
            ...preparedMetaArgs,
            initialValues: { ...preparedMetaArgs.initialValues, ...rawObject }
        }

        return Meta(metaObjectOrProto, preparedMetaArgs) as any
    }
}

Meta.deserialize = MetaDeserialize

/**
 * Creates a copy of a meta object, preserving its public properties, values, types, and prototype.
 * This method is particularly useful for creating independent instances of meta objects that share the same structure but need to manage their own state.
 * If the provided argument is not a meta object, the function returns `null`, indicating that no copy can be made.
 *
 * @typeParam T - The type of the original meta object.
 *
 * @param metaObject - The meta object to copy.
 *
 * @returns A copy of the meta object if the argument is a meta object, otherwise `null`.
 *
 * @example
 * ```ts
 * const originalMetaObject = Meta({
 *   id: 1,
 *   name: 'John Doe',
 *   isActive: BOOLEAN({ default: true })
 * })
 *
 * // Creating a copy of the meta object
 * const copiedMetaObject = Meta.copy(originalMetaObject)
 *
 * console.log(copiedMetaObject)
 * // Output: A new meta object with the same properties and values as originalMetaObject
 * ```
 */
export function MetaCopy<T extends object>(
    metaObject: T
): Required<T> extends Required<Meta<unknown>> ? T : Meta<T> | null {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.copy(metaObject) as any
}

Meta.copy = MetaCopy

/**
 * Retrieves the prototype (original object) used to create a meta object.
 * This function is particularly useful when you need to access the original structure or data of a meta object.
 *
 * @typeParam T - The type of the meta object.
 *
 * @param metaObject - The meta object whose prototype you want to retrieve.
 *
 * @returns The prototype of the meta object if available, otherwise `null`.
 *
 * @example
 * ```ts
 * const originalObject = {
 *   id: 1,
 *   name: 'John Doe',
 *   isActive: BOOLEAN({ default: true })
 * }
 *
 * const metaObject = Meta(originalObject)
 *
 * // Retrieving the prototype of the meta object
 * const protoObj = Meta.proto(metaObject)
 *
 * console.log(protoObj === originalObject) // true
 * ```
 */
export function MetaProto<T extends object>(metaObject: T) {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return (handlerInstance.registry.get(metaObject)?.protoObject ??
        null) as Required<T> extends Required<Meta<infer U>> ? U : T | null
}

Meta.proto = MetaProto

/**
 * Rebuilds a meta object using the same original object and arguments that were used to create the meta object. 
 * This function is useful for creating a new instance of a meta object with its initial state and configuration, 
 * effectively "resetting" it to its original form.

 * @typeParam T - The type of the original meta object.
 *
 * @param metaObject - The original meta object to rebuild.
 * @param metaArgs - additional or overriding meta arguments to apply during the rebuild process.
 *
 * @returns A new meta object, or `null` if the input is not a valid meta object.
 *
 * @example
 * ```ts
 * const originalMetaObject = Meta({
 *   id: NUMBER({ default: 1 }),
 *   name: STRING({ default: 'John Doe' })
 * })
 *
 * // Modifying the original meta object
 * originalMetaObject.id = 2
 * originalMetaObject.name = 'Jane Doe'
 *
 * // Rebuilding the meta object to reset it to its original configuration
 * const rebuiltMetaObject = Meta.rebuild(originalMetaObject)
 *
 * console.log(rebuiltMetaObject.id) // 1
 * console.log(rebuiltMetaObject.name) // 'John Doe'
 * ```
 */
export function MetaRebuild<T extends object>(
    metaObject: T,
    metaArgs?: MetaArgsType
): Required<T> extends Required<Meta<unknown>> ? T : Meta<T> | null {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    const registryInfo = handlerInstance.registry.get(metaObject)

    if (!registryInfo) return null as any

    const protoObject = registryInfo.protoObject

    metaArgs = { ...registryInfo.metaArgs, ...(metaArgs ?? {}) }

    return Meta(protoObject, metaArgs) as any
}

Meta.rebuild = MetaRebuild

/**
 * Deserializes a JSON string into a meta object.
 * This function parses a JSON string into a plain object and then deserializes it into a meta object
 * based on the provided plain object as schema or an existing meta object.
 *
 * @typeParam T - The type of the meta object or prototype.
 *
 * @param metaObjectOrProto - The meta object or plain object as schema to use for deserialization.
 * @param text - The JSON string to deserialize.
 * @param deserializeArgs - arguments to customize the deserialization behavior.
 * @param jsonParseArgs - arguments like in JSON.parse (`reviver` only)
 *
 * @returns A meta object deserialized from the JSON string.
 *
 * @example
 * ```ts
 * const userSchema = {
 *   id: NUMBER(),
 *   name: STRING(),
 *   isActive: BOOLEAN({ default: true })
 * }
 *
 * const userJson = '{"id": 1, "name": "John Doe", "isActive": false}'
 *
 * // Deserializing the JSON string into a meta object
 * const user = Meta.fromJson(userSchema, userJson)
 *
 * console.log(user)
 * // Output: Meta object with properties { id: 1, name: 'John Doe', isActive: false }
 * ```
 */
export function MetaFromJson<T extends object>(
    metaObjectOrProto: T,
    text: string,
    deserializeArgs?: DeSerializeMetaObjectArgsType,
    jsonParseArgs?: {
        reviver?: (this: any, key: string, value: any) => any
    }
) {
    const obj = JSON.parse(text, jsonParseArgs?.reviver)

    return Meta.deserialize(metaObjectOrProto, obj, deserializeArgs)
}

Meta.fromJson = MetaFromJson

/**
 * Serializes a meta object into a JSON string.
 * This function first converts a meta object into a plain object using the `Meta.serialize` method,
 * and then serializes that plain object into a JSON string using `JSON.stringify`.
 *
 * @param metaObject - The meta object or a plain object to serialize.
 * If a plain object is provided, it is first converted into a meta object using the provided `serializeArgs.metaArgs`.
 * @param serializeArgs - arguments to customize the serialization behavior.
 * @param jsonStringifyArgs - arguments like in `JSON.stringify` (`replacer` and `space`)
 *
 * @returns A JSON string representation of the meta object.
 *
 * @example
 * ```ts
 * const user = Meta({
 *   id: NUMBER({ optional: true }),
 *   name: STRING({ optional: true }),
 *   registrationDate: DATE({ coercion: true, optional: true })
 * })
 *
 * user.id = 1
 * user.name = 'John Doe'
 * user.registrationDate = new Date("2024-01-01")
 *
 * // Serializing the meta object to a JSON string
 * const userJson = Meta.toJson(user, {}, { space: 2 })
 *
 * console.log(userJson)
 * // Output might be:
 * // {
 * //   "id": 1,
 * //   "name": 'John Doe',
 * //   "registrationDate": 1704067200000
 * // }
 * ```
 */
export function MetaToJson(
    metaObject: object,
    serializeArgs?: SerializeMetaObjectArgsType,
    jsonStringifyArgs?: {
        replacer?: ((this: any, key: string, value: any) => any) | (number | string)[]
        space?: string | number
    }
) {
    return JSON.stringify(
        Meta.serialize(metaObject, serializeArgs),
        jsonStringifyArgs?.replacer as any,
        jsonStringifyArgs?.space
    )
}

Meta.toJson = MetaToJson

/**
 * Generates a textual representation of a meta object.
 * This function checks if the provided object is a meta object and,
 * if so, retrieves a textual representation of its structure and current state.
 * This can be particularly useful for debugging purposes, logging,
 * or simply understanding the current configuration and values of a meta object at runtime.
 *
 * If the provided argument is not a meta object, the function returns `null`, indicating that no representation can be made.
 *
 * `metaObject.toString` has the same behavior by default
 *
 * @param metaObject - The meta object to represent textually.
 *
 * @returns A string representing the meta object's structure and current state if it is a meta object, otherwise `null`.
 *
 * @example
 * ```ts
 * const metaObject = Meta({ id: 0 })
 *
 * // Generating a textual representation of the meta object
 * const representation = Meta.represent(metaObject)
 *
 * console.log(representation)
 * // Output: [<meta> object] { id: NUMBER = 0 }
 * ```
 */
export function MetaRepresent(metaObject: object) {
    if (!Meta.isMetaObject(metaObject)) {
        return null
    }

    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.represent(metaObject)
}

Meta.represent = MetaRepresent

/**
 * Retrieves the meta arguments used to configure a meta object.
 * This function extracts the configuration arguments (`MetaArgsType`) that were used to create or configure the provided meta object.
 * These arguments include settings related to validation, serialization,
 * property ignoring, and more, which define the behavior and capabilities of the meta object.
 *
 * @param metaObject - The meta object from which to retrieve the meta arguments.
 *
 * @returns The `MetaArgsType` used to configure the meta object, or `null` if the object is not a meta object or if no meta arguments were used.
 *
 * @example
 * ```ts
 * const user = Meta({
 *   id: NUMBER(),
 *   name: STRING(),
 * }, {
 *   name: "UserMetaObject",
 *   metaTypesArgs: { optional: true }
 * })
 *
 * Meta.disableValidation(user)
 *
 * // Retrieving the meta arguments of the meta object
 * const metaArgs = Meta.getMetaArgs(user)
 *
 * console.log(metaArgs)
 * // Output:
 * // {
 * //   name: 'UserMetaObject',
 * //   metaTypesArgs: { optional: true },
 * //   validationIsActive: false
 * // }
 * ```
 */
export function MetaGetMetaArgs(metaObject: object) {
    const registryInfo = getDescriptorValue(
        metaObject,
        MetaObjectRegistryInfoSymbol
    ) as MetaObjectRegistryInfo

    if (!registryInfo) return null

    return metaObject instanceof Object ? registryInfo.metaArgs || null : null
}

Meta.getMetaArgs = MetaGetMetaArgs
