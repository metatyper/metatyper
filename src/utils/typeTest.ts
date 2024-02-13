type Extends<A, B> = A extends B ? true : false
type IsEqual<A, B> = [B] extends [A] ? ([A] extends [B] ? true : false) : false

class TestFuncs {
    static TypeExtends<A, B>(
        _result:
            | Extends<A, B>
            | (Extends<A, B> extends true ? 'type A extends type B' : 'type A not extends type B')
    ): void
    static TypeExtends<A, B>(
        _a: A,
        _b: B,
        _result:
            | Extends<A, B>
            | (Extends<A, B> extends true ? 'type A extends type B' : 'type A not extends type B')
    ): void
    static TypeExtends(_a?: any, _b?: any, _result?: any) {
        // it just checks types
    }

    static TypeIsEqual<A, B>(
        _result:
            | IsEqual<A, B>
            | (IsEqual<A, B> extends true ? 'types are equal' : 'types are not equal')
    ): void
    static TypeIsEqual<A, B>(
        _a: A,
        _b: B,
        _result:
            | IsEqual<A, B>
            | (IsEqual<A, B> extends true ? 'types are equal' : `types are not equal`)
    ): void
    static TypeIsEqual(_a?: any, _b?: any, _result?: any) {
        // it just checks types
    }
}

export const TypeExtends = TestFuncs.TypeExtends
export const TypeIsEqual = TestFuncs.TypeIsEqual
