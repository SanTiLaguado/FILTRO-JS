let listaCiudadanos=[]

const cargarCiudadanos = async () => {

    try {
      listaCiudadanos.length = 0;
      const respuesta = await fetch('http://localhost:3000/ciudadanos');
  
      if (!respuesta.ok) {
        throw new Error('Error al cargar Ciudadanos. Estado: ', respuesta.status);
      }
      const Ciudadanos = await respuesta.json();
      listaCiudadanos.push(...Ciudadanos);
  
    } catch (error) {
      console.error("Error al cargar Asignaturas", error.message);
    }
  
    console.log("Lista Ciudadanos: ", listaCiudadanos)
}

function limitarDigitos(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}