import {load} from './utls'
import {Token} from './token'
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
})
