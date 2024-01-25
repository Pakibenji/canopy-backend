import { Plant } from "./plant.entity";

describe("Plant entity", () => {
  const createDefaultPlant = (overrides: Partial<Plant> = {}): Plant => {
    const defaultValues: Plant = {
      id: "1",
      plantName: "Rose",
      plantImage: "https://picsum.photos/seed/picsum/200/300",
      ownerId: "user123",
      owner: "Alice",
      createdAt: new Date(),
    };

    return { ...defaultValues, ...overrides };
  };

  it("should create a plant instance", () => {
    const plant = createDefaultPlant();
    expect(plant).toBeDefined();
    expect(plant.id).toBe("1");
    expect(plant.plantName).toBe("Rose");
    expect(plant.plantImage).toBe("https://picsum.photos/seed/picsum/200/300");
    expect(plant.ownerId).toBe("user123");
    expect(plant.owner).toBe("Alice");
    expect(plant.createdAt).toBeDefined();
  });
  it("should throw an error if plant name is invalid", () => {
    const plant = createDefaultPlant({ plantName: "" });
    expect(() => {
      new Plant(
        plant.id,
        plant.plantName,
        plant.plantImage,
        plant.ownerId,
        plant.owner,
        plant.createdAt
      );
    }).toThrow("Name cannot be empty");
  });
  it("should throw an error if plant image is invalid", () => {
    const plant = createDefaultPlant({ plantImage: "" });
    expect(() => {
      new Plant(
        plant.id,
        plant.plantName,
        plant.plantImage,
        plant.ownerId,
        plant.owner,
        plant.createdAt
      );
    }).toThrow("Image cannot be empty");
  });
  it("should throw an error if plant image is invalid", () => {
    const plant = createDefaultPlant({ plantImage: "invalid url" });
    expect(() => {
      new Plant(
        plant.id,
        plant.plantName,
        plant.plantImage,
        plant.ownerId,
        plant.owner,
        plant.createdAt
      );
    }).toThrow("Invalid url");
  });
});
