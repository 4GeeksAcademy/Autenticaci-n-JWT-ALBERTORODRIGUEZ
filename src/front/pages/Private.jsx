import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { privateCheck } from "../services/backendServices"

export const Private = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const checkToken = async () => {
        const response = await privateCheck()
        console.log(response);
        if (response) {
            setUser(response)
            setLoading(false)

        }
        else {
            localStorage.removeItem("token")
            navigate("/")
        }


    }


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setTimeout(() => {
                navigate("/")

            }, 1000)
        } else {
            checkToken()

        }
    }, [])



    return (
        <>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                 <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow-sm">
                                <div className="card-body text-center p-5">
                                <i className="fas fa-user-shield fa-3x text-success mb-3"></i>
                                <h2 className="mb-3">¡Bienvenido!</h2>
                                <p className="text-muted mb-4">
                                    Hola <strong>{user?.userName || user?.email}</strong>, 
                                    estás en el área privada protegida con JWT
                                </p>
                                <div className="alert alert-success">
                                    <i className="fas fa-check-circle me-2"></i>
                                    Autenticado correctamente
                                </div>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        navigate("/");
                                    }}
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            )}
        </>
    )

} 