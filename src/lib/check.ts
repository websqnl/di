import type {Fn, Type} from './types'

export const check = {
  isFn<T>(value: unknown): value is Fn<T> {
    return typeof value === 'function'
  },
  isType<T>(value: unknown): value is Type<T> {
    return this.isFn(value) && typeof value.prototype === 'object'
  },
}
