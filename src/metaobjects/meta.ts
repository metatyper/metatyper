import { MetaType, MetaTypeArgs, MetaTypeBase, MetaTypeImpl } from '../metatypes'
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

export type ValidateMetaObjectArgsType = { metaArgs?: MetaArgs } & {
    safe?: boolean
    stopAtFirstError?: boolean
} & Record<string, any>

export type SerializeMetaObjectArgsType = {
    metaArgs?: MetaArgs
} & Record<string, any>

export type DeSerializeMetaObjectArgsType = {
    metaArgs?: MetaArgs
} & Record<string, any>

export type MetaChangeHandlerActionType = 'init' | 'set' | 'delete' | 'define' | 'deserialize'
export type MetaChangeHandlerArgsType = {
    action: MetaChangeHandlerActionType
    targetObject: object
    baseObject: object
    propName: string | symbol
    prevDescriptor?: PropertyDescriptor
    descriptor?: PropertyDescriptor
    prevDeclaration?: MetaTypeImpl
    declaration?: MetaTypeImpl
}
export type MetaChangeHandlerInfoType = {
    handler: (args: MetaChangeHandlerArgsType) => void
    actions?: MetaChangeHandlerActionType[]
    props?: (string | symbol)[]
}

export type MetaErrorHandlerPlaceType =
    | 'init'
    | 'get'
    | 'set'
    | 'define'
    | 'delete'
    | 'validate'
    | 'deserialize'
    | 'serialize'
export type MetaErrorHandlerArgsType = {
    error: Error
    errorPlace: MetaErrorHandlerPlaceType
    targetObject: object
    baseObject: object
}
export type MetaErrorHandlerInfoType = {
    handler: (args: MetaErrorHandlerArgsType) => void
    places?: MetaErrorHandlerPlaceType[]
}

export type MetaTypesResolver = (value: any, args?: MetaTypeArgs) => MetaTypeImpl

/**
 * This is arguments for creating a meta object.
 *
 * @param name - A string that overrides the default name of the meta object. The name is used when displaying the meta object.
 * For example, if the default name is 'MetaObject', you can pass 'MyMetaObject' as the name argument to change it.
 * @param initialValues - An object that defines the initial values of the properties of the meta object. The default value is `{}`.
 * @param ignoreProps - Specifies which properties of the meta object should be ignored by the meta object. It can be either:
 *  - An array of strings or symbols that represent the property names to ignore.
 *  - A function that takes a property name as an argument and returns a boolean value indicating whether to ignore it or not.
 * The default value is [].
 * @param validationIsActive - A boolean that indicates whether the meta object should perform validation on the meta object or not. The default value is true.
 * @param serializationIsActive - A boolean that indicates whether the meta object should perform serialization on the meta object or not. The default value is true.
 * @param changeHandlers - An array of handlers that handle changes in the meta object. The default value is [].
 * @param errorHandlers - An array of handlers that handle errors in the meta object. The default value is [].
 * @param metaTypesArgs - Defines the arguments for building or rebuilding the meta types of the meta object. It can be either:
 *  - An object that contains the properties and values of the meta types arguments.
 *  - A function that takes a meta type implementation as an argument and returns an object of meta types arguments.
 * The default value is `{}`.
 * @param metaTypesResolver - A function that resolves meta types from values. It takes any value as an argument and returns a meta type.
 * @param autoResolveMetaTypes - A boolean that indicates whether the meta object should automatically resolve the meta types or not. The default value is true.
 * @param dynamicDeclarations - A boolean that indicates whether the meta object should allow new declarations of new properties or not. The default value is true.
 * @param metaInstanceArgs - Defines the arguments for creating the meta instance of the meta class. It can be either:
 *  - An object that contains the properties and values of the meta instance arguments.
 *  - The string 'same' that indicates that the same arguments as the meta class should be used.
 * The default value is 'same'.
 * @param buildMetaInstance - A boolean that indicates whether the meta class should build the meta instance or not.
 * If true, the meta class will use the metaInstanceArgs object to create the meta instance. The default value is true.
 * @param metaBuilder - A meta objects builder that is used to create the meta object.
 * The meta objects builder is an object that implements the MetaObjectsBuilder interface. The default value is the global meta objects builder.
 */
export type MetaArgs = {
    name?: string
    initialValues?: Record<string | symbol, any>

    ignoreProps?: (string | symbol)[] | ((propName: string | symbol) => boolean)

    validationIsActive?: boolean
    serializationIsActive?: boolean

    changeHandlers?: MetaChangeHandlerInfoType[]
    errorHandlers?: MetaErrorHandlerInfoType[]

    metaTypesArgs?: MetaTypeArgs | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgs)

    metaTypesResolver?: MetaTypesResolver
    autoResolveMetaTypes?: boolean
    dynamicDeclarations?: boolean

    metaInstanceArgs?: MetaArgs | 'same'
    buildMetaInstance?: boolean

    metaBuilder?: MetaObjectsBuilder
} & Record<string, any>

export type InitialClassPropertyDeclarationInfo = {
    propName: string
    metaTypeImpl?: MetaTypeImpl
    metaTypeArgs?: MetaTypeArgs
    descriptor?: PropertyDescriptor
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
 * @param metaArgs - Configuration arguments ({@link MetaArgs}) for creating the meta object.
 *
 * @returns A a new Meta object
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
 */
export function Meta<T extends object>(protoObject?: T, metaArgs?: MetaArgs) {
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
 * @param metaArgs - Configuration arguments ({@link MetaArgs}) for creating the meta class and meta instances.
 *
 * @returns A decorator function that takes a class and returns its meta class equivalent.
 *
 * @example
 * ```ts
 * ⠀@Meta.Class({ metaTypesArgs: { optional: true } })
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
Meta.Class = function Class(metaArgs?: MetaArgs) {
    return <T extends new (...args: any[]) => any>(cls: T) => {
        return Meta(cls, metaArgs) as any
    }
}

/**
 * Decorator for declaring meta type information for class properties.
 *
 * The `declare` decorator allows you to specify meta type information directly on class properties.
 * This facilitates runtime type checking, validation,
 * and serialization/deserialization of property values based on the provided meta type or meta type arguments.
 *
 * @param metaTypeOrArgs - The meta type instance or meta type arguments to apply to the class property.
 *
 * @returns A decorator function that applies the specified meta type information to the target class property.
 *
 * @example
 * ```ts
 * import { Meta } from 'metatyper'
 *
 * ⠀@Meta.Class()
 * class User {
 *   ⠀@Meta.declare(NUMBER({ min:0, optional:true }))
 *   id: number | undefined
 *
 *   ⠀@Meta.declare({ minLength: 3 })
 *   name = 'some name
 * }
 * ```
 *
 * @example
 * Reflect metatype from class property type:
 * ```ts
 * import 'reflect-metadata'
 *
 * import { Meta } from 'metatyper'
 *
 * ⠀@Meta.Class()
 * class Product {
 *
 *   ⠀@Meta.declare({ min: 0, optional: true })
 *   price?: number
 *
 * }
 * ```
 */
function declare<T extends object, K extends keyof T>(
    metaType: T[K]
): (target: T, propName: K) => void

function declare<T extends object, K extends keyof T, IsNullableT extends boolean>(
    metaTypeArgs?: MetaTypeArgs<T[K], IsNullableT>
): (target: T, propName: K) => void

function declare(metaTypeOrArgs?: MetaTypeBase | MetaTypeArgs | null) {
    return (target: object, propName: string, descriptor?: TypedPropertyDescriptor<any>) => {
        const metaTypeImpl = MetaType.isMetaType(metaTypeOrArgs)
            ? MetaType.getMetaTypeImpl(metaTypeOrArgs as any) ?? undefined
            : undefined

        const metaTypeArgs = MetaType.isMetaType(metaTypeOrArgs)
            ? undefined
            : (metaTypeOrArgs as MetaTypeArgs)

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

Meta.declare = Meta.d = declare

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
export const isMetaObject = (Meta.isMetaObject = function isMetaObject(
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
Meta.isIgnoredProp = function isMetaObject(metaObject: object, propName: string | symbol) {
    if (!Meta.isMetaObject(metaObject)) {
        return true
    }

    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.isIgnoredProp(metaObject, propName)
}

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
Meta.validationIsActive = (metaObject: object) => {
    const registryInfo = getDescriptorValue(
        metaObject,
        MetaObjectRegistryInfoSymbol
    ) as MetaObjectRegistryInfo

    return registryInfo?.validationIsActive ?? false
}

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
Meta.disableValidation = (metaObject: object) => {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        validationIsActive: false
    })
}

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
Meta.enableValidation = (metaObject: object) => {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        validationIsActive: true
    })
}

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
Meta.serializationIsActive = (metaObject: object) => {
    const registryInfo = getDescriptorValue(
        metaObject,
        MetaObjectRegistryInfoSymbol
    ) as MetaObjectRegistryInfo

    return registryInfo?.serializationIsActive ?? false
}

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
Meta.disableSerialization = (metaObject: object) => {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        serializationIsActive: false
    })
}

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
Meta.enableSerialization = (metaObject: object) => {
    const builder = getDescriptorValue(metaObject, MetaObjectBuilderSymbol) as MetaObjectsBuilder

    builder.configure(metaObject, {
        serializationIsActive: true
    })
}

/**
 * Validates a plain object against a meta object schema or a meta object, ensuring it conforms to the defined types and constraints.
 * If the object is valid according to the meta object schema, the function returns `true`.
 * If the object is not valid, it returns `false` or throws a validation error,
 * which can be either `MetaTypeValidatorsArrayError` or `MetaTypeValidatorError`, depending on the validation arguments.
 *
 * @param metaObject - The meta object or plain object as a schema against which to validate the `rawObject`.
 * @param rawObject - The plain object to validate.
 * @param validateArgs - arguments to customize the validation behavior, such as disabling throwing errors.
 *
 * @throws `MetaTypeValidatorError` if the plain object does not conform to the meta object schema
 * and `validateArgs.safe` is `false`.
 * @throws `MetaTypeValidatorsArrayError` if the plain object does not conform to the meta object schema
 * and `validateArgs.safe` is `false` and `validateArgs.stopAtFirstError` is `false`.
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
 * // This will return true, as the validUser object conforms to the userSchema
 * Meta.validate(userSchema, validUser)
 *
 * // This will throw a MetaTypeValidatorError
 * // because invalidUser does not conform to the userSchema
 * Meta.validate(userSchema, invalidUser)
 * ```
 */
Meta.validate = (
    metaObjectOrProto: object,
    rawObject: object,
    validateArgs?: ValidateMetaObjectArgsType
): boolean => {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObjectOrProto, MetaObjectBuilderSymbol)?.handler ??
        MetaObjectsBuilder.instance.handler

    return handlerInstance.validate(metaObjectOrProto, rawObject, validateArgs)
}

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
Meta.serialize = <ResultT extends object = never, T extends object = object>(
    metaObject: Meta<T> | T,
    serializeArgs?: SerializeMetaObjectArgsType
): [ResultT] extends [never] ? { [key in keyof T]: any } : ResultT => {
    if (!Meta.isMetaObject(metaObject)) {
        metaObject = Meta(metaObject, serializeArgs?.metaArgs) as any
    }

    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.serialize(metaObject, serializeArgs) as any
}

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
Meta.deserialize = <T extends object>(
    metaObjectOrProto: Meta<T> | T,
    rawObject: object,
    deserializeArgs?: DeSerializeMetaObjectArgsType
): Meta<T> => {
    if (Meta.isMetaObject(metaObjectOrProto)) {
        const handlerInstance: MetaObjectsHandler =
            getDescriptorValue(metaObjectOrProto, MetaObjectBuilderSymbol)?.handler ??
            MetaObjectsBuilder.instance.handler

        return handlerInstance.deserialize(metaObjectOrProto, rawObject, deserializeArgs) as any
    } else {
        let preparedMetaArgs: MetaArgs = { ...(deserializeArgs?.metaArgs ?? {}) }

        preparedMetaArgs = {
            ...preparedMetaArgs,
            initialValues: { ...preparedMetaArgs.initialValues, ...rawObject }
        }

        return Meta(metaObjectOrProto, preparedMetaArgs) as any
    }
}

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
Meta.copy = <T extends object>(
    metaObject: T
): Required<T> extends Required<Meta<unknown>> ? T : Meta<T> | null => {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.copy(metaObject) as any
}

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
Meta.proto = <T extends object>(metaObject: T) => {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return (handlerInstance.registry.get(metaObject)?.protoObject ??
        null) as Required<T> extends Required<Meta<infer U>> ? U : T | null
}

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
Meta.rebuild = <T extends object>(
    metaObject: T,
    metaArgs?: MetaArgs
): Required<T> extends Required<Meta<unknown>> ? T : Meta<T> | null => {
    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    const registryInfo = handlerInstance.registry.get(metaObject)

    if (!registryInfo) return null as any

    const protoObject = registryInfo.protoObject

    metaArgs = { ...registryInfo.metaArgs, ...(metaArgs ?? {}) }

    return Meta(protoObject, metaArgs) as any
}

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
Meta.fromJson = <T extends object>(
    metaObjectOrProto: T,
    text: string,
    deserializeArgs?: DeSerializeMetaObjectArgsType,
    jsonParseArgs?: {
        reviver?: (this: any, key: string, value: any) => any
    }
) => {
    const obj = JSON.parse(text, jsonParseArgs?.reviver)

    return Meta.deserialize(metaObjectOrProto, obj, deserializeArgs)
}

/**
 * Serializes a meta object into a JSON string.
 * This function first converts a meta object into a plain object using the `Meta.serialize` method,
 * and then serializes that plain object into a JSON string using `JSON.stringify`.
 *
 * @param metaObject - The meta object to serialize into JSON.
 * @param serializeArgs - arguments to customize the serialization behavior.
 * @param jsonParseArgs - arguments like in JSON.parse (`replacer` and `space`)
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
Meta.toJson = (
    metaObject: object,
    serializeArgs?: SerializeMetaObjectArgsType,
    jsonStringifyArgs?: {
        replacer?: ((this: any, key: string, value: any) => any) | (number | string)[]
        space?: string | number
    }
) => {
    return JSON.stringify(
        Meta.serialize(metaObject, serializeArgs),
        jsonStringifyArgs?.replacer as any,
        jsonStringifyArgs?.space
    )
}

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
Meta.represent = (metaObject: object) => {
    if (!Meta.isMetaObject(metaObject)) {
        return null
    }

    const handlerInstance: MetaObjectsHandler =
        getDescriptorValue(metaObject, MetaObjectBuilderSymbol)?.handler ||
        MetaObjectsBuilder.instance.handler

    return handlerInstance.represent(metaObject)
}

/**
 * Retrieves the meta arguments used to configure a meta object.
 * This function extracts the configuration arguments (`MetaArgs`) that were used to create or configure the provided meta object.
 * These arguments include settings related to validation, serialization,
 * property ignoring, and more, which define the behavior and capabilities of the meta object.
 *
 * @param metaObject - The meta object from which to retrieve the meta arguments.
 *
 * @returns The `MetaArgs` used to configure the meta object, or `null` if the object is not a meta object or if no meta arguments were used.
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
Meta.getMetaArgs = (metaObject: object) => {
    const registryInfo = getDescriptorValue(
        metaObject,
        MetaObjectRegistryInfoSymbol
    ) as MetaObjectRegistryInfo

    if (!registryInfo) return null

    return metaObject instanceof Object ? registryInfo.metaArgs || null : null
}
