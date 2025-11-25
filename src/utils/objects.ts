/** Safely reads the value of an own property descriptor when the object is known. */
export function getDescriptorValue(obj: any, propName: string | symbol) {
    return obj instanceof Object
        ? Reflect.getOwnPropertyDescriptor(obj, propName)?.value
        : undefined
}
