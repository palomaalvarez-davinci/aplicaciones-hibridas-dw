import { useState } from "react"

const Contacto = () => {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="form-page">
      <h1>Estas buscando algun libro que no tenemos?</h1>
      <p>
        Dejanos los datos del libro que estas buscando y nos pondremos en contacto
        para comentarte si es posible conseguirlo y sus precios estimados.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />
        </div>

        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" />
        </div>

        <div>
          <label htmlFor="celular">Numero de celular:</label>
          <input type="text" id="celular" name="celular" />
        </div>

        <div>
          <label htmlFor="titulo">Titulo:</label>
          <input type="text" id="titulo" name="titulo" />
        </div>

        <div>
          <label htmlFor="autor">Autor:</label>
          <input type="text" id="autor" name="autor" />
        </div>

        <div>
          <label htmlFor="consulta">Otros datos relevantes:</label>
          <textarea id="consulta" name="consulta" rows="4"></textarea>
        </div>

        <button type="submit">Enviar</button>
        {enviado && <p>Consulta enviada.</p>}
      </form>
    </div>
  )
}

export default Contacto
