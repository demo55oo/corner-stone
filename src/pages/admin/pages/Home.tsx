import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout";
import {
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [newUserModal, setNewUserModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUserName, setNewUsername] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [newTelephone, setNewTelephone] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isJuniorAdmin, setIsJuniorAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(URL + "/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(URL + `/users/${id}`);
      setUsers(users.filter((user: any) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (user: any) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (newUserName && newEmail) {
      await axios
        .put(URL + `/users/${editingUser.id}`, {
          username: newUserName ? newUserName : editingUser?.username,
          email: newEmail ? newEmail : editingUser?.email,
          name: newName ? newName : editingUser?.name,
          address: newAddress ? newAddress : editingUser?.address,
          telephone: newTelephone ? newTelephone : editingUser?.telephone,
        })
        .then(() => {
          setModalOpen(false);
          setTimeout(() => {
            (window as Window).location.reload();
          }, 1000);
        });
    }
  };

  const suspendUser = async (id: number) => {
    try {
      await axios.get(URL + `/users/suspend/${id}`).then(() => {
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    } catch (err) {
      console.error(err);
    }
  };
  const activateUser = async (id: number) => {
    try {
      await axios.get(URL + `/users/activate/${id}`).then(() => {
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "telephone", headerName: "Telephone", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "ip", headerName: "IP", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 125,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const onClickDelete = () => {
          handleDelete(params.row.id);
        };

        const onClickUpdate = () => {
          handleUpdate(params.row);
        };
        return (
          <div>
            <IconButton aria-label="edit" onClick={onClickUpdate}>
              <EditIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton aria-label="delete" onClick={onClickDelete}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
            {!(params.row?.status === "ACTIVE") ? (
              <IconButton onClick={() => activateUser(params.row.id)}>
                <AddIcon sx={{ color: "green" }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => suspendUser(params.row.id)}>
                <RemoveIcon sx={{ color: "yellow" }} />
              </IconButton>
            )}
          </div>
        );
      },
    },
  ];

  const modalBody = (
    <Box
      sx={{
        position: "absolute",
        width: 400,
        bgcolor: "#fff",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "20px",
      }}
    >
      <TextField
        label="Username"
        value={newUserName ? newUserName : editingUser?.username}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <TextField
        label="Email"
        value={newEmail ? newEmail : editingUser?.email}
        sx={{ marginTop: 4 }}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <TextField
        label="Name"
        value={newName ? newName : editingUser?.name}
        sx={{ marginTop: 4 }}
        onChange={(e) => setNewName(e.target.value)}
      />
      <TextField
        label="Address"
        value={newAddress ? newAddress : editingUser?.address}
        sx={{ marginTop: 4 }}
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <TextField
        label="Telephone"
        value={newTelephone ? newTelephone : editingUser?.telephone}
        sx={{ marginTop: 4 }}
        onChange={(e) => setNewTelephone(e.target.value)}
      />
      <Button onClick={handleSave} variant="contained" sx={{ m: 2 }}>
        Save
      </Button>
    </Box>
  );
  const handleAddNewUser = async () => {
    if (username && email && password) {
      await axios
        .post(URL + "/user", {
          username,
          email,
          password,
          address,
          name,
          telephone,
          isJuniorAdmin,
        })
        .then(() => {
          setNewUserModal(false);
          setTimeout(() => {
            (window as Window).location.reload();
          }, 1000);
        });
    }
  };
  const modalBodyAddNewUser = (
    <Box
      sx={{
        position: "absolute",
        width: 400,
        bgcolor: "#fff",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "20px",
      }}
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        sx={{ marginTop: 4 }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Address"
        value={address}
        sx={{ marginTop: 4 }}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        label="Name"
        value={name}
        sx={{ marginTop: 4 }}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Telephone"
        value={telephone}
        sx={{ marginTop: 4 }}
        onChange={(e) => setTelephone(e.target.value)}
      />
      <TextField
        label="Password"
        value={password}
        sx={{ marginTop: 4 }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <span>Make junior admin</span>
        <Switch
          checked={isJuniorAdmin}
          onChange={(e) => setIsJuniorAdmin(e.target.checked)}
          id="juniorAdmin"
        />
      </div>
      <Button onClick={handleAddNewUser} variant="contained" sx={{ m: 2 }}>
        Create
      </Button>
    </Box>
  );

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Manage Users</span>
          <span onClick={() => setNewUserModal(true)}>
            <AddCircleIcon
              sx={{ color: "#fff", marginLeft: 4, cursor: "pointer" }}
            />
          </span>
        </h1>

        <div
          style={{
            height: 400,
            width: "90%",
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            hideFooterPagination
            sx={{
              color: "#fff",
            }}
          />
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalBody}
      </Modal>
      <Modal
        open={newUserModal}
        onClose={() => setNewUserModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalBodyAddNewUser}
      </Modal>
    </AdminLayout>
  );
};

export default AdminHome;
