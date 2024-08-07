export const load = <T extends AsyncGenerator>(generator: T) => {
  return (async () => {
    while (!(await generator.next()).done) {}
  })()
}
