import type {Factory, Type} from './types'

export const check = {
  isFactory<R>(value: unknown): value is Factory<R> {
    return typeof value === 'function'
  },
  isType<T>(value: unknown): value is Type<T> {
    return this.isFactory(value) && 'prototype' in value
  },
}
