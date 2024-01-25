import argon2 from "argon2";
import { User } from "../../entities/user/user.entity";
import { IDateProvider } from "../../ports/date-provider.interface";
import { IUserRepository } from "../../ports/user/user-repository-interface";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dateProvider: IDateProvider
  ) {}
  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    const newUser = new User(
      "generatedId",
      userData.username,
      userData.email,
      "defaultAvatarUrl",
      await this.hashPassword(userData.password),
      this.dateProvider.now()
    );

    const registeredUser = await this.userRepository.save(newUser);
    return registeredUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.getUserByEmail(email);
  }
}
