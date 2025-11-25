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
    ValidationError,
    ValidatorArgsType
} from '../../src'

describe('Validators', () => {
    const customError = new Error('custom')

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
        ).toBeUndefined()

        const failedValidation = metaTypeImpl.validate({
            value: 2,
            metaTypeImpl
        })

        expect(failedValidation).toBeInstanceOf(ValidationError)
        expect(failedValidation?.issues[0]).toBeInstanceOf(MetaTypeValidatorError)

        const thrownValidation = metaTypeImpl.validate({
            value: 0,
            metaTypeImpl
        })

        expect(thrownValidation).toBeInstanceOf(ValidationError)

        const firstSubError = thrownValidation?.issues[0]

        expect(firstSubError).toBeInstanceOf(MetaTypeValidatorError)
        expect(firstSubError?.validator).toBe(MetaTypeValidator)
        expect(firstSubError?.subError).toBe(customError)
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
        ).toBeUndefined()
        expect(
            metaTypeImpl.validate({
                value: undefined,
                metaTypeImpl
            })
        ).toBeUndefined()
        expect(
            metaTypeImpl.validate({
                value: null,
                metaTypeImpl
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()
        expect(
            metaTypeImpl.validate({
                value: null,
                metaTypeImpl
            })
        ).toBeUndefined()
        expect(
            metaTypeImpl.validate({
                value: undefined,
                metaTypeImpl
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: {}
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: []
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: ''
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: {}
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: '12'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: [1]
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: {}
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: [1, 2]
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: '12'
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: new Date()
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 0
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: '0'
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: new Date(0)
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: NaN
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: new Date(0)
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 2
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: '2'
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: new Date(2)
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: NaN
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: new Date()
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: '2'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: new Date(1)
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: NaN
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: new Date(0)
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: '0'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 1
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: '1'
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: new Date(1)
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: NaN
            })
        ).toBeInstanceOf(ValidationError)
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
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 'abc'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 'abcd'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: `abcd`
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 'abc1'
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: []
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: undefined
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: null
            })
        ).toBeUndefined()

        expect(
            metaTypeImpl.validate({
                value: 'abc12'
            })
        ).toBeInstanceOf(ValidationError)

        expect(
            metaTypeImpl.validate({
                value: 'ab1'
            })
        ).toBeInstanceOf(ValidationError)
    })
})
