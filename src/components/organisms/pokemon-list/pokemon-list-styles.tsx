import { Box, Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

export const PokemonListContainer = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;
`;

export const PokemonListContent = styled(Box)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  max-width: 70vw;
  justify-content: center;
  align-items: center;
`;

export const PokemonListCard = styled(Card)`
  width: 200px;
`;

export const PokemonListCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PokemonListCardContentHeader = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

export const PokemonListCardNumber = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #8b8b8b;
`;
