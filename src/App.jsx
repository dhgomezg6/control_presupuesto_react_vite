import { useState, useEffect } from 'react'

import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import { generarId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  // TODO: Obtener en boolean y verificar comportamiento
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(
    localStorage.getItem('isValidPresupuesto')
  );

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // Guardar en localStorage el presupuesto y si es valido
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0);
    //localStorage.setItem('isValidPresupuesto', presupuesto > 0 ? true : false);
  }, [presupuesto])

  // Guardar en localStorage los gastos
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    filtrarGastos();
  }, [gastos])

  // Funcion que se llama cuando se presiona el boton +
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  // Funcion que se le pasa al modal para que se llame 
  // cuando se presione el boton de añadir, se crea aca
  // para tener acceso al setGasto y setAnimarModal
  const guardarGasto = gasto => {

    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map(gastoItem => gastoItem.id === gasto.id? gasto : gastoItem);
      
      setGastos(gastosActualizados)
      setGastoEditar({})
      
    } else {
      // Crear
      gasto.id = generarId();
      gasto.fecha = Date.now();

      setGastos([...gastos, gasto])
    }

    
    
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);      
    }, 500)
  }


  // Funcion que se le pasa al modal para que se invoque cuando se
  // quiere eliminar un gasto por id.
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gastoItem => gastoItem.id !== id);
    setGastos(gastosActualizados)
  }

  // Cuando en el componente gasto se use el setGastoEditar
  // se actualiza gastoEditar y se llama esta funcion
  // que abre el modal.
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true);
    }, 500)
    }
  }, [gastoEditar])


  const filtrarGastos = () => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }

  useEffect(()=>{
    filtrarGastos();
  }, [filtro])
  

  return (
    <div className={modal && 'fijar'}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro = {filtro}
              setFiltro = {setFiltro}
            />

            <ListadoGastos 
              gastos={gastos}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt='Icono Nuevo Gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && 
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
      />}
    </div>
  )
}

export default App
