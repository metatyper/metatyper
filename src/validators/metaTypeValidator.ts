import { ValidatorArgsType } from '../metatypes'

export const MetaTypeValidator = {
    name: 'MetaType',
    validate: ({ value, metaTypeImpl }: ValidatorArgsType) => {
        return !metaTypeImpl || metaTypeImpl.metaTypeValidatorFunc({ value, metaTypeImpl })
    }
}
