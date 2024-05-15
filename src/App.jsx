import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataDisplay from "./pages/DataDisplay";
import SearchBar from "./pages/SearchBar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/results" element={<DataDisplay />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
