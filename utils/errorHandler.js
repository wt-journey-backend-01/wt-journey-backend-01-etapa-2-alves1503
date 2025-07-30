function badRequest(res, message) {
  return res.status(400).json({
    status: 400,
    message: "Parâmetros inválidos",
    errors: [message],
  });
}

function notFound(res, message) {
  return res.status(404).json({
    status: 404,
    message,
  });
}

module.exports = { badRequest, notFound };
