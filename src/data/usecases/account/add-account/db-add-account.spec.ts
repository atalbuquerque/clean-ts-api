import { DbAddAccount } from './db-add-account'
import { Hasher, AddAccountRepository } from './db-add-account-protocols'
import { mockHasher, mockAddAccountRepository, CheckdAccountByEmailRepositorySpy } from '@/data/test'
import { mockAddAccountParams, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  checkdAccountByEmailRepositorySpy: CheckdAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkdAccountByEmailRepositorySpy = new CheckdAccountByEmailRepositorySpy()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, checkdAccountByEmailRepositorySpy)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkdAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(true)
  })

  test('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkdAccountByEmailRepositorySpy } = makeSut()
    checkdAccountByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })

  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkdAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(checkdAccountByEmailRepositorySpy.email).toBe('any_email@gmail.com')
  })
})
