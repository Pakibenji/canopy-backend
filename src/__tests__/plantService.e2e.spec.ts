import request from "supertest";
import { app, server } from "../app";

describe("E2E tests plantController", () => {
  it("should add a plant", async () => {
    const response = await request(app).post("/api/plants").send({
      id: "1",
      plantName: "Rose",
      ownerId: "user123",
      owner: "Alice",
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
    });

    const deleteResponse = await request(app).delete("/api/plants/4");
    expect(deleteResponse.status).toBe(204);
  });
  it("should update a plant by id", async () => {
    const addResponse = await request(app).post("/api/plants").send({
      id: "1",
      plantName: "Rose",
      ownerId: "user123",
      owner: "Alice",
    });

    const updatedData = {
      plantName: "Updated Rose",
      owner: "Alice",
    };

    const updateResponse = await request(app)
      .put("/api/plants/1")
      .send(updatedData);
    expect(updateResponse.status).toBe(200);

    const updatedPlant = await request(app).get("/api/plants/1");
    expect(updatedPlant.body).toEqual({
      id: "1",
      plantName: "Updated Rose",
      ownerId: "user123",
      owner: "Alice",
      createdAt: expect.any(String),
    });
  });

  afterAll(() => {
    server.close();
  });
});
