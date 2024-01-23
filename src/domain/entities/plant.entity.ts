export class Plant {
  constructor(
    public id: string,
    public plantName: string,
    public ownerId: string,
    public owner: string,
    public createdAt: Date
  ) {}
}
