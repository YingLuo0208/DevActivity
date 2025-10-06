import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyPage from  "./pages/PropertyPage"
import EditPropertyPage from "./pages/EditPropertyPage"
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties/add-property" element={<AddPropertyPage />} />
              <Route path="/properties/:id" element={<PropertyPage />} />
              <Route path="/properties/:id/edit" element={<EditPropertyPage />} />             
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
