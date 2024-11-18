import { test, expect, spyOn } from "bun:test";
import { Database } from "bun:sqlite";
import { getSign } from "./sign";

const db = new Database("bot.db");
const spy = spyOn(db, "query");

test("get invalid sign", () => {
   const sign = getSign(db, {type: "invalid"}); 
    expect(spy).toHaveBeenCalledWith("SELECT imageid, title, state, place, county, country FROM main.sign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1");
    expect(sign).not.toBeNull();
});

test("getrandom sign", () => {
   const sign = getSign(db, {type: "random"}); 
    expect(spy).toHaveBeenCalledWith("SELECT imageid, title, state, place, county, country FROM main.sign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1");
    expect(sign).not.toBeNull();
});

test("get valid state slug", () => {
});

// get valid state name

// get in-valid state name - should be null

//get valid country slug
// get valid county name
// get in-valid country name - should be null