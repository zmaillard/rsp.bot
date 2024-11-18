import { Database } from "bun:sqlite";
import type { Command } from "./commands";

const min_quality = 3;

export interface Sign {
  imageid: String;
  title: String;
  state: String;
  place: String;
  county: String;
  country: String;
}

export const getSign = (db: Database, cmd: Command): Sign => {
  switch (cmd.type) {
    case "state":
      return db
        .query(
          `SELECT s.imageid, s.title, s.state, s.place, s.county, s.country FROM main.sign as s INNER JOIN main.state as st ON s.state = st.slug WHERE s.quality >= $quality and (st.slug = $state or st.name = $state ) ORDER BY RANDOM() LIMIT 1`
        )
        .get({quality: min_quality, state: cmd.state}) as Sign;
    case "country":
      return db
        .query(
          `SELECT s.imageid, s.title, s.state, s.place, s.county, s.country FROM main.sign as s INNER JOIN main.country as cn ON s.country = cn.slug WHERE s.quality >= $quality and (cn.slug = $country or cn.name = $country ) ORDER BY RANDOM() LIMIT 1`
        )
        .get({quality: min_quality, country: cmd.country}) as Sign;
    default:
      return db
        .query(
          `SELECT imageid, title, state, place, county, country FROM main.sign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1`
        )
        .get({$quality: min_quality}) as Sign;
  }
};

export const buildSignUrl = (sign: Sign): string => {
  return `https://sign.roadsign.pictures/${sign.imageid}/${sign.imageid}_m.jpg`;
};
