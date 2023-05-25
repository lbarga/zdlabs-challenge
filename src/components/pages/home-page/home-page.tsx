"use client";
import { useUserContext } from "@/contexts/user-context";
import { pokemonService } from "@/services/pokemon.service";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SyntheticEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FavoritesPage from "../favorites-page/favorites-page";
import SearchPage from "../search-page/search-page";
import { HomePageContainer } from "./home-page-styles";
import { TabPanel } from "./tab-panel/tab-panel";

export default function HomePage() {
  const [value, setValue] = useState(0);
  const userContext = useUserContext();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Search",
      component: <SearchPage />,
    },
    {
      label: "Favorites",
      component: <FavoritesPage />,
    },
  ];

  const firstAccess = () => {
    const newUUID = uuidv4();

    localStorage.setItem("user_id", newUUID);
  };

  const fetchFavoritedPokemons = async (userUUID: string) => {
    const { data } = await pokemonService.getFavoritedPokemons(
      userUUID as string
    );

    if (data) {
      userContext.setFavoritedPokemons(data);
    }
  };

  useEffect(() => {
    const userUUID = localStorage.getItem("user_id");

    if (userUUID === null) {
      firstAccess();
    }

    userContext.setUUID(userUUID as string);

    if (userUUID) {
      fetchFavoritedPokemons(userUUID as string);
    }
  }, []);

  return (
    <HomePageContainer>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            {tabs.map((tab, index) => {
              return <Tab label={tab.label} key={index} />;
            })}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => {
          return (
            <TabPanel value={value} index={index} key={index}>
              {tab.component}
            </TabPanel>
          );
        })}
      </Box>
    </HomePageContainer>
  );
}
