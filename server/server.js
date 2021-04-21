const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

server.listen(process.env.PORT || 5000)

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'))
})

io.on('connection', socket => {
	console.log('client connected', socket)
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
})
