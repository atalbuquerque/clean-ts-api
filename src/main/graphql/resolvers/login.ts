import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'

export default {
  Query: {
    async login (parent: any, args: any) {
      const loginController = makeLoginController()
      const httpResponse = await loginController.handle(args)
      return httpResponse.body.authenticationModel
    }
  }
}
