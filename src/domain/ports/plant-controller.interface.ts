export interface IPlantController {
  getAllPlants(req: any, res: any): Promise<void>;
  getPlantById(req: any, res: any): Promise<void>;
  addPlant(req: any, res: any): Promise<void>;
  deletePlant(req: any, res: any): Promise<void>;
}
