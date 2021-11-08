import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyByIdRepository } from './db-load-survey-result-protocols'
import { LoadSurveyResultRepositorySpy, mockLoadSurveyByIdRepository } from '@/data/test'
import { throwError } from '@/domain/test'
import Mockdate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
  loadSurveyByIdepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const loadSurveyByIdepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdepositoryStub)
  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdepositoryStub
  }
}

let surveyId: string
let accountId: string

describe('DbLoadSurveyResult Usecase', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  beforeEach(() => {
    surveyId = faker.random.uuid()
    accountId = faker.random.uuid()
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load(surveyId, accountId)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyId)
    expect(loadSurveyResultRepositorySpy.accountId).toBe(accountId)
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load(surveyId, accountId)
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdepositoryStub, 'loadById')
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    await sut.load(surveyId, accountId)
    expect(loadByIdSpy).toHaveBeenCalledWith(surveyId)
  })
})
