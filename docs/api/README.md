**metatyper**

***

## Functions

### ANY()

```ts
function ANY(args?: MetaTypeArgsType<any>): any;
```

Defined in: [src/metatypes/types/any.ts:23](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/any.ts#L23)

Creates a runtime meta type equivalent to TypeScript's `any`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args?`

</td>
<td>

[`MetaTypeArgsType`](#metatypeargstype)\<`any`\>

</td>
<td>

Standard [MetaTypeArgsType](#metatypeargstype) options (defaults, optional, etc.).

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

#### Example

```ts
const obj = Meta({ field: ANY({ nullish: true }) }) // as { field: any }
obj.field = 1
obj.field = {}
```

***

### ARRAY()

#### Call Signature

```ts
function ARRAY<T, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, PreparedT, ResultT>(subType: T[], args?: ArrayMetaTypeArgs<ARRAY<T[]>, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/array.ts:217](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L217)

Creates an array meta type with optional item type, length limits, freezing, etc.

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl) ? `unknown` : `T`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`ARRAY`](#array)\<`IsFrozenT` *extends* `true` ? readonly `PreparedT`[] : `PreparedT`[]\>

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

`T`[]

</td>
<td>

Item schema (meta type, literal, array, or factory). Defaults to [ANY](#any).

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ArrayMetaTypeArgs`](#arraymetatypeargs)\<[`ARRAY`](#array)\<`T`[]\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ArrayMetaTypeArgs](#arraymetatypeargs) controlling length/default/nullability.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj = Meta({
     tags: ARRAY(STRING()),
     keys: [1, 'string', BOOLEAN()]
}) // as { tags: string[], keys: (number | string | boolean)[] }
obj.tags = ['foo', 'bar']
obj.tags = [1] // validation error
obj.keys = ['mystring', 1, 2, 3]
obj.keys = ['mystring', 1, 2, 3 {}] // validation error
```

#### Call Signature

```ts
function ARRAY<T, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, PreparedT, ResultT>(subType: () => T[], args?: ArrayMetaTypeArgs<ARRAY<T[]>, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/array.ts:230](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L230)

Creates an array meta type with optional item type, length limits, freezing, etc.

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl) ? `unknown` : `T`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`ARRAY`](#array)\<`IsFrozenT` *extends* `true` ? readonly `PreparedT`[] : `PreparedT`[]\>

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

() => `T`[]

</td>
<td>

Item schema (meta type, literal, array, or factory). Defaults to [ANY](#any).

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ArrayMetaTypeArgs`](#arraymetatypeargs)\<[`ARRAY`](#array)\<`T`[]\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ArrayMetaTypeArgs](#arraymetatypeargs) controlling length/default/nullability.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj = Meta({
     tags: ARRAY(STRING()),
     keys: [1, 'string', BOOLEAN()]
}) // as { tags: string[], keys: (number | string | boolean)[] }
obj.tags = ['foo', 'bar']
obj.tags = [1] // validation error
obj.keys = ['mystring', 1, 2, 3]
obj.keys = ['mystring', 1, 2, 3 {}] // validation error
```

#### Call Signature

```ts
function ARRAY<T, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, PreparedT, ResultT>(subType: T, args?: ArrayMetaTypeArgs<ARRAY<T[]>, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/array.ts:243](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L243)

Creates an array meta type with optional item type, length limits, freezing, etc.

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl) ? `unknown` : `T`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`ARRAY`](#array)\<`IsFrozenT` *extends* `true` ? readonly `PreparedT`[] : `PreparedT`[]\>

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

`T`

</td>
<td>

Item schema (meta type, literal, array, or factory). Defaults to [ANY](#any).

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ArrayMetaTypeArgs`](#arraymetatypeargs)\<[`ARRAY`](#array)\<`T`[]\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ArrayMetaTypeArgs](#arraymetatypeargs) controlling length/default/nullability.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj = Meta({
     tags: ARRAY(STRING()),
     keys: [1, 'string', BOOLEAN()]
}) // as { tags: string[], keys: (number | string | boolean)[] }
obj.tags = ['foo', 'bar']
obj.tags = [1] // validation error
obj.keys = ['mystring', 1, 2, 3]
obj.keys = ['mystring', 1, 2, 3 {}] // validation error
```

***

### BIGINT()

```ts
function BIGINT<IsNullishT, IsNullableT, IsOptionalT>(args?: NumbersMetaTypeArgs<BIGINT, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<BIGINT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/bigint.ts:80](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/bigint.ts#L80)

Creates a bigint meta type with optional numeric bounds and default/meta args.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args?`

</td>
<td>

[`NumbersMetaTypeArgs`](#numbersmetatypeargs)\<[`BIGINT`](#bigint), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[NumbersMetaTypeArgs](#numbersmetatypeargs) controlling range/default/nullability.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`BIGINT`](#bigint), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj = Meta({ amount: BIGINT({ nullish: true }) })
obj.amount = 1n
obj.amount = 1 // validation error
```

***

### BOOLEAN()

```ts
function BOOLEAN<IsNullishT, IsNullableT, IsOptionalT>(args?: BooleanMetaTypeArgs<BOOLEAN, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<BOOLEAN, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/boolean.ts:61](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L61)

Creates a boolean meta type with optional coercion lists and standard meta args.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args?`

</td>
<td>

[`BooleanMetaTypeArgs`](#booleanmetatypeargs)\<[`BOOLEAN`](#boolean), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[BooleanMetaTypeArgs](#booleanmetatypeargs) controlling coercion/default/nullability.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`BOOLEAN`](#boolean), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj = Meta({ flag: BOOLEAN({ nullish: true }) })
obj.flag = true
obj.flag = 'true' // validation error
```

***

### DATE()

```ts
function DATE<IsNullishT, IsNullableT, IsOptionalT>(args?: DateMetaTypeArgs<DATE, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<DATE, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/date.ts:124](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L124)

Creates a `Date` meta type with optional range checks and coercion support.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args?`

</td>
<td>

[`DateMetaTypeArgs`](#datemetatypeargs)\<[`DATE`](#date), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[DateMetaTypeArgs](#datemetatypeargs) controlling bounds/default/nullability.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`DATE`](#date), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj = Meta({ createdAt: DATE({ nullish: true }) })
obj.createdAt = new Date()
obj.createdAt = 1 // validation error
```

***

### deepMap()

```ts
function deepMap(obj: object, processFunc: (args: {
  isRootValue: boolean;
  key?: any;
  keysChain?: any[];
  origValue: any;
  parentObj?: object;
  rootObj: object;
  value: any;
}) => any): any;
```

Defined in: [src/utils/deepMap.ts:23](https://github.com/metatyper/metatyper/blob/main/src/utils/deepMap.ts#L23)

Recursively walks an object/array tree, allowing a processing function to transform nodes.
Handles circular references and preserves original object references.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`processFunc`

</td>
<td>

(`args`: \{ `isRootValue`: `boolean`; `key?`: `any`; `keysChain?`: `any`[]; `origValue`: `any`; `parentObj?`: `object`; `rootObj`: `object`; `value`: `any`; \}) => `any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### DefaultValueDeSerializerBuilder()

```ts
function DefaultValueDeSerializerBuilder(defaultValue: any): {
  deserialize: (args: DeSerializerArgsType) => any;
  deserializePlaces: string[];
  name: string;
};
```

Defined in: [src/serializers/defaultValue.ts:9](https://github.com/metatyper/metatyper/blob/main/src/serializers/defaultValue.ts#L9)

Creates a deserializer that injects default values when the incoming value is `undefined`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`defaultValue`

</td>
<td>

`any`

</td>
<td>

Static value or factory invoked with [DeSerializerArgsType](#deserializerargstype).

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  deserialize: (args: DeSerializerArgsType) => any;
  deserializePlaces: string[];
  name: string;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserialize()`

</td>
<td>

(`args`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/defaultValue.ts:11](https://github.com/metatyper/metatyper/blob/main/src/serializers/defaultValue.ts#L11)

</td>
</tr>
<tr>
<td>

`deserializePlaces`

</td>
<td>

`string`[]

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/defaultValue.ts:22](https://github.com/metatyper/metatyper/blob/main/src/serializers/defaultValue.ts#L22)

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'DefaultValueDeSerializer'`

</td>
<td>

[src/serializers/defaultValue.ts:10](https://github.com/metatyper/metatyper/blob/main/src/serializers/defaultValue.ts#L10)

</td>
</tr>
</tbody>
</table>

***

### getDescriptorValue()

```ts
function getDescriptorValue(obj: any, propName: string | symbol): any;
```

Defined in: [src/utils/objects.ts:2](https://github.com/metatyper/metatyper/blob/main/src/utils/objects.ts#L2)

Safely reads the value of an own property descriptor when the object is known.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### GreaterValidatorBuilder()

```ts
function GreaterValidatorBuilder(greater: any): {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/minMaxValidators.ts:28](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L28)

Creates a validator enforcing `value > greater`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`greater`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'Greater'`

</td>
<td>

[src/validators/minMaxValidators.ts:29](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L29)

</td>
</tr>
<tr>
<td>

`validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/minMaxValidators.ts:30](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L30)

</td>
</tr>
</tbody>
</table>

***

### inspect()

```ts
function inspect(value: any): any;
```

Defined in: [src/utils/inspect.ts:8](https://github.com/metatyper/metatyper/blob/main/src/utils/inspect.ts#L8)

Produces a string representation of a value similar to Node's `util.inspect`,
but aware of meta objects, circular refs, and custom toString implementations.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### INSTANCE()

```ts
function INSTANCE<T, IsNullishT, IsNullableT, IsOptionalT>(subType: Class<T>, args?: InstanceMetaTypeArgs<INSTANCE<T>, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<INSTANCE<T>, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/instance.ts:92](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L92)

Creates a meta type that validates values are instances of the provided class.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

[`Class`](#class)\<`T`\>

</td>
<td>

Class or instance used as the target type.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`InstanceMetaTypeArgs`](#instancemetatypeargs)\<[`INSTANCE`](#instance-1)\<`T`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[InstanceMetaTypeArgs](#instancemetatypeargs) controlling subclass allowance and meta args.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`INSTANCE`](#instance-1)\<`T`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
class A {
   a = 1
}

const obj1 = Meta({
     a: INSTANCE(A, { nullish: true })
}) // as { a: A | null | undefined }

obj1.a = new A()
obj1.a = {} // type & validation error
obj1.a = { a: 1 } // validation error
```

***

### INTEGER()

```ts
function INTEGER<IsNullishT, IsNullableT, IsOptionalT>(args?: NumbersMetaTypeArgs<INTEGER, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<INTEGER, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/integer.ts:78](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/integer.ts#L78)

Creates a meta type for integers (numbers coerced/truncated to whole values).

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args?`

</td>
<td>

[`NumbersMetaTypeArgs`](#numbersmetatypeargs)\<[`INTEGER`](#integer), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[NumbersMetaTypeArgs](#numbersmetatypeargs) controlling range/default/nullability.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`INTEGER`](#integer), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj1 = Meta({
     a: INTEGER({ nullish: true })
}) // as { a: number | null | undefined }

obj1.a = 1
obj1.a = 1.2 // validation error
```

***

### isClass()

```ts
function isClass(target: any): boolean;
```

Defined in: [src/utils/classes.ts:18](https://github.com/metatyper/metatyper/blob/main/src/utils/classes.ts#L18)

Checks whether the provided target is a class constructor.
Works with raw constructors and meta-object-wrapped classes.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`target`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### isDateObject()

```ts
function isDateObject(date: any): boolean;
```

Defined in: [src/utils/checks.ts:2](https://github.com/metatyper/metatyper/blob/main/src/utils/checks.ts#L2)

Checks whether the provided value behaves like a `Date` instance.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`date`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### isEqual()

```ts
function isEqual(a: any, b: any): boolean;
```

Defined in: [src/utils/checks.ts:7](https://github.com/metatyper/metatyper/blob/main/src/utils/checks.ts#L7)

Performs a shallow-to-deep structural equality check (used when comparing literal schema values).

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### isPlainObject()

```ts
function isPlainObject(value: any): false;
```

Defined in: [src/utils/deepMap.ts:9](https://github.com/metatyper/metatyper/blob/main/src/utils/deepMap.ts#L9)

Determines whether a value is a plain object/array without meta markers or circular refs.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`false`

***

### LessValidatorBuilder()

```ts
function LessValidatorBuilder(less: any): {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/minMaxValidators.ts:40](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L40)

Creates a validator enforcing `value < less`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`less`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'Less'`

</td>
<td>

[src/validators/minMaxValidators.ts:41](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L41)

</td>
</tr>
<tr>
<td>

`validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/minMaxValidators.ts:42](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L42)

</td>
</tr>
</tbody>
</table>

***

### LITERAL()

```ts
function LITERAL<T, IsNullishT, IsNullableT, IsOptionalT>(subType: T, args?: MetaTypeArgsType<LITERAL<T>, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<LITERAL<T>, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/literal.ts:34](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/literal.ts#L34)

Creates a meta type that allows only the provided literal value (with standard meta args).

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `string` \| `number` \| `bigint` \| `boolean` \| `symbol`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

`T`

</td>
<td>

Literal value to lock to.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`MetaTypeArgsType`](#metatypeargstype)\<[`LITERAL`](#literal)\<`T`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[MetaTypeArgsType](#metatypeargstype) controlling nullability/defaults.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`LITERAL`](#literal)\<`T`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj = Meta({ status: LITERAL('done') })
obj.status = 'done'
obj.status = 'pending' // validation error
```

***

### MaxLengthValidatorBuilder()

```ts
function MaxLengthValidatorBuilder(length: number): {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/lengthValidators.ts:28](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L28)

Creates a validator ensuring value length does not exceed `length`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'MaxLength'`

</td>
<td>

[src/validators/lengthValidators.ts:29](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L29)

</td>
</tr>
<tr>
<td>

`validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/lengthValidators.ts:30](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L30)

</td>
</tr>
</tbody>
</table>

***

### MaxValidatorBuilder()

```ts
function MaxValidatorBuilder(max: any): {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/minMaxValidators.ts:16](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L16)

Creates a validator enforcing `value <= max`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`max`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'Max'`

</td>
<td>

[src/validators/minMaxValidators.ts:17](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L17)

</td>
</tr>
<tr>
<td>

`validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/minMaxValidators.ts:18](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L18)

</td>
</tr>
</tbody>
</table>

***

### Meta()

```ts
function Meta<T>(protoObject?: T, metaArgs?: MetaArgsType): Meta<T>;
```

Defined in: [src/metaobjects/meta.ts:241](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L241)

Create a Meta object

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`protoObject?`

</td>
<td>

`T`

</td>
<td>

The plain object used as the prototype/schema for the meta object.

</td>
</tr>
<tr>
<td>

`metaArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

Configuration arguments ([MetaArgsType](#metaargstype)) for creating the meta object.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Meta`](#meta)\<`T`\>

A new Meta object

#### Example

```ts
const obj1 = Meta({
  id: NUMBER({ optional: true }),
  name: 'John Doe',
  stars: NUMBER({ default: 0, min: 0 })
})

obj1.id = 1
obj1.id = 'str' // will throw an validation error

class MyCls {
     static someClsProp = STRING({ default: '' })

     someInstanceProp = NUMBER({ default: 0 })
}

const MyMetaCls = Meta(MyCls)

MyMetaCls.someClsProp = 'str'
MyMetaCls.someClsProp = 1 // will throw an validation error

const myInstance = new MyMetaCls()

myInstance.someInstanceProp = 2
myInstance.someInstanceProp = '2' // will throw an validation error
```

#### Remarks

The `Meta` function also provides several utility methods.
These methods are available on the `Meta` object and can be used to interact with meta objects.
The methods are:
- `Meta.copy(metaObject)` - [MetaCopy](#metacopy) - Creates a copy of a meta object preserving its values, types, prototype and arguments.
- `Meta.rebuild(metaObject)` - [MetaRebuild](#metarebuild) - Rebuilds a meta object using the same original object and arguments, resetting to initial state.
- `Meta.isMetaObject(obj)` - [MetaIsMetaObject](#metaismetaobject) - Checks if an object is a meta object.
- `Meta.isIgnoredProp(propName)` - [MetaIsIgnoredProp](#metaisignoredprop) - Checks if a property is ignored by Meta.
- `@Meta.Class(metaArgs)` - [MetaClass](#metaclass) - Decorator for transforming a class into a meta class.
- `@Meta.declare(metaType)` - [MetaDeclare](#metadeclare) - Decorator for declaring meta type information on class properties.
- `Meta.serialize(metaObject)` - [MetaSerialize](#metaserialize) - Serializes a meta object.
- `Meta.deserialize(data, protoObject)` - [MetaDeserialize](#metadeserialize) - Deserializes a value into a meta object.
- `Meta.toJson(metaObject)` - [MetaToJson](#metatojson) - Serializes a meta object into a JSON string.
- `Meta.fromJson(data, protoObject)` - [MetaFromJson](#metafromjson) - Deserializes a JSON string into a meta object.
- `Meta.represent(metaObject)` - [MetaRepresent](#metarepresent) - Generates a textual representation of a meta object.
- `Meta.getProto(metaObject)` - [MetaProto](#metaproto) - Retrieves the prototype of the meta object.
- `Meta.getMetaArgs(metaObject)` - [MetaGetMetaArgs](#metagetmetaargs) - Retrieves the meta arguments used to create a meta object.
- `Meta.validationIsActive(metaObject)` - [MetaValidationIsActive](#metavalidationisactive) - Checks if validation is active for the given meta object.
- `Meta.disableValidation(metaObject)` - [MetaDisableValidation](#metadisablevalidation) - Disables validation for the specified meta object.
- `Meta.enableValidation(metaObject)` - [MetaEnableValidation](#metaenablevalidation) - Enables validation for the specified meta object.
- `Meta.serializationIsActive(metaObject)` - [MetaSerializationIsActive](#metaserializationisactive) - Checks if serialization is active for the given meta object.
- `Meta.disableSerialization(metaObject)` - [MetaDisableSerialization](#metadisableserialization) - Disables serialization for the specified meta object.
- `Meta.enableSerialization(metaObject)` - [MetaEnableSerialization](#metaenableserialization) - Enables serialization for the specified meta object.

***

### MetaClass()

```ts
function MetaClass(metaArgs?: MetaArgsType): <T>(cls: T) => any;
```

Defined in: [src/metaobjects/meta.ts:278](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L278)

Transforms a class into a meta class using the provided meta arguments.

The `Meta.Class` decorator enhances a class by applying meta object behavior to it,
allowing for runtime type checking, validation, and serialization based on the specified meta arguments.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

Configuration arguments ([MetaArgsType](#metaargstype)) for creating the meta class and meta instances.

</td>
</tr>
</tbody>
</table>

#### Returns

A decorator function that takes a class and returns its meta class equivalent.

```ts
<T>(cls: T): any;
```

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* (...`args`: `any`[]) => `any`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`cls`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

##### Returns

`any`

#### Example

```ts
@Meta.Class({ metaTypesArgs: { optional: true } })
class User {
  id = NUMBER()
  name = STRING({ minLength: 3 })
}

const user = new User()

user.id = 1 // OK
user.name = 'John' // OK
user.name = 'Jo' // Throws a validation error
```

***

### MetaCopy()

```ts
function MetaCopy<T>(metaObject: T): Required<T> extends Required<{
  [IsMetaObjectSymbol]?: true;
}> ? T : Meta<T> | null;
```

Defined in: [src/metaobjects/meta.ts:821](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L821)

Creates a copy of a meta object, preserving its public properties, values, types, and prototype.
This method is particularly useful for creating independent instances of meta objects that share the same structure but need to manage their own state.
If the provided argument is not a meta object, the function returns `null`, indicating that no copy can be made.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
<td>

The type of the original meta object.

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`T`

</td>
<td>

The meta object to copy.

</td>
</tr>
</tbody>
</table>

#### Returns

`Required`\<`T`\> *extends* `Required`\<\{
  `[IsMetaObjectSymbol]?`: `true`;
\}\> ? `T` : [`Meta`](#meta)\<`T`\> \| `null`

A copy of the meta object if the argument is a meta object, otherwise `null`.

#### Example

```ts
const originalMetaObject = Meta({
  id: 1,
  name: 'John Doe',
  isActive: BOOLEAN({ default: true })
})

// Creating a copy of the meta object
const copiedMetaObject = Meta.copy(originalMetaObject)

console.log(copiedMetaObject)
// Output: A new meta object with the same properties and values as originalMetaObject
```

***

### MetaDeclare()

#### Call Signature

```ts
function MetaDeclare<T, K>(metaType: T[K]): (target: T, propName: K) => void;
```

Defined in: [src/metaobjects/meta.ts:308](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L308)

Decorator for declaring meta type information for class properties.

The `declare` decorator allows you to specify meta type information directly on class properties.
This facilitates runtime type checking, validation, and serialization/deserialization of property values
based on the provided meta type or meta type arguments.

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`K` *extends* `string` \| `number` \| `symbol`

</td>
<td>

keyof `T`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaType`

</td>
<td>

`T`\[`K`\]

</td>
<td>

The meta type instance to apply to the class property.

</td>
</tr>
</tbody>
</table>

##### Returns

A decorator function that applies the specified meta type information to the target class property.

```ts
(target: T, propName: K): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`target`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`K`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### Example

```ts
import { Meta } from 'metatyper'

@Meta.Class()
class User {
  @Meta.declare(NUMBER({ min:0, optional:true }))
  id: number | undefined
}
```

#### Call Signature

```ts
function MetaDeclare<T, K, IsNullableT>(metaTypeArgs?: MetaTypeArgsType<T[K], IsNullableT>): (target: T, propName: K) => void;
```

Defined in: [src/metaobjects/meta.ts:340](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L340)

Decorator for declaring meta type information for class properties.

The `declare` decorator allows you to specify meta type information directly on class properties.
This facilitates runtime type checking, validation, and serialization/deserialization of property values 
based on the provided meta type or meta type arguments.

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
</tr>
<tr>
<td>

`K` *extends* `string` \| `number` \| `symbol`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

[`MetaTypeArgsType`](#metatypeargstype)\<`T`\[`K`\], `IsNullableT`\>

</td>
<td>

The meta type arguments to apply to the class property. 
                      The meta type itself will be reflected from the TypeScript property type using reflect-metadata.

</td>
</tr>
</tbody>
</table>

##### Returns

A decorator function that applies the specified meta type information to the target class property.

```ts
(target: T, propName: K): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`target`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`K`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### Example

Reflect metatype from class property type:
```ts
import 'reflect-metadata'

import { Meta } from 'metatyper'

@Meta.Class()
class Product {

  @Meta.declare({ min: 0, optional: true })
  price?: number

}
```

***

### MetaDeserialize()

```ts
function MetaDeserialize<T>(
   metaObjectOrProto: T | Meta<T>, 
   rawObject: object, 
deserializeArgs?: DeSerializeMetaObjectArgsType): Meta<T>;
```

Defined in: [src/metaobjects/meta.ts:770](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L770)

Deserializes a raw object into a meta object, updating or creating it based on the provided arguments.
This function is particularly useful for converting plain objects into structured, validated meta objects,
enabling runtime type checking, validation, and serialization capabilities.

If the first argument is already a meta object,
it updates this object with new properties from the raw object,
applying any necessary deserialization and validation according to the meta object's schema.
If the first argument is a plain object or class,
a new meta object is created using the provided `deserializeArgs.metaArgs` and the properties from the raw object.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
<td>

The type of the target meta object.

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObjectOrProto`

</td>
<td>

`T` \| [`Meta`](#meta)\<`T`\>

</td>
<td>

The meta object to update, or a simple object/class from which to create a new meta object.

</td>
</tr>
<tr>
<td>

`rawObject`

</td>
<td>

`object`

</td>
<td>

The plain object containing new properties to deserialize into the meta object.

</td>
</tr>
<tr>
<td>

`deserializeArgs?`

</td>
<td>

[`DeSerializeMetaObjectArgsType`](#deserializemetaobjectargstype)

</td>
<td>

arguments to customize the deserialization behavior, including `metaArgs` to apply if creating a new meta object.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Meta`](#meta)\<`T`\>

The updated or newly created meta object with properties deserialized from the raw object.

#### Example

```ts
const userMeta = Meta({
  id: NUMBER({ default: 0 }),
  name: STRING({ default: '' }),
  isActive: BOOLEAN({ default: true })
})

// Deserializing updates into an existing meta object
const updatedUserMeta = Meta.deserialize(userMeta, { id: 2, name: 'Jane Doe' })
console.log(updatedUserMeta) // Meta object with updated id and name
console.log(updatedUserMeta === userMeta) // true

// Creating a new meta object from a raw object
const newUserMeta = Meta.deserialize({ id: NUMBER(), name: STRING() }, { id: 3, name: "Alice" })
console.log(newUserMeta) // New meta object with id and name from rawObject
```

***

### MetaDisableSerialization()

```ts
function MetaDisableSerialization(metaObject: object): void;
```

Defined in: [src/metaobjects/meta.ts:589](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L589)

Disables serialization for the specified meta object.

This function deactivates serialization and deserialization functionalities for a meta object.
By disabling serialization, you prevent the automatic conversion of complex objects into simpler formats suitable for storage or transmission,
and vice versa, based on the meta types defined for the object's properties.
Disabling serialization can be useful in scenarios where you need to temporarily bypass serialization rules,
such as during certain data processing operations or when working with data that should not be altered.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object for which to disable serialization.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Example

```ts
const metaObject = Meta({ id: NUMBER({ coercion: true, default: 0 }) })

// Initially, serialization is enabled
console.log(Meta.serializationIsActive(metaObject)) // true

Meta.disableSerialization(metaObject)

console.log(Meta.serializationIsActive(metaObject)) // false

// Now, assigning or retrieving values won't trigger deserialization
metaObject.id = '123' // No deserialization occurs and it will throw an validation error
```

***

### MetaDisableValidation()

```ts
function MetaDisableValidation(metaObject: object): void;
```

Defined in: [src/metaobjects/meta.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L482)

Disables validation for the specified meta object.

This function deactivates validation for a meta object,
turning off runtime type checking and constraint validation based on the meta types defined for the object's properties.
Disabling validation can be useful in scenarios where you need to temporarily bypass validation rules, such as during data migration,
testing, or when working with partially complete data models.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object for which to disable validation.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Example

```ts
const metaObject = Meta({ id: 0 })

// Initially, validation is enabled
console.log(Meta.validationIsActive(metaObject)) // true

Meta.disableValidation(metaObject)

console.log(Meta.validationIsActive(metaObject)) // false

// Now, assigning invalid values won't throw validation errors
metaObject.id = 'not a number' // No validation error
```

***

### MetaEnableSerialization()

```ts
function MetaEnableSerialization(metaObject: object): void;
```

Defined in: [src/metaobjects/meta.ts:625](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L625)

Enables serialization for the specified meta object.

This function activates serialization and deserialization functionalities for a meta object.
Use this function to re-enable serialization for meta objects, especially after temporarily disabling serialization
for certain operations or during specific phases of your application's lifecycle.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object for which to enable serialization.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Example

```ts
const metaObject = Meta({ id: NUMBER({ coercion: true, default: 0 }) })

// Initially, serialization might be disabled
Meta.disableSerialization(metaObject)

console.log(Meta.serializationIsActive(metaObject)) // false

Meta.enableSerialization(metaObject)

console.log(Meta.serializationIsActive(metaObject)) // true

// Now, assigning and retrieving values will trigger serialization and deserialization
metaObject.id = '123' // Deserialization occurs, converting '123' to number
```

***

### MetaEnableValidation()

```ts
function MetaEnableValidation(metaObject: object): void;
```

Defined in: [src/metaobjects/meta.ts:518](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L518)

Enables validation for the specified meta object.

This function activates validation for a meta object, enabling runtime type checking and
constraint validation based on the meta types defined for the object's properties.
Use this function to re-enable validation for meta objects, especially after temporarily disabling validation
for certain operations or during specific phases of your application's lifecycle.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object for which to enable validation.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Example

```ts
const metaObject = Meta({ id: 0 })

// Initially, validation might be disabled
Meta.disableValidation(metaObject)

console.log(Meta.validationIsActive(metaObject)) // false

// Enabling validation
Meta.enableValidation(metaObject)

console.log(Meta.validationIsActive(metaObject)) // true
```

***

### MetaFromJson()

```ts
function MetaFromJson<T>(
   metaObjectOrProto: T, 
   text: string, 
   deserializeArgs?: DeSerializeMetaObjectArgsType, 
   jsonParseArgs?: {
  reviver?: (this: any, key: string, value: any) => any;
}): Meta<T>;
```

Defined in: [src/metaobjects/meta.ts:952](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L952)

Deserializes a JSON string into a meta object.
This function parses a JSON string into a plain object and then deserializes it into a meta object
based on the provided plain object as schema or an existing meta object.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
<td>

The type of the meta object or prototype.

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObjectOrProto`

</td>
<td>

`T`

</td>
<td>

The meta object or plain object as schema to use for deserialization.

</td>
</tr>
<tr>
<td>

`text`

</td>
<td>

`string`

</td>
<td>

The JSON string to deserialize.

</td>
</tr>
<tr>
<td>

`deserializeArgs?`

</td>
<td>

[`DeSerializeMetaObjectArgsType`](#deserializemetaobjectargstype)

</td>
<td>

arguments to customize the deserialization behavior.

</td>
</tr>
<tr>
<td>

`jsonParseArgs?`

</td>
<td>

\{ `reviver?`: (`this`: `any`, `key`: `string`, `value`: `any`) => `any`; \}

</td>
<td>

arguments like in JSON.parse (`reviver` only)

</td>
</tr>
<tr>
<td>

`jsonParseArgs.reviver?`

</td>
<td>

(`this`: `any`, `key`: `string`, `value`: `any`) => `any`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

[`Meta`](#meta)\<`T`\>

A meta object deserialized from the JSON string.

#### Example

```ts
const userSchema = {
  id: NUMBER(),
  name: STRING(),
  isActive: BOOLEAN({ default: true })
}

const userJson = '{"id": 1, "name": "John Doe", "isActive": false}'

// Deserializing the JSON string into a meta object
const user = Meta.fromJson(userSchema, userJson)

console.log(user)
// Output: Meta object with properties { id: 1, name: 'John Doe', isActive: false }
```

***

### MetaGetMetaArgs()

```ts
function MetaGetMetaArgs(metaObject: object): MetaArgsType | null;
```

Defined in: [src/metaobjects/meta.ts:1094](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L1094)

Retrieves the meta arguments used to configure a meta object.
This function extracts the configuration arguments (`MetaArgsType`) that were used to create or configure the provided meta object.
These arguments include settings related to validation, serialization,
property ignoring, and more, which define the behavior and capabilities of the meta object.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object from which to retrieve the meta arguments.

</td>
</tr>
</tbody>
</table>

#### Returns

[`MetaArgsType`](#metaargstype) \| `null`

The `MetaArgsType` used to configure the meta object, or `null` if the object is not a meta object or if no meta arguments were used.

#### Example

```ts
const user = Meta({
  id: NUMBER(),
  name: STRING(),
}, {
  name: "UserMetaObject",
  metaTypesArgs: { optional: true }
})

Meta.disableValidation(user)

// Retrieving the meta arguments of the meta object
const metaArgs = Meta.getMetaArgs(user)

console.log(metaArgs)
// Output:
// {
//   name: 'UserMetaObject',
//   metaTypesArgs: { optional: true },
//   validationIsActive: false
// }
```

***

### MetaIsIgnoredProp()

```ts
function MetaIsIgnoredProp(metaObject: object, propName: string | symbol): boolean;
```

Defined in: [src/metaobjects/meta.ts:409](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L409)

Checks if propName is ignored.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The object to check.

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
<td>

The property to check.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

`true` if the property is is ignored, otherwise `false`.

#### Example

```ts
const metaObject = Meta({ a: 1 }, { ignoreProps: ['a'] })

console.log(Meta.isIgnoredProp(metaObject, 'a')) // true
console.log(Meta.isIgnoredProp(metaObject, 'prototype')) // true, because built-in
```

***

### MetaProto()

```ts
function MetaProto<T>(metaObject: T): Required<T> extends Required<Meta<U>> ? U : T | null;
```

Defined in: [src/metaobjects/meta.ts:859](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L859)

Retrieves the prototype (original object) used to create a meta object.
This function is particularly useful when you need to access the original structure or data of a meta object.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
<td>

The type of the meta object.

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`T`

</td>
<td>

The meta object whose prototype you want to retrieve.

</td>
</tr>
</tbody>
</table>

#### Returns

`Required`\<`T`\> *extends* `Required`\<[`Meta`](#meta)\<`U`\>\> ? `U` : `T` \| `null`

The prototype of the meta object if available, otherwise `null`.

#### Example

```ts
const originalObject = {
  id: 1,
  name: 'John Doe',
  isActive: BOOLEAN({ default: true })
}

const metaObject = Meta(originalObject)

// Retrieving the prototype of the meta object
const protoObj = Meta.proto(metaObject)

console.log(protoObj === originalObject) // true
```

***

### MetaRebuild()

```ts
function MetaRebuild<T>(metaObject: T, metaArgs?: MetaArgsType): Required<T> extends Required<{
  [IsMetaObjectSymbol]?: true;
}> ? T : Meta<T> | null;
```

Defined in: [src/metaobjects/meta.ts:900](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L900)

Rebuilds a meta object using the same original object and arguments that were used to create the meta object. 
This function is useful for creating a new instance of a meta object with its initial state and configuration, 
effectively "resetting" it to its original form.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
<td>

The type of the original meta object.

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`T`

</td>
<td>

The original meta object to rebuild.

</td>
</tr>
<tr>
<td>

`metaArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

additional or overriding meta arguments to apply during the rebuild process.

</td>
</tr>
</tbody>
</table>

#### Returns

`Required`\<`T`\> *extends* `Required`\<\{
  `[IsMetaObjectSymbol]?`: `true`;
\}\> ? `T` : [`Meta`](#meta)\<`T`\> \| `null`

A new meta object, or `null` if the input is not a valid meta object.

#### Example

```ts
const originalMetaObject = Meta({
  id: NUMBER({ default: 1 }),
  name: STRING({ default: 'John Doe' })
})

// Modifying the original meta object
originalMetaObject.id = 2
originalMetaObject.name = 'Jane Doe'

// Rebuilding the meta object to reset it to its original configuration
const rebuiltMetaObject = Meta.rebuild(originalMetaObject)

console.log(rebuiltMetaObject.id) // 1
console.log(rebuiltMetaObject.name) // 'John Doe'
```

***

### MetaRepresent()

```ts
function MetaRepresent(metaObject: object): string | null;
```

Defined in: [src/metaobjects/meta.ts:1046](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L1046)

Generates a textual representation of a meta object.
This function checks if the provided object is a meta object and,
if so, retrieves a textual representation of its structure and current state.
This can be particularly useful for debugging purposes, logging,
or simply understanding the current configuration and values of a meta object at runtime.

If the provided argument is not a meta object, the function returns `null`, indicating that no representation can be made.

`metaObject.toString` has the same behavior by default

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object to represent textually.

</td>
</tr>
</tbody>
</table>

#### Returns

`string` \| `null`

A string representing the meta object's structure and current state if it is a meta object, otherwise `null`.

#### Example

```ts
const metaObject = Meta({ id: 0 })

// Generating a textual representation of the meta object
const representation = Meta.represent(metaObject)

console.log(representation)
// Output: [<meta> object] { id: NUMBER = 0 }
```

***

### MetaSerializationIsActive()

```ts
function MetaSerializationIsActive(metaObject: object): boolean;
```

Defined in: [src/metaobjects/meta.ts:552](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L552)

Checks if serialization is active for the given meta object.

This function determines whether serialization and deserialization functionalities are currently enabled for the specified meta object.
This function is useful for dynamically checking the serialization state of meta objects,
especially when working with data that needs to be serialized for storage or network transmission,
or when needing to temporarily disable serialization for certain operations.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object to check for active serialization.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

`true` if serialization is active for the meta object, otherwise `false`.

#### Example

```ts
const metaObject = Meta({ id: 0 })

// Assuming serialization is enabled by default or explicitly
console.log(Meta.serializationIsActive(metaObject)) // true

Meta.disableSerialization(metaObject)

console.log(Meta.serializationIsActive(metaObject)) // false
```

***

### MetaSerialize()

```ts
function MetaSerialize<ResultT, T>(metaObject: T | Meta<T>, serializeArgs?: SerializeMetaObjectArgsType): [ResultT] extends [never] ? { [key in string | number | symbol]: any } : ResultT;
```

Defined in: [src/metaobjects/meta.ts:716](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L716)

Serializes a meta object into a plain object.
This function is particularly useful when you need to convert a meta object back into a simple JavaScript object,
for instance, before sending it over a network or saving it to storage.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`ResultT` *extends* `object`

</td>
<td>

`never`

</td>
<td>

The expected result type of the serialized object.
If not specified, the result will have the same properties as the original meta object, but with `any` type .

</td>
</tr>
<tr>
<td>

`T` *extends* `object`

</td>
<td>

`object`

</td>
<td>

The type of the original meta object.

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`T` \| [`Meta`](#meta)\<`T`\>

</td>
<td>

The meta object or a plain object to serialize.
If a plain object is provided, it is first converted into a meta object using the provided `serializeArgs.metaArgs`.

</td>
</tr>
<tr>
<td>

`serializeArgs?`

</td>
<td>

[`SerializeMetaObjectArgsType`](#serializemetaobjectargstype)

</td>
<td>

arguments to customize the serialization behavior.

</td>
</tr>
</tbody>
</table>

#### Returns

\[`ResultT`\] *extends* \[`never`\] ? \{ \[key in string \| number \| symbol\]: any \} : `ResultT`

A new plain object with properties and values serialized from the meta object.

#### Example

```ts
const user = Meta({
  id: NUMBER(),
  name: STRING(),
  registrationDate: DATE({ coercion: true })
}, {
  metaTypesArgs: { optional: true }
})

user.id = 1
user.name = 'John Doe'
user.registrationDate = new Date("2024-01-01")

// Serializing the meta object to a plain object
const serializedUser = Meta.serialize(user)

console.log(serializedUser)
// Output might be:
// {
//   id: 1,
//   name: 'John Doe',
//   registrationDate: 1704067200000  // Date -> date.getTime()
// }
```

***

### MetaToJson()

```ts
function MetaToJson(
   metaObject: object, 
   serializeArgs?: SerializeMetaObjectArgsType, 
   jsonStringifyArgs?: {
  replacer?:   | (this: any, key: string, value: any) => any
     | (string | number)[];
  space?: string | number;
}): string;
```

Defined in: [src/metaobjects/meta.ts:1003](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L1003)

Serializes a meta object into a JSON string.
This function first converts a meta object into a plain object using the `Meta.serialize` method,
and then serializes that plain object into a JSON string using `JSON.stringify`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object or a plain object to serialize.
If a plain object is provided, it is first converted into a meta object using the provided `serializeArgs.metaArgs`.

</td>
</tr>
<tr>
<td>

`serializeArgs?`

</td>
<td>

[`SerializeMetaObjectArgsType`](#serializemetaobjectargstype)

</td>
<td>

arguments to customize the serialization behavior.

</td>
</tr>
<tr>
<td>

`jsonStringifyArgs?`

</td>
<td>

\{ `replacer?`: \| (`this`: `any`, `key`: `string`, `value`: `any`) => `any` \| (`string` \| `number`)[]; `space?`: `string` \| `number`; \}

</td>
<td>

arguments like in `JSON.stringify` (`replacer` and `space`)

</td>
</tr>
<tr>
<td>

`jsonStringifyArgs.replacer?`

</td>
<td>

 \| (`this`: `any`, `key`: `string`, `value`: `any`) => `any` \| (`string` \| `number`)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`jsonStringifyArgs.space?`

</td>
<td>

`string` \| `number`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

A JSON string representation of the meta object.

#### Example

```ts
const user = Meta({
  id: NUMBER({ optional: true }),
  name: STRING({ optional: true }),
  registrationDate: DATE({ coercion: true, optional: true })
})

user.id = 1
user.name = 'John Doe'
user.registrationDate = new Date("2024-01-01")

// Serializing the meta object to a JSON string
const userJson = Meta.toJson(user, {}, { space: 2 })

console.log(userJson)
// Output might be:
// {
//   "id": 1,
//   "name": 'John Doe',
//   "registrationDate": 1704067200000
// }
```

***

### MetaType()

Creates a runtime meta type wrapper from either an existing implementation instance
or an implementation class. The resulting object holds the resolved implementation
and exposes validation/serialization helpers.

#### Remarks

The `MetaType` factory also provides several helper utilities:
- `MetaType.inspect(metaType)` - [MetaTypeInspect](#metatypeinspect) - Pretty-prints using the implementation stringifier.
- `MetaType.toString(metaType)` - [MetaTypeToString](#metatypetostring) - Returns the implementation string representation.
- `MetaType.validate(metaType, value, args)` - [MetaTypeValidate](#metatypevalidate) - Validates a value using the backing implementation.
- `MetaType.serialize(metaType, value)` - [MetaTypeSerialize](#metatypeserialize) - Serializes a value through the meta type serializers.
- `MetaType.deserialize(metaType, value)` - [MetaTypeDeserialize](#metatypedeserialize) - Deserializes a raw value through the meta type serializers.
- `MetaType.isMetaType(obj)` - [MetaTypeIsMetaType](#metatypeismetatype) - Checks whether a value is a runtime meta type wrapper.
- `MetaType.getMetaTypeImpl(metaType)` - [MetaTypeGetMetaTypeImpl](#metatypegetmetatypeimpl) - Retrieves the bound implementation instance.

#### Call Signature

```ts
function MetaType<T, IsNullishT, IsNullableT, IsOptionalT>(metaTypeImpl: MetaTypeImpl, metaTypeArgs?: 
  | MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>
| (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<T, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/metatype.ts:40](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L40)

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

[`MetaType`](#metatype)\<`unknown`, [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeImpl`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`T`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)\<`T`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`T`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Call Signature

```ts
function MetaType<T, IsNullishT, IsNullableT, IsOptionalT>(metaTypeImplCls: StaticClass<typeof MetaTypeImpl>, metaTypeArgs?: 
  | MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>
| (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<T, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/metatype.ts:54](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L54)

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

[`MetaType`](#metatype)\<`unknown`, [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeImplCls`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`T`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)\<`T`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`T`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

***

### MetaTypeDeserialize()

```ts
function MetaTypeDeserialize(this: MetaType<unknown>, value: any): any;
```

Defined in: [src/metatypes/metatype.ts:173](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L173)

Deserializes a raw value (used when writing/deserialize operations).

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`MetaType`](#metatype)\<`unknown`\>

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### MetaTypeGetMetaTypeImpl()

```ts
function MetaTypeGetMetaTypeImpl<T>(obj: T | null | undefined): T extends MetaType<unknown, Impl> ? Impl extends MetaTypeImpl ? Impl<Impl> : MetaTypeImpl : MetaTypeImpl;
```

Defined in: [src/metatypes/metatype.ts:193](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L193)

Retrieves the implementation instance bound to a runtime meta type wrapper.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaType`](#metatype)\<`unknown`, [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`T` \| `null` \| `undefined`

</td>
</tr>
</tbody>
</table>

#### Returns

`T` *extends* [`MetaType`](#metatype)\<`unknown`, `Impl`\> ? `Impl` *extends* [`MetaTypeImpl`](#metatypeimpl) ? `Impl`\<`Impl`\> : [`MetaTypeImpl`](#metatypeimpl) : [`MetaTypeImpl`](#metatypeimpl)

The implementation if available, otherwise the base `MetaTypeImpl`.

***

### MetaTypeInspect()

```ts
function MetaTypeInspect(this: MetaType<unknown>): string;
```

Defined in: [src/metatypes/metatype.ts:124](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L124)

Pretty-print meta types using the underlying implementation stringifier.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`MetaType`](#metatype)\<`unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

***

### MetaTypeIsMetaType()

```ts
function MetaTypeIsMetaType(obj: any): boolean;
```

Defined in: [src/metatypes/metatype.ts:182](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L182)

Type guard to check whether a value is a runtime meta type wrapper.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### MetaTypeSerialize()

```ts
function MetaTypeSerialize(this: MetaType<unknown>, value: any): any;
```

Defined in: [src/metatypes/metatype.ts:162](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L162)

Serializes a value using the meta type's serializers (used when reading/serializing objects).

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`MetaType`](#metatype)\<`unknown`\>

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### MetaTypeToString()

```ts
function MetaTypeToString(this: MetaType<unknown>): string;
```

Defined in: [src/metatypes/metatype.ts:131](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L131)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`MetaType`](#metatype)\<`unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

***

### MetaTypeValidate()

```ts
function MetaTypeValidate(
   this: MetaType<unknown>, 
   value: any, 
   args?: {
  stopAtFirstError?: boolean;
}): ValidationError | undefined;
```

Defined in: [src/metatypes/metatype.ts:143](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L143)

Validates a value using the underlying `MetaTypeImpl`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`MetaType`](#metatype)\<`unknown`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

Value to validate.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

\{ `stopAtFirstError?`: `boolean`; \}

</td>
<td>

Optional validation options (currently only `stopAtFirstError`).

</td>
</tr>
<tr>
<td>

`args.stopAtFirstError?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

[`ValidationError`](#validationerror) \| `undefined`

***

### MetaValidationIsActive()

```ts
function MetaValidationIsActive(metaObject: object): boolean;
```

Defined in: [src/metaobjects/meta.ts:446](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L446)

Checks if validation is active for the given meta object.

This function determines whether validation is currently enabled for the specified meta object.
Validation is a key feature of meta objects,
allowing for runtime type checking and constraint validation based on the meta types defined for the object's properties.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`object`

</td>
<td>

The meta object to check for active validation.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

`true` if validation is active for the meta object, otherwise `false`.

#### Example

```ts
const metaObject = Meta({ id: 0 })

// Assuming validation is enabled by default or explicitly
console.log(Meta.validationIsActive(metaObject)) // true

Meta.disableValidation(metaObject)

console.log(Meta.validationIsActive(metaObject)) // false
```

***

### MinLengthValidatorBuilder()

```ts
function MinLengthValidatorBuilder(length: number): {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/lengthValidators.ts:16](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L16)

Creates a validator ensuring value length is at least `length`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'MinLength'`

</td>
<td>

[src/validators/lengthValidators.ts:17](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L17)

</td>
</tr>
<tr>
<td>

`validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/lengthValidators.ts:18](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L18)

</td>
</tr>
</tbody>
</table>

***

### MinValidatorBuilder()

```ts
function MinValidatorBuilder(min: any): {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/minMaxValidators.ts:4](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L4)

Creates a validator enforcing `value >= min`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`min`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'Min'`

</td>
<td>

[src/validators/minMaxValidators.ts:5](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L5)

</td>
</tr>
<tr>
<td>

`validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/minMaxValidators.ts:6](https://github.com/metatyper/metatyper/blob/main/src/validators/minMaxValidators.ts#L6)

</td>
</tr>
</tbody>
</table>

***

### NUMBER()

```ts
function NUMBER<IsNullishT, IsNullableT, IsOptionalT>(args?: NumbersMetaTypeArgs<NUMBER, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<NUMBER, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/number.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/number.ts#L107)

Creates a number meta type (double precision) with optional range constraints.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args?`

</td>
<td>

[`NumbersMetaTypeArgs`](#numbersmetatypeargs)\<[`NUMBER`](#number), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[NumbersMetaTypeArgs](#numbersmetatypeargs) controlling min/max/greater/less and defaults.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`NUMBER`](#number), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj = Meta({ score: NUMBER({ min: 0 }) })
obj.score = 1.2
obj.score = 'str' // validation error
```

***

### OBJECT()

#### Call Signature

```ts
function OBJECT<T, RequiredKeysArrayT, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, PreparedT, ResultT, RArgT>(subType: T, args?: ObjectMetaTypeArgs<RArgT, [...RequiredKeysArrayT[]], IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/object.ts:274](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L274)

Creates an object meta type. Accepts either a per-field schema or a single meta type applied to
every property (record mode).

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`ObjectFlag`](#objectflag)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`RequiredKeysArrayT` *extends* `string`[]

</td>
<td>

`never`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

`T` *extends* `Record`\<`string` \| `number` \| `symbol`, `never`\> ? `any` : `T` *extends* [`MetaTypeImpl`](#metatypeimpl) ? `unknown` : `T`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`OBJECT`](#object)\<\[`RequiredKeysArrayT`\] *extends* \[`never`\] ? `IsFrozenT` *extends* `true` ? `Readonly`\<`Record`\<`string`, `PreparedT`\>\> : `Record`\<`string`, `PreparedT`\> : `IsFrozenT` *extends* `true` ? `{ readonly [k in string]: PreparedT }` & `Readonly`\<`Record`\<`string`, `PreparedT`\>\> : `{ [k in string]: PreparedT }` & `Record`\<`string`, `PreparedT`\>\>

</td>
</tr>
<tr>
<td>

`RArgT`

</td>
<td>

`ResultT`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

`T`

</td>
<td>

Schema object, meta type, or factory describing the object structure.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ObjectMetaTypeArgs`](#objectmetatypeargs)\<`RArgT`, \[`...RequiredKeysArrayT[]`\], `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ObjectMetaTypeArgs](#objectmetatypeargs) controlling required keys, freezing, etc.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj1 = Meta({
    a: OBJECT(
        {
            a1: 1,
            a2: 'string',
            a3: [BOOLEAN()]
        },
        { nullish: true }
    )
}) // as { a: { a1: number, a2: string, a3: boolean[] } | null | undefined }

obj1.a = { a1: 1, a2: 'str', a3: [true, false] }
obj1.a = { a1: 1, a2: 'str', a3: [true, false, 1] } // type & validation error

const obj2 = Meta({
    c: OBJECT(BOOLEAN(), { nullish: true })
}) // as { c: Record<string, boolean> | null | undefined }

obj2.c = { _someKey: true }
obj2.c = { _someKey: 10 } // type & validation error
```

#### Call Signature

```ts
function OBJECT<T, RequiredKeysArrayT, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, PreparedT, ResultT, RArgT>(subType: (metaTypeImpl: ObjectImpl) => T, args?: ObjectMetaTypeArgs<RArgT, [...RequiredKeysArrayT[]], IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/object.ts:306](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L306)

Creates an object meta type. Accepts either a per-field schema or a single meta type applied to
every property (record mode).

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`ObjectFlag`](#objectflag)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`RequiredKeysArrayT` *extends* `string`[]

</td>
<td>

`never`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

`T` *extends* `Record`\<`string` \| `number` \| `symbol`, `never`\> ? `any` : `T` *extends* [`MetaTypeImpl`](#metatypeimpl) ? `unknown` : `T`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`OBJECT`](#object)\<\[`RequiredKeysArrayT`\] *extends* \[`never`\] ? `IsFrozenT` *extends* `true` ? `Readonly`\<`Record`\<`string`, `PreparedT`\>\> : `Record`\<`string`, `PreparedT`\> : `IsFrozenT` *extends* `true` ? `{ readonly [k in string]: PreparedT }` & `Readonly`\<`Record`\<`string`, `PreparedT`\>\> : `{ [k in string]: PreparedT }` & `Record`\<`string`, `PreparedT`\>\>

</td>
</tr>
<tr>
<td>

`RArgT`

</td>
<td>

`ResultT`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

(`metaTypeImpl`: [`ObjectImpl`](#objectimpl)) => `T`

</td>
<td>

Schema object, meta type, or factory describing the object structure.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ObjectMetaTypeArgs`](#objectmetatypeargs)\<`RArgT`, \[`...RequiredKeysArrayT[]`\], `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ObjectMetaTypeArgs](#objectmetatypeargs) controlling required keys, freezing, etc.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj1 = Meta({
    a: OBJECT(
        {
            a1: 1,
            a2: 'string',
            a3: [BOOLEAN()]
        },
        { nullish: true }
    )
}) // as { a: { a1: number, a2: string, a3: boolean[] } | null | undefined }

obj1.a = { a1: 1, a2: 'str', a3: [true, false] }
obj1.a = { a1: 1, a2: 'str', a3: [true, false, 1] } // type & validation error

const obj2 = Meta({
    c: OBJECT(BOOLEAN(), { nullish: true })
}) // as { c: Record<string, boolean> | null | undefined }

obj2.c = { _someKey: true }
obj2.c = { _someKey: 10 } // type & validation error
```

#### Call Signature

```ts
function OBJECT<T, RequiredKeysArrayT, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, ResultT, RArgT>(subType: 
  | MetaTypeImpl
| (metaTypeImpl: ObjectImpl) => MetaTypeImpl, args?: ObjectMetaTypeArgs<RArgT, [...RequiredKeysArrayT[]], IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/object.ts:338](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L338)

Creates an object meta type. Accepts either a per-field schema or a single meta type applied to
every property (record mode).

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`RequiredKeysArrayT` *extends* `string`[]

</td>
<td>

`never`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`OBJECT`](#object)\<\[`RequiredKeysArrayT`\] *extends* \[`never`\] ? `IsFrozenT` *extends* `true` ? `Readonly`\<`Record`\<`string`, `T`\>\> : `Record`\<`string`, `T`\> : `IsFrozenT` *extends* `true` ? `{ readonly [k in string]: T }` & `Readonly`\<`Record`\<`string`, `T`\>\> : `{ [k in string]: T }` & `Record`\<`string`, `T`\>\>

</td>
</tr>
<tr>
<td>

`RArgT`

</td>
<td>

`ResultT`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

 \| [`MetaTypeImpl`](#metatypeimpl) \| (`metaTypeImpl`: [`ObjectImpl`](#objectimpl)) => [`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

Schema object, meta type, or factory describing the object structure.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ObjectMetaTypeArgs`](#objectmetatypeargs)\<`RArgT`, \[`...RequiredKeysArrayT[]`\], `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ObjectMetaTypeArgs](#objectmetatypeargs) controlling required keys, freezing, etc.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj1 = Meta({
    a: OBJECT(
        {
            a1: 1,
            a2: 'string',
            a3: [BOOLEAN()]
        },
        { nullish: true }
    )
}) // as { a: { a1: number, a2: string, a3: boolean[] } | null | undefined }

obj1.a = { a1: 1, a2: 'str', a3: [true, false] }
obj1.a = { a1: 1, a2: 'str', a3: [true, false, 1] } // type & validation error

const obj2 = Meta({
    c: OBJECT(BOOLEAN(), { nullish: true })
}) // as { c: Record<string, boolean> | null | undefined }

obj2.c = { _someKey: true }
obj2.c = { _someKey: 10 } // type & validation error
```

#### Call Signature

```ts
function OBJECT<T, RequiredKeysArrayT, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, PreparedT, ResultT, RArgT>(subType: T | (metaTypeImpl: ObjectImpl) => T, args?: ObjectMetaTypeArgs<RArgT, [...RequiredKeysArrayT[]], IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/object.ts:367](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L367)

Creates an object meta type. Accepts either a per-field schema or a single meta type applied to
every property (record mode).

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeFlag`](#metatypeflag) \| `null` \| `undefined`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`RequiredKeysArrayT` *extends* `string`[]

</td>
<td>

`never`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

`T` *extends* `Record`\<`string` \| `number` \| `symbol`, `never`\> ? `any` : `T` *extends* [`MetaTypeImpl`](#metatypeimpl) ? `unknown` : `T`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`OBJECT`](#object)\<\[`RequiredKeysArrayT`\] *extends* \[`never`\] ? `IsFrozenT` *extends* `true` ? `Readonly`\<`Record`\<`string`, `PreparedT`\>\> : `Record`\<`string`, `PreparedT`\> : `IsFrozenT` *extends* `true` ? `{ readonly [k in string]: PreparedT }` & `Readonly`\<`Record`\<`string`, `PreparedT`\>\> : `{ [k in string]: PreparedT }` & `Record`\<`string`, `PreparedT`\>\>

</td>
</tr>
<tr>
<td>

`RArgT`

</td>
<td>

`ResultT`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

`T` \| (`metaTypeImpl`: [`ObjectImpl`](#objectimpl)) => `T`

</td>
<td>

Schema object, meta type, or factory describing the object structure.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ObjectMetaTypeArgs`](#objectmetatypeargs)\<`RArgT`, \[`...RequiredKeysArrayT[]`\], `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ObjectMetaTypeArgs](#objectmetatypeargs) controlling required keys, freezing, etc.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj1 = Meta({
    a: OBJECT(
        {
            a1: 1,
            a2: 'string',
            a3: [BOOLEAN()]
        },
        { nullish: true }
    )
}) // as { a: { a1: number, a2: string, a3: boolean[] } | null | undefined }

obj1.a = { a1: 1, a2: 'str', a3: [true, false] }
obj1.a = { a1: 1, a2: 'str', a3: [true, false, 1] } // type & validation error

const obj2 = Meta({
    c: OBJECT(BOOLEAN(), { nullish: true })
}) // as { c: Record<string, boolean> | null | undefined }

obj2.c = { _someKey: true }
obj2.c = { _someKey: 10 } // type & validation error
```

#### Call Signature

```ts
function OBJECT<T, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, KeysT, RequiredKeysT, OptionalKeysT, ResultObjectT, ResultT, RArgT>(subType?: T | (metaTypeImpl: ObjectImpl) => T, args?: ObjectMetaTypeArgs<RArgT, T extends any[] ? never[] : RequiredKeysT[], IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/object.ts:399](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L399)

Creates an object meta type. Accepts either a per-field schema or a single meta type applied to
every property (record mode).

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `Record`\<`string` \| `number` \| `symbol`, `any`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`KeysT` *extends* `string` \| `number` \| `symbol`

</td>
<td>

\{ \[K in string \| number \| symbol\]: K extends string ? K\<K\> : never \}\[keyof `T`\]

</td>
</tr>
<tr>
<td>

`RequiredKeysT` *extends* `string` \| `number` \| `symbol`

</td>
<td>

`KeysT`

</td>
</tr>
<tr>
<td>

`OptionalKeysT` *extends* `string` \| `number` \| `symbol`

</td>
<td>

\{ \[K in string \| number \| symbol\]: K extends RequiredKeysT ? never : K \}\[`KeysT`\]

</td>
</tr>
<tr>
<td>

`ResultObjectT`

</td>
<td>

\[`RequiredKeysT`\] *extends* \[`never`\] ? `unknown` : \{ \[k in string \| number \| symbol\]-?: T\[k\] extends MetaTypeImpl ? unknown : T\[k\] \} & \[`OptionalKeysT`\] *extends* \[`never`\] ? `unknown` : \{ \[k in string \| number \| symbol\]?: T\[k\] extends MetaTypeImpl ? unknown : T\[k\] \}

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

[`OBJECT`](#object)\<`T` *extends* `any`[] ? `IsFrozenT` *extends* `true` ? \{ readonly \[k in string \| number \| symbol\]: T\<T\>\[k\] extends MetaTypeImpl ? unknown : T\<T\>\[k\] \} : \{ \[k in string \| number \| symbol\]: T\<T\>\[k\] extends MetaTypeImpl ? unknown : T\<T\>\[k\] \} : `IsFrozenT` *extends* `true` ? \{ readonly \[key in string \| number \| symbol\]: ResultObjectT\[key\] \} : \{ \[key in string \| number \| symbol\]: ResultObjectT\[key\] \}\>

</td>
</tr>
<tr>
<td>

`RArgT`

</td>
<td>

`ResultT`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType?`

</td>
<td>

`T` \| (`metaTypeImpl`: [`ObjectImpl`](#objectimpl)) => `T`

</td>
<td>

Schema object, meta type, or factory describing the object structure.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`ObjectMetaTypeArgs`](#objectmetatypeargs)\<`RArgT`, `T` *extends* `any`[] ? `never`[] : `RequiredKeysT`[], `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[ObjectMetaTypeArgs](#objectmetatypeargs) controlling required keys, freezing, etc.

</td>
</tr>
</tbody>
</table>

##### Returns

[`PrepareMetaType`](#preparemetatype)\<`ResultT`, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

##### Example

```ts
const obj1 = Meta({
    a: OBJECT(
        {
            a1: 1,
            a2: 'string',
            a3: [BOOLEAN()]
        },
        { nullish: true }
    )
}) // as { a: { a1: number, a2: string, a3: boolean[] } | null | undefined }

obj1.a = { a1: 1, a2: 'str', a3: [true, false] }
obj1.a = { a1: 1, a2: 'str', a3: [true, false, 1] } // type & validation error

const obj2 = Meta({
    c: OBJECT(BOOLEAN(), { nullish: true })
}) // as { c: Record<string, boolean> | null | undefined }

obj2.c = { _someKey: true }
obj2.c = { _someKey: 10 } // type & validation error
```

***

### RegExpValidatorBuilder()

```ts
function RegExpValidatorBuilder(regexp: string | RegExp): {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/regexpValidator.ts:4](https://github.com/metatyper/metatyper/blob/main/src/validators/regexpValidator.ts#L4)

Creates a validator ensuring string values match the provided regexp.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`regexp`

</td>
<td>

`string` \| `RegExp`

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'RegExp'`

</td>
<td>

[src/validators/regexpValidator.ts:5](https://github.com/metatyper/metatyper/blob/main/src/validators/regexpValidator.ts#L5)

</td>
</tr>
<tr>
<td>

`validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/regexpValidator.ts:6](https://github.com/metatyper/metatyper/blob/main/src/validators/regexpValidator.ts#L6)

</td>
</tr>
</tbody>
</table>

***

### ReplaceValuesDeSerializerBuilder()

```ts
function ReplaceValuesDeSerializerBuilder(fromValues: any[], toValue: any): {
  deserialize: (args: DeSerializerArgsType) => any;
  name: string;
};
```

Defined in: [src/serializers/replaceValues.ts:25](https://github.com/metatyper/metatyper/blob/main/src/serializers/replaceValues.ts#L25)

Creates a deserializer that replaces specific values/functions with a single target value.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fromValues`

</td>
<td>

`any`[]

</td>
<td>

List of literal values or predicate functions to match.

</td>
</tr>
<tr>
<td>

`toValue`

</td>
<td>

`any`

</td>
<td>

Replacement value.

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
{
  deserialize: (args: DeSerializerArgsType) => any;
  name: string;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserialize()`

</td>
<td>

(`args`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/replaceValues.ts:27](https://github.com/metatyper/metatyper/blob/main/src/serializers/replaceValues.ts#L27)

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'ReplaceValuesDeSerializer'`

</td>
<td>

[src/serializers/replaceValues.ts:26](https://github.com/metatyper/metatyper/blob/main/src/serializers/replaceValues.ts#L26)

</td>
</tr>
</tbody>
</table>

***

### STRING()

```ts
function STRING<IsNullishT, IsNullableT, IsOptionalT>(args?: StringMetaTypeArgs<STRING, IsNullishT, IsNullableT, IsOptionalT>): PrepareMetaType<STRING, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/string.ts:110](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L110)

Creates a string meta type with length/regexp/casing options plus standard meta args.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args?`

</td>
<td>

[`StringMetaTypeArgs`](#stringmetatypeargs)\<[`STRING`](#string), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[StringMetaTypeArgs](#stringmetatypeargs) controlling min/max length, regexp, casing, etc.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`STRING`](#string), `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj = Meta({ name: STRING({ minLength: 3 }) })
obj.name = 'John'
obj.name = 1 // validation error
obj.name = '' // validation error
```

***

### TUPLE()

```ts
function TUPLE<T, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT, PreparedT>(types: 
  | [...T[]]
| (metaTypeImpl: TupleImpl) => [...T[]], args?: TupleMetaTypeArgs<TUPLE<IsFrozenT extends true ? Readonly<PreparedT> : PreparedT>, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT>): PrepareMetaType<TUPLE<IsFrozenT extends true ? Readonly<PreparedT> : PreparedT>, IsNullishT, IsNullableT, IsOptionalT>;
```

Defined in: [src/metatypes/types/tuple.ts:132](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L132)

Creates a tuple meta type with a fixed list of item schemas.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `any`[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

\{ \[k in string \| number \| symbol\]: T\[k\<k\>\] extends MetaTypeImpl ? unknown : T\[k\<k\>\] \}

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`types`

</td>
<td>

 \| \[`...T[]`\] \| (`metaTypeImpl`: [`TupleImpl`](#tupleimpl)) => \[`...T[]`\]

</td>
<td>

Array (or factory) describing each position in the tuple.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`TupleMetaTypeArgs`](#tuplemetatypeargs)\<[`TUPLE`](#tuple)\<`IsFrozenT` *extends* `true` ? `Readonly`\<`PreparedT`\> : `PreparedT`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`, `IsFrozenT`\>

</td>
<td>

[TupleMetaTypeArgs](#tuplemetatypeargs) controlling nullability, freezing, etc.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`TUPLE`](#tuple)\<`IsFrozenT` *extends* `true` ? `Readonly`\<`PreparedT`\> : `PreparedT`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
const obj1 = Meta({
     a: TUPLE([1, 'string', BOOLEAN({ nullish: true })], { nullish: true })
}) // as { a: [number, string, boolean | null | undefined] | null | undefined }

obj1.a = [1, 'str', true]
obj1.a = [1, true, 'str'] //  type & validation error
obj1.a = [1] //  type & validation error
```

***

### UNION()

```ts
function UNION<T, TArray, PreparedT, DefaultT, ResultT>(subType: TArray | () => TArray, args?: {
  coercion?: boolean;
  default?: DefaultT | null;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: any;
  nullish?: any;
  optional?: any;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
} & Record<string, any> & {
  serializeSubValues?: boolean;
}): ResultT;
```

Defined in: [src/metatypes/types/union.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/union.ts#L107)

Creates a union meta type that accepts any of the provided sub meta types/literals.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`TArray` *extends* `T`[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`PreparedT`

</td>
<td>

\{ \[k in string \| number \| symbol\]: TArray\[k\<k\>\] extends MetaTypeImpl ? unknown : TArray\[k\<k\>\] \}\[`any`\]

</td>
</tr>
<tr>
<td>

`DefaultT`

</td>
<td>

`PreparedT`

</td>
</tr>
<tr>
<td>

`ResultT`

</td>
<td>

`null` *extends* `PreparedT` ? `undefined` *extends* `PreparedT` ? `Exclude`\<`PreparedT`, `null` \| `undefined`\> \| `null` \| `undefined` : `Exclude`\<`PreparedT`, `null` \| `undefined`\> \| `null` : `undefined` *extends* `PreparedT` ? `Exclude`\<`PreparedT`, `null` \| `undefined`\> \| `undefined` : `PreparedT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

`TArray` \| () => `TArray`

</td>
<td>

Array (or factory) of sub types/meta types.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

\{ `coercion?`: `boolean`; `default?`: `DefaultT` \| `null`; `deserializers?`: ( \| [`DeSerializerType`](#deserializertype) \| [`DeSerializeFuncType`](#deserializefunctype))[]; `name?`: `string`; `noBuiltinDeSerializers?`: `boolean`; `noBuiltinSerializers?`: `boolean`; `noBuiltinValidators?`: `boolean`; `nullable?`: `any`; `nullish?`: `any`; `optional?`: `any`; `safe?`: `boolean`; `serializers?`: ( \| [`SerializerType`](#serializertype) \| [`SerializeFuncType`](#serializefunctype))[]; `subType?`: `any`; `validateType?`: `boolean`; `validators?`: ( \| [`ValidatorType`](#validatortype) \| [`ValidatorFuncType`](#validatorfunctype))[]; \} & `Record`\<`string`, `any`\> & \{ `serializeSubValues?`: `boolean`; \}

</td>
<td>

Standard [MetaTypeArgsType](#metatypeargstype) plus `serializeSubValues` toggle.

</td>
</tr>
</tbody>
</table>

#### Returns

`ResultT`

#### Example

```ts
const obj1 = Meta({
     a: UNION([1, 'string', BOOLEAN({ nullish: true })])
}) // as { a: number | string | boolean | null | undefined }

obj1.a = 1
obj1.a = 'str'
obj1.a = true
obj1.a = {} // type & validation error
```

***

### validateMeta()

```ts
function validateMeta(
   metaObjectOrProto: object, 
   rawObject: object, 
   validateArgs?: ValidateMetaObjectArgsType): ValidationError | undefined;
```

Defined in: [src/metaobjects/meta.ts:661](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L661)

Validates a plain object against a meta object schema or a meta object, ensuring it conforms to the defined types and constraints.
If the object is valid according to the meta object schema, the function returns undefined.
If the object is not valid, it returns `ValidationError`,

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObjectOrProto`

</td>
<td>

`object`

</td>
<td>

The meta object or plain object as a schema against which to validate the `rawObject`.

</td>
</tr>
<tr>
<td>

`rawObject`

</td>
<td>

`object`

</td>
<td>

The plain object to validate.

</td>
</tr>
<tr>
<td>

`validateArgs?`

</td>
<td>

[`ValidateMetaObjectArgsType`](#validatemetaobjectargstype)

</td>
<td>

arguments to customize the validation behavior, such as disabling throwing errors.

</td>
</tr>
</tbody>
</table>

#### Returns

[`ValidationError`](#validationerror) \| `undefined`

#### Example

```ts
const userSchema = {
  id: NUMBER(),
  name: STRING({ minLength: 3 })
}

const validUser = { id: 1, name: 'John Doe' }
const invalidUser = { id: 'not a number', name: 'JD' }

const error = Meta.validate(userSchema, validUser)
// error === undefined

const error = Meta.validate(userSchema, invalidUser)
// error instanceof ValidationError
```

## Type Aliases

### ANY

```ts
type ANY = MetaType<any, AnyImpl>;
```

Defined in: [src/metatypes/types/any.ts:23](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/any.ts#L23)

Creates a runtime meta type equivalent to TypeScript's `any`.

#### Param

Standard [MetaTypeArgsType](#metatypeargstype) options (defaults, optional, etc.).

#### Example

```ts
const obj = Meta({ field: ANY({ nullish: true }) }) // as { field: any }
obj.field = 1
obj.field = {}
```

***

### ARRAY

```ts
type ARRAY<T> = MetaType<T, ArrayImpl>;
```

Defined in: [src/metatypes/types/array.ts:217](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L217)

Creates an array meta type with optional item type, length limits, freezing, etc.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Param

Item schema (meta type, literal, array, or factory). Defaults to [ANY](#any).

#### Param

[ArrayMetaTypeArgs](#arraymetatypeargs) controlling length/default/nullability.

#### Example

```ts
const obj = Meta({
     tags: ARRAY(STRING()),
     keys: [1, 'string', BOOLEAN()]
}) // as { tags: string[], keys: (number | string | boolean)[] }
obj.tags = ['foo', 'bar']
obj.tags = [1] // validation error
obj.keys = ['mystring', 1, 2, 3]
obj.keys = ['mystring', 1, 2, 3 {}] // validation error
```

***

### ArrayMetaTypeArgs

```ts
type ArrayMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & 
  | {
  minLength?: never;
  notEmpty?: boolean;
}
  | {
  minLength?: number;
  notEmpty?: never;
} & {
  maxLength?: number;
} & {
  freeze?: IsFrozenT;
  serializeSubValues?: boolean;
};
```

Defined in: [src/metatypes/types/array.ts:22](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L22)

Options for [ARRAY](#array-1) meta type controlling length, immutability, etc.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`maxLength?`

</td>
<td>

`number`

</td>
<td>

Maximum allowed length.

</td>
<td>

[src/metatypes/types/array.ts:42](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L42)

</td>
</tr>
</tbody>
</table>

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`freeze?`

</td>
<td>

`IsFrozenT`

</td>
<td>

When true, produces frozen arrays on deserialization.

</td>
<td>

[src/metatypes/types/array.ts:45](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L45)

</td>
</tr>
<tr>
<td>

`serializeSubValues?`

</td>
<td>

`boolean`

</td>
<td>

Toggles serialization/deserialization of array items.

</td>
<td>

[src/metatypes/types/array.ts:47](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L47)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`any`[]

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

***

### BIGINT

```ts
type BIGINT = MetaType<bigint, BigIntImpl>;
```

Defined in: [src/metatypes/types/bigint.ts:80](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/bigint.ts#L80)

Creates a bigint meta type with optional numeric bounds and default/meta args.

#### Param

[NumbersMetaTypeArgs](#numbersmetatypeargs) controlling range/default/nullability.

#### Example

```ts
const obj = Meta({ amount: BIGINT({ nullish: true }) })
obj.amount = 1n
obj.amount = 1 // validation error
```

***

### BOOLEAN

```ts
type BOOLEAN = MetaType<boolean, BooleanImpl>;
```

Defined in: [src/metatypes/types/boolean.ts:61](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L61)

Creates a boolean meta type with optional coercion lists and standard meta args.

#### Param

[BooleanMetaTypeArgs](#booleanmetatypeargs) controlling coercion/default/nullability.

#### Example

```ts
const obj = Meta({ flag: BOOLEAN({ nullish: true }) })
obj.flag = true
obj.flag = 'true' // validation error
```

***

### BooleanMetaTypeArgs

```ts
type BooleanMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
  falseValues?: any[];
  trueValues?: any[];
};
```

Defined in: [src/metatypes/types/boolean.ts:6](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L6)

Additional options supported by the `BOOLEAN` meta type.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`falseValues?`

</td>
<td>

`any`[]

</td>
<td>

Values that should be coerced to `false` before validation.

</td>
<td>

[src/metatypes/types/boolean.ts:15](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L15)

</td>
</tr>
<tr>
<td>

`trueValues?`

</td>
<td>

`any`[]

</td>
<td>

Values that should be coerced to `true` before validation.

</td>
<td>

[src/metatypes/types/boolean.ts:13](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L13)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

***

### Class()

```ts
type Class<T> = (...args: any[]) => T extends (...args: any[]) => any ? InstanceType<T> : T;
```

Defined in: [src/utils/classes.ts:5](https://github.com/metatyper/metatyper/blob/main/src/utils/classes.ts#L5)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`args`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`T` *extends* (...`args`: `any`[]) => `any` ? `InstanceType`\<`T`\> : `T`

***

### DATE

```ts
type DATE = MetaType<Date, DateImpl>;
```

Defined in: [src/metatypes/types/date.ts:124](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L124)

Creates a `Date` meta type with optional range checks and coercion support.

#### Param

[DateMetaTypeArgs](#datemetatypeargs) controlling bounds/default/nullability.

#### Example

```ts
const obj = Meta({ createdAt: DATE({ nullish: true }) })
obj.createdAt = new Date()
obj.createdAt = 1 // validation error
```

***

### DateMetaTypeArgs

```ts
type DateMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & 
  | {
  min?: number | bigint | Date;
}
  | {
  greater?: number | bigint | Date;
} & 
  | {
  max?: number | bigint | Date;
}
  | {
  less?: number | bigint | Date;
};
```

Defined in: [src/metatypes/types/date.ts:16](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L16)

Options for [DATE](#date-1) meta type (range constraints, defaults, etc.).

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

[`DATE`](#date)

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

***

### DeSerializeFuncType()

```ts
type DeSerializeFuncType = (deserializeArgs: DeSerializerArgsType) => any;
```

Defined in: [src/metatypes/metatypeImpl.ts:140](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L140)

Deserializer function signature.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializeArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
<td>

The arguments passed to the deserializer.

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

The deserialized value.

***

### DeSerializeMetaObjectArgsType

```ts
type DeSerializeMetaObjectArgsType = {
  metaArgs?: MetaArgsType;
} & Record<string, any>;
```

Defined in: [src/metaobjects/meta.ts:30](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L30)

Extra arguments that control how `Meta.deserialize` behaves.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

Overrides used when schema/proto needs to be wrapped into a meta object before deserializing.

</td>
<td>

[src/metaobjects/meta.ts:32](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L32)

</td>
</tr>
</tbody>
</table>

***

### DeSerializeMetaTypeArgsType

```ts
type DeSerializeMetaTypeArgsType = {
  baseObject?: object;
  place?: DeSerializePlaceType;
  propName?: string | symbol;
  targetObject?: object;
  value: any;
};
```

Defined in: [src/metatypes/metatypeImpl.ts:115](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L115)

Arguments passed when deserializing a value via `MetaTypeImpl.deserialize`.
Subtype of [SerializeMetaTypeArgsType](#serializemetatypeargstype)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="baseobject"></a> `baseObject?`

</td>
<td>

`object`

</td>
<td>

Base object storing state.

</td>
<td>

[src/metatypes/metatypeImpl.ts:123](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L123)

</td>
</tr>
<tr>
<td>

<a id="place"></a> `place?`

</td>
<td>

[`DeSerializePlaceType`](#deserializeplacetype)

</td>
<td>

Which "place" triggered deserialization (init/set/etc).

</td>
<td>

[src/metatypes/metatypeImpl.ts:125](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L125)

</td>
</tr>
<tr>
<td>

<a id="propname"></a> `propName?`

</td>
<td>

`string` \| `symbol`

</td>
<td>

Property that is being assigned (optional).

</td>
<td>

[src/metatypes/metatypeImpl.ts:119](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L119)

</td>
</tr>
<tr>
<td>

<a id="targetobject-1"></a> `targetObject?`

</td>
<td>

`object`

</td>
<td>

Proxy exposed to the user.

</td>
<td>

[src/metatypes/metatypeImpl.ts:121](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L121)

</td>
</tr>
<tr>
<td>

<a id="value-1"></a> `value`

</td>
<td>

`any`

</td>
<td>

Value to deserialize.

</td>
<td>

[src/metatypes/metatypeImpl.ts:117](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L117)

</td>
</tr>
</tbody>
</table>

***

### DeSerializePlaceType

```ts
type DeSerializePlaceType = "init" | "reinit" | "set" | "deserialize" | "unknown";
```

Defined in: [src/metatypes/metatypeImpl.ts:149](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L149)

Places where deserialization can happen.

***

### DeSerializerArgsType

```ts
type DeSerializerArgsType = DeSerializeMetaTypeArgsType & {
  metaTypeImpl?: MetaTypeImpl;
};
```

Defined in: [src/metatypes/metatypeImpl.ts:132](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L132)

Deserializer arguments extended with the active implementation reference.
Subtype of [DeSerializeMetaTypeArgsType](#deserializemetatypeargstype)

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeImpl?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

[src/metatypes/metatypeImpl.ts:133](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L133)

</td>
</tr>
</tbody>
</table>

***

### DeSerializerErrorArgsType

```ts
type DeSerializerErrorArgsType = DeSerializerArgsType & {
  subError?: Error;
};
```

Defined in: [src/errors/serialization.error.ts:48](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L48)

Arguments captured when a deserializer throws.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subError?`

</td>
<td>

`Error`

</td>
<td>

Original error raised inside the deserializer, if any.

</td>
<td>

[src/errors/serialization.error.ts:50](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L50)

</td>
</tr>
</tbody>
</table>

***

### DeSerializerType

```ts
type DeSerializerType = {
  deserialize: DeSerializeFuncType;
  deserializePlaces?: DeSerializePlaceType[] | string[];
  name?: string;
};
```

Defined in: [src/metatypes/metatypeImpl.ts:156](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L156)

Deserializer object shape (function + metadata).

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-36"></a> `deserialize`

</td>
<td>

[`DeSerializeFuncType`](#deserializefunctype)

</td>
<td>

The function that deserializes the value.

</td>
<td>

[src/metatypes/metatypeImpl.ts:157](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L157)

</td>
</tr>
<tr>
<td>

<a id="deserializeplaces"></a> `deserializePlaces?`

</td>
<td>

[`DeSerializePlaceType`](#deserializeplacetype)[] \| `string`[]

</td>
<td>

The places where the deserializer can be triggered.

</td>
<td>

[src/metatypes/metatypeImpl.ts:160](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L160)

</td>
</tr>
<tr>
<td>

<a id="name-17"></a> `name?`

</td>
<td>

`string`

</td>
<td>

The name of the deserializer.

</td>
<td>

[src/metatypes/metatypeImpl.ts:159](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L159)

</td>
</tr>
</tbody>
</table>

***

### InitialClassPropertyDeclarationInfo

```ts
type InitialClassPropertyDeclarationInfo = {
  descriptor?: PropertyDescriptor;
  metaTypeArgs?: MetaTypeArgsType;
  metaTypeImpl?: MetaTypeImpl;
  propName: string;
  reflectType: any;
};
```

Defined in: [src/metaobjects/meta.ts:154](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L154)

Metadata describing a class property decorated via `Meta.declare`.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="descriptor"></a> `descriptor?`

</td>
<td>

`PropertyDescriptor`

</td>
<td>

Property descriptor snapshot at declaration time.

</td>
<td>

[src/metaobjects/meta.ts:165](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L165)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-17"></a> `metaTypeArgs?`

</td>
<td>

[`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments used to rebuild or tweak the meta type implementation.

</td>
<td>

[src/metaobjects/meta.ts:162](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L162)

</td>
</tr>
<tr>
<td>

<a id="metatypeimpl-1"></a> `metaTypeImpl?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

Meta type implementation explicitly provided for the property.

</td>
<td>

[src/metaobjects/meta.ts:159](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L159)

</td>
</tr>
<tr>
<td>

<a id="propname-1"></a> `propName`

</td>
<td>

`string`

</td>
<td>

Property name on the prototype/constructor.

</td>
<td>

[src/metaobjects/meta.ts:156](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L156)

</td>
</tr>
<tr>
<td>

<a id="reflecttype"></a> `reflectType`

</td>
<td>

`any`

</td>
<td>

Reflected design type (via reflect-metadata) if available.

</td>
<td>

[src/metaobjects/meta.ts:168](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L168)

</td>
</tr>
</tbody>
</table>

***

### INSTANCE

```ts
type INSTANCE<T> = MetaType<T, InstanceImpl>;
```

Defined in: [src/metatypes/types/instance.ts:92](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L92)

Creates a meta type that validates values are instances of the provided class.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Param

Class or instance used as the target type.

#### Param

[InstanceMetaTypeArgs](#instancemetatypeargs) controlling subclass allowance and meta args.

#### Example

```ts
class A {
   a = 1
}

const obj1 = Meta({
     a: INSTANCE(A, { nullish: true })
}) // as { a: A | null | undefined }

obj1.a = new A()
obj1.a = {} // type & validation error
obj1.a = { a: 1 } // validation error
```

***

### InstanceMetaTypeArgs

```ts
type InstanceMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
  allowChildren?: boolean;
};
```

Defined in: [src/metatypes/types/instance.ts:6](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L6)

Options for [INSTANCE](#instance-2) meta type.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`allowChildren?`

</td>
<td>

`boolean`

</td>
<td>

When false, enforces exact constructor match (no subclass instances).

</td>
<td>

[src/metatypes/types/instance.ts:13](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L13)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

***

### INTEGER

```ts
type INTEGER = MetaType<number, IntegerImpl>;
```

Defined in: [src/metatypes/types/integer.ts:78](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/integer.ts#L78)

Creates a meta type for integers (numbers coerced/truncated to whole values).

#### Param

[NumbersMetaTypeArgs](#numbersmetatypeargs) controlling range/default/nullability.

#### Example

```ts
const obj1 = Meta({
     a: INTEGER({ nullish: true })
}) // as { a: number | null | undefined }

obj1.a = 1
obj1.a = 1.2 // validation error
```

***

### LazyContext

```ts
type LazyContext = {
  curImplInLazyProcess?: MetaTypeImpl;
} & Record<any, any>;
```

Defined in: [src/metatypes/types/\_lazy.ts:5](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L5)

Internal context used while resolving nested lazy meta types.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`curImplInLazyProcess?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

Meta type currently being prepared when recursion happens.

</td>
<td>

[src/metatypes/types/\_lazy.ts:7](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L7)

</td>
</tr>
</tbody>
</table>

***

### LazyStructuresContext

```ts
type LazyStructuresContext = LazyContext & {
  preparedTypesSet: WeakSet<MetaTypeImpl>;
  rebuildingMap: WeakMap<MetaTypeImpl, MetaTypeImpl>;
};
```

Defined in: [src/metatypes/types/\_structural.ts:8](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L8)

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`preparedTypesSet`

</td>
<td>

`WeakSet`\<[`MetaTypeImpl`](#metatypeimpl)\>

</td>
<td>

[src/metatypes/types/\_structural.ts:10](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L10)

</td>
</tr>
<tr>
<td>

`rebuildingMap`

</td>
<td>

`WeakMap`\<[`MetaTypeImpl`](#metatypeimpl), [`MetaTypeImpl`](#metatypeimpl)\>

</td>
<td>

[src/metatypes/types/\_structural.ts:9](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L9)

</td>
</tr>
</tbody>
</table>

***

### LITERAL

```ts
type LITERAL<T> = MetaType<T, LiteralImpl>;
```

Defined in: [src/metatypes/types/literal.ts:34](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/literal.ts#L34)

Creates a meta type that allows only the provided literal value (with standard meta args).

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Param

Literal value to lock to.

#### Param

[MetaTypeArgsType](#metatypeargstype) controlling nullability/defaults.

#### Example

```ts
const obj = Meta({ status: LITERAL('done') })
obj.status = 'done'
obj.status = 'pending' // validation error
```

***

### Meta

```ts
type Meta<T> = T extends (...args: infer A) => infer R ? (...args: A) => Meta<R> & { [K in keyof T]: T[K] } : T extends Record<any, never> ? object : T & {
  [IsMetaObjectSymbol]?: true;
};
```

Defined in: [src/metaobjects/meta.ts:241](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L241)

Create a Meta object

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`[IsMetaObjectSymbol]?`

</td>
<td>

`true`

</td>
<td>

[src/metaobjects/meta.ts:178](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L178)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Param

The plain object used as the prototype/schema for the meta object.

#### Param

Configuration arguments ([MetaArgsType](#metaargstype)) for creating the meta object.

#### Returns

A new Meta object

#### Example

```ts
const obj1 = Meta({
  id: NUMBER({ optional: true }),
  name: 'John Doe',
  stars: NUMBER({ default: 0, min: 0 })
})

obj1.id = 1
obj1.id = 'str' // will throw an validation error

class MyCls {
     static someClsProp = STRING({ default: '' })

     someInstanceProp = NUMBER({ default: 0 })
}

const MyMetaCls = Meta(MyCls)

MyMetaCls.someClsProp = 'str'
MyMetaCls.someClsProp = 1 // will throw an validation error

const myInstance = new MyMetaCls()

myInstance.someInstanceProp = 2
myInstance.someInstanceProp = '2' // will throw an validation error
```

#### Remarks

The `Meta` function also provides several utility methods.
These methods are available on the `Meta` object and can be used to interact with meta objects.
The methods are:
- `Meta.copy(metaObject)` - [MetaCopy](#metacopy) - Creates a copy of a meta object preserving its values, types, prototype and arguments.
- `Meta.rebuild(metaObject)` - [MetaRebuild](#metarebuild) - Rebuilds a meta object using the same original object and arguments, resetting to initial state.
- `Meta.isMetaObject(obj)` - [MetaIsMetaObject](#metaismetaobject) - Checks if an object is a meta object.
- `Meta.isIgnoredProp(propName)` - [MetaIsIgnoredProp](#metaisignoredprop) - Checks if a property is ignored by Meta.
- `@Meta.Class(metaArgs)` - [MetaClass](#metaclass) - Decorator for transforming a class into a meta class.
- `@Meta.declare(metaType)` - [MetaDeclare](#metadeclare) - Decorator for declaring meta type information on class properties.
- `Meta.serialize(metaObject)` - [MetaSerialize](#metaserialize) - Serializes a meta object.
- `Meta.deserialize(data, protoObject)` - [MetaDeserialize](#metadeserialize) - Deserializes a value into a meta object.
- `Meta.toJson(metaObject)` - [MetaToJson](#metatojson) - Serializes a meta object into a JSON string.
- `Meta.fromJson(data, protoObject)` - [MetaFromJson](#metafromjson) - Deserializes a JSON string into a meta object.
- `Meta.represent(metaObject)` - [MetaRepresent](#metarepresent) - Generates a textual representation of a meta object.
- `Meta.getProto(metaObject)` - [MetaProto](#metaproto) - Retrieves the prototype of the meta object.
- `Meta.getMetaArgs(metaObject)` - [MetaGetMetaArgs](#metagetmetaargs) - Retrieves the meta arguments used to create a meta object.
- `Meta.validationIsActive(metaObject)` - [MetaValidationIsActive](#metavalidationisactive) - Checks if validation is active for the given meta object.
- `Meta.disableValidation(metaObject)` - [MetaDisableValidation](#metadisablevalidation) - Disables validation for the specified meta object.
- `Meta.enableValidation(metaObject)` - [MetaEnableValidation](#metaenablevalidation) - Enables validation for the specified meta object.
- `Meta.serializationIsActive(metaObject)` - [MetaSerializationIsActive](#metaserializationisactive) - Checks if serialization is active for the given meta object.
- `Meta.disableSerialization(metaObject)` - [MetaDisableSerialization](#metadisableserialization) - Disables serialization for the specified meta object.
- `Meta.enableSerialization(metaObject)` - [MetaEnableSerialization](#metaenableserialization) - Enables serialization for the specified meta object.

***

### MetaArgsType

```ts
type MetaArgsType = {
  autoResolveMetaTypes?: boolean;
  buildMetaInstance?: boolean;
  changeHandlers?: MetaChangeHandlerInfoType[];
  dynamicDeclarations?: boolean;
  errorHandlers?: MetaErrorHandlerInfoType[];
  ignoreProps?:   | (string | symbol)[]
     | (propName: string | symbol) => boolean;
  initialValues?: Record<string | symbol, any>;
  metaBuilder?: MetaObjectsBuilder;
  metaInstanceArgs?: MetaArgsType | "same";
  metaTypesArgs?:   | MetaTypeArgsType
     | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType;
  metaTypesResolver?: MetaTypesResolver;
  name?: string;
  serializationIsActive?: boolean;
  validationIsActive?: boolean;
} & Record<string, any>;
```

Defined in: [src/metaobjects/meta.ts:136](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L136)

Arguments that define how a meta object or class is built and behaves.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`autoResolveMetaTypes?`

</td>
<td>

`boolean`

</td>
<td>

[src/metaobjects/meta.ts:146](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L146)

</td>
</tr>
<tr>
<td>

`buildMetaInstance?`

</td>
<td>

`boolean`

</td>
<td>

[src/metaobjects/meta.ts:149](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L149)

</td>
</tr>
<tr>
<td>

`changeHandlers?`

</td>
<td>

[`MetaChangeHandlerInfoType`](#metachangehandlerinfotype)[]

</td>
<td>

[src/metaobjects/meta.ts:142](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L142)

</td>
</tr>
<tr>
<td>

`dynamicDeclarations?`

</td>
<td>

`boolean`

</td>
<td>

[src/metaobjects/meta.ts:147](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L147)

</td>
</tr>
<tr>
<td>

`errorHandlers?`

</td>
<td>

[`MetaErrorHandlerInfoType`](#metaerrorhandlerinfotype)[]

</td>
<td>

[src/metaobjects/meta.ts:143](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L143)

</td>
</tr>
<tr>
<td>

`ignoreProps?`

</td>
<td>

  \| (`string` \| `symbol`)[]
  \| (`propName`: `string` \| `symbol`) => `boolean`

</td>
<td>

[src/metaobjects/meta.ts:139](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L139)

</td>
</tr>
<tr>
<td>

`initialValues?`

</td>
<td>

`Record`\<`string` \| `symbol`, `any`\>

</td>
<td>

[src/metaobjects/meta.ts:138](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L138)

</td>
</tr>
<tr>
<td>

`metaBuilder?`

</td>
<td>

[`MetaObjectsBuilder`](#metaobjectsbuilder)

</td>
<td>

[src/metaobjects/meta.ts:150](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L150)

</td>
</tr>
<tr>
<td>

`metaInstanceArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype) \| `"same"`

</td>
<td>

[src/metaobjects/meta.ts:148](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L148)

</td>
</tr>
<tr>
<td>

`metaTypesArgs?`

</td>
<td>

  \| [`MetaTypeArgsType`](#metatypeargstype)
  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

[src/metaobjects/meta.ts:144](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L144)

</td>
</tr>
<tr>
<td>

`metaTypesResolver?`

</td>
<td>

[`MetaTypesResolver`](#metatypesresolver-1)

</td>
<td>

[src/metaobjects/meta.ts:145](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L145)

</td>
</tr>
<tr>
<td>

`name?`

</td>
<td>

`string`

</td>
<td>

[src/metaobjects/meta.ts:137](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L137)

</td>
</tr>
<tr>
<td>

`serializationIsActive?`

</td>
<td>

`boolean`

</td>
<td>

[src/metaobjects/meta.ts:141](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L141)

</td>
</tr>
<tr>
<td>

`validationIsActive?`

</td>
<td>

`boolean`

</td>
<td>

[src/metaobjects/meta.ts:140](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L140)

</td>
</tr>
</tbody>
</table>

***

### MetaChangeHandlerActionType

```ts
type MetaChangeHandlerActionType = "init" | "set" | "delete" | "define" | "deserialize";
```

Defined in: [src/metaobjects/meta.ts:36](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L36)

Lifecycle actions that can trigger a change handler.

***

### MetaChangeHandlerArgsType

```ts
type MetaChangeHandlerArgsType = {
  action: MetaChangeHandlerActionType;
  baseObject: object;
  declaration?: MetaTypeImpl;
  descriptor?: PropertyDescriptor;
  prevDeclaration?: MetaTypeImpl;
  prevDescriptor?: PropertyDescriptor;
  propName: string | symbol;
  targetObject: object;
};
```

Defined in: [src/metaobjects/meta.ts:39](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L39)

Arguments passed to change handlers describing what exactly changed.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="action"></a> `action`

</td>
<td>

[`MetaChangeHandlerActionType`](#metachangehandleractiontype)

</td>
<td>

The action that occurred (e.g. `set`, `delete`).

</td>
<td>

[src/metaobjects/meta.ts:41](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L41)

</td>
</tr>
<tr>
<td>

<a id="baseobject-1"></a> `baseObject`

</td>
<td>

`object`

</td>
<td>

Underlying base object that stores state.

</td>
<td>

[src/metaobjects/meta.ts:47](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L47)

</td>
</tr>
<tr>
<td>

<a id="declaration"></a> `declaration?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

Current meta type declaration for the property.

</td>
<td>

[src/metaobjects/meta.ts:62](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L62)

</td>
</tr>
<tr>
<td>

<a id="descriptor-1"></a> `descriptor?`

</td>
<td>

`PropertyDescriptor`

</td>
<td>

Descriptor after change (if any).

</td>
<td>

[src/metaobjects/meta.ts:56](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L56)

</td>
</tr>
<tr>
<td>

<a id="prevdeclaration"></a> `prevDeclaration?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

Previous meta type declaration for the property.

</td>
<td>

[src/metaobjects/meta.ts:59](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="prevdescriptor"></a> `prevDescriptor?`

</td>
<td>

`PropertyDescriptor`

</td>
<td>

Descriptor before change (if any).

</td>
<td>

[src/metaobjects/meta.ts:53](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L53)

</td>
</tr>
<tr>
<td>

<a id="propname-2"></a> `propName`

</td>
<td>

`string` \| `symbol`

</td>
<td>

Affected property name or symbol.

</td>
<td>

[src/metaobjects/meta.ts:50](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="targetobject-2"></a> `targetObject`

</td>
<td>

`object`

</td>
<td>

Proxy object exposed to consumers.

</td>
<td>

[src/metaobjects/meta.ts:44](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L44)

</td>
</tr>
</tbody>
</table>

***

### MetaChangeHandlerInfoType

```ts
type MetaChangeHandlerInfoType = {
  actions?: MetaChangeHandlerActionType[];
  handler: (args: MetaChangeHandlerArgsType) => void;
  props?: (string | symbol)[];
};
```

Defined in: [src/metaobjects/meta.ts:66](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L66)

Registration info for change handlers (which handler, for which actions/props).

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="actions"></a> `actions?`

</td>
<td>

[`MetaChangeHandlerActionType`](#metachangehandleractiontype)[]

</td>
<td>

Optional action filter; empty array means all actions.

</td>
<td>

[src/metaobjects/meta.ts:71](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L71)

</td>
</tr>
<tr>
<td>

<a id="handler-1"></a> `handler`

</td>
<td>

(`args`: [`MetaChangeHandlerArgsType`](#metachangehandlerargstype)) => `void`

</td>
<td>

The handler callback to invoke.

</td>
<td>

[src/metaobjects/meta.ts:68](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="props"></a> `props?`

</td>
<td>

(`string` \| `symbol`)[]

</td>
<td>

Optional property filter.

</td>
<td>

[src/metaobjects/meta.ts:74](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L74)

</td>
</tr>
</tbody>
</table>

***

### MetaErrorHandlerArgsType

```ts
type MetaErrorHandlerArgsType = {
  baseObject: object;
  error: Error;
  errorPlace: MetaErrorHandlerPlaceType;
  propName?: string | symbol;
  targetObject: object;
};
```

Defined in: [src/metaobjects/meta.ts:89](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L89)

Arguments passed to an error handler when meta logic throws.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="baseobject-2"></a> `baseObject`

</td>
<td>

`object`

</td>
<td>

Underlying base object.

</td>
<td>

[src/metaobjects/meta.ts:103](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L103)

</td>
</tr>
<tr>
<td>

<a id="error"></a> `error`

</td>
<td>

`Error`

</td>
<td>

The thrown error instance.

</td>
<td>

[src/metaobjects/meta.ts:91](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="errorplace"></a> `errorPlace`

</td>
<td>

[`MetaErrorHandlerPlaceType`](#metaerrorhandlerplacetype)

</td>
<td>

Which lifecycle place raised the error.

</td>
<td>

[src/metaobjects/meta.ts:94](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L94)

</td>
</tr>
<tr>
<td>

<a id="propname-3"></a> `propName?`

</td>
<td>

`string` \| `symbol`

</td>
<td>

Property name involved in the error, if any.

</td>
<td>

[src/metaobjects/meta.ts:97](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L97)

</td>
</tr>
<tr>
<td>

<a id="targetobject-3"></a> `targetObject`

</td>
<td>

`object`

</td>
<td>

Proxy object exposed to consumers.

</td>
<td>

[src/metaobjects/meta.ts:100](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L100)

</td>
</tr>
</tbody>
</table>

***

### MetaErrorHandlerInfoType

```ts
type MetaErrorHandlerInfoType = {
  handler: (args: MetaErrorHandlerArgsType) => void;
  places?: MetaErrorHandlerPlaceType[];
};
```

Defined in: [src/metaobjects/meta.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L107)

Registration info for error handlers (which handler, for which places).

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="handler-2"></a> `handler`

</td>
<td>

(`args`: [`MetaErrorHandlerArgsType`](#metaerrorhandlerargstype)) => `void`

</td>
<td>

The handler callback to invoke.

</td>
<td>

[src/metaobjects/meta.ts:109](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L109)

</td>
</tr>
<tr>
<td>

<a id="places"></a> `places?`

</td>
<td>

[`MetaErrorHandlerPlaceType`](#metaerrorhandlerplacetype)[]

</td>
<td>

Optional place filter.

</td>
<td>

[src/metaobjects/meta.ts:112](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L112)

</td>
</tr>
</tbody>
</table>

***

### MetaErrorHandlerPlaceType

```ts
type MetaErrorHandlerPlaceType = 
  | "init"
  | "get"
  | "set"
  | "define"
  | "delete"
  | "validate"
  | "deserialize"
  | "serialize";
```

Defined in: [src/metaobjects/meta.ts:78](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L78)

Places where an error handler can be triggered.

***

### MetaObjectRegistryInfo

```ts
type MetaObjectRegistryInfo = {
  autoResolveMetaTypes: boolean;
  baseObject: object;
  builder: MetaObjectsBuilder;
  buildMetaInstance?: boolean;
  changeHandlers: MetaChangeHandlerInfoType[];
  declarations: Record<string | symbol, MetaTypeImpl>;
  dynamicDeclarations: boolean;
  errorHandlers: MetaErrorHandlerInfoType[];
  ignoreProps:   | (string | symbol)[]
     | (propName: string | symbol) => boolean;
  initialClassPropertiesDeclarations: Record<string | symbol, InitialClassPropertyDeclarationInfo>;
  metaArgs: MetaArgsType;
  metaInstanceArgs?: MetaArgsType | "same";
  metaTypesArgs:   | MetaTypeArgsType
     | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType;
  metaTypesResolver: MetaTypesResolver;
  name: string;
  protoObject: object;
  serializationIsActive: boolean;
  type: MetaObjectTypeName;
  validationIsActive: boolean;
};
```

Defined in: [src/metaobjects/registry.ts:17](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L17)

Internal information the builder/handler keep per meta object.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="autoresolvemetatypes"></a> `autoResolveMetaTypes`

</td>
<td>

`boolean`

</td>
<td>

Whether auto resolution of types is enabled.

</td>
<td>

[src/metaobjects/registry.ts:67](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L67)

</td>
</tr>
<tr>
<td>

<a id="baseobject-3"></a> `baseObject`

</td>
<td>

`object`

</td>
<td>

Actual proxy object exposed to the user.

</td>
<td>

[src/metaobjects/registry.ts:31](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L31)

</td>
</tr>
<tr>
<td>

<a id="builder-1"></a> `builder`

</td>
<td>

[`MetaObjectsBuilder`](#metaobjectsbuilder)

</td>
<td>

Builder instance that created/configures this meta object.

</td>
<td>

[src/metaobjects/registry.ts:22](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="buildmetainstance"></a> `buildMetaInstance?`

</td>
<td>

`boolean`

</td>
<td>

Whether instances should automatically be wrapped as meta objects.

</td>
<td>

[src/metaobjects/registry.ts:76](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L76)

</td>
</tr>
<tr>
<td>

<a id="changehandlers"></a> `changeHandlers`

</td>
<td>

[`MetaChangeHandlerInfoType`](#metachangehandlerinfotype)[]

</td>
<td>

Registered change handlers.

</td>
<td>

[src/metaobjects/registry.ts:55](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L55)

</td>
</tr>
<tr>
<td>

<a id="declarations"></a> `declarations`

</td>
<td>

`Record`\<`string` \| `symbol`, [`MetaTypeImpl`](#metatypeimpl)\>

</td>
<td>

Current meta type declarations for known properties.

</td>
<td>

[src/metaobjects/registry.ts:43](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L43)

</td>
</tr>
<tr>
<td>

<a id="dynamicdeclarations"></a> `dynamicDeclarations`

</td>
<td>

`boolean`

</td>
<td>

Whether dynamic declarations are allowed.

</td>
<td>

[src/metaobjects/registry.ts:70](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L70)

</td>
</tr>
<tr>
<td>

<a id="errorhandlers"></a> `errorHandlers`

</td>
<td>

[`MetaErrorHandlerInfoType`](#metaerrorhandlerinfotype)[]

</td>
<td>

Registered error handlers.

</td>
<td>

[src/metaobjects/registry.ts:58](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="ignoreprops"></a> `ignoreProps`

</td>
<td>

 \| (`string` \| `symbol`)[] \| (`propName`: `string` \| `symbol`) => `boolean`

</td>
<td>

Ignored prop list or predicate.

</td>
<td>

[src/metaobjects/registry.ts:46](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L46)

</td>
</tr>
<tr>
<td>

<a id="initialclasspropertiesdeclarations"></a> `initialClassPropertiesDeclarations`

</td>
<td>

`Record`\<`string` \| `symbol`, [`InitialClassPropertyDeclarationInfo`](#initialclasspropertydeclarationinfo)\>

</td>
<td>

Deferred class property declarations registered via `Meta.declare`.

</td>
<td>

[src/metaobjects/registry.ts:37](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L37)

</td>
</tr>
<tr>
<td>

<a id="metaargs"></a> `metaArgs`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

Meta arguments applied during build.

</td>
<td>

[src/metaobjects/registry.ts:19](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L19)

</td>
</tr>
<tr>
<td>

<a id="metainstanceargs"></a> `metaInstanceArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype) \| `"same"`

</td>
<td>

Meta arguments used when building instances of meta classes.

</td>
<td>

[src/metaobjects/registry.ts:73](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L73)

</td>
</tr>
<tr>
<td>

<a id="metatypesargs"></a> `metaTypesArgs`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype) \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Default meta type arguments or resolver callback.

</td>
<td>

[src/metaobjects/registry.ts:61](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L61)

</td>
</tr>
<tr>
<td>

<a id="metatypesresolver"></a> `metaTypesResolver`

</td>
<td>

[`MetaTypesResolver`](#metatypesresolver-1)

</td>
<td>

Custom meta type resolver.

</td>
<td>

[src/metaobjects/registry.ts:64](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L64)

</td>
</tr>
<tr>
<td>

<a id="name-18"></a> `name`

</td>
<td>

`string`

</td>
<td>

Human readable label (used in `toString`).

</td>
<td>

[src/metaobjects/registry.ts:25](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L25)

</td>
</tr>
<tr>
<td>

<a id="protoobject"></a> `protoObject`

</td>
<td>

`object`

</td>
<td>

Original prototype/class/function.

</td>
<td>

[src/metaobjects/registry.ts:34](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="serializationisactive"></a> `serializationIsActive`

</td>
<td>

`boolean`

</td>
<td>

Whether serialization/deserialization is active.

</td>
<td>

[src/metaobjects/registry.ts:52](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L52)

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

[`MetaObjectTypeName`](#metaobjecttypename)

</td>
<td>

Classification (class/function/instance/etc).

</td>
<td>

[src/metaobjects/registry.ts:28](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="validationisactive"></a> `validationIsActive`

</td>
<td>

`boolean`

</td>
<td>

Whether validation is active.

</td>
<td>

[src/metaobjects/registry.ts:49](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L49)

</td>
</tr>
</tbody>
</table>

***

### MetaObjectTypeName

```ts
type MetaObjectTypeName = "class" | "instance" | "function" | "array" | "object";
```

Defined in: [src/metaobjects/registry.ts:14](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L14)

Classification label used to describe what kind of meta object we are dealing with.

***

### MetaType

```ts
type MetaType<T, ImplT> = T & MetaTypeBase<ImplT>;
```

Defined in: [src/metatypes/metatype.ts:40](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L40)

Creates a runtime meta type wrapper from either an existing implementation instance
or an implementation class. The resulting object holds the resolved implementation
and exposes validation/serialization helpers.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`ImplT`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

#### Remarks

The `MetaType` factory also provides several helper utilities:
- `MetaType.inspect(metaType)` - [MetaTypeInspect](#metatypeinspect) - Pretty-prints using the implementation stringifier.
- `MetaType.toString(metaType)` - [MetaTypeToString](#metatypetostring) - Returns the implementation string representation.
- `MetaType.validate(metaType, value, args)` - [MetaTypeValidate](#metatypevalidate) - Validates a value using the backing implementation.
- `MetaType.serialize(metaType, value)` - [MetaTypeSerialize](#metatypeserialize) - Serializes a value through the meta type serializers.
- `MetaType.deserialize(metaType, value)` - [MetaTypeDeserialize](#metatypedeserialize) - Deserializes a raw value through the meta type serializers.
- `MetaType.isMetaType(obj)` - [MetaTypeIsMetaType](#metatypeismetatype) - Checks whether a value is a runtime meta type wrapper.
- `MetaType.getMetaTypeImpl(metaType)` - [MetaTypeGetMetaTypeImpl](#metatypegetmetatypeimpl) - Retrieves the bound implementation instance.

***

### MetaTypeArgsType

```ts
type MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> = {
  coercion?: boolean;
  default?: [IsNullableT] extends [true] ? T | null : 
     | T
    | (declaration?: MetaTypeImpl) => [IsNullableT] extends [true] ? T | null : T;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: IsNullableT;
  nullish?: IsNullishT;
  optional?: IsOptionalT;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
} & Record<string, any>;
```

Defined in: [src/metatypes/metatypeImpl.ts:185](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L185)

Arguments that describe how a meta type behaves (validators, coercion, defaults, etc.).

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coercion?`

</td>
<td>

`boolean`

</td>
<td>

[src/metatypes/metatypeImpl.ts:199](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L199)

</td>
</tr>
<tr>
<td>

`default?`

</td>
<td>

\[`IsNullableT`\] *extends* \[`true`\] ? `T` \| `null` : 
  \| `T`
  \| (`declaration?`: [`MetaTypeImpl`](#metatypeimpl)) => \[`IsNullableT`\] *extends* \[`true`\] ? `T` \| `null` : `T`

</td>
<td>

[src/metatypes/metatypeImpl.ts:193](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L193)

</td>
</tr>
<tr>
<td>

`deserializers?`

</td>
<td>

(
  \| [`DeSerializerType`](#deserializertype)
  \| [`DeSerializeFuncType`](#deserializefunctype))[]

</td>
<td>

[src/metatypes/metatypeImpl.ts:206](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L206)

</td>
</tr>
<tr>
<td>

`name?`

</td>
<td>

`string`

</td>
<td>

[src/metatypes/metatypeImpl.ts:191](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L191)

</td>
</tr>
<tr>
<td>

`noBuiltinDeSerializers?`

</td>
<td>

`boolean`

</td>
<td>

[src/metatypes/metatypeImpl.ts:203](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L203)

</td>
</tr>
<tr>
<td>

`noBuiltinSerializers?`

</td>
<td>

`boolean`

</td>
<td>

[src/metatypes/metatypeImpl.ts:202](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L202)

</td>
</tr>
<tr>
<td>

`noBuiltinValidators?`

</td>
<td>

`boolean`

</td>
<td>

[src/metatypes/metatypeImpl.ts:201](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L201)

</td>
</tr>
<tr>
<td>

`nullable?`

</td>
<td>

`IsNullableT`

</td>
<td>

[src/metatypes/metatypeImpl.ts:197](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L197)

</td>
</tr>
<tr>
<td>

`nullish?`

</td>
<td>

`IsNullishT`

</td>
<td>

[src/metatypes/metatypeImpl.ts:196](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L196)

</td>
</tr>
<tr>
<td>

`optional?`

</td>
<td>

`IsOptionalT`

</td>
<td>

[src/metatypes/metatypeImpl.ts:198](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L198)

</td>
</tr>
<tr>
<td>

`safe?`

</td>
<td>

`boolean`

</td>
<td>

[src/metatypes/metatypeImpl.ts:207](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L207)

</td>
</tr>
<tr>
<td>

`serializers?`

</td>
<td>

(
  \| [`SerializerType`](#serializertype)
  \| [`SerializeFuncType`](#serializefunctype))[]

</td>
<td>

[src/metatypes/metatypeImpl.ts:205](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L205)

</td>
</tr>
<tr>
<td>

`subType?`

</td>
<td>

`any`

</td>
<td>

[src/metatypes/metatypeImpl.ts:192](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L192)

</td>
</tr>
<tr>
<td>

`validateType?`

</td>
<td>

`boolean`

</td>
<td>

[src/metatypes/metatypeImpl.ts:200](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L200)

</td>
</tr>
<tr>
<td>

`validators?`

</td>
<td>

(
  \| [`ValidatorType`](#validatortype)
  \| [`ValidatorFuncType`](#validatorfunctype))[]

</td>
<td>

[src/metatypes/metatypeImpl.ts:204](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L204)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

***

### MetaTypeBase

```ts
type MetaTypeBase<ImplT> = {
  [MetaTypeImplSymbol]?: ImplT | MetaTypeImpl;
} & MetaTypeFlag;
```

Defined in: [src/metatypes/metatype.ts:16](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L16)

Base shape of any meta type wrapper (stores link to `MetaTypeImpl`).

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`[MetaTypeImplSymbol]?`

</td>
<td>

`ImplT` \| [`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

[src/metatypes/metatype.ts:17](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L17)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`ImplT`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

***

### MetaTypeFlag

```ts
type MetaTypeFlag = {
  [IsMetaTypeSymbol]?: true;
};
```

Defined in: [src/metatypes/metatype.ts:11](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L11)

Describes objects that carry the meta-type marker.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="ismetatypesymbol"></a> `[IsMetaTypeSymbol]?`

</td>
<td>

`readonly`

</td>
<td>

`true`

</td>
<td>

[src/metatypes/metatype.ts:12](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L12)

</td>
</tr>
</tbody>
</table>

***

### MetaTypesResolver()

```ts
type MetaTypesResolver = (value: any, args?: MetaTypeArgsType) => MetaTypeImpl;
```

Defined in: [src/metaobjects/meta.ts:116](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L116)

Resolves any value into a concrete `MetaTypeImpl`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

#### Returns

[`MetaTypeImpl`](#metatypeimpl)

***

### NUMBER

```ts
type NUMBER = MetaType<number, NumberImpl>;
```

Defined in: [src/metatypes/types/number.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/number.ts#L107)

Creates a number meta type (double precision) with optional range constraints.

#### Param

[NumbersMetaTypeArgs](#numbersmetatypeargs) controlling min/max/greater/less and defaults.

#### Example

```ts
const obj = Meta({ score: NUMBER({ min: 0 }) })
obj.score = 1.2
obj.score = 'str' // validation error
```

***

### NumbersMetaTypeArgs

```ts
type NumbersMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & 
  | {
  greater?: never;
  min?: number | bigint | Date;
}
  | {
  greater?: number | bigint | Date;
  min?: never;
} & 
  | {
  less?: never;
  max?: number | bigint | Date;
}
  | {
  less?: number | bigint | Date;
  max?: never;
};
```

Defined in: [src/metatypes/types/number.ts:11](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/number.ts#L11)

Options for numeric meta types (NUMBER/INTEGER/BIGINT reuse this).

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

[`NUMBER`](#number)

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

***

### OBJECT

```ts
type OBJECT<T> = MetaType<T, ObjectImpl> & ObjectFlag;
```

Defined in: [src/metatypes/types/object.ts:274](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L274)

Creates an object meta type. Accepts either a per-field schema or a single meta type applied to
every property (record mode).

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Param

Schema object, meta type, or factory describing the object structure.

#### Param

[ObjectMetaTypeArgs](#objectmetatypeargs) controlling required keys, freezing, etc.

#### Example

```ts
const obj1 = Meta({
    a: OBJECT(
        {
            a1: 1,
            a2: 'string',
            a3: [BOOLEAN()]
        },
        { nullish: true }
    )
}) // as { a: { a1: number, a2: string, a3: boolean[] } | null | undefined }

obj1.a = { a1: 1, a2: 'str', a3: [true, false] }
obj1.a = { a1: 1, a2: 'str', a3: [true, false, 1] } // type & validation error

const obj2 = Meta({
    c: OBJECT(BOOLEAN(), { nullish: true })
}) // as { c: Record<string, boolean> | null | undefined }

obj2.c = { _someKey: true }
obj2.c = { _someKey: 10 } // type & validation error
```

***

### ObjectFlag

```ts
type ObjectFlag = {
  [IsOBJECT]?: true;
};
```

Defined in: [src/metatypes/types/object.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L449)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="isobject"></a> `[IsOBJECT]?`

</td>
<td>

`readonly`

</td>
<td>

`true`

</td>
<td>

[src/metatypes/types/object.ts:450](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L450)

</td>
</tr>
</tbody>
</table>

***

### ObjectMetaTypeArgs

```ts
type ObjectMetaTypeArgs<T, RequiredKeysT, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
  freeze?: IsFrozenT;
  required?: RequiredKeysT;
  serializeSubValues?: boolean;
};
```

Defined in: [src/metatypes/types/object.ts:16](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L16)

Options for [OBJECT](#object-1) meta type.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`freeze?`

</td>
<td>

`IsFrozenT`

</td>
<td>

When true, deserialized objects are frozen (immutable).

</td>
<td>

[src/metatypes/types/object.ts:25](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L25)

</td>
</tr>
<tr>
<td>

`required?`

</td>
<td>

`RequiredKeysT`

</td>
<td>

Keys that must be present; defaults to schema keys when omitted.

</td>
<td>

[src/metatypes/types/object.ts:27](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L27)

</td>
</tr>
<tr>
<td>

`serializeSubValues?`

</td>
<td>

`boolean`

</td>
<td>

Enables/disables serialization/deserialization of nested properties.

</td>
<td>

[src/metatypes/types/object.ts:29](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L29)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

[`OBJECT`](#object)\<`object`\>

</td>
</tr>
<tr>
<td>

`RequiredKeysT` *extends* keyof `any`[]

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

***

### PrepareMetaType

```ts
type PrepareMetaType<T, IsNullishT, IsNullableT, IsOptionalT> = IsNullableT extends true ? IsOptionalT extends true ? T | null | undefined : T | null : IsOptionalT extends true ? T | undefined : T;
```

Defined in: [src/metatypes/metatype.ts:27](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L27)

Infers nullable/optional output type depending on metatype args.
Mirrors what `MetaTypeArgsType.nullish/nullable/optional` controls at runtime.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

***

### SerializeFuncType()

```ts
type SerializeFuncType = (serializeArgs: SerializerArgsType) => any;
```

Defined in: [src/metatypes/metatypeImpl.ts:94](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L94)

Serializer function signature.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializeArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
<td>

The arguments passed to the serializer.

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

The serialized value.

***

### SerializeMetaObjectArgsType

```ts
type SerializeMetaObjectArgsType = {
  metaArgs?: MetaArgsType;
} & Record<string, any>;
```

Defined in: [src/metaobjects/meta.ts:24](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L24)

Extra arguments that control how `Meta.serialize` behaves.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

Overrides used when building a meta object from a plain schema before serialization.

</td>
<td>

[src/metaobjects/meta.ts:26](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L26)

</td>
</tr>
</tbody>
</table>

***

### SerializeMetaTypeArgsType

```ts
type SerializeMetaTypeArgsType = {
  baseObject?: object;
  place?: SerializePlaceType;
  propName?: string | symbol;
  targetObject?: object;
  value: any;
} & Record<string, any>;
```

Defined in: [src/metatypes/metatypeImpl.ts:69](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L69)

Arguments passed when serializing a value via `MetaTypeImpl.serialize`.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject?`

</td>
<td>

`object`

</td>
<td>

Base object storing state.

</td>
<td>

[src/metatypes/metatypeImpl.ts:77](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L77)

</td>
</tr>
<tr>
<td>

`place?`

</td>
<td>

[`SerializePlaceType`](#serializeplacetype)

</td>
<td>

Which "place" triggered serialization (get/serialize/etc).

</td>
<td>

[src/metatypes/metatypeImpl.ts:79](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L79)

</td>
</tr>
<tr>
<td>

`propName?`

</td>
<td>

`string` \| `symbol`

</td>
<td>

Property name that triggered serialization (optional).

</td>
<td>

[src/metatypes/metatypeImpl.ts:73](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L73)

</td>
</tr>
<tr>
<td>

`targetObject?`

</td>
<td>

`object`

</td>
<td>

Proxy exposed to the user.

</td>
<td>

[src/metatypes/metatypeImpl.ts:75](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L75)

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

Value to serialize.

</td>
<td>

[src/metatypes/metatypeImpl.ts:71](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L71)

</td>
</tr>
</tbody>
</table>

***

### SerializePlaceType

```ts
type SerializePlaceType = "get" | "serialize" | "unknown";
```

Defined in: [src/metatypes/metatypeImpl.ts:97](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L97)

Places where serialization can be triggered.

***

### SerializerArgsType

```ts
type SerializerArgsType = SerializeMetaTypeArgsType & {
  metaTypeImpl?: MetaTypeImpl;
};
```

Defined in: [src/metatypes/metatypeImpl.ts:86](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L86)

Serializer arguments extended with the active implementation reference.
Subtype of [SerializeMetaTypeArgsType](#serializemetatypeargstype)

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeImpl?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

[src/metatypes/metatypeImpl.ts:87](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L87)

</td>
</tr>
</tbody>
</table>

***

### SerializerErrorArgsType

```ts
type SerializerErrorArgsType = SerializerArgsType & {
  subError?: Error;
};
```

Defined in: [src/errors/serialization.error.ts:14](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L14)

Arguments captured when a serializer throws.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subError?`

</td>
<td>

`Error`

</td>
<td>

Original error raised inside the serializer, if any.

</td>
<td>

[src/errors/serialization.error.ts:16](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L16)

</td>
</tr>
</tbody>
</table>

***

### SerializerType

```ts
type SerializerType = {
  name?: string;
  serialize: SerializeFuncType;
  serializePlaces?: SerializePlaceType[] | string[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:104](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L104)

Serializer object shape (function + metadata).

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-19"></a> `name?`

</td>
<td>

`string`

</td>
<td>

The name of the serializer.

</td>
<td>

[src/metatypes/metatypeImpl.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L107)

</td>
</tr>
<tr>
<td>

<a id="serialize-36"></a> `serialize`

</td>
<td>

[`SerializeFuncType`](#serializefunctype)

</td>
<td>

The function that serializes the value.

</td>
<td>

[src/metatypes/metatypeImpl.ts:105](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L105)

</td>
</tr>
<tr>
<td>

<a id="serializeplaces"></a> `serializePlaces?`

</td>
<td>

[`SerializePlaceType`](#serializeplacetype)[] \| `string`[]

</td>
<td>

The places where the serializer can be triggered.

</td>
<td>

[src/metatypes/metatypeImpl.ts:108](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L108)

</td>
</tr>
</tbody>
</table>

***

### StaticClass

```ts
type StaticClass<T, StaticT> = Class<T> & StaticT;
```

Defined in: [src/utils/classes.ts:9](https://github.com/metatyper/metatyper/blob/main/src/utils/classes.ts#L9)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`StaticT`

</td>
<td>

`T` *extends* (...`args`: `any`[]) => `any` ? `T` : `unknown`

</td>
</tr>
</tbody>
</table>

***

### STRING

```ts
type STRING = MetaType<string, StringImpl>;
```

Defined in: [src/metatypes/types/string.ts:110](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L110)

Creates a string meta type with length/regexp/casing options plus standard meta args.

#### Param

[StringMetaTypeArgs](#stringmetatypeargs) controlling min/max length, regexp, casing, etc.

#### Example

```ts
const obj = Meta({ name: STRING({ minLength: 3 }) })
obj.name = 'John'
obj.name = 1 // validation error
obj.name = '' // validation error
```

***

### StringMetaTypeArgs

```ts
type StringMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & 
  | {
  notEmpty?: boolean;
}
  | {
  minLength?: number;
} & {
  maxLength?: number;
  regexp?: RegExp | string;
  toCase?: "lower" | "upper";
  trim?: boolean;
};
```

Defined in: [src/metatypes/types/string.ts:16](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L16)

Additional options supported by the `STRING` meta type.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`maxLength?`

</td>
<td>

`number`

</td>
<td>

Maximum allowed length.

</td>
<td>

[src/metatypes/types/string.ts:33](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L33)

</td>
</tr>
<tr>
<td>

`regexp?`

</td>
<td>

`RegExp` \| `string`

</td>
<td>

Regular expression (string or RegExp) the value must match.

</td>
<td>

[src/metatypes/types/string.ts:39](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L39)

</td>
</tr>
<tr>
<td>

`toCase?`

</td>
<td>

`"lower"` \| `"upper"`

</td>
<td>

Convert value to lower/upper case during deserialization.

</td>
<td>

[src/metatypes/types/string.ts:41](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L41)

</td>
</tr>
<tr>
<td>

`trim?`

</td>
<td>

`boolean`

</td>
<td>

Trims whitespace before validation.

</td>
<td>

[src/metatypes/types/string.ts:36](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L36)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

[`STRING`](#string)

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

***

### TUPLE

```ts
type TUPLE<T> = MetaType<T, TupleImpl>;
```

Defined in: [src/metatypes/types/tuple.ts:132](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L132)

Creates a tuple meta type with a fixed list of item schemas.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Param

Array (or factory) describing each position in the tuple.

#### Param

[TupleMetaTypeArgs](#tuplemetatypeargs) controlling nullability, freezing, etc.

#### Example

```ts
const obj1 = Meta({
     a: TUPLE([1, 'string', BOOLEAN({ nullish: true })], { nullish: true })
}) // as { a: [number, string, boolean | null | undefined] | null | undefined }

obj1.a = [1, 'str', true]
obj1.a = [1, true, 'str'] //  type & validation error
obj1.a = [1] //  type & validation error
```

***

### TupleMetaTypeArgs

```ts
type TupleMetaTypeArgs<T, IsNullishT, IsNullableT, IsOptionalT, IsFrozenT> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
  freeze?: IsFrozenT;
  serializeSubValues?: boolean;
};
```

Defined in: [src/metatypes/types/tuple.ts:14](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L14)

Options for [TUPLE](#tuple-1) meta type (freezing, sub-value serialization, etc.).

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`freeze?`

</td>
<td>

`IsFrozenT`

</td>
<td>

When true, deserialized tuples are frozen.

</td>
<td>

[src/metatypes/types/tuple.ts:22](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L22)

</td>
</tr>
<tr>
<td>

`serializeSubValues?`

</td>
<td>

`boolean`

</td>
<td>

Toggles serialization/deserialization of tuple entries.

</td>
<td>

[src/metatypes/types/tuple.ts:24](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L24)

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`any`[]

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsFrozenT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

***

### UNION

```ts
type UNION<T> = T;
```

Defined in: [src/metatypes/types/union.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/union.ts#L107)

Creates a union meta type that accepts any of the provided sub meta types/literals.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Param

Array (or factory) of sub types/meta types.

#### Param

Standard [MetaTypeArgsType](#metatypeargstype) plus `serializeSubValues` toggle.

#### Example

```ts
const obj1 = Meta({
     a: UNION([1, 'string', BOOLEAN({ nullish: true })])
}) // as { a: number | string | boolean | null | undefined }

obj1.a = 1
obj1.a = 'str'
obj1.a = true
obj1.a = {} // type & validation error
```

***

### ValidateMetaObjectArgsType

```ts
type ValidateMetaObjectArgsType = {
  metaArgs?: MetaArgsType;
  stopAtFirstError?: boolean;
} & Record<string, any>;
```

Defined in: [src/metaobjects/meta.ts:15](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L15)

Extra arguments that control how `Meta.validate` reports issues.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

Meta arguments to apply temporarily while validating.

</td>
<td>

[src/metaobjects/meta.ts:17](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L17)

</td>
</tr>
<tr>
<td>

`stopAtFirstError?`

</td>
<td>

`boolean`

</td>
<td>

When `true`, validation stops at the first issue (default).

</td>
<td>

[src/metaobjects/meta.ts:20](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L20)

</td>
</tr>
</tbody>
</table>

***

### ValidateMetaTypeArgsType

```ts
type ValidateMetaTypeArgsType = {
  baseObject?: object;
  path?: (string | number | symbol)[];
  stopAtFirstError?: boolean;
  targetObject?: object;
  value: any;
} & Record<string, any>;
```

Defined in: [src/metatypes/metatypeImpl.ts:19](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L19)

Arguments passed to `MetaTypeImpl.validate`.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject?`

</td>
<td>

`object`

</td>
<td>

Base object that stores state (not proxy).

</td>
<td>

[src/metatypes/metatypeImpl.ts:40](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L40)

</td>
</tr>
<tr>
<td>

`path?`

</td>
<td>

(`string` \| `number` \| `symbol`)[]

</td>
<td>

Validation path (used for nested structures).

**Example**

```ts

const err = OBJECT(ARRAY(STRING())).validate({ myKey: ['str', 5] })
const issue = err?.issues[0]

issue.path // ['myKey', 1]

```

</td>
<td>

[src/metatypes/metatypeImpl.ts:34](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L34)

</td>
</tr>
<tr>
<td>

`stopAtFirstError?`

</td>
<td>

`boolean`

</td>
<td>

Stops on first error when `true` (default).
If `false`, all errors will be collected and returned as issues in a [ValidationError](#validationerror).

</td>
<td>

[src/metatypes/metatypeImpl.ts:45](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L45)

</td>
</tr>
<tr>
<td>

`targetObject?`

</td>
<td>

`object`

</td>
<td>

Original proxy exposed to the user.

</td>
<td>

[src/metatypes/metatypeImpl.ts:37](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L37)

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

Value being validated.

</td>
<td>

[src/metatypes/metatypeImpl.ts:21](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L21)

</td>
</tr>
</tbody>
</table>

***

### ValidatorArgsType

```ts
type ValidatorArgsType = ValidateMetaTypeArgsType & {
  metaTypeImpl?: MetaTypeImpl;
};
```

Defined in: [src/metatypes/metatypeImpl.ts:52](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L52)

Arguments passed to validators; extends base validation args with meta implementation.
Subtype of [ValidateMetaTypeArgsType](#validatemetatypeargstype)

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeImpl?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
<td>

[src/metatypes/metatypeImpl.ts:53](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L53)

</td>
</tr>
</tbody>
</table>

***

### ValidatorErrorArgsType

```ts
type ValidatorErrorArgsType = {
  subError?: Error;
  validator: ValidatorType;
  validatorArgs: ValidatorArgsType;
};
```

Defined in: [src/errors/validation.error.ts:6](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L6)

Arguments collected when a validator throws or returns `false`.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="suberror-1"></a> `subError?`

</td>
<td>

`Error`

</td>
<td>

Underlying error thrown inside the validator, if any.

</td>
<td>

[src/errors/validation.error.ts:12](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="validator-1"></a> `validator`

</td>
<td>

[`ValidatorType`](#validatortype)

</td>
<td>

Validator definition that failed.

</td>
<td>

[src/errors/validation.error.ts:8](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="validatorargs-1"></a> `validatorArgs`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
<td>

Context passed to the validator (value, meta type, path, etc.).

</td>
<td>

[src/errors/validation.error.ts:10](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L10)

</td>
</tr>
</tbody>
</table>

***

### ValidatorFuncType()

```ts
type ValidatorFuncType = (validationArgs: ValidatorArgsType) => boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:60](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L60)

Validator function signature.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`validationArgs`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
<td>

The arguments passed to the validator.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `Error`

A boolean indicating whether the value is valid, or an error if the value is invalid.

***

### ValidatorType

```ts
type ValidatorType = {
  name?: string;
  validate: ValidatorFuncType;
};
```

Defined in: [src/metatypes/metatypeImpl.ts:66](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L66)

Validator object shape.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-20"></a> `name?`

</td>
<td>

`string`

</td>
<td>

The name of the validator.

</td>
<td>

[src/metatypes/metatypeImpl.ts:66](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L66)

</td>
</tr>
<tr>
<td>

<a id="validate-36"></a> `validate`

</td>
<td>

[`ValidatorFuncType`](#validatorfunctype)

</td>
<td>

The function that validates the value.

</td>
<td>

[src/metatypes/metatypeImpl.ts:66](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L66)

</td>
</tr>
</tbody>
</table>

## Variables

### CoercionDeSerializer

```ts
const CoercionDeSerializer: {
  deserialize: (args: DeSerializerArgsType) => any;
  name: string;
};
```

Defined in: [src/serializers/coercion.ts:13](https://github.com/metatyper/metatyper/blob/main/src/serializers/coercion.ts#L13)

Deserializes values by delegating to the meta type's `castToType` implementation.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-37"></a> `deserialize()`

</td>
<td>

(`args`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/coercion.ts:16](https://github.com/metatyper/metatyper/blob/main/src/serializers/coercion.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="name-21"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'CoercionDeSerializer'`

</td>
<td>

[src/serializers/coercion.ts:14](https://github.com/metatyper/metatyper/blob/main/src/serializers/coercion.ts#L14)

</td>
</tr>
</tbody>
</table>

***

### CoercionSerializer

```ts
const CoercionSerializer: {
  name: string;
  serialize: (args: SerializerArgsType) => any;
  serializePlaces: string[];
};
```

Defined in: [src/serializers/coercion.ts:4](https://github.com/metatyper/metatyper/blob/main/src/serializers/coercion.ts#L4)

Serializes values by delegating to the meta type's `castToRawValue` implementation.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-22"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'CoercionSerializer'`

</td>
<td>

[src/serializers/coercion.ts:5](https://github.com/metatyper/metatyper/blob/main/src/serializers/coercion.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="serialize-37"></a> `serialize()`

</td>
<td>

(`args`: [`SerializerArgsType`](#serializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/coercion.ts:7](https://github.com/metatyper/metatyper/blob/main/src/serializers/coercion.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="serializeplaces-1"></a> `serializePlaces`

</td>
<td>

`string`[]

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/coercion.ts:9](https://github.com/metatyper/metatyper/blob/main/src/serializers/coercion.ts#L9)

</td>
</tr>
</tbody>
</table>

***

### FreezeObjectDeSerializer

```ts
const FreezeObjectDeSerializer: {
  deserialize: (__namedParameters: DeSerializerArgsType) => any;
  name: string;
};
```

Defined in: [src/serializers/freezeObject.ts:22](https://github.com/metatyper/metatyper/blob/main/src/serializers/freezeObject.ts#L22)

Deserializer that produces a frozen copy of objects/arrays to prevent mutation.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-38"></a> `deserialize()`

</td>
<td>

(`__namedParameters`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/freezeObject.ts:24](https://github.com/metatyper/metatyper/blob/main/src/serializers/freezeObject.ts#L24)

</td>
</tr>
<tr>
<td>

<a id="name-23"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'FreezeObjectDeSerializer'`

</td>
<td>

[src/serializers/freezeObject.ts:23](https://github.com/metatyper/metatyper/blob/main/src/serializers/freezeObject.ts#L23)

</td>
</tr>
</tbody>
</table>

***

### I()

```ts
const I: <T, IsNullishT, IsNullableT, IsOptionalT>(subType: Class<T>, args?: InstanceMetaTypeArgs<INSTANCE<T>, IsNullishT, IsNullableT, IsOptionalT>) => PrepareMetaType<INSTANCE<T>, IsNullishT, IsNullableT, IsOptionalT> = INSTANCE;
```

Defined in: [src/metatypes/types/instance.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L107)

Creates a meta type that validates values are instances of the provided class.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`IsNullishT` *extends* `boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`IsNullableT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
<tr>
<td>

`IsOptionalT` *extends* `boolean`

</td>
<td>

`IsNullishT`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`subType`

</td>
<td>

[`Class`](#class)\<`T`\>

</td>
<td>

Class or instance used as the target type.

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

[`InstanceMetaTypeArgs`](#instancemetatypeargs)\<[`INSTANCE`](#instance-1)\<`T`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

</td>
<td>

[InstanceMetaTypeArgs](#instancemetatypeargs) controlling subclass allowance and meta args.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PrepareMetaType`](#preparemetatype)\<[`INSTANCE`](#instance-1)\<`T`\>, `IsNullishT`, `IsNullableT`, `IsOptionalT`\>

#### Example

```ts
class A {
   a = 1
}

const obj1 = Meta({
     a: INSTANCE(A, { nullish: true })
}) // as { a: A | null | undefined }

obj1.a = new A()
obj1.a = {} // type & validation error
obj1.a = { a: 1 } // validation error
```

***

### IsMetaObjectSymbol

```ts
const IsMetaObjectSymbol: typeof IsMetaObjectSymbol;
```

Defined in: [src/metaobjects/symbols.ts:1](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/symbols.ts#L1)

***

### IsMetaTypeSymbol

```ts
const IsMetaTypeSymbol: typeof IsMetaTypeSymbol;
```

Defined in: [src/metatypes/metatype.ts:5](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L5)

Symbol flag injected into every runtime meta type wrapper.

***

### M

```ts
const M: typeof Meta = Meta;
```

Defined in: [src/metaobjects/meta.ts:251](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L251)

Alias for the `Meta`

***

### MetaIsMetaObject()

```ts
const MetaIsMetaObject: (metaObject?: object | null) => any;
```

Defined in: [src/metaobjects/meta.ts:387](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/meta.ts#L387)

Checks if the provided object is a meta object.

This function determines whether the given object has been enhanced with meta object behavior, such as runtime type checking, validation, and serialization capabilities.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject?`

</td>
<td>

`object` \| `null`

</td>
<td>

The object to check.

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

`true` if the object is a meta object, otherwise `false`.

#### Example

```ts
const metaObject = Meta({})

console.log(Meta.isMetaObject(metaObject)) // true

const plainObject = { id: 1, name: "John" }
console.log(Meta.isMetaObject(plainObject)) // false
```

***

### MetaObjectBaseSymbol

```ts
const MetaObjectBaseSymbol: typeof MetaObjectBaseSymbol;
```

Defined in: [src/metaobjects/symbols.ts:2](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/symbols.ts#L2)

***

### MetaObjectBuilderSymbol

```ts
const MetaObjectBuilderSymbol: typeof MetaObjectBuilderSymbol;
```

Defined in: [src/metaobjects/symbols.ts:4](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/symbols.ts#L4)

***

### MetaObjectInitialClassDeclarationsSymbol

```ts
const MetaObjectInitialClassDeclarationsSymbol: typeof MetaObjectInitialClassDeclarationsSymbol;
```

Defined in: [src/metaobjects/symbols.ts:7](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/symbols.ts#L7)

***

### MetaObjectProtoSymbol

```ts
const MetaObjectProtoSymbol: typeof MetaObjectProtoSymbol;
```

Defined in: [src/metaobjects/symbols.ts:3](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/symbols.ts#L3)

***

### MetaObjectRegistryInfoSymbol

```ts
const MetaObjectRegistryInfoSymbol: typeof MetaObjectRegistryInfoSymbol;
```

Defined in: [src/metaobjects/symbols.ts:6](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/symbols.ts#L6)

***

### MetaObjectRegistrySymbol

```ts
const MetaObjectRegistrySymbol: typeof MetaObjectRegistrySymbol;
```

Defined in: [src/metaobjects/symbols.ts:5](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/symbols.ts#L5)

***

### MetaTypeImplSymbol

```ts
const MetaTypeImplSymbol: typeof MetaTypeImplSymbol;
```

Defined in: [src/metatypes/metatype.ts:8](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatype.ts#L8)

Symbol pointing to the backing `MetaTypeImpl` used by a runtime meta type.

***

### MetaTypeValidator

```ts
const MetaTypeValidator: {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean | Error;
};
```

Defined in: [src/validators/metaTypeValidator.ts:4](https://github.com/metatyper/metatyper/blob/main/src/validators/metaTypeValidator.ts#L4)

Validator that delegates compatibility checks to the current meta type implementation.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-24"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'MetaType'`

</td>
<td>

[src/validators/metaTypeValidator.ts:5](https://github.com/metatyper/metatyper/blob/main/src/validators/metaTypeValidator.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="validate-37"></a> `validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean` \| `Error`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/metaTypeValidator.ts:6](https://github.com/metatyper/metatyper/blob/main/src/validators/metaTypeValidator.ts#L6)

</td>
</tr>
</tbody>
</table>

***

### NotEmptyValidator

```ts
const NotEmptyValidator: {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/lengthValidators.ts:4](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L4)

Validator ensuring value has a non-zero `length`.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-25"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'NotEmpty'`

</td>
<td>

[src/validators/lengthValidators.ts:5](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="validate-38"></a> `validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/lengthValidators.ts:6](https://github.com/metatyper/metatyper/blob/main/src/validators/lengthValidators.ts#L6)

</td>
</tr>
</tbody>
</table>

***

### NullableValidator

```ts
const NullableValidator: {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/nullableValidator.ts:4](https://github.com/metatyper/metatyper/blob/main/src/validators/nullableValidator.ts#L4)

Validator that rejects `null` values.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-26"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'Nullable'`

</td>
<td>

[src/validators/nullableValidator.ts:5](https://github.com/metatyper/metatyper/blob/main/src/validators/nullableValidator.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="validate-39"></a> `validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/nullableValidator.ts:6](https://github.com/metatyper/metatyper/blob/main/src/validators/nullableValidator.ts#L6)

</td>
</tr>
</tbody>
</table>

***

### OptionalValidator

```ts
const OptionalValidator: {
  name: string;
  validate: (__namedParameters: ValidatorArgsType) => boolean;
};
```

Defined in: [src/validators/optionalValidator.ts:4](https://github.com/metatyper/metatyper/blob/main/src/validators/optionalValidator.ts#L4)

Validator that rejects `undefined` values.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-27"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'Optional'`

</td>
<td>

[src/validators/optionalValidator.ts:5](https://github.com/metatyper/metatyper/blob/main/src/validators/optionalValidator.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="validate-40"></a> `validate()`

</td>
<td>

(`__namedParameters`: [`ValidatorArgsType`](#validatorargstype)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

[src/validators/optionalValidator.ts:6](https://github.com/metatyper/metatyper/blob/main/src/validators/optionalValidator.ts#L6)

</td>
</tr>
</tbody>
</table>

***

### SubValuesDeSerializer

```ts
const SubValuesDeSerializer: {
  deserialize: (args: DeSerializerArgsType) => any;
  name: string;
};
```

Defined in: [src/serializers/subValues.ts:18](https://github.com/metatyper/metatyper/blob/main/src/serializers/subValues.ts#L18)

Deserializer counterpart that delegates to `deserializeSubValues` when available on the meta type.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-39"></a> `deserialize()`

</td>
<td>

(`args`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/subValues.ts:20](https://github.com/metatyper/metatyper/blob/main/src/serializers/subValues.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="name-28"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'SubValuesDeSerializer'`

</td>
<td>

[src/serializers/subValues.ts:19](https://github.com/metatyper/metatyper/blob/main/src/serializers/subValues.ts#L19)

</td>
</tr>
</tbody>
</table>

***

### SubValuesSerializer

```ts
const SubValuesSerializer: {
  name: string;
  serialize: (args: SerializerArgsType) => any;
};
```

Defined in: [src/serializers/subValues.ts:7](https://github.com/metatyper/metatyper/blob/main/src/serializers/subValues.ts#L7)

Serializer that delegates serialization of entries/children to the meta type implementation.
Structural meta types override `serializeSubValues` to customize this behavior.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-29"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'SubValuesSerializer'`

</td>
<td>

[src/serializers/subValues.ts:8](https://github.com/metatyper/metatyper/blob/main/src/serializers/subValues.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="serialize-38"></a> `serialize()`

</td>
<td>

(`args`: [`SerializerArgsType`](#serializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/subValues.ts:9](https://github.com/metatyper/metatyper/blob/main/src/serializers/subValues.ts#L9)

</td>
</tr>
</tbody>
</table>

***

### ToLowerCaseDeSerializer

```ts
const ToLowerCaseDeSerializer: {
  deserialize: (__namedParameters: DeSerializerArgsType) => any;
  name: string;
};
```

Defined in: [src/serializers/stringCase.ts:4](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringCase.ts#L4)

Deserializer that lowercases string values.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-40"></a> `deserialize()`

</td>
<td>

(`__namedParameters`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/stringCase.ts:6](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringCase.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="name-30"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'ToLowerCaseDeSerializer'`

</td>
<td>

[src/serializers/stringCase.ts:5](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringCase.ts#L5)

</td>
</tr>
</tbody>
</table>

***

### ToUpperCaseDeSerializer

```ts
const ToUpperCaseDeSerializer: {
  deserialize: (__namedParameters: DeSerializerArgsType) => any;
  name: string;
};
```

Defined in: [src/serializers/stringCase.ts:11](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringCase.ts#L11)

Deserializer that uppercases string values.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-41"></a> `deserialize()`

</td>
<td>

(`__namedParameters`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/stringCase.ts:13](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringCase.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="name-31"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'ToUpperCaseDeSerializer'`

</td>
<td>

[src/serializers/stringCase.ts:12](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringCase.ts#L12)

</td>
</tr>
</tbody>
</table>

***

### TrimDeSerializer

```ts
const TrimDeSerializer: {
  deserialize: (__namedParameters: DeSerializerArgsType) => any;
  name: string;
};
```

Defined in: [src/serializers/stringTrim.ts:4](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringTrim.ts#L4)

Deserializer that trims whitespace from string values.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-42"></a> `deserialize()`

</td>
<td>

(`__namedParameters`: [`DeSerializerArgsType`](#deserializerargstype)) => `any`

</td>
<td>

&hyphen;

</td>
<td>

[src/serializers/stringTrim.ts:6](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringTrim.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="name-32"></a> `name`

</td>
<td>

`string`

</td>
<td>

`'TrimDeSerializer'`

</td>
<td>

[src/serializers/stringTrim.ts:5](https://github.com/metatyper/metatyper/blob/main/src/serializers/stringTrim.ts#L5)

</td>
</tr>
</tbody>
</table>

## Classes

### AnyImpl

Defined in: [src/metatypes/types/any.ts:5](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/any.ts#L5)

Implementation for the unconstrained `ANY` meta type.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new AnyImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): AnyImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`AnyImpl`](#anyimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(_value: any): boolean;
```

Defined in: [src/metatypes/types/any.ts:6](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/any.ts#L6)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### ArrayImpl

Defined in: [src/metatypes/types/array.ts:51](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L51)

Base implementation shared by ARRAY/OBJECT/TUPLE/UNION meta types.
Adds automatic handling for nested structures, recursive references and sub-value (de)serialization.

#### Extends

- [`StructuralMetaTypeImpl`](#structuralmetatypeimpl)

#### Constructors

##### Constructor

```ts
new ArrayImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): ArrayImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`ArrayImpl`](#arrayimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`constructor`](#constructor-22)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToRawValue`](#casttorawvalue-28)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToType`](#casttotype-28)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`deserialize`](#deserialize-30)

##### deserializeSubValues()

```ts
deserializeSubValues(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/array.ts:173](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L173)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/types/\_lazy.ts:21](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L21)

Resolves (and caches) the prepared subtype, executing lazy factories when needed.

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getSubType`](#getsubtype-28)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | ValidationError;
```

Defined in: [src/metatypes/types/array.ts:108](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L108)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| [`ValidationError`](#validationerror)

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-28)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`rebuild`](#rebuild-28)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`serialize`](#serialize-30)

##### serializeSubValues()

```ts
serializeSubValues(__namedParameters: SerializerArgsType): any;
```

Defined in: [src/metatypes/types/array.ts:156](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L156)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/\_structural.ts:150](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L150)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`toString`](#tostring-28)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`validate`](#validate-30)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`build`](#build-30)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-28)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/array.ts:194](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L194)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-28)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaType`](#getmetatype-28)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-28)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-28)

##### isCompatible()

```ts
static isCompatible(value: any): boolean;
```

Defined in: [src/metatypes/types/array.ts:190](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/array.ts#L190)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`isCompatible`](#iscompatible-28)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`registerMetaType`](#registermetatype-28)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-1"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`id`](#id-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-1"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeArgs`](#metatypeargs-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`name`](#name-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-1"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### BigIntImpl

Defined in: [src/metatypes/types/bigint.ts:12](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/bigint.ts#L12)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new BigIntImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): BigIntImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`BigIntImpl`](#bigintimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(__namedParameters: SerializerArgsType): any;
```

Defined in: [src/metatypes/types/bigint.ts:55](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/bigint.ts#L55)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/bigint.ts:35](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/bigint.ts#L35)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/bigint.ts:63](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/bigint.ts#L63)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(value: any): value is bigint;
```

Defined in: [src/metatypes/types/bigint.ts:59](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/bigint.ts#L59)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`value is bigint`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-2"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-2"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-2"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-2"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### BooleanImpl

Defined in: [src/metatypes/types/boolean.ts:19](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L19)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new BooleanImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): BooleanImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`BooleanImpl`](#booleanimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(__namedParameters: DeSerializerArgsType): boolean;
```

Defined in: [src/metatypes/types/boolean.ts:36](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L36)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/boolean.ts:44](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L44)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(value: any): value is boolean;
```

Defined in: [src/metatypes/types/boolean.ts:40](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/boolean.ts#L40)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`value is boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-3"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-3"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-3"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-3"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### DateImpl

Defined in: [src/metatypes/types/date.ts:44](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L44)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new DateImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): DateImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`DateImpl`](#dateimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(__namedParameters: SerializerArgsType): any;
```

Defined in: [src/metatypes/types/date.ts:99](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L99)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/date.ts:87](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L87)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/date.ts:107](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L107)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(value: any): value is Date;
```

Defined in: [src/metatypes/types/date.ts:103](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/date.ts#L103)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`value is Date`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-4"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-4"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-4"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-4"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### InstanceImpl

Defined in: [src/metatypes/types/instance.ts:17](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L17)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new InstanceImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): InstanceImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`InstanceImpl`](#instanceimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean;
```

Defined in: [src/metatypes/types/instance.ts:45](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L45)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/instance.ts:41](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L41)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/instance.ts:66](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L66)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(value: any): any;
```

Defined in: [src/metatypes/types/instance.ts:57](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/instance.ts#L57)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-5"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-5"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-5"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-5"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### IntegerImpl

Defined in: [src/metatypes/types/integer.ts:11](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/integer.ts#L11)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new IntegerImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): IntegerImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`IntegerImpl`](#integerimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/integer.ts:34](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/integer.ts#L34)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(value: any): boolean;
```

Defined in: [src/metatypes/types/integer.ts:58](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/integer.ts#L58)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-6"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-6"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-6"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-6"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### `abstract` LazyMetaTypeImpl

Defined in: [src/metatypes/types/\_lazy.ts:16](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L16)

Base class for meta types whose subtype can be provided lazily via a function.
Ensures recursive references are prepared only once and tracks parent builders.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Extended by

- [`RefImpl`](#refimpl)
- [`StructuralMetaTypeImpl`](#structuralmetatypeimpl)

#### Constructors

##### Constructor

```ts
new LazyMetaTypeImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): LazyMetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`LazyMetaTypeImpl`](#lazymetatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/types/\_lazy.ts:21](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L21)

Resolves (and caches) the prepared subtype, executing lazy factories when needed.

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(_value: any): boolean;
```

Defined in: [src/metatypes/metatypeImpl.ts:572](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L572)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-7"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-7"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-7"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-7"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### LiteralImpl

Defined in: [src/metatypes/types/literal.ts:5](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/literal.ts#L5)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new LiteralImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): LiteralImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`LiteralImpl`](#literalimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean;
```

Defined in: [src/metatypes/types/literal.ts:10](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/literal.ts#L10)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/literal.ts:6](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/literal.ts#L6)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(_value: any): boolean;
```

Defined in: [src/metatypes/types/literal.ts:16](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/literal.ts#L16)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-8"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-8"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-8"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-8"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### MetaError

Defined in: [src/errors/meta.error.ts:2](https://github.com/metatyper/metatyper/blob/main/src/errors/meta.error.ts#L2)

Base class for all MetaTyper-specific runtime errors.

#### Extends

- `Error`

#### Extended by

- [`MetaTypeSerializationError`](#metatypeserializationerror)
- [`MetaTypeValidatorError`](#metatypevalidatorerror)
- [`ValidationError`](#validationerror)

#### Constructors

##### Constructor

```ts
new MetaError(message?: string): MetaError;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaError`](#metaerror)

###### Inherited from

```ts
Error.constructor
```

***

### MetaObjectsBuilder

Defined in: [src/metaobjects/builder.ts:20](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L20)

Constructs meta objects/classes by wrapping plain prototypes with validation/serialization logic.
Acts as a factory as well as a registry synchroniser for meta instances.

#### Accessors

##### instance

###### Get Signature

```ts
get static instance(): MetaObjectsBuilder;
```

Defined in: [src/metaobjects/builder.ts:24](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L24)

Global builder singleton used by `Meta` utilities.

###### Returns

[`MetaObjectsBuilder`](#metaobjectsbuilder)

#### Constructors

##### Constructor

```ts
new MetaObjectsBuilder(): MetaObjectsBuilder;
```

###### Returns

[`MetaObjectsBuilder`](#metaobjectsbuilder)

#### Methods

##### addInitialClassDeclarationInfo()

```ts
addInitialClassDeclarationInfo(clsOrPrototype: Record<keyof any, any>, declarationInfo: InitialClassPropertyDeclarationInfo): void;
```

Defined in: [src/metaobjects/builder.ts:99](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L99)

Stores metadata describing declarations defined via `Meta.declare` so builder can replay them later.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`clsOrPrototype`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`declarationInfo`

</td>
<td>

[`InitialClassPropertyDeclarationInfo`](#initialclasspropertydeclarationinfo)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### build()

```ts
build<T>(protoObject?: T, metaArgs?: MetaArgsType): T;
```

Defined in: [src/metaobjects/builder.ts:40](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L40)

Creates a meta object/class/function proxy for a given prototype and meta arguments.
Exposed via `Meta()` helper.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`protoObject?`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`metaArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### configure()

```ts
configure<T>(metaObject: T, metaArgs: MetaArgsType): T;
```

Defined in: [src/metaobjects/builder.ts:82](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L82)

Reconfigures an existing meta object with new meta arguments.
Throws when the provided value is not a meta instance.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`metaArgs`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### copy()

```ts
copy<T>(metaObject: T): T | null;
```

Defined in: [src/metaobjects/builder.ts:61](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L61)

Clones an existing meta object by reusing its prototype, args and declarations.
Returns `null` when called with a non-meta object.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObject`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

###### Returns

`T` \| `null`

##### setDefaultBuilderInstance()

```ts
static setDefaultBuilderInstance(builder: MetaObjectsBuilder): void;
```

Defined in: [src/metaobjects/builder.ts:29](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L29)

Overrides the global singleton (mainly for testing/extensibility).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`builder`

</td>
<td>

[`MetaObjectsBuilder`](#metaobjectsbuilder)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="handler"></a> `handler`

</td>
<td>

[`MetaObjectsHandler`](#metaobjectshandler)

</td>
<td>

[src/metaobjects/builder.ts:34](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="registry"></a> `registry`

</td>
<td>

[`MetaObjectsRegistry`](#metaobjectsregistry)

</td>
<td>

[src/metaobjects/builder.ts:33](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/builder.ts#L33)

</td>
</tr>
</tbody>
</table>

***

### MetaObjectsHandler

Defined in: [src/metaobjects/handler.ts:20](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L20)

Contains all proxy traps and helper utilities used by meta objects.
Responsible for emitting change/error events and enforcing validation/serialization rules.

#### Accessors

##### builtinIgnoredProps

###### Get Signature

```ts
get builtinIgnoredProps(): (string | symbol)[];
```

Defined in: [src/metaobjects/handler.ts:37](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L37)

Copy of property names that are always ignored by meta proxies.

###### Returns

(`string` \| `symbol`)[]

#### Constructors

##### Constructor

```ts
new MetaObjectsHandler(builder: MetaObjectsBuilder): MetaObjectsHandler;
```

Defined in: [src/metaobjects/handler.ts:44](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L44)

Creates a handler bound to a particular builder/registry pair.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`builder`

</td>
<td>

[`MetaObjectsBuilder`](#metaobjectsbuilder)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaObjectsHandler`](#metaobjectshandler)

#### Methods

##### copy()

```ts
copy<T>(targetObject: T): T | null;
```

Defined in: [src/metaobjects/handler.ts:1081](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L1081)

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `object`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

###### Returns

`T` \| `null`

##### copyBaseObject()

```ts
copyBaseObject(originalBaseObject: Record<keyof any, any>, newBaseObject: Record<keyof any, any>): null | undefined;
```

Defined in: [src/metaobjects/handler.ts:285](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L285)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`originalBaseObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`newBaseObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `undefined`

##### deserialize()

```ts
deserialize(
   targetObject: Record<keyof any, any>, 
   rawObject: Record<keyof any, any>, 
   deserializeArgs?: DeSerializeMetaObjectArgsType): Record<string | number | symbol, any> | null;
```

Defined in: [src/metaobjects/handler.ts:983](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L983)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`rawObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`deserializeArgs?`

</td>
<td>

[`DeSerializeMetaObjectArgsType`](#deserializemetaobjectargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`Record`\<`string` \| `number` \| `symbol`, `any`\> \| `null`

##### getObjectNameAndType()

```ts
getObjectNameAndType(protoObject: any, metaArgs: MetaArgsType): {
  name: string;
  type: MetaObjectTypeName;
};
```

Defined in: [src/metaobjects/handler.ts:87](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L87)

Figures out a human-readable name/type used in inspector output.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`protoObject`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaArgs`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

```ts
{
  name: string;
  type: MetaObjectTypeName;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

[src/metaobjects/handler.ts:112](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L112)

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

[`MetaObjectTypeName`](#metaobjecttypename)

</td>
<td>

[src/metaobjects/handler.ts:112](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L112)

</td>
</tr>
</tbody>
</table>

##### initBaseObject()

```ts
initBaseObject(baseObject: Record<keyof any, any>, _protoObject: Record<keyof any, any>): void;
```

Defined in: [src/metaobjects/handler.ts:274](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L274)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`_protoObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### initProp()

```ts
initProp(
   baseObject: Record<keyof any, any>, 
   propName: string | symbol, 
   descriptor?: PropertyDescriptor, 
   declaration?: MetaTypeImpl): void;
```

Defined in: [src/metaobjects/handler.ts:298](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L298)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`descriptor?`

</td>
<td>

`PropertyDescriptor`

</td>
</tr>
<tr>
<td>

`declaration?`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### isIgnoredProp()

```ts
isIgnoredProp(
   baseObject: Record<keyof any, any>, 
   propName: string | symbol, 
   registryInfo?: MetaObjectRegistryInfo): boolean;
```

Defined in: [src/metaobjects/handler.ts:116](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L116)

Checks whether the provided property should be ignored for a particular meta object.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`registryInfo?`

</td>
<td>

[`MetaObjectRegistryInfo`](#metaobjectregistryinfo)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### proxyDefineProperty()

```ts
proxyDefineProperty(
   baseObject: Record<keyof any, any>, 
   propName: string | symbol, 
   newDescriptor: PropertyDescriptor): true;
```

Defined in: [src/metaobjects/handler.ts:583](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L583)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`newDescriptor`

</td>
<td>

`PropertyDescriptor`

</td>
</tr>
</tbody>
</table>

###### Returns

`true`

##### proxyDeleteProperty()

```ts
proxyDeleteProperty(baseObject: Record<keyof any, any>, propName: string | symbol): true;
```

Defined in: [src/metaobjects/handler.ts:783](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L783)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`true`

##### proxyGetOwnPropertyDescriptor()

```ts
proxyGetOwnPropertyDescriptor(targetObject: Record<keyof any, any>, propName: string | symbol): TypedPropertyDescriptor<any> | undefined;
```

Defined in: [src/metaobjects/handler.ts:874](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L874)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`TypedPropertyDescriptor`\<`any`\> \| `undefined`

##### proxyGetValue()

```ts
proxyGetValue(
   baseObject: object, 
   propName: string | symbol, 
   targetObject: object): any;
```

Defined in: [src/metaobjects/handler.ts:429](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L429)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`targetObject`

</td>
<td>

`object`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### proxyHas()

```ts
proxyHas(targetObject: Record<keyof any, any>, propName: string | symbol): boolean;
```

Defined in: [src/metaobjects/handler.ts:866](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L866)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### proxyOwnKeys()

```ts
proxyOwnKeys(targetObject: Record<keyof any, any>): (string | symbol)[];
```

Defined in: [src/metaobjects/handler.ts:870](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L870)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
</tbody>
</table>

###### Returns

(`string` \| `symbol`)[]

##### proxySetValue()

```ts
proxySetValue(
   baseObject: object, 
   propName: string | symbol, 
   newValue: any, 
   targetObject: object): true;
```

Defined in: [src/metaobjects/handler.ts:492](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L492)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`baseObject`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`propName`

</td>
<td>

`string` \| `symbol`

</td>
</tr>
<tr>
<td>

`newValue`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`targetObject`

</td>
<td>

`object`

</td>
</tr>
</tbody>
</table>

###### Returns

`true`

##### represent()

```ts
represent(targetObject: any): string;
```

Defined in: [src/metaobjects/handler.ts:143](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L143)

Builds a readable string representation of a meta object (used in `toString`).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### serialize()

```ts
serialize(targetObject: Record<keyof any, any>, serializeArgs?: SerializeMetaObjectArgsType): Record<string, any> | null;
```

Defined in: [src/metaobjects/handler.ts:929](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L929)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`serializeArgs?`

</td>
<td>

[`SerializeMetaObjectArgsType`](#serializemetaobjectargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`Record`\<`string`, `any`\> \| `null`

##### validate()

```ts
validate(
   targetObject: Record<keyof any, any>, 
   rawObject: Record<keyof any, any>, 
   validateArgs?: ValidateMetaObjectArgsType): ValidationError | undefined;
```

Defined in: [src/metaobjects/handler.ts:881](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L881)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`targetObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`rawObject`

</td>
<td>

`Record`\<keyof `any`, `any`\>

</td>
</tr>
<tr>
<td>

`validateArgs?`

</td>
<td>

[`ValidateMetaObjectArgsType`](#validatemetaobjectargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="builder"></a> `builder`

</td>
<td>

`public`

</td>
<td>

[`MetaObjectsBuilder`](#metaobjectsbuilder)

</td>
<td>

[src/metaobjects/handler.ts:44](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L44)

</td>
</tr>
<tr>
<td>

<a id="registry-1"></a> `registry`

</td>
<td>

`public`

</td>
<td>

[`MetaObjectsRegistry`](#metaobjectsregistry)

</td>
<td>

[src/metaobjects/handler.ts:41](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/handler.ts#L41)

</td>
</tr>
</tbody>
</table>

***

### MetaObjectsRegistry

Defined in: [src/metaobjects/registry.ts:80](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L80)

Lightweight registry that keeps metadata for every meta object/base object pair.

#### Constructors

##### Constructor

```ts
new MetaObjectsRegistry(): MetaObjectsRegistry;
```

###### Returns

[`MetaObjectsRegistry`](#metaobjectsregistry)

#### Methods

##### get()

```ts
get(metaObjectOrBaseObject: object): 
  | {
  autoResolveMetaTypes: boolean;
  baseObject: object;
  builder: MetaObjectsBuilder;
  buildMetaInstance?: boolean;
  changeHandlers: MetaChangeHandlerInfoType[];
  declarations: Record<string | symbol, MetaTypeImpl>;
  dynamicDeclarations: boolean;
  errorHandlers: MetaErrorHandlerInfoType[];
  ignoreProps:   | (string | symbol)[]
     | (propName: string | symbol) => boolean;
  initialClassPropertiesDeclarations: Record<string | symbol, InitialClassPropertyDeclarationInfo>;
  metaArgs: MetaArgsType;
  metaInstanceArgs?: MetaArgsType | "same";
  metaTypesArgs:   | MetaTypeArgsType
     | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType;
  metaTypesResolver: MetaTypesResolver;
  name: string;
  protoObject: object;
  serializationIsActive: boolean;
  type: MetaObjectTypeName;
  validationIsActive: boolean;
}
  | undefined;
```

Defined in: [src/metaobjects/registry.ts:95](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L95)

Returns a shallow copy of the registry info for the provided proxy/base object.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObjectOrBaseObject`

</td>
<td>

`object`

</td>
</tr>
</tbody>
</table>

###### Returns

```ts
{
  autoResolveMetaTypes: boolean;
  baseObject: object;
  builder: MetaObjectsBuilder;
  buildMetaInstance?: boolean;
  changeHandlers: MetaChangeHandlerInfoType[];
  declarations: Record<string | symbol, MetaTypeImpl>;
  dynamicDeclarations: boolean;
  errorHandlers: MetaErrorHandlerInfoType[];
  ignoreProps:   | (string | symbol)[]
     | (propName: string | symbol) => boolean;
  initialClassPropertiesDeclarations: Record<string | symbol, InitialClassPropertyDeclarationInfo>;
  metaArgs: MetaArgsType;
  metaInstanceArgs?: MetaArgsType | "same";
  metaTypesArgs:   | MetaTypeArgsType
     | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType;
  metaTypesResolver: MetaTypesResolver;
  name: string;
  protoObject: object;
  serializationIsActive: boolean;
  type: MetaObjectTypeName;
  validationIsActive: boolean;
}
```

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`autoResolveMetaTypes`

</td>
<td>

`boolean`

</td>
<td>

Whether auto resolution of types is enabled.

</td>
<td>

[src/metaobjects/registry.ts:67](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L67)

</td>
</tr>
<tr>
<td>

`baseObject`

</td>
<td>

`object`

</td>
<td>

Actual proxy object exposed to the user.

</td>
<td>

[src/metaobjects/registry.ts:31](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L31)

</td>
</tr>
<tr>
<td>

`builder`

</td>
<td>

[`MetaObjectsBuilder`](#metaobjectsbuilder)

</td>
<td>

Builder instance that created/configures this meta object.

</td>
<td>

[src/metaobjects/registry.ts:22](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L22)

</td>
</tr>
<tr>
<td>

`buildMetaInstance?`

</td>
<td>

`boolean`

</td>
<td>

Whether instances should automatically be wrapped as meta objects.

</td>
<td>

[src/metaobjects/registry.ts:76](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L76)

</td>
</tr>
<tr>
<td>

`changeHandlers`

</td>
<td>

[`MetaChangeHandlerInfoType`](#metachangehandlerinfotype)[]

</td>
<td>

Registered change handlers.

</td>
<td>

[src/metaobjects/registry.ts:55](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L55)

</td>
</tr>
<tr>
<td>

`declarations`

</td>
<td>

`Record`\<`string` \| `symbol`, [`MetaTypeImpl`](#metatypeimpl)\>

</td>
<td>

Current meta type declarations for known properties.

</td>
<td>

[src/metaobjects/registry.ts:43](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L43)

</td>
</tr>
<tr>
<td>

`dynamicDeclarations`

</td>
<td>

`boolean`

</td>
<td>

Whether dynamic declarations are allowed.

</td>
<td>

[src/metaobjects/registry.ts:70](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L70)

</td>
</tr>
<tr>
<td>

`errorHandlers`

</td>
<td>

[`MetaErrorHandlerInfoType`](#metaerrorhandlerinfotype)[]

</td>
<td>

Registered error handlers.

</td>
<td>

[src/metaobjects/registry.ts:58](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L58)

</td>
</tr>
<tr>
<td>

`ignoreProps`

</td>
<td>

  \| (`string` \| `symbol`)[]
  \| (`propName`: `string` \| `symbol`) => `boolean`

</td>
<td>

Ignored prop list or predicate.

</td>
<td>

[src/metaobjects/registry.ts:46](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L46)

</td>
</tr>
<tr>
<td>

`initialClassPropertiesDeclarations`

</td>
<td>

`Record`\<`string` \| `symbol`, [`InitialClassPropertyDeclarationInfo`](#initialclasspropertydeclarationinfo)\>

</td>
<td>

Deferred class property declarations registered via `Meta.declare`.

</td>
<td>

[src/metaobjects/registry.ts:37](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L37)

</td>
</tr>
<tr>
<td>

`metaArgs`

</td>
<td>

[`MetaArgsType`](#metaargstype)

</td>
<td>

Meta arguments applied during build.

</td>
<td>

[src/metaobjects/registry.ts:19](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L19)

</td>
</tr>
<tr>
<td>

`metaInstanceArgs?`

</td>
<td>

[`MetaArgsType`](#metaargstype) \| `"same"`

</td>
<td>

Meta arguments used when building instances of meta classes.

</td>
<td>

[src/metaobjects/registry.ts:73](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L73)

</td>
</tr>
<tr>
<td>

`metaTypesArgs`

</td>
<td>

  \| [`MetaTypeArgsType`](#metatypeargstype)
  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Default meta type arguments or resolver callback.

</td>
<td>

[src/metaobjects/registry.ts:61](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L61)

</td>
</tr>
<tr>
<td>

`metaTypesResolver`

</td>
<td>

[`MetaTypesResolver`](#metatypesresolver-1)

</td>
<td>

Custom meta type resolver.

</td>
<td>

[src/metaobjects/registry.ts:64](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L64)

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

Human readable label (used in `toString`).

</td>
<td>

[src/metaobjects/registry.ts:25](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L25)

</td>
</tr>
<tr>
<td>

`protoObject`

</td>
<td>

`object`

</td>
<td>

Original prototype/class/function.

</td>
<td>

[src/metaobjects/registry.ts:34](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L34)

</td>
</tr>
<tr>
<td>

`serializationIsActive`

</td>
<td>

`boolean`

</td>
<td>

Whether serialization/deserialization is active.

</td>
<td>

[src/metaobjects/registry.ts:52](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L52)

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

[`MetaObjectTypeName`](#metaobjecttypename)

</td>
<td>

Classification (class/function/instance/etc).

</td>
<td>

[src/metaobjects/registry.ts:28](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L28)

</td>
</tr>
<tr>
<td>

`validationIsActive`

</td>
<td>

`boolean`

</td>
<td>

Whether validation is active.

</td>
<td>

[src/metaobjects/registry.ts:49](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L49)

</td>
</tr>
</tbody>
</table>

`undefined`

##### has()

```ts
has(metaObjectOrBaseObject: object): boolean;
```

Defined in: [src/metaobjects/registry.ts:84](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L84)

Checks whether registry info exists for the provided proxy or base object.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObjectOrBaseObject`

</td>
<td>

`object`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### set()

```ts
set(metaObjectOrBaseObject: object, info: MetaObjectRegistryInfo): WeakMap<object, MetaObjectRegistryInfo>;
```

Defined in: [src/metaobjects/registry.ts:108](https://github.com/metatyper/metatyper/blob/main/src/metaobjects/registry.ts#L108)

Stores registry info for the provided proxy/base object.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaObjectOrBaseObject`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`info`

</td>
<td>

[`MetaObjectRegistryInfo`](#metaobjectregistryinfo)

</td>
</tr>
</tbody>
</table>

###### Returns

`WeakMap`\<`object`, [`MetaObjectRegistryInfo`](#metaobjectregistryinfo)\>

***

### MetaTypeDeSerializerError

Defined in: [src/errors/serialization.error.ts:57](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L57)

Error describing a deserializer failure (e.g., coercion, custom deserializer).
Carries the deserializer definition plus context (value, meta type, place).

#### Extends

- [`MetaTypeSerializationError`](#metatypeserializationerror)

#### Constructors

##### Constructor

```ts
new MetaTypeDeSerializerError(deserializer: DeSerializerType, deserializerErrorArgs: DeSerializerErrorArgsType): MetaTypeDeSerializerError;
```

Defined in: [src/errors/serialization.error.ts:61](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L61)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializer`

</td>
<td>

[`DeSerializerType`](#deserializertype)

</td>
</tr>
<tr>
<td>

`deserializerErrorArgs`

</td>
<td>

[`DeSerializerErrorArgsType`](#deserializererrorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeDeSerializerError`](#metatypedeserializererror)

###### Overrides

[`MetaTypeSerializationError`](#metatypeserializationerror).[`constructor`](#constructor-15)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserializer"></a> `deserializer`

</td>
<td>

`readonly`

</td>
<td>

[`DeSerializerType`](#deserializertype)

</td>
<td>

[src/errors/serialization.error.ts:58](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="deserializererrorargs"></a> `deserializerErrorArgs`

</td>
<td>

`readonly`

</td>
<td>

[`DeSerializerErrorArgsType`](#deserializererrorargstype)

</td>
<td>

[src/errors/serialization.error.ts:59](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L59)

</td>
</tr>
</tbody>
</table>

***

### MetaTypeImpl

Defined in: [src/metatypes/metatypeImpl.ts:214](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L214)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extended by

- [`LazyMetaTypeImpl`](#lazymetatypeimpl)
- [`AnyImpl`](#anyimpl)
- [`BigIntImpl`](#bigintimpl)
- [`BooleanImpl`](#booleanimpl)
- [`DateImpl`](#dateimpl)
- [`InstanceImpl`](#instanceimpl)
- [`IntegerImpl`](#integerimpl)
- [`LiteralImpl`](#literalimpl)
- [`NumberImpl`](#numberimpl)
- [`StringImpl`](#stringimpl)

#### Constructors

##### Constructor

```ts
new MetaTypeImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

##### isCompatible()

```ts
static isCompatible(_value: any): boolean;
```

Defined in: [src/metatypes/metatypeImpl.ts:572](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L572)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-9"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-9"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-9"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-9"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### `abstract` MetaTypeSerializationError

Defined in: [src/errors/serialization.error.ts:11](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L11)

Base class for all serialization/deserialization failures emitted by meta types.

#### Extends

- [`MetaError`](#metaerror)

#### Extended by

- [`MetaTypeSerializerError`](#metatypeserializererror)
- [`MetaTypeDeSerializerError`](#metatypedeserializererror)

#### Constructors

##### Constructor

```ts
new MetaTypeSerializationError(message?: string): MetaTypeSerializationError;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeSerializationError`](#metatypeserializationerror)

###### Inherited from

[`MetaError`](#metaerror).[`constructor`](#constructor-9)

***

### MetaTypeSerializerError

Defined in: [src/errors/serialization.error.ts:23](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L23)

Error describing a serializer failure (e.g., coercion, custom serializer).
Carries the serializer definition plus context (value, meta type, place).

#### Extends

- [`MetaTypeSerializationError`](#metatypeserializationerror)

#### Constructors

##### Constructor

```ts
new MetaTypeSerializerError(serializer: SerializerType, serializerErrorArgs: SerializerErrorArgsType): MetaTypeSerializerError;
```

Defined in: [src/errors/serialization.error.ts:27](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L27)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializer`

</td>
<td>

[`SerializerType`](#serializertype)

</td>
</tr>
<tr>
<td>

`serializerErrorArgs`

</td>
<td>

[`SerializerErrorArgsType`](#serializererrorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeSerializerError`](#metatypeserializererror)

###### Overrides

[`MetaTypeSerializationError`](#metatypeserializationerror).[`constructor`](#constructor-15)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="serializer"></a> `serializer`

</td>
<td>

`readonly`

</td>
<td>

[`SerializerType`](#serializertype)

</td>
<td>

[src/errors/serialization.error.ts:24](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L24)

</td>
</tr>
<tr>
<td>

<a id="serializererrorargs"></a> `serializerErrorArgs`

</td>
<td>

`readonly`

</td>
<td>

[`SerializerErrorArgsType`](#serializererrorargstype)

</td>
<td>

[src/errors/serialization.error.ts:25](https://github.com/metatyper/metatyper/blob/main/src/errors/serialization.error.ts#L25)

</td>
</tr>
</tbody>
</table>

***

### MetaTypeValidatorError

Defined in: [src/errors/validation.error.ts:19](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L19)

Error describing a single validator failure.
Exposes helpers like `code`, `path`, `value`, and `targetObject`.

#### Extends

- [`MetaError`](#metaerror)

#### Accessors

##### code

###### Get Signature

```ts
get code(): string;
```

Defined in: [src/errors/validation.error.ts:25](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L25)

Identifier for the validator (name or 'Unknown').

###### Returns

`string`

##### path

###### Get Signature

```ts
get path(): (string | number | symbol)[];
```

Defined in: [src/errors/validation.error.ts:30](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L30)

Path to the property within the validated object.

###### Returns

(`string` \| `number` \| `symbol`)[]

##### targetObject

###### Get Signature

```ts
get targetObject(): object | undefined;
```

Defined in: [src/errors/validation.error.ts:40](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L40)

Meta object instance that was being validated.

###### Returns

`object` \| `undefined`

##### value

###### Get Signature

```ts
get value(): any;
```

Defined in: [src/errors/validation.error.ts:35](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L35)

Offending value.

###### Returns

`any`

#### Constructors

##### Constructor

```ts
new MetaTypeValidatorError(args: ValidatorErrorArgsType): MetaTypeValidatorError;
```

Defined in: [src/errors/validation.error.ts:44](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L44)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidatorErrorArgsType`](#validatorerrorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeValidatorError`](#metatypevalidatorerror)

###### Overrides

[`MetaError`](#metaerror).[`constructor`](#constructor-9)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="suberror"></a> `subError?`

</td>
<td>

`readonly`

</td>
<td>

`Error`

</td>
<td>

[src/errors/validation.error.ts:22](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="validator"></a> `validator`

</td>
<td>

`readonly`

</td>
<td>

[`ValidatorType`](#validatortype)

</td>
<td>

[src/errors/validation.error.ts:20](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="validatorargs"></a> `validatorArgs`

</td>
<td>

`readonly`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
<td>

[src/errors/validation.error.ts:21](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L21)

</td>
</tr>
</tbody>
</table>

***

### NumberImpl

Defined in: [src/metatypes/types/number.ts:43](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/number.ts#L43)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new NumberImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): NumberImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`NumberImpl`](#numberimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/number.ts:66](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/number.ts#L66)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/number.ts:90](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/number.ts#L90)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(value: any): boolean;
```

Defined in: [src/metatypes/types/number.ts:86](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/number.ts#L86)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-10"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-10"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-10"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-10"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### ObjectImpl

Defined in: [src/metatypes/types/object.ts:33](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L33)

Base implementation shared by ARRAY/OBJECT/TUPLE/UNION meta types.
Adds automatic handling for nested structures, recursive references and sub-value (de)serialization.

#### Extends

- [`StructuralMetaTypeImpl`](#structuralmetatypeimpl)

#### Constructors

##### Constructor

```ts
new ObjectImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): ObjectImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`ObjectImpl`](#objectimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`constructor`](#constructor-22)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToRawValue`](#casttorawvalue-28)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToType`](#casttotype-28)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`deserialize`](#deserialize-30)

##### deserializeSubValues()

```ts
deserializeSubValues(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/object.ts:200](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L200)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/types/\_lazy.ts:21](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L21)

Resolves (and caches) the prepared subtype, executing lazy factories when needed.

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getSubType`](#getsubtype-28)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | ValidationError;
```

Defined in: [src/metatypes/types/object.ts:68](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L68)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| [`ValidationError`](#validationerror)

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-28)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`rebuild`](#rebuild-28)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`serialize`](#serialize-30)

##### serializeSubValues()

```ts
serializeSubValues(__namedParameters: SerializerArgsType): any;
```

Defined in: [src/metatypes/types/object.ts:166](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L166)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/\_structural.ts:150](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L150)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`toString`](#tostring-28)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`validate`](#validate-30)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`build`](#build-30)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-28)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/object.ts:238](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L238)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-28)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaType`](#getmetatype-28)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-28)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-28)

##### isCompatible()

```ts
static isCompatible(value: any): any;
```

Defined in: [src/metatypes/types/object.ts:234](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/object.ts#L234)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`isCompatible`](#iscompatible-28)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`registerMetaType`](#registermetatype-28)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-11"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`id`](#id-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-11"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeArgs`](#metatypeargs-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-11"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`name`](#name-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-11"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### RefImpl

Defined in: [src/metatypes/types/\_ref.ts:14](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_ref.ts#L14)

Internal meta type used to represent references during recursive schema building.
Simply forwards all operations to the referenced meta type once resolved.

#### Extends

- [`LazyMetaTypeImpl`](#lazymetatypeimpl)

#### Constructors

##### Constructor

```ts
new RefImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): RefImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`RefImpl`](#refimpl)

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`constructor`](#constructor-7)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`castToRawValue`](#casttorawvalue-14)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`castToType`](#casttotype-14)

##### deserialize()

```ts
deserialize(args: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/\_ref.ts:53](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_ref.ts#L53)

Forwards deserialization to the referenced meta type.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`deserialize`](#deserialize-14)

##### getSubType()

```ts
getSubType(): MetaTypeImpl;
```

Defined in: [src/metatypes/types/\_ref.ts:32](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_ref.ts#L32)

Returns the resolved meta type implementation that this ref points to.

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Overrides

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getSubType`](#getsubtype-14)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-14)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`rebuild`](#rebuild-14)

##### serialize()

```ts
serialize(args: SerializerArgsType): any;
```

Defined in: [src/metatypes/types/\_ref.ts:48](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_ref.ts#L48)

Forwards serialization to the referenced meta type.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`serialize`](#serialize-14)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/\_ref.ts:36](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_ref.ts#L36)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Overrides

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`toString`](#tostring-14)

##### validate()

```ts
validate(args: ValidatorArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/types/\_ref.ts:41](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_ref.ts#L41)

Forwards validation to the referenced meta type (skips when value is `undefined`).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Overrides

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`validate`](#validate-14)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`build`](#build-14)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-14)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-14)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getMetaType`](#getmetatype-14)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-14)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-14)

##### isCompatible()

```ts
static isCompatible(_value: any): boolean;
```

Defined in: [src/metatypes/metatypeImpl.ts:572](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L572)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`isCompatible`](#iscompatible-14)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`registerMetaType`](#registermetatype-14)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-12"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`id`](#id-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-12"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`metaTypeArgs`](#metatypeargs-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-12"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`name`](#name-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-12"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### StringImpl

Defined in: [src/metatypes/types/string.ts:45](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L45)

Base implementation for runtime meta types. Concrete meta types (STRING, NUMBER, etc.)
extend this class to provide specific validation, serialization and compatibility logic.

#### Extends

- [`MetaTypeImpl`](#metatypeimpl)

#### Constructors

##### Constructor

```ts
new StringImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): StringImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`StringImpl`](#stringimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`constructor`](#constructor-14)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`castToRawValue`](#casttorawvalue-18)

##### castToType()

```ts
castToType(__namedParameters: DeSerializerArgsType): string;
```

Defined in: [src/metatypes/types/string.ts:80](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L80)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`castToType`](#casttotype-18)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`deserialize`](#deserialize-20)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:255](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L255)

Returns the prepared subtype definition (arrays/objects can override `prepareSubType`).

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getSubType`](#getsubtype-18)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-18)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`rebuild`](#rebuild-18)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`serialize`](#serialize-20)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/metatypeImpl.ts:361](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L361)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`toString`](#tostring-18)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`validate`](#validate-20)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`build`](#build-20)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-18)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/types/string.ts:92](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L92)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-18)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaType`](#getmetatype-18)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-18)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-18)

##### isCompatible()

```ts
static isCompatible(value: any): value is string;
```

Defined in: [src/metatypes/types/string.ts:88](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/string.ts#L88)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`value is string`

###### Overrides

[`MetaTypeImpl`](#metatypeimpl).[`isCompatible`](#iscompatible-18)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`MetaTypeImpl`](#metatypeimpl).[`registerMetaType`](#registermetatype-18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-13"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`id`](#id-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-13"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`metaTypeArgs`](#metatypeargs-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-13"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`name`](#name-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-13"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-9)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### `abstract` StructuralMetaTypeImpl

Defined in: [src/metatypes/types/\_structural.ts:17](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L17)

Base implementation shared by ARRAY/OBJECT/TUPLE/UNION meta types.
Adds automatic handling for nested structures, recursive references and sub-value (de)serialization.

#### Extends

- [`LazyMetaTypeImpl`](#lazymetatypeimpl)

#### Extended by

- [`ArrayImpl`](#arrayimpl)
- [`ObjectImpl`](#objectimpl)
- [`TupleImpl`](#tupleimpl)
- [`UnionImpl`](#unionimpl)

#### Constructors

##### Constructor

```ts
new StructuralMetaTypeImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): StructuralMetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl)

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`constructor`](#constructor-7)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`castToRawValue`](#casttorawvalue-14)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`castToType`](#casttotype-14)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`deserialize`](#deserialize-14)

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/types/\_lazy.ts:21](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L21)

Resolves (and caches) the prepared subtype, executing lazy factories when needed.

###### Returns

`any`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getSubType`](#getsubtype-14)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | Error;
```

Defined in: [src/metatypes/metatypeImpl.ts:482](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L482)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Error`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-14)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`rebuild`](#rebuild-14)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`serialize`](#serialize-14)

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/\_structural.ts:150](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L150)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Overrides

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`toString`](#tostring-14)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`validate`](#validate-14)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`build`](#build-14)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-14)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-14)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getMetaType`](#getmetatype-14)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-14)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-14)

##### isCompatible()

```ts
static isCompatible(_value: any): boolean;
```

Defined in: [src/metatypes/metatypeImpl.ts:572](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L572)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`isCompatible`](#iscompatible-14)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`registerMetaType`](#registermetatype-14)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-14"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`id`](#id-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-14"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`metaTypeArgs`](#metatypeargs-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-14"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`name`](#name-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-14"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`LazyMetaTypeImpl`](#lazymetatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-7)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### TupleImpl

Defined in: [src/metatypes/types/tuple.ts:27](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L27)

Base implementation shared by ARRAY/OBJECT/TUPLE/UNION meta types.
Adds automatic handling for nested structures, recursive references and sub-value (de)serialization.

#### Extends

- [`StructuralMetaTypeImpl`](#structuralmetatypeimpl)

#### Constructors

##### Constructor

```ts
new TupleImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): TupleImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`TupleImpl`](#tupleimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`constructor`](#constructor-22)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToRawValue`](#casttorawvalue-28)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToType`](#casttotype-28)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`deserialize`](#deserialize-30)

##### deserializeSubValues()

```ts
deserializeSubValues(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/tuple.ts:92](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L92)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/types/\_lazy.ts:21](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L21)

Resolves (and caches) the prepared subtype, executing lazy factories when needed.

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getSubType`](#getsubtype-28)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean | ValidationError;
```

Defined in: [src/metatypes/types/tuple.ts:36](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L36)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| [`ValidationError`](#validationerror)

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-28)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`rebuild`](#rebuild-28)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`serialize`](#serialize-30)

##### serializeSubValues()

```ts
serializeSubValues(__namedParameters: SerializerArgsType): any;
```

Defined in: [src/metatypes/types/tuple.ts:75](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L75)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/\_structural.ts:150](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L150)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`toString`](#tostring-28)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`validate`](#validate-30)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`build`](#build-30)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-28)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-28)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaType`](#getmetatype-28)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-28)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-28)

##### isCompatible()

```ts
static isCompatible(value: any): boolean;
```

Defined in: [src/metatypes/types/tuple.ts:109](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/tuple.ts#L109)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`isCompatible`](#iscompatible-28)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`registerMetaType`](#registermetatype-28)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-15"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`id`](#id-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-15"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeArgs`](#metatypeargs-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-15"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`name`](#name-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-15"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### UnionImpl

Defined in: [src/metatypes/types/union.ts:12](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/union.ts#L12)

Base implementation shared by ARRAY/OBJECT/TUPLE/UNION meta types.
Adds automatic handling for nested structures, recursive references and sub-value (de)serialization.

#### Extends

- [`StructuralMetaTypeImpl`](#structuralmetatypeimpl)

#### Constructors

##### Constructor

```ts
new UnionImpl(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): UnionImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:300](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L300)

Creates a new meta type implementation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
<td>

Arguments or a factory that receives the instance being constructed.

</td>
</tr>
</tbody>
</table>

###### Returns

[`UnionImpl`](#unionimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`constructor`](#constructor-22)

#### Methods

##### castToRawValue()

```ts
castToRawValue(serializationArgs: SerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:375](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L375)

Hook for structural types to convert values when serializing.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToRawValue`](#casttorawvalue-28)

##### castToType()

```ts
castToType(deserializationArgs: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:370](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L370)

Hook for structural types to cast raw values before validation.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`castToType`](#casttotype-28)

##### deserialize()

```ts
deserialize(deserializationArgs: DeSerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:449](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L449)

Runs builtin + custom deserializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deserializationArgs`

</td>
<td>

[`DeSerializeMetaTypeArgsType`](#deserializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`deserialize`](#deserialize-30)

##### deserializeSubValues()

```ts
deserializeSubValues(__namedParameters: DeSerializerArgsType): any;
```

Defined in: [src/metatypes/types/union.ts:71](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/union.ts#L71)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`DeSerializerArgsType`](#deserializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### getSubType()

```ts
getSubType(): any;
```

Defined in: [src/metatypes/types/\_lazy.ts:21](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_lazy.ts#L21)

Resolves (and caches) the prepared subtype, executing lazy factories when needed.

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getSubType`](#getsubtype-28)

##### metaTypeValidatorFunc()

```ts
metaTypeValidatorFunc(__namedParameters: ValidatorArgsType): boolean;
```

Defined in: [src/metatypes/types/union.ts:54](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/union.ts#L54)

Default validator that asks the implementation whether the value is compatible.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`ValidatorArgsType`](#validatorargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeValidatorFunc`](#metatypevalidatorfunc-28)

##### rebuild()

```ts
rebuild(metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl;
```

Defined in: [src/metatypes/metatypeImpl.ts:354](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L354)

Rebuilds the current implementation with additional/overriding arguments.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl)

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`rebuild`](#rebuild-28)

##### serialize()

```ts
serialize(serializationArgs: SerializeMetaTypeArgsType): any;
```

Defined in: [src/metatypes/metatypeImpl.ts:398](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L398)

Runs builtin + custom serializers and returns the final value.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`serializationArgs`

</td>
<td>

[`SerializeMetaTypeArgsType`](#serializemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`serialize`](#serialize-30)

##### serializeSubValues()

```ts
serializeSubValues(__namedParameters: SerializerArgsType): any;
```

Defined in: [src/metatypes/types/union.ts:58](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/union.ts#L58)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`SerializerArgsType`](#serializerargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### toString()

```ts
toString(): string;
```

Defined in: [src/metatypes/types/\_structural.ts:150](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/_structural.ts#L150)

String representation displayed in inspectors/logs.

###### Returns

`string`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`toString`](#tostring-28)

##### validate()

```ts
validate(args: ValidateMetaTypeArgsType): ValidationError | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:507](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L507)

Runs builtin + custom validators and returns a `ValidationError` when something fails.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`args`

</td>
<td>

[`ValidateMetaTypeArgsType`](#validatemetatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`validate`](#validate-30)

##### build()

```ts
static build<T>(this: (...metaTypeArgs: any) => T, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): T;
```

Defined in: [src/metatypes/metatypeImpl.ts:346](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L346)

Instantiates the implementation (used by `MetaType` factory helpers).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`MetaTypeImpl`](#metatypeimpl)

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

(...`metaTypeArgs`: `any`) => `T`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`build`](#build-30)

##### combineMetaTypeArgs()

```ts
static combineMetaTypeArgs(metaTypeArgs1?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null, metaTypeArgs2?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType
  | null): 
  | (metaTypeImpl: MetaTypeImpl) => {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
}
  | {
[key: string]: any;
  coercion?: boolean;
  default?: any;
  deserializers?: (
     | DeSerializerType
    | DeSerializeFuncType)[];
  name?: string;
  noBuiltinDeSerializers?: boolean;
  noBuiltinSerializers?: boolean;
  noBuiltinValidators?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  optional?: boolean;
  safe?: boolean;
  serializers?: (
     | SerializerType
    | SerializeFuncType)[];
  subType?: any;
  validateType?: boolean;
  validators?: (
     | ValidatorType
    | ValidatorFuncType)[];
};
```

Defined in: [src/metatypes/metatypeImpl.ts:592](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L592)

Utility that merges two argument objects (or factories).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`metaTypeArgs1?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
<tr>
<td>

`metaTypeArgs2?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype) \| `null`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}
  \| \{
\[`key`: `string`\]: `any`;
  `coercion?`: `boolean`;
  `default?`: `any`;
  `deserializers?`: (
     \| [`DeSerializerType`](#deserializertype)
    \| [`DeSerializeFuncType`](#deserializefunctype))[];
  `name?`: `string`;
  `noBuiltinDeSerializers?`: `boolean`;
  `noBuiltinSerializers?`: `boolean`;
  `noBuiltinValidators?`: `boolean`;
  `nullable?`: `boolean`;
  `nullish?`: `boolean`;
  `optional?`: `boolean`;
  `safe?`: `boolean`;
  `serializers?`: (
     \| [`SerializerType`](#serializertype)
    \| [`SerializeFuncType`](#serializefunctype))[];
  `subType?`: `any`;
  `validateType?`: `boolean`;
  `validators?`: (
     \| [`ValidatorType`](#validatortype)
    \| [`ValidatorFuncType`](#validatorfunctype))[];
\}

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`combineMetaTypeArgs`](#combinemetatypeargs-28)

##### getCompatibilityScore()

```ts
static getCompatibilityScore(_value: any): number;
```

Defined in: [src/metatypes/metatypeImpl.ts:580](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L580)

Returns a score describing how compatible a value is with this implementation.
Higher score wins when resolving meta types dynamically.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getCompatibilityScore`](#getcompatibilityscore-28)

##### getMetaType()

```ts
static getMetaType(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaType<unknown> | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:672](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L672)

Resolves and wraps an implementation as a runtime meta type (`MetaType` helper).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaType`](#metatype)\<`unknown`\> \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaType`](#getmetatype-28)

##### getMetaTypeImpl()

```ts
static getMetaTypeImpl(value: any, metaTypeArgs?: 
  | MetaTypeArgsType<any, boolean, boolean, boolean>
  | (metaTypeImpl: MetaTypeImpl) => MetaTypeArgsType): MetaTypeImpl | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:650](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L650)

Resolves an existing implementation instance for the provided value (value can be
a meta type, `MetaTypeImpl`, plain schema, etc.).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`metaTypeArgs?`

</td>
<td>

 \| [`MetaTypeArgsType`](#metatypeargstype)\<`any`, `boolean`, `boolean`, `boolean`\> \| (`metaTypeImpl`: [`MetaTypeImpl`](#metatypeimpl)) => [`MetaTypeArgsType`](#metatypeargstype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImpl`](#getmetatypeimpl-28)

##### getMetaTypeImplClass()

```ts
static getMetaTypeImplClass(value: any): 
  | StaticClass<typeof MetaTypeImpl>
  | undefined;
```

Defined in: [src/metatypes/metatypeImpl.ts:628](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L628)

Finds the best registered implementation for the provided value using compatibility score.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>
  \| `undefined`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`getMetaTypeImplClass`](#getmetatypeimplclass-28)

##### isCompatible()

```ts
static isCompatible(_value: any): boolean;
```

Defined in: [src/metatypes/types/union.ts:84](https://github.com/metatyper/metatyper/blob/main/src/metatypes/types/union.ts#L84)

Checks if the provided value matches the implementation (override in subclasses).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`_value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`isCompatible`](#iscompatible-28)

##### registerMetaType()

```ts
static registerMetaType(): (type: StaticClass<typeof MetaTypeImpl>) => void;
```

Defined in: [src/metatypes/metatypeImpl.ts:585](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L585)

Decorator helper that registers an implementation so it can be resolved automatically.

###### Returns

```ts
(type: StaticClass<typeof MetaTypeImpl>): void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`StaticClass`](#staticclass)\<*typeof* [`MetaTypeImpl`](#metatypeimpl)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`registerMetaType`](#registermetatype-28)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-16"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`id`](#id-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:218](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="metatypeargs-16"></a> `metaTypeArgs`

</td>
<td>

`readonly`

</td>
<td>

`Readonly`\<[`MetaTypeArgsType`](#metatypeargstype)\>

</td>
<td>

`{}`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`metaTypeArgs`](#metatypeargs-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:220](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L220)

</td>
</tr>
<tr>
<td>

<a id="name-16"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`name`](#name-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:219](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L219)

</td>
</tr>
<tr>
<td>

<a id="parentmetatypeimpl-16"></a> `parentMetaTypeImpl`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeImpl`](#metatypeimpl) \| `undefined`

</td>
<td>

`undefined`

</td>
<td>

[`StructuralMetaTypeImpl`](#structuralmetatypeimpl).[`parentMetaTypeImpl`](#parentmetatypeimpl-14)

</td>
<td>

[src/metatypes/metatypeImpl.ts:221](https://github.com/metatyper/metatyper/blob/main/src/metatypes/metatypeImpl.ts#L221)

</td>
</tr>
</tbody>
</table>

***

### ValidationError

Defined in: [src/errors/validation.error.ts:72](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L72)

General validation error. Contains a list of validation issues (list of [MetaTypeValidatorError](#metatypevalidatorerror)).

#### Extends

- [`MetaError`](#metaerror)

#### Constructors

##### Constructor

```ts
new ValidationError(issues: MetaTypeValidatorError[]): ValidationError;
```

Defined in: [src/errors/validation.error.ts:73](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L73)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`issues`

</td>
<td>

[`MetaTypeValidatorError`](#metatypevalidatorerror)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror)

###### Overrides

[`MetaError`](#metaerror).[`constructor`](#constructor-9)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="issues"></a> `issues`

</td>
<td>

`readonly`

</td>
<td>

[`MetaTypeValidatorError`](#metatypevalidatorerror)[]

</td>
<td>

[src/errors/validation.error.ts:73](https://github.com/metatyper/metatyper/blob/main/src/errors/validation.error.ts#L73)

</td>
</tr>
</tbody>
</table>
