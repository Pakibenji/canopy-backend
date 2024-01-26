import { User } from "../../entities/user/user.entity";

export interface IUserRepository {
  deleteUserById(userId: string): Promise<boolean>;
  save(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
}
