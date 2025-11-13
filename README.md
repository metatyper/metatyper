<div align="center" class="cover">

[![MetaTyper](https://raw.githubusercontent.com/metatyper/metatyper/main/docs/images/cover.png)](https://metatyper.dev/)

code faster, smarter, better

---

[![website](https://img.shields.io/badge/Docs-metatyper.dev-2ea845?style=flat&labelColor=202020)](https://metatyper.dev/) [![npm](https://img.shields.io/npm/v/metatyper?style=flat&labelColor=202020&label=NPM)](https://www.npmjs.com/package/metatyper) [![license: MIT](https://img.shields.io/badge/License-MIT-00aa00.svg?style=flat&labelColor=202020)](https://opensource.org/licenses/MIT) [![build size](https://img.shields.io/bundlephobia/minzip/metatyper?style=flat&labelColor=202020&label=Size)](https://bundlephobia.com/result?p=metatyper) [![Tests](https://img.shields.io/github/actions/workflow/status/metatyper/metatyper/test.yaml?style=flat&labelColor=202020&label=Tests)](https://github.com/metatyper/metatyper/actions/workflows/test.yaml) [![Coveralls](https://img.shields.io/coverallsCoverage/github/metatyper/metatyper?style=flat&labelColor=202020&label=Coverage)](https://coveralls.io/github/metatyper/metatyper?branch=main) [![donate](https://img.shields.io/badge/Donate-PayPal-ff3f59.svg?style=flat&labelColor=202020)](https://paypal.me/vadzimsharai)

</div>

&nbsp;

## Introduction

The MetaTyper project provides a powerful approach to using runtime types in TypeScript and JavaScript code.

It is based on the principle of using classical objects or classes as a data schema for further validation and serialization.
The goal of the project is to make runtime types as developer-friendly as possible.

More Facts:

-   Works in Node.JS and all modern browsers.
-   Automatically infers TypeScript types.
-   Works with native JavaScript.
-   It's tiny.
-   Zero dependencies.
-   Rich error details.
-   Rich extensibility support.

&nbsp;

## Installation

```bash
npm install metatyper
```

or

```bash
yarn add metatyper
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/metatyper/lib/metatyper.min.js"></script>

<!-- or another cdn -->
<script src="https://www.unpkg.com/metatyper/lib/metatyper.min.js"></script>
```

> In this case, you need to use this library through the `MetaTyper` global variable: `MetaTyper.Meta({ /* ... */ })`

&nbsp;

## Basic Usage

First, you can create a Meta object.

```typescript
import { Meta, NUMBER } from 'metatyper'

const user = Meta({
    id: 0,
    username: 'some user name',
    stars: NUMBER({ min: 0, default: 0 })
})

user.id = 'some text' // type & validation error
user.stars = 'some text' // type & validation error
```

&nbsp;

You can also simply validate different objects.

```typescript
import { BOOLEAN, INTEGER, Meta, STRING } from 'metatyper'

const userSchema = {
    id: INTEGER(),

    username: STRING({
        minLength: 3,
        regexp: '^[a-zA-Z0-9 _]+$'
    }),

    stars: 0, // any number

    someFlag: BOOLEAN({ optional: true })
}

Meta.validate(userSchema, {
    id: 1.1, // throw a validation error
    username: 'some user name',
    stars: 1
})

Meta.validate(userSchema, {
    id: 1,
    username: 'some user name'
    // throw a validation error, because stars is not optional field
})
```

&nbsp;

Finally, you can work with classes instead of objects.

```typescript
import { DATE, INTEGER, Meta, STRING } from 'metatyper'

import 'reflect-metadata'

@Meta.Class({ ignoreProps: ['someInstanceFlag', 'someClassFlag'] })
class User {
    @Meta.declare(INTEGER({ default: 0 }))
    id: number

    username = 'some user name'

    @Meta.declare({ default: 0, min: 0 })
    stars: number // for this you need `reflect-metadata`

    createdAt = DATE({
        default: new Date(),
        coercion: true // cast a string or number to a date (and vice versa)
    })

    someInstanceFlag = false

    static someClassFlag = true
    static someAnotherClassFlag = true
}

User.someClassFlag = 'string' as any
// ok, because the field is listed in the ignoreProps

User.someAnotherClassFlag = 'string' // type & validation error

const user = new User()

Meta.deserialize(user, {
    id: 2,

    username: 'some another user name',

    createdAt: 1704067200 * 1000,
    // this timestamp will cast to Date("2024-01-01")

    someInstanceFlag: 'no boolean'
    // ok, because the field is listed in the ignoreProps
})

Meta.deserialize(user, {
    id: 1.1 // validation error
})
```

&nbsp;

## Table of Contents

-   [Introduction](#introduction)
-   [Installation](#installation)
-   [Basic Usage](#basic-usage)
-   [Table of Contents](#table-of-contents)
-   [Documentation](#documentation)
    -   [Meta Objects](#meta-objects)
        -   [Meta](#meta)
        -   [Meta args](#meta-args)
        -   [Meta inheritance](#meta-inheritance)
        -   [Meta.Class decorator](#metaclass-decorator)
        -   [Meta.declare decorator](#metadeclare-decorator)
        -   [Meta.isMetaObject](#metaismetaobject)
        -   [Meta.isIgnoredProp](#metaisignoredprop)
        -   [Meta.copy](#metacopy)
        -   [Meta.rebuild](#metarebuild)
    -   [Meta Types](#meta-types)
        -   [MetaType](#metatype)
        -   [MetaType Implementation](#metatype-implementation)
        -   [MetaTypeArgsType](#metatypeargstype)
    -   [Built-in Meta Types](#built-in-meta-types)
        -   [ANY](#any)
        -   [BOOLEAN](#boolean)
        -   [STRING](#string)
        -   [NUMBER](#number)
        -   [INTEGER](#integer)
        -   [BIGINT](#bigint)
        -   [DATE](#date)
        -   [LITERAL](#literal)
        -   [INSTANCE](#instance)
        -   [UNION](#union)
        -   [ARRAY](#array)
        -   [TUPLE](#tuple)
        -   [OBJECT](#object)
        -   [Recursive structures](#recursive-structures)
    -   [Validation](#validation)
        -   [Validators](#validators)
        -   [Disabling Validation](#disabling-validation)
    -   [Serialization and Deserialization](#serialization-and-deserialization)
        -   [Serializers and Deserializers](#serializers-and-deserializers)
        -   [Disable Serialization](#disable-serialization)
        -   [Types Coercion](#types-coercion)
            -   [BOOLEAN coercion](#boolean-coercion)
            -   [STRING coercion](#string-coercion)
            -   [NUMBER coercion](#number-coercion)
            -   [INTEGER coercion](#integer-coercion)
            -   [BIGINT coercion](#bigint-coercion)
            -   [DATE coercion](#date-coercion)
    -   [Errors](#errors)
        -   [MetaTypeSerializationError](#metatypeserializationerror)
        -   [MetaTypeSerializerError](#metatypeserializererror)
        -   [MetaTypeDeSerializerError](#metatypedeserializererror)
        -   [MetaTypeValidationError](#metatypevalidationerror)
        -   [MetaTypeValidatorError](#metatypevalidatorerror)
        -   [MetaTypeValidatorsArrayError](#metatypevalidatorsarrayerror)
-   [Similar Libraries](#similar-libraries)
-   [Change Log](#change-log)

&nbsp;

## Documentation

### Meta Objects

#### Meta

To work with Meta types it is convenient to use Meta objects.
A Meta object is a proxy object that changes the logic of reading and writing values to the object's properties.

Example:

```typescript
const objA = {
    a: 1
}
const metaObjA = Meta(objA)

// throw a validation error because this property has been initialized number
metaObjA.a = 'str'

const metaObjB = Meta()
metaObjB.a = 'str'

// throw a validation error because this property has been initialized string
metaObjB.a = 2
```

Since classes are more often used to describe properties, this library provides Meta classes. The difference from Meta objects is that instances of the class will also be Meta objects.

Example:

```typescript
class A {
    a = 'string'

    static staticA = 2
}

const MetaA = Meta(A) // similar to the @Meta.Class() decorator

// throw a validation error because this property was initialized number
MetaA.staticA = 'str' as any

const metaInstanceA = new MetaA()

// throw a validation error because this property was initialized 'string'
metaInstanceA.a = 1 as any
```

> To get an original object from Meta object you can use `Meta.proto(metaObject)` method.

&nbsp;

#### Meta args

This is arguments for creating a Meta object.

```typescript
function Meta<T extends object>(protoObject?: T, metaArgs?: MetaArgsType): Meta<T>
```

Meta function has the following arguments:

```typescript
type MetaArgsType = {
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
```

&nbsp;

-   `name?: string` - A string that overrides the default name of the Meta object. The name is used when displaying the Meta object. For example, if the default name is `MetaObject`, you can pass `MyMetaObject` as the name argument to change it.

&nbsp;

-   `initialValues?: Record<string | symbol, any>` - An object that defines the initial values of the properties of the Meta object.
    The `default` value is `{}`.

&nbsp;

-   `ignoreProps?: (string | symbol)[] | ((propName: string | symbol) => boolean)` - Specifies which properties of the Meta object should be ignored by the Meta object. The `default` value is `[]`.
    It can be either:
    -   An array of strings or symbols that represent the property names to ignore.
    -   A function that takes a property name as an argument and returns a boolean value indicating whether to ignore it or not.

&nbsp;

-   `validationIsActive?: boolean` - A boolean that indicates whether the Meta object should perform validation on the Meta object or not.
    The `default` value is `true`.

&nbsp;

-   `serializationIsActive?: boolean` - A boolean that indicates whether the Meta object should perform serialization on the Meta object or not.
    The `default` value is `true`.

&nbsp;

-   `changeHandlers?: MetaChangeHandlerInfoType[]` - An array of handlers that handle changes in the Meta object.
    The `default` value is `[]`.

&nbsp;

-   `errorHandlers?: MetaErrorHandlerInfoType[]` - An array of handlers that handle errors in the Meta object.
    The `default` value is `[]`.

&nbsp;

-   `metaTypesArgs?: MetaTypeArgsType | ((metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType)` - Defines the arguments for building or rebuilding the Meta types of the Meta object. It can be either:
    -   An object that contains the properties and values of the Meta types arguments.
    -   A function that takes a Meta type implementation as an argument and returns an object of Meta types arguments.
        The `default` value is `{}`.

&nbsp;

-   `metaTypesResolver?: MetaTypesResolver` - A function that resolves Meta types from values. It takes any value as an argument and returns a Meta type: `(value: any, args?: MetaTypeArgsType) => MetaTypeImpl`.
    The `default` value is `MetaTypeImpl.getMetaTypeImpl`

&nbsp;

-   `autoResolveMetaTypes?: boolean` - A boolean that indicates whether the Meta object should automatically resolve the Meta types from a value or not.
    For example, the value 1 in the `Meta({field: 1 })` object will be used to declare a `NUMBER` metatype.
    The `default` value is `true`.

&nbsp;

-   `dynamicDeclarations?: boolean` - A boolean that indicates whether the Meta object should allow new declarations of new properties or not.
    For example, you can define a new metatype like this: `metaObject.anyField = NUMBER({ default: 1 })`.
    The `default` value is `true`.

&nbsp;

-   `metaInstanceArgs?: MetaArgsType | 'same'` - Defines the arguments for creating the Meta instance of the Meta class. It can be either:
    -   An object that contains the properties and values of the Meta instance arguments.
    -   The string `'same'` that indicates that the same arguments as the Meta class should be used.
        The `default` value is `'same'`.

&nbsp;

-   `buildMetaInstance?: boolean` - A boolean that indicates whether the Meta class should build the Meta instance or not. If true, the Meta class will use the metaInstanceArgs object to create the Meta instance.
    The `default` value is `true`.

&nbsp;

-   `metaBuilder?: MetaObjectsBuilder` - A Meta objects builder that is used to create the Meta object. The Meta objects builder is an object that implements the MetaObjectsBuilder interface.
    The `default` value is the global Meta objects builder (`MetaObjectsBuilder.instance`).

&nbsp;

> Record<string, any> - used if you want to use a custom builder

> To get the Meta args of a Meta object you can use `Meta.getMetaArgs(metaObject)` method.

&nbsp;

#### Meta inheritance

Meta objects support the extension of classic objects with an additional side effect.

Objects inheritance

```typescript
import { BOOLEAN, Meta, MetaType, NUMBER, STRING } from 'metatyper'

const obj1: any = {
    a: 1,
    b: NUMBER({ optional: true })
}

const obj2: any = {
    c: 2,
    d: STRING({ optional: true })
}

const obj3: any = {
    e: 3,
    f: BOOLEAN({ optional: true })
}

Object.setPrototypeOf(obj2, obj1)

const metaObj2 = Meta(obj2)

// true,
// because obj1 is not a Meta object
// and there is no special logic for its properties
console.log(metaObj2.b instanceof MetaType)

// but this will create its own MetaObj2 property 'a'
// and add a Meta type declaration NUMBER({ default: 0 })
metaObj2.b = NUMBER({ default: 0 })
console.log(metaObj2.b === 0) // true

Object.setPrototypeOf(obj3, metaObj2)

obj3.e = '1' // ok, because obj3 is not a Meta object

// validation error,
// because this is a property of the MetaObj2 Meta object
// and there is special logic for it
obj3.c = '1'
```

&nbsp;

> The prototype of a Meta object is the original object: `Object.getPrototypeOf(metaObj2) === obj2`

&nbsp;

Classes inheritance

```typescript
import { Meta, NUMBER } from 'metatyper'

@Meta.Class()
class A {
    static a = NUMBER({ optional: true })
    a = NUMBER({ optional: true })
}

class B extends A {
    static b = NUMBER({ optional: true })
    b = NUMBER({ optional: true })
}

@Meta.Class()
class C extends B {
    static c = NUMBER({ optional: true })
    c = NUMBER({ optional: true })
}

console.log(A.toString())
// [<meta> class A] { a: NUMBER = undefined }

console.log(B.toString())
// [<meta child> class B] { b = NUMBER }

console.log(C.toString())
// [<meta> class C] { c: NUMBER = undefined; [a]: NUMBER = undefined }
// brackets [a] mean that property is a property of the parent Meta class

const aInstance = new A()
const bInstance = new B()
const cInstance = new C()

console.log(aInstance.toString())
// [<meta> instance A] { a: NUMBER = undefined }

console.log(bInstance.toString())
// [<meta> object] { a: NUMBER = undefined; b: NUMBER = undefined }

console.log(cInstance.toString())
// [<meta> instance C] { a: NUMBER = undefined; b: NUMBER = undefined; c: NUMBER = undefined }

// There are no [a] brackets in instances,
// as these properties are intrinsic
// (you can learn how js instance creation works)
```

&nbsp;

> Static classes work as simple Meta objects.

&nbsp;

#### Meta.Class decorator

Decorator does the same thing as `Meta(A)`.

Example:

```typescript
import { Meta } from 'metatyper'

@Meta.Class() // Meta.Class(args) has arguments as in Meta({}, args)
class MetaA {
    a = 'string'

    static a = 2
}

// throw a validation error because this property was initialized number
MetaA.a = 'str'

const metaInstanceA = new MetaA()

// throw a validation error because this property was initialized 'string'
metaInstanceA.a = 1
```

&nbsp;

#### Meta.declare decorator

This decorator lets you specify the Meta type of your properties.

You can do this in different ways:

&nbsp;

-   Specify the Meta type explicitly:

```typescript
class Test {
    @Meta.declare(NUMBER({ min: 0 }))
    a: number
}
```

&nbsp;

-   Let the decorator infer the Meta type from the property value.

```typescript
class Test {
    @Meta.declare({ min: 0 })
    a: number = 0
}
```

&nbsp;

-   Use `reflect-metadata` to automatically resolve the Meta type from the property type:

```typescript
class Test {
    @Meta.declare({ min: 0 })
    a: number
}
```

> You need to import `reflect-metadata` before using the option. Otherwise, the Meta type will be `ANY()`.

&nbsp;

#### Meta.isMetaObject

If you need to check if an object is a Meta object, you can use this method: `Meta.isMetaObject(obj)`.

&nbsp;

#### Meta.isIgnoredProp

If you need to check if an property is ignored by Meta, you can use this method: `Meta.isIgnoredProp(obj, 'propName')`.

&nbsp;

#### Meta.copy

Sometimes you may need to copy a Meta object. You can do this by using the spread operator: `{ ...metaObject }`. However, this will not copy the type declarations of the Meta object. To copy the type declarations as well, you can use `Meta.copy`:

```typescript
const metaObjectCopy = Meta.copy(metaObject)
```

This method creates a copy of a Meta object and preserves its values, types, prototype and arguments.

Example:

```typescript
import { Meta, STRING } from 'metatyper'

const origObject: any = { a: 1 }
const origMetaObject = Meta(origObject)

origMetaObject.a = 2
origMetaObject.b = STRING({ default: '' })

const metaObjectCopy = Meta.copy(origMetaObject)
metaObjectCopy.a === 2 // true
metaObjectCopy.b === '' // true
```

&nbsp;

#### Meta.rebuild

You may also need to reset the meta object to its original state.
The `Meta.rebuild` is useful for creating a new instance of a Meta object with its initial state and configuration.

```typescript
const newMetaObject = Meta.rebuild(metaObject)
```

This method rebuilds a Meta object using the same original object and arguments that were used to create the Meta object.

Example:

```typescript
import { Meta, STRING } from 'metatyper'

const origObject: any = { a: 1 }
const origMetaObject = Meta(origObject)

origMetaObject.a = 2
origMetaObject.b = STRING({ default: '' })

const newMetaObject = Meta.rebuild(origMetaObject)
newMetaObject.a === 1 // true
newMetaObject.b === undefined // true
// because `origObject` was used to create the new Meta object
```

&nbsp;

### Meta Types

#### MetaType

Meta types extend built-in types, but they have more features: validation and serialization.
The basic logic of Meta types is in metaTypeImpl.

Example, how to create a new Meta type:

```typescript
import { MetaType, StringImpl } from 'metatyper'

const newType1 = MetaType<string>(StringImpl, {
    /* metaTypeArgs */
})
const newType2 = MetaType<string>(
    StringImpl.build({
        /* metaTypeArgs */
    })
)
```

&nbsp;

#### MetaType Implementation

Meta type implementation example:

```typescript
import { MetaType, StringImpl } from 'metatyper'

class LowerCaseStringImpl extends StringImpl {
    static isCompatible(value: string) {
        if (!this.isCompatible(value)) {
            return false
        }

        return !/[A-Z]/.test(value)
    }
}

export function LowerCaseString() {
    return MetaType<LowerCaseString>(LowerCaseStringImpl)
}

type LowerCaseString = MetaType<Lowercase<string>, LowerCaseStringImpl>
```

```typescript
import { Meta } from 'metatyper'

@Meta.Class()
class MyNewExample {
    str = LowerCaseString()
}

const instance = new MyNewExample()

instance.str = 'abc' // ok
instance.str = 'aBc' // type and validation error
```

To learn more about the principles of Meta types creation, you can explore the [source code](https://github.com/metatyper/metatyper/tree/main/src/metatypes/types) of the built-in Meta types.

&nbsp;

#### MetaTypeArgsType

This represents the arguments for creating a Meta type.

```typescript
type MetaTypeArgsType<
    T = any,
    IsNullishT extends boolean = boolean,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT
> = {
    name?: string
    subType?: any
    default?: T | ((declaration?: MetaTypeImpl) => T)
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
} & Record<string, any>
```

&nbsp;

`name?: string` - A string that overrides the default name of the Meta type. The name is used when displaying the Meta type.

&nbsp;

`subType?: any` - A Meta type or a value that defines the type of the nested values in the value.
For example, if the value is an array, you can use the subType to specify the type of the elements in the array.

&nbsp;

`default?: T | ((declaration?: MetaTypeImpl) => T)` - A value or a function that returns a value that is used as the default value for the Meta type.
The default value is used when the initial value is `undefined`.

&nbsp;

`nullish?: boolean` - A boolean indicating whether the value can be `null` or `undefined`.
If `false`, a `NullableValidator` and an `OptionalValidator` are added to the Meta type. The default value is `false`.

&nbsp;

`nullable?: boolean` - A boolean indicating whether the value can be `null`.
If `false`, a `NullableValidator` is added to the Meta type. If `nullish` and `nullable` are contradictory,
the value of `nullable` will be chosen. Default value is the same as `nullish`.

&nbsp;

`optional?: boolean` - A boolean indicating whether the value can be `undefined`. If `false`, an `OptionalValidator` is added to the Meta type.
If `nullish` and `optional` are contradictory, the value of `optional` will be chosen. Default value is the same as `nullish`

&nbsp;

`coercion?: boolean` - A boolean that indicates whether the value should be coerced to the expected type or not.
If `true`, an `CoercionSerializer` is added to the Meta type, which tries to convert the main value to the appropriate type.
For example, if the Meta type is a string, and the main value is a number, the number will be cast to a string.

&nbsp;

`validateType?: boolean` - A boolean that indicates whether the value should be validated against the expected type or not.
If `true`, a `MetaTypeValidator` is added to the Meta type, which checks that the main value matches the Meta type.
Default value is `true`.

&nbsp;

`noBuiltinValidators?: boolean` - A boolean that indicates whether the built-in validators should be disabled or not.
If `true`, the Meta type will not use any of the default validators, like `MetaTypeValidator` or NullableValidator.
Default value is `false`.

&nbsp;

`noBuiltinSerializers?: boolean` - A boolean that indicates whether the built-in serializers should be disabled or not.
If `true`, the Meta type will not use any of the default serializers, like `CoercionSerializer`.
Default value is `false`.

&nbsp;

`noBuiltinDeSerializers?: boolean` - A boolean that indicates whether the built-in deserializers should be disabled or not.
If `true`, the Meta type will not use any of the default deserializers, like `CoercionSerializer` or `ToLowerCaseSerializer` (case argument in STRING).
Default value is `false`.

&nbsp;

`validators?: (ValidatorType | ValidatorFuncType)[]` - An array of validators that are used to check the value when it is assigned to an object property.

```typescript
type ValidatorFuncType = (validateArgs: ValidatorArgsType) => boolean

type ValidatorType = {
    name?: string
    validate: ValidatorFuncType
}
```

> You can read about validation and ValidatorArgsType in the following section: [Validation](#validation)

&nbsp;

`serializers?: (SerializerType | SerializeFuncType)[]` - An array of serializers that change the value when it is retrieved from the object.
For example, `obj['prop']` or `Meta.serialize(obj)`.

```typescript
type SerializeFuncType = (serializeArgs: SerializerArgsType) => any

type SerializerType = {
    serialize: SerializeFuncType
    name?: string
    serializePlaces?: ('get' | 'serialize' | 'unknown')[] | string[]
}
```

> You can read about serialization and SerializerArgsType in the following section: [Serialization and Deserialization](#serialization-and-deserialization)

&nbsp;

`deserializers?: (DeSerializerType | DeSerializeFuncType)[]` - An array of deserializers that modify the value when it is set to an object property,
prior to validation. For example, `obj['prop'] = 'value'` or `Meta.deserialize(metaObject, rawObject)`.

```typescript
type DeSerializeFuncType = (deserializeArgs: DeSerializerArgsType) => any

type DeSerializerType = {
    serialize: DeSerializeFuncType
    name?: string
    deserializePlaces?: ('init' | 'reinit' | 'set' | 'deserialize' | 'unknown')[] | string[]
}
```

> You can read about deserialization and DeSerializerArgsType in the following section: [Serialization and Deserialization](#serialization-and-deserialization)

&nbsp;

### Built-in Meta Types

Each built-in Meta type has `args?: MetaTypeArgsType` at the end of arguments. How to use it you can see below.

&nbsp;

#### ANY

```typescript
import { ANY, Meta } from 'metatyper'

const obj1 = Meta({
    a: ANY({ nullish: true })
}) // as { a: any }

obj1.a = 1
obj1.a = {}
```

&nbsp;

#### BOOLEAN

```typescript
import { BOOLEAN, Meta } from 'metatyper'

const obj = Meta({
    someField: BOOLEAN({
        default: false,

        // BooleanMetaTypeArgs

        // will replace 1 with true
        trueValues: [1],

        // will replace 0 with false
        falseValues: [(value) => value === 0]
    })
}) // as { someField: boolean }

obj.someField = true
obj.someField = 1 as boolean
obj.someField = 'true' // type & validation error
```

&nbsp;

#### STRING

```typescript
import { Meta, STRING } from 'metatyper'

const obj = Meta({
    someField: STRING({
        nullish: true,

        // StringMetaTypeArgs
        notEmpty: true, // == minLength: 0
        minLength: 0,
        maxLength: 10,

        // validate using this regular expression
        regexp: '^[a-zA-Z]+$',

        // serialize to lowercase (or 'upper')
        toCase: 'lower'
    })
}) // as { someField?: string | null | undefined }

obj.someField = 'STR' // will serialize to lowercase
obj.someField = 1 // type & validation error
```

&nbsp;

#### NUMBER

```typescript
import { Meta, NUMBER } from 'metatyper'

const obj = Meta({
    someField: NUMBER({
        nullish: true,

        // NumberMetaTypeArgs
        min: 1, // value >= 1
        max: 9, // value <= 9
        greater: 0, // value > 0
        less: 10 // value < 10
    })
}) // as { someField?: number | null | undefined }

obj.someField = 1.2
obj.someField = 11 // validation error
obj.someField = 'str' // type & validation error
```

&nbsp;

#### INTEGER

```typescript
import { INTEGER, Meta } from 'metatyper'

const obj = Meta({
    someField: INTEGER({
        nullish: true,

        // NumberMetaTypeArgs
        min: 1, // value >= 1
        max: 9, // value <= 9
        greater: 0, // value > 0
        less: 10 // value < 10
    })
}) // as { someField?: number | null | undefined }

obj.someField = 1
obj.someField = 11 // validation error
obj.someField = 1.1 // validation error
```

&nbsp;

#### BIGINT

```typescript
import { BIGINT, Meta } from 'metatyper'

const obj = Meta({
    someField: BIGINT({
        nullish: true,

        // NumberMetaTypeArgs
        min: 1, // value >= 1
        max: 9, // value <= 9
        greater: 0, // value > 0
        less: 10 // value < 10
    })
}) // as { someField?: bigint | null | undefined }

obj.someField = 1n
obj.someField = 11n // validation error
obj.someField = 1 // type and validation error
```

&nbsp;

#### DATE

```typescript
import { DATE, Meta } from 'metatyper'

const obj = Meta({
    someField: DATE({
        nullish: true,

        // DateMetaTypeArgs
        min: 1, // value >= new Date(1)
        max: new Date(), // value <= new Date()
        greater: 0, // value > new Date(0)
        less: 10n // value < new Date(10)
    })
}) // as { someField?: Date | null | undefined }

obj.someField = new Date(1)
obj.someField = 1 // type and validation error
```

&nbsp;

#### LITERAL

```typescript
import { LITERAL, Meta } from 'metatyper'

const obj = Meta({
    someField: LITERAL(1, {
        nullish: true
    })
}) // as { someField?: 1 | null | undefined }

obj.someField = 1
obj.someField = 2 // type and validation error
```

&nbsp;

#### INSTANCE

```typescript
import { Meta, INSTANCE } from 'metatyper'

class A {
    a = 1
}

class B extends A {
    b = 2
}

const obj = Meta({
    someField: INSTANCE(B, {
        nullish: true

        // InstanceMetaTypeArgs

        // disallow the use of children B, default: true
        allowChildren: false
    })
})  // as { someField?: B | null | undefined }

obj.someField = new B() // ok
obj.someField = new A() // validation error
obj.someField = {} // type and validation error
obj.someField = B // type and validation error
```

&nbsp;

#### UNION

```typescript
import { BOOLEAN, Meta, STRING, UNION } from 'metatyper'

const obj = Meta({
    someField: UNION([BOOLEAN({ nullable: true }), STRING({ optional: true })])
})
// as { someField: (boolean | null) | (string | undefined) }

obj.someField = true // ok
obj.someField = new Date() // type and validation error
```

&nbsp;

#### ARRAY

```typescript
import { Meta, ARRAY, BOOLEAN, STRING } from 'metatyper'

const obj = Meta({

    someField: ARRAY(
        [
            BOOLEAN({ default: null, nullable: true }),
            STRING({ optional: true })
        ],
        {
            nullish: true,

            // ArrayMetaTypeArgs

            notEmpty: true, // == minLength: 0
            minLength: 0,
            maxLength: 10,

            // will create a frozen copy when deserializing
            freeze: true
        }
    )

    someField2: ARRAY(STRING(), { optional: true })
    someField3: ARRAY(STRING())

})
/*
as {
    someField:
      | readonly (boolean | null | string | undefined)[]
      | null
      | undefined         === undefined (because nullish)
    someField2?: string[] === undefined (because optional)
    someField3: string[]  === [] (default value when not optional)
}
*/

obj.someField = ['1', '2'] // ok
obj.someField = [1, '1'] // type and validation error
```

&nbsp;

#### TUPLE

```typescript
import { Meta, STRING, TUPLE } from 'metatyper'

const obj = Meta({
    someField: TUPLE([false, STRING({ optional: true })], {
        nullish: true,

        // TupleMetaTypeArgs

        // will create a frozen copy when deserializing
        freeze: true
    })
})
/* 
as { 
    someField: 
      | readonly [ boolean, string | undefined ] 
      | null 
      | undefined 
} 
*/

obj.someField = [true, '1'] // ok
obj.someField = ['1', true] // type and validation error
```

&nbsp;

#### OBJECT

```typescript
import { Meta, OBJECT, STRING, BOOLEAN } from 'metatyper'

const obj = Meta({

    someField: OBJECT({
        a: 1,
        b: 'string',
        c: BOOLEAN(),
        d: {
            e: STRING({ optional: true }),
            f: OBJECT({})
        }
    }, {
        nullish: true,

        // ObjectMetaTypeArgs

        // will create a frozen copy when deserializing
        freeze: true,

        // by default all fields are required
        required: ['a', 'b', 'c'],
    })

    someField2: OBJECT(BOOLEAN(), { optional: true })
    someField3: OBJECT(BOOLEAN())

})
/*
as {
    someField: {
        readonly a: number
        readonly b: string
        readonly c: boolean
        readonly d?: {
            e?: string
            f: Record<string, any>
        }
    }

    someField2?: Record<string, boolean> === undefined
    someField3: Record<string, boolean> === []
}
*/


obj.someField = {
    a: 2,
    b: 'str',
    c: false,
    d: {
        // e: 'optional field'
        f: {
            anyField: true
        }
    }
}

obj.someField = {
    a: 2,
    b: 'str',
    // type and validation error, `c` is not an optional field
}

obj.someField2 = {
    anyField: true
}
```

&nbsp;

#### Recursive structures

Meta types like `OBJECT`, `ARRAY`, `TUPLE` and `UNION` inherited from `StructuralMetaTypeImpl`.
So, it allows to create a recursive structures like this:

&nbsp;

Use argument to create a REF

```typescript
import { Meta, OBJECT } from 'metatyper'

OBJECT((selfImpl) => {
    type MyObjectType = {
        // ... any fields
        self: MyObjectType
    }

    return {
        // ... any fields
        self: selfImpl as any
    } as MyObjectType
})
// OBJECT(g4dv1h)<{ self: REF<g4dv1h> }>
```

> Be careful, `selfImpl` is of type `ObjectImpl`, it's not meta type

&nbsp;

Use a variable to create a REF

```typescript
import { Meta, OBJECT } from 'metatyper'

type MyType = {
    // ... any fields
    self: MyType
}

const myType: OBJECT<MyType> = OBJECT(() => {
    return {
        // ... any fields
        self: myType
    }
})
// OBJECT(g4dv1h)<{ self: REF<g4dv1h> }>
```

&nbsp;

Use recursive structures to create a REF

```typescript
import { Meta, OBJECT } from 'metatyper'

type MyType = {
    // ... any fields
    self: MyType
}

const myTypeSchema: MyType = {
    /* any fields */
}
myTypeSchema.self = myTypeSchema

OBJECT(myTypeSchema)
// OBJECT(g4dv1h)<{ self: REF<g4dv1h> }>
```

&nbsp;

You can also create more complex recursive structures with nested references

```typescript
import { Meta, OBJECT, STRING, TUPLE } from 'metatyper'

const myObjectType = OBJECT((selfImpl) => {
    type MyTuple = [MyObjectType, string, MyTuple]
    type MyObjectType = {
        num: number
        obj: { selfImpl: MyObjectType }
        arr: MyObjectType[]
        tup: MyTuple
    }

    const myObjectSchema: any = {
        num: 1,
        obj: { selfImpl },
        arr: null,
        tup: TUPLE((selfImpl) => [myObjectType, STRING(), selfImpl])
    }

    myObjectSchema.arr = [myObjectSchema, selfImpl, myObjectType]

    return myObjectSchema as MyObjectType
})

console.log(myObjectType.toString())
/*
OBJECT(n6f76)<{ 
    num: NUMBER, 
    obj: OBJECT(jqrb3)<{ selfImpl: REF<n6f76> }>, 
    arr: ARRAY(pugop)<
        UNION(ljwth)<
            REF<n6f76> | REF<n6f76> | REF<n6f76>
        >[]
    >, 
    tup: TUPLE(zwgxz)<[ REF<n6f76>, STRING, REF<zwgxz> ]> 
}>
*/
```

> `REF` - another optional type that works like a proxy.

Recursive value is not available now. You need to provide `undefined` value instead of recursive reference.

e.g.

```typescript
const obj = M({
    innerObj: OBJECT((myObjImpl) => ({ myObj: myObjImpl }), { optional: true })
})

obj.innerObj = { myObj: { myObj: { myObj: undefined } } }
```

```typescript
const myObj = {
    myObj: undefined
} as any

myObj.myObj = myObj

obj.innerObj = myObj // Maximum call stack size exceeded
```

&nbsp;

### Validation

Meta objects come with built-in validation capability. Validators specific to each Meta type are utilized during the validation process. If validation fails, an exception is raised. For more information on validation errors, refer to the [Errors](#errors) section.

Validators for Meta types are categorized into:

-   **Built-in Validators**: For example, `STRING` Meta type uses `MinLengthValidator`, configurable via the `minLength` argument.

-   **Runtime Validators**: These are provided as arguments at runtime to the Meta type.

For more details on the arguments accepted by Meta types, see the [MetaTypeArgsType](#metatypeargs) section.

Validation occurs automatically when assigning new values to a Meta object. Additionally, you can explicitly validate another object using the method:

```typescript
Meta.validate(
    metaObjectOrSchema: Meta<object> | object,
    rawObject: object,
    validateArgs?: {
        safe?: boolean,
        stopAtFirstError?: boolean
    }
) => boolean
```

**Example**:

```typescript
import { Meta } from 'metatyper'

const schema = {
    id: 0,
    name: STRING({
        validators: [
            /* validators here */
        ]
    })
}

Meta.validate(schema, { id: '351', name: null })
// throws MetaTypeValidatorError
```

&nbsp;

#### Validators

A validator is an object that contains a `validate` method:

```typescript
type ValidatorType = {
    name?: string
    validate: (args: ValidatorArgsType) => boolean
}

type ValidatorArgsType = {
    value: any
    metaTypeImpl?: MetaTypeImpl
    propName?: string | symbol
    targetObject?: object
    baseObject?: object

    safe?: boolean
    stopAtFirstError?: boolean
} & Record<string, any>
```

-   `value`: The value to be validated.
-   `metaTypeImpl`: The Meta type implementation invoking this validator.
-   `propName`: Specified when using Meta objects for validation.
-   `targetObject`: The object that needs to be validated.
-   `baseObject`: The object that contains the Meta type declaration with this validator.
-   `safe`: Determines whether a validation error should throw an exception.
-   `stopAtFirstError`: Specifies if validation should cease after the first error. Defaults to true.

&nbsp;

#### Disabling Validation

Validation can be disabled using the methods below:

Method 1

```typescript
Meta.validationIsActive(metaObj) === true

Meta.disableValidation(metaObj)

Meta.validationIsActive(metaObj) === false

metaObj.myProp = 0 // This is now allowed.

Meta.enableValidation(metaObj)
```

Method 2

```typescript
@Meta.Class()
class MyClass2 {
    myProp = MyType({
        validators: [],
        // Set empty array

        noBuiltinValidators: true
        // Disables the built-in validators like MetaTypeValidator or MinLengthValidator
    })
}
```

&nbsp;

### Serialization and Deserialization

Serialization and deserialization of values are handled by Meta type's serializers and deserializers. Serialization is performed when retrieving a property’s value, whereas deserialization occurs during value assignment. Direct invocation of serialization and deserialization is also supported through specific methods:

```typescript
Meta.serialize = (
    metaObject: Meta<T> | T,
    serializeArgs?: {
        metaArgs?: MetaArgsType
    }
): { [key in keyof T]: any }
```

> You can specify the `serialize` result type: `Meta.serialize<{ a: number }>(...)`

```typescript
Meta.deserialize = (
    metaObjectOrProto: Meta<T> | T,
    rawObject: object,
    deserializeArgs?: {
        metaArgs?: MetaArgsType
    }
): Meta<T>
```

&nbsp;

**Example**:

```typescript
import { Meta } from 'metatyper'

const objToSerialize = { id: '351', date: new Date(123) }

const objToDeSerialize = Meta.serialize<{
    id: string
    date: number
}>({ id: '', name: DATE({ coercion: true }) }, objToSerialize)

// objToDeSerialize now equals { id: '351', date: 123 }

Meta.deserialize({ id: '', name: DATE({ coercion: true }) }, objToDeSerialize) // returns Meta({ id: '351', date: new Date(123) })
```

&nbsp;

#### Serializers and Deserializers

A **serializer** is an object with a `serialize` method, and a **deserializer** likewise has a `deserialize` method:

```typescript
type SerializerArgsType = {
    value: any
    metaTypeImpl?: MetaTypeImpl
    propName?: string | symbol
    targetObject?: object
    baseObject?: object
    place?: SerializePlaceType
}

type SerializerType = {
    serialize: (serializeArgs: SerializerArgsType) => any

    name?: string
    serializePlaces?: SerializePlaceType[]
}
```

```typescript
type DeSerializerArgsType = {
    value: any
    metaTypeImpl?: MetaTypeImpl
    propName?: string | symbol
    targetObject?: object
    baseObject?: object
    place?: DeSerializePlaceType
}

type DeSerializerType = {
    deserialize: (deserializeArgs: DeSerializerArgsType) => any

    name?: string
    deserializePlaces?: DeSerializePlaceType[]
}
```

Each field's purpose in both serializers and deserializers closely aligns with those in [validators](#validators), specifying the object context and invoking Meta type implementation.

Serialization and deserialization processes can be adjusted depending on their specific use cases with the help of `SerializePlaceType` and `DeSerializePlaceType`. This allows for a more precise control over how and where these processes occur. The term "place" refers to the specific scenario in which serialization occurs.

`SerializePlaceType` indicates various contexts where serialization can happen:

-   `get`: This is used when retrieving a property, for example, accessing a property like `obj.prop`.
-   `serialize`: This context is applied during the serialization of an object, such as when using `Meta.serialize(obj)`.
-   `unknown`: This default setting is used for custom serialization logic that does not fit the other predefined contexts.

Similarly, `DeSerializePlaceType` outlines different scenarios for deserialization:

-   `init`: Indicates the initialization of a new type declaration, like starting a Meta object with `Meta({ prop: 'value' })`.
-   `reinit`: Used when re-initializing type declarations by defining a new Meta type, for example, changing a property's type with `obj.prop = NUMBER()`.
-   `set`: Applies when setting a new property value, such as `obj.prop = 1`.
-   `deserialize`: This context is for deserializing an object, done like `Meta.deserialize(obj, rawData)`.
-   `unknown`: The default setting for custom deserialization logic that doesn't align with the specified contexts.

&nbsp;

#### Disable Serialization

To disable serialization or deserialization:

Method 1

```typescript
Meta.serializationIsActive(metaObject) === true

Meta.disableSerialization(metaObject)

Meta.serializationIsActive(metaObject) === false

metaObject.myProp = 0 // Deserialization does not occur.

Meta.enableSerialization(metaObject)
```

Method 2

```typescript
@Meta.Class()
class MyClass2 {
    myProp = MyType({
        serializers: [],
        // Empty array disables serializers

        deserializers: [],
        // Empty array disables deserializers

        noBuiltinSerializers: true,
        // Disables all built-in serializers like Coercion

        noBuiltinDeSerializers: true
        // Disables all built-in deserializers like Coercion
    })
}
```

&nbsp;

#### Types Coercion

Meta types have coercion capabilities upon serialization and deserialization.
This is particularly handy for handling various value types such as dates in JSON data.

> `undefined` and `null` values will not be converted

&nbsp;

These built-in metatypes support coercion:

&nbsp;

##### BOOLEAN coercion

```typescript
BOOLEAN({ coercion: true })
```

`Meta.deserialize` will cast `value` to `!!value`.

&nbsp;

##### STRING coercion

```typescript
STRING({ coercion: true })
```

`Meta.deserialize` will cast any `value` to string.

> For the date value, `value.toISOString()` will be used

&nbsp;

##### NUMBER coercion

```typescript
NUMBER({ coercion: true })
```

`Meta.deserialize` will cast `value` depending on the type of the value:

-   `Date` -> `value.getTime()`
-   `bigint` -> `Number(value)`
-   `string` -> `Number(value)`
-   `boolean` -> `Number(value)`

&nbsp;

##### INTEGER coercion

```typescript
INTEGER({ coercion: true })
```

`Meta.deserialize` will cast `value` depends on the type of the value:

-   `Date` -> `value.getTime()`
-   `bigint` -> `Number(value)`
-   `string` -> `Number(value)`
-   `boolean` -> `Number(value)`
-   `number` -> `Math.trunc(value)`

&nbsp;

##### BIGINT coercion

```typescript
BIGINT({ coercion: true })
```

`Meta.deserialize` will cast `value` depends on the type of the value:

-   `Date` -> `BigInt(value.getTime())`
-   `string` -> `BigInt(value)`
-   `boolean` -> `BigInt(value)`
-   `number` -> `BigInt(Math.trunc(value))`

`Meta.serialize` will cast `value` to `string`.

&nbsp;

##### DATE coercion

```typescript
DATE({ coercion: true })
```

`Meta.deserialize` will cast `value` depends on the type of the value:

-   `bigint` -> `new Date(Number(value))`
-   `number` -> `new Date(value)`
-   `string` -> `new Date(value)`

`Meta.serialize` will cast `value` to timestamp (`value.getTime()`).

&nbsp;

### Errors

When working with Meta objects, you may encounter a range of errors. These can be broadly categorized into standard errors, such as `TypeError('Cannot assign to read only property ...')`, and specialized errors unique to the handling of Meta objects. Understanding these errors and their hierarchy is crucial for effectively managing exceptions and maintaining robust code.

Specialized errors fall under the umbrella of `MetaError` and include:

&nbsp;

#### MetaTypeSerializationError

`MetaTypeSerializationError` serves as an extended version of `MetaError`, focusing specifically on the identification and handling of serialization errors. Its main purpose is to allow developers to pinpoint serialization issues distinctively using `instanceof` checks. This differentiation is crucial for separating serialization errors from others, like validation errors, enhancing debugging efficiency.

&nbsp;

#### MetaTypeSerializerError

When it comes to serialization of Meta type data, encountering errors is a possibility. The `MetaTypeSerializerError` is designed to throw an exception in such cases. This error aims to simplify the debugging process and error handling by offering in-depth information about where and why the failure occurred.

Key fields of the `MetaTypeSerializerError`:

-   **serializer**: This property provides a direct link to the `SerializerType` instance responsible for the error. This allows developers to easily identify which serializer was involved in the process and potentially inspect its configuration or state at the time of failure.

-   **serializerErrorArgs**: Holding the type `SerializerErrorArgsType`, this property delivers a detailed look at the arguments fed into the serialization function at the error's occurrence. These arguments cover a range of information, from the value being serialized, the property's name, the target object, to additional options affecting serialization. Within `serializerErrorArgs`, there's a `subError` field holding an `Error` instance, shedding light on the precise cause of the serialization failure. This layered error reporting strategy significantly aids in debugging by providing a clear context of the error beyond merely indicating its occurrence.

```typescript
type SerializerErrorArgsType = {
    value: any

    subError?: Error

    propName?: string | symbol
    targetObject?: object
    baseObject?: object
    place?: SerializePlaceType

    metaTypeImpl?: MetaTypeImpl
} & Record<string, any>
```

&nbsp;

#### MetaTypeDeSerializerError

Mirroring the `MetaTypeSerializerError`, the `MetaTypeDeSerializerError` addresses errors during the deserialization of Meta type data. This exception is crucial for developers aiming to resolve issues arising from converting serialized data back into a usable form within the application.

Key fields of the `MetaTypeDeSerializerError`:

-   **deserializer**: Reflecting the `serializer` attribute in `MetaTypeSerializerError`, this field links to the deserializer instance that encountered the error, facilitating an understanding of which deserialization logic didn't succeed.

-   **deserializerErrorArgs**: As `DeSerializerErrorArgsType`, this attribute documents the arguments present at the deserialization function during the error event. Providing a comprehensive context, these arguments include the value being deserialized, relevant property names, and the objects involved, among others.

```typescript
type DeSerializerErrorArgsType = {
    value: any

    subError?: Error

    propName?: string | symbol
    targetObject?: object
    baseObject?: object
    place?: DeSerializePlaceType

    metaTypeImpl?: MetaTypeImpl
} & Record<string, any>
```

&nbsp;

#### MetaTypeValidationError

`MetaTypeValidationError` functions as an enhanced variant of `MetaError`, specifically dedicated to identifying and managing validation errors. Its primary role is to enable developers to efficiently distinguish validation errors from other types, such as serialization or deserialization errors, through `instanceof` checks. This specificity is vital for streamlined error handling and debugging processes.

&nbsp;

#### MetaTypeValidatorError

During the validation process of Meta type data, it's plausible to encounter failures. The `MetaTypeValidatorError` is thrown in such scenarios to indicate a validation issue. The uniqueness of this error, compared to `MetaTypeValidatorsArrayError`, is determined by the function arguments during validation. Specifically, setting `stopAtFirstError: false` in the function arguments collects all encountered validation errors, encapsulating them within a `MetaTypeValidatorsArrayError` containing multiple `MetaTypeValidatorError` instances.

Key fields of the `MetaTypeValidatorError`:

-   **validator**: This field connects directly to the `ValidatorType` that generated the error, allowing developers to identify and investigate the specific validator causing the issue.

-   **validatorErrorArgs**: Holding the `ValidatorErrorArgsType`, this attribute provides a detailed account of the circumstances leading to the validation error. Information includes the value under validation, property names, the involved objects, and optionally, a subError detailing the underlying cause of failure, if applicable. Additionally, it may indicate whether the validation was set to stop at the first error or continue to gather all errors.

```typescript
type ValidatorErrorArgsType = {
    value: any
    subError?: Error

    propName?: string | symbol
    targetObject?: object
    baseObject?: object

    metaTypeImpl?: MetaTypeImpl
    stopAtFirstError?: boolean
} & Record<string, any>
```

&nbsp;

#### MetaTypeValidatorsArrayError

Mirroring scenarios in which `MetaTypeValidatorError` arises, the `MetaTypeValidatorsArrayError` is thrown when multiple validation errors are encountered during the checking of Meta type data. This exception is particularly generated when the validation function’s argument `stopAtFirstError` is set to `false`, allowing the accumulation of all validation errors into a single `MetaTypeValidatorsArrayError`. This error then contains an array of `MetaTypeValidatorError` instances, providing a comprehensive overview of all validation issues detected.

Key fields of the `MetaTypeValidatorsArrayError`:

-   **validatorsErrors**: This attribute is an array of `MetaTypeValidatorError` instances, each detailing a specific validation failure encountered during the process. This collection offers a broad perspective on the nature and extent of validation issues, facilitating thorough error resolution.

&nbsp;

## Similar Libraries

There are many other popular good libraries that perform similar functions well. If you require specific functionality, you can explore various validation libraries (eg Zod) or type collections (eg Type-fest). Moreover, you have the flexibility to integrate the best features from these libraries alongside MetaTyper to achieve best outcomes.

These libs are worth a look:

-   class-validator
-   io-ts
-   joi
-   ow
-   runtypes
-   ts-toolbelt
-   type-fest
-   yup
-   zod

&nbsp;

## Change Log

Stay updated with the latest changes and improvements: [GitHub Releases](https://github.com/metatyper/metatyper/releases).
