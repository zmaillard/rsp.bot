import { Database } from "bun:sqlite";
import type { Command } from "./commands";

const min_quality = 3;

export interface Sign {
  imageid: string;
  title: string;
  state: string;
  place: string;
  county: string;
  country: string;
}

export const getSign = (db: Database, cmd: Command): Sign => {
  switch (cmd.type) {
    case "state":
      return db
        .query(
          `SELECT * FROM vwSign WHERE quality >= $quality and state = $state  ORDER BY RANDOM() LIMIT 1`
        )
        .get({$quality: min_quality, $state: cmd.state}) as Sign;
    case "country":
      return db
        .query(
          `SELECT * FROM vwSign WHERE quality >= $quality and country = $country  ORDER BY RANDOM() LIMIT 1`
        )
        .get({$quality: min_quality, $country: cmd.country}) as Sign;
    default:
      return db
        .query(
          `SELECT imageid, title, state, place, county, country FROM vwSign WHERE quality >= $quality  ORDER BY RANDOM() LIMIT 1`
        )
        .get({$quality: min_quality}) as Sign;
  }
};

export const buildLink = (sign: Sign): string => {
  return `https://roadsign.pictures/sign/${sign.imageid}`;
}

export const buildSignUrl = (sign: Sign): string => {
  return `https://sign.roadsign.pictures/${sign.imageid}/${sign.imageid}_m.jpg`;
};

export const buildLocationInformation = (item: Sign) => {
    let base = `${item.state}, ${item.country}`;
    if (item.place) {
      return `${item.place}, ${base}`;
    }
    return base;
  };

export const buildS3Key = (sign: Sign): string => {
  return `${sign.imageid}/${sign.imageid}_m.jpg`;
}