import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
let navigator = useNavigate()
  const [allOrders, setallOrders] = useState([])
  useEffect(()=>{
    let fetchOrders = async ()=>{
      let result = await axios.get("http://localhost:5000/api/fetchorder")
      console.log("Data",result);
      setallOrders(result.data)
    }
    fetchOrders()
  },[])
  
  return (
    <>
    <Box>
        <Grid container spacing={3} padding={2}>
          {
            allOrders.map((ord) => {
              return (
                <Grid size={{
                  sm: 12,
                  md: 6,
                  lg: 4
                }} item key={ord._id}>
                  <Card>
                    <CardMedia
                      sx={{ height: 190 }}
                      
                    />
                    <CardContent>
                    
                      <Typography variant='h5'>{ord.orderDate}</Typography>
                      <Typography variant='h5'>{ord.orderStatus}</Typography>
                      <Typography variant='h5' >{ord.orderTotalAmount}</Typography>
                     
                    </CardContent>
                    <CardActions>
                      <Button color='error' variant='contained' onClick={() => 
                        navigator("/ordetails",{state:ord})}>Details</Button>
                      
                    </CardActions>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
        {/* <Dialog open={openDialog} onClose={closeUpdateDialog}>
          <DialogTitle>Update Price</DialogTitle>
          <DialogContent>
            <TextField onChange={(e)=>setnewprice(e.target.value)} label="Enter updated price"/>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='primary' onClick={()=>updateProdPrice()}>Submit</Button>
            <Button variant='contained' color='error' onClick={()=>closeUpdateDialog()}>Close</Button>
          </DialogActions>
        </Dialog> */}
      </Box>
    </>
  )}


export default Orders