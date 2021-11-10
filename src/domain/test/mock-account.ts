import { AccountModel } from '@/domain/models/account'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'
import { AddAccount } from '../usecases/account/add-account'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@gmail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), { id: 'any_id' })

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})
