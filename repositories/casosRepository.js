const { v4: uuid } = require("uuid");

let casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(c => c.id === id);
}

function create(data) {
  const novo = { id: uuid(), ...data };
  casos.push(novo);
  return novo;
}

function update(id, data) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return null;
  casos[index] = { id, ...data };
  return casos[index];
}

function patch(id, data) {
  const caso = findById(id);
  if (!caso) return null;
  Object.assign(caso, data);
  return caso;
}

function remove(id) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return false;
  casos.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, patch, remove };
