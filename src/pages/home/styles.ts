import { Grid, GridProps, styled } from "@mui/material";

export const FeaturedAds = styled("div")(() => ({
  fontFamily: "Parisienne",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "48px",
  color: "#FF6063",
}));

export const GridCard = styled(Grid)<GridProps>(({ theme }) => ({
  paddingBottom: "85px",
  [theme.breakpoints.down("md")]: {
    margin: "auto",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
  },
}));
