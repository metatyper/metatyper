import { TypeExtends } from '../../src/utils/typeTest'

import { MetaTypeArgs } from '../../src'

// Test MetaTypeArgs

const _type = {
    a: 1
}

TypeExtends<
    {
        default: typeof _type
    },
    MetaTypeArgs<typeof _type>
>(true)
