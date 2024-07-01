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
    let token = new Token<Date>('date.token')

    add({for: token, use: date})

    expect(use(token)).toBe(date)
  })

  test('abstract and implementation', () => {
    add({for: Abstract, use: Implementation})

    const abs = use(Abstract)

    expect(abs).toBeInstanceOf(Implementation)
    expect(abs.hello()).toBe('hello')
  })

  test('type with dependencies', () => {
    set({for: A, use: A}, {for: B, use: B, add: [A]})

    const b = use(B)

    expect(b).toBeInstanceOf(B)
    expect(b.a).toBeInstanceOf(A)
  })
})
