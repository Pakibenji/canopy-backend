import { Plant } from "./plant.entity";

describe("Plant entity", () => {
  it("should create a plant instance", () => {
    const id = "1";
    const plantName = "Rose";
    const plantImage = "https://picsum.photos/seed/picsum/200/300";
    const ownerId = "user123";
    const owner = "Alice";
    const createdAt = new Date();

    const plant = new Plant(
      id,
      plantName,
      plantImage,
      ownerId,
      owner,
      createdAt
    );

    expect(plant).toBeDefined();
    expect(plant.id).toBe(id);
    expect(plant.plantName).toBe(plantName);
    expect(plant.plantImage).toBe(plantImage);
    expect(plant.ownerId).toBe(ownerId);
    expect(plant.owner).toBe(owner);
    expect(plant.createdAt).toBe(createdAt);
  });
});
