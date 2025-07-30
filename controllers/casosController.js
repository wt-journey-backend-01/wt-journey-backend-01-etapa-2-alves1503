const casosRepo = require("../repositories/casosRepository");
const { badRequest, notFound } = require("../utils/errorHandler");

function getAll(req, res) {
  let { agente_id, status, q } = req.query;
  let casos = casosRepo.findAll();

  if (agente_id) casos = casos.filter(c => c.agente_id === agente_id);
  if (status) casos = casos.filter(c => c.status === status);
  if (q) {
    casos = casos.filter(c =>
      c.titulo.includes(q) || c.descricao.includes(q)
    );
  }

  res.status(200).json(casos);
}

function getById(req, res) {
  const caso = casosRepo.findById(req.params.id);
  if (!caso) return notFound(res, "Caso não encontrado");
  res.status(200).json(caso);
}

function create(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;
  if (!titulo || !descricao || !["aberto", "solucionado"].includes(status))
    return badRequest(res, "Campos obrigatórios inválidos");

  const novo = casosRepo.create(req.body);
  res.status(201).json(novo);
}

function update(req, res) {
  const atualizado = casosRepo.update(req.params.id, req.body);
  if (!atualizado) return notFound(res, "Caso não encontrado");
  res.status(200).json(atualizado);
}

function patch(req, res) {
  const atualizado = casosRepo.patch(req.params.id, req.body);
  if (!atualizado) return notFound(res, "Caso não encontrado");
  res.status(200).json(atualizado);
}

function remove(req, res) {
  const sucesso = casosRepo.remove(req.params.id);
  if (!sucesso) return notFound(res, "Caso não encontrado");
  res.status(204).send();
}

module.exports = { getAll, getById, create, update, patch, remove };
