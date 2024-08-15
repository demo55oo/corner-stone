import { Grid, useMediaQuery, useTheme } from "@mui/material";
import {
  HeaderSection,
  HeaderTitle,
  LanguageSiteBox,
  LogoHeader,
  SelectLanguage,
} from "./styles";
import worldwide from "../../assets/icons/worldwide.svg";
import { useNavigate } from "react-router-dom";
import { getStaticContent } from "../../api/content";
import { useEffect, useState } from "react";

const Header = () => {
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down("sm"));
  const naviagte = useNavigate();
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    (async () => {
      const c = await getStaticContent();
      setContent(c);
    })();
  }, []);

  return (
    <HeaderSection>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={4}>
          <LogoHeader onClick={() => naviagte("/")}>
            <img
              src={content?.logo}
              alt="site logo"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </LogoHeader>
        </Grid>
        <Grid item xs={4}>
          <HeaderTitle>Welcome to</HeaderTitle>
          <HeaderTitle>{content?.siteName}</HeaderTitle>
        </Grid>
        <LanguageSiteBox item xs={4}>
          <img src={worldwide} alt="worldwide" />
          {!media && (
            <SelectLanguage
              title="Site Languages"
              value={""}
              onChange={() => {
                ("");
              }}
            >
              <option value={""}>Site Languages</option>
              <option value={""}>Arabic</option>
              <option value={""}>English</option>
            </SelectLanguage>
          )}
        </LanguageSiteBox>
      </Grid>
    </HeaderSection>
  );
};
export default Header;
