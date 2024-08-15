import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Subscribe, gelAllPlans } from "../../api/plans";
import { getUserInfo } from "../../api/auth";
import SimpleBackdrop from "../../common/backdrop";
import { Link } from "react-router-dom";
import { CheckCircle, CloseRounded } from "@mui/icons-material";
import ConfirmationModal from "../../common/confirmation/ConfirmationModal";
import axiosInstance from "../../api/axiosInstance";

type PlansProps = {
  id?: string;
  name: string;
  featuedPostNumber: number;
  postNumber: number;
  price: number;
  onClick: (a: any) => void;
  userPlan?: string;
  browseAndSaveAds: boolean;
  messageAdvertisers: boolean;
  chatWithAdvertisers: boolean;
  createGroupChats: boolean;
  postVideoUrls: boolean;
  uploadVideos: boolean;
  featuredMember: boolean;
};

const Plan = () => {
  const clientQuery = useQueryClient();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const {
    mutate,
    isLoading: MutateLoading,
    error,
    isError,
  } = useMutation<any, Error, any>((planId: string) => Subscribe(planId), {
    onSuccess: (data) => {
      clientQuery.invalidateQueries(["userInfo"]);
      console.log(data);
      refetch();
    },
  });

  const { data, refetch, isLoading } = useQuery(
    ["plans"],
    async () => {
      const plans = await gelAllPlans();
      const user = await getUserInfo();

      return {
        plans,
        user,
      };
    },
    {
      select: ({ plans, user }) => {
        return {
          plans: plans.data as PlansProps[],
          user: user.data,
        };
      },
    }
  );

  const cancelPlan = async () => {
    await axiosInstance.delete("/plan/cancel").then(() => {
      refetch();
      setOpenDeleteModal(false);
    });
  };
  const upgradePlan = async () => {
    await axiosInstance.post("/plan/upgrade").then(() => {
      refetch();
      setOpenUpgradeModal(false);
    });
  };

  return (
    <div>
      <ConfirmationModal
        open={openDeleteModal}
        onAgree={cancelPlan}
        onClose={() => setOpenDeleteModal(false)}
        title="Cancel Plan"
        description="Are you sure you want to cancel this plan?"
      />
      <ConfirmationModal
        open={openUpgradeModal}
        onAgree={upgradePlan}
        onClose={() => setOpenUpgradeModal(false)}
        title="Upgrade Plan"
        description="How would you like to upgrade your plan?"
        agreeText="Upgrade Now"
        disAgreeText="Close"
        third
        thirdClick={upgradePlan}
        thirdText="Upgrade at the end of month."
      />
      <Box display={"flex"} justifyContent={"center"} m={5}>
        {isError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
            {" recharge balance here "}
            <Link to={"/wallet"}>check it out!</Link>
          </Alert>
        )}
      </Box>
      <Box display={"flex"} justifyContent={"center"} m={5}>
        <Typography fontSize={30} component={"div"} color={"white"}>
          Your Plan:{" "}
          {data && data.user.plan !== null
            ? data?.user.plan.name
            : "*You have no plan!*"}
        </Typography>
        {data && data.user.plan !== null && (
          <>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ mx: 2 }}
              onClick={() => setOpenUpgradeModal(true)}
              disabled={data?.user.plan?.featuredMember}
            >
              Upgrade
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ mx: 2 }}
              onClick={() => setOpenDeleteModal(true)}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
      <Grid
        container
        spacing={5}
        justifyContent={"center"}
        textAlign={"center"}
      >
        {data?.plans &&
          data?.plans?.map((val) => (
            <Grid item xs={4} justifyContent={"center"} display={"flex"}>
              <StyledCard
                featuedPostNumber={val.featuedPostNumber}
                name={val.name}
                postNumber={val.postNumber}
                price={val.price}
                id={val.id}
                onClick={() => val.id && mutate(val.id)}
                browseAndSaveAds={val.browseAndSaveAds}
                chatWithAdvertisers={val.chatWithAdvertisers}
                createGroupChats={val.createGroupChats}
                featuredMember={val.featuredMember}
                messageAdvertisers={val.messageAdvertisers}
                postVideoUrls={val.postVideoUrls}
                uploadVideos={val.uploadVideos}
                userPlan={data.user.plan !== null && data.user.plan.id}
              />
            </Grid>
          ))}
      </Grid>
      <SimpleBackdrop open={isLoading || MutateLoading} />
    </div>
  );
};

const StyledCard = ({
  featuedPostNumber,
  id,
  name,
  postNumber,
  price,
  onClick,
  userPlan,
  browseAndSaveAds,
  chatWithAdvertisers,
  createGroupChats,
  featuredMember,
  messageAdvertisers,
  postVideoUrls,
  uploadVideos,
}: PlansProps) => {
  return (
    <Card
      sx={{
        minWidth: 345,
        minHeight: 300,
        alignItems: "center",
        display: "grid",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {name}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Add featured post: {featuedPostNumber}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Add post: {postNumber}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Price: {price}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Browse & Save ADs:{" "}
          {browseAndSaveAds ? <CheckCircle /> : <CloseRounded />}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Chat with Advertisers
          {chatWithAdvertisers ? <CheckCircle /> : <CloseRounded />}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Message Advertisers
          {messageAdvertisers ? <CheckCircle /> : <CloseRounded />}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Create Groups
          {createGroupChats ? <CheckCircle /> : <CloseRounded />}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Featured Member
          {featuredMember ? <CheckCircle /> : <CloseRounded />}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Post Video URLs
          {postVideoUrls ? <CheckCircle /> : <CloseRounded />}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Upload Videos
          {uploadVideos ? <CheckCircle /> : <CloseRounded />}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={onClick}
          disabled={id === userPlan}
          size="small"
        >
          Subscribe
        </Button>
      </CardActions>
    </Card>
  );
};

export default Plan;
