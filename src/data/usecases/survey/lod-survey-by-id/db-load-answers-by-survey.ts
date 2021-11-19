import { LoadAnswersBySurvey, LoadAnswersBySurveyRepository } from './db-load-survey-by-id-protocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    return await this.loadAnswersBySurveyRepository.loadAnswers(id)
  }
}
