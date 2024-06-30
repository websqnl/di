import type {Token} from './token'

export interface Type<T = unknown> extends Function {
  new (...params: any[]): T
}

export interface Factory<R> {
  (...args: unknown[]): R
}

export interface ForToken<T> {
  for: Token<T>
  use: T
}

export interface ForType<T> {
  for: Type<T>
  use: T
  add: ConstructorParameters<Type<T>>
}

export interface ForFactory<T> {
  for: Type<T>
  use: Factory<T>
  add: Parameters<Factory<T>>
}

export type For<T = unknown> = ForToken<T> | ForType<T> | ForFactory<T>
