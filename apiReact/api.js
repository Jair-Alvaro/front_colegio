import axios from "axios";
const apiColegio = axios.create({
  baseURL: "http://127.0.0.1:8000/api/colegio/",
});

const apiZona = axios.create({
  baseURL: "http://127.0.0.1:8000/api/zona/",
});
//colegios
export const getColegios = () => {
  return apiColegio.get("/");
};

export const postColegio = (colegio) => {
  return apiColegio.post("/", colegio);
};

export const updateColegio = (colegioId, colegioData) => {
  return apiColegio.put(`/${colegioId}/`, colegioData);
};

export const deleteColegio = (colegioId) => {
  return apiColegio.delete(`/${colegioId}`);
};
//zonas
export const getZonas = () => {
  return apiZona.get("/");
};

export const postZona = (zona) => {
  return apiZona.post("/", zona);
};

export const updateZona = (zonaId, zonaData) => {
  return apiZona.put(`/${zonaId}/`, zonaData);
};

export const deleteZona = (ZonaId) => {
  return apiZona.delete(`/${ZonaId}`);
};