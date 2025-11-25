import { DeSerializerArgsType } from '../metatypes'
import { isClass } from '../utils'

/**
 * Creates a deserializer that injects default values when the incoming value is `undefined`.
 *
 * @param defaultValue - Static value or factory invoked with {@link DeSerializerArgsType}.
 */
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
