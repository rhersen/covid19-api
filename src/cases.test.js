import cases from "./cases.js";

describe("cases", function () {
  it("handles empty input", function () {
    expect(cases({})).toEqual({});
  });

  it("handles 2 by 2", function () {
    expect(
      cases({
        Sheets: {
          "Antal per dag region": {
            A1: {
              t: "s",
              v: "Statistikdatum",
              r: "<t>Statistikdatum</t>",
              h: "Statistikdatum",
              w: "Statistikdatum",
            },
            B1: {
              t: "s",
              v: "Totalt_antal_fall",
              r: "<t>Totalt_antal_fall</t>",
              h: "Totalt_antal_fall",
              w: "Totalt_antal_fall",
            },
            A2: {
              t: "n",
              v: 43865,
              w: "2/4/20",
            },
            B2: {
              t: "n",
              v: 1,
              w: "1",
            },
          },
        },
      })
    ).toEqual({ Totalt_antal_fall: { "2020-02-04": 1 } });
  });

  it("handles 3 by 3", function () {
    expect(
      cases({
        Sheets: {
          "Antal per dag region": {
            "!ref": "A1:W339",
            A1: {
              t: "s",
              v: "Statistikdatum",
              r: "<t>Statistikdatum</t>",
              h: "Statistikdatum",
              w: "Statistikdatum",
            },
            B1: {
              t: "s",
              v: "Totalt_antal_fall",
              r: "<t>Totalt_antal_fall</t>",
              h: "Totalt_antal_fall",
              w: "Totalt_antal_fall",
            },
            C1: {
              t: "s",
              v: "Blekinge",
              r: "<t>Blekinge</t>",
              h: "Blekinge",
              w: "Blekinge",
            },
            A2: {
              t: "n",
              v: 43865,
              w: "2/4/20",
            },
            B2: {
              t: "n",
              v: 1,
              w: "1",
            },
            C2: {
              t: "n",
              v: 0,
              w: "0",
            },
            A3: {
              t: "n",
              v: 43866,
              w: "2/5/20",
            },
            B3: {
              t: "n",
              v: 0,
              w: "0",
            },
            C3: {
              t: "n",
              v: 0,
              w: "0",
            },
          },
        },
      })
    ).toEqual({
      Totalt_antal_fall: {
        "2020-02-04": 1,
        "2020-02-05": 0,
      },
      Blekinge: {
        "2020-02-04": 0,
        "2020-02-05": 0,
      },
    });
  });
});
