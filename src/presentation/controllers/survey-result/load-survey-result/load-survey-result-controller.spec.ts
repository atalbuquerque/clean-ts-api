import { LoadSurveyResultController } from './load-survey-result-controller'
import { LoadSurveyById } from './load-survey-result-controller-protocols'
import { LoadSurveyResultSpy, mockLoadSurveyById } from '@/presentation/test'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { mockSurveyResultModel, throwError } from '@/domain/test'
import Mockdate from 'mockdate'

const mockRequest = (): LoadSurveyResultController.Request => ({
  accountId: 'any_id',
  surveyId: 'any_id'
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultSpy
  }
}

describe('LoadSurveyResult', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const HttpResponse = await sut.handle(mockRequest())
    expect(HttpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
    const HttpResponse = await sut.handle(mockRequest())
    expect(HttpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId)
    expect(loadSurveyResultSpy.accountId).toBe(request.accountId)
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const HttpResponse = await sut.handle(mockRequest())
    expect(HttpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const HttpResponse = await sut.handle(mockRequest())
    expect(HttpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
