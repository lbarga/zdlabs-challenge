import { ContextWrapper } from "@/contexts/_context";
import { makeFavoritesPage } from "@/factories/pages/favorites-page-factory";
import getAllPokemonsMockJson from "@/json/getAllPokemonsMock.json";
import userContextMockJson from "@/json/userContextMock.json";
import { render, screen } from "@testing-library/react";

const pokeServiceMock = {
  getAllPokemons: jest.fn().mockResolvedValue({
    data: getAllPokemonsMockJson,
  }),
};

const useFavoriteToolsMock = {
  isFavorite: jest.fn(),
  unfavoritePokemon: jest.fn(),
  favoritePokemon: jest.fn(),
};

const useUserContextMock = {
  ...userContextMockJson,
  setUUID: jest.fn(),
  setFavoritedPokemons: jest.fn(),
};

const setup = () => {
  const utils = render(
    <>
      <ContextWrapper>
        {makeFavoritesPage({
          useFavoriteToolsParam: () => useFavoriteToolsMock,
          useUserContextParam: () => useUserContextMock,
        })}
      </ContextWrapper>
    </>
  );

  return { ...utils };
};

describe("FavoritesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders favorited pokemons list correclty", async () => {
    setup();

    await screen.findByText("butterfree");

    expect(screen.getByText("butterfree")).toBeInTheDocument();
  });

  // test("handles unfavorite click correctly", async () => {
  //   useFavoriteToolsMock.isFavorite.mockReturnValue(true);

  //   setup();

  //   const chosenPokemon = getAllPokemonsMockJson.pokemons.results[5];

  //   await screen.findByText("butterfree");

  //   fireEvent.click(screen.getByTestId(`favorite-button-${chosenPokemon.id}`));

  //   expect(useFavoriteToolsMock.unfavoritePokemon).toHaveBeenCalledWith(
  //     chosenPokemon
  //   );
  // });
});
