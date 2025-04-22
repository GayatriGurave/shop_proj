import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const OrderDetails = () => {
    let orderData = useLocation().state
    console.log(orderData);
    return (
        <>
            <Typography variant='h5'>Details</Typography>
            <Grid container spacing={3} padding={2}>
                {
                    orderData.orderItems.map((ord) => {
                        return (
                            <Grid size={{
                                lg: 3
                            }} item key={ord.prodId}>
                                <Card>
                                    <CardContent>
                                        <Typography>ProductTitle:{ord.prodId?.title}</Typography>
                                        <Typography>ProductDesc:{ord.prodId?.description}</Typography>
                                        <Typography>ProductQty:{ord.qty}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}



export default OrderDetails