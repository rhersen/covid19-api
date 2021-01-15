import * as date from "./date.js";

export default ({ Sheets }) => {
  let sheet = Sheets?.["Antal avlidna per dag"];
  if (!sheet) return {};
  return Object.fromEntries(
    Object.keys(sheet)
      .filter((cell) => /^A\d+$/.test(cell))
      .filter((cell) => cell !== "A1")
      .map((keyCell) => {
        let valueCell = keyCell.replace(/^A/, "B");
        return [[date.iso(sheet[keyCell].w)], sheet[valueCell].v];
      })
  );
};
