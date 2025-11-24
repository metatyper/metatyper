import { FreezeObjectDeSerializer } from '../../serializers'
import { deepMap, isPlainObject } from '../../utils'
import { MetaTypeValidatorError, ValidationError } from '../../errors'
import { MetaType, MetaTypeFlag, PrepareMetaType } from '../metatype'
import {
    DeSerializerArgsType,
    MetaTypeArgsType,
    MetaTypeImpl,
    SerializerArgsType,
    ValidatorArgsType
} from '../metatypeImpl'
import { StructuralMetaTypeImpl } from './_structural'
import { AnyImpl } from './any'

export type ObjectMetaTypeArgs<
    T = OBJECT<object>,
    RequiredKeysT extends (keyof any)[] = string[],
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false
> = MetaTypeArgsType<T, IsNullishT, IsNullableT, IsOptionalT> & {
    freeze?: IsFrozenT
    required?: RequiredKeysT
    serializeSubValues?: boolean
}

@MetaTypeImpl.registerMetaType()
export class ObjectImpl extends StructuralMetaTypeImpl {
    protected prepareMetaTypeArgs(
        metaTypeArgs: MetaTypeArgsType
    ): MetaTypeArgsType<any, boolean, boolean, boolean> {
        metaTypeArgs = super.prepareMetaTypeArgs(metaTypeArgs)

        if (!Reflect.has(metaTypeArgs, 'default') && !metaTypeArgs.optional) {
            metaTypeArgs.default = {}
        }

        return metaTypeArgs
    }

    protected prepareSubType(subType: any) {
        if (!subType) subType = {}

        return super.prepareSubType(subType)
    }

    protected prepareNoLazySubType(subType: any) {
        if (isPlainObject(subType) && !Object.keys(subType).length) {
            subType = AnyImpl.build()
        }

        return super.prepareNoLazySubType(subType)
    }

    protected configure() {
        super.configure()

        if (this.metaTypeArgs.freeze) {
            this.builtinDeSerializers.push(FreezeObjectDeSerializer)
        }
    }

    metaTypeValidatorFunc({ value, stopAtFirstError, ...args }: ValidatorArgsType) {
        if (value == null) return true

        if (!(value instanceof Object) || Array.isArray(value)) {
            return false
        }

        const subType = this.getSubType()

        if (subType instanceof AnyImpl) {
            return value instanceof Object
        }

        const requiredArg = this.metaTypeArgs.required
            ? (this.metaTypeArgs.required.filter(
                  (k: keyof any) => typeof k === 'string'
              ) as string[])
            : undefined

        if (subType instanceof MetaTypeImpl) {
            const requiredKeys = requiredArg ?? []

            if (!requiredKeys.every((k) => !!Reflect.getOwnPropertyDescriptor(value, k))) {
                return false
            }

            const errors: MetaTypeValidatorError[] = []

            for (const key of Object.keys(value)) {
                if (deepMap.getCircularRefInfo(value[key])) {
                    continue
                }

                const error = subType.validate({
                    ...args,
                    value: value[key],
                    stopAtFirstError,
                    path: args.path ? [...args.path, key] : [key]
                })

                if (error) {
                    errors.push(...error.issues)
                }

                if (stopAtFirstError && errors.length > 0) {
                    break
                }
            }

            if (errors.length > 0) {
                return new ValidationError(errors)
            }
        } else {
            const requiredKeys = requiredArg ?? Object.keys(subType)

            if (!requiredKeys.every((k) => !!Reflect.getOwnPropertyDescriptor(value, k))) {
                return false
            }

            const errors: MetaTypeValidatorError[] = []

            for (const key of Object.keys(value)) {
                if (deepMap.getCircularRefInfo(value[key])) {
                    continue
                }

                const metaType = subType[key]

                if (!metaType) continue

                const validatorTarget = MetaType.isMetaType(metaType)
                    ? MetaType.getMetaTypeImpl(metaType)
                    : metaType

                const error = validatorTarget.validate({
                    ...args,
                    value: value[key],
                    stopAtFirstError,
                    path: args.path ? [...args.path, key] : [key]
                }) as ValidationError | undefined

                if (error) {
                    errors.push(...error.issues)
                }

                if (stopAtFirstError && errors.length > 0) {
                    break
                }
            }

            if (errors.length > 0) {
                return new ValidationError(errors)
            }
        }

        return true
    }

    serializeSubValues({ value, ...args }: SerializerArgsType) {
        if (!value) return value

        const subType = this.getSubType()

        if (subType instanceof MetaTypeImpl) {
            return Object.fromEntries(
                Object.entries(value).map(([key, item]) => [
                    key,
                    subType.serialize({
                        value: item,
                        targetObject: args.targetObject,
                        baseObject: args.baseObject,
                        place: args.place
                    })
                ])
            )
        } else {
            return Object.fromEntries(
                Object.entries(value).map(([key, item]) => [
                    key,
                    subType[key]
                        ? (subType[key] as MetaTypeImpl).serialize({
                              value: item,
                              targetObject: args.targetObject,
                              baseObject: args.baseObject,
                              place: args.place
                          })
                        : item
                ])
            )
        }
    }

    deserializeSubValues({ value, ...args }: DeSerializerArgsType) {
        if (!value) return value

        const subType = this.getSubType()

        if (subType instanceof MetaTypeImpl) {
            return Object.fromEntries(
                Object.entries(value).map(([key, item]) => [
                    key,
                    subType.deserialize({
                        value: item,
                        targetObject: args.targetObject,
                        baseObject: args.baseObject,
                        place: args.place
                    })
                ])
            )
        } else {
            return Object.fromEntries(
                Object.entries(value).map(([key, item]) => [
                    key,
                    subType[key]
                        ? (subType[key] as MetaTypeImpl).deserialize({
                              value: item,
                              targetObject: args.targetObject,
                              baseObject: args.baseObject,
                              place: args.place
                          })
                        : item
                ])
            )
        }
    }

    static isCompatible(value: any) {
        return value && typeof value === 'object' && !Array.isArray(value)
    }

    static getCompatibilityScore(_value: any) {
        return 0
    }
}

/**
 * metatype that works like an object or an `Record<string, MetaType>`
 *
 * @param subType - object structure with types or meta type (`Record<string, MetaType>`)
 * @param args - {@link ObjectMetaTypeArgs}
 *
 * @example
 * ```ts
 * const obj1 = Meta({
 *     a: OBJECT(
 *         {
 *             a1: 1,
 *             a2: 'string',
 *             a3: [BOOLEAN()]
 *         },
 *         { nullish: true }
 *     )
 * }) // as { a: { a1: number, a2: string, a3: boolean[] } | null | undefined }
 *
 * obj1.a = { a1: 1, a2: 'str', a3: [true, false] }
 * obj1.a = { a1: 1, a2: 'str', a3: [true, false, 1] } // type & validation error
 *
 * const obj2 = Meta({
 *     c: OBJECT(BOOLEAN(), { nullish: true })
 * }) // as { c: Record<string, boolean> | null | undefined }
 *
 * obj2.c = { _someKey: true }
 * obj2.c = { _someKey: 10 } // type & validation error
 * ```
 */
export function OBJECT<
    T extends ObjectFlag,
    RequiredKeysArrayT extends string[] = never,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    PreparedT = T extends Record<keyof any, never> ? any : T extends MetaTypeImpl ? unknown : T,
    ResultT = OBJECT<
        [RequiredKeysArrayT] extends [never]
            ? IsFrozenT extends true
                ? Readonly<Record<string, PreparedT>>
                : Record<string, PreparedT>
            : IsFrozenT extends true
              ? { readonly [k in RequiredKeysArrayT[any]]: PreparedT } & Readonly<
                    Record<string, PreparedT>
                >
              : { [k in RequiredKeysArrayT[any]]: PreparedT } & Record<string, PreparedT>
    >,
    RArgT extends ResultT = ResultT
>(
    subType: T,
    args?: ObjectMetaTypeArgs<
        RArgT,
        [...RequiredKeysArrayT],
        IsNullishT,
        IsNullableT,
        IsOptionalT,
        IsFrozenT
    >
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function OBJECT<
    T extends ObjectFlag,
    RequiredKeysArrayT extends string[] = never,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    PreparedT = T extends Record<keyof any, never> ? any : T extends MetaTypeImpl ? unknown : T,
    ResultT = OBJECT<
        [RequiredKeysArrayT] extends [never]
            ? IsFrozenT extends true
                ? Readonly<Record<string, PreparedT>>
                : Record<string, PreparedT>
            : IsFrozenT extends true
              ? { readonly [k in RequiredKeysArrayT[any]]: PreparedT } & Readonly<
                    Record<string, PreparedT>
                >
              : { [k in RequiredKeysArrayT[any]]: PreparedT } & Record<string, PreparedT>
    >,
    RArgT extends ResultT = ResultT
>(
    subType: (metaTypeImpl: ObjectImpl) => T,
    args?: ObjectMetaTypeArgs<
        RArgT,
        [...RequiredKeysArrayT],
        IsNullishT,
        IsNullableT,
        IsOptionalT,
        IsFrozenT
    >
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function OBJECT<
    T = unknown,
    RequiredKeysArrayT extends string[] = never,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    ResultT = OBJECT<
        [RequiredKeysArrayT] extends [never]
            ? IsFrozenT extends true
                ? Readonly<Record<string, T>>
                : Record<string, T>
            : IsFrozenT extends true
              ? { readonly [k in RequiredKeysArrayT[any]]: T } & Readonly<Record<string, T>>
              : { [k in RequiredKeysArrayT[any]]: T } & Record<string, T>
    >,
    RArgT extends ResultT = ResultT
>(
    subType: MetaTypeImpl | ((metaTypeImpl: ObjectImpl) => MetaTypeImpl),
    args?: ObjectMetaTypeArgs<
        RArgT,
        [...RequiredKeysArrayT],
        IsNullishT,
        IsNullableT,
        IsOptionalT,
        IsFrozenT
    >
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function OBJECT<
    T extends MetaTypeFlag | undefined | null,
    RequiredKeysArrayT extends string[] = never,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    PreparedT = T extends Record<keyof any, never> ? any : T extends MetaTypeImpl ? unknown : T,
    ResultT = OBJECT<
        [RequiredKeysArrayT] extends [never]
            ? IsFrozenT extends true
                ? Readonly<Record<string, PreparedT>>
                : Record<string, PreparedT>
            : IsFrozenT extends true
              ? { readonly [k in RequiredKeysArrayT[any]]: PreparedT } & Readonly<
                    Record<string, PreparedT>
                >
              : { [k in RequiredKeysArrayT[any]]: PreparedT } & Record<string, PreparedT>
    >,
    RArgT extends ResultT = ResultT
>(
    subType: T | ((metaTypeImpl: ObjectImpl) => T),
    args?: ObjectMetaTypeArgs<
        RArgT,
        [...RequiredKeysArrayT],
        IsNullishT,
        IsNullableT,
        IsOptionalT,
        IsFrozenT
    >
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function OBJECT<
    T extends Record<keyof any, any>,
    IsNullishT extends boolean = false,
    IsNullableT extends boolean = IsNullishT,
    IsOptionalT extends boolean = IsNullishT,
    IsFrozenT extends boolean = false,
    KeysT extends keyof T = {
        [K in keyof T]: K extends string ? K : never
    }[keyof T],
    RequiredKeysT extends KeysT = KeysT,
    OptionalKeysT extends KeysT = {
        [K in KeysT]: K extends RequiredKeysT ? never : K
    }[KeysT],
    ResultObjectT = ([RequiredKeysT] extends [never]
        ? unknown
        : { [k in RequiredKeysT]-?: T[k] extends MetaTypeImpl ? unknown : T[k] }) &
        ([OptionalKeysT] extends [never]
            ? unknown
            : { [k in OptionalKeysT]?: T[k] extends MetaTypeImpl ? unknown : T[k] }),
    ResultT = OBJECT<
        T extends any[]
            ? IsFrozenT extends true
                ? { readonly [k in keyof T]: T[k] extends MetaTypeImpl ? unknown : T[k] }
                : { [k in keyof T]: T[k] extends MetaTypeImpl ? unknown : T[k] }
            : IsFrozenT extends true
              ? { readonly [key in keyof ResultObjectT]: ResultObjectT[key] }
              : { [key in keyof ResultObjectT]: ResultObjectT[key] }
    >,
    RArgT extends ResultT = ResultT
>(
    subType?: T | ((metaTypeImpl: ObjectImpl) => T),
    args?: ObjectMetaTypeArgs<
        RArgT,
        T extends any[] ? never[] : [...RequiredKeysT[]],
        IsNullishT,
        IsNullableT,
        IsOptionalT,
        IsFrozenT
    >
): PrepareMetaType<ResultT, IsNullishT, IsNullableT, IsOptionalT>

export function OBJECT(subType?: any, args?: any): any {
    return MetaType(ObjectImpl, {
        ...args,
        subType
    })
}

declare const IsOBJECT: unique symbol

type ObjectFlag = {
    readonly [IsOBJECT]?: true
}

export type OBJECT<T> = MetaType<T, ObjectImpl> & ObjectFlag
