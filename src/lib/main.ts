import type {Provider, Ref} from './types'
import {check} from './check'

const container = new Map()
const relations = new Map()

function use<T>(ref: Ref<T>): T {
  const value = container.get(ref)

  if (!value) throw `${ref.name} not found`

  return value
}

const provide = async <T>({ref, use}: Provider<T>) => {
  const type = (use ?? ref) as T

  if (check.isFn<T>(type)) {
    const deps = relations.get(ref) ?? []

    if (check.isType<T>(type)) {
      return new type(...deps)
    }

    if (check.isAsyncFn<T>(type)) {
      return await type(...deps)
    }

    return type(...deps)
  }

  return type
}

const add = async <T>(provider: Provider<T>) => {
  if (provider.dep && provider.dep.length > 0) {
    relations.set(provider.ref, provider.dep.map(use))
  }

  container.set(provider.ref, await provide(provider))

  return use(provider.ref)
}

async function* set<T>(
  ...providers: Provider<T>[]
): AsyncGenerator<T, void, unknown> {
  for (const p of providers) {
    yield await add(p)
  }
}

export {use, add, set}
