// plantService.ts
import { IPlantRepository } from "../ports/plant-repository.interface";
import { Plant } from "../entities/plant.entity";
import { IDateProvider } from "../ports/date-provider.interface";

export class PlantService {
  constructor(
    private readonly plantRepository: IPlantRepository,
    private readonly dateProvider: IDateProvider
  ) {}

  async getAllPlants(): Promise<Plant[]> {
    try {
      const plants = await this.plantRepository.getAllPlants();
      if (plants.length === 0) {
        throw new NoPlantsFoundError();
      }
      return plants;
    } catch (error) {
      throw error;
    }
  }

  async getPlantById(id: string): Promise<Plant> {
    try {
      const plant = await this.plantRepository.getPlantById(id);
      if (!plant) {
        throw new NoPlantFoundError();
      }
      return plant;
    } catch (error) {
      throw error;
    }
  }

  async addPlant(plant: Plant): Promise<void> {
    try {
      await this.plantRepository.addPlant({
        ...plant,
        createdAt: this.dateProvider.now(),
      });
      if (!plant) {
        throw new PlantNotAddedError();
      }
    } catch (error) {
      throw new PlantNotAddedError();
    }
  }

  async deletePlant(id: string): Promise<void> {
    try {
      const plant = await this.plantRepository.getPlantById(id);
      if (!plant) {
        throw new NoPlantFoundError();
      }
      await this.plantRepository.deletePlant(id);
    } catch (error) {
      throw error;
    }
  }
}

export class NoPlantsFoundError extends Error {
  constructor() {
    super("No plants found");
    this.name = "NoPlantsFoundError";
  }
}

export class NoPlantFoundError extends Error {
  constructor() {
    super("No plant found");
    this.name = "NoPlantFoundError";
  }
}

export class PlantNotAddedError extends Error {
  constructor() {
    super("Plant could not be added");
    this.name = "PlantNotAddedError";
  }
}
