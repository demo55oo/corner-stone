import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  TableHead,
} from "@mui/material";
import AdminLayout from "../Layout";
import ConfirmationModal from "../../../common/confirmation/ConfirmationModal";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState<any>("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [openSubcategories, setOpenSubcategories] = useState<any>(false);
  const [deleteCategoryConfirmation, setDeleteCategoryConfirmation] =
    useState<boolean>(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null | any>(
    null
  );

  const fetchCategories = async () => {
    const response = await axios.get(URL + "/categories");
    const sortedCategories = response?.data?.data.sort(
      (a: any, b: any) => a.order - b.order
    );
    setCategories(sortedCategories);
  };
  const handleOpen = (category = null, isSub = false, parentId = "") => {
    setCurrentCategory(category);
    setIsSubCategory(isSub);
    setParentCategoryId(parentId);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentCategory(null);
    setIsSubCategory(false);
    setOpen(false);
  };

  const handleOpenSubcategories = async (category: any) => {
    const response = await axios.get(URL + "/category/" + category.id);
    setSelectedCategory(response?.data?.data);
    setOpenSubcategories(true);
  };

  const handleCloseSubcategories = () => {
    setSelectedCategory(null);
    setOpenSubcategories(false);
  };

  const deleteCategory = async () => {
    await axios.delete(URL + "/category/" + deleteCategoryId).then(() => {
      fetchCategories();
      setDeleteCategoryConfirmation(false);
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const category: any = {
      name: event.target.name.value,
      order: parseInt(event.target.order.value), // added order field
    };

    if (currentCategory) {
      await axios.put(URL + `/category/${currentCategory?.id}`, category);
    } else if (isSubCategory) {
      category.categoryId = parentCategoryId;
      await axios.post(URL + "/subcategory", category);
    } else {
      await axios.post(URL + "/category", category);
    }

    handleClose();
    fetchCategories();
  };
  React.useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <AdminLayout>
      <ConfirmationModal
        open={deleteCategoryConfirmation}
        title="Delete Category?"
        description="Are you sure you want to delete the category?"
        onAgree={deleteCategory}
        onClose={() => {
          setDeleteCategoryConfirmation(false);
          setDeleteCategoryId(null);
        }}
      />
      <div>
        <h1 style={{ color: "#fff" }}>Manage Categories</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            margin: "10px 0px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Add Category
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category: any) => (
                <TableRow key={category.id}>
                  <TableCell component="th" scope="row">
                    {category.order}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      onClick={() => handleOpen(category, false)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setDeleteCategoryConfirmation(true);
                        setDeleteCategoryId(category.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => handleOpen(null, true, category.id)}
                    >
                      Add Subcategory
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => handleOpenSubcategories(category)}
                    >
                      View Subcategories
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {currentCategory ? "Edit" : "Add"}{" "}
            {isSubCategory ? "Subcategory" : "Category"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogContentText>Order</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="order"
                type="number"
                fullWidth
                defaultValue={currentCategory ? currentCategory.order : 0}
              />

              <DialogContentText>
                {isSubCategory ? "Subcategory" : "Category"} Name
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                defaultValue={currentCategory ? currentCategory.name : ""}
              />

              <Button type="submit" color="primary">
                {currentCategory ? "Update" : "Save"}
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openSubcategories} onClose={handleCloseSubcategories}>
          <DialogTitle>Subcategories</DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            {selectedCategory &&
              selectedCategory.subCategoriesRelation.map((subcategory: any) => (
                <div
                  key={subcategory.id}
                  style={{
                    background: "#f3f3f3",
                    padding: "6px",
                    borderRadius: "8px",
                    margin: "4px 0px",
                  }}
                >
                  <h4>{subcategory.name}</h4>
                </div>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSubcategories} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ManageCategories;
