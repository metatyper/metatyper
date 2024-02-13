import { isClass } from '../../utils'
import { MetaTypeImpl } from '../metatypeImpl'

export type LazyContext = {
    curImplInLazyProcess?: MetaTypeImpl
} & Record<any, any>

let lazyContext: LazyContext | undefined

export abstract class LazyMetaTypeImpl extends MetaTypeImpl {
    protected preparedSubType: any
    protected readonly parentLazyImpl: MetaTypeImpl | undefined

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

    protected createLazyContext(): LazyContext {
        return {
            curImplInLazyProcess: undefined
        }
    }

    protected getLazyContext() {
        return lazyContext as LazyContext
    }

    protected lazyPostProcess(_preparedSubType: any) {
        // to do something
    }

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

    protected prepareNoLazySubType(subType: any): any {
        return subType
    }
}
