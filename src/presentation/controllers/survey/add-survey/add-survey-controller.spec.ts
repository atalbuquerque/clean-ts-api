import { Validation, AddSurvey } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAddSurvey, mockValidation } from '@/presentation/test'
import { throwError } from '@/domain/test'
import Mockdate from 'mockdate'
import faker from 'faker'

const mockRequest = (): AddSurveyController.Request => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.words()
  }]
})

type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveytub: AddSurvey
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addSurveytub = mockAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveytub)
  return {
    sut,
    validationStub,
    addSurveytub
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 400 if Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveytub } = makeSut()
    const addSpy = jest.spyOn(addSurveytub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({ ...request, date: new Date() })
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveytub } = makeSut()
    jest.spyOn(addSurveytub, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
