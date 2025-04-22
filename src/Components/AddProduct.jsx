import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const AddProduct = () => {

  const [selectImage, setselectImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let reqData = Object.fromEntries(formData.entries())
    console.log("request : ", reqData);

    let result = await axios.post("http://localhost:5000/api/createproduct", {...reqData,prodimage:selectImage},
      {headers:{
        "Content-Type" : "multipart/form-data"
      }
      //for frontend image/video.. uplaod use headers
      }
    )
    console.log(result.data);
    alert(result.data.message)
  }
  return (
    <>
      <Box component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 ,m:5}}
      >
        <TextField
          label="Title"
          name='title'
          required
        />
        <TextField
          label="Description"
          name='description'
          required
        />
        <TextField
        label="Select Product Image"
        name='prodimage'
        type='file'
        onChange={(e)=>setselectImage(e.target.files[0])}
        />
        <FormControl required>
          <InputLabel>Category</InputLabel>
          <Select
            label='Category'
            name='category'
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Home and Kitchen">Home and Kitchen</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Price"
          name='price'
          required
        />
        <TextField
          label="Discount Percentage"
          name='discountPercentage'
          required
        />
        <Button variant='contained' type='submit'>
          Create Product
        </Button>
      </Box>
    </>
  )
}

export default AddProduct