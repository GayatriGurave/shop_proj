import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Orders = () => {
  const [allorders, setallorders] = useState([])
  const [filterOrders, setfilterOrders] = useState([])  
  const [selectedstatus, setselectedstatus] = useState("All")
  const [newStatus, setnewStatus] = useState("")
  const [openDialog, setopenDialog] = useState(false)
  const [selectedOrder, setselsectedOrder] = useState(null)
  let navigator = useNavigate()
  let openUpdateDialog = (order)=>{
    setopenDialog(true)
    setselsectedOrder(order)
  }
  
  let closeUpdateDialog = ()=>{
    setopenDialog(false)
    setselsectedOrder(null)
  }
  useEffect(()=>{
     const result = allorders.filter(order=>
      selectedstatus === "All" || order.orderStatus === selectedstatus
     )
     setfilterOrders(result)
  },[selectedstatus,allorders])

  useEffect(()=>{
    //define function
    let fetchOrders = async()=>{
      let result = await axios.get("http://localhost:5000/api/fetchorder")
      console.log("Data",result.data);
      setallorders(result.data)
    }
    //call functions
    fetchOrders()
  },[])

   const UpdateOrder = async ()=>{
    try {
      const result = await axios.put("http://localhost:5000/api/updateorder",{
        orderstatus : newStatus,
        OrederId : selectedOrder._id
      })
      console.log(result.data);
      closeUpdateDialog()
    } catch (error) {
      console.log(error);
    }
   }
   //delete order
   const deleteOrder = async (pId)=>{
    try {
      const result = await axios.delete("http://localhost:5000/api/deleteorder",{
        data:{OrderId:pId}
      })
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
   }
    // let navigate = useNavigate()
  return (
    <>
      
    <Stack direction="row" spacing={2} margin={1}>
    <Chip label="All" onClick={()=>setselectedstatus("All")} color='primary' variant='filled'/>
    <Chip label="Pending" onClick={()=>setselectedstatus("pending")} color='primary' variant='filled'/>
    <Chip label="Delivered" onClick={()=>setselectedstatus("delivered")} color='primary' variant='filled'/>
    <Chip label="Processing" onClick={()=>setselectedstatus("processing")} color='primary' variant='filled'/>
    <Chip label="Shipped" onClick={()=>setselectedstatus("shipped")} color='primary' variant='filled'/>
    <Chip label="Cancelled" onClick={()=>setselectedstatus("cancelled")} color='primary' variant='filled'/>
    </Stack>
     <Box>

     <Grid container spacing={3} padding={2}>
          {
            filterOrders.map((order) => {
              return (
                <Grid size={{
                  sm: 12,
                  md: 6,
                  lg: 4
                }} item key={order._id}>
                  <Card>
                    <CardMedia
                      sx={{ height: 190 }}
                      
                    />
                    <CardContent>
                    
                      <Typography variant='h5' gutterBottom><strong>Order Date:</strong>{new Date(order.orderDate).toLocaleString()}</Typography>
                      <Typography variant='h5'><strong>Order Status:</strong>{order.orderStatus}</Typography>
                      <Typography variant='h5' ><strong>Total Amount:</strong>{order.orderTotalAmount}</Typography>
                      <Typography variant='h5'><strong>User Id:</strong>{order.userId?._id}</Typography> 
                    </CardContent>
                    <CardActions>
                      <Button color='error' variant='contained' onClick={() => 
                                      navigator("/ordetails",{state:order})}>Details</Button>
                      <Button onClick={()=>openUpdateDialog(order)}
                       variant='contained' color='error'>Update Order</Button>
                       <Button onClick={()=>deleteOrder(order._id)} 
                       variant='contained' color='error'>Delete Order</Button>
                    </CardActions>
                  </Card>
                </Grid>
            )
            })
          }
        </Grid>
        {/* update price dialog */}
        <Dialog open={openDialog} onClose={closeUpdateDialog}>
         <DialogTitle>
          Update Price
         </DialogTitle>
         <DialogContent>
          <FormControl>
            <FormLabel>Order Status</FormLabel>
            <RadioGroup row 
            defaultValue="pending"
            name='orderStatus'
            onChange={(e)=>setnewStatus(e.target.value)}
            >
           <FormControlLabel value='delivered' control={<Radio/>} label='delivered'/>
           <FormControlLabel value='shipped' control={<Radio/>} label='shipped'/>
           <FormControlLabel value='processing' control={<Radio/>} label='processing'/>
           <FormControlLabel value='cancelled' control={<Radio/>} label='cancelled'/>
            </RadioGroup>
          </FormControl>
         </DialogContent>
         <DialogActions>
          <Button onClick={UpdateOrder} variant='contained' color='primary' type='submit'>Submit</Button>
          <Button onClick={()=>closeUpdateDialog()} variant='contained' color='error'>Close</Button>
         </DialogActions>
        </Dialog>

     </Box>
    </>
  )
}

export default Orders