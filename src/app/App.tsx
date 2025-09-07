import "./App.css";
import {AppRouter} from "./Router.tsx";
import SideBar from "../features/side-bar/components/SideBar.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function App() {

  return (
      <div>
        <Header />
        <div>
          <SideBar />
          <AppRouter />
        </div>
        <Footer />
      </div>
  );
}

export default App;
