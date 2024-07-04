# @websqnl/di

## How to

### Token with value

```ts
import { Token, add, use } from '@websqnl/di'

const token = new Token('date')
const date = new Date()

add({ ref: token, use: date })

const value = use(token)
```

### Token with factory

```ts
import { Token, add, use } from '@websqnl/di'

const token = new Token('date')
const date = new Date()

add({ ref: token, use: () => date })

const value = use(token)
```

### Abstract with implementation

```ts
import { add, use } from '@websqnl/di'

abstract class Abstract {
  abstract hello(): string
}

class Implementation implements Abstract {
  hello() {
    return 'hello'
  }
}

add({ ref: Abstract, use: Implementation })

const impl = use(Abstract)
```

### Class with dependency

```ts
import { set, use } from '@websqnl/di'

class A {}

class B {
  constructor(public a: A) {}
}

set({ ref: A }, { ref: B, dep: [A] })

const b = use(B)
```