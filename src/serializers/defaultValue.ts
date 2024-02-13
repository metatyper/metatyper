import { DeSerializerArgsType } from '../metatypes'
import { isClass } from '../utils'

export const DefaultValueDeSerializerBuilder = (defaultValue: any) => ({
    name: 'DefaultValueDeSerializer',
    deserialize: (args: DeSerializerArgsType) => {
        if (args.value !== undefined) {
            return args.value
        }

        if (defaultValue instanceof Function && !isClass(defaultValue)) {
            return defaultValue(args)
        }

        return defaultValue
    },
    deserializePlaces: ['init', 'reinit']
})
