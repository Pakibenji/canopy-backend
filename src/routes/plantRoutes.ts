// routes/plantRoutes.ts
import express, { Router } from "express";
import { InMemoryPlantRepository } from "../adapters/plant/in-memory-plant-repository";
import { PlantController } from "../adapters/plant/plant.controller";
import { PlantService } from "../domain/services/plant/plantService";
import { RealDateProvider } from "../adapters/real-date-provider";

export const plantRouter: Router = express.Router();
const plantRepository = new InMemoryPlantRepository();
const realDateProvider = new RealDateProvider();
const plantService = new PlantService(plantRepository, realDateProvider);
const plantController = new PlantController(plantService);

plantRouter.get("/plants", plantController.getAllPlants);
plantRouter.get("/plants/:id", plantController.getPlantById);
plantRouter.post("/plants", plantController.addPlant);
plantRouter.delete("/plants/:id", plantController.deletePlant);
plantRouter.put("/plants/:id", plantController.updatePlant);
