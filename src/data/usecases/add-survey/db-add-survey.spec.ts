import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRespository with correct values', async () => {
    class AddSurveyRespositoryStub implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
        return await new Promise(resolve => resolve())
      }
    }
    const addSurveyRespositoryStub = new AddSurveyRespositoryStub()
    const addSpy = jest.spyOn(addSurveyRespositoryStub, 'add')
    const sut = new DbAddSurvey(addSurveyRespositoryStub)
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
