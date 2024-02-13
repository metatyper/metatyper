import 'reflect-metadata'

import { describe, expect, test } from '@jest/globals'

import {
    AnyImpl,
    ArrayImpl,
    BigIntImpl,
    BooleanImpl,
    DATE,
    DateImpl,
    InstanceImpl,
    M,
    Meta,
    MetaObjectRegistryInfo,
    MetaObjectRegistryInfoSymbol,
    MetaTypeImpl,
    MetaTypeValidationError,
    NUMBER,
    NumberImpl,
    STRING,
    StringImpl,
    getDescriptorValue
} from '../../src'

describe('Meta objects', () => {
    let idCounter = 0

    MetaTypeImpl.prototype['generateId'] = () => (idCounter++).toString()

    beforeEach(() => {
        idCounter = 0
    })

    test('MetaObject', () => {
        const SymbolA = Symbol('a')
        const SymbolB = Symbol('b')

        let _a = {} as any
        let _b = {} as any

        const origObjA = {
            a: 0,
            a1: NUMBER({
                default: 1,
                serializers: [
                    {
                        serialize: ({ value }) => (value || 0) - 10
                    }
                ],
                deserializers: [
                    {
                        deserialize: ({ value }) => (value || 0) + 5
                    }
                ],
                validators: [{ validate: ({ value }) => (value || 0) < 20 }]
            }),
            base: 2,
            [SymbolA]: -1,
            toString() {
                return 'a'
            },
            func() {
                return this
            },
            get _a() {
                return this
            },
            set _a(value: any) {
                _a = [value, this]
            }
        } as Record<string | symbol, any>
        const origObjB = {
            b: '3',
            b1: STRING({ nullish: true, deserializers: [({ value }) => value ?? null] }),
            base: '5',
            [SymbolB]: -2,
            toString() {
                return 'b'
            },
            func() {
                return this
            },
            get _b() {
                return this
            },
            set _b(value: any) {
                _b = [value, this]
            }
        } as Record<string | symbol, any>

        const metaObjA = Meta(origObjA)
        const metaObjB = Meta(origObjB)

        expect(metaObjA.a).toBe(0)
        metaObjA.a = 1
        expect(metaObjA.a).toBe(1)
        expect(() => {
            metaObjA.a = '2'
        }).toThrow(MetaTypeValidationError)
        expect(metaObjA.a).toBe(1)

        expect(() => {
            metaObjA.a1 = 100
        }).toThrow(MetaTypeValidationError)

        expect(metaObjA.a1).toBe(-4)
        expect(metaObjA.base).toBe(2)
        expect(metaObjA[SymbolA]).toBe(-1)
        expect(metaObjA.toString()).toBe('a')
        expect(metaObjA.func()).toBe(metaObjA)
        expect(metaObjA['_a']).toBe(metaObjA)
        metaObjA._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(metaObjA)

        expect(metaObjB.a).toBe(undefined)
        expect(metaObjB.a1).toBe(undefined)
        expect(metaObjB[SymbolA]).toBe(undefined)

        Object.setPrototypeOf(origObjB, origObjA)

        expect(metaObjB.b).toBe('3')
        expect(metaObjB.b1).toBe(null)
        expect(metaObjB.base).toBe('5')
        expect(metaObjB[SymbolB]).toBe(-2)
        expect(metaObjB.toString()).toBe('b')
        expect(metaObjB.func()).toBe(metaObjB)
        expect(metaObjB['_b']).toBe(metaObjB)
        metaObjB._b = 1
        expect(_b[0]).toBe(1)
        expect(_b[1]).toBe(metaObjB)

        expect(metaObjB.a).toBe(0)
        expect(metaObjB.a1).toBe(origObjA.a1)
        expect(metaObjB[SymbolA]).toBe(-1)
        expect(metaObjB['_a']).toBe(metaObjB)
        metaObjB._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(metaObjB)
    })

    test('MetaClass', () => {
        let _a = {} as any
        let _b = {} as any
        let _c = {} as any

        class OrigA {
            a = 0
            a1 = NUMBER({
                default: 1,
                serializers: [
                    {
                        serialize: ({ value }) => (value || 0) - 10
                    }
                ],
                deserializers: [
                    {
                        deserialize: ({ value }) => (value || 0) + 5
                    }
                ],
                validators: [{ validate: ({ value }) => (value || 0) < 20 }]
            })
            base = 5

            toString() {
                return 'a'
            }

            func() {
                return this
            }

            get _a() {
                return this
            }

            set _a(value: any) {
                _a = [value, this]
            }

            static a = 10
            static a1 = NUMBER({
                default: 1,
                serializers: [
                    {
                        serialize: ({ value }) => (value || 0) - 10
                    }
                ],
                deserializers: [
                    {
                        deserialize: ({ value }) => (value || 0) + 5
                    }
                ],
                validators: [{ validate: ({ value }) => (value || 0) < 20 }]
            })

            static base = 5

            static toString() {
                return 'a'
            }

            static func() {
                return this
            }

            static get _a() {
                return this
            }

            static set _a(value: any) {
                _a = [value, this]
            }
        }

        class OrigB extends OrigA {
            b = 0
            b1 = NUMBER({
                serializers: [
                    {
                        serialize: ({ value }) => (value || 0) - 10
                    }
                ],
                deserializers: [
                    {
                        deserialize: ({ value }) => (value || 0) + 5
                    }
                ],
                validators: [{ validate: ({ value }) => (value || 0) < 20 }]
            })

            base = 6

            toString() {
                return 'b'
            }

            func() {
                return this
            }

            get _b() {
                return this
            }

            set _b(value: any) {
                _b = [value, this]
            }

            static b = 10
            static b1 = NUMBER({
                serializers: [
                    {
                        serialize: ({ value }) => (value || 0) - 10
                    }
                ],
                deserializers: [
                    {
                        deserialize: ({ value }) => (value || 0) + 5
                    }
                ],
                validators: [{ validate: ({ value }) => (value || 0) < 20 }]
            })

            static base = 6

            static toString() {
                return 'b'
            }

            static func() {
                return this
            }

            static get _b() {
                return this
            }

            static set _b(value: any) {
                _b = [value, this]
            }
        }

        const MetaClsA = Meta(OrigA)
        const MetaClsB = Meta(OrigB)

        @Meta.Class()
        class MetaClsC extends MetaClsB {
            c = 20

            @Meta.declare(
                NUMBER({
                    default: 0,
                    serializers: [
                        {
                            serialize: ({ value }) => (value || 0) - 10
                        }
                    ],
                    deserializers: [
                        {
                            deserialize: ({ value }) => (value || 0) + 5
                        }
                    ],
                    validators: [{ validate: ({ value }) => (value || 0) < 20 }]
                })
            )
            c1: any

            base = 26

            toString() {
                return 'c'
            }

            func() {
                return this
            }

            get _c() {
                return this
            }

            set _c(value: any) {
                _c = [value, this]
            }

            static c = 10

            @M.d({
                default: -200,
                validators: [{ validate: ({ value }) => (value || 0) < -100 }]
            })
            static c1 = NUMBER({
                default: 0,
                serializers: [
                    {
                        serialize: ({ value }) => (value || 0) - 10
                    }
                ],
                deserializers: [
                    {
                        deserialize: ({ value }) => (value || 0) + 5
                    }
                ],
                validators: [{ validate: ({ value }) => (value || 0) < 20 }]
            })

            static base = 6

            static toString() {
                return 'c'
            }

            static func() {
                return this
            }

            static get _c() {
                return this
            }

            static set _c(value: any) {
                _c = [value, this]
            }
        }

        // static cls MetaClsA

        expect(MetaClsA.a).toBe(10)
        MetaClsA.a = 1
        expect(MetaClsA.a).toBe(1)
        expect(() => {
            MetaClsA.a = '2' as any
        }).toThrow(MetaTypeValidationError)
        expect(MetaClsA.a).toBe(1)

        expect(() => {
            MetaClsA.a1 = 100
        }).toThrow(MetaTypeValidationError)

        expect(MetaClsA.a1).toBe(-4)
        expect(MetaClsA.base).toBe(5)
        expect(MetaClsA.toString()).toBe('a')
        expect(MetaClsA.func()).toBe(MetaClsA)
        expect(MetaClsA['_a']).toBe(MetaClsA)
        MetaClsA._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(MetaClsA)

        // static cls MetaClsB

        expect(MetaClsB.b).toBe(10)
        expect(MetaClsB.b1).toBe(-5)
        expect(MetaClsB.base).toBe(6)
        expect(MetaClsB.toString()).toBe('b')
        expect(MetaClsB.func()).toBe(MetaClsB)
        expect(MetaClsB['_b']).toBe(MetaClsB)
        MetaClsB._b = 1
        expect(_b[0]).toBe(1)
        expect(_b[1]).toBe(MetaClsB)

        expect(MetaClsB.a).toBe(10)
        expect(MetaClsB.a1).toBe(OrigA.a1)
        expect(MetaClsB['_a']).toBe(MetaClsB)
        MetaClsB._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(MetaClsB)

        // static cls MetaClsC

        expect(MetaClsC.c).toBe(10)
        expect(MetaClsC.c1).toBe(-5)
        expect(MetaClsC.base).toBe(6)
        expect(MetaClsC.toString()).toBe('c')
        expect(MetaClsC.func()).toBe(MetaClsC)
        expect(MetaClsC['_c']).toBe(MetaClsC)
        MetaClsC._c = 1
        expect(_c[0]).toBe(1)
        expect(_c[1]).toBe(MetaClsC)

        expect(MetaClsC.a).toBe(10)
        expect(MetaClsC.a1).toBe(OrigA.a1)
        expect(MetaClsC['_a']).toBe(MetaClsC)
        MetaClsC._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(MetaClsC)

        expect(Meta.serialize(MetaClsC)).toMatchObject({
            base: 6,
            c: 10,
            c1: -5
        })

        expect(() => {
            Meta.deserialize(MetaClsC, { c1: 100 })
        }).toThrow(MetaTypeValidationError)

        expect(MetaClsC.c1).toBe(-5)
        expect(() => Meta.deserialize(MetaClsC, { c1: 16 })).toThrow(MetaTypeValidationError)

        // instances

        const metaA = new MetaClsA()
        const metaB = new MetaClsB()
        const metaC = new MetaClsC()

        // metaA

        expect(metaA.a).toBe(0)
        metaA.a = 1
        expect(metaA.a).toBe(1)
        expect(() => {
            metaA.a = '2' as any
        }).toThrow(MetaTypeValidationError)
        expect(metaA.a).toBe(1)

        expect(() => {
            metaA.a1 = 100
        }).toThrow(MetaTypeValidationError)

        expect(metaA.a1).toBe(-4)
        expect(metaA.base).toBe(5)
        expect(metaA.toString()).toBe('a')
        expect(metaA.func()).toBe(metaA)
        expect(metaA['_a']).toBe(metaA)
        metaA._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(metaA)

        // metaB

        expect(metaB.b).toBe(0)
        expect(metaB.b1).toBe(-5)
        expect(metaB.base).toBe(6)
        expect(metaB.toString()).toBe('b')
        expect(metaB.func()).toBe(metaB)
        expect(metaB['_b']).toBe(metaB)
        metaB._b = 1
        expect(_b[0]).toBe(1)
        expect(_b[1]).toBe(metaB)

        expect(metaB.a).toBe(0)
        expect(metaB.a1).toBe(-4)
        expect(metaB['_a']).toBe(metaB)
        metaB._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(metaB)

        // metaC

        expect(metaC.c).toBe(20)
        expect(metaC.c1).toBe(-5)
        expect(metaC.base).toBe(26)
        expect(metaC.toString()).toBe('c')
        expect(metaC.func()).toBe(metaC)
        expect(metaC['_c']).toBe(metaC)
        metaC._c = 1
        expect(_c[0]).toBe(1)
        expect(_c[1]).toBe(metaC)

        expect(metaC.a).toBe(0)
        expect(metaC.a1).toBe(-4)
        expect(metaC['_a']).toBe(metaC)
        metaC._a = 1
        expect(_a[0]).toBe(1)
        expect(_a[1]).toBe(metaC)

        expect(metaC.a1).toBe(-4)
        expect(() => {
            metaC.a1 = 100
        }).toThrow(MetaTypeValidationError)

        // Meta methods

        expect(Meta.serialize(metaC)).toMatchObject({
            a: 0,
            a1: -4,
            base: 26,
            b: 0,
            b1: -5,
            c: 20,
            c1: -5
        })

        expect(() => {
            Meta.deserialize(metaC, { a1: 100 })
        }).toThrow(MetaTypeValidationError)

        expect(Meta.validationIsActive(metaC)).toBe(true)
        Meta.disableValidation(metaC)
        expect(Meta.validationIsActive(metaC)).toBe(false)

        expect(Meta.serializationIsActive(metaC)).toBe(true)
        Meta.disableSerialization(metaC)
        expect(Meta.serializationIsActive(metaC)).toBe(false)

        Meta.deserialize(metaC, { a1: 100 })
        expect(metaC.a1).toBe(100)

        Meta.enableValidation(metaC)
        expect(Meta.validationIsActive(metaC)).toBe(true)

        Meta.enableSerialization(metaC)
        expect(Meta.serializationIsActive(metaC)).toBe(true)

        expect(() => {
            Meta.deserialize(metaC, { a1: 100 })
        }).toThrow(MetaTypeValidationError)

        expect(Meta.getMetaArgs(metaC)).toEqual({
            serializationIsActive: true,
            validationIsActive: true
        })

        expect(Meta.getMetaArgs({})).toEqual(null)
    })

    test('MetaFunction', () => {
        const origFunc = function (this: any, ...args: any[]) {
            if (this) {
                this.prop = true
            }

            return [this, args]
        }
        const metaFunc = Meta(origFunc)

        expect(metaFunc(1)).toEqual([undefined, [1]])

        const instance = new (metaFunc as any)(1)

        expect(instance).toEqual([{ prop: true }, [1]])

        expect(instance[0]).toBeInstanceOf(origFunc)
    })

    test('reflectType', () => {
        class A {
            prop = true
        }

        @Meta.Class()
        class C {
            @M.d({ nullish: true })
            a?: number

            @M.d({ nullish: true })
            b?: string

            @M.d({ nullish: true })
            c?: boolean

            @M.d({ nullish: true })
            d?: bigint

            @M.d({ nullish: true })
            e?: Date

            @M.d({ nullish: true })
            f?: [number]

            @M.d({ nullish: true })
            g?: { prop: number }

            @M.d({ nullish: true })
            h?: A
        }

        const instance: any = new C()
        const registryInfo = getDescriptorValue(
            instance,
            MetaObjectRegistryInfoSymbol
        ) as MetaObjectRegistryInfo
        const declaration = registryInfo.declarations

        expect(declaration.a).toBeInstanceOf(NumberImpl)
        expect(declaration.b).toBeInstanceOf(StringImpl)
        expect(declaration.c).toBeInstanceOf(BooleanImpl)
        expect(declaration.d).toBeInstanceOf(BigIntImpl)
        expect(declaration.e).toBeInstanceOf(DateImpl)
        expect(declaration.f).toBeInstanceOf(ArrayImpl)
        expect(declaration.g).toBeInstanceOf(AnyImpl)
        expect(declaration.h).toBeInstanceOf(InstanceImpl)
    })

    test('meta object change event', () => {
        const handler = jest.fn()
        const customError = new Error('err')

        const actions: any = ['init']

        const metaObject = Meta(
            {
                a: NUMBER({ nullish: true, deserializers: [({ value }) => value ?? null] }),
                b: NUMBER({ nullish: true, deserializers: [({ value }) => value ?? null] })
            },
            {
                changeHandlers: [
                    {
                        handler: (args) => {
                            handler(args)

                            if (args.descriptor?.value === 0) {
                                throw customError
                            }
                        },
                        actions,
                        props: ['a']
                    }
                ]
            }
        )

        expect(handler.mock.calls).toEqual([
            [
                {
                    action: 'init',
                    baseObject: { a: null, b: null },
                    targetObject: { a: null, b: null },
                    declaration: { id: '0', name: 'NUMBER' },
                    descriptor: {
                        configurable: true,
                        enumerable: true,
                        value: null,
                        writable: true
                    },
                    propName: 'a'
                }
            ]
        ])

        metaObject['a'] = 1

        expect(handler.mock.calls).toEqual([
            [
                {
                    action: 'init',
                    baseObject: { a: 1, b: null },
                    targetObject: { a: 1, b: null },
                    declaration: { id: '0', name: 'NUMBER' },
                    descriptor: {
                        configurable: true,
                        enumerable: true,
                        value: null,
                        writable: true
                    },
                    propName: 'a'
                }
            ]
        ])

        actions.push('define', 'set')

        metaObject['b'] = 2

        expect(handler.mock.calls).toEqual([
            [
                {
                    action: 'init',
                    targetObject: { a: 1, b: 2 },
                    baseObject: { a: 1, b: 2 },
                    propName: 'a',
                    descriptor: {
                        value: null,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    declaration: { id: '0', name: 'NUMBER' }
                }
            ]
        ])

        metaObject['a'] = 2

        expect(handler.mock.calls).toEqual([
            [
                {
                    action: 'init',
                    targetObject: { a: 2, b: 2 },
                    baseObject: { a: 2, b: 2 },
                    propName: 'a',
                    descriptor: {
                        value: null,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    declaration: { id: '0', name: 'NUMBER' }
                }
            ],
            [
                {
                    action: 'define',
                    targetObject: { a: 2, b: 2 },
                    baseObject: { a: 2, b: 2 },
                    propName: 'a',
                    prevDescriptor: {
                        value: 1,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    descriptor: { value: 2 },
                    prevDeclaration: { id: '0', name: 'NUMBER' },
                    declaration: { id: '0', name: 'NUMBER' }
                }
            ],
            [
                {
                    action: 'set',
                    baseObject: { a: 2, b: 2 },
                    targetObject: { a: 2, b: 2 },
                    propName: 'a',
                    prevDescriptor: {
                        value: 1,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    descriptor: { value: 2 }
                }
            ]
        ])

        expect(() => {
            metaObject['a'] = 0
        }).toThrow(customError)

        expect(handler.mock.calls).toEqual([
            [
                {
                    action: 'init',
                    targetObject: { a: 0, b: 2 },
                    baseObject: { a: 0, b: 2 },
                    propName: 'a',
                    descriptor: {
                        value: null,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    declaration: { id: '0', name: 'NUMBER' }
                }
            ],
            [
                {
                    action: 'define',
                    targetObject: { a: 0, b: 2 },
                    baseObject: { a: 0, b: 2 },
                    propName: 'a',
                    prevDescriptor: {
                        value: 1,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    descriptor: { value: 2 },
                    prevDeclaration: { id: '0', name: 'NUMBER' },
                    declaration: { id: '0', name: 'NUMBER' }
                }
            ],
            [
                {
                    action: 'set',
                    baseObject: { a: 0, b: 2 },
                    targetObject: { a: 0, b: 2 },
                    propName: 'a',
                    prevDescriptor: {
                        value: 1,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    descriptor: { value: 2 }
                }
            ],
            [
                {
                    action: 'define',
                    targetObject: { a: 0, b: 2 },
                    baseObject: { a: 0, b: 2 },
                    propName: 'a',
                    prevDescriptor: {
                        value: 2,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    descriptor: { value: 0 },
                    prevDeclaration: { id: '0', name: 'NUMBER' },
                    declaration: { id: '0', name: 'NUMBER' }
                }
            ]
        ])
    })

    test('meta object error event', () => {
        const handler = jest.fn()
        const customError = new Error('err')

        const places: any = ['init', 'validate']

        const metaObject = Meta(
            {
                a: NUMBER({ nullish: true, deserializers: [({ value }) => value ?? null] }),
                b: NUMBER({ nullish: true, deserializers: [({ value }) => value ?? null] })
            },
            {
                errorHandlers: [
                    {
                        handler: (args) => {
                            handler(args)

                            if (args.errorPlace === 'validate') {
                                throw customError
                            }
                        },
                        places
                    }
                ]
            }
        )

        expect(handler.mock.calls).toEqual([])

        expect(() => {
            metaObject['a'] = '1' as any
        }).toThrow(MetaTypeValidationError)

        expect(handler.mock.calls).toEqual([])

        places.push('set')

        expect(() => {
            metaObject['a'] = '1' as any
        }).toThrow(MetaTypeValidationError)

        expect(JSON.stringify(handler.mock.calls)).toBe(
            '[[{"error":{"validator":{"name":"MetaType"},"validatorErrorArgs":{"value":"1","metaTypeImpl":{"id":"0","name":"NUMBER"},"targetObject":{"a":null,"b":null},"propName":"a"}},"targetObject":{"a":null,"b":null},"baseObject":{"a":null,"b":null},"errorPlace":"set"}]]'
        )

        expect(() => {
            Meta.validate(metaObject, {
                a: '1'
            })
        }).toThrow(customError)

        expect(JSON.stringify(handler.mock.calls)).toBe(
            '[[{"error":{"validator":{"name":"MetaType"},"validatorErrorArgs":{"value":"1","metaTypeImpl":{"id":"0","name":"NUMBER"},"targetObject":{"a":null,"b":null},"propName":"a"}},"targetObject":{"a":null,"b":null},"baseObject":{"a":null,"b":null},"errorPlace":"set"}],[{"error":{"validator":{"name":"MetaType"},"validatorErrorArgs":{"value":"1","metaTypeImpl":{"id":"0","name":"NUMBER"},"targetObject":{"a":null,"b":null},"baseObject":{"a":null,"b":null},"propName":"a"}},"targetObject":{"a":null,"b":null},"baseObject":{"a":null,"b":null},"errorPlace":"validate"}]]'
        )
    })

    test('ignore props as func', () => {
        const metaObject = Meta(
            { a: NUMBER({ nullish: true }), b: NUMBER({ nullish: true }) },
            {
                ignoreProps(propName) {
                    return propName === 'b'
                }
            }
        )

        expect(() => {
            metaObject['a'] = '1' as any
        }).toThrow(MetaTypeValidationError)

        metaObject['b'] = '1' as any
    })

    test('represent child of a meta object', () => {
        const metaObject = Meta(
            Object.create(
                {},
                {
                    a: {
                        value: NUMBER({
                            nullish: true,
                            deserializers: [({ value }) => value ?? null]
                        }),
                        enumerable: true,
                        writable: true
                    },
                    b: {
                        value: NUMBER({
                            nullish: true,
                            deserializers: [({ value }) => value ?? null]
                        }),
                        enumerable: true
                    },
                    c: {
                        value: NUMBER({
                            nullish: true,
                            deserializers: [({ value }) => value ?? null]
                        }),
                        enumerable: true
                    }
                }
            ),
            {
                ignoreProps(propName) {
                    return propName === 'b'
                }
            }
        )

        const metaObjectChild = Object.create(metaObject, {
            name: {
                value: 'metaObjectChild'
            },
            c: {
                value: '3',
                enumerable: true
            },
            d: {
                value: 4,
                enumerable: true
            }
        })

        expect(metaObjectChild.toString()).toBe(
            "[<meta child> object metaObjectChild] { c = '3'; d = 4 }"
        )

        const metaChild = Meta(
            Object.create(metaObject, {
                b: {
                    value: NUMBER({
                        nullish: true,
                        deserializers: [({ value }) => value ?? null]
                    }),
                    enumerable: true,
                    writable: true
                },
                d: {
                    value: NUMBER({
                        nullish: true,
                        deserializers: [({ value }) => value ?? null]
                    }),
                    enumerable: true,
                    writable: false
                }
            })
        )

        expect(metaChild.toString()).toBe(
            '[<meta> object] { b: NUMBER = null; readonly d: NUMBER = null; [a]: NUMBER = null; [readonly c]: NUMBER = null }'
        )
    })

    test('prepareMetaTypeArgs', () => {
        const metaObject = Meta(
            { a: NUMBER({ nullish: true }) },
            {
                metaTypesArgs(metaTypeImpl) {
                    if (metaTypeImpl instanceof NumberImpl)
                        return {
                            default: 2
                        }

                    return {}
                }
            }
        )

        expect(metaObject.a).toBe(2)
    })

    test('reassign meta type', () => {
        const metaObject = Meta(
            { a: NUMBER({ nullish: true }) },
            {
                metaTypesArgs(metaTypeImpl) {
                    if (metaTypeImpl instanceof NumberImpl)
                        return {
                            default: 2
                        }

                    return {}
                }
            }
        )

        metaObject.a = NUMBER({
            default: 3
        })

        expect(metaObject.a).toBe(2)
    })

    test('update descriptor', () => {
        const metaObject = Meta({ a: NUMBER({ nullish: true }) })

        Object.defineProperty(metaObject, 'a', {
            writable: false
        })

        expect(() => {
            metaObject.a = 2
        }).toThrow(TypeError)

        Object.defineProperty(metaObject, 'a', {
            get() {
                return 1
            },
            set() {}
        })

        metaObject.a = 2
        expect(metaObject.a).toBe(1)
    })

    test('delete descriptor', () => {
        const metaObject = Meta({ a: NUMBER({ nullish: true }) as any })

        delete metaObject['a']

        metaObject.a = '2'
        expect(metaObject.a).toBe('2')
    })

    test('validate', () => {
        expect(() => {
            Meta.validate({ a: DATE() }, { a: true })
        }).toThrow(MetaTypeValidationError)
    })

    test('serialize', () => {
        expect(Meta.serialize({ a: STRING({ nullish: true }) })).toEqual({ a: undefined })
    })

    test('deserialize', () => {
        expect(Meta.deserialize({ a: STRING({ nullish: true }) }, { a: '' })).toEqual({ a: '' })
    })

    test('copy', () => {
        const metaObject = Meta({ a: STRING({ default: 's' }) })
        const metaObjectCopy = Meta.copy(metaObject)

        expect(metaObjectCopy).not.toBe(metaObject)
        expect(Meta.isMetaObject(metaObjectCopy)).toBe(true)
        expect(metaObjectCopy).toEqual(metaObject)
        expect(metaObjectCopy).toEqual({ a: 's' })
    })

    test('rebuild', () => {
        const metaObject = Meta({ a: STRING({ default: 's' }) })

        metaObject.a = 'new string'

        const metaObjectRebuild1 = Meta.rebuild(metaObject, {})
        const metaObjectRebuild2 = Meta.rebuild(metaObject, {
            initialValues: { a: 'new string 2' }
        })

        expect(metaObjectRebuild1).not.toBe(metaObject)
        expect(metaObjectRebuild1).not.toBe(metaObjectRebuild2)
        expect(Meta.isMetaObject(metaObjectRebuild1)).toBe(true)
        expect(Meta.isMetaObject(metaObjectRebuild2)).toBe(true)
        expect(metaObjectRebuild1).toEqual({ a: 's' })
        expect(metaObjectRebuild2).toEqual({ a: 'new string 2' })
    })

    test('proto', () => {
        const protoObject = { a: STRING({ nullish: true }) }
        const metaObject = Meta(protoObject)

        expect(Meta.proto(metaObject)).toBe(protoObject)
    })

    test('toJson', () => {
        expect(Meta.toJson(Meta({ a: STRING({ nullish: true, default: 'str' }) }))).toEqual(
            JSON.stringify({ a: 'str' })
        )
        expect(Meta.toJson({ a: STRING({ nullish: true, default: 'str' }) })).toEqual(
            JSON.stringify({ a: 'str' })
        )
    })

    test('fromJson', () => {
        expect(
            Meta.isMetaObject(Meta.fromJson({ a: STRING({ nullish: true }) }, '{"a": "str"}'))
        ).toBe(true)
        expect(Meta.fromJson({ a: STRING({ nullish: true }) }, '{"a": "str"}')).toEqual({
            a: 'str'
        })

        expect(
            Meta.isMetaObject(
                Meta.fromJson(Meta({ a: STRING({ nullish: true }) }), '{"a": "str"}')
            )
        ).toBe(true)
        expect(Meta.fromJson(Meta({ a: STRING({ nullish: true }) }), '{"a": "str"}')).toEqual({
            a: 'str'
        })
    })
})
