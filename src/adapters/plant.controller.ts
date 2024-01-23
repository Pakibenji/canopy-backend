// adapters/plant.controller.ts
import { Request, Response } from "express";
import { PlantService } from "../domain/services/plantService";

class PlantController {
  private plantService: PlantService;

  constructor(plantService: PlantService) {
    this.plantService = plantService;
    this.getAllPlants = this.getAllPlants.bind(this);
    this.getPlantById = this.getPlantById.bind(this);
  }

  public async getAllPlants(req: Request, res: Response): Promise<void> {
    const plants = await this.plantService.getAllPlants();
    res.status(200).json(plants);
  }

  public async getPlantById(req: Request, res: Response): Promise<void> {
    const plant = await this.plantService.getPlantById(req.params.id);
    if (!plant) {
      res.status(404).json({ error: "Plant not found" });
    } else {
      res.status(200).json(plant);
    }
  }
}

export { PlantController };
