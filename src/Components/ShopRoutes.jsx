import React from 'react'
import AppDrawer from './AppDrawer'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct'
import Orders from './Orders'
import Products from './Products'
import ReviewRating from './ReviewRating'
import Dashboard from './Dashboard'
import OrderDetails from './OrderDetails'

const ShopRoutes = () => {
  return (
    <>
      <AppDrawer />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product' element={<Products />} />
        <Route path='/reviews' element={<ReviewRating />} />
       <Route path='/ordetails' element={<OrderDetails/>}/>
      </Routes>
    </>
  )
}

export default ShopRoutes