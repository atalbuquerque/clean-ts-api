import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { CheckSurveyById } from '@/domain/usecases/survey/check-surveys-by-id'
import { DbCheckSurveyById } from '@/data/usecases/survey/lod-survey-by-id/db-check-survey-by-id'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
