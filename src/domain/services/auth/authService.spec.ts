// authService.test.ts
import { FakeDateProvider } from "../../../adapters/fake-date-provider";
import { InMemoryUserRepository } from "../../../adapters/user/in-memory-user-repository";
import { IDateProvider } from "../../ports/date-provider.interface";
import { IUserRepository } from "../../ports/user/user-repository-interface";
import { AuthService } from "./authService";

describe("AuthService", () => {
  let authService: AuthService;
  let userRepository: IUserRepository;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    dateProvider = new FakeDateProvider(new Date("2021-01-01T00:00:00"));
    authService = new AuthService(userRepository, dateProvider);
  });

  it("should hash a password", async () => {
    const password = "securePassword";
    const hashedPassword = await authService.hashPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe("string");
  });
  it("should register a new user", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    const registeredUser = await authService.register(userData);

    expect(registeredUser).toBeDefined();
    expect(registeredUser.id).toBeDefined();
    expect(registeredUser.username).toBe(userData.username);
    expect(registeredUser.email).toBe(userData.email);
    expect(registeredUser.avatar).toBe("defaultAvatarUrl");
    expect(registeredUser.password).toBeDefined();
    expect(registeredUser.createdAt).toEqual(dateProvider.now());

    const retrievedUser = await userRepository.getUserById(registeredUser.id);
    expect(retrievedUser).toEqual(registeredUser);
  });
  it("should throw an error when registering a user with an existing email", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    await authService.register(userData);

    await expect(authService.register(userData)).rejects.toThrow(
      "Email already exists"
    );
  });
  it("should retrieve a user by email", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    const registeredUser = await authService.register(userData);

    const retrievedUser = await authService.getUserByEmail(userData.email);

    expect(retrievedUser).toEqual(registeredUser);
  });
  it("should log in a user with valid credentials", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    await authService.register(userData);

    const loggedInUser = await authService.login({
      email: userData.email,
      password: userData.password,
    });
    const { user, token } = await loggedInUser;

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.avatar).toBe("defaultAvatarUrl");
    expect(user.password).toBeDefined();
    expect(user.createdAt).toEqual(dateProvider.now());
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });
  it("should throw an error when logging in with invalid credentials", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    await authService.register(userData);

    await expect(
      authService.login({ email: userData.email, password: "wrongPassword" })
    ).rejects.toThrow("Invalid password");

    await expect(
      authService.login({
        email: "nonexistent@user.com",
        password: "securePassword",
      })
    ).rejects.toThrow("User not found");
  });
  it("should log out a user and invalidate the token", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    await authService.register(userData);

    const loggedInUser = await authService.login({
      email: userData.email,
      password: userData.password,
    });
    const { token } = await loggedInUser;

    const logoutResult = await authService.logout(token);

    expect(logoutResult).toBe(true);
  });
  it("should delete a user by id with correct password", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    const registeredUser = await authService.register(userData);
    await authService.deleteUserByIdWithPassword(
      registeredUser.id,
      userData.password
    );

    const retrievedUser = await authService.getUserById(registeredUser.id);

    expect(retrievedUser).toBeUndefined();
  });
  it("should throw an error when deleting a user with incorrect password", async () => {
    const userData = {
      username: "john_doe",
      email: "john@doe.com",
      password: "securePassword",
    };

    const registeredUser = await authService.register(userData);

    await expect(
      authService.deleteUserByIdWithPassword(registeredUser.id, "wrongPassword")
    ).rejects.toThrow("Invalid password");
  });
});
