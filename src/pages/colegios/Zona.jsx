import AdminLayout from '../../components/plantillas/AdminLayout';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postZona, deleteZona } from '../../../apiReact/api';
import { getZonas } from '../../../apiReact/api';

function Zona() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit, reset } = useForm();
    const [zonas, setZonas] = useState([]);

    useEffect(() => {
        async function obtenerZona() {
            const res2 = await getZonas();
            setZonas(res2.data);
            console.log(res2.data)
        }
        obtenerZona();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        await postZona(data);
        handleClose();
        window.location.reload();  // modificar para actualizar lo necesario 
    });

    const eliminarZona = async (zonaId) => {
        await deleteZona(zonaId);
        //obtenerZona();
        window.location.reload(); // modificar para actualizar lo necesario 
    };

    return (
        <AdminLayout>
            <>
                <h1>Zonas</h1>
                <div className='col-2 mt-5'>
                    <Button variant="success" onClick={handleShow}>
                        AGREGAR ZONA
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registro de zona</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        autoFocus
                                        {...register('zona_nombre')}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="success" onClick={onSubmit}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <table className="table table-secondary mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zonas.map((zona) => (
                            <tr key={zona.zona_id}>
                                <th scope="row">{zona.zona_id}</th>
                                <td>{zona.zona_id}</td>
                                <td>{zona.zona_nombre}</td>
                                <td>
                                    <div className="btn-group">
                                        <button className="btn btn-warning me-2">Editar</button>
                                        <button className="btn btn-danger" onClick={() => eliminarZona(zona.zona_id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        </AdminLayout>
    )
}

export default Zona;
