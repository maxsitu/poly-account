import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const resolversArray = fileLoader(path.join(__dirname, './*.resolvers.ts'));
const resolvers = mergeResolvers(resolversArray);

export {
    resolvers as default,
};
