import { Controller } from '@/presentation/protocols'
import { UserInputError, AuthenticationError, ForbiddenError, ApolloError } from 'apollo-server-errors'

export const adaptResolver = async (controler: Controller, args: any): Promise<any> => {
  const httpResponse = await controler.handle(args)
  switch (httpResponse.statusCode) {
    case 200: return httpResponse.body
    case 204: return httpResponse.body
    case 400: throw new UserInputError(httpResponse.body.message)
    case 401: throw new AuthenticationError(httpResponse.body.message)
    case 403: throw new ForbiddenError(httpResponse.body.message)
    default: throw new ApolloError(httpResponse.body.message)
  }
}
