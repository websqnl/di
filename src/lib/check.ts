import type {Fn, Type} from './types'

export const check = {
  isFn<T>(value: unknown): value is Fn<T> {
    return typeof value === 'function'
  },
  isAsyncFn<T>(value: unknown): value is Fn<Promise<T>> {
    return this.isFn(value) && value.constructor.name === 'AsyncFunction'
  },
  isType<T>(value: unknown): value is Type<T> {
    return this.isFn(value) && typeof value.prototype === 'object'
  },
}
