import { useCallback, useContext, useEffect, useState } from "react";
import HomeFilters from "../../modules/home-filter";
import { Box, Button, Grid, Typography } from "@mui/material";

import CarousalImages from "../../modules/carouselImages";
import { CardDummy, featuredList } from "./content";

import { FeaturedAds, GridCard } from "./styles";
import MessageModal from "../../modules/messageModal";
import { Slide } from "pure-react-carousel";
import StyledCard, { CardProps } from "../../modules/card";
import ShareModal from "../../modules/shareModal";
import ChatModal from "../../modules/chatModal";
import ShowMore from "../../assets/icons/ShowMore.svg";
import StyledAdSpaceCard from "../../modules/adSpaceCard";
import AdInfo from "../../modules/adInfo";
import FeaturedButton from "../../common/featuredBtn";
import { AuthContext, UserType } from "../../context/Auth";
import axios from "axios";
import { useStore } from "../../store";
import AddPost from "../../modules/posts";
import { getUserInfo } from "../../api/auth";
import { getAllPosts, getUserPost } from "../../api/post";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StyledSelectProps } from "../../common/select";

import Categories from "../../modules/categories";
import { getPostCategories } from "../../api/category";
import SimpleBackdrop from "../../common/backdrop";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Home = () => {
  const userContext = useContext(AuthContext);
  const [posts, setPosts] = useState<CardProps[] | undefined>([]);
  const { setToken } = useStore();
  const [chatModal, setChatModal] = useState<boolean>(false);
  const [shareModal, setShareModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const [createPostModal, setCreatPostModal] = useState<boolean>(false);

  const [selectCategoryPost, setSelectCategoryPost] = useState<string>();
  const [selectLanguagePost, setLanguagePost] = useState<any>();
  const [selectCountryPost, setCountryPost] = useState<any>();
  const [receiver, setReceiver] = useState<null | string>(null);

  const [adInfo, setAdInfo] = useState<boolean>(false);
  const [cardSelected, setCardSelected] = useState<CardProps | undefined>(
    undefined
  );

  const handleCardDetails = async (card: CardProps) => {
    await setAdInfo(true);
    await setCardSelected(card);
  };

  const handleOpenModal = (e: any) => {
    console.log(e);
  };

  const User_Posts = useQuery(
    ["userInfo"],
    async () => {
      if (!localStorage.getItem("token")) {
        await axios.get(URL).then(({ data }) => {
          if (data) {
            setToken(data.token as string);
            localStorage.setItem("token", data.token as string);
            const { username, email, source, plan, isAdmin, adminType } = data;
            userContext?.handleUserName({
              username,
              email,
              source,
              plan,
              isAdmin: isAdmin,
              adminType: adminType,
            } as UserType);
          }
        });
      } else {
        const { data } = await getUserInfo();
        if (data) {
          const { username, email, source, plan, isAdmin, adminType, id } =
            data;
          userContext?.handleUserName({
            username,
            email,
            source,
            plan,
            isAdmin: isAdmin,
            adminType: adminType,
            id: id,
          } as UserType);
        }
      }
      const Posts = await getAllPosts();
      setPosts(Posts.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const onCreatePostCallBack = (flag: boolean) => {
    if (flag) {
      setSelectCategoryPost("");
    }
  };

  const featuredPosts = posts && posts?.filter((post: any) => post?.featured);

  return (
    <div>
      <HomeFilters
        onClick={() => setCreatPostModal(true)}
        setCatgeoryChange={(e) =>
          setSelectCategoryPost(e.target.value as string)
        }
        setLanguageChange={(e) => setLanguagePost(e.target.value as string)}
        setCountryChange={(e) => setCountryPost(e.target.value as string)}
      />
      <Typography
        sx={{ marginY: 10 }}
        component={"div"}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <FeaturedAds>Featured ads</FeaturedAds>
        <Typography
          component={"div"}
          display={"flex"}
          justifyContent={"center"}
          sx={{ marginLeft: "20px", marginTop: "12px" }}
        >
          {featuredList.map((val, idx) => (
            <div key={idx}>
              <FeaturedButton title={val} />
            </div>
          ))}
        </Typography>
      </Typography>
      <CarousalImages>
        {featuredPosts &&
          featuredPosts.map((val: CardProps, idx: number) => (
            <Slide index={idx}>
              <StyledCard
                data={val}
                setChatModal={() => setChatModal(true)}
                setMessageModal={() => setMessageModal(true)}
                setShareModal={() => setShareModal(true)}
                setCardDetaild={handleCardDetails}
                setReceiver={setReceiver}
                featured
              />
            </Slide>
          ))}
      </CarousalImages>
      <Box>
        <Typography component={"div"} textAlign={"center"} color={"white"}>
          Show more
        </Typography>
        <Typography
          component={"img"}
          display={"flex"}
          margin={"auto"}
          src={ShowMore}
        />
      </Box>
      <Typography
        component={"div"}
        textAlign={"center"}
        color={"#FF6063"}
        fontSize={"48px"}
        fontFamily={"Parisienne"}
      >
        Ads space
      </Typography>
      <Grid container sx={{ padding: 5 }}>
        {posts &&
          posts?.length > 0 &&
          posts.map((val: CardProps, idx: number) => (
            <GridCard item key={idx} xs={12} sm={12} md={3}>
              <StyledCard
                data={val}
                setChatModal={() => setChatModal(true)}
                setMessageModal={() => setMessageModal(true)}
                setShareModal={() => setShareModal(true)}
                setReceiver={setReceiver}
              />
            </GridCard>
          ))}
      </Grid>
      <Grid container sx={{ padding: 5 }}>
        {Array(12)
          .fill(1)
          .map(() => (
            <GridCard item key={0} xs={12} sm={12} md={3}>
              <StyledAdSpaceCard
                openPostModel={() => setCreatPostModal(true)}
              />
            </GridCard>
          ))}
      </Grid>
      <Box>
        <Typography component={"div"} textAlign={"center"} color={"white"}>
          Show more
        </Typography>
        <Typography
          component={"img"}
          display={"flex"}
          margin={"auto"}
          src={ShowMore}
        />
      </Box>
      <ChatModal open={chatModal} onClose={() => setChatModal(false)} />
      <ShareModal open={shareModal} onClose={() => setShareModal(false)} />
      <AdInfo
        open={adInfo}
        onClose={() => setAdInfo(false)}
        cardDetails={cardSelected}
      />
      <AddPost
        open={createPostModal}
        categoryId={selectCategoryPost}
        onClose={() => setCreatPostModal(false)}
        OnSuccessFunc={onCreatePostCallBack}
        defaults={{
          category: selectCategoryPost,
          language: selectLanguagePost,
          country: selectCountryPost,
        }}
      />
      <MessageModal
        open={messageModal}
        onClose={() => setMessageModal(false)}
        receiver={receiver}
      />
      <SimpleBackdrop open={User_Posts.isLoading} />
    </div>
  );
};

export default Home;
