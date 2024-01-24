import request from "supertest";
import { app, server } from "../app";
import { NoPlantFoundError } from "../domain/services/plantService";

describe("E2E tests plantController", () => {
  it("should add a plant", async () => {
    const response = await request(app).post("/api/plants").send({
      id: "1",
      plantName: "Rose",
      ownerId: "user123",
      owner: "Alice",
      createdAt: new Date(),
    });

    const plantById = await request(app).get("/api/plants/1");

    expect(response.status).toBe(201);
    expect(plantById.body).toHaveProperty("id", "1");
  });
  it("should get all plants", async () => {
    const response = await request(app).get("/api/plants");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("should get plant by id", async () => {
    const response = await request(app).get("/api/plants/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "1");
  });
  it("should delete a plant by id", async () => {
    const addResponse = await request(app).post("/api/plants").send({
      id: "4",
      plantName: "Lily",
      ownerId: "user789",
      owner: "Eve",
      createdAt: new Date(),
    });

    const deleteResponse = await request(app).delete("/api/plants/4");
    expect(deleteResponse.status).toBe(204);
  });

  afterAll(() => {
    server.close();
  });
});
