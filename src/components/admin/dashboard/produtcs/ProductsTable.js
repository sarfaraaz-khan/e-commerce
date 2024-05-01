import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productTable.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
function ProductsTable() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [addItem, setAdItem] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get("http://localhost:3000/product");
    const data = await response.data;
    setData(data);
  };
  const addProduct = async () => {
    const response = await axios.post("http://localhost:3000/product", addItem);
    const data = await response.data;
  };
  const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:3000/product/${id}`);
    getData();
  };
  const editItem = async (item) => {
    setAdItem((prevItem) => ({
      ...prevItem,
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      rating: item.rating,
    }));

    const response = await axios.put(
      `http://localhost:3000/product/${item.id}`,
      addItem
    );
    deleteProduct(item.id);
    getData();
    setOpen(true);
  };

  const handleOpen = (item) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    let { value, name } = e.target;
    setAdItem((pre) => ({ ...pre, [name]: value }));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div className="productListTable">
        <h2>Product list</h2>
        <button id="addProduct" onClick={handleOpen}>
          Add new Product
        </button>
      </div>

      <table>
        <tr>
          <th>Id</th>
          <th>Products</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>

        {data?.map((item) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td id="proTd">
                <img src={item.image} />
                {item.title}
              </td>
              <td>$ {item.price}</td>
              <td id="quantityItem">{item.rating}</td>
              <td>
                <EditIcon
                  id="edit"
                  onClick={() => {
                    editItem(item);
                  }}
                />
              </td>
              <td>
                <DeleteForeverIcon
                  id="delete"
                  onClick={() => deleteProduct(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add A Product
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form className="addProductForm" onSubmit={addProduct}>
                <div>
                  <label for="id">Enter Product id</label>
                  <input
                    type="text"
                    placeholder="product id"
                    name="id"
                    onChange={handleChange}
                    value={addItem.id}
                  />
                </div>
                <div>
                  {" "}
                  <label for="title">Enter Product title</label>
                  <input
                    type="text"
                    placeholder="product title"
                    name="title"
                    onChange={handleChange}
                    value={addItem.title}
                  />
                </div>
                <div>
                  <label for="price">Enter Product price</label>
                  <input
                    type="text"
                    placeholder="product price"
                    name="price"
                    onChange={handleChange}
                    value={addItem.price}
                  />
                </div>
                <div>
                  {" "}
                  <label for="description">Enter Product description</label>
                  <input
                    type="text"
                    placeholder="product description"
                    name="description"
                    onChange={handleChange}
                    value={addItem.description}
                  />
                </div>
                <div>
                  {" "}
                  <label for="category">Enter Product category</label>
                  <input
                    type="text"
                    placeholder="product category"
                    name="category"
                    onChange={handleChange}
                    value={addItem.category}
                  />
                </div>
                <div>
                  <label for="image">Enter Product image Url</label>
                  <input
                    type="text"
                    placeholder="product image URL"
                    name="image"
                    onChange={handleChange}
                    value={addItem.image}
                  />
                </div>
                <div>
                  {" "}
                  <label for="rating">Enter Product rating</label>
                  <input
                    type="text"
                    placeholder="product rating"
                    name="rating"
                    onChange={handleChange}
                    value={addItem.rating}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ProductsTable;
