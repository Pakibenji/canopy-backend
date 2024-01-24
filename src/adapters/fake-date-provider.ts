import { IDateProvider } from "../domain/ports/date-provider.interface";

export class FakeDateProvider implements IDateProvider {
  constructor(private fakeDate: Date) {}

  now(): Date {
    return this.fakeDate;
  }
}
