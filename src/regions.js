export default (sheet) => {
  let entries = Object.entries(sheet);
  let columns = Object.fromEntries(
    entries
      .filter(([cell]) => /^[^A]1$/.test(cell))
      .map(([cell, value]) => [/^(\D+)(\d+)$/.exec(cell)[1], value.v])
  );
  let rows = Object.fromEntries(
    entries
      .filter(([cell]) => /^A\d+$/.test(cell))
      .filter(([cell]) => cell !== "A1")
      .map(([cell, value]) => [/^(\D+)(\d+)$/.exec(cell)[2], value.w])
  );
  let r = {};
  Object.entries(columns).forEach(([, value]) => (r[value] = {}));
  entries
    .filter(([cell]) => !/^A/.test(cell))
    .filter(([cell]) => !/\D1$/.test(cell))
    .forEach(([cell, value]) => {
      let match = /^(\D+)(\d+)$/.exec(cell);
      if (match) r[columns[match[1]]][rows[match[2]]] = value.v;
    });
  return r;
};
