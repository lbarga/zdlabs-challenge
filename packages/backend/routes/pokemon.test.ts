import express from "express";
import request from "supertest";
import { Pokemon } from "../models/pokemons";
import pokemonsRoutes from "./pokemons";

const app = express();
app.use(express.json());
app.use("/", pokemonsRoutes);

describe("POST /", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new Pokemon", async () => {
    Pokemon.prototype.save = jest.fn();

    const response = await request(app)
      .post("/")
      .set("userid", "user123")
      .send({
        id: 1,
        name: "Pikachu",
        image: "https://example.com/pikachu.png",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Pokemon successfully inserted!",
    });
    expect(Pokemon.prototype.save).toBeCalledTimes(1);
  });

  it("should create a new Pokemon handle error", async () => {
    const errorMessage = "Test Error message";

    Pokemon.prototype.save = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const response = await request(app)
      .post("/")
      .set("userid", "user123")
      .send({
        id: 1,
        name: "Pikachu",
        image: "https://example.com/pikachu.png",
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: errorMessage,
    });
    expect(Pokemon.prototype.save).toBeCalledTimes(1);
  });

  it("should find pokemons", async () => {
    const mockResponse = ["pikachu", "charizard"];

    Pokemon.find = jest.fn().mockResolvedValue(mockResponse);

    const response = await request(app).get("/");

    expect(Pokemon.find).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it("should find pokemons handle error", async () => {
    const errorMessage = "Test Error message";

    Pokemon.find = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const response = await request(app).get("/");

    expect(Pokemon.find).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

  it("should delete a pokemon", async () => {
    Pokemon.deleteOne = jest.fn();

    const response = await request(app).delete("/1").set("userid", "user123");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Pokemon deleted successfully!",
    });
    expect(Pokemon.deleteOne).toBeCalledTimes(1);
  });

  it("should delete a pokemon handle error", async () => {
    const errorMessage = "Test Error message";

    Pokemon.deleteOne = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const response = await request(app).delete("/1").set("userid", "user123");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: errorMessage,
    });
    expect(Pokemon.deleteOne).toBeCalledTimes(1);
  });
});
