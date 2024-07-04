export class Token {
  constructor(public name: string) {}
}

export function createToken<T>(name: string) {
  return new Token(name)
}
