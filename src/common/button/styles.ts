import { Button, ButtonProps, styled } from "@mui/material";

export const ButtonStyles = styled(Button)<ButtonProps>(() => ({
  borderRadius: 10,
  background: "linear-gradient(90deg, #FF9966 0%, #FF5E62 100%)",
  height: 38,
}));

export const ButtonLabel = styled("div")(() => ({
  fontFamily: "Heebo",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "auto",
  textTransform: "capitalize",
}));
