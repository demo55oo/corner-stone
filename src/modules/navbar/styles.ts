import { Box, BoxProps, Grid, GridProps, styled } from "@mui/material";

export const NavbarContainer = styled(Box)<BoxProps>(() => ({
  display: "flex",
  padding: 33,
}));

export const HyperLink = styled("div")(() => ({
  color: "white",
  cursor: "pointer",
  a: {
    color: "white",
    ":hover": {
      color: "#FF6063",
    },
  },
}));

interface StyledGrid extends GridProps {
  shrink?: string;
}

export const NavPages = styled(Grid)<StyledGrid>(({ shrink }) => ({
  display: shrink === "true" ? "none" : "flex",
}));

import Rectangle from "../../assets/Rectangle.png";

export const ModalContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: `url(${Rectangle}) no-repeat`,
  border: "2px solid #000",
  boxShadow: "24px",
  padding: "25px",
  width: "60vw",
  height: "60vh",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  flexDirection: "column",
  backgroundPosition: "top",
}));
