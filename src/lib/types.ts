import type {Token} from './token'

export type Abstract<T> = abstract new (...params: any[]) => T

export type Type<T> = new (...params: any[]) => T

export type Fn<T> = (...params: any[]) => T

export type Ref<T> = Abstract<T> | Type<T> | Token

export type Use<T> = T | Type<T> | Fn<T> | Fn<Promise<T>>

export interface Provider<T> {
  ref: Ref<T>
  use?: Use<T>
  dep?: Ref<any>[]
}
