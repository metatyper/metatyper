import { MetaObjectRegistryInfo } from '../metaobjects/registry'
import { IsMetaObjectSymbol, MetaObjectRegistryInfoSymbol } from '../metaobjects/symbols'
import { getDescriptorValue } from './objects'

export type Class<T> = new (
    ...args: any[]
) => T extends new (...args: any[]) => any ? InstanceType<T> : T

export type StaticClass<
    T,
    StaticT = T extends new (...args: any[]) => any ? T : unknown
> = Class<T> & StaticT

export function isClass(target: any): boolean {
    if (target instanceof Object && getDescriptorValue(target, IsMetaObjectSymbol)) {
        const registryInfo = getDescriptorValue(
            target,
            MetaObjectRegistryInfoSymbol
        ) as MetaObjectRegistryInfo

        // because meta object is proxy and there is no way to check isClass
        if (registryInfo?.type === 'class') {
            return true
        }

        return false
    } else {
        return (
            typeof target === 'function' &&
            /^\s*class\s+/.test(Function.prototype.toString.call(target))
        )
    }
}
