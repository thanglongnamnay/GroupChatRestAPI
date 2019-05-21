const express = require('express');
const router = express.Router();
const Message = require('./Message');

/* GET home page. */
router.route('/messages/:id')
	.get(getMessageById)
	.put(updateMessageById)
	.delete(deleteMessageById);

router.route('/messages')
	.get(getAllMessage)
	.post(addMessage);

router.param('id', addMessageIdParam);

function getAllMessage(req, res) {
	res.json(Message.getAllMessage());
}
function addMessage(req, res) {
	const id = Message.addMessage(req.body.sender, req.body.message);
	res.json(id);
}
function getMessageById(req, res) {
	res.json(Message.getMessageById(req.messageId));
}
function updateMessageById(req, res) {
	res.json(Message.updateMessage(req.messageId, req.body.message));
}
function deleteMessageById(req, res) {
	res.json(Message.deleteMessage(req.messageId));
}
function addMessageIdParam(req, res, next, id) {
	req.messageId = id;
	next();
}
module.exports = router;
