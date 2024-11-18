export interface InvalidCommand {
    type: 'invalid';
} 
export interface RandomCommand {
    type: 'random';
}

export interface StateCommand  {
    type: 'state';
    state: string;
}

export interface CountryCommand {
    type: 'country';
    country: string;
}

export type Command = 
    | RandomCommand
    | StateCommand
    | InvalidCommand
    | CountryCommand;

export const getCommand = (message: string):Command => {
   const tokens = message.split(/\s+/); 
   
   for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "!random") {
        return {type: 'random'};
    } else if (tokens[i] === "!state") {
        return {type: 'state', state: searchToken(tokens, i)};
    } else if (tokens[i] === "!country") {
        return {type: 'country', country: searchToken(tokens,i)};
    }
   }
   
   return {} as InvalidCommand;
}

const searchToken = (tokens: string[], index: number): string => {
    return tokens.slice(index + 1).join(" ");
}