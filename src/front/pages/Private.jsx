import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Private = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setTimeout(() => {
                navigate("/")

            }, 1000)
        } else {
            setLoading(false)
        }
    }, [])



    return (
        <>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <h1>Hola</h1>

            )}
        </>
    )

} 