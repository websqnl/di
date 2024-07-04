import type {Provider, Ref} from './types'
import {check} from './check'

const container = new Map()
const relations = new Map()

function use<T>(ref: Ref<T>): T {
  const value = container.get(ref)

  if (!value) throw `${ref.name} not found`

  return value
}

function provide<T>({ref, use}: Provider<T>) {
  const type = (use ?? ref) as T

  if (check.isFn<T>(type)) {
    const deps = relations.get(ref) ?? []

    if (check.isType<T>(type)) {
      return new type(...deps)
    }

    return type(...deps)
  }

  return type
}

function add<T>(provider: Provider<T>) {
  if (provider.dep && provider.dep.length > 0) {
    relations.set(provider.ref, provider.dep.map(use))
  }

  container.set(provider.ref, provide(provider))
}

function set(...providers: Provider<any>[]) {
  providers.map(add)
}

export {use, add, set}
