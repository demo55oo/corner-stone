import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { CategoriesContainer, CategoryItem } from "./styles";
import content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState<string | null>();
  const navigate = useNavigate()

  const handleCategory = (e: React.MouseEvent) => {
    console.log(e.currentTarget.getAttribute("name"));
    const val = e.currentTarget.getAttribute("name");
    setCategory(val);
  };

  const { data, isLoading } = useQuery(['Categories'], () => getCategories(),{
    select: (data) => data.data as any[]
  })

  const handleMouseLeave = () => {
    setCategory(null);
  };

  return (
    <CategoriesContainer container columnSpacing={5} color={"white"}>
      {data && data.map((val, idx) => (
        <CategoryItem
          key={val.id}
          item
          onClick={() => navigate(`/category/${val.id}`)}
          name={val.name}
          // onMouseEnter={handleCategory}
          // onMouseLeave={handleMouseLeave}
        >
          {val.name}

          {/* <List>
            {category === val.name &&
              val.subCat.map((sbVal) => (
                <ListItem disablePadding key={sbVal.name}>
                  <ListItemButton>
                    <ListItemText primary={sbVal.name} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List> */}
        </CategoryItem>
      ))}
    </CategoriesContainer>
  );
};

export default Categories;
