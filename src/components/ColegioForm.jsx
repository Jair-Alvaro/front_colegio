import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postColegio } from '../../apiReact/api';
import { getColegios, getZonas } from '../../apiReact/api';


function ColegioForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit, reset } = useForm();
  const [zonas, setZonas] = useState([]);

  useEffect(() => {
    async function obtenerZona() {
      const res2 = await getZonas();
      setZonas(res2.data);
      //console.log(res2.data)
    }
    obtenerZona();
  }, []);

  // const guardarColegio = async (data) => {
  //   await postColegio(data);
  //   handleClose();
  // };

  // const onSubmit = (data) => {
  //   guardarColegio(data);
  //   reset();
  // };
  const OnSubmit = handleSubmit(data => {
    postColegio(data)
    handleClose()
    window.location.reload(); // modificar para actualizar lo necesario 
  })

  return (
    <>
      <div className="col-2">
        <Button variant="success" onClick={handleShow}>
          AGREGAR COLEGIO
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registro de colegio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={OnSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre del Colegio</label>
                <input
                  type="text"
                  className="form-control"
                  {...register('colegio_nombre')}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección del Colegio</label>
                <input
                  type="text"
                  className="form-control"
                  {...register('colegio_direccion')}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono del Colegio</label>
                <input
                  type="text"
                  className="form-control"
                  {...register('colegio_telefono')}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contacto del Colegio</label>
                <input
                  type="text"
                  className="form-control"
                  {...register('colegio_contacto')}
                />
              </div>
              <div className="form-floating">
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" {...register('zona')}>
                  <option selected>Seleccionar Zona</option>
                  {zonas.map((zona) => (
                    <option key={zona.zona_id} value={zona.zona_id}>{zona.zona_nombre}</option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">Seleccionar Zona</label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={OnSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ColegioForm;
