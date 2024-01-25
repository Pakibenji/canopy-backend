import { User } from "../../domain/entities/user/user.entity";
import { IUserRepository } from "../../domain/ports/user/user-repository-interface";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
