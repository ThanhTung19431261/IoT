const firebaseAdmin = require("firebase-admin");
const morgan = require("morgan")
const express = require("express")
const app = express()
const http = require('http');
const socketIO = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path')
const serviceAccount = require("../firebase/iotproject.json");
const { response } = require("express");
const server = http.createServer(app);
const io = socketIO(server);
let snapshotListener = null;
let snapshotListener1 = null;
let snapshotListener2 = null;
let snapshotListener3 = null;

let snapshotListener4 = null;
let snapshotListener5 = null;
let snapshotListener6 = null;
let snapshotListener7 = null;

const port = process.env.PORT || 3000;

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://myproject-8ec64-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {}
}))
app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/control', (req, res) => {
    res.render('control');
})

app.get('/pond', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener4) {
        firebaseAdmin.database().ref().off('value', snapshotListener4);
    }
    snapshotListener4 = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('pond', { data });
        }
        io.emit('data4', data); // send data to all connected clients
    });
});

app.get('/pond-warn', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener6) {
        firebaseAdmin.database().ref().off('value', snapshotListener6);
    }
    snapshotListener6 = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('pond-warn', { data });
        }
        io.emit('data6', data); // send data to all connected clients
    });
});

app.get('/pond-rep', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener7) {
        firebaseAdmin.database().ref().off('value', snapshotListener7);
    }
    snapshotListener7 = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('pond-rep', { data });
        }
        io.emit('data7', data); // send data to all connected clients
    });
});

app.get('/pond-ctrl', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener5) {
        firebaseAdmin.database().ref().off('value', snapshotListener5);
    }
    snapshotListener5 = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('pond-ctrl', { data });
        }
        io.emit('data5', data); // send data to all connected clients
    });
});

app.get('/index', (req, res) => {
    res.render('index');
})

app.get('/warning', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener2) {
        firebaseAdmin.database().ref().off('value', snapshotListener2);
    }
    snapshotListener2 = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('warning', { data });
        }
        io.emit('data2', data); // send data to all connected clients
    });
});

app.get('/warning', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener2) {
        firebaseAdmin.database().ref().off('value', snapshotListener2);
    }
    snapshotListener2 = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('warning', { data });
        }
        io.emit('data2', data); // send data to all connected clients
    });
});

app.get('/report', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener1) {
        firebaseAdmin.database().ref().off('value', snapshotListener1);
    }
    snapshotListener1 = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('report', { data });
        }
        io.emit('data1', data); // send data to all connected clients
    });
});

app.get('/farm', (req, res) => {
    let isResponseSent = false; // initialize flag to false
    if (snapshotListener) {
        firebaseAdmin.database().ref().off('value', snapshotListener);
    }
    snapshotListener = firebaseAdmin.database().ref().on("value", function(snapshot) {
        const data = snapshot.val();
        if (!isResponseSent) { // check if response has already been sent
            isResponseSent = true;
            res.render('farm', { data });
        }
        io.emit('data', data); // send data to all connected clients
    });
});


server.listen(port)
console.log("Server is listening on port 3000");