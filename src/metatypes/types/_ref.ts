import { MetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeImpl,
    SerializerArgsType,
    ValidatorArgsType
} from '../metatypeImpl'
import { LazyMetaTypeImpl } from './_lazy'

export class RefImpl extends LazyMetaTypeImpl {
    protected prepareNoLazySubType(subType: any) {
        if (!subType) {
            throw new TypeError('subType cannot be empty')
        }

        if (MetaType.isMetaType(subType)) {
            subType = MetaType.getMetaTypeImpl(subType)
        }

        if (subType instanceof MetaTypeImpl) {
            return subType
        }

        throw new TypeError('subType must be an MetaTypeImpl instance')
    }

    getSubType() {
        return super.getSubType() as MetaTypeImpl
    }

    toString() {
        return `${this.name}<${this.getSubType().id}>`
    }

    validate(args: ValidatorArgsType) {
        if (args.value === undefined) return true

        return this.getSubType().validate(args)
    }

    serialize(args: SerializerArgsType) {
        return this.getSubType().serialize(args)
    }

    deserialize(args: DeSerializerArgsType) {
        return this.getSubType().deserialize(args)
    }
}
