import React, { useState } from "react";
import { getUserInfo } from "../../api/auth";
import { Box, Button, Switch, TextField } from "@mui/material";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosInstance";

const Profile = () => {
  const [user, setUser] = useState<any>({});
  const [load, setload] = useState(false);
  React.useEffect(() => {
    (async () => {
      const u = await getUserInfo();
      setUser(u?.data);
    })();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      address: user?.address,
      username: user?.username,
      telephone: user?.telephone,
      email: user?.email,
      speciality: user.speciality,
      businessEmail: user.businessEmail,
      showEmail: user.showEmail,
      showMobile: user.showMobile,
      businessPhone: user.businessPhone,
      website: user.website,
      facebook: user.facebook,
      instagram: user.instagram,
      twitter: user.twitter,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setload(true);
      await axiosInstance({
        method: "PATCH",
        url: "/update-user",
        data: values,
      }).then(async () => {
        setload(false);
        const u = await getUserInfo();
        setUser(u?.data);
      });
    },
  });
  return (
    <div style={{ padding: "0px 15px" }}>
      <h1 style={{ color: "#fff" }}>Edit profile</h1>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Name
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="name"
          id="name"
          value={formik.values.name}
          placeholder="Name"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Username
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="username"
          id="username"
          value={formik.values.username}
          placeholder="username"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Address
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="address"
          id="address"
          value={formik.values.address}
          placeholder="Address"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Telephone
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="telephone"
          id="telephone"
          value={formik.values.telephone}
          placeholder="Telephone"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Email
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="email"
          id="email"
          value={formik.values.email}
          placeholder="email"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Business Email
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="businessEmail"
          id="businessEmail"
          value={formik.values.businessEmail}
          placeholder="Business Email"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Business Phone
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="businessPhone"
          id="businessPhone"
          value={formik.values.businessPhone}
          placeholder="Business Phone"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Speciality
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="speciality"
          id="speciality"
          value={formik.values.speciality}
          placeholder="Speciality"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Website
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="website"
          id="website"
          value={formik.values.website}
          placeholder="Website"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Facebook
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="facebook"
          id="facebook"
          value={formik.values.facebook}
          placeholder="Facebook"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Instagram
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="instagram"
          id="instagram"
          value={formik.values.instagram}
          placeholder="Instagram"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
          Twitter
        </label>
        <TextField
          fullWidth
          sx={{ background: "white", margin: "10px 0px" }}
          name="twitter"
          id="twitter"
          value={formik.values.twitter}
          placeholder="Twitter"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 0px",
            color: "#fff",
          }}
        >
          <label style={{ fontWeight: "bold" }}>
            Show Email
            <Switch
              checked={formik.values.showEmail}
              onChange={(e) =>
                formik.setFieldValue("showEmail", e.target.checked)
              }
              id="showEmail"
            />
          </label>
        </div>
      </Box>
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 0px",
            color: "#fff",
          }}
        >
          <label style={{ fontWeight: "bold" }}>
            Show Phone
            <Switch
              checked={formik.values.showMobile}
              id="showMobile"
              onChange={(e) =>
                formik.setFieldValue("showMobile", e.target.checked)
              }
            />
          </label>
        </div>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          onClick={formik.handleSubmit as any}
          variant="contained"
          disabled={load}
        >
          Save
        </Button>
      </Box>
    </div>
  );
};

export default Profile;
