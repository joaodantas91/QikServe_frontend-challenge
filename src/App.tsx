import { Banner } from "./components/Banner";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";

function App () {

  return (
    <>
      <Navbar />
      <Banner />
      <div className="container">
        <SearchBar className="my-2" />
      </div>
    </>
  );
}

export default App
