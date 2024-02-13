import { MetaType } from '../metatype'
import { MetaTypeArgs, MetaTypeImpl } from '../metatypeImpl'

export class AnyImpl extends MetaTypeImpl {
    static isCompatible(_value: any) {
        return true
    }
}

/**
 * metatype that similar to the builtin 'any'
 *
 * @param args - {@link MetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *      a: ANY({ nullish: true })
 * }) // as { a: any }
 *
 * obj1.a = 1
 * obj1.a = {}
 * ```
 */
export function ANY(args?: MetaTypeArgs<ANY>) {
    return MetaType(AnyImpl, args)
}

export type ANY = MetaType<any, AnyImpl>
