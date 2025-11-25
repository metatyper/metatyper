import { isClass } from '../../utils'
import { MetaTypeImpl } from '../metatypeImpl'

/** Internal context used while resolving nested lazy meta types. */
export type LazyContext = {
    /** Meta type currently being prepared when recursion happens. */
    curImplInLazyProcess?: MetaTypeImpl
} & Record<any, any>

let lazyContext: LazyContext | undefined

/**
 * Base class for meta types whose subtype can be provided lazily via a function.
 * Ensures recursive references are prepared only once and tracks parent builders.
 */
export abstract class LazyMetaTypeImpl extends MetaTypeImpl {
    protected preparedSubType: any
    protected readonly parentLazyImpl: MetaTypeImpl | undefined

    /** Resolves (and caches) the prepared subtype, executing lazy factories when needed. */
    getSubType() {
        if (this.preparedSubType) {
            return this.preparedSubType
        }

        const subType = super.getSubType()

        if (!(subType instanceof Function) || isClass(subType)) {
            return this.prepareLazySubType(() => subType)
        }

        return this.prepareLazySubType(subType)
    }

    /** Captures parent lazy implementation and resets cache before configuration. */
    protected configure() {
        super.configure()

        if (lazyContext) {
            Object.defineProperty(this, 'parentLazyImpl', {
                value: lazyContext.curImplInLazyProcess
            })
        }

        Object.defineProperty(this, 'preparedSubType', {
            value: undefined,
            writable: true
        })
    }

    /** Creates new lazy context used when entering the first lazy resolution. */
    protected createLazyContext(): LazyContext {
        return {
            curImplInLazyProcess: undefined
        }
    }

    /** Returns the current lazy context (if any). */
    protected getLazyContext() {
        return lazyContext as LazyContext
    }

    /** Hook for subclasses to perform extra work after subtype has been prepared. */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected lazyPostProcess(_preparedSubType: any) {
        // default: do nothing
    }

    /** Wraps subtype factory with context handling/caching logic. */
    protected prepareLazySubType(subType: (metaTypeImpl: MetaTypeImpl) => any): any {
        const getResult = () => {
            if (!lazyContext) {
                return this.prepareNoLazySubType(subType(this))
            }

            const prevParentImpl = lazyContext?.curImplInLazyProcess

            try {
                lazyContext.curImplInLazyProcess = this

                const result = this.prepareNoLazySubType(subType(this))

                lazyContext.curImplInLazyProcess = prevParentImpl

                this.preparedSubType = result
                this.lazyPostProcess(result)

                return result
            } catch (e) {
                this.preparedSubType = undefined
                lazyContext.curImplInLazyProcess = prevParentImpl
                throw e
            }
        }

        if (!lazyContext) {
            lazyContext = this.createLazyContext()

            try {
                const result = getResult()

                lazyContext = undefined

                return result
            } catch (e) {
                lazyContext = undefined

                throw e
            }
        } else {
            return getResult()
        }
    }

    /** Default non-lazy subtype preparation (can be overridden by subclasses). */
    protected prepareNoLazySubType(subType: any): any {
        return subType
    }
}
