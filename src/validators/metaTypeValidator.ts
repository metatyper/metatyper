import { ValidatorArgsType } from '../metatypes'

export const MetaTypeValidator = {
    name: 'MetaType',
    validate: ({ metaTypeImpl, ...args }: ValidatorArgsType) => {
        return !metaTypeImpl || metaTypeImpl.metaTypeValidatorFunc({ metaTypeImpl, ...args })
    }
}
