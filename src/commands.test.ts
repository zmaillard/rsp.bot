import { expect, test } from "bun:test";
import { getCommand, type StateCommand, type CountryCommand } from "./commands";

test("random with handle", () => {
  const res = getCommand("@roadsign.pictures !random");

  expect(res.type).toBe("random");
});

test("random no other text", () => {
  const res = getCommand("!random");

  expect(res.type).toBe("random");
});

test("state with handle", () => {
  const res = getCommand("@roadsign.pictures !state california");

  expect(res.type).toBe("state");

  const state = res as StateCommand;
  expect(state.state).toBe("california");
});

test("state with multiple tokens and handle", () => {
  const res = getCommand("@roadsign.pictures !state North Dakota");

  expect(res.type).toBe("state");

  const state = res as StateCommand;
  expect(state.state).toBe("North Dakota");
});

test("country with handle", () => {
  const res = getCommand("@roadsign.pictures !country Canada");

  expect(res.type).toBe("country");

  const country = res as CountryCommand;
  expect(country.country).toBe("Canada");
});

test("country with multiple tokens and handle", () => {
  const res = getCommand("@roadsign.pictures !country Costa Rica");

  expect(res.type).toBe("country");

  const country = res as CountryCommand;
  expect(country.country).toBe("Costa Rica");
});
