// plantService.test.ts
import { InMemoryPlantRepository } from "../../adapters/in-memory-plant-repository";
import {
  PlantService,
  NoPlantsFoundError,
  NoPlantFoundError,
} from "./plantService";
import { Plant } from "../entities/plant.entity";

describe("PlantService", () => {
  it("should get all plants", async () => {
    const inMemoryPlantRepository = new InMemoryPlantRepository();
    const plantService = new PlantService(inMemoryPlantRepository);

    await inMemoryPlantRepository.addPlant(
      new Plant("1", "Rose", "user123", "Alice", new Date())
    );
    await inMemoryPlantRepository.addPlant(
      new Plant("2", "Tulip", "user456", "Bob", new Date())
    );

    const allPlants = await plantService.getAllPlants();

    expect(allPlants).toHaveLength(2);
    expect(allPlants[0].plantName).toBe("Rose");
  });

  it("should throw an error if no plants are found", async () => {
    const inMemoryPlantRepository = new InMemoryPlantRepository();
    const plantService = new PlantService(inMemoryPlantRepository);

    await expect(plantService.getAllPlants()).rejects.toThrow(
      NoPlantsFoundError
    );
  });

  it("should get a plant by id", async () => {
    const inMemoryPlantRepository = new InMemoryPlantRepository();
    const plantService = new PlantService(inMemoryPlantRepository);
    const plant = new Plant("1", "Rose", "user123", "Alice", new Date());
    await inMemoryPlantRepository.addPlant(plant);

    const plantById = await plantService.getPlantById("1");

    expect(plantById).toEqual(plant);
  });

  it("should add a plant", async () => {
    const inMemoryPlantRepository = new InMemoryPlantRepository();
    const plantService = new PlantService(inMemoryPlantRepository);
    const plant = new Plant("1", "Rose", "user123", "Alice", new Date());

    await plantService.addPlant(plant);

    const plantById = await plantService.getPlantById("1");
    expect(plantById).toEqual(plant);
  });
  it("should delete a plant by id", async () => {
    const inMemoryPlantRepository = new InMemoryPlantRepository();
    const plantService = new PlantService(inMemoryPlantRepository);

    const plant = new Plant("1", "Rose", "user123", "Alice", new Date());
    await inMemoryPlantRepository.addPlant(plant);

    await plantService.deletePlant("1");

    await expect(plantService.getPlantById("1")).rejects.toThrow(
      NoPlantFoundError
    );
  });
});
