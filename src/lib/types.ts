import type {Token} from './token'

export interface Type<T = unknown> extends Function {
  new (...params: any[]): T
}

export type Abstract<T = unknown> = abstract new (...params: unknown[]) => T

export interface Factory<R> {
  (...args: unknown[]): R
}

export interface ForToken<T> {
  for: Token<T>
  use: T
}

export interface ForType<T> {
  for: Type<T>
  use: Type<T>
  add: ConstructorParameters<Type<T>>
}

export interface ForAbstract<T> {
  for: Abstract<T>
  use: Type<T>
  add: ConstructorParameters<Type<T>>
}

export interface ForFactory<T> {
  for: Type<T>
  use: Factory<T>
  add: Parameters<Factory<T>>
}

export type For<T = unknown> =
  | ForType<T>
  | ForAbstract<T>
  | ForToken<T>
  | ForFactory<T>

export type Use<T extends Type | Token> = T extends Type<infer U>
  ? U
  : T extends Abstract<infer U>
  ? U
  : T extends Token<infer U>
  ? U
  : unknown
