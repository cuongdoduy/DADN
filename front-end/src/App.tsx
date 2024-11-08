import { Routes, Route, Link } from "react-router-dom";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import { Button } from "@material-tailwind/react";

const App = () => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="container mx-auto p-2">
          <Link to="/">
            <Button className="bg-primary">Button</Button>;
          </Link>
        </div>
      </nav>

      <div className="container mx-auto p-2 h-full">
        <Routes>
          <Route index element={<PageA />}></Route>
          <Route path="/create" element={<PageB />}></Route>
          <Route path="/edit/:id" element={<PageA />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
