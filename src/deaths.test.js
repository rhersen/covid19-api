import deaths from "./deaths.js";

describe("deaths", function () {
  it("handles empty input", function () {
    expect(deaths({})).toEqual({});
  });

  it("handles two days", function () {
    expect(
      deaths({
        Sheets: {
          "Antal avlidna per dag": {
            "!ref": "A1:B311",
            A1: {
              t: "s",
              v: "Datum_avliden",
              r: "<t>Datum_avliden</t>",
              h: "Datum_avliden",
              w: "Datum_avliden",
            },
            B1: {
              t: "s",
              v: "Antal_avlidna",
              r: "<t>Antal_avlidna</t>",
              h: "Antal_avlidna",
              w: "Antal_avlidna",
            },
            A2: {
              t: "n",
              v: 43901,
              w: "3/11/20",
            },
            B2: {
              t: "n",
              v: 2,
              w: "2",
            },
            A3: {
              t: "n",
              v: 43902,
              w: "3/12/20",
            },
            B3: {
              t: "n",
              v: 0,
              w: "0",
            },
          },
        },
      })
    ).toEqual({ "2020-03-11": 2, "2020-03-12": 0 });
  });

  it("handles 'Uppgift saknas'", function () {
    expect(
      deaths({
        Sheets: {
          "Antal avlidna per dag": {
            "!ref": "A1:B311",
            A1: {
              t: "s",
              v: "Datum_avliden",
              r: "<t>Datum_avliden</t>",
              h: "Datum_avliden",
              w: "Datum_avliden",
            },
            B1: {
              t: "s",
              v: "Antal_avlidna",
              r: "<t>Antal_avlidna</t>",
              h: "Antal_avlidna",
              w: "Antal_avlidna",
            },
            A2: {
              t: "n",
              v: 43901,
              w: "3/11/20",
            },
            B2: {
              t: "n",
              v: 2,
              w: "2",
            },
            A3: {
              t: "s",
              v: "Uppgift saknas",
              r: "<t>Uppgift saknas</t>",
              h: "Uppgift saknas",
              w: "Uppgift saknas",
            },
            B3: {
              t: "n",
              v: 31,
              w: "31",
            },
          },
        },
      })
    ).toEqual({
      "2020-03-11": 2,
      "Uppgift saknas": 31,
    });
  });
});
