import { IDateProvider } from "../domain/ports/date-provider.interface";

export class RealDateProvider implements IDateProvider {
  now() {
    return new Date();
  }
}
