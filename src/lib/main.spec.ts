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
  test('token with value', () => {
    const date = new Date()
    const token = new Token('date.token')

    add({ref: token, use: date})

    expect(use(token)).toBe(date)
  })

  test('token with factory', () => {
    const date = new Date()
    const token = new Token('date.token')

    add({ref: token, use: () => date})

    expect(use(token)).toBe(date)
  })

  test('abstract with implementation', () => {
    add({ref: Abstract, use: Implementation})

    expect(use(Abstract)).toBeInstanceOf(Implementation)
  })

  test('class with dependency', () => {
    set({
      ref: A
    }, {
      ref: B,
      dep: [A]
    })

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
