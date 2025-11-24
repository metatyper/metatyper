import { ValidatorArgsType, ValidatorType } from '../metatypes'
import { inspect } from '../utils'
import { MetaError } from './meta.error'

export type ValidatorErrorArgsType = {
    validator: ValidatorType
    validatorArgs: ValidatorArgsType
    subError?: Error
}

export class MetaTypeValidatorError extends MetaError {
    readonly validator: ValidatorType
    readonly validatorArgs: ValidatorArgsType
    readonly subError?: Error

    get code() {
        return this.validator.name || 'Unknown'
    }

    get path() {
        return this.validatorArgs.path ? [...this.validatorArgs.path] : []
    }

    get value() {
        return this.validatorArgs.value
    }

    get targetObject() {
        return this.validatorArgs.targetObject
    }

    constructor(args: ValidatorErrorArgsType) {
        const validator = args.validator
        const validatorArgs = args.validatorArgs

        const subError = args.subError

        const value = inspect(validatorArgs.value)
        const metaTypeImpl = validatorArgs.metaTypeImpl
        const validatorName = validator.name ?? validator.validate.toString()

        const messageStr = subError ? `; message: ${subError?.message}` : ''
        const pathStr = validatorArgs.path ? `; path: ${JSON.stringify(validatorArgs.path)}` : ''

        const message = `Validator error { validator: ${validatorName}; value: ${value}; metaType: ${metaTypeImpl}${pathStr}${messageStr} }`

        super(message)

        this.stack = subError?.stack ?? this.stack

        this.validator = validator
        this.validatorArgs = validatorArgs
        this.subError = subError
    }
}

export class ValidationError extends MetaError {
    constructor(public readonly issues: MetaTypeValidatorError[]) {
        const message = `Validation issues\n${issues.map((v) => `  - ${v.message}`).join('\n')}`

        super(message)
    }
}
