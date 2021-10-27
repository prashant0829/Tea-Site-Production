import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthContextProvider from "./context/ContextApi";
import AdminDashboard from "./pages/AdminDashboard";
import { SnackbarProvider } from "notistack";
import RouterComponent from "./RouterComponent";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <AuthContextProvider>
          <RouterComponent />
        </AuthContextProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
