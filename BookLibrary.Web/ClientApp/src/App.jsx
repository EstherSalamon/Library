import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import UsersPage from './Pages/UsersPage';
import AllBooks from './Pages/AllBooks';
import SpecificBook from './Pages/SpecificBook';
import AddBook from './Pages/AddBook';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/books' element={<AllBooks />} />
                <Route path='/book/:id' element={<SpecificBook />} />
                <Route path='/addbook' element={<AddBook />} />
            </Routes>
        </Layout>
    );
}

export default App;