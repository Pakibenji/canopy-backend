import { User } from "./user.entity";

describe("User entity", () => {
  const createDefaultUser = (overrides: Partial<User> = {}): User => {
    const defaultValues: User = {
      id: "1",
      username: "john_doe",
      email: "john@doe.com",
      avatar: "https://picsum.photos/seed/picsum/200/300",
      password: "securePassword",
      createdAt: new Date(),
    };
    return { ...defaultValues, ...overrides };
  };
  it("should create a user instance", () => {
    const user = createDefaultUser();

    expect(user).toBeDefined();
    expect(user.id).toBe("1");
    expect(user.username).toBe("john_doe");
    expect(user.email).toBe("john@doe.com");
    expect(user.avatar).toBe("https://picsum.photos/seed/picsum/200/300");
    expect(user.password).toBe("securePassword");
  });
});
