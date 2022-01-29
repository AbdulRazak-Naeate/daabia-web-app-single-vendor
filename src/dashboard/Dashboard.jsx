import { useState,useEffect } from "react";
import React from 'react';
import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import Confirm from "./components/email/Confirm"
import "./dashboard.css"
import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Store from "./pages/store/Store"
import StoreList from "./pages/storeList/StoreList";
import NewStore from "./pages/newStore/NewStore";
import ProductsList from "./pages/productlist/ProductsList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Transactions from "./pages/transactions/Transactions";
import Sales from './pages/sales/Sales';
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import axios from 'axios';

 function  Dashboard() {
 const [showSidebar,setShowSideBar]=useState(true);
 const [stores, setStores] = useState([]);
 const [products,setProducts]=useState([]);
 const [transactions,setTransactions]=useState([]);

 const handletoggleSideBar=(bol)=>{
   setShowSideBar(bol);
 }
  const toggleSideBar=()=>{
    setShowSideBar(!showSidebar);
  }
  const paths =[ 
    '/dashboard',
    '/dashboard/users',
    '/dashboard/user/:userId',
    '/dashboard/newUser/',
    '/dashboard/store',
    '/dashboard/stores',
    '/dashboard/store/:storeId',
    '/dashboard/newStore/',
    '/dashboard/products',
    '/dashboard/product',
    '/dashboard/newProduct',
    '/dashboard/transactions',
    '/dashboard/sales',]

    async function deleteStore(_id) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/stores/${_id}`);
        console.log(response);
        if (response.data.deletedCount>=1){
        setStores(stores.filter((item) => item._id !==_id))

        }
      } catch (error) {
        console.error(error);
      }
    }
    async function handleDeleteProduct(_id) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/products/${_id}`);
        console.log(response);
        if (response.data.deletedCount>=1){
        setProducts(products.filter((item) => item._id !==_id))

        }
      } catch (error) {
        console.error(error);
      }
    }

   
    const fetchProducts = async (storeid)=>{
      try{
         const res = await fetch(`http://localhost:3001/api/products/store/${storeid}`);
         const data=await res.json();
               console.log(data);
               return data.products;
      }catch(error){

      }
}
const handlegetProducts = async(storeid) => {
    try{
       const productsFromServer = await fetchProducts(storeid);
       let tmp =[];
          for(let i=0;i<productsFromServer.length;i++){
            tmp.push(productsFromServer[i]);
            
          }
       setProducts(tmp);
       console.log(tmp);
    }catch(error){

    }
}

const fetchStores = async(user)=>{
  try{
     const res = await fetch(`http://localhost:3001/api/stores/user/${user._id}`);

     const data= await res.json();
           console.log(data);
           return data.store;
  }catch(error){

  }
}
const handlegetStores = async(user) => {
try{
   const productsFromServer = await fetchStores(user);
   let tmp =[];
      for(let i=0;i<productsFromServer.length;i++){
        tmp.push(productsFromServer[i]);
        
      }
   setStores(tmp);

   console.log(tmp);
}catch(error){

}
}
  
 
  return (
    <Router>
    <Route exact path={paths}>
         <Topbar/>
         </Route>
     <div className="content">

    <div>
       {showSidebar &&
       <Route exact path={paths}> <Sidebar/></Route>
        } 
    </div>
   
      <Route exact path={paths}>
        <div className="toggleSidebarButton" onClick={toggleSideBar}></div>
      </Route>
     
    
     <Switch>
     <Route exact  path="/dashboard">
         <Home stores={stores} handlegetStores={handlegetStores} handlegetProducts={handlegetProducts}/>
       </Route>
       <Route path="/dashboard/users">
        <UserList/>
       </Route>
       <Route path="/dashboard/user/:userId">
        <User/>
       </Route>
       <Route path="/dashboard/newUser/">
        <NewUser/>
       </Route>
       <Route path="/dashboard/store">
         <Store/>
         </Route>

       <Route path="/dashboard/stores">
        <StoreList  stores={stores} handlegetStores={handlegetStores}  onDeleteStore={deleteStore}/>
       </Route>
       <Route path="/dashboard/store/:storeId">
       
       </Route>

       <Route path="/dashboard/newStore/">
        <NewStore/>
       </Route>

       <Route path="/dashboard/products">
        <ProductsList products={products} handlegetProducts={handlegetProducts} handleDeleteProduct={handleDeleteProduct}/>
       </Route>
       <Route path="/dashboard/product">
        <Product/>
       </Route>

       <Route path="/dashboard/newProduct">
        <NewProduct/>
       </Route>

       <Route path="/dashboard/transactions">
        <Transactions/>
       </Route>
       <Route path="/dashboard/sales">
        <Sales stores={stores} />
       </Route>
       <Route path="/dashboard/login" >
         <LogIn toggleSideBar={handletoggleSideBar}/>
       </Route>
       <Route path="/dashboard/signup">
         <SignUp  toggleSideBar={handletoggleSideBar} />
       </Route>
       <Route path="/dashboard/email/confirm">
         <Confirm/>
       </Route>
     </Switch>
    
    </div>
    </Router>
  )
}

export default Dashboard