import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../services/backendServices";


export const Registro = () => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser(user, navigate);
    }




    return (
        <div className="container mt-5">
            <h3>Create a user</h3>
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
                <button type="submit" className="btn btn-primary w-100" >Create a user</button>
            </form>

        </div>
    )


}