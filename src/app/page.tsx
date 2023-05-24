"use client";

import Button from "@mui/material/Button";
import { styled } from "styled-components";

const StyledButton = styled(Button)`
  background-color: red;
`;

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <StyledButton variant="contained">Styled Button</StyledButton>
    </div>
  );
}
