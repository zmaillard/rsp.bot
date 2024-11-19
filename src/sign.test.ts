import { test, expect, spyOn } from "bun:test";
import { Database } from "bun:sqlite";
import { getSign } from "./sign";

const db = new Database("bot.db");
const spy = spyOn(db, "query");

test("get invalid sign", () => {
   const sign = getSign(db, {type: "invalid"}); 
    expect(spy).toHaveBeenCalledWith("SELECT imageid, title, state, place, county, country FROM vwSign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1");
    expect(sign).not.toBeNull();
});

test("get random sign", () => {
   const sign = getSign(db, {type: "random"}); 
   expect(spy).toHaveBeenCalledWith("SELECT imageid, title, state, place, county, country FROM vwSign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1");
   expect(sign).not.toBeNull();
});

test("get valid state name", () => {
   const sign = getSign(db, {type: "state", state: "North Dakota"}); 
   expect(spy).toHaveBeenCalledWith("SELECT * FROM vwSign WHERE quality >= $quality and state = $state  ORDER BY RANDOM() LIMIT 1");
   expect(sign).not.toBeNull();
});

test("get invalid state name", () => {
   const sign = getSign(db, {type: "state", state: "Old Mexico"}); 
   expect(spy).toHaveBeenCalledWith("SELECT * FROM vwSign WHERE quality >= $quality and state = $state  ORDER BY RANDOM() LIMIT 1");
   expect(sign).toBeNull();
});


test("get valid country name", () => {
   const sign = getSign(db, {type: "country", country: "United States"}); 
   expect(spy).toHaveBeenCalledWith("SELECT * FROM vwSign WHERE quality >= $quality and country = $country  ORDER BY RANDOM() LIMIT 1");
   expect(sign).not.toBeNull();
});

test("get invalid country name", () => {
   const sign = getSign(db, {type: "country", country: "South Canada"}); 
   expect(spy).toHaveBeenCalledWith("SELECT * FROM vwSign WHERE quality >= $quality and country = $country  ORDER BY RANDOM() LIMIT 1");
   expect(sign).toBeNull();
});