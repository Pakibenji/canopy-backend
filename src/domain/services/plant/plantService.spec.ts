import { InMemoryPlantRepository } from "../../../adapters/plant/in-memory-plant-repository";
import {
  PlantService,
  NoPlantsFoundError,
  NoPlantFoundError,
} from "./plantService";
import { Plant } from "../../entities/plant/plant.entity";
import { FakeDateProvider } from "../../../adapters/fake-date-provider";

describe("PlantService", () => {
  let inMemoryPlantRepository: InMemoryPlantRepository;
  let fakeDateProvider: FakeDateProvider;
  let plantService: PlantService;

  beforeEach(() => {
    inMemoryPlantRepository = new InMemoryPlantRepository();
    fakeDateProvider = new FakeDateProvider(new Date("2021-01-01T00:00:00"));
    plantService = new PlantService(inMemoryPlantRepository, fakeDateProvider);
  });

  const createPlant = (
    id: string,
    plantName: string,
    plantImage: string,
    ownerId: string,
    owner: string
  ): Plant => {
    return new Plant(
      id,
      plantName,
      plantImage,
      ownerId,
      owner,
      fakeDateProvider.now()
    );
  };

  it("should get all plants", async () => {
    const rose = createPlant(
      "1",
      "Rose",
      "https://picsum.photos/seed/picsum/200/300",
      "user123",
      "Alice"
    );
    const tulip = createPlant(
      "2",
      "Tulip",
      "https://picsum.photos/seed/picsum/200/300",
      "user456",
      "Bob"
    );

    await inMemoryPlantRepository.addPlant(rose);
    await inMemoryPlantRepository.addPlant(tulip);

    const allPlants = await plantService.getAllPlants();

    expect(allPlants).toHaveLength(2);
    expect(allPlants[0].plantName).toBe("Rose");
  });

  it("should throw an error if no plants are found", async () => {
    await expect(plantService.getAllPlants()).rejects.toThrow(
      NoPlantsFoundError
    );
  });

  it("should get a plant by id", async () => {
    const rose = createPlant(
      "1",
      "Rose",
      "https://picsum.photos/seed/picsum/200/300",
      "user123",
      "Alice"
    );
    await inMemoryPlantRepository.addPlant(rose);

    const plantById = await plantService.getPlantById("1");
    expect(plantById).toEqual(rose);
  });

  it("should add a plant", async () => {
    const rose = createPlant(
      "1",
      "Rose",
      "https://picsum.photos/seed/picsum/200/300",
      "user123",
      "Alice"
    );

    await plantService.addPlant(rose);

    const plantById = await plantService.getPlantById("1");
    expect(plantById).toEqual(rose);
  });

  it("should delete a plant by id", async () => {
    const rose = createPlant(
      "1",
      "Rose",
      "https://picsum.photos/seed/picsum/200/300",
      "user123",
      "Alice"
    );
    await inMemoryPlantRepository.addPlant(rose);

    await plantService.deletePlant("1");

    await expect(plantService.getPlantById("1")).rejects.toThrow(
      NoPlantFoundError
    );
  });
  it("should update a plant", async () => {
    const initialPlant = new Plant(
      "1",
      "Rose",
      "https://picsum.photos/seed/picsum/200/300",
      "user123",
      "Alice",
      fakeDateProvider.now()
    );

    await plantService.addPlant(initialPlant);

    const updatedPlantData = {
      plantName: "Updated Rose",
      owner: "Updated Alice",
    };

    await plantService.updatePlant("1", updatedPlantData);

    const updatedPlant = await plantService.getPlantById("1");

    expect(updatedPlant).toEqual({
      ...initialPlant,
      ...updatedPlantData,
    });
  });
});
