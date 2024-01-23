// plantService.ts
import IPlantRepository from "../ports/plant-repository.interface";
import { Plant } from "../entities/plant.entity";

export class PlantService {
  constructor(private plantRepository: IPlantRepository) {}

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

  async getPlantById(id: string): Promise<Plant | null> {
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
      await this.plantRepository.addPlant(plant);
      if (!plant) {
        throw new PlantNotAddedError();
      }
    } catch (error) {
      throw new PlantNotAddedError();
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
