const { v4: uuid } = require("uuid");

let agentes = [];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(a => a.id === id);
}

function create(data) {
  const novo = { id: uuid(), ...data };
  agentes.push(novo);
  return novo;
}

function update(id, data) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return null;
  agentes[index] = { id, ...data };
  return agentes[index];
}

function patch(id, data) {
  const agente = findById(id);
  if (!agente) return null;
  Object.assign(agente, data);
  return agente;
}

function remove(id) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return false;
  agentes.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, patch, remove };
