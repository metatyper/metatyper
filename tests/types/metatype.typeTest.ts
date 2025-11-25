import { MetaType, type MetaTypeBase, StringImpl } from '../../src'
import { DATE, STRING } from '../../src'
import { TypeExtends, TypeIsEqual } from '../utils/typeTest'

// Test MetaType

const _type = {
    a: [1, STRING(), DATE()] as const
}
const _typeValue = {
    a: [1, '2', new Date()] as const
}
const _implMock = { name: 'CUSTOM' }

TypeIsEqual<MetaTypeBase<typeof _implMock>, MetaType<unknown, typeof _implMock>>(true)
TypeIsEqual<MetaTypeBase, MetaType<1>>(false)

TypeExtends(
    {
        ..._typeValue
    },
    {} as MetaType<typeof _type, typeof _implMock>,
    true
)

TypeExtends<
    typeof _typeValue & MetaTypeBase<typeof _implMock>,
    MetaType<typeof _type, typeof _implMock>
>(true)

TypeIsEqual(
    {
        ..._typeValue
    },
    {} as MetaType<typeof _type, typeof _implMock>,
    false
)

TypeIsEqual(MetaType.getMetaTypeImpl(STRING()), new StringImpl(), true)
