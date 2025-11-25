import { ValidatorArgsType, ValidatorType } from '../metatypes'
import { inspect } from '../utils'
import { MetaError } from './meta.error'

/** Arguments collected when a validator throws or returns `false`. */
export type ValidatorErrorArgsType = {
    /** Validator definition that failed. */
    validator: ValidatorType
    /** Context passed to the validator (value, meta type, path, etc.). */
    validatorArgs: ValidatorArgsType
    /** Underlying error thrown inside the validator, if any. */
    subError?: Error
}

/**
 * Error describing a single validator failure.
 * Exposes helpers like `code`, `path`, `value`, and `targetObject`.
 */
export class MetaTypeValidatorError extends MetaError {
    readonly validator: ValidatorType
    readonly validatorArgs: ValidatorArgsType
    readonly subError?: Error

    /** Identifier for the validator (name or 'Unknown'). */
    get code() {
        return this.validator.name || 'Unknown'
    }

    /** Path to the property within the validated object. */
    get path() {
        return this.validatorArgs.path ? [...this.validatorArgs.path] : []
    }

    /** Offending value. */
    get value() {
        return this.validatorArgs.value
    }

    /** Meta object instance that was being validated. */
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

/**
 * General validation error. Contains a list of validation issues (list of {@link MetaTypeValidatorError}).
 */
export class ValidationError extends MetaError {
    constructor(public readonly issues: MetaTypeValidatorError[]) {
        const message = `Validation issues\n${issues.map((v) => `  - ${v.message}`).join('\n')}`

        super(message)
    }
}
