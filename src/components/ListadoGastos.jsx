import Gasto from "./Gasto"

function ListadoGastos({
  gastos, 
  gastosFiltrados,
  filtro,
  setGastoEditar, 
  eliminarGasto}) {

    const filtroExist = filtro.length > 0;
    const gastosToShow = filtroExist ? gastosFiltrados : gastos;
    return (
      <div className="listado-gastos contenedor">
          <h2>{gastosToShow.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>

          {
              gastosToShow.map(gasto => (
                <Gasto 
                  key={gasto.id} 
                  gasto={gasto} 
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))
          }
      </div>
    )
}

export default ListadoGastos