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

    const userWithEmail = await this.getUserByEmail(userData.email);

    if (userWithEmail) {
      throw new Error("Email already exists");
    }

    const registeredUser = await this.userRepository.save(newUser);
    return registeredUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.getUserByEmail(email);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.userRepository.getUserById(id);
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) {
      throw new Error("Invalid password");
    }

    const token = "generatedToken";
    return { user, token };
  }

  async logout(token: string): Promise<boolean> {
    return true;
  }

  async deleteUserByIdWithPassword(
    userId: string,
    password: string
  ): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) {
      throw new Error("Invalid password");
    }

    await this.userRepository.deleteUserById(userId);
  }
}
