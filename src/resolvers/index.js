import * as SigninResolver from './signInResolver';
import * as AccountResolver from './accountResolver';

const resolvers = {
  Mutation: {
    addAccounts: AccountResolver.addAccounts,
    signinUser: SigninResolver.signinUser,
  },
};

export default resolvers;