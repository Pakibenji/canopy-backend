import { Plant } from "../../entities/plant/plant.entity";

export interface IPlantRepository {
  updatePlant(id: string, updatedPlant: Plant): Promise<void>;
  deletePlant(id: string): Promise<void>;
  getAllPlants(): Promise<Plant[]>;
  getPlantById(id: string): Promise<Plant | null>;
  addPlant(plant: Plant): Promise<void>;
}
