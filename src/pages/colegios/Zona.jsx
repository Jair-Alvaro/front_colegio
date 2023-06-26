import AdminLayout from '../../components/plantillas/AdminLayout';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postZona, deleteZona, updateZona } from '../../../apiReact/api';
import { getZonas } from '../../../apiReact/api';
import '../colegios/Zona.css'
function ConfirmDelete({ show, handleClose, handleConfirmDelete }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de eliminar este registro?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function Zona() {
    const [show, setShow] = useState(false);
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
    //editar zona
    const [editingZona, setEditingZona] = useState(null);
    const handleClose = () => {
        setShow(false);
        setEditingZona(null);
        window.location.reload();
    };
    const handleEdit = (zona) => {
        setEditingZona(zona);
        setShow(true);
    }
    const onSubmit = handleSubmit(async (data) => {
        if (editingZona) {
            const updatedZona = {
                ...editingZona,
                zona_nombre: data.zona_nombre,
            };
            updateZona(editingZona.zona_id, updatedZona)
        } else {
            postZona(data)
        }
        handleClose();
        window.location.reload();  // modificar para actualizar lo necesario 
    });
    //eliminar zona
    const eliminarZona = async (zonaId) => {
        await deleteZona(zonaId);
        //obtenerZona();
        window.location.reload(); // modificar para actualizar lo necesario 
    };
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedZona, setSelectedZona] = useState(null);
    const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
    const handleShowConfirmDelete = () => setShowConfirmDelete(true);

    const handleDelete = (zona) => {
        setSelectedZona(zona)
        handleShowConfirmDelete()
    }
    const handleConfirmDelete = () => {
        eliminarZona(selectedZona.zona_id)
        handleCloseConfirmDelete()
    }

    return (
        <AdminLayout>
            <>
                <h1>Zonas</h1>
                <div className='principal col-2 mt-5 '>
                    <Button variant="success" onClick={handleShow}>
                        AGREGAR ZONA
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{editingZona ? 'Editar Zona' : 'Registro Zona'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        defaultValue={editingZona ? editingZona.zona_nombre : ''}
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
                                {editingZona ? 'Guardar Cambios' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {/* <table className="table table-secondary mt-5">
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
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(zona)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(zona)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
<div className="container mt-2">
  <div className="row">
    <div className="col">
      {zonas.map((zona) => (
        <div className="carta card mb-3 card-block container__card" key={zona.zona_id} id="car">
          <div className='row g-0 m-2'>
            <div className='col-md-2'>
              <h5 className="card-title mt-3 mb-3 container__title">{zona.zona_id}</h5>
            </div>
            <div className='col-md-4'>
              <p className="card-text container__description">{zona.zona_nombre}</p>
            </div>
            <div className='col-md-3'>
              <div className="btn-group">
                <button className="btn btn-warning me-2" onClick={() => handleEdit(zona)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(zona)}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="col">
  {zonas.map((zona) => (
    <div className="image-container" key={zona.zona_id}>
      <img className="card-img-top" src="https://media.istockphoto.com/id/1452331594/es/vector/camino-de-coches-en-el-desierto-con-arena-y-monta%C3%B1as.jpg?s=612x612&w=0&k=20&c=6HdEGmMaG-Zq34pFyYuD9Q01IvAjR5W-WtFFhhiK_a8=" alt="alternative" style={{ height: '54px'}} />
    </div>
  ))}
</div>

  </div>
</div>
              
                <ConfirmDelete
                    show={showConfirmDelete}
                    handleClose={handleCloseConfirmDelete}
                    handleConfirmDelete={handleConfirmDelete}
                />
            </>
        </AdminLayout>
    )
}

export default Zona;
