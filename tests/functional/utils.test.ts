import { Meta, MetaType, OBJECT, inspect, isClass } from '../../src'

describe('utils', () => {
    test('inspectMetaValue', () => {
        const obj1: any = OBJECT(() => ({ obj1 }), {
            nullish: true,
            deserializers: [({ value }) => value ?? null]
        })
        const obj1Impl: any = MetaType.getMetaTypeImpl(obj1)

        obj1Impl.id = '0'

        const obj4SubType: any = {
            obj1,
            obj1Impl
        }

        obj4SubType['obj4SubType'] = obj4SubType
        obj4SubType['metaobject'] = [
            Meta({
                obj1
            })
        ]
        obj4SubType['arr'] = [obj4SubType]
        obj4SubType['arr'].push(obj4SubType['arr'])
        obj4SubType['func1'] = () => obj4SubType
        obj4SubType['func2'] = function func2() {}

        expect(inspect(obj4SubType)).toBe(
            '<ref *1> { arr: <ref *2> [ [Circular *1], [Circular *2] ], func1: [Function: (anonymous)], func2: [Function: func2], metaobject: [ [<meta> object] { obj1: OBJECT(0)<{ obj1: REF<0> }> = null } ], obj1: OBJECT(0)<{ obj1: REF<0> }>, obj1Impl: OBJECT(0)<{ obj1: REF<0> }>, obj4SubType: [Circular *1] }'
        )
    })

    test('isClass', () => {
        expect(
            isClass(
                class {
                    anyField = true
                }
            )
        ).toBe(true)
        expect(
            isClass(
                Meta(
                    class {
                        anyField = true
                    }
                )
            )
        ).toBe(true)
        expect(isClass(function () {})).toBe(false)
        expect(isClass(Number)).toBe(false)
    })
})
