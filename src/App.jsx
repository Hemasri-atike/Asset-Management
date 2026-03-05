import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/sidebar/Layout";
import Home from "./components/Home";
import Profile from "./components/home/Profile";
import Settings from "./components/home/Settings";
import About from "./components/home/About";
import Careers from "./components/home/Careers";
import Messages from "./components/sidebar/Messages";
import Notifications from "./components/sidebar/Notifications";
import Analytics from "./components/sidebar/Analytics";
import Assets from "./components/assetsmanager/Assets";
import AssetForm from "./components/assetsmanager/AssetForm";
import SendMail from "./components/mail/SendMail";
import EditAsset from "./components/assetsmanager/AssetsEdit";
import AddCustodian from "./components/custodian/AddCustodian";



function App() {
  return (
    <Router>
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/messages" element={<Messages />} />
<Route path="/analytics" element={<Analytics />} />
<Route path="/notifications" element={<Notifications />} />
<Route path="/assets" element={<Assets />} />

<Route path="/assets/add" element={<AssetForm />} />
<Route path="mail" element={<SendMail />} />
<Route path="/assets/edit/:id" element={<EditAsset />} />
<Route path="/custodian/add" element={<AddCustodian />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;