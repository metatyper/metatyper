import { ValidatorArgsType } from '../metatypes'

/** Validator that delegates compatibility checks to the current meta type implementation. */
export const MetaTypeValidator = {
    name: 'MetaType',
    validate: ({ metaTypeImpl, ...args }: ValidatorArgsType) => {
        return !metaTypeImpl || metaTypeImpl.metaTypeValidatorFunc({ metaTypeImpl, ...args })
    }
}
