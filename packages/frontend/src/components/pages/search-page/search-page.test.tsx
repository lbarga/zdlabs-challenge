import { ContextWrapper } from "@/contexts/_context";
import { makeSearchPage } from "@/factories/pages/search-page-factory";
import getAllPokemonsMockJson from "@/json/getAllPokemonsMock.json";
import { fireEvent, render, screen } from "@testing-library/react";

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

const setup = () => {
  const utils = render(
    <>
      <ContextWrapper>
        {makeSearchPage({
          pokeServiceParam: pokeServiceMock,
          useFavoriteToolsParam: () => useFavoriteToolsMock,
        })}
      </ContextWrapper>
    </>
  );

  return { ...utils };
};

describe("SearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state and then displays pokemon list", async () => {
    setup();

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await screen.findByText("bulbasaur");

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.queryByText("loading")).toBeNull();
  });

  test("handles pagination change correctly", async () => {
    setup();

    await screen.findByText("bulbasaur");

    fireEvent.click(screen.getByLabelText("Go to page 2"));

    expect(pokeServiceMock.getAllPokemons).toHaveBeenCalledWith(20);
  });

  test("handles favorite click correctly", async () => {
    setup();

    const chosenPokemon = getAllPokemonsMockJson.pokemons.results[0];

    await screen.findByText("bulbasaur");

    fireEvent.click(screen.getByTestId(`favorite-button-${chosenPokemon.id}`));

    expect(useFavoriteToolsMock.favoritePokemon).toHaveBeenCalledWith(
      chosenPokemon
    );
  });

  test("handles unfavorite click correctly", async () => {
    useFavoriteToolsMock.isFavorite.mockReturnValue(true);

    setup();

    const chosenPokemon = getAllPokemonsMockJson.pokemons.results[5];

    await screen.findByText("bulbasaur");

    fireEvent.click(screen.getByTestId(`favorite-button-${chosenPokemon.id}`));

    expect(useFavoriteToolsMock.unfavoritePokemon).toHaveBeenCalledWith(
      chosenPokemon
    );
  });
});
