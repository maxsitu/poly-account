import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray: any[] = fileLoader(path.join(__dirname, '.'), {recursive: true});
const typeDefs = mergeTypes(typesArray, { all: true });

export {
    typeDefs as default,
};
