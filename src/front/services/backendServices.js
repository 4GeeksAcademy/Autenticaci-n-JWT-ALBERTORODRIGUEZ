export const createUser = async (user, navigate) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/register`,  
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error al crear usuario:", data.error);
      alert(data.error || "Error al crear usuario");  
      return;
    }
    
    console.log("Usuario creado exitosamente:", data);
    alert("Usuario creado exitosamente. Ahora puedes iniciar sesión.");
    navigate("/");  
    
  } catch (error) {
    console.error("Error de red:", error);
    alert("Error al conectar con el servidor");
  }
};




export const login = async (user, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    alert(data.error);
    return;
  }
  localStorage.setItem("token", data.token);
  navigate("/private");
};


export const privateCheck = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
    {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`

      },
  });
  const data = await response.json();
  if (!response.ok){
    return false
  }
  return data;
};