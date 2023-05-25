"use client";
import { PokemonModel } from "@/models/pokemon-model";
import { createContext, ReactElement, useContext, useState } from "react";

export interface userContextState {
  UUID: string;
  setUUID: (UUID: string) => void;
  favoritedPokemons: PokemonModel[];
  setFavoritedPokemons: (favoritedPokemons: PokemonModel[]) => void;
}

const UserContext = createContext({});

interface WrapperProps {
  children: ReactElement | ReactElement[];
}

export function UserContextWrapper({ children }: WrapperProps) {
  const [UUID, setUUID] = useState<string>("");
  const [favoritedPokemons, setFavoritedPokemons] = useState<PokemonModel[]>(
    []
  );

  const state: userContextState = {
    UUID,
    setUUID,
    favoritedPokemons,
    setFavoritedPokemons,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  return useContext(UserContext) as userContextState;
};
