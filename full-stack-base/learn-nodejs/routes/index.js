const { messageBoardCreate, messageBoardList, notFound } = require('../services/index')
module.exports = {
  "GET /message-board/list": messageBoardList,
  "POST /message-board": messageBoardCreate,
  "404.htm": notFound,
}
