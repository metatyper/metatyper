import { SubValuesDeSerializer, SubValuesSerializer } from '../../serializers'
import { deepMap, isPlainObject } from '../../utils'
import { MetaType } from '../metatype'
import { MetaTypeImpl } from '../metatypeImpl'
import { LazyContext, LazyMetaTypeImpl } from './_lazy'
import { RefImpl } from './_ref'

export type LazyStructuresContext = LazyContext & {
    rebuildingMap: WeakMap<MetaTypeImpl, MetaTypeImpl>
    preparedTypesSet: WeakSet<MetaTypeImpl>
}

/**
 * Base implementation shared by ARRAY/OBJECT/TUPLE/UNION meta types.
 * Adds automatic handling for nested structures, recursive references and sub-value (de)serialization.
 */
export abstract class StructuralMetaTypeImpl extends LazyMetaTypeImpl {
    private typesToPrepare = new Set<MetaTypeImpl>()

    protected configure() {
        super.configure()

        if (!('serializeSubValues' in this.metaTypeArgs) || this.metaTypeArgs.serializeSubValues) {
            this.builtinSerializers.push(SubValuesSerializer)
            this.builtinDeSerializers.push(SubValuesDeSerializer)
        }

        Object.defineProperty(this, 'typesToPrepare', {
            writable: true,
            enumerable: false,
            configurable: false
        })
    }

    protected createLazyContext(): LazyStructuresContext {
        return {
            ...super.createLazyContext(),
            rebuildingMap: new WeakMap(),
            preparedTypesSet: new WeakSet()
        }
    }

    protected getLazyContext() {
        return super.getLazyContext() as LazyStructuresContext
    }

    protected prepareNoLazySubType(subType: any): any {
        if (!(subType instanceof Object)) {
            throw new TypeError(`subType must be an object`)
        }

        const context = this.getLazyContext()
        const subTypeToImplMap = new WeakMap<any, MetaTypeImpl>()

        context.preparedTypesSet.add(this)

        return deepMap(subType, ({ value, isRootValue }) => {
            const circularRef = deepMap.getCircularRefInfo(value)

            if (circularRef) {
                value = RefImpl.build({
                    subType: () => {
                        return subTypeToImplMap.get(circularRef.source)
                    }
                })
            }

            if (MetaType.isMetaType(value)) {
                value = MetaType.getMetaTypeImpl(value)
            }

            if (value instanceof MetaTypeImpl) {
                if (context.rebuildingMap.has(value)) {
                    value = context.rebuildingMap.get(value)
                }

                if (context.preparedTypesSet.has(value)) {
                    value = RefImpl.build({
                        subType: value
                    })
                } else if (!(value as LazyMetaTypeImpl)['parentLazyImpl']) {
                    const origValue = value

                    value = value.rebuild()

                    context.rebuildingMap.set(origValue, value)
                }

                this.typesToPrepare.add(value)

                return value
            }

            if (isRootValue) {
                subTypeToImplMap.set(value, this)

                return value
            }

            const result = MetaTypeImpl.getMetaTypeImpl(value)

            if (result) {
                if (isPlainObject(value)) {
                    subTypeToImplMap.set(value, result)
                }

                this.typesToPrepare.add(result)
            }

            return result
        })
    }

    protected lazyPostProcess() {
        for (const impl of Array.from(this.typesToPrepare).reverse()) {
            impl.getSubType() // prepare all subTypes
        }

        this.typesToPrepare.clear()
    }

    protected toStringSubType() {
        let subType = this.getSubType()

        if (MetaType.isMetaType(subType)) {
            subType = MetaType.getMetaTypeImpl(subType)
        }

        if (subType instanceof MetaTypeImpl) {
            return subType.toString()
        }

        if (subType instanceof Array) {
            const subTypeRepresentation = Object.values(subType).join(', ')

            return `[ ${subTypeRepresentation} ]`
        }

        if (subType instanceof Object) {
            const subTypeRepresentation = Object.entries(subType)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ')

            return `{ ${subTypeRepresentation} }`
        }

        return subType.toString()
    }

    toString() {
        return `${this.name}(${this.id})<${this.toStringSubType()}>`
    }
}
