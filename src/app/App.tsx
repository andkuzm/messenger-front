import "./App.css";
import {AppRouter} from "./Router.tsx";
import SideBar from "../features/side-bar/components/SideBar.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function App() {

  return (
      <div className={"grid grid-rows-12 h-screen w-11/12 pl-5"}>
          <Header/>
          <div className="row-span-10 grid grid-cols-3">
              <SideBar/>
              <AppRouter/>
          </div>
          <Footer/>
      </div>
  );
}

export default App;
