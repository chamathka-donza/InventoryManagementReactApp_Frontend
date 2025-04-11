import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import MainPage from './components/MainPage';
import AddProduct from './components/AddProduct'; // Your Add New Product page
import AddBrand from "./components/AddBrand";
import ViewBrands from "./components/ViewBrands";
import Layout from './components/Layout';
import AddLocation from './components/AddLocation';
import ViewLocations from './components/ViewLocations';
import AddVendor from './components/AddVendor';
import ViewVendors from './components/ViewVendors';
import Footer from "./components/Footer"
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router> {/* Wrap the entire app with Router */}
      <Layout>
      </Layout>
      <Routes> {/* Define routes for different pages */}
          <Route path="/" element={<MainPage />} /> {/* Main page */}
          <Route path="/add-product" element={<AddProduct />} /> {/* Add new product page */}
          <Route path="/add-brand" element={<AddBrand />} />
          <Route path="/view-brands" element={<ViewBrands />} />
          <Route path="/add-location" element={<AddLocation />} />
          <Route path="/view-locations" element={<ViewLocations />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-vendor" element={<AddVendor />} />
          <Route path="/view-vendors" element={<ViewVendors />} />
          {/* Add other routes here */}
        </Routes>
        <Footer>
        </Footer>
    </Router>
  );
}

export default App;
