import { describe, expect, test } from '@jest/globals'

import {
    ANY,
    ARRAY,
    AnyImpl,
    ArrayImpl,
    CoercionDeSerializer,
    CoercionSerializer,
    BIGINT,
    BOOLEAN,
    BigIntImpl,
    BooleanImpl,
    DATE,
    DateImpl,
    DeSerializerArgsType,
    DefaultValueDeSerializerBuilder,
    FreezeObjectDeSerializer,
    GreaterValidatorBuilder,
    INSTANCE,
    INTEGER,
    InstanceImpl,
    IntegerImpl,
    LITERAL,
    LessValidatorBuilder,
    LiteralImpl,
    MaxLengthValidatorBuilder,
    MaxValidatorBuilder,
    MetaType,
    MetaTypeImpl,
    ValidationError,
    MetaTypeValidator,
    MinLengthValidatorBuilder,
    MinValidatorBuilder,
    NUMBER,
    NotEmptyValidator,
    NullableValidator,
    NumberImpl,
    OBJECT,
    ObjectImpl,
    OptionalValidator,
    RefImpl,
    RegExpValidatorBuilder,
    ReplaceValuesDeSerializerBuilder,
    STRING,
    SerializerArgsType,
    StringImpl,
    StructuralMetaTypeImpl,
    SubValuesDeSerializer,
    SubValuesSerializer,
    TUPLE,
    ToLowerCaseDeSerializer,
    ToUpperCaseDeSerializer,
    TupleImpl,
    UNION,
    UnionImpl
} from '../../src'

describe('Meta types', () => {
    let idCounter = 0

    MetaTypeImpl.prototype['generateId'] = () => (idCounter++).toString()

    beforeEach(() => {
        idCounter = 0
    })

    const stringMetaType = STRING({ nullable: false, coercion: true, default: '1' })
    const numberMetaType = NUMBER({
        nullable: false,
        coercion: true,
        default: 1,
        min: 1,
        serializers: [({ value }) => (value || 0) + 10],
        deserializers: [({ value }) => (value || 0) + 20]
    })
    const customMetaType = MetaType<DATE>(
        class extends MetaTypeImpl {
            name = 'CUSTOM'

            castToType(_args: DeSerializerArgsType) {
                return 'castToType result'
            }

            castToRawValue(_args: SerializerArgsType) {
                return 'castToRawValue result'
            }

            static isCompatible(value: any) {
                return value instanceof Date
            }
        },
        {
            validators: [({ value }) => value > 1]
        }
    )

    test('ANY', () => {
        const metaType = ANY({
            nullable: false,
            coercion: true,
            default: 'any value'
        })
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType) as AnyImpl

        // toString

        expect(metaTypeImpl.toString()).toBe('ANY')

        // compatibility

        expect(AnyImpl.isCompatible(new Date())).toBe(true)
        expect(AnyImpl.isCompatible(1)).toBe(true)

        expect(AnyImpl.getCompatibilityScore('any value')).toBe(-1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(AnyImpl)

        // coercion

        expect(metaTypeImpl.castToType({ value: 1 })).toBe(1)
        expect(metaTypeImpl.castToType({ value: false })).toBe(false)
        expect(metaTypeImpl.castToType({ value: null })).toBe(null)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('BOOLEAN', () => {
        const metaType = BOOLEAN({
            nullable: false,
            coercion: true,
            default: true,
            trueValues: ['y'],
            falseValues: ['n']
        })
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType)

        // toString

        expect(metaTypeImpl.toString()).toBe('BOOLEAN')

        // compatibility

        expect(BooleanImpl.isCompatible(true)).toBe(true)
        expect(BooleanImpl.isCompatible(1)).toBe(false)

        expect(BooleanImpl.getCompatibilityScore(true)).toBe(1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(BooleanImpl)
        expect(MetaTypeImpl.getMetaTypeImpl(true)).toBeInstanceOf(BooleanImpl)

        // coercion

        expect(metaTypeImpl.castToType({ value: 1 })).toBe(true)
        expect(metaTypeImpl.castToType({ value: 1n })).toBe(true)
        expect(metaTypeImpl.castToType({ value: '2' })).toBe(true)
        expect(metaTypeImpl.castToType({ value: new Date(0) })).toBe(true)
        expect(metaTypeImpl.castToType({ value: 0 })).toBe(false)
        expect(metaTypeImpl.castToType({ value: null })).toBe(false)
        expect(metaTypeImpl.castToType({ value: null })).toBe(false)

        expect(metaTypeImpl.castToRawValue({ value: true })).toBe(true)
        expect(metaTypeImpl.castToRawValue({ value: 2 })).toBe(2)
        expect(metaTypeImpl.castToRawValue({ value: '4' })).toBe('4')

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name,
            ReplaceValuesDeSerializerBuilder([], true).name,
            ReplaceValuesDeSerializerBuilder([], false).name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('STRING', () => {
        const metaType = STRING({
            notEmpty: true,
            minLength: 1,
            maxLength: 2,
            regexp: '\\w',
            toCase: 'lower',
            nullable: false,
            coercion: true,
            default: '3'
        })
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType)

        const metaType1 = STRING({
            notEmpty: true,
            minLength: 1,
            maxLength: 2,
            regexp: '\\w',
            toCase: 'upper',
            nullable: false,
            coercion: true,
            default: '3'
        })
        const metaTypeImpl1 = MetaType.getMetaTypeImpl(metaType1)

        // toString

        expect(metaTypeImpl.toString()).toBe('STRING')

        // compatibility

        expect(StringImpl.isCompatible('1')).toBe(true)
        expect(StringImpl.isCompatible(1)).toBe(false)

        expect(StringImpl.getCompatibilityScore('1')).toBe(1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(StringImpl)
        expect(MetaTypeImpl.getMetaTypeImpl('str')).toBeInstanceOf(StringImpl)

        // coercion

        expect(metaTypeImpl.castToType({ value: 1 })).toBe('1')
        expect(metaTypeImpl.castToType({ value: 1n })).toBe('1')
        expect(metaTypeImpl.castToType({ value: '2' })).toBe('2')
        expect(metaTypeImpl.castToType({ value: Symbol('3') })).toBe('Symbol(3)')
        expect(metaTypeImpl.castToType({ value: new Date(2) })).toBe(new Date(2).toISOString())

        expect(metaTypeImpl.castToRawValue({ value: 2 })).toBe(2)
        expect(metaTypeImpl.castToRawValue({ value: '4' })).toBe('4')

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name,
            NotEmptyValidator.name,
            MinLengthValidatorBuilder(1).name,
            MaxLengthValidatorBuilder(2).name,
            RegExpValidatorBuilder('some regex').name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name,
            ToLowerCaseDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)

        const expectedDeSerializersNames1 = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name,
            ToUpperCaseDeSerializer.name
        ]
        const builtinDeSerializers1 = metaTypeImpl1['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers1).toEqual(expectedDeSerializersNames1)
    })

    test('NUMBER', () => {
        const metaType = NUMBER({
            min: 1,
            max: 2,
            less: 2,
            greater: 1,
            nullable: false,
            coercion: true,
            default: 3
        } as any)
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType)

        // toString

        expect(metaTypeImpl.toString()).toBe('NUMBER')

        // compatibility

        expect(NumberImpl.isCompatible(1)).toBe(true)
        expect(NumberImpl.isCompatible('1')).toBe(false)

        expect(NumberImpl.getCompatibilityScore(1)).toBe(1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(NumberImpl)
        expect(MetaTypeImpl.getMetaTypeImpl(3.1)).toBeInstanceOf(NumberImpl)

        // coercion

        expect(metaTypeImpl.castToType({ value: '-1.3' })).toBe(-1.3)
        expect(metaTypeImpl.castToType({ value: new Date(2) })).toBe(2)
        expect(metaTypeImpl.castToType({ value: 3n })).toBe(3)
        expect(metaTypeImpl.castToType({ value: '4b' })).toBe('4b')

        expect(metaTypeImpl.castToRawValue({ value: 2 })).toBe(2)
        expect(metaTypeImpl.castToRawValue({ value: '4' })).toBe('4')

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name,
            MinValidatorBuilder(1).name,
            MaxValidatorBuilder(2).name,
            GreaterValidatorBuilder(1).name,
            LessValidatorBuilder(2).name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('BIGINT', () => {
        const metaType = BIGINT({
            min: 1,
            max: 2,
            less: 2,
            greater: 1,
            nullable: false,
            coercion: true,
            default: 3n
        } as any)
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType)

        // toString

        expect(metaTypeImpl.toString()).toBe('BIGINT')

        // compatibility

        expect(BigIntImpl.isCompatible(1n)).toBe(true)
        expect(BigIntImpl.isCompatible(1)).toBe(false)

        expect(BigIntImpl.getCompatibilityScore(1n)).toBe(1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(BigIntImpl)
        expect(MetaTypeImpl.getMetaTypeImpl(3n)).toBeInstanceOf(BigIntImpl)

        // coercion

        expect(metaTypeImpl.castToType({ value: 3n })).toBe(3n)
        expect(metaTypeImpl.castToType({ value: 3 })).toBe(3n)
        expect(metaTypeImpl.castToType({ value: 3.9 })).toBe(3n)
        expect(metaTypeImpl.castToType({ value: 3.2 })).toBe(3n)
        expect(metaTypeImpl.castToType({ value: -3.2 })).toBe(-3n)
        expect(metaTypeImpl.castToType({ value: -3.9 })).toBe(-3n)
        expect(metaTypeImpl.castToType({ value: '-3' })).toBe(-3n)
        expect(metaTypeImpl.castToType({ value: new Date(2) })).toBe(2n)
        expect(metaTypeImpl.castToType({ value: '-1.3' })).toBe('-1.3')
        expect(metaTypeImpl.castToType({ value: '4b' })).toBe('4b')

        expect(metaTypeImpl.castToRawValue({ value: 2n })).toBe('2')
        expect(metaTypeImpl.castToRawValue({ value: '4' })).toBe('4')

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name,
            MinValidatorBuilder(1).name,
            MaxValidatorBuilder(2).name,
            GreaterValidatorBuilder(1).name,
            LessValidatorBuilder(2).name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('INTEGER', () => {
        const metaType = INTEGER({
            min: 1,
            max: 2,
            less: 2,
            greater: 1,
            nullable: false,
            coercion: true,
            default: 3
        } as any)
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType)

        // toString

        expect(metaTypeImpl.toString()).toBe('INTEGER')

        // compatibility

        expect(IntegerImpl.isCompatible(1)).toBe(true)
        expect(IntegerImpl.isCompatible(1.2)).toBe(false)

        expect(IntegerImpl.getCompatibilityScore(1)).toBe(-1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(IntegerImpl)

        // coercion

        expect(metaTypeImpl.castToType({ value: 3 })).toBe(3)
        expect(metaTypeImpl.castToType({ value: 3n })).toBe(3)
        expect(metaTypeImpl.castToType({ value: 3.3 })).toBe(3)
        expect(metaTypeImpl.castToType({ value: 3.9 })).toBe(3)
        expect(metaTypeImpl.castToType({ value: -3.9 })).toBe(-3)
        expect(metaTypeImpl.castToType({ value: '-3' })).toBe(-3)
        expect(metaTypeImpl.castToType({ value: new Date(2) })).toBe(2)
        expect(metaTypeImpl.castToType({ value: '-1.3' })).toBe('-1.3')
        expect(metaTypeImpl.castToType({ value: '4b' })).toBe('4b')

        expect(metaTypeImpl.castToRawValue({ value: 2 })).toBe(2)
        expect(metaTypeImpl.castToRawValue({ value: '4' })).toBe('4')

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name,
            MinValidatorBuilder(1).name,
            MaxValidatorBuilder(2).name,
            GreaterValidatorBuilder(1).name,
            LessValidatorBuilder(2).name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('DATE', () => {
        const metaType = DATE({
            nullable: false,
            coercion: true,
            default: new Date(1),
            min: 0,
            max: new Date(),
            less: new Date(),
            greater: 0
        })
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType)

        // toString

        expect(metaTypeImpl.toString()).toBe('DATE')

        // compatibility

        expect(DateImpl.isCompatible(new Date(1))).toBe(true)
        expect(DateImpl.isCompatible(3)).toBe(false)

        expect(DateImpl.getCompatibilityScore(new Date())).toBe(3)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(DateImpl)
        expect(MetaTypeImpl.getMetaTypeImpl(new Date())).toBeInstanceOf(DateImpl)

        // coercion

        expect(metaTypeImpl.castToType({ value: new Date(3) }).getTime()).toBe(
            new Date(3).getTime()
        )
        expect(metaTypeImpl.castToType({ value: 3 }).getTime()).toBe(new Date(3).getTime())
        expect(metaTypeImpl.castToType({ value: 3n }).getTime()).toBe(new Date(3).getTime())
        expect(metaTypeImpl.castToType({ value: -3.3 }).getTime()).toBe(new Date(-3.3).getTime())
        expect(metaTypeImpl.castToType({ value: '2023-01-01T01:00:00.105Z' }).getTime()).toBe(
            new Date('2023-01-01T01:00:00.105Z').getTime()
        )

        expect(metaTypeImpl.castToType({ value: true })).toBe(true)
        expect(metaTypeImpl.castToType({ value: null })).toBe(null)

        expect(metaTypeImpl.castToRawValue({ value: new Date(1) })).toBe(1)
        expect(metaTypeImpl.castToRawValue({ value: null })).toBe(null)
        expect(metaTypeImpl.castToRawValue({ value: 0 })).toBe(0)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name,
            MinValidatorBuilder(1).name,
            MaxValidatorBuilder(2).name,
            GreaterValidatorBuilder(1).name,
            LessValidatorBuilder(2).name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('UNION', () => {
        const metaType = UNION(() => [stringMetaType, numberMetaType, customMetaType], {
            nullish: false,
            coercion: true,
            default: 1
        })
        const metaTypeImpl = MetaType.getMetaTypeImpl<MetaType<unknown, UnionImpl>>(metaType)

        // toString

        expect(metaTypeImpl.toString()).toBe('UNION(0)<STRING | NUMBER | CUSTOM>')

        // compatibility

        expect(UnionImpl.isCompatible(3)).toBe(true)
        expect(UnionImpl.isCompatible(new Date(1))).toBe(true) // always true

        expect(UnionImpl.getCompatibilityScore(1)).toBe(-1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(UnionImpl)

        // serializeSubValues / deserializeSubValues

        expect(
            metaTypeImpl.serializeSubValues({
                value: 1
            })
        ).toBe(11)

        expect(
            metaTypeImpl.deserializeSubValues({
                value: 1
            })
        ).toBe(21)

        // getMetaTypeImplOf and metaTypeValidatorFunc

        expect(metaTypeImpl['getMetaTypeImplOf']('1')).toBeInstanceOf(StringImpl)
        expect(metaTypeImpl['getMetaTypeImplOf'](1)).toBeInstanceOf(NumberImpl)
        expect(metaTypeImpl['getMetaTypeImplOf'](new Date(2))).toBeInstanceOf(
            MetaType.getMetaTypeImpl(customMetaType)['constructor']
        )
        expect(metaTypeImpl['getMetaTypeImplOf'](new Date(1))).toBe(undefined)
        expect(metaTypeImpl['getMetaTypeImplOf'](1n)).toBe(undefined)
        expect(metaTypeImpl['getMetaTypeImplOf'](-20)).toBe(undefined)

        expect(metaTypeImpl.metaTypeValidatorFunc({ value: '1' })).toBe(true)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: 1 })).toBe(true)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: new Date(2) })).toBe(true)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: new Date(1) })).toBe(false)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: 1n })).toBe(false)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: -20 })).toBe(false)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name, SubValuesSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name,
            SubValuesDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('ARRAY', () => {
        const metaType1 = ARRAY(() => [stringMetaType, numberMetaType, customMetaType], {
            minLength: 1,
            maxLength: 3,
            notEmpty: true,
            freeze: true,
            nullable: false,
            coercion: true,
            default: []
        } as any)
        const metaTypeImpl1 = MetaType.getMetaTypeImpl(metaType1)

        const metaType2 = MetaTypeImpl.getMetaType(
            ARRAY([customMetaType], {
                nullable: false,
                coercion: true,
                default: []
            })
        )
        const metaTypeImpl2 = MetaType.getMetaTypeImpl(metaType2) as ArrayImpl

        const metaType3 = ARRAY(() => [], {
            nullable: false,
            coercion: true,
            default: []
        })
        const metaTypeImpl3 = MetaType.getMetaTypeImpl(metaType3)

        // toString

        expect(metaTypeImpl1.toString()).toBe('ARRAY(0)<UNION(6)<STRING | NUMBER | CUSTOM>[]>')

        // compatibility

        expect(ArrayImpl.isCompatible([3])).toBe(true)
        expect(ArrayImpl.isCompatible(3)).toBe(false)

        expect(ArrayImpl.getCompatibilityScore([])).toBe(3)

        // find or get meta type

        expect(metaTypeImpl1).toBeInstanceOf(ArrayImpl)
        expect(metaTypeImpl2).toBeInstanceOf(ArrayImpl)
        expect(metaTypeImpl3).toBeInstanceOf(ArrayImpl)

        // serializeSubValues / deserializeSubValues

        expect(
            metaTypeImpl1.serializeSubValues({
                value: [1]
            })
        ).toEqual([11])

        expect(
            metaTypeImpl1.deserializeSubValues({
                value: [1]
            })
        ).toEqual([21])

        // metaTypeValidatorFunc

        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: ['1'] })).toBe(true)
        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: [1, '1'] })).toBe(true)
        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: [new Date(2)] })).toBe(true)
        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: [new Date(1)] })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: [1n] })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: [-20] })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: [1, -20] })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: 1 })).toBe(false)

        expect(metaTypeImpl2.metaTypeValidatorFunc({ value: [new Date(2)] })).toBe(true)
        expect(metaTypeImpl2.metaTypeValidatorFunc({ value: [new Date(1)] })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl2.metaTypeValidatorFunc({ value: [1, new Date(2)] })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl2.metaTypeValidatorFunc({ value: new Date() })).toBe(false)

        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: ['1'] })).toBe(true)
        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: [1, '1'] })).toBe(true)
        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: [new Date(2)] })).toBe(true)
        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: [1n] })).toBe(true)
        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: [0] })).toBe(true)
        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: [1, 0] })).toBe(true)
        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: [new Date(1)] })).toBe(true)
        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: new Date() })).toBe(false)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name,
            NotEmptyValidator.name,
            MinLengthValidatorBuilder(1).name,
            MaxLengthValidatorBuilder(3).name
        ]
        const builtinValidators = metaTypeImpl1['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name, SubValuesSerializer.name]
        const builtinSerializers = metaTypeImpl1['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name,
            SubValuesDeSerializer.name,
            FreezeObjectDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl1['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('TUPLE', () => {
        const metaType = TUPLE(() => [stringMetaType, numberMetaType, customMetaType], {
            freeze: true,
            nullable: false,
            coercion: true,
            default: ['1', 1, new Date()]
        })
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType)

        // toString

        expect(metaTypeImpl.toString()).toBe('TUPLE(0)<[ STRING, NUMBER, CUSTOM ]>')

        // compatibility

        expect(TupleImpl.isCompatible([3])).toBe(true)
        expect(TupleImpl.isCompatible(3)).toBe(false)

        expect(TupleImpl.getCompatibilityScore([])).toBe(-1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(TupleImpl)

        // serializeSubValues / deserializeSubValues

        expect(
            metaTypeImpl.serializeSubValues({
                value: ['1', 1, null, 1]
            })
        ).toEqual(['1', 11, null, 1])

        expect(
            metaTypeImpl.serializeSubValues({
                value: undefined
            })
        ).toEqual(undefined)

        expect(
            metaTypeImpl.serializeSubValues({
                value: null
            })
        ).toEqual(null)

        expect(
            metaTypeImpl.deserializeSubValues({
                value: ['1', 1, null, 1]
            })
        ).toEqual(['1', 21, null, 1])

        expect(
            metaTypeImpl.deserializeSubValues({
                value: undefined
            })
        ).toEqual(undefined)

        expect(
            metaTypeImpl.deserializeSubValues({
                value: null
            })
        ).toEqual(null)

        // metaTypeValidatorFunc

        expect(metaTypeImpl.metaTypeValidatorFunc({ value: undefined })).toBe(true)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: null })).toBe(true)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: ['1', 1, new Date()] })).toBe(true)
        expect(
            metaTypeImpl.metaTypeValidatorFunc({ value: ['1', 1, new Date(1)] })
        ).toBeInstanceOf(ValidationError)
        expect(
            metaTypeImpl.metaTypeValidatorFunc({ value: ['1', 1n, new Date()] })
        ).toBeInstanceOf(ValidationError)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: ['1', 1] })).toBe(false)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: [1, '1', new Date()] })).toBeInstanceOf(
            ValidationError
        )
        expect(
            metaTypeImpl.metaTypeValidatorFunc({ value: [1, '1', new Date(), new Date()] })
        ).toBe(false)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: [] })).toBe(false)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name, SubValuesSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name,
            SubValuesDeSerializer.name,
            FreezeObjectDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('OBJECT', () => {
        const metaType1 = OBJECT(
            () => ({
                s: { stringMetaType },
                n: { numberMetaType },
                customMetaType
            }),
            {
                freeze: true,
                nullable: false,
                coercion: true,
                required: ['s', 'customMetaType'],
                default: {
                    s: { stringMetaType: 'str' },
                    customMetaType: new Date()
                }
            }
        )
        const metaTypeImpl1 = MetaType.getMetaTypeImpl(metaType1)

        const metaType2 = OBJECT(
            () => ({
                s: { stringMetaType },
                n: { numberMetaType },
                c: { customMetaType }
            }),
            {
                nullable: false,
                coercion: true,
                default: {
                    s: { stringMetaType: 'str' },
                    n: { numberMetaType: 3 },
                    c: { customMetaType: new Date() }
                }
            }
        )
        const metaTypeImpl2 = MetaType.getMetaTypeImpl(metaType2)

        const metaType3 = OBJECT(
            () => ({
                s: { stringMetaType },
                n: { numberMetaType },
                customMetaType
            }),
            {
                nullable: false,
                coercion: true,
                required: [],
                default: {}
            }
        )
        const metaTypeImpl3 = MetaType.getMetaTypeImpl(metaType3)

        const metaType4 = OBJECT(() => numberMetaType, {
            nullable: false,
            coercion: true,
            default: {}
        })
        const metaTypeImpl4 = MetaType.getMetaTypeImpl(metaType4)

        const metaType5 = OBJECT(numberMetaType, {
            nullish: true,
            coercion: true,
            required: ['a'],
            default: {
                a: 1
            }
        })
        const metaTypeImpl5 = MetaType.getMetaTypeImpl(metaType5)

        const metaType6 = OBJECT(
            {},
            {
                nullish: true,
                coercion: true,
                required: ['a'],
                default: {
                    a: 1
                }
            }
        )
        const metaTypeImpl6 = MetaType.getMetaTypeImpl(metaType6)

        const metaType7 = OBJECT()
        const metaTypeImpl7 = MetaType.getMetaTypeImpl(metaType7)

        // toString

        expect(metaTypeImpl1.toString()).toBe(
            'OBJECT(0)<{ s: OBJECT(8)<{ stringMetaType: STRING }>, n: OBJECT(10)<{ numberMetaType: NUMBER }>, customMetaType: CUSTOM }>'
        )
        expect(metaTypeImpl5.toString()).toBe('OBJECT(4)<NUMBER>')
        expect(metaTypeImpl6.toString()).toBe('OBJECT(5)<ANY>')
        expect(metaTypeImpl7.toString()).toBe('OBJECT(6)<ANY>')

        // compatibility

        expect(ObjectImpl.isCompatible({})).toBe(true)
        expect(ObjectImpl.isCompatible([])).toBe(false)

        expect(ObjectImpl.getCompatibilityScore({})).toBe(0)

        // find or get meta type

        expect(metaTypeImpl1).toBeInstanceOf(ObjectImpl)

        // serializeSubValues / deserializeSubValues

        expect(
            metaTypeImpl1.serializeSubValues({
                value: {
                    n: { numberMetaType: 1 }
                }
            })
        ).toEqual({
            n: { numberMetaType: 11 }
        })

        expect(
            metaTypeImpl7.serializeSubValues({
                value: {
                    n: { numberMetaType: 1 }
                }
            })
        ).toEqual({
            n: { numberMetaType: 1 }
        })

        expect(
            metaTypeImpl1.deserializeSubValues({
                value: {
                    n: { numberMetaType: 1 }
                }
            })
        ).toEqual({
            n: { numberMetaType: 21 }
        })

        expect(
            metaTypeImpl7.deserializeSubValues({
                value: {
                    n: { numberMetaType: 1 }
                }
            })
        ).toEqual({
            n: { numberMetaType: 1 }
        })

        // metaTypeValidatorFunc

        expect(
            metaTypeImpl1.metaTypeValidatorFunc({
                value: {
                    s: { stringMetaType: '1' },
                    n: { numberMetaType: 1 },
                    customMetaType: new Date()
                }
            })
        ).toBe(true)

        expect(
            metaTypeImpl1.metaTypeValidatorFunc({
                value: {
                    s: { stringMetaType: '1' },
                    customMetaType: new Date()
                }
            })
        ).toBe(true)

        expect(
            metaTypeImpl1.metaTypeValidatorFunc({
                value: {
                    s: { stringMetaType: '1' },
                    n: {},
                    customMetaType: new Date()
                }
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl1.metaTypeValidatorFunc({
                value: {
                    s: { stringMetaType: '1' },
                    n: { numberMetaType: 0 },
                    customMetaType: new Date()
                }
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl1.metaTypeValidatorFunc({
                value: {
                    s: {},
                    n: { numberMetaType: 1 },
                    customMetaType: new Date()
                }
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl1.metaTypeValidatorFunc({
                value: {
                    n: { numberMetaType: 1 },
                    customMetaType: new Date()
                }
            })
        ).toBe(false)

        expect(
            metaTypeImpl2.metaTypeValidatorFunc({
                value: {
                    s: { stringMetaType: '1' },
                    n: { numberMetaType: 1 },
                    c: { customMetaType: new Date() }
                }
            })
        ).toBe(true)

        expect(
            metaTypeImpl2.metaTypeValidatorFunc({
                value: {
                    s: { stringMetaType: '1' },
                    c: { customMetaType: new Date() }
                }
            })
        ).toBe(false)

        expect(
            metaTypeImpl3.metaTypeValidatorFunc({
                value: {
                    s: { stringMetaType: '1' },
                    customMetaType: new Date()
                }
            })
        ).toBe(true)

        expect(metaTypeImpl3.metaTypeValidatorFunc({ value: {} })).toBe(true)

        expect(
            metaTypeImpl3.metaTypeValidatorFunc({
                value: {
                    s: {}
                }
            })
        ).toBeInstanceOf(ValidationError)

        expect(metaTypeImpl4.metaTypeValidatorFunc({ value: {} })).toBe(true)
        expect(metaTypeImpl4.metaTypeValidatorFunc({ value: [] })).toBe(false)
        expect(metaTypeImpl4.metaTypeValidatorFunc({ value: { a: 2, b: 3 } })).toBe(true)
        expect(metaTypeImpl4.metaTypeValidatorFunc({ value: { a: 2, b: '3' } })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl4.metaTypeValidatorFunc({ value: { a: 0 } })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl4.metaTypeValidatorFunc({ value: { a: '2' } })).toBeInstanceOf(
            ValidationError
        )

        expect(metaTypeImpl5.metaTypeValidatorFunc({ value: undefined })).toBe(true)
        expect(metaTypeImpl5.metaTypeValidatorFunc({ value: null })).toBe(true)
        expect(metaTypeImpl5.metaTypeValidatorFunc({ value: { a: 2, b: 3 } })).toBe(true)
        expect(metaTypeImpl5.metaTypeValidatorFunc({ value: { a: 2, b: '3' } })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl5.metaTypeValidatorFunc({ value: {} })).toBe(false)
        expect(metaTypeImpl5.metaTypeValidatorFunc({ value: { a: 0 } })).toBeInstanceOf(
            ValidationError
        )
        expect(metaTypeImpl5.metaTypeValidatorFunc({ value: { a: '2' } })).toBeInstanceOf(
            ValidationError
        )

        expect(metaTypeImpl7.metaTypeValidatorFunc({ value: undefined })).toBe(true)
        expect(metaTypeImpl7.metaTypeValidatorFunc({ value: null })).toBe(true)
        expect(metaTypeImpl7.metaTypeValidatorFunc({ value: {} })).toBe(true)
        expect(metaTypeImpl7.metaTypeValidatorFunc({ value: 0 })).toBe(false)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name
        ]
        const builtinValidators = metaTypeImpl1['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name, SubValuesSerializer.name]
        const builtinSerializers = metaTypeImpl1['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name,
            SubValuesDeSerializer.name,
            FreezeObjectDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl1['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('Ref', () => {
        const ref: any = RefImpl.build({ subType: () => object })

        const object: any = OBJECT(() => ({
            a: {
                b: ref,
                c: BIGINT({
                    coercion: true,
                    nullish: true,
                    deserializers: [({ value }) => value ?? null]
                })
            }
        }))

        expect(ref.validate({ value: { a: { b: undefined, c: 1n } } })).toBeUndefined()
        expect(
            ref.validate({ value: { a: { b: { a: { b: undefined, c: 2n } }, c: 3n } } })
        ).toBeUndefined()
        expect(ref.validate({ value: { a: { b: { a: { c: 5n } }, c: 4n } } })).toBeInstanceOf(
            ValidationError
        )

        expect(
            ref.deserialize({ value: { a: { b: { a: { b: undefined, c: '-1' } }, c: '0' } } })
        ).toEqual({
            a: { b: { a: { b: undefined, c: -1n } }, c: 0n }
        })

        expect(
            ref.serialize({
                value: { a: { b: { a: { b: undefined, c: -2n } }, c: -3n } },
                place: 'serialize'
            })
        ).toEqual({
            a: { b: { a: { b: undefined, c: '-2' } }, c: '-3' }
        })

        expect(() => RefImpl.build({ subType: null }).getSubType()).toThrow(TypeError)
        expect(() => RefImpl.build({ subType: 1 }).getSubType()).toThrow(TypeError)

        // toString

        expect(ref.toString()).toBe('REF<1>')
    })

    test('StructuralMetaType', () => {
        const obj0: any = OBJECT((selfImpl) => {
            return {
                obj0,
                selfImpl
            }
        })

        const obj1: any = OBJECT((selfImpl) => {
            return {
                obj0,
                obj0Rebuild: MetaType.getMetaTypeImpl(obj0).rebuild(),
                obj1,
                selfImpl,
                obj2
            }
        })

        const obj2: any = OBJECT((selfImpl) => {
            const tuple: any = TUPLE([obj1, selfImpl, obj2])
            const array: any = ARRAY(() => [
                array,
                obj1,
                selfImpl,
                obj2,
                [array, obj1, selfImpl, obj2]
            ])
            const union: any = UNION([tuple, obj1, selfImpl, obj2])

            const subType: any = {
                obj1,
                selfImpl,
                obj2,
                tuple,
                array,
                union,
                subType: null,
                inner: {
                    obj1,
                    selfImpl,
                    obj2,
                    tuple,
                    array,
                    union,
                    subType: null
                }
            }

            const _subType = {
                subType
            }

            subType['_subType1'] = _subType
            subType['_subType2'] = _subType

            subType['subType'] = subType
            subType['inner']['subType'] = subType

            return subType
        })

        const obj3SubType: any = {
            obj1,
            recursiveObj: OBJECT(() => obj3SubType),
            obj2Rebuild: MetaType.getMetaTypeImpl(obj2).rebuild()
        }

        const obj3: any = OBJECT(TUPLE(() => [obj1, obj2, obj3, obj3SubType]))

        const getSchema: any = (subType: any) => {
            if (subType instanceof StructuralMetaTypeImpl) {
                return {
                    typeId: subType.id,
                    typeName: subType.name,
                    subType: getSchema(subType.getSubType())
                }
            }

            if (subType instanceof MetaTypeImpl) {
                return {
                    typeId: subType.id,
                    typeName: subType.name,
                    subType: null
                }
            }

            if (subType instanceof RefImpl) {
                return {
                    typeId: subType.id,
                    typeName: subType.name,
                    subType: subType.getSubType().id
                }
            }

            return Object.fromEntries(
                Object.entries(subType).map(([key, value]: any) => {
                    let subType = null

                    if (value instanceof StructuralMetaTypeImpl) {
                        subType = getSchema(value.getSubType())
                    } else if (value instanceof RefImpl) {
                        subType = value.getSubType().id
                    }

                    return [
                        key,
                        {
                            typeId: value.id,
                            typeName: value.name,
                            subType
                        }
                    ]
                })
            )
        }

        expect(JSON.stringify(getSchema(MetaType.getMetaTypeImpl(obj1)))).toEqual(
            '{"typeId":"1","typeName":"OBJECT","subType":{"obj0":{"typeId":"8","typeName":"OBJECT","subType":{"obj0":{"typeId":"45","typeName":"REF","subType":"8"},"selfImpl":{"typeId":"46","typeName":"REF","subType":"8"}}},"obj0Rebuild":{"typeId":"7","typeName":"OBJECT","subType":{"obj0":{"typeId":"8","typeName":"OBJECT","subType":{"obj0":{"typeId":"45","typeName":"REF","subType":"8"},"selfImpl":{"typeId":"46","typeName":"REF","subType":"8"}}},"selfImpl":{"typeId":"44","typeName":"REF","subType":"7"}}},"obj1":{"typeId":"9","typeName":"REF","subType":"1"},"selfImpl":{"typeId":"10","typeName":"REF","subType":"1"},"obj2":{"typeId":"11","typeName":"OBJECT","subType":{"obj1":{"typeId":"15","typeName":"REF","subType":"1"},"selfImpl":{"typeId":"16","typeName":"REF","subType":"11"},"obj2":{"typeId":"17","typeName":"REF","subType":"11"},"tuple":{"typeId":"12","typeName":"TUPLE","subType":{"0":{"typeId":"30","typeName":"REF","subType":"1"},"1":{"typeId":"31","typeName":"REF","subType":"11"},"2":{"typeId":"32","typeName":"REF","subType":"11"}}},"array":{"typeId":"13","typeName":"ARRAY","subType":{"typeId":"42","typeName":"UNION","subType":{"0":{"typeId":"33","typeName":"REF","subType":"13"},"1":{"typeId":"34","typeName":"REF","subType":"1"},"2":{"typeId":"35","typeName":"REF","subType":"11"},"3":{"typeId":"36","typeName":"REF","subType":"11"},"4":{"typeId":"41","typeName":"ARRAY","subType":{"typeId":"43","typeName":"UNION","subType":{"0":{"typeId":"37","typeName":"REF","subType":"13"},"1":{"typeId":"38","typeName":"REF","subType":"1"},"2":{"typeId":"39","typeName":"REF","subType":"11"},"3":{"typeId":"40","typeName":"REF","subType":"11"}}}}}}},"union":{"typeId":"14","typeName":"UNION","subType":{"0":{"typeId":"12","typeName":"TUPLE","subType":{"0":{"typeId":"30","typeName":"REF","subType":"1"},"1":{"typeId":"31","typeName":"REF","subType":"11"},"2":{"typeId":"32","typeName":"REF","subType":"11"}}},"1":{"typeId":"27","typeName":"REF","subType":"1"},"2":{"typeId":"28","typeName":"REF","subType":"11"},"3":{"typeId":"29","typeName":"REF","subType":"11"}}},"subType":{"typeId":"18","typeName":"REF","subType":"11"},"inner":{"typeId":"23","typeName":"OBJECT","subType":{"obj1":{"typeId":"19","typeName":"REF","subType":"1"},"selfImpl":{"typeId":"20","typeName":"REF","subType":"11"},"obj2":{"typeId":"21","typeName":"REF","subType":"11"},"tuple":{"typeId":"12","typeName":"TUPLE","subType":{"0":{"typeId":"30","typeName":"REF","subType":"1"},"1":{"typeId":"31","typeName":"REF","subType":"11"},"2":{"typeId":"32","typeName":"REF","subType":"11"}}},"array":{"typeId":"13","typeName":"ARRAY","subType":{"typeId":"42","typeName":"UNION","subType":{"0":{"typeId":"33","typeName":"REF","subType":"13"},"1":{"typeId":"34","typeName":"REF","subType":"1"},"2":{"typeId":"35","typeName":"REF","subType":"11"},"3":{"typeId":"36","typeName":"REF","subType":"11"},"4":{"typeId":"41","typeName":"ARRAY","subType":{"typeId":"43","typeName":"UNION","subType":{"0":{"typeId":"37","typeName":"REF","subType":"13"},"1":{"typeId":"38","typeName":"REF","subType":"1"},"2":{"typeId":"39","typeName":"REF","subType":"11"},"3":{"typeId":"40","typeName":"REF","subType":"11"}}}}}}},"union":{"typeId":"14","typeName":"UNION","subType":{"0":{"typeId":"12","typeName":"TUPLE","subType":{"0":{"typeId":"30","typeName":"REF","subType":"1"},"1":{"typeId":"31","typeName":"REF","subType":"11"},"2":{"typeId":"32","typeName":"REF","subType":"11"}}},"1":{"typeId":"27","typeName":"REF","subType":"1"},"2":{"typeId":"28","typeName":"REF","subType":"11"},"3":{"typeId":"29","typeName":"REF","subType":"11"}}},"subType":{"typeId":"22","typeName":"REF","subType":"11"}}},"_subType1":{"typeId":"25","typeName":"OBJECT","subType":{"subType":{"typeId":"24","typeName":"REF","subType":"11"}}},"_subType2":{"typeId":"26","typeName":"REF","subType":"25"}}}}}'
        )
        expect(JSON.stringify(getSchema(MetaType.getMetaTypeImpl(obj2)))).toEqual(
            '{"typeId":"2","typeName":"OBJECT","subType":{"obj1":{"typeId":"50","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"obj0Rebuild":{"typeId":"63","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"selfImpl":{"typeId":"68","typeName":"REF","subType":"63"}}},"obj1":{"typeId":"65","typeName":"REF","subType":"50"},"selfImpl":{"typeId":"66","typeName":"REF","subType":"50"},"obj2":{"typeId":"67","typeName":"REF","subType":"2"}}},"selfImpl":{"typeId":"51","typeName":"REF","subType":"2"},"obj2":{"typeId":"52","typeName":"REF","subType":"2"},"tuple":{"typeId":"47","typeName":"TUPLE","subType":{"0":{"typeId":"71","typeName":"REF","subType":"50"},"1":{"typeId":"72","typeName":"REF","subType":"2"},"2":{"typeId":"73","typeName":"REF","subType":"2"}}},"array":{"typeId":"48","typeName":"ARRAY","subType":{"typeId":"83","typeName":"UNION","subType":{"0":{"typeId":"74","typeName":"REF","subType":"48"},"1":{"typeId":"75","typeName":"REF","subType":"50"},"2":{"typeId":"76","typeName":"REF","subType":"2"},"3":{"typeId":"77","typeName":"REF","subType":"2"},"4":{"typeId":"82","typeName":"ARRAY","subType":{"typeId":"84","typeName":"UNION","subType":{"0":{"typeId":"78","typeName":"REF","subType":"48"},"1":{"typeId":"79","typeName":"REF","subType":"50"},"2":{"typeId":"80","typeName":"REF","subType":"2"},"3":{"typeId":"81","typeName":"REF","subType":"2"}}}}}}},"union":{"typeId":"49","typeName":"UNION","subType":{"0":{"typeId":"47","typeName":"TUPLE","subType":{"0":{"typeId":"71","typeName":"REF","subType":"50"},"1":{"typeId":"72","typeName":"REF","subType":"2"},"2":{"typeId":"73","typeName":"REF","subType":"2"}}},"1":{"typeId":"50","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"obj0Rebuild":{"typeId":"63","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"selfImpl":{"typeId":"68","typeName":"REF","subType":"63"}}},"obj1":{"typeId":"65","typeName":"REF","subType":"50"},"selfImpl":{"typeId":"66","typeName":"REF","subType":"50"},"obj2":{"typeId":"67","typeName":"REF","subType":"2"}}},"2":{"typeId":"61","typeName":"REF","subType":"2"},"3":{"typeId":"62","typeName":"REF","subType":"2"}}},"subType":{"typeId":"53","typeName":"REF","subType":"2"},"inner":{"typeId":"57","typeName":"OBJECT","subType":{"obj1":{"typeId":"50","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"obj0Rebuild":{"typeId":"63","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"selfImpl":{"typeId":"68","typeName":"REF","subType":"63"}}},"obj1":{"typeId":"65","typeName":"REF","subType":"50"},"selfImpl":{"typeId":"66","typeName":"REF","subType":"50"},"obj2":{"typeId":"67","typeName":"REF","subType":"2"}}},"selfImpl":{"typeId":"54","typeName":"REF","subType":"2"},"obj2":{"typeId":"55","typeName":"REF","subType":"2"},"tuple":{"typeId":"47","typeName":"TUPLE","subType":{"0":{"typeId":"71","typeName":"REF","subType":"50"},"1":{"typeId":"72","typeName":"REF","subType":"2"},"2":{"typeId":"73","typeName":"REF","subType":"2"}}},"array":{"typeId":"48","typeName":"ARRAY","subType":{"typeId":"83","typeName":"UNION","subType":{"0":{"typeId":"74","typeName":"REF","subType":"48"},"1":{"typeId":"75","typeName":"REF","subType":"50"},"2":{"typeId":"76","typeName":"REF","subType":"2"},"3":{"typeId":"77","typeName":"REF","subType":"2"},"4":{"typeId":"82","typeName":"ARRAY","subType":{"typeId":"84","typeName":"UNION","subType":{"0":{"typeId":"78","typeName":"REF","subType":"48"},"1":{"typeId":"79","typeName":"REF","subType":"50"},"2":{"typeId":"80","typeName":"REF","subType":"2"},"3":{"typeId":"81","typeName":"REF","subType":"2"}}}}}}},"union":{"typeId":"49","typeName":"UNION","subType":{"0":{"typeId":"47","typeName":"TUPLE","subType":{"0":{"typeId":"71","typeName":"REF","subType":"50"},"1":{"typeId":"72","typeName":"REF","subType":"2"},"2":{"typeId":"73","typeName":"REF","subType":"2"}}},"1":{"typeId":"50","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"obj0Rebuild":{"typeId":"63","typeName":"OBJECT","subType":{"obj0":{"typeId":"64","typeName":"OBJECT","subType":{"obj0":{"typeId":"69","typeName":"REF","subType":"64"},"selfImpl":{"typeId":"70","typeName":"REF","subType":"64"}}},"selfImpl":{"typeId":"68","typeName":"REF","subType":"63"}}},"obj1":{"typeId":"65","typeName":"REF","subType":"50"},"selfImpl":{"typeId":"66","typeName":"REF","subType":"50"},"obj2":{"typeId":"67","typeName":"REF","subType":"2"}}},"2":{"typeId":"61","typeName":"REF","subType":"2"},"3":{"typeId":"62","typeName":"REF","subType":"2"}}},"subType":{"typeId":"56","typeName":"REF","subType":"2"}}},"_subType1":{"typeId":"59","typeName":"OBJECT","subType":{"subType":{"typeId":"58","typeName":"REF","subType":"2"}}},"_subType2":{"typeId":"60","typeName":"REF","subType":"59"}}}'
        )
        expect(JSON.stringify(getSchema(MetaType.getMetaTypeImpl(obj3)))).toEqual(
            '{"typeId":"6","typeName":"OBJECT","subType":{"typeId":"85","typeName":"TUPLE","subType":{"0":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"1":{"typeId":"87","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"107","typeName":"REF","subType":"87"},"obj2":{"typeId":"108","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"109","typeName":"REF","subType":"87"},"inner":{"typeId":"113","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"110","typeName":"REF","subType":"87"},"obj2":{"typeId":"111","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"112","typeName":"REF","subType":"87"}}},"_subType1":{"typeId":"115","typeName":"OBJECT","subType":{"subType":{"typeId":"114","typeName":"REF","subType":"87"}}},"_subType2":{"typeId":"116","typeName":"REF","subType":"115"}}},"2":{"typeId":"88","typeName":"REF","subType":"6"},"3":{"typeId":"91","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"recursiveObj":{"typeId":"89","typeName":"OBJECT","subType":{"obj1":{"typeId":"155","typeName":"REF","subType":"86"},"recursiveObj":{"typeId":"156","typeName":"REF","subType":"89"},"obj2Rebuild":{"typeId":"157","typeName":"REF","subType":"90"}}},"obj2Rebuild":{"typeId":"90","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"95","typeName":"REF","subType":"90"},"obj2":{"typeId":"87","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"107","typeName":"REF","subType":"87"},"obj2":{"typeId":"108","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"109","typeName":"REF","subType":"87"},"inner":{"typeId":"113","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"110","typeName":"REF","subType":"87"},"obj2":{"typeId":"111","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"112","typeName":"REF","subType":"87"}}},"_subType1":{"typeId":"115","typeName":"OBJECT","subType":{"subType":{"typeId":"114","typeName":"REF","subType":"87"}}},"_subType2":{"typeId":"116","typeName":"REF","subType":"115"}}},"tuple":{"typeId":"92","typeName":"TUPLE","subType":{"0":{"typeId":"141","typeName":"REF","subType":"86"},"1":{"typeId":"142","typeName":"REF","subType":"90"},"2":{"typeId":"143","typeName":"REF","subType":"87"}}},"array":{"typeId":"93","typeName":"ARRAY","subType":{"typeId":"153","typeName":"UNION","subType":{"0":{"typeId":"144","typeName":"REF","subType":"93"},"1":{"typeId":"145","typeName":"REF","subType":"86"},"2":{"typeId":"146","typeName":"REF","subType":"90"},"3":{"typeId":"147","typeName":"REF","subType":"87"},"4":{"typeId":"152","typeName":"ARRAY","subType":{"typeId":"154","typeName":"UNION","subType":{"0":{"typeId":"148","typeName":"REF","subType":"93"},"1":{"typeId":"149","typeName":"REF","subType":"86"},"2":{"typeId":"150","typeName":"REF","subType":"90"},"3":{"typeId":"151","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"94","typeName":"UNION","subType":{"0":{"typeId":"92","typeName":"TUPLE","subType":{"0":{"typeId":"141","typeName":"REF","subType":"86"},"1":{"typeId":"142","typeName":"REF","subType":"90"},"2":{"typeId":"143","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"103","typeName":"REF","subType":"90"},"3":{"typeId":"87","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"107","typeName":"REF","subType":"87"},"obj2":{"typeId":"108","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"109","typeName":"REF","subType":"87"},"inner":{"typeId":"113","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"110","typeName":"REF","subType":"87"},"obj2":{"typeId":"111","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"112","typeName":"REF","subType":"87"}}},"_subType1":{"typeId":"115","typeName":"OBJECT","subType":{"subType":{"typeId":"114","typeName":"REF","subType":"87"}}},"_subType2":{"typeId":"116","typeName":"REF","subType":"115"}}}}},"subType":{"typeId":"96","typeName":"REF","subType":"90"},"inner":{"typeId":"99","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"97","typeName":"REF","subType":"90"},"obj2":{"typeId":"87","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"107","typeName":"REF","subType":"87"},"obj2":{"typeId":"108","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"109","typeName":"REF","subType":"87"},"inner":{"typeId":"113","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"110","typeName":"REF","subType":"87"},"obj2":{"typeId":"111","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"112","typeName":"REF","subType":"87"}}},"_subType1":{"typeId":"115","typeName":"OBJECT","subType":{"subType":{"typeId":"114","typeName":"REF","subType":"87"}}},"_subType2":{"typeId":"116","typeName":"REF","subType":"115"}}},"tuple":{"typeId":"92","typeName":"TUPLE","subType":{"0":{"typeId":"141","typeName":"REF","subType":"86"},"1":{"typeId":"142","typeName":"REF","subType":"90"},"2":{"typeId":"143","typeName":"REF","subType":"87"}}},"array":{"typeId":"93","typeName":"ARRAY","subType":{"typeId":"153","typeName":"UNION","subType":{"0":{"typeId":"144","typeName":"REF","subType":"93"},"1":{"typeId":"145","typeName":"REF","subType":"86"},"2":{"typeId":"146","typeName":"REF","subType":"90"},"3":{"typeId":"147","typeName":"REF","subType":"87"},"4":{"typeId":"152","typeName":"ARRAY","subType":{"typeId":"154","typeName":"UNION","subType":{"0":{"typeId":"148","typeName":"REF","subType":"93"},"1":{"typeId":"149","typeName":"REF","subType":"86"},"2":{"typeId":"150","typeName":"REF","subType":"90"},"3":{"typeId":"151","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"94","typeName":"UNION","subType":{"0":{"typeId":"92","typeName":"TUPLE","subType":{"0":{"typeId":"141","typeName":"REF","subType":"86"},"1":{"typeId":"142","typeName":"REF","subType":"90"},"2":{"typeId":"143","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"103","typeName":"REF","subType":"90"},"3":{"typeId":"87","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"107","typeName":"REF","subType":"87"},"obj2":{"typeId":"108","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"109","typeName":"REF","subType":"87"},"inner":{"typeId":"113","typeName":"OBJECT","subType":{"obj1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"selfImpl":{"typeId":"110","typeName":"REF","subType":"87"},"obj2":{"typeId":"111","typeName":"REF","subType":"87"},"tuple":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"array":{"typeId":"105","typeName":"ARRAY","subType":{"typeId":"139","typeName":"UNION","subType":{"0":{"typeId":"130","typeName":"REF","subType":"105"},"1":{"typeId":"131","typeName":"REF","subType":"86"},"2":{"typeId":"132","typeName":"REF","subType":"87"},"3":{"typeId":"133","typeName":"REF","subType":"87"},"4":{"typeId":"138","typeName":"ARRAY","subType":{"typeId":"140","typeName":"UNION","subType":{"0":{"typeId":"134","typeName":"REF","subType":"105"},"1":{"typeId":"135","typeName":"REF","subType":"86"},"2":{"typeId":"136","typeName":"REF","subType":"87"},"3":{"typeId":"137","typeName":"REF","subType":"87"}}}}}}},"union":{"typeId":"106","typeName":"UNION","subType":{"0":{"typeId":"104","typeName":"TUPLE","subType":{"0":{"typeId":"127","typeName":"REF","subType":"86"},"1":{"typeId":"128","typeName":"REF","subType":"87"},"2":{"typeId":"129","typeName":"REF","subType":"87"}}},"1":{"typeId":"86","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"obj0Rebuild":{"typeId":"119","typeName":"OBJECT","subType":{"obj0":{"typeId":"120","typeName":"OBJECT","subType":{"obj0":{"typeId":"125","typeName":"REF","subType":"120"},"selfImpl":{"typeId":"126","typeName":"REF","subType":"120"}}},"selfImpl":{"typeId":"124","typeName":"REF","subType":"119"}}},"obj1":{"typeId":"121","typeName":"REF","subType":"86"},"selfImpl":{"typeId":"122","typeName":"REF","subType":"86"},"obj2":{"typeId":"123","typeName":"REF","subType":"87"}}},"2":{"typeId":"117","typeName":"REF","subType":"87"},"3":{"typeId":"118","typeName":"REF","subType":"87"}}},"subType":{"typeId":"112","typeName":"REF","subType":"87"}}},"_subType1":{"typeId":"115","typeName":"OBJECT","subType":{"subType":{"typeId":"114","typeName":"REF","subType":"87"}}},"_subType2":{"typeId":"116","typeName":"REF","subType":"115"}}}}},"subType":{"typeId":"98","typeName":"REF","subType":"90"}}},"_subType1":{"typeId":"101","typeName":"OBJECT","subType":{"subType":{"typeId":"100","typeName":"REF","subType":"90"}}},"_subType2":{"typeId":"102","typeName":"REF","subType":"101"}}}}}}}}'
        )
        obj3.toString()

        expect(() => ObjectImpl.build({ subType: 1 as any }).getSubType()).toThrow(TypeError)
    })

    test('LITERAL', () => {
        const metaType = LITERAL(1, {
            nullable: false,
            coercion: true,
            default: 1
        })
        const metaTypeImpl = MetaType.getMetaTypeImpl(metaType) as LiteralImpl

        // toString

        expect(metaTypeImpl.toString()).toBe('LITERAL<1>')

        // compatibility

        expect(LiteralImpl.isCompatible(['any value'])).toBe(true)

        expect(LiteralImpl.getCompatibilityScore([])).toBe(-1)

        // find or get meta type

        expect(metaTypeImpl).toBeInstanceOf(LiteralImpl)

        // metaTypeValidatorFunc

        expect(metaTypeImpl.metaTypeValidatorFunc({ value: 1 })).toBe(true)
        expect(metaTypeImpl.metaTypeValidatorFunc({ value: 2 })).toBe(false)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name
        ]
        const builtinValidators = metaTypeImpl['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)
    })

    test('INSTANCE', () => {
        class Tst {
            someField = 1
        }

        class TstChild extends Tst {}

        const metaType1 = INSTANCE(Tst, {
            nullable: false,
            coercion: true,
            default: new TstChild()
        })
        const metaTypeImpl1 = MetaType.getMetaTypeImpl(metaType1)

        const metaType2 = INSTANCE(Tst, {
            nullable: false,
            coercion: true,
            default: new Tst(),
            allowChildren: false
        })
        const metaTypeImpl2 = MetaType.getMetaTypeImpl(metaType2)

        // toString

        expect(metaTypeImpl2.toString()).toBe('INSTANCE<Tst>')

        // compatibility

        expect(InstanceImpl.isCompatible(new TstChild())).toBe(true)
        expect(InstanceImpl.isCompatible({})).toBe(false)

        expect(InstanceImpl.getCompatibilityScore({})).toBe(2)

        // find or get meta type

        expect(metaTypeImpl1).toBeInstanceOf(InstanceImpl)
        expect(metaTypeImpl2).toBeInstanceOf(InstanceImpl)

        // metaTypeValidatorFunc

        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: new Tst() })).toBe(true)
        expect(metaTypeImpl2.metaTypeValidatorFunc({ value: new Tst() })).toBe(true)

        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: new TstChild() })).toBe(true)
        expect(metaTypeImpl2.metaTypeValidatorFunc({ value: new TstChild() })).toBe(false)

        expect(metaTypeImpl1.metaTypeValidatorFunc({ value: {} })).toBe(false)
        expect(metaTypeImpl2.metaTypeValidatorFunc({ value: {} })).toBe(false)

        // validators

        const expectedValidatorsNames = [
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name
        ]
        const builtinValidators = metaTypeImpl1['builtinValidators'].map((v) => v.name)

        expect(builtinValidators).toEqual(expectedValidatorsNames)

        // serializers

        const expectedSerializersNames = [CoercionSerializer.name]
        const builtinSerializers = metaTypeImpl1['builtinSerializers'].map((s) => s.name)

        expect(builtinSerializers).toEqual(expectedSerializersNames)

        // deserializers

        const expectedDeSerializersNames = [
            DefaultValueDeSerializerBuilder('3').name,
            CoercionDeSerializer.name
        ]
        const builtinDeSerializers = metaTypeImpl1['builtinDeSerializers'].map((s) => s.name)

        expect(builtinDeSerializers).toEqual(expectedDeSerializersNames)

        expect(() => InstanceImpl.build({ subType: 1 as any }).getSubType()).toThrow(TypeError)
        expect(() => InstanceImpl.build({ subType: {} as any }).getSubType()).toThrow(TypeError)
    })
})
