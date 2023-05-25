import { ReactElement } from "react";
import { UserContextWrapper } from "./user-context";

interface ContextWrapperProps {
  children: ReactElement | ReactElement[];
}

export const ContextWrapper = ({ children }: ContextWrapperProps) => (
  <UserContextWrapper>{children}</UserContextWrapper>
);
