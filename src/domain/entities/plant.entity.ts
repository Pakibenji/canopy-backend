export class Plant {
  constructor(
    public id: string,
    public plantName: string,
    public plantImage: string,
    public ownerId: string,
    public owner: string,
    public createdAt: Date
  ) {}
}
