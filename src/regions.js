export default (sheet) =>
  Object.fromEntries(
    Object.entries(sheet)
      .filter(([cell]) => /^[^A]1$/.test(cell))
      .map(([, value]) => [value.v, {}])
  );
