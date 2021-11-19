import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveyRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { CheckSurveyByIdRepository } from '../protocols/db/survey/check-survey-by-id-repository'
import { LoadAnswersBySurveyRepository } from '../protocols/db/survey/load-answers-by-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import Faker from 'faker'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRespositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyRepository.Params): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRespositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
      return await Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveyRepositoryStub()
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepository {
  result = [Faker.random.word(), Faker.random.word()]
  id: string

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id
    return this.result
  }
}
