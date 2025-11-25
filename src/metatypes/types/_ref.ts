import { MetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeImpl,
    SerializerArgsType,
    ValidatorArgsType
} from '../metatypeImpl'
import { LazyMetaTypeImpl } from './_lazy'

/**
 * Internal meta type used to represent references during recursive schema building.
 * Simply forwards all operations to the referenced meta type once resolved.
 */
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

    /** Returns the resolved meta type implementation that this ref points to. */
    getSubType() {
        return super.getSubType() as MetaTypeImpl
    }

    toString() {
        return `${this.name}<${this.getSubType().id}>`
    }

    /** Forwards validation to the referenced meta type (skips when value is `undefined`). */
    validate(args: ValidatorArgsType) {
        if (args.value === undefined) return

        return this.getSubType().validate(args)
    }

    /** Forwards serialization to the referenced meta type. */
    serialize(args: SerializerArgsType) {
        return this.getSubType().serialize(args)
    }

    /** Forwards deserialization to the referenced meta type. */
    deserialize(args: DeSerializerArgsType) {
        return this.getSubType().deserialize(args)
    }
}
