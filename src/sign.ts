import { Database } from "bun:sqlite";
import type { Command } from './commands';

const db = new Database("bot.db");

export interface Sign {
    imageid: String;
    title:String;
    state: String;
    place: String;
    county: String;
    country: String;
}
    
export const getSign = (cmd: Command):Sign  =>  {
    return db.query("SELECT * FROM main.sign ORDER BY RANDOM() LIMIT 1").get() as Sign;
}