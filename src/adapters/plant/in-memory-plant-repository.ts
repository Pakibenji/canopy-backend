// in-memory-plant-repository.ts
import { Plant } from "../../domain/entities/plant/plant.entity";
import { IPlantRepository } from "../../domain/ports/plant/plant-repository.interface";

export class InMemoryPlantRepository implements IPlantRepository {
  private plants: Plant[] = [];

  async getAllPlants(): Promise<Plant[]> {
    return this.plants;
  }

  async getPlantById(id: string): Promise<Plant | null> {
    return this.plants.find((plant) => plant.id === id) || null;
  }

  async addPlant(plant: Plant): Promise<void> {
    this.plants.push(plant);
  }
  async deletePlant(id: string): Promise<void> {
    const plantIndex = this.plants.findIndex((plant) => plant.id === id);
    if (plantIndex !== -1) {
      this.plants.splice(plantIndex, 1);
    }
  }

  async updatePlant(id: string, updatedPlant: Plant): Promise<void> {
    const index = this.plants.findIndex((plant) => plant.id === id);
    if (index !== -1) {
      this.plants[index] = updatedPlant;
    }
  }
}
