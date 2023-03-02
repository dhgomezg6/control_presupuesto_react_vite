
import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from "../img/cerrar.svg"

function Modal({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto,
    gastoEditar,
    setGastoEditar}) {

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')

    const [mensaje, setMensaje] = useState('')
    
    // Cuando carga el modal se verifica si el objeto de editar
    // tiene propiedades, en caso de que si se cargan estas.
    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setId(gastoEditar.id)
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha)
        }
    }, [])

    // Cuando se envie el formulario se validan los campos 
    // obligatorios y se invoca la funcion de guardarGasto
    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje("Todos los campos son obligatorios")

            setTimeout(() => {
                setMensaje('')
            }, 3000)

            return;
        }

        guardarGasto({id, nombre, cantidad, categoria, fecha})
    }



    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false);
        }, 500)
    }

    const isEditar = gastoEditar.nombre ? true : false;

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="Cerrar modal"
                    onClick={ocultarModal}
                />
            </div>
            <form 
                className={`formulario ${animarModal? "animar":"cerrar"}`}
                onSubmit={handleSubmit}
            >
                <legend>{isEditar? 'Editar gasto':'Crear gasto'}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>

                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>

                    <input 
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">--seleccione--</option>
                        <option value="ahorro">Ahorros</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={isEditar? "Guardar cambios":"Añadir Gasto"}
                />

            </form>
        </div>
    )
}

export default Modal