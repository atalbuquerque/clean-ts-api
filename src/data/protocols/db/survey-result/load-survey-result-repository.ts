import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: String, accountId: string) => Promise<SurveyResultModel>
}
