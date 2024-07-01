export class Token<T = unknown> {
  constructor(public name: string, public value?: T) {}
}
