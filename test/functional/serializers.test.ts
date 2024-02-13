import {
    CoercionDeSerializer,
    CoercionSerializer,
    DeSerializerArgsType,
    FreezeObjectDeSerializer,
    MetaTypeDeSerializerError,
    MetaTypeImpl,
    MetaTypeSerializerError,
    ReplaceValuesDeSerializerBuilder,
    SerializerArgsType,
    SubValuesDeSerializer,
    SubValuesSerializer,
    ToLowerCaseDeSerializer,
    ToUpperCaseDeSerializer
} from '../../src'

describe('Serializers and Deserializers', () => {
    const customSerializer = {
        serialize: ({ value }: any) => value,
        deserialize: ({ value }: any) => value
    }

    const customSerializerError = new MetaTypeSerializerError(customSerializer, {
        value: 'custom',
    })

    const customDeSerializerError = new MetaTypeDeSerializerError(customSerializer, {
        value: 'custom'
    })

    test('Coercion', () => {
        const emptyMetaTypeImpl = MetaTypeImpl.build({
            serializers: [CoercionSerializer],
            deserializers: [CoercionDeSerializer],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            emptyMetaTypeImpl.deserialize({
                value: 1,
                place: 'deserialize'
            })
        ).toBe(1)

        expect(
            emptyMetaTypeImpl.serialize({
                value: 1,
                place: 'serialize'
            })
        ).toBe(1)

        const metaTypeImpl = class extends MetaTypeImpl {
            castToType({ value }: DeSerializerArgsType) {
                if (value === 0) {
                    throw customDeSerializerError
                }

                return 'castToType'
            }

            castToRawValue({ value }: SerializerArgsType) {
                if (value === 0) {
                    throw customSerializerError
                }

                return 'castToRawValue'
            }
        }.build({
            serializers: [CoercionSerializer],
            deserializers: [CoercionDeSerializer],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            metaTypeImpl.deserialize({
                value: 1
            })
        ).toBe('castToType')

        try {
            const result = metaTypeImpl.deserialize({
                value: 0
            })

            expect(result).toBe('metaTypeImpl.deserialize should throw a serialization error')
        } catch (e) {
            if (e instanceof MetaTypeDeSerializerError) {
                expect(e.deserializer).toBe(CoercionDeSerializer)
                expect(e.deserializerErrorArgs.subError).toBe(customDeSerializerError)
            } else {
                throw e
            }
        }

        expect(
            metaTypeImpl.serialize({
                value: 1,
                place: 'serialize'
            })
        ).toBe('castToRawValue')

        expect(
            metaTypeImpl.serialize({
                value: 1,
                place: 'get'
            })
        ).toBe(1)

        try {
            const result = metaTypeImpl.serialize({
                value: 0,
                place: 'serialize'
            })

            expect(result).toBe('metaTypeImpl.serialize should throw a serialization error')
        } catch (e) {
            if (e instanceof MetaTypeSerializerError) {
                expect(e.serializer).toBe(CoercionSerializer)
                expect(e.serializerErrorArgs.subError).toBe(customSerializerError)
            } else {
                throw e
            }
        }
    })

    test('SubValues', () => {
        const emptyMetaTypeImpl = MetaTypeImpl.build({
            serializers: [SubValuesSerializer],
            deserializers: [SubValuesDeSerializer],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            emptyMetaTypeImpl.deserialize({
                value: 1
            })
        ).toBe(1)

        expect(
            emptyMetaTypeImpl.serialize({
                value: 1
            })
        ).toBe(1)

        const metaTypeImpl = class extends MetaTypeImpl {
            deserializeSubValues({ value }: DeSerializerArgsType) {
                if (value === 0) {
                    throw customDeSerializerError
                }

                return 'deserializeSubValues'
            }

            serializeSubValues({ value }: SerializerArgsType) {
                if (value === 0) {
                    throw customSerializerError
                }

                return 'serializeSubValues'
            }
        }.build({
            serializers: [SubValuesSerializer],
            deserializers: [SubValuesDeSerializer],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            metaTypeImpl.deserialize({
                value: 1
            })
        ).toBe('deserializeSubValues')

        try {
            const result = metaTypeImpl.deserialize({
                value: 0
            })

            expect(result).toBe('metaTypeImpl.deserialize should throw a serialization error')
        } catch (e) {
            if (e instanceof MetaTypeDeSerializerError) {
                expect(e.deserializer).toBe(SubValuesDeSerializer)
                expect(e.deserializerErrorArgs.subError).toBe(customDeSerializerError)
            } else {
                throw e
            }
        }

        expect(
            metaTypeImpl.serialize({
                value: 1
            })
        ).toBe('serializeSubValues')

        try {
            const result = metaTypeImpl.serialize({
                value: 0
            })

            expect(result).toBe('metaTypeImpl.serialize should throw a serialization error')
        } catch (e) {
            if (e instanceof MetaTypeSerializerError) {
                expect(e.serializer).toBe(SubValuesSerializer)
                expect(e.serializerErrorArgs.subError).toBe(customSerializerError)
            } else {
                throw e
            }
        }
    })

    test('FreezeObjectDeSerializer', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            deserializers: [FreezeObjectDeSerializer],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            Object.isFrozen(
                metaTypeImpl.deserialize({
                    value: {}
                })
            )
        ).toBe(true)

        const obj = Object.create({})

        expect(
            Reflect.getPrototypeOf(
                metaTypeImpl.deserialize({
                    value: obj
                })
            )
        ).toBe(Reflect.getPrototypeOf(obj))

        expect(Object.isFrozen(obj)).toBe(false)

        expect(
            metaTypeImpl.deserialize({
                value: 1
            })
        ).toBe(1)

        expect(
            metaTypeImpl.deserialize({
                value: undefined
            })
        ).toBe(undefined)

        expect(
            metaTypeImpl.deserialize({
                value: null
            })
        ).toBe(null)
    })

    test('ToLowerCaseSerializer', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            deserializers: [ToLowerCaseDeSerializer],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            metaTypeImpl.deserialize({
                value: 'aBc'
            })
        ).toBe('abc')

        expect(
            metaTypeImpl.deserialize({
                value: 1
            })
        ).toBe(1)

        expect(
            metaTypeImpl.deserialize({
                value: undefined
            })
        ).toBe(undefined)

        expect(
            metaTypeImpl.deserialize({
                value: null
            })
        ).toBe(null)
    })

    test('ToUpperCaseSerializer', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            deserializers: [ToUpperCaseDeSerializer],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            metaTypeImpl.deserialize({
                value: 'aBc'
            })
        ).toBe('ABC')

        expect(
            metaTypeImpl.deserialize({
                value: 1
            })
        ).toBe(1)

        expect(
            metaTypeImpl.deserialize({
                value: undefined
            })
        ).toBe(undefined)

        expect(
            metaTypeImpl.deserialize({
                value: null
            })
        ).toBe(null)
    })

    test('ReplaceValuesSerializer', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            deserializers: [ReplaceValuesDeSerializerBuilder(['y', '1'], true)],
            noBuiltinSerializers: true,
            noBuiltinDeSerializers: true
        })

        expect(
            metaTypeImpl.deserialize({
                value: '1'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.deserialize({
                value: 'y'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.deserialize({
                value: 1
            })
        ).toBe(1)

        expect(
            metaTypeImpl.deserialize({
                value: undefined
            })
        ).toBe(undefined)

        expect(
            metaTypeImpl.deserialize({
                value: null
            })
        ).toBe(null)
    })
})
