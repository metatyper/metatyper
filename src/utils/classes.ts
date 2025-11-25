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

/**
 * Checks whether the provided target is a class constructor.
 * Works with raw constructors and meta-object-wrapped classes.
 */
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
        if (typeof target !== 'function') return false

        const repr = Function.prototype.toString.call(target)

        return (
            typeof target === 'function' &&
            (/^\S*\s*\S*\{constructor\(.+/.test(repr) || /^\S*class.+/.test(repr))
        )
    }
}
