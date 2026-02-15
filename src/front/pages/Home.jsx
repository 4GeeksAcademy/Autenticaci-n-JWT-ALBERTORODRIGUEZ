import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../services/backendServices.js";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	const [user, setUser] = useState({
		email: "",
		password: ""

	})

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}


	const handleSubmit = (e) => {
		e.preventDefault()


		login(user, navigate)
	}

	console.log(user);


	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="container mt-2 mb-2">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="card shadow-lg border-0 rounded-4">
						<div className="card-body p-5">
							<div className="text-center mb-4">
								<i className="fas fa-user-circle fa-4x text-primary mb-3"></i>
							</div>

							
							<h3>Login</h3>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="email" className="form-label" >Email</label>
									<input type="text"
										name="email"
										placeholder="Enter your email"
										className="form-control" value={user.email}
										onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">Password</label>
									<input type="text"
										name="password"
										placeholder="Enter your password"
										className="form-control" value={user.password}
										onChange={handleChange} />
								</div>
								<button type="submit" className="btn btn-primary w-100" >Login</button>
							</form>
							

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 