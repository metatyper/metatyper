import {
    GreaterValidatorBuilder,
    LessValidatorBuilder,
    MaxLengthValidatorBuilder,
    MaxValidatorBuilder,
    MetaTypeImpl,
    MetaTypeValidator,
    MetaTypeValidatorError,
    MinLengthValidatorBuilder,
    MinValidatorBuilder,
    NotEmptyValidator,
    NullableValidator,
    OptionalValidator,
    RegExpValidatorBuilder,
    ValidatorArgsType
} from '../../src'

describe('Validators', () => {
    const customValidator = {
        validate: () => true
    }

    const customError = new MetaTypeValidatorError(customValidator, { value: 'custom' })

    test('MetaTypeValidator', () => {
        const metaTypeImpl = class extends MetaTypeImpl {
            metaTypeValidatorFunc({ value }: ValidatorArgsType) {
                if (value === 0) {
                    throw customError
                }

                return value === 1
            }
        }.build({
            validators: [MetaTypeValidator],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 1,
                metaTypeImpl
            })
        ).toBe(true)
        expect(() =>
            metaTypeImpl.validate({
                value: 2,
                metaTypeImpl
            })
        ).toThrow(MetaTypeValidatorError)

        try {
            const result = metaTypeImpl.validate({
                value: 0,
                metaTypeImpl
            })

            expect(result).toBe('metaTypeImpl.validate should throw a validation error')
        } catch (e) {
            if (e instanceof MetaTypeValidatorError) {
                expect(e.validator).toBe(MetaTypeValidator)
                expect(e.validatorErrorArgs.subError).toBe(customError)
            } else {
                throw e
            }
        }
    })

    test('NullableValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [NullableValidator],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 0,
                metaTypeImpl
            })
        ).toBe(true)
        expect(
            metaTypeImpl.validate({
                value: undefined,
                metaTypeImpl
            })
        ).toBe(true)
        expect(() =>
            metaTypeImpl.validate({
                value: null,
                metaTypeImpl
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('OptionalValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [OptionalValidator],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 0,
                metaTypeImpl
            })
        ).toBe(true)
        expect(
            metaTypeImpl.validate({
                value: null,
                metaTypeImpl
            })
        ).toBe(true)
        expect(() =>
            metaTypeImpl.validate({
                value: undefined,
                metaTypeImpl
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('NotEmptyValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [NotEmptyValidator],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: [1]
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: {}
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: []
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: ''
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('MinLengthValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [MinLengthValidatorBuilder(2)],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: [1, 2]
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: {}
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: '12'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: [1]
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: '1'
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('MaxLengthValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [MaxLengthValidatorBuilder(1)],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: [1]
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: {}
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: [1, 2]
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: '12'
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('MinValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [MinValidatorBuilder(1)],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: new Date()
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: 0
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: '0'
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: new Date(0)
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: NaN
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('MaxValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [MaxValidatorBuilder(1)],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: new Date(0)
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: 2
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: '2'
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: new Date(2)
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: NaN
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('GreaterValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [GreaterValidatorBuilder(1)],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 2
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: new Date()
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: '2'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: 1
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: '1'
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: new Date(1)
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: NaN
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('LessValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [LessValidatorBuilder(1)],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: new Date(0)
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: '0'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: 1
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: '1'
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: new Date(1)
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: NaN
            })
        ).toThrow(MetaTypeValidatorError)
    })

    test('RegExpValidator', () => {
        const metaTypeImpl = MetaTypeImpl.build({
            validators: [RegExpValidatorBuilder('^abc.?$')],
            noBuiltinValidators: true
        })

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 'abc'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 'abcd'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: `abcd`
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: 'abc1'
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: []
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBe(true)

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBe(true)

        expect(() =>
            metaTypeImpl.validate({
                value: 'abc12'
            })
        ).toThrow(MetaTypeValidatorError)

        expect(() =>
            metaTypeImpl.validate({
                value: 'ab1'
            })
        ).toThrow(MetaTypeValidatorError)
    })
})
