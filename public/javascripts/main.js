(function (){
	const $ = id => document.getElementById(id);
	const messageList = $('chat-messages');
	const nameInput = $('name-input');
	const messageInput = $('message-input');
	const sendButton = $('send-button');

	const idInput = $('id-input');
	const newMessageInput = $('new-message-input');
	const getAllMessage = $('get-all-message');
	const getMessageById = $('get-message-by-id');
	const deleteMessageById = $('delete-message-by-id');
	const updateMessageById = $('update-message-by-id');
	const responds = $('responds');

	const baseUrl = 'http://localhost:3000/chat/messages'

	const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

	const fget = (url) => fetch(url).then(res => res.json());

	const fpost = (url, data) => fetch(url, {
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(toUrlEncoded(data))
	}).then(res => res.json());

	const fput = (url, data) => fetch(url, {
		method: 'put',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(toUrlEncoded(data))
	}).then(res => res.json());

	const fdelete = (url) => fetch(url, {	method: 'delete' }).then(res => res.json());

	const getTimeString = message => message.id 
		+ ': Vào hồi ' 
		+ (new Date(message.time)).toLocaleTimeString('vi-VN') 
		+ ' ngày ' 
		+ (new Date(message.time)).toLocaleDateString('vi-VN', {
			year: 'numeric', 
			month: 'long', 
			day:'numeric'
		});

	const getFullMessageString = message => {
		const timeString = getTimeString(message);
		return `${timeString}
	${message.sender}: ${message.text}
	`;
	}

	const showAllMessages = (list) => {
		messageList.innerText = '';
		for (const message of list) {
			messageList.innerText += getFullMessageString(message);
		}
		return list;
	}

	const showMessage = message => {
		if (!message) {
			responds.innerText = 'No message';
			return;
		}
		responds.innerText = getFullMessageString(message);
	}

	const showId = id => {
		responds.innerText = 'id: ' + id;
	}

	const onSendClick = e => {
		e.preventDefault();
	 	const data = {
	 		sender: nameInput.value,
	 		message: messageInput.value
	 	}
		fpost(baseUrl, data).then(onGetAllMessageClick);
	}

	const onGetAllMessageClick = e => {
		fget(baseUrl).then(showAllMessages);
	}

	const onGetMessageById = e => {
		fget(baseUrl + '/' + idInput.value).then(showMessage);
	}

	const onDeleteMessageById = e => {
		fdelete(baseUrl + '/' + idInput.value).then(showId);
	}

	const onUpdateMessageById = e => {
		fput(baseUrl + '/' + idInput.value, {message: newMessageInput.value}).then(showId);
	}

	sendButton.onclick = onSendClick;
	getAllMessage.onclick = onGetAllMessageClick;
	getMessageById.onclick = onGetMessageById;
	deleteMessageById.onclick = onDeleteMessageById;
	updateMessageById.onclick = onUpdateMessageById;
})();