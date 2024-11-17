import { Database } from "bun:sqlite";
import type { Command } from './commands';

export interface Sign {
    imageid: String;
    title:String;
    state: String;
    place: String;
    county: String;
    country: String;
}
    
export const getSign = (cmd: Command):Sign  =>  {
    const db = new Database("bot.db");

    return db.query("SELECT * FROM main.sign ORDER BY RANDOM() LIMIT 1").get() as Sign;
}