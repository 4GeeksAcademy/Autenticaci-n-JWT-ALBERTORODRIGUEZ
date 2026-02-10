export const login = async (user, navigate) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
       method: "POST",
       body: JSON.stringify(user),
       headers: {
        "Content-Type": "application/json"
       } 
    } )
    const data = await response.json()
    if (!response.ok) {
        alert(data.error)
        return
    }
    localStorage.setItem("token", data.token)
    navigate("/private")
}