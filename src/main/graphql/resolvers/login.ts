import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'

export default {
  Query: {
    async login (parent: any, args: any) {
      const response = await adaptResolver(makeLoginController(), args)
      return response.authenticationModel
    }
  }
}
