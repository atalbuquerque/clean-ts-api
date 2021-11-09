import { LoginController } from './login-controller'
import { Validation } from './login-controller-protocols'
import { badRequest, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { AuthenticationSpy, mockValidation } from '@/presentation/test'

const mockRequest = (): LoginController.Request => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationSpy, validationStub)
  return {
    sut,
    authenticationSpy,
    validationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const authSpy = jest.spyOn(authenticationSpy, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.authenticationModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
