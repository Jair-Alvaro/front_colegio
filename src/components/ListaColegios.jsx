import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  getColegios,
  postColegio,
  updateColegio,
  deleteColegio,
} from "../../apiReact/api";
import { getZonas } from "../../apiReact/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CardStyles from "./CardStyles";

function ListaColegios() {
  const [show, setShow] = useState(false);
  const [colegios, setColegios] = useState([]);
  const [zonas, setZonas] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function obtenerDatos() {
      const res = await getColegios();
      setColegios(res.data);
    }
    obtenerDatos();
  }, []);

  useEffect(() => {
    async function obtenerZona() {
      const res2 = await getZonas();
      setZonas(res2.data);
    }
    obtenerZona();
  }, []);

  // editar Colegio
  const [editingColegio, setEditingColegio] = useState(null);
  const handleClose = () => {
    setShow(false);
    setEditingColegio(null);
    reset();
    window.location.reload();
  };
  const handleShow = () => setShow(true);
  const handleEdit = (colegio) => {
    setEditingColegio(colegio);
    setShow(true);
  };
  const OnSubmit = handleSubmit(async (data) => {
    if (editingColegio) {
      // Editar el colegio existente
      const updatedColegio = {
        ...editingColegio,
        colegio_nombre: data.colegio_nombre,
        colegio_direccion: data.colegio_direccion,
        colegio_telefono: data.colegio_telefono,
        colegio_contacto: data.colegio_contacto,
        zona: data.zona,
      };
      updateColegio(editingColegio.colegio_id, updatedColegio);
    } else {
      // Crear un nuevo colegio
      postColegio(data);
    }
    handleClose();
  });

  async function eliminarColegio(colegioId) {
    await deleteColegio(colegioId);
    window.location.reload(); // Recargar la página para actualizar los datos
  }
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedColegio, setSelectedColegio] = useState(null);
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowConfirmDelete = () => setShowConfirmDelete(true);

  const handleDelete = (colegio) => {
    setSelectedColegio(colegio);
    handleShowConfirmDelete();
  };
  const handleConfirmDelete = () => {
    eliminarColegio(selectedColegio.colegio_id);
    handleCloseConfirmDelete();
  };
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
  // busquedad colegio
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredColegios = colegios.filter((colegio) => {
    return colegio.colegio_nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingColegio ? "Editar Colegio" : "Registro de Colegio"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={OnSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Colegio</label>
              <input
                type="text"
                className="form-control"
                defaultValue={
                  editingColegio ? editingColegio.colegio_nombre : ""
                }
                {...register("colegio_nombre")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección del Colegio</label>
              <input
                type="text"
                className="form-control"
                defaultValue={
                  editingColegio ? editingColegio.colegio_direccion : ""
                }
                {...register("colegio_direccion")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono del Colegio</label>
              <input
                type="text"
                className="form-control"
                defaultValue={
                  editingColegio ? editingColegio.colegio_telefono : ""
                }
                {...register("colegio_telefono")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contacto del Colegio</label>
              <input
                type="text"
                className="form-control"
                defaultValue={
                  editingColegio ? editingColegio.colegio_contacto : ""
                }
                {...register("colegio_contacto")}
              />
            </div>
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                defaultValue={editingColegio ? editingColegio.zona : ""}
                {...register("zona")}
              >
                <option selected>Seleccionar Zona</option>
                {zonas.map((zona) => (
                  <option key={zona.zona_id} value={zona.zona_id}>
                    {zona.zona_nombre}
                  </option>
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
            {editingColegio ? "Guardar Cambios" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mt-5">
        <div className="mb-3 d-flex justify-content-center">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por colegio..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <br />

        <section className="container" id="carta">
          {filteredColegios.map((colegio) => (
            <div
              className="container__card card-styles"
              id="concard"
              style={{ backgroundColor: "rgb(211,211,211)" }} 
              key={colegio.colegio_id}
            >
              <img
                src="https://www.elesapiens.com/blog/wp-content/uploads/2017/11/New-Sandy-Hook-Elementary-School-1-Azure.jpg"
                alt="img"
                className="card__img"
              />
              <div className="subcontainer text-center" id="sub">
                <p className="container__title">{colegio.colegio_nombre}</p>
                <p className="container__subtitle">
                  {colegio.colegio_direccion}
                </p>
                <p className="container__description">
                  {colegio.colegio_telefono}{" "}
                </p>
                <p className="container__description">
                  {colegio.colegio_contacto}
                </p>
                <p className="container__description" id="des">
                  {
                    zonas.find((zona) => zona.zona_id === colegio.zona)
                      ?.zona_nombre
                  }
                </p>
                <button
                  className="btn btn-warning me-2"
                  id="bu"
                  type="button"
                  onClick={() => handleEdit(colegio)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  id="bu"
                  type="button"
                  onClick={() => handleDelete(colegio)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <CardStyles />{" "}
          {/* Renderiza el componente CardStyles después de las tarjetas */}
        </section>
      </div>
      <ConfirmDelete
        show={showConfirmDelete}
        handleClose={handleCloseConfirmDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default ListaColegios;
``;
