import { ValidatorArgsType, ValidatorType } from '../metatypes'
import { inspect } from '../utils'
import { MetaError } from './meta.error'

export abstract class MetaTypeValidationError extends MetaError {}

export type ValidatorErrorArgsType = ValidatorArgsType & {
    subError?: Error
}

export class MetaTypeValidatorError extends MetaTypeValidationError {
    readonly validator: ValidatorType
    readonly validatorErrorArgs: ValidatorErrorArgsType

    constructor(validator: ValidatorType, validatorErrorArgs: ValidatorErrorArgsType) {
        const value = inspect(validatorErrorArgs.value)
        const metaTypeImpl = validatorErrorArgs.metaTypeImpl
        const validatorName = validator.name ?? validator.validate.toString()

        const message = `Validator error { validator: ${validatorName}; value: ${value}; metaType: ${metaTypeImpl} }`

        super(message)

        this.validator = validator
        this.validatorErrorArgs = validatorErrorArgs
    }
}

export class MetaTypeValidatorsArrayError extends MetaTypeValidationError {
    validatorsErrors: MetaTypeValidatorError[]

    constructor(validatorsErrors: MetaTypeValidatorError[]) {
        const message = `Validation errors: ${validatorsErrors.map((v) => v.message).join(' & ')}`

        super(message)

        this.validatorsErrors = validatorsErrors
    }
}
