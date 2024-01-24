// adapters/plant.controller.ts
import { Request, Response } from "express";
import { PlantService } from "../domain/services/plantService";
import { IPlantController } from "../domain/ports/plant-controller.interface";

export class PlantController implements IPlantController {
  constructor(private plantService: PlantService) {
    this.getAllPlants = this.getAllPlants.bind(this);
    this.getPlantById = this.getPlantById.bind(this);
    this.addPlant = this.addPlant.bind(this);
    this.deletePlant = this.deletePlant.bind(this);
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
  public async addPlant(req: Request, res: Response): Promise<void> {
    const plant = await this.plantService.addPlant(req.body);
    res.status(201).json(plant);
  }

  public async deletePlant(req: Request, res: Response): Promise<void> {
    await this.plantService.deletePlant(req.params.id);
    res.status(204).send();
  }
}
