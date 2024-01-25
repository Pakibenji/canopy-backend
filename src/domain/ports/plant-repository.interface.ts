import { Plant } from "../entities/plant.entity";

export interface IPlantRepository {
  updatePlant(id: string, updatedPlant: { id: string; plantName: string; ownerId: string; owner: string; createdAt: Date; }): Promise<void>;
  deletePlant(id: string): Promise<void>;
  getAllPlants(): Promise<Plant[]>;
  getPlantById(id: string): Promise<Plant | null>;
  addPlant(plant: Plant): Promise<void>;
}
