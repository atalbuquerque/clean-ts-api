import { DbLoadAnswersBySurvey } from './db-load-answers-by-survey'
import { LoadAnswersBySurveyRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import Mockdate from 'mockdate'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositorySpy)
  return {
    sut,
    loadAnswersBySurveyRepositorySpy
  }
}

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  test('Should call LoadAnswersBySurveyRepository', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    await sut.loadAnswers('any_id')
    expect(loadAnswersBySurveyRepositorySpy.id).toBe('any_id')
  })

  test('Should return answers on success', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([
      loadAnswersBySurveyRepositorySpy.result[0],
      loadAnswersBySurveyRepositorySpy.result[1]
    ])
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
