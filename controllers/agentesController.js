const agentesRepo = require("../repositories/agentesRepository");
const { badRequest, notFound } = require("../utils/errorHandler");


function getAll(req, res) {
    const { cargo, sort } = req.query;
    let agentes = agentesRepo.findAll();

    if (cargo) {
        agentes = agentes.filter(a => a.cargo === cargo);
    }

    if (sort === "dataDeIncorporacao") {
        agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
    } else if (sort === "-dataDeIncorporacao") {
        agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
    }

    res.status(200).json(agentes);
}

function getById(req, res) {
    const agente = agentesRepo.findById(req.params.id);
    if (!agente) return notFound(res, "Agente não encontrado");
    res.status(200).json(agente);
}

function create(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!nome || !dataDeIncorporacao || !cargo)
        return badRequest(res, "Todos os campos são obrigatórios");

    const novo = agentesRepo.create(req.body);
    res.status(201).json(novo);
}

function update(req, res) {
    const atualizado = agentesRepo.update(req.params.id, req.body);
    if (!atualizado) return notFound(res, "Agente não encontrado");
    res.status(200).json(atualizado);
}

function patch(req, res) {
    const atualizado = agentesRepo.patch(req.params.id, req.body);
    if (!atualizado) return notFound(res, "Agente não encontrado");
    res.status(200).json(atualizado);
}

function remove(req, res) {
    const sucesso = agentesRepo.remove(req.params.id);
    if (!sucesso) return notFound(res, "Agente não encontrado");
    res.status(204).send();
}

module.exports = { getAll, getById, create, update, patch, remove };
