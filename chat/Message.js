let messageList = [];
let id = 0;
console.log('new');
function Message(id, sender, text, time) {
	return {id, sender, text, time};
}
function getAllMessage() {
	return messageList;
}
function getMessageById(id) {
	for (const message of messageList) {
		if (message.id == id) {
			return message;
		}
	}
	return null;
}
function addMessage(sender, text, time = Date.now()) {
	if (text.length == 0) return null;
	messageList.push(Message(++id, sender, text, time));
	return id;
}
function updateMessage(id, text) {
	if (text.length == 0) return null;
	const message = getMessageById(id);
	if (!message) return null;
	message.text = text;
	return id;
}
function deleteMessage(id) {
	messageList = messageList.filter(message => message.id != id);
	return id;
}
module.exports = {
	getAllMessage,
	getMessageById,
	addMessage,
	updateMessage,
	deleteMessage
};