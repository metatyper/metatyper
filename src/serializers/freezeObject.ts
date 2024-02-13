import { DeSerializerArgsType } from '../metatypes'

function copyAndFreeze(value: any) {
    if (!(value instanceof Object)) {
        return value
    }

    let newObject: any

    if (Array.isArray(value)) {
        newObject = [...value]
    } else {
        newObject = { ...value }
    }

    Reflect.setPrototypeOf(newObject, Reflect.getPrototypeOf(value))

    return Object.freeze(newObject)
}

export const FreezeObjectDeSerializer = {
    name: 'FreezeObjectDeSerializer',
    deserialize: ({ value }: DeSerializerArgsType) => copyAndFreeze(value)
}
