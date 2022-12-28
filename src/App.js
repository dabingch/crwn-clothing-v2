import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/Home";
import Navbar from "./routes/navigation/Navbar";
import SignIn from "./routes/sign-in/SignIn";

const Shop = () => {
	return (
		<div>
			<h1>This is a shop page</h1>
		</div>
	);
};

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navbar />}>
				<Route index element={<Home />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/sign-in" element={<SignIn />} />
			</Route>
		</Routes>
	);
};

export default App;
