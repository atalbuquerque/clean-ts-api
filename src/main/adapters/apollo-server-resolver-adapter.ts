import { Controller } from '@/presentation/protocols'

export const adaptResolver = async (controler: Controller, args: any): Promise<any> => {
  const httpResponse = await controler.handle(args)
  return httpResponse.body
}
