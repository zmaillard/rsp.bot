import { test, expect, spyOn, describe } from "bun:test";
import { Database } from "bun:sqlite";
import { buildLink, getSign, buildLocationInformation, buildS3Key } from "./sign";

const db = new Database("bot.db");
const spy = spyOn(db, "query");

describe("testing getSign", () => {
  test("get invalid sign", () => {
    const sign = getSign(db, { type: "invalid" });
    expect(spy).toHaveBeenCalledWith(
      "SELECT imageid, title, state, place, county, country FROM vwSign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1"
    );
    expect(sign).not.toBeNull();
  });

  test("get random sign", () => {
    const sign = getSign(db, { type: "random" });
    expect(spy).toHaveBeenCalledWith(
      "SELECT imageid, title, state, place, county, country FROM vwSign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1"
    );
    expect(sign).not.toBeNull();
  });

  test("get valid state name", () => {
    const sign = getSign(db, { type: "state", state: "North Dakota" });
    console.log(sign);
    expect(spy).toHaveBeenCalledWith(
      "SELECT * FROM vwSign WHERE quality >= $quality and state = $state  ORDER BY RANDOM() LIMIT 1"
    );
    expect(sign).not.toBeNull();
  });

  test("get invalid state name", () => {
    const sign = getSign(db, { type: "state", state: "Old Mexico" });
    expect(spy).toHaveBeenCalledWith(
      "SELECT * FROM vwSign WHERE quality >= $quality and state = $state  ORDER BY RANDOM() LIMIT 1"
    );
    expect(sign).toBeNull();
  });

  test("get valid country name", () => {
    const sign = getSign(db, { type: "country", country: "United States" });
    expect(spy).toHaveBeenCalledWith(
      "SELECT * FROM vwSign WHERE quality >= $quality and country = $country  ORDER BY RANDOM() LIMIT 1"
    );
    expect(sign).not.toBeNull();
  });

  test("get invalid country name", () => {
    const sign = getSign(db, { type: "country", country: "South Canada" });
    expect(spy).toHaveBeenCalledWith(
      "SELECT * FROM vwSign WHERE quality >= $quality and country = $country  ORDER BY RANDOM() LIMIT 1"
    );
    expect(sign).toBeNull();
  });
});

test("buildLink", () => {
  var sign = {
    imageid: "5023730498567716297",
    title: "US-90 West/LA-18 West at US-90/LA-18 Split",
    state: "Louisiana",
    place: "Nine Mile Point",
    county: "Jefferson Parish",
    country: "United States",
  };
  const link = buildLink(sign);
  expect(link).toBe("https://roadsign.pictures/sign/5023730498567716297");
});

test("test buildS3Key", () => {
  var sign = {
    imageid: "5023730498567716297",
    title: "US-90 West/LA-18 West at US-90/LA-18 Split",
    state: "Louisiana",
    place: "Nine Mile Point",
    county: "Jefferson Parish",
    country: "United States",
  };
  const link = buildS3Key(sign);
  expect(link).toBe("5023730498567716297/5023730498567716297_m.jpg");
});

// Write tests for buildLocationInformation here
describe("buildLocationInformation tests", () => {
  test("test country, and state", () => {
    const sign = {
      imageid: "1002006576",
      title: "US-40 East - Maybell",
      state: "Colorado",
      place: undefined,
      county: "Moffat County",
      country: "United States",
      quality: 4,
    };
    const location = buildLocationInformation(sign);
    expect(location).toBe("Colorado, United States");
  });   
  test("test country, state, and place", () => {
    const sign = {
      imageid: "1303348835",
      title: "ND-8 South at US-12",
      state: "North Dakota",
      place: "Hettinger",
      county: "Adams County",
      country: "United States",
      quality: 3,
    };
    const location = buildLocationInformation(sign);
    expect(location).toBe("Hettinger, North Dakota, United States");
  });
});
