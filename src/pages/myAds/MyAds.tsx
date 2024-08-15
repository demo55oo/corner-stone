import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Grid } from "@mui/material";
import StyledCard, { CardProps } from "../../modules/card";
import { GridCard } from "../home/styles";

const MyAds = () => {
  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/user-posts",
      });
      setPosts(response.data?.data?.Post);
    })();
  }, []);

  console.log(posts);
  return (
    <div>
      <Grid container sx={{ padding: 5 }}>
        {posts &&
          posts?.length > 0 &&
          posts.map((val: CardProps, idx: number) => (
            <GridCard item key={idx} xs={12} sm={12} md={3}>
              <StyledCard
                data={val}
                setChatModal={() => ({})}
                setMessageModal={() => ({})}
                setShareModal={() => ({})}
              />
            </GridCard>
          ))}
      </Grid>
    </div>
  );
};

export default MyAds;
