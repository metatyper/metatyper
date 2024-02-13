import {
    ANY,
    ARRAY,
    BIGINT,
    BOOLEAN,
    DATE,
    INSTANCE,
    INTEGER,
    LITERAL,
    NUMBER,
    OBJECT,
    STRING,
    TUPLE,
    UNION
} from '../../src'
import { TypeExtends, TypeIsEqual } from '../../src/utils/typeTest'

// NUMBER

const numberType = NUMBER()

TypeIsEqual(numberType, 1, true)
TypeExtends(123 as const, numberType, true)
TypeIsEqual<NUMBER, typeof numberType>(true)
TypeIsEqual(NUMBER(), NUMBER(), true)
TypeIsEqual(NUMBER(), INTEGER(), true) // INTEGER is equal to number

TypeExtends(numberType, 123 as const, false)
TypeExtends(numberType, '1', false)
TypeExtends(NUMBER(), STRING(), false)
TypeIsEqual<string, typeof numberType>(false)

TypeIsEqual(NUMBER({ nullish: true }), NUMBER() as number | null | undefined, true)
TypeIsEqual(NUMBER({ nullish: true, optional: false }), NUMBER() as number | null, true)
TypeIsEqual(NUMBER({ nullish: true, nullable: false }), NUMBER() as number | undefined, true)
TypeIsEqual(NUMBER({ nullish: true, nullable: false, optional: false }), NUMBER() as number, true)

TypeIsEqual(NUMBER({ nullable: true, nullish: false }), NUMBER() as number | null, true)
TypeIsEqual(NUMBER({ nullable: true, nullish: true }), NUMBER() as number | null | undefined, true)

TypeIsEqual(NUMBER({ optional: true, nullish: false }), NUMBER() as number | undefined, true)
TypeIsEqual(NUMBER({ optional: true, nullish: true }), NUMBER() as number | null | undefined, true)

// STRING

const stringType = STRING()

TypeIsEqual(stringType, '1', true)
TypeExtends('123' as const, stringType, true)
TypeIsEqual<STRING, typeof stringType>(true)
TypeIsEqual(STRING(), STRING(), true)

TypeExtends(stringType, 1, false)
TypeExtends(stringType, '123' as const, false)
TypeIsEqual(NUMBER(), STRING(), false)
TypeIsEqual<number, typeof stringType>(false)

TypeIsEqual(STRING({ nullish: true }), STRING() as string | null | undefined, true)
TypeIsEqual(STRING({ nullish: true, optional: false }), STRING() as string | null, true)
TypeIsEqual(STRING({ nullish: true, nullable: false }), STRING() as string | undefined, true)
TypeIsEqual(STRING({ nullish: true, nullable: false, optional: false }), STRING() as string, true)

TypeIsEqual(STRING({ nullable: true, nullish: false }), STRING() as string | null, true)
TypeIsEqual(STRING({ nullable: true, nullish: true }), STRING() as string | null | undefined, true)

TypeIsEqual(STRING({ optional: true, nullish: false }), STRING() as string | undefined, true)
TypeIsEqual(STRING({ optional: true, nullish: true }), STRING() as string | null | undefined, true)

// BOOLEAN

const booleanType = BOOLEAN()

TypeIsEqual(booleanType, false, true)
TypeExtends(true as const, booleanType, true)
TypeIsEqual<BOOLEAN, typeof booleanType>(true)
TypeIsEqual(BOOLEAN(), BOOLEAN(), true)

TypeExtends(booleanType, true as const, false)
TypeExtends(booleanType, 1, false)
TypeIsEqual(BOOLEAN(), STRING(), false)
TypeIsEqual<number, typeof booleanType>(false)

TypeIsEqual(BOOLEAN({ nullish: true }), BOOLEAN() as boolean | null | undefined, true)
TypeIsEqual(BOOLEAN({ nullish: true, optional: false }), BOOLEAN() as boolean | null, true)
TypeIsEqual(BOOLEAN({ nullish: true, nullable: false }), BOOLEAN() as boolean | undefined, true)
TypeIsEqual(
    BOOLEAN({ nullish: true, nullable: false, optional: false }),
    BOOLEAN() as boolean,
    true
)

TypeIsEqual(BOOLEAN({ nullable: true, nullish: false }), BOOLEAN() as boolean | null, true)
TypeIsEqual(
    BOOLEAN({ nullable: true, nullish: true }),
    BOOLEAN() as boolean | null | undefined,
    true
)

TypeIsEqual(BOOLEAN({ optional: true, nullish: false }), BOOLEAN() as boolean | undefined, true)
TypeIsEqual(
    BOOLEAN({ optional: true, nullish: true }),
    BOOLEAN() as boolean | null | undefined,
    true
)

// BIGINT

const bigIntType = BIGINT()

TypeIsEqual(bigIntType, 1n, true)
TypeExtends(123n as const, bigIntType, true)
TypeIsEqual<BIGINT, typeof bigIntType>(true)
TypeIsEqual(BIGINT(), BIGINT(), true)

TypeExtends(bigIntType, 123n as const, false)
TypeExtends(bigIntType, 1 as number, false)
TypeIsEqual(BIGINT(), NUMBER(), false)
TypeIsEqual<number, typeof bigIntType>(false)

TypeIsEqual(BIGINT({ nullish: true }), BIGINT() as bigint | null | undefined, true)
TypeIsEqual(BIGINT({ nullish: true, optional: false }), BIGINT() as bigint | null, true)
TypeIsEqual(BIGINT({ nullish: true, nullable: false }), BIGINT() as bigint | undefined, true)
TypeIsEqual(BIGINT({ nullish: true, nullable: false, optional: false }), BIGINT() as bigint, true)

TypeIsEqual(BIGINT({ nullable: true, nullish: false }), BIGINT() as bigint | null, true)
TypeIsEqual(BIGINT({ nullable: true, nullish: true }), BIGINT() as bigint | null | undefined, true)

TypeIsEqual(BIGINT({ optional: true, nullish: false }), BIGINT() as bigint | undefined, true)
TypeIsEqual(BIGINT({ optional: true, nullish: true }), BIGINT() as bigint | null | undefined, true)

// DATE

const date = new Date()

TypeIsEqual<typeof date, DATE>(true)
TypeIsEqual({} as DATE, DATE(), true)

TypeIsEqual(1 as number, DATE(), false)
TypeIsEqual(STRING(), DATE(), false)

TypeIsEqual(DATE({ nullish: true }), DATE() as Date | null | undefined, true)
TypeIsEqual(DATE({ nullish: true, optional: false }), DATE() as Date | null, true)
TypeIsEqual(DATE({ nullish: true, nullable: false }), DATE() as Date | undefined, true)
TypeIsEqual(DATE({ nullish: true, nullable: false, optional: false }), DATE() as Date, true)

TypeIsEqual(DATE({ nullable: true, nullish: false }), DATE() as Date | null, true)
TypeIsEqual(DATE({ nullable: true, nullish: true }), DATE() as Date | null | undefined, true)

TypeIsEqual(DATE({ optional: true, nullish: false }), DATE() as Date | undefined, true)
TypeIsEqual(DATE({ optional: true, nullish: true }), DATE() as Date | null | undefined, true)

// ANY

TypeIsEqual('123', ANY(), true)
TypeIsEqual(123, ANY(), true)
TypeIsEqual<null, ANY>(true)
TypeIsEqual<unknown, ANY>(true)
TypeIsEqual({} as ANY, ANY(), true)

TypeIsEqual<never, ANY>(false)

// LITERAL

const lit = LITERAL(1)

TypeIsEqual(1 as const, lit, true)
TypeExtends(lit, NUMBER(), true)
TypeIsEqual(2 as LITERAL<1>, lit, true)
TypeIsEqual(STRING(), LITERAL(STRING()), true)

TypeIsEqual(2 as LITERAL<2>, lit, false)
TypeExtends(NUMBER(), lit, false)
TypeIsEqual(1, lit, false)
TypeIsEqual(2 as const, lit, false)

TypeIsEqual(LITERAL(1, { nullish: true }), LITERAL(1) as 1 | null | undefined, true)
TypeIsEqual(LITERAL(1, { nullish: true, optional: false }), LITERAL(1) as 1 | null, true)
TypeIsEqual(LITERAL(1, { nullish: true, nullable: false }), LITERAL(1) as 1 | undefined, true)
TypeIsEqual(LITERAL(1, { nullish: true, nullable: false, optional: false }), LITERAL(1) as 1, true)

TypeIsEqual(LITERAL(1, { nullable: true, nullish: false }), LITERAL(1) as 1 | null, true)
TypeIsEqual(
    LITERAL(1, { nullable: true, nullish: true }),
    LITERAL(1) as 1 | null | undefined,
    true
)

TypeIsEqual(LITERAL(1, { optional: true, nullish: false }), LITERAL(1) as 1 | undefined, true)
TypeIsEqual(
    LITERAL(1, { optional: true, nullish: true }),
    LITERAL(1) as 1 | null | undefined,
    true
)

// INSTANCE

class TestInstanceClass {
    test = true
}

const instance = INSTANCE(TestInstanceClass)

TypeIsEqual<typeof instance, TestInstanceClass>(true)
TypeIsEqual<INSTANCE<TestInstanceClass>, TestInstanceClass>(true)

TypeIsEqual(
    INSTANCE(TestInstanceClass, { nullish: true }),
    INSTANCE(TestInstanceClass) as TestInstanceClass | null | undefined,
    true
)
TypeIsEqual(
    INSTANCE(TestInstanceClass, { nullish: true, optional: false }),
    INSTANCE(TestInstanceClass) as TestInstanceClass | null,
    true
)
TypeIsEqual(
    INSTANCE(TestInstanceClass, { nullish: true, nullable: false }),
    INSTANCE(TestInstanceClass) as TestInstanceClass | undefined,
    true
)
TypeIsEqual(
    INSTANCE(TestInstanceClass, { nullish: true, nullable: false, optional: false }),
    INSTANCE(TestInstanceClass) as TestInstanceClass,
    true
)

TypeIsEqual(
    INSTANCE(TestInstanceClass, { nullable: true, nullish: false }),
    INSTANCE(TestInstanceClass) as TestInstanceClass | null,
    true
)
TypeIsEqual(
    INSTANCE(TestInstanceClass, { nullable: true, nullish: true }),
    INSTANCE(TestInstanceClass) as TestInstanceClass | null | undefined,
    true
)

TypeIsEqual(
    INSTANCE(TestInstanceClass, { optional: true, nullish: false }),
    INSTANCE(TestInstanceClass) as TestInstanceClass | undefined,
    true
)
TypeIsEqual(
    INSTANCE(TestInstanceClass, { optional: true, nullish: true }),
    INSTANCE(TestInstanceClass) as TestInstanceClass | null | undefined,
    true
)

// UNION

const anOf1 = UNION([1, 'string'])
const anOf2 = UNION([NUMBER(), 'string'])
const anOf3 = UNION([3, STRING()])

TypeIsEqual<number | string, typeof anOf1>(true)
TypeIsEqual<number | string, typeof anOf2>(true)
TypeIsEqual<number | string, typeof anOf3>(true)
TypeExtends<string, typeof anOf1>(true)
TypeExtends<typeof anOf1, string>(true)
TypeIsEqual<UNION<string | number>, typeof anOf1>(true)

TypeIsEqual<string, typeof anOf1>(false)

TypeIsEqual(UNION([1, '1'], { nullish: true }), {} as number | string, true)
TypeIsEqual(UNION([1, '1'], { nullable: true }), {} as number | string, true)
TypeIsEqual(UNION([1, '1'], { optional: true }), {} as number | string, true)

TypeIsEqual(
    UNION([1, STRING({ nullish: true })], { optional: true }),
    {} as number | string | null | undefined,
    true
)

TypeIsEqual(
    UNION([1, STRING({ nullable: true, optional: true })], { optional: true }),
    {} as number | string | null | undefined,
    true
)

TypeIsEqual(
    UNION([1, STRING({ nullable: true })], { optional: true }),
    {} as number | string | null,
    true
)

TypeIsEqual(
    UNION([1, STRING({ optional: true })], { optional: true }),
    {} as number | string | undefined,
    true
)

// ARRAY

const arT1 = ARRAY(['string', NUMBER(), true])
const arT2 = ARRAY(['string'])
const arT3 = ARRAY([STRING()])
const arT4 = ARRAY(NUMBER())

TypeIsEqual<(number | string | boolean)[], typeof arT1>(true)
TypeExtends<string[], typeof arT1>(true)
TypeIsEqual<string[], typeof arT2>(true)
TypeIsEqual<string[], typeof arT3>(true)
TypeIsEqual<number[], typeof arT4>(true)
TypeIsEqual<ARRAY<(number | string | boolean)[]>, typeof arT1>(true)

TypeIsEqual<string[], typeof arT1>(false)
TypeIsEqual<string[], typeof arT4>(false)

// TUPLE

const arrEx1 = TUPLE([1, STRING()])
const arrEx2 = TUPLE(['string', NUMBER()])
const arrEx3 = TUPLE([NUMBER(), STRING()])

TypeIsEqual<[number, string], typeof arrEx1>(true)
TypeIsEqual<[string, number], typeof arrEx2>(true)
TypeIsEqual<[number, string], typeof arrEx3>(true)
TypeIsEqual<TUPLE<[number, string]>, typeof arrEx1>(true)

TypeIsEqual<[string], typeof arrEx1>(false)
TypeIsEqual<[number, string], typeof arrEx2>(false)
TypeIsEqual<TUPLE<[number, string]>, typeof arrEx2>(false)

TypeIsEqual(
    ARRAY([1, STRING({ nullish: true })]),
    [] as (number | string | null | undefined)[],
    true
)

TypeIsEqual(ARRAY([1, STRING({ nullable: true })]), [] as (number | string | null)[], true)

TypeIsEqual(ARRAY([1, STRING({ optional: true })]), [] as (number | string | undefined)[], true)

TypeIsEqual(ARRAY([1, '1'], { nullish: true }), [] as (number | string)[] | null | undefined, true)

TypeIsEqual(
    ARRAY([1, '1'], { nullish: true, optional: false }),
    [] as (number | string)[] | null,
    true
)
TypeIsEqual(
    ARRAY([1, '1'], { nullish: true, nullable: false }),
    [] as (number | string)[] | undefined,
    true
)
TypeIsEqual(
    ARRAY([1, '1'], { nullish: true, nullable: false, optional: false }),
    [] as (number | string)[],
    true
)

TypeIsEqual(
    ARRAY([1, '1'], { nullable: true, nullish: false }),
    [] as (number | string)[] | null,
    true
)
TypeIsEqual(
    ARRAY([1, '1'], { nullable: true, nullish: true }),
    [] as (number | string)[] | null | undefined,
    true
)

TypeIsEqual(
    ARRAY([1, '1'], { optional: true, nullish: false }),
    [] as (number | string)[] | undefined,
    true
)
TypeIsEqual(
    ARRAY([1, '1'], { optional: true, nullish: true }),
    [] as (number | string)[] | null | undefined,
    true
)

// OBJECT

TypeIsEqual({ a: 'string' }, OBJECT({ a: '1' }), true)
TypeIsEqual(
    { a: 'string' },
    OBJECT(() => ({ a: '1' })),
    true
)
TypeIsEqual({ a: 'string' }, OBJECT({ a: 'string' }), true)
TypeIsEqual({ a: 'string' }, OBJECT({ a: STRING() }), true)
TypeIsEqual({ a: 'string' }, OBJECT({ a: STRING() }), true)
TypeIsEqual({ a: 'string' } as OBJECT<{ a: string }>, OBJECT({ a: 'string' }), true)
TypeIsEqual(
    { a: 'string' } as OBJECT<{ a: string }>,
    OBJECT(() => ({ a: 'string' })),
    true
)
TypeIsEqual(
    {} as { a: { b: Record<string, STRING> } },
    OBJECT({ a: { b: OBJECT(STRING()) } }),
    true
)
TypeIsEqual(
    {} as { a: { b: Record<string, STRING> } },
    OBJECT(() => ({ a: { b: OBJECT(() => STRING()) } })),
    true
)

TypeIsEqual({} as Record<string, { a: string }>, OBJECT(OBJECT({ a: '1' })), true)
TypeIsEqual(
    {} as Record<string, { a: string }>,
    OBJECT(() => OBJECT(() => ({ a: '1' }))),
    true
)

TypeIsEqual(
    {} as { req: { a: string } } & Record<string, { a: string }>,
    OBJECT(OBJECT({ a: '1' }), { required: ['req'] }),
    true
)
TypeIsEqual(
    {} as { req: { a: string } } & Record<string, { a: string }>,
    OBJECT(() => OBJECT(() => ({ a: '1' })), { required: ['req'] }),
    true
)
TypeIsEqual({} as { a: number; b?: number }, OBJECT({ a: 1, b: 2 }, { required: ['a'] }), true)
TypeIsEqual(
    {} as { a: number | undefined; b?: number },
    OBJECT({ a: 1, b: 2 } as { a?: number; b: number }, { required: ['a'] }),
    true
)

TypeIsEqual(
    {} as Record<string, { b: string } & Record<string, string | number>>,
    OBJECT(() => OBJECT({}, { required: ['b'] })),
    true
)
TypeIsEqual({} as Record<string, any>, OBJECT(), true)
TypeIsEqual(
    {} as Record<string, any>,
    OBJECT(() => undefined),
    true
)
TypeIsEqual({} as NUMBER[], OBJECT([NUMBER()]), true)
TypeIsEqual(
    {} as NUMBER[],
    OBJECT(() => [NUMBER()]),
    true
)

TypeIsEqual(
    {} as Record<string, { a: number }>,
    OBJECT(() => OBJECT({ a: 1 })),
    true
)

TypeIsEqual(
    {} as Record<string, unknown>,
    OBJECT((impl) => impl),
    true
)

TypeIsEqual(
    {} as { impl: unknown },
    OBJECT((impl) => ({ impl })),
    true
)

TypeIsEqual(
    {} as Record<string, [number, unknown]>,
    OBJECT((impl) => TUPLE([1, impl])),
    true
)

TypeIsEqual(
    {} as Record<string, unknown[]>,
    OBJECT((impl) => ARRAY([1, impl])),
    true
)

TypeIsEqual(
    {} as Record<string, unknown[]>,
    OBJECT((impl) => ARRAY(impl)),
    true
)

TypeIsEqual(
    {} as Record<string, unknown>,
    OBJECT((impl) => UNION([impl, 1])),
    true
)

TypeIsEqual({ a: 1 as number }, OBJECT({ a: '1' }), false)
TypeIsEqual(
    { a: 1 as number },
    OBJECT(() => ({ a: '1' })),
    false
)
TypeIsEqual({ a: 'string' }, OBJECT({ b: 'string' }), false)

TypeIsEqual(OBJECT({ a: STRING({ nullish: true }) }), {} as { a: string | null | undefined }, true)
TypeIsEqual(OBJECT({ a: STRING({ nullable: true }) }), {} as { a: string | null }, true)
TypeIsEqual(OBJECT({ a: STRING({ optional: true }) }), {} as { a: string | undefined }, true)

TypeIsEqual(OBJECT({ a: 'str' }, { nullish: true }), {} as { a: string } | null | undefined, true)
TypeIsEqual(
    OBJECT({ a: 'str' }, { nullish: true, optional: false }),
    {} as { a: string } | null,
    true
)
TypeIsEqual(
    OBJECT({ a: 'str' }, { nullish: true, nullable: false }),
    {} as { a: string } | undefined,
    true
)
TypeIsEqual(
    OBJECT({ a: 'str' }, { nullish: true, nullable: false, optional: false }),
    {} as { a: string },
    true
)

TypeIsEqual(
    OBJECT({ a: 'str' }, { nullable: true, nullish: false }),
    {} as { a: string } | null,
    true
)
TypeIsEqual(
    OBJECT({ a: 'str' }, { nullable: true, nullish: true }),
    {} as { a: string } | null | undefined,
    true
)

TypeIsEqual(
    OBJECT({ a: 'str' }, { optional: true, nullish: false }),
    {} as { a: string } | undefined,
    true
)
TypeIsEqual(
    OBJECT({ a: 'str' }, { optional: true, nullish: true }),
    {} as { a: string } | null | undefined,
    true
)
