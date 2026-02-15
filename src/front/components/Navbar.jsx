import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Navbar = () => {

	const {store, dispatch} = useGlobalReducer()

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	useEffect(() => {
		if (store.user?.username) {
			setIsLoggedIn(true);
		} else{
			setIsLoggedIn(false);
		}

	});


	

	const buttonTo = isLoggedIn ? "/private" : "/registro";

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">Atras</span>
				</Link>

				<div className="ms-auto d-flex gap-2">
				    <Link to={buttonTo}>
						<button className="btn btn-primary">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};