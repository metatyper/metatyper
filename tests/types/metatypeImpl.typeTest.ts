import { TypeExtends } from '../utils/typeTest'

import { MetaTypeArgsType } from '../../src'

// Test MetaTypeArgs

const _type = {
    a: 1
}

TypeExtends<
    {
        default: typeof _type
    },
    MetaTypeArgsType<typeof _type>
>(true)
