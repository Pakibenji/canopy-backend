interface IPlantController {
  getAllPlants(req: any, res: any): Promise<void>;
  getPlantById(req: any, res: any): Promise<void>;
}

export default IPlantController;
