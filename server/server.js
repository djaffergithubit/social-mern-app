const express = require('express')
const Port = process.env.PORT || 4000
const path = require('path')
const cors = require('cors')
const app = express()
const http = require('http')
const Connect = require('./dbConfig')

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

require('dotenv').config()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// multer configuration

const multer = require('multer')
const { Message } = require('./models/messages')
const { Chat } = require('./models/Chats')
const { Notification } = require('./models/notifications')
const { Comment } = require('./models/comments')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

// Routes
app.use('/users', upload.single('picture'), require('./routes/userRouter'))
app.use('/posts', upload.single('postImage'), require('./routes/postRouter'))
app.use('/comments', require('./routes/commentRouter'))
app.use('/chats', require('./routes/chatRouter'))
app.use('/messages', require('./routes/messageRouter'))
app.use('/notifications', require('./routes/notificationRouter'))

app.post('/upload-image', upload.single('content'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ fileUrl });
});
// use io

const users = []
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('login', (data) => {
        if (!users.find(userId => userId === data.userId)) {
            users.push(data.userId)
        }
        console.log(users);
        io.emit('login', 'user logged in')
    })

    socket.on('logout', (data) => {
        const index = users.indexOf(data.userId)
        if (index > -1) {
            users.splice(index, 1)
        }
        console.log(users);
        io.emit('logout', 'user logged out')
    })
    
    socket.on('join chat', (chat) => {
        socket.join(chat);
        console.log('User joined chat:', chat);

        const message = { content:'', chat: chat, messageSender: socket.id };
        io.to(chat).emit('private message', message);
        socket.broadcast.emit('chat notification', { chat: chat, notificationSender: '', chatParticipants: ''})
    });

    socket.on('private message' , async (data) => {
        const { chat, content, messageSender } = data
        if (chat && content !== '') {
            const newMessage = new Message({ content, chat: chat, messageSender: messageSender._id })
            io.to(chat).emit('private message', {content: content, chat: chat, messageSender: messageSender})
            await newMessage.save()

            const chatFind = await Chat.findById(chat)

            if (!chatFind) {
                console.log('chat not fount');
            }

            chatFind.lastMessage = content
            io.to(chat).emit('last message', {lastMessage: content, chat: chat})
            await chatFind.save()
            
            const userInChat = chatFind?.participants.find(participant => participant !== messageSender)
            if (userInChat && users.find(userId => userId == userInChat)){
                socket.broadcast.emit('chat notification', { chat: chat, notificationSender: messageSender, chatParticipants: chatFind.participants})
            }else{
                const newNotification = new Notification({
                    isMessageNotification: true,
                    notificationSender: messageSender,
                    chat: chat
                })
                await newNotification.save()
            }
    }
}
)

    socket.on('new message notification', async (data) => {
        const { chatId, isMessageNotification, notificationSender } = data
        if (chatId) {
            const newNotification = new Notification({
                isMessageNotification,
                notificationSender,
                chat: chatId
            })
            await newNotification.save()
            io.emit('new message notification', { message: 'add new notification' })
        }
    })

    socket.on('message notification removed', async (data) => {
        console.log('removed');
        try {
            const { notificationsToRemove, message } = data;
                        
            if (notificationsToRemove.length > 0) {
                notificationsToRemove.forEach(async (not) => {
                    await Notification.findByIdAndDelete(not._id)
                });
                io.emit('message notification removed', message)
                io.emit('new message notification', { message: 'notification removed successfully' })
            }
        } catch (error) {
            console.error("Error removing notifications:", error);
        }
    });

    socket.on('liked disliked post', (message) => {
        io.emit('liked disliked post', message)
    })

    socket.on('newComment', async(message) => {
        console.log('message', message);
        const comments = await Comment.find()
        io.emit('newComment', {comments: comments})
    })

    socket.on('newPost', (message) => {
        io.emit('newPost', message)
    })

    socket.on('post removed', (message) => {
        io.emit('post removed', message)
    })

    socket.on('newChat', (message) => {
        console.log(message);
        io.emit('newChat', message)
    })

    socket.on('chatDeleted', (message) => {
        io.emit('chatDeleted', message)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

server.listen(Port, () => {
    console.log(`Server is running on ${Port}`)
    Connect()
})