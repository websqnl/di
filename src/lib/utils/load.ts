// prettier-ignore
export const load = async <T>(generator: AsyncGenerator<T>) => {
  try { for await (const _ of generator) {} }
  catch (error) { throw error }
}
