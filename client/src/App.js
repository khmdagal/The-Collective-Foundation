import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

const App = () => (
	<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/this/site" element={<About />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
    </Routes>
);

export default App;
