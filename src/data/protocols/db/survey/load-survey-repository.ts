import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyRepository {
  loadAll: (accountId: string) => Promise<LoadSurveyRepository.Result>
}

export namespace LoadSurveyRepository {
  export type Result = SurveyModel[]
}
