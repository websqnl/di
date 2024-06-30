import type {For, ForFactory, ForToken, ForType, Type} from './types'
import type {Token} from './token'
import {check} from './check'

const container = new Map()
const relations = new Map()

function use<T>(type: Token<T>): T
function use<T>(type: Type<T>): T
function use<T>(type: Token<T> | Type<T>) {
  const concrete = container.get(type)
  if (!concrete) throw `Provider ${type.name} não registrado`
  return concrete
}

const provide = <T>({for: key, use}: For<T>) => {
  const concrete = use ?? key

  if (check.isFactory<T>(concrete)) {
    const deps = relations.get(key)

    if (check.isType<T>(concrete)) {
      return new concrete(...deps)
    }

    return concrete(...deps)
  }

  return concrete as T
}

function add<T>(provider: ForToken<T>): void
function add<T>(provider: ForType<T>): void
function add<T>(provider: ForFactory<T>): void
function add<T>(provider: For<T>) {
  if ('add' in provider) {
    const items = provider.add ?? []
    relations.set(
      provider.for,
      items.map((item) => use(item))
    )
  }
  const provided = provide(provider)
  container.set(provider.for, provided)
}

function set(...providers: For[]): void
function set(...providers: []) {
  providers.map(add)
}

export {use, add, set}
