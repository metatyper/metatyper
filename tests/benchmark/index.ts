import Benchmark from 'benchmark'

import { LITERAL, Meta, NUMBER, OBJECT, STRING } from '../../src'

class ParentClass {
    parent1 = 1
}

class ClassForBenchmark extends ParentClass {
    str = STRING()
    number = NUMBER({
        default: 1
    })
    obj: any = OBJECT((obj) => ({
        a: 'string',
        b: 2,
        c: new Date(),
        d: {
            e: LITERAL(1),
            f: OBJECT(obj)
        }
    }))
    lit = LITERAL('1')
}

const MetaClassForBenchmark = Meta(ClassForBenchmark, { metaTypesArgs: { optional: true } })

const simpleInstance = new ClassForBenchmark()
const metaInstance = new MetaClassForBenchmark()

const metaTypesSuite = new Benchmark.Suite('MetaTyper')

metaTypesSuite
    .add('create a new meta object', () => {
        Meta({})
    })
    .add('create a new instance of a simple class', () => {
        const _ = new ClassForBenchmark()

        return _
    })
    .add('create a new instance of a meta class', () => {
        const _ = new MetaClassForBenchmark()

        return _
    })
    .add('get a value of a property of a simple object', () => {
        const _ = simpleInstance.str

        return _
    })
    .add('get a value of a property of a meta object', () => {
        const _ = metaInstance.str

        return _
    })
    .add('set the value of a simpl object property (number)', () => {
        simpleInstance.number = 1
    })
    .add('set the value of a meta object property (number)', () => {
        metaInstance.number = 1
    })
    .add('set the value of a simpl object property (object)', () => {
        simpleInstance.obj = {
            a: 'string',
            b: 2,
            c: new Date(),
            d: {
                e: 1,
                f: undefined
            }
        }
    })
    .add('set the value of a meta object property (object)', () => {
        metaInstance.obj = {
            a: 'string',
            b: 2,
            c: new Date(),
            d: {
                e: 1,
                f: undefined
            }
        }
    })
    .add('set the value of a meta object property (string validation error)', () => {
        try {
            metaInstance.str = 1 as any
        } catch (e) {
            // do something
        }
    })
    .add('set the value of a meta object property (object validation error)', () => {
        try {
            metaInstance.obj = {
                a: 'string',
                b: 2,
                c: new Date(),
                d: {
                    e: 1,
                    f: { g: 2 }
                }
            }
        } catch (e) {
            // do something
        }
    })
    .on('cycle', (e: Benchmark.Event) => {
        console.log(`${(metaTypesSuite as any).name}: ${e.target}`)
    })
    .run()
