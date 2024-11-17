type RandomCommand = {};
type StateCommand = {
    state: string;
}
type CountryCommand = {
    country: string;
}

export type Command = 
    | RandomCommand
    | StateCommand
    | CountryCommand;

export const getCommand = (message: string):Command => {
    const r:RandomCommand = {};

    return r;
}