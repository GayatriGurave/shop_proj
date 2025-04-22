import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import ListIcon from '@mui/icons-material/List';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useNavigate } from 'react-router-dom';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CategoryIcon from '@mui/icons-material/Category';
import DetailsIcon from '@mui/icons-material/Details';
const AppDrawer = () => {
  const [isDtawerOpen, setisDtawerOpen] = useState(false)

  let navigator = useNavigate()

  let handleDrawerOpen = () => {
    setisDtawerOpen(true)
  }


  let handleDrawerClose = () => {
    setisDtawerOpen(false)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={() => { handleDrawerOpen() }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ListIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Shop Admin
            </Typography>
            <Button color="inherit">Settings</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor='left' open={isDtawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem onClick={() => {
            navigator("/")
            handleDrawerClose()
          }}>
            <ListItemIcon>
              <SpaceDashboardIcon />
            </ListItemIcon>
            <ListItemText>
              Dashboard
            </ListItemText>
          </ListItem>

          <ListItem onClick={() => {
            navigator("/addproduct")
            handleDrawerClose()
          }}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>
              Add Products
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {
            navigator("/orders")
            handleDrawerClose()
          }}>
            <ListItemIcon>
             
              <DeliveryDiningIcon/>
            </ListItemIcon>
            <ListItemText>
              Orders
            </ListItemText>
          </ListItem>
          <Divider />

          <ListItem onClick={() => {
            navigator("/product")
            handleDrawerClose()
          }}>
            <ListItemIcon>
             
              <CategoryIcon/>
            </ListItemIcon>
            <ListItemText>
              AllProducts
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {
            navigator("/reviews")
            handleDrawerClose()
          }}>
            <ListItemIcon>
              <ReviewsIcon />
            </ListItemIcon>
            <ListItemText>
              Reviews
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {
            navigator("/ordetails")
            handleDrawerClose()
          }}>
            <ListItemIcon>
              <DetailsIcon />
            </ListItemIcon>
            <ListItemText>
              OrderDetails
            </ListItemText>
          </ListItem>
         
          
        </List>
      </Drawer>
    </>

  )
}

export default AppDrawer