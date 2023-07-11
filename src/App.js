import Login from './components/login/login.js'
import Admin from './components/admin/admin.js'
import User from './components/user/user.js'
import styles from './App.module.css'
import Header from './components/layout/header.js'
import Sidebar from './components/layout/sidebar.js'
import Detail from './components/detail/detail.js'
import Store from './components/store/store.js'
import Home from './components/home/home.js'
import DetailBorrowAdmin from './components/detailBorrowADMIN/detailBorrow.js'
import BorrowUser from './components/detailBorrowUser/borrowUser.js'
import UpdateBook from './components/detailBorrowADMIN/update.js'
import Giveback from './components/givebackbook/giveback.js'
import GivebackAdmin from './components/givebackbook/givebackadmin.js'
import StoreUpdate from './components/store/updatestore.js'
import AddBook from './components/store/addbook.js'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {

  return (

    <BrowserRouter>

      <Routes>
        {/* CÓ CÁCH KHÁC LÀ IMPORT HẾT ROUTE VÀO 1 FILE VÀ RETURN VỀ MẢNG RỒI LẶP HOẶC ÍT ROUTE THÌ LÀM NHƯ DƯỚI */}
        <Route path='/' element={<Login />}></Route>
        <Route path={'/Home'} element={
          <div>
            <Header />
            <div className={styles.divBody}>
              <Sidebar />
              <Home />
            </div>
          </div>
        }></Route>
        <Route path='/Admin' element={<User />}></Route>
        <Route path='/Detail/:idBook' element={
          <div>
            <Header />
            <div className={styles.divBody}>
              <Detail />
            </div>
          </div>
        }>
        </Route>
        <Route path={`/store`} element={
          <div>
            <Header />
            <div className={styles.divBody}>
              <Sidebar />
              <Store />
            </div>
          </div>
        }></Route>
        {/* <Route element={<Navigate  to='/User' />} ></Route> */}
        <Route path={'/DetailBorrow'} element={
          <div>
            <Header />
            <div className={styles.divBody}>
              <Sidebar />
              <DetailBorrowAdmin />
            </div>
          </div>
        }></Route>

        <Route path={'/borrowUser'} element={
          <div>
            <Header />
            <div className={styles.divBody}>
              <Sidebar />
              <BorrowUser />
            </div>
          </div>
        }></Route>
        <Route path={'/Updatebook'} element = {
          <div>
            <Header/>
            <UpdateBook/>
          </div>
        }>
            
        </Route>
        <Route path={'/Giveback'} element = {
          <div>
            <Header/>
            <div className={styles.divBody}>
              <Sidebar/>
              <Giveback/>
            </div>
          </div>
        }>
        </Route>
        
        <Route path={'/GivebackAdmin'} element = {
          <div>
            <Header/>
            <div className={styles.divBody}>
              <Sidebar/>
              <GivebackAdmin/>
            </div>
          </div>
        }>
        </Route>
        <Route path={'/StoreUpdate'} element = {
          <div>
            <Header/>
              <StoreUpdate/>
          </div>
        }>
        </Route>
        <Route path={'/AddBook'} element = {
          <div>
            <Header/>
              <AddBook/>
          </div>
        }>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
