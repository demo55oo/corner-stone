import { Grid, Typography, Box, SelectChangeEvent } from "@mui/material";
import SimpleSelect, { StyledSelectProps } from "../../common/select";
import StyledButton from "../../common/button";
import { StyledTextField } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category";
import { getLanguages } from "../../api/language/language";
import { getCountries } from "../../api/countries/country";

const list_1 = [
  {
    label: "category 1",
    key: "0",
    value: "Category1",
  },
  {
    label: "category 2",
    key: "1",
    value: "Category2",
  },
  {
    label: "category 3",
    key: "2",
    value: "Category3",
  },
  {
    label: "category 4",
    key: "3",
    value: "Category4",
  },
];

interface HomeFilters {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;
  setCatgeoryChange: (event: SelectChangeEvent<unknown>) => void;
  setLanguageChange: (event: SelectChangeEvent<unknown>) => void;
  setCountryChange: (event: SelectChangeEvent<unknown>) => void;
}

const HomeFilters = ({
  onClick,
  setCatgeoryChange,
  setLanguageChange,
  setCountryChange,
}: HomeFilters) => {
  const { data, isLoading, isError }: any = useQuery(
    ["GetCategores"],
    async () => await getCategories(),
    {
      select: ({ data }) => {
        const result: StyledSelectProps[] = data.map(
          (val: {
            name: string;
            id: string;
            subCategoryId: string | undefined | null;
          }) => ({
            label: val.name,
            value: val,
            id: val.id,
            subCategoryId: val.subCategoryId || null,
          })
        );
        return result;
      },
    }
  );
  const { data: langauges }: any = useQuery(
    ["GetLanguages"],
    async () => await getLanguages(),
    {
      select: (data) => {
        const result = data?.map(
          (val: {
            id: string;
            code: string;
            name: string;
            subCategoryId: string | undefined | null;
          }) => ({
            id: val.id,
            label: val.name,
            value: val,
            code: val.code,
            subCategoryId: val.subCategoryId || null,
          })
        );
        return result;
      },
    }
  );
  const { data: countries }: any = useQuery(
    ["GetCountries"],
    async () => await getCountries(),
    {
      select: (data) => {
        const result = data?.map(
          (val: {
            id: string;
            code: string;
            name: string;
            subCategoryId: string | undefined | null;
          }) => ({
            id: val.id,
            label: val.name,
            value: val,
            code: val.code,
            subCategoryId: val.subCategoryId || null,
          })
        );
        return result;
      },
    }
  );

  return (
    <Grid
      container
      color={"white"}
      gap={10}
      justifyContent={"center"}
      textAlign={"center"}
    >
      <Grid item xs={2} sm={2} lg={2}>
        Google Ads
      </Grid>
      <Grid container sm={12} lg={3} justifyContent={"center"}>
        <Grid item>
          <Typography
            component={"div"}
            textAlign={"center"}
            fontFamily={"Parisienne"}
            fontSize={"40px"}
            color={"#FF6063"}
          >
            Create Ad Space
          </Typography>

          <Typography component={"div"} display={"flex"}>
            {data?.length > 0 && (
              <SimpleSelect
                label={"Select category"}
                list={data}
                sx={{ m: 1 }}
                onChange={setCatgeoryChange}
              />
            )}
            {langauges?.length > 0 && (
              <SimpleSelect
                label={"Ad language"}
                list={langauges}
                sx={{ m: 1 }}
                onChange={setLanguageChange}
              />
            )}
            {countries?.length > 0 && (
              <SimpleSelect
                label={"Select country"}
                list={countries}
                sx={{ m: 1 }}
                onChange={setCountryChange}
              />
            )}
          </Typography>

          <Typography component={"div"} sx={{ marginTop: "10px" }}>
            <StyledButton label="Start" onClick={onClick} />
          </Typography>
          <Typography component={"div"} sx={{ marginTop: "10px" }}>
            Google Ads
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} lg={3} justifyContent={"center"}>
        <Grid item>
          <Typography
            component={"div"}
            textAlign={"center"}
            fontFamily={"Parisienne"}
            fontSize={"40px"}
            color={"#FF6063"}
          >
            Find Ad Space
          </Typography>
          <Typography component={"div"} display={"flex"}>
            {data?.length > 0 && (
              <SimpleSelect
                label={"Select category"}
                list={data}
                sx={{ m: 1 }}
              />
            )}
            {langauges?.length > 0 && (
              <SimpleSelect
                label={"Ad language"}
                list={langauges}
                sx={{ m: 1 }}
              />
            )}
            {countries?.length > 0 && (
              <SimpleSelect
                label={"Select country"}
                list={countries}
                sx={{ m: 1 }}
              />
            )}
          </Typography>
          <Typography component={"div"} sx={{ m: 1 }}>
            <StyledButton label="Find" />
          </Typography>
          <Typography component={"div"}>OR</Typography>
          <Typography component={"div"} sx={{ display: "flex" }}>
            <Box sx={{ m: 1 }}>
              <StyledTextField placeholder="Enter Keywords" />
            </Box>
            <Box sx={{ m: 1 }}>
              <StyledButton label="Go" />
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid item sm={2} lg={2}>
        <Typography component={"div"}>Google Ads</Typography>
      </Grid>
    </Grid>
  );
};

export default HomeFilters;
