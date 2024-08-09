import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Login } from './components/Login';
import { Register } from './components/Register'; 
import { SignIn } from './components/SignIn'; 
import { Menu } from './components/Layouts/Menu';
import { Profile } from './components/Layouts/Profile';
import { Product } from './components/Layouts/Product';
import { Help } from './components/Layouts/Help';
import { CraftforAdmins } from './components/Layouts/CraftforAdmins';
import { Cart } from './components/Layouts/Cart';
import { Companies } from './components/Layouts/Companies';
import { History } from './components/Layouts/History';
import { LoginCompanies } from './components/Layouts/LoginCompanies';
import { Events } from './components/Layouts/Events';
import { CreateProduct } from './components/Layouts/CreateProduct';
import { ProductDetail } from './components/Layouts/ProductDetail';
import { Statistics } from './components/Layouts/Statistics';
import { EmpresaProvider } from './Context/contextEmpresa';
import { EventsForm } from './components/Layouts/EventsForm';
import { UpdateCompany } from './components/Layouts/UpdateCompanies';


function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <EmpresaProvider> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/CraftforAdmins" element={<CraftforAdmins cart={cart} setCart={setCart} />} />
          <Route path="/Cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/History" element={<History />} />
          <Route path="/Companies" element={<Companies />} />
          <Route path="/LoginCompanies" element={<LoginCompanies />} />
          <Route path="/UpdateCompany/:id" element={<UpdateCompany />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/EventsForm" element={<EventsForm />} />
        </Routes>
      </EmpresaProvider>
    </Router>
  );
}

export default App;



