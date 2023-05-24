"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import SearchPage from "../search-page/search-page";
import { HomePageContainer } from "./home-page-styles";
import { TabPanel } from "./tab-panel/tab-panel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function HomePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Search",
      component: <SearchPage />,
    },
    {
      label: "Favorites",
      component: <h1>Favorites</h1>,
    },
  ];

  return (
    <HomePageContainer>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            {tabs.map((tab, index) => {
              return (
                <Tab label={tab.label} {...a11yProps(index)} key={index} />
              );
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
