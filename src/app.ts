import express from "express";
import { InMemoryPlantRepository } from "./adapters/in-memory-plant-repository";
import { PlantController } from "./adapters/plant.controller";
import { PlantService } from "./domain/services/plantService";
import { plantRouter } from "./routes/plantRoutes";

const app = express();
const port = 3000;

const plantRepository = new InMemoryPlantRepository();
const plantService = new PlantService(plantRepository);
const plantController = new PlantController(plantService);

app.use(express.json());
app.use("/api", plantRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server };
