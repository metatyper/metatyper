import { MetaType } from '../metatype'
import { MetaTypeArgsType, MetaTypeImpl } from '../metatypeImpl'

/** Implementation for the unconstrained `ANY` meta type. */
export class AnyImpl extends MetaTypeImpl {
    static isCompatible(_value: any) {
        return true
    }
}

/**
 * Creates a runtime meta type equivalent to TypeScript's `any`.
 *
 * @param args - Standard {@link MetaTypeArgsType} options (defaults, optional, etc.).
 *
 * @example
 * ```ts
 * const obj = Meta({ field: ANY({ nullish: true }) }) // as { field: any }
 * obj.field = 1
 * obj.field = {}
 * ```
 */
export function ANY(args?: MetaTypeArgsType<ANY>) {
    return MetaType(AnyImpl, args)
}

export type ANY = MetaType<any, AnyImpl>
