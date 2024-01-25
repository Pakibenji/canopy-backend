export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public avatar: string,
    public password: string,
    public createdAt: Date
  ) {}
}
