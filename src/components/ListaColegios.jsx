import {useEffect,useState} from "react"
import axios from 'axios'
import { getColegios,postZona, getZonas, deleteColegio } from '../../apiReact/api';

function ListaColegios() {
    const [colegios, setColegios] = useState([])
    useEffect(() => {
        async function obtenerDatos() {
            const res = await getColegios()
            console.log(res.data)
            setColegios(res.data)
            //console.log("no jalo colegios")
        }
        obtenerDatos()
    }, []
    )
    const [zonas, setZonas] = useState([])
    useEffect(() => {

        async function obtenerZona() {
            const res2 = await getZonas()
            setZonas(res2.data)
        }
        obtenerZona()
    }, [])
    async function eliminarColegio(colegioId) {
        await deleteColegio(colegioId);
        //obtenerDatos();
        window.location.reload(); // modificar para actualizar lo necesario 
      }
    
    return (
        <>
            <div className='mt-5'>
                
                {colegios.map(colegio => (
                    <div className="card mb-3" style={{ backgroundColor: 'rgba(169, 169, 169, 0.5)' }} key={colegio.colegio_id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                            <img src="https://st4.depositphotos.com/6633222/38972/v/450/depositphotos_389727522-stock-illustration-cartoon-illustration-of-school-building.jpg" className="img-fluid rounded-start" alt="..." style={{ width: '200px', height: '200px' }} />
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    <h5 className="card-title">{colegio.colegio_nombre}</h5>
                                    <p className="card-text">{colegio.colegio_direccion}</p>
                                    <p className="card-text"><small className="text-body-secondary">{colegio.colegio_telefono}</small></p>
                                    <p className="card-text"><small className="text-body-secondary">{colegio.colegio_contacto}</small></p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <br />
                                    <button className="btn btn-warning" type="button">Editar</button>
                                    <button className="btn btn-danger"type="button"onClick={() => eliminarColegio(colegio.colegio_id)}>Eliminar</button>
                                </div>
                            </div>
                            <div class="form-floating">

                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">

                                    <option selected>Zona</option>
                                    {...zonas.map(zona => (
                                        <option value={zona.id}>{zona.zona_nombre}</option>
                                    ))}
                                </select>
                                <label for="floatingSelect">Works with selects</label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ListaColegios