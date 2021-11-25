import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'

export default {
  Query: {
    async login (parent: any, args: any) {
      const response = await adaptResolver(makeLoginController(), args)
      return response.authenticationModel
    }
  },

  Mutation: {
    async signup (parent: any, args: any) {
      const response = await adaptResolver(makeSignUpController(), args)
      return response.authenticationModel
    }
  }
}
