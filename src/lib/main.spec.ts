import {load} from './utils'
import {createToken, Token} from './token'
import {add, set, use} from './main'

abstract class Abstract {
  abstract hello(): string
}

class Implementation implements Abstract {
  hello() {
    return 'hello'
  }
}

class A {}

class B {
  constructor(public a: A) {}
}

interface ResolveCallback<T> {
  (value: T | PromiseLike<T>): void
}

interface RejectCallback {
  (reason?: any): void
}

interface AsyncCallback<T> {
  (resolve: ResolveCallback<T>, reject: RejectCallback): void
}

function async<T>(fn: AsyncCallback<T>) {
  return new Promise<T>(fn)
}

const tokenFactory = createToken('factory')
const useFactory = async((resolve) => {
  setTimeout(() => resolve(123), 1000)
})

describe('di', () => {
  test('token with value', async () => {
    const date = new Date()
    const token = new Token('date.token')

    await add({ref: token, use: date})

    expect(use(token)).toBe(date)
  })

  test('token with factory', async () => {
    const date = new Date()
    const token = new Token('date.token')

    await add({ref: token, use: () => date})

    expect(use(token)).toBe(date)
  })

  test('abstract with implementation', async () => {
    await add({ref: Abstract, use: Implementation})

    expect(use(Abstract)).toBeInstanceOf(Implementation)
  })

  test('class with dependency', async () => {
    await load(set({ref: A}, {ref: B, dep: [A]}))

    const b = use(B)

    expect(b).toBeInstanceOf(B)
    expect(b.a).toBeInstanceOf(A)
  })

  test('class with dependency factory', () => {
    add({ref: A})
    add({ref: B, use: (a: A) => new B(a), dep: [A]})

    const b = use(B)

    expect(b).toBeInstanceOf(B)
    expect(b.a).toBeInstanceOf(A)
  })

  test('async dependency', async () => {
    const fnFactory = jest.fn()

    class Age {
      constructor(value: number) {}
    }

    await load(
      set(
        {
          ref: tokenFactory,
          use: useFactory,
        },
        {
          ref: Age,
          use(value: number) {
            fnFactory(value)
            return new Age(value)
          },
          dep: [tokenFactory],
        }
      )
    )

    const b = use(Age)

    expect(b).toBeInstanceOf(Age)
    expect(fnFactory).toHaveBeenCalledWith(123)
  })
})
