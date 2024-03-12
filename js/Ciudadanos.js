const cargarFormularioCiudadanos=()=>{
    const EstudiantesForm = document.getElementById('ciudadanos-form');
    EstudiantesForm.innerHTML = `
        <form onsubmit="CrearCiudadano(event)">
            <label for="nombreCiud">Nombre:</label>
            <input type="text" id="nombreCiud" required>
            <label for="apellidoCiud">Apellido:</label>
            <input type="text" id="apellidoCiud" required>
            <label for="codADNCiud">Codigo ADN:</label>
            <input type="number" oninput="limitarDigitos(this, 20)" id="codADNCiud" required>
            <label for="telefonoCiud">Telefono:</label>
            <input type="number" id="telefonoCiud" required>
            <label for="direccionCiud">Direccion:</label>
            <input type="text" id="direccionCiud" required>
            <button type="submit">Guardar</button>
        </form>
    `;
}

const CrearCiudadano= async (event)=>{
    event.preventDefault();
    const nombreInput=document.getElementById('nombreCiud');
    const apellidoInput=document.getElementById('apellidoCiud');
    const ADNInput=document.getElementById('codADNCiud');
    const telefonoInput=document.getElementById('telefonoCiud');
    const direccionInput=document.getElementById('direccionCiud');
    
    const nombre=nombreInput.value;
    const apellido=apellidoInput.value;
    const codigoADN=ADNInput.value;
    const telefono=telefonoInput.value;
    const direccion=direccionInput.value;

    const codigoOcupado = listaCiudadanos.some(ciudadano => {
        return ciudadano.codigo_adn === codigoADN;
      });

    if (codigoOcupado) {
      alert('El código ADN seleccionado ya está en uso. Por favor, elija otro.');
      return null;
    }
  
    const NombreCompleto = (nombre + ' ' + apellido)
    
    const nuevoCiudadano={
        id:listaCiudadanos.length +1,
        nombre_completo: NombreCompleto,
        direccion: direccion,
        telefono: telefono,
        codigo_adn: codigoADN,
    }
  
    await GuardarCiudadano(nuevoCiudadano);
  
    alert('Ciudadano creado con éxito!');
    return nuevoCiudadano;
}

const GuardarCiudadano = async (nuevoCiudadano) => {
    try {
  
      const respuesta = await fetch('http://localhost:3000/ciudadanos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCiudadano),
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al crear la ciudadanos. Estado: ', respuesta.status);
      }
  
      const ciudadanosCreado = await respuesta.json();
  
      console.log('ciudadano creado:', ciudadanosCreado);
  
    } catch (error) {
      console.error("Error al cargar ciudadanos", error.message);
    }
  }