import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setproducts] = useState([])
  const [openDialog, setopenDialog] = useState(false)
  const [newprice, setnewprice] = useState(0)
  //usestate for delete product
  const [selectedProd, setselectedProd] = useState({})

  let openUpdateDialog = (prod)=>{
    setopenDialog(true)
    setselectedProd(prod)
  }
  
  let closeUpdateDialog = ()=>{
    setopenDialog(false)
    setselectedProd(null)
  }
  //fetchproduct
  useEffect(() => {
    async function fetchproducts() {
      let result = await axios.get("http://localhost:5000/api/fetchproduct")
      setproducts(result.data)
    }
    fetchproducts()
  }, [])
  
  //delete product
  let deleteproductRequest = async (pId) => {
    try {
      let result = await axios.delete("http://localhost:5000/api/deleteproduct",
        { data: { prodId: pId } })

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  //update product price
  let updateProdPrice = async () => {
    try {
      let result = await axios.put("http://localhost:5000/api/updateproduct",
        {
          price: newprice,
          prodId: selectedProd._id
        })
      console.log(result.data);
      closeUpdateDialog()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box>
        <Grid container spacing={3} padding={2}>
          {
            products.map((prod) => {
              return (
                <Grid size={{
                  sm: 12,
                  md: 6,
                  lg: 4
                }} item key={prod._id}>
                  <Card sx={{maxWidth:'100%'}}>
                    <CardMedia
                      component="img" sx={{height: 190,objectFit:'contain',width:'100%'}} 
                      image={`http://localhost:5000/${prod.prodimage?.replace("\\","/")}`}
                    />
                    <CardContent>
                      <Typography variant='h5' >Title:{prod.title}</Typography>
                      {/* <Typography variant='h5'>Description:{prod.description}</Typography> */}
                      <Typography variant='h5'>Category:{prod.category}</Typography>
                      <Typography variant='h5' color={prod.price > 15 ? "error" : "primary"}>Price:{prod.price}</Typography>

                    </CardContent>
                    <CardActions>
                      <Button color='error' variant='contained' onClick={() => {
                        deleteproductRequest(prod._id)
                      }}>Delete</Button>
                      <Button color='primary' variant='contained' onClick={() => {
                       openUpdateDialog(prod)
                      }}>Update</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
        <Dialog open={openDialog} onClose={closeUpdateDialog}>
          <DialogTitle>Update Price</DialogTitle>
          <DialogContent>
            <TextField onChange={(e)=>setnewprice(e.target.value)} label="Enter updated price"/>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='primary' onClick={()=>updateProdPrice()}>Submit</Button>
            <Button variant='contained' color='error' onClick={()=>closeUpdateDialog()}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}

export default Products