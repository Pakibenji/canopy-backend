import { Plant } from "../entities/plant.entity";

export interface IPlantRepository {
  getAllPlants(): Promise<Plant[]>;
  getPlantById(id: string): Promise<Plant | null>;
  addPlant(plant: Plant): Promise<void>;
}

export default IPlantRepository;
