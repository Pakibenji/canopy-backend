// routes/plantRoutes.ts
import express, { Router } from "express";
import { InMemoryPlantRepository } from "../adapters/in-memory-plant-repository";
import { PlantController } from "../adapters/plant.controller";
import { PlantService } from "../domain/services/plantService";

export const plantRouter: Router = express.Router();
const plantRepository = new InMemoryPlantRepository();
const plantService = new PlantService(plantRepository);
const plantController = new PlantController(plantService);

plantRouter.get("/plants", plantController.getAllPlants);
plantRouter.get("/plants/:id", plantController.getPlantById);
