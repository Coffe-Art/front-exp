import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { SignIn } from './components/SignIn';
import { Menu } from './components/Layouts/Menu';
import { ProductFav } from './components/Layouts/ProductFav';
import { Help } from './components/Layouts/Help';
import { CraftforAdmins } from './components/Layouts/CraftforAdmins';
import { Cart } from './components/Layouts/Cart';
import { History } from './components/Layouts/History';
import { LoginCompanies } from './components/Layouts/LoginCompanies';
import { CreateProduct } from './components/Layouts/CreateProduct';
import { Statistics } from './components/Layouts/Statistics';
import { EmpresaProvider } from './Context/contextEmpresa';
import { EventsForm } from './components/Layouts/EventsForm';
import { UpdateCompany } from './components/Layouts/UpdateCompany';
import { UpdateProducto } from './components/Layouts/UpdateProducto';
import { TermsAndConditions } from './components/Layouts/TermsAndConditions';
import { SalesOverview } from './components/Layouts/SalesOverview';
import { CreateStory } from './components/Layouts/CreateHistory';
import { Address } from './components/Layouts/Address';
import { CraftComprador } from './components/Layouts/CraftComprador';
import { CompaniesComprador } from './components/Layouts/CompaniesComprador';
import { CompaniesForAdmin } from './components/Layouts/CompaniesForAdmin';
import { EventsComprador } from './components/Layouts/EventsComprador';
import { EventsForAdmin } from './components/Layouts/EventsForAdmin';
import { ProfileAnon } from './components/Layouts/ProfileAnon';
import { ProfileComprador } from './components/Layouts/ProfileComprador';
import { ProfileForAdmin } from './components/Layouts/ProfileForAdmin';
import ProtectedRoute from './components/Layouts/Proteccion de Rutas/ProtectedRoute';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <EmpresaProvider>
        <Routes>
          {/* Rutas para comunes (cualquiera puede visualizarlas) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/ProductFav" element={<ProductFav />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/History" element={<History />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/Statistics" element={<Statistics />} />

          {/* Rutas exclusivas para anonimo */}
          <Route path="/ProfileAnon" element={<ProfileAnon />} />

          {/* Rutas exclusivas para Comprador */}
          <Route path="/ProfileComprador" element={<ProtectedRoute element={ProfileComprador} allowedRoles={['comprador']} />} />
          <Route path="/Cart" element={<ProtectedRoute element={() => <Cart cart={cart} setCart={setCart} />} allowedRoles={['comprador', 'anonimo']} />} />
          <Route path="/CraftComprador" element={<ProtectedRoute element={CraftComprador} allowedRoles={['comprador']} />} />
          <Route path="/CompaniesComprador" element={<ProtectedRoute element={CompaniesComprador} allowedRoles={['comprador']} />} />
          <Route path="/EventsComprador" element={<ProtectedRoute element={EventsComprador} allowedRoles={['comprador']} />} />

          {/* Rutas para Administradores y empleados */}
          <Route path="/ProfileForAdmin" element={<ProtectedRoute element={ProfileForAdmin} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/CompaniesForAdmin" element={<ProtectedRoute element={CompaniesForAdmin} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/CraftforAdmins" element={<ProtectedRoute element={CraftforAdmins} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/CreateStory" element={<ProtectedRoute element={CreateStory} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/CreateProduct" element={<ProtectedRoute element={CreateProduct} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/EventsForAdmin" element={<ProtectedRoute element={EventsForAdmin} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/EventsForm" element={<ProtectedRoute element={EventsForm} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/LoginCompanies" element={<ProtectedRoute element={LoginCompanies} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/SalesOverview" element={<ProtectedRoute element={SalesOverview} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/UpdateCompany/:id" element={<ProtectedRoute element={UpdateCompany} allowedRoles={['administrador', 'empleado']} />} />
          <Route path="/UpdateProduct/:idProducto" element={<ProtectedRoute element={UpdateProducto} allowedRoles={['administrador', 'empleado']} />} />

        </Routes>
      </EmpresaProvider>
    </Router>
  );
}

export default App;
