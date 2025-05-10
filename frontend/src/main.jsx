
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Home from './home/home.jsx'
import Admin from './admin.jsx'
import Ahome from './ahome.jsx'
import Watch from './watch.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './notfound.jsx'
import Category from './category.jsx'
import { AuthProvider } from "./customHooks/loginOpen.jsx";
import Community from './community/community.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <BrowserRouter>
	    <Routes>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="name/:id" element={<Ahome />} />
        <Route path="watch/:id/:ep" element={<Watch />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="community" element={<Community/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>

)
