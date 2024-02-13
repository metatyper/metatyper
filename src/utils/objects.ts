export function getDescriptorValue(obj: any, propName: string | symbol) {
    return obj instanceof Object
        ? Reflect.getOwnPropertyDescriptor(obj, propName)?.value
        : undefined
}
