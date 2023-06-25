import AdminLayout from '../../components/plantillas/AdminLayout'
import ListaColegios from "../../components/ListaColegios";
import ColegioButton from "../../components/ColegioForm";


function Colegio() {
    return (
        <AdminLayout>
            <>
                <h1>Colegios</h1>
                <div className='container mt-5'>
                    <div className="row">
                        <div className="col">
                            <ColegioButton />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col">
                            <ListaColegios />
                        </div>
                        <div className="col">
                            
                        </div>
                    </div>
                </div>

            </>
        </AdminLayout>
    )
}

export default Colegio;