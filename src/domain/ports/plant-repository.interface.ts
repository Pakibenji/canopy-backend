import { Plant } from "../entities/plant.entity";

export interface IPlantRepository {
  deletePlant(id: string): Promise<void>;
  getAllPlants(): Promise<Plant[]>;
  getPlantById(id: string): Promise<Plant | null>;
  addPlant(plant: Plant): Promise<void>;
}
