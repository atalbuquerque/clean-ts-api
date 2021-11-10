import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '../usecases/account/add-account'
import { Authentication } from '../usecases/account/authentication'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@gmail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), { id: 'any_id' })

export const mockFakeAuthentication = (): Authentication.Params => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})
