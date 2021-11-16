export interface CheckdAccountByEmailRepository {
  checkByEmail: (email: string) => Promise<CheckdAccountByEmailRepository.Result>
}

export namespace CheckdAccountByEmailRepository {
  export type Result = boolean
}
