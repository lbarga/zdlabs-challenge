import express, { Request, Response } from "express";
import { Pokemon } from "../models/pokemons";

const pokemonsRoutes = express.Router();

pokemonsRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const pokemon = new Pokemon({
      userId: req.headers.userid,
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
    });

    await pokemon.save();

    res.status(201).json({ message: "Pokemon successfully inserted!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

pokemonsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const pokemons = await Pokemon.find({ userId: req.headers.userid });

    res.status(200).json(pokemons);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

pokemonsRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.headers.userid;
    const id = req.params.id;

    await Pokemon.deleteOne({ userId, id });

    res.status(200).json({ message: "Pokemon deleted successfully!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default pokemonsRoutes;
