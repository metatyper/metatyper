import { describe, expect, test } from '@jest/globals'

import {
    CoercionDeSerializer,
    CoercionSerializer,
    DeSerializePlaceType,
    DefaultValueDeSerializerBuilder,
    MetaType,
    MetaTypeImpl,
    MetaTypeValidator,
    MetaTypeValidatorError,
    NullableValidator,
    OptionalValidator,
    SerializePlaceType,
    ValidationError
} from '../../src'

describe('MetaType and MetaTypeImpl', () => {
    test('MetaType.isMetaType', () => {
        const customMetaType = MetaType(MetaTypeImpl.build())

        expect(MetaType.isMetaType(customMetaType)).toBe(true)
        expect(MetaType.isMetaType({})).toBe(false)
    })

    test('MetaType.getMetaTypeImpl', () => {
        const impl = MetaTypeImpl.build({
            name: 'CUSTOM',
            noDefaultSerializers: true,
            noDefaultValidators: true,
            default: 1,
            nullable: false,
            subType: 1
        })
        const customMetaType: any = MetaType(impl)

        expect(MetaType.getMetaTypeImpl(customMetaType)).toBe(impl)
    })

    test('making meta type', () => {
        const serializer = { name: 'custom', serialize: () => 1 }
        const deserializer = { name: 'custom', deserialize: () => 1 }
        const validator = { name: 'custom', validate: () => true }

        const customMetaType0 = MetaType<MetaType<0>>(MetaTypeImpl, { name: 'CUSTOM0' })
        const customMetaType1 = MetaType<MetaType<1>>(MetaTypeImpl.build())
        const customMetaType2 = MetaType<MetaType<2>>(new MetaTypeImpl(), () => ({
            name: 'CUSTOM2'
        }))
        const customMetaType3 = MetaType<MetaType<3>>(
            MetaTypeImpl.build(
                MetaTypeImpl.combineMetaTypeArgs(
                    () => ({
                        name: 'CUSTOM3',
                        noDefaultSerializers: true,
                        noDefaultValidators: true,
                        default: 1,
                        nullable: false,
                        subType: 1
                    }),
                    () => ({
                        validators: [validator],
                        serializers: [serializer],
                        deserializers: [deserializer]
                    })
                )
            )
        )
        const customMetaType4 = MetaType<MetaType<3>>(
            MetaTypeImpl.build({
                name: 'CUSTOM4',
                default: 1,
                nullable: false,
                coercion: true,
                subType: 1,
                validators: [validator],
                serializers: [serializer],
                deserializers: [deserializer]
            })
        )

        expect(MetaType.isMetaType(customMetaType0)).toBe(true)
        expect(MetaType.isMetaType(customMetaType1)).toBe(true)
        expect(MetaType.isMetaType(customMetaType2)).toBe(true)
        expect(MetaType.isMetaType(customMetaType3)).toBe(true)
        expect(MetaType.isMetaType(customMetaType4)).toBe(true)

        const customMetaType0Impl = MetaType.getMetaTypeImpl(customMetaType0)
        const customMetaType1Impl = MetaType.getMetaTypeImpl(customMetaType1)
        const customMetaType2Impl = MetaType.getMetaTypeImpl(customMetaType2)
        const customMetaType3Impl = MetaType.getMetaTypeImpl(customMetaType3)
        const customMetaType4Impl = MetaType.getMetaTypeImpl(customMetaType4)

        expect(customMetaType0Impl.name).toBe('CUSTOM0')
        expect(customMetaType1Impl.name).toBe('METATYPE')
        expect(customMetaType2Impl.name).toBe('CUSTOM2')
        expect(customMetaType3Impl.name).toBe('CUSTOM3')
        expect(customMetaType4Impl.name).toBe('CUSTOM4')

        expect(
            customMetaType4Impl['getAllSerializers']().map((serializer) => serializer.name)
        ).toEqual([CoercionSerializer.name, serializer.name])

        expect(
            customMetaType4Impl['getAllDeSerializers']().map((deserializer) => deserializer.name)
        ).toEqual([
            DefaultValueDeSerializerBuilder(1).name,
            CoercionDeSerializer.name,
            deserializer.name
        ])

        expect(
            customMetaType4Impl['getAllValidators']().map((validator) => validator.name)
        ).toEqual([
            OptionalValidator.name,
            NullableValidator.name,
            MetaTypeValidator.name,
            validator.name
        ])
    })

    test('validate', () => {
        const validator1 = ({ value }: any) => value === 1

        const customMetaType = MetaType(
            MetaTypeImpl.build({
                validators: [validator1],
                noBuiltinValidators: true,
                noBuiltinSerializers: true
            })
        )
        const customMetaTypeImpl = MetaType.getMetaTypeImpl(customMetaType)

        expect(customMetaTypeImpl.validate({ value: 1 })).toBeUndefined()
        const validationError = customMetaTypeImpl.validate({ value: 2 })
        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError?.issues[0]).toBeInstanceOf(MetaTypeValidatorError)

        const aggregatedError = customMetaTypeImpl.validate({
            value: 2,
            stopAtFirstError: false
        })
        expect(aggregatedError).toBeInstanceOf(ValidationError)
        expect(aggregatedError?.issues).toHaveLength(1)
        const validatorError = aggregatedError?.issues[0]
        expect(validatorError).toBeInstanceOf(MetaTypeValidatorError)
        expect(validatorError?.validator.validate).toBe(validator1)
        expect(validatorError?.subError).toBeUndefined()
    })

    test('serialize and deserialize', () => {
        const serializer1 = {
            serialize: ({ value }: any) => {
                return {
                    result: value
                }
            },
            deserialize: ({ value }: any) => value.result,
            serializePlaces: ['get'] as SerializePlaceType[],
            deserializePlaces: ['set'] as DeSerializePlaceType[]
        }

        const customMetaTypeImpl = MetaTypeImpl.build({
            serializers: [serializer1],
            deserializers: [serializer1],
            noBuiltinValidators: true,
            noBuiltinSerializers: true
        })

        expect(customMetaTypeImpl.serialize({ value: 1, place: 'serialize' })).toBe(1)
        expect(
            customMetaTypeImpl.deserialize({ value: { result: 1 }, place: 'deserialize' })
        ).toEqual({ result: 1 })

        expect(customMetaTypeImpl.serialize({ value: 1, place: 'get' })).toEqual({ result: 1 })
        expect(customMetaTypeImpl.deserialize({ value: { result: 1 }, place: 'set' })).toBe(1)
    })

    test('validate nullish / nullable / optional', () => {
        const customMetaType1 = MetaType(
            MetaTypeImpl.build({
                nullish: true
            })
        )
        const customMetaTypeImpl1 = MetaType.getMetaTypeImpl(customMetaType1)

        const customMetaType2 = MetaType(
            MetaTypeImpl.build({
                nullable: true
            })
        )
        const customMetaTypeImpl2 = MetaType.getMetaTypeImpl(customMetaType2)

        const customMetaType3 = MetaType(
            MetaTypeImpl.build({
                optional: true
            })
        )
        const customMetaTypeImpl3 = MetaType.getMetaTypeImpl(customMetaType3)

        const customMetaType4 = MetaType(
            MetaTypeImpl.build({
                nullish: false,
                nullable: true
            })
        )
        const customMetaTypeImpl4 = MetaType.getMetaTypeImpl(customMetaType4)

        const customMetaType5 = MetaType(
            MetaTypeImpl.build({
                nullish: false,
                optional: true
            })
        )
        const customMetaTypeImpl5 = MetaType.getMetaTypeImpl(customMetaType5)

        const customMetaType6 = MetaType(
            MetaTypeImpl.build({
                nullish: true,
                nullable: false
            })
        )
        const customMetaTypeImpl6 = MetaType.getMetaTypeImpl(customMetaType6)

        const customMetaType7 = MetaType(
            MetaTypeImpl.build({
                nullish: true,
                optional: false
            })
        )
        const customMetaTypeImpl7 = MetaType.getMetaTypeImpl(customMetaType7)

        expect(customMetaTypeImpl1.validate({ value: 1 })).toBeUndefined()
        expect(customMetaTypeImpl1.validate({ value: null })).toBeUndefined()
        expect(customMetaTypeImpl1.validate({ value: undefined })).toBeUndefined()

        expect(customMetaTypeImpl2.validate({ value: 1 })).toBeUndefined()
        expect(customMetaTypeImpl2.validate({ value: null })).toBeUndefined()
        expect(
            customMetaTypeImpl2.validate({ value: undefined })
        ).toBeInstanceOf(ValidationError)

        expect(customMetaTypeImpl3.validate({ value: 1 })).toBeUndefined()
        expect(customMetaTypeImpl3.validate({ value: undefined })).toBeUndefined()
        expect(customMetaTypeImpl3.validate({ value: null })).toBeInstanceOf(ValidationError)

        expect(customMetaTypeImpl4.validate({ value: 1 })).toBeUndefined()
        expect(customMetaTypeImpl4.validate({ value: null })).toBeUndefined()
        expect(
            customMetaTypeImpl4.validate({ value: undefined })
        ).toBeInstanceOf(ValidationError)

        expect(customMetaTypeImpl5.validate({ value: 1 })).toBeUndefined()
        expect(customMetaTypeImpl5.validate({ value: undefined })).toBeUndefined()
        expect(customMetaTypeImpl5.validate({ value: null })).toBeInstanceOf(ValidationError)

        expect(customMetaTypeImpl6.validate({ value: 1 })).toBeUndefined()
        expect(customMetaTypeImpl6.validate({ value: undefined })).toBeUndefined()
        expect(customMetaTypeImpl6.validate({ value: null })).toBeInstanceOf(ValidationError)

        expect(customMetaTypeImpl7.validate({ value: 1 })).toBeUndefined()
        expect(customMetaTypeImpl7.validate({ value: null })).toBeUndefined()
        expect(
            customMetaTypeImpl7.validate({ value: undefined })
        ).toBeInstanceOf(ValidationError)
    })
})
