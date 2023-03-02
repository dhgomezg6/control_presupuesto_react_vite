import { useState, useEffect } from "react"
import {CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

function ControlPresupuesto({
    gastos, 
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto}) {
    
    const [disponible, setDisponible] = useState(0) 
    const [gastado, setGastado] = useState(0) 
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) =>  gasto.cantidad + total, 0)
        const totalDisponible = presupuesto-totalGastado
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        
        const porcentajeGastado = ((totalGastado/presupuesto)*100).toFixed(2);
        setPorcentaje(porcentajeGastado);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);
    }
  
    return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% gastado`}
            />
        </div>
        <div className="contenido-presupuesto">
            <button 
                className="reset-app" 
                type="button"
                onClick={handleResetApp}
            >
                Resetear APP
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo':''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto