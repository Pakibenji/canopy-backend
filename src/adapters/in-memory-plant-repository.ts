// in-memory-plant-repository.ts
import { Plant } from "../domain/entities/plant.entity";
import IPlantRepository from "../domain/ports/plant-repository.interface";

export class InMemoryPlantRepository implements IPlantRepository {
  private plants: Plant[] = [
    new Plant("1", "Rose", "user123", "Alice", new Date()),
    new Plant("2", "Tulip", "user456", "Bob", new Date()),
  ];

  async getAllPlants(): Promise<Plant[]> {
    return this.plants;
  }

  async getPlantById(id: string): Promise<Plant | null> {
    return this.plants.find((plant) => plant.id === id) || null;
  }

  async addPlant(plant: Plant): Promise<void> {
    this.plants.push(plant);
  }
}
