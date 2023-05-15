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
const nodemailer = require('nodemailer');

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
    databaseURL: "https://newproject-2026b-default-rtdb.asia-southeast1.firebasedatabase.app"
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

const lightRef = firebaseAdmin.database().ref('/Light_Status');
const light1Ref = firebaseAdmin.database().ref('/Light1_Status');
const light2Ref = firebaseAdmin.database().ref('/Light2_Status');
const light3Ref = firebaseAdmin.database().ref('/Light3_Status');
const fanRef = firebaseAdmin.database().ref('/fan_Status');
const foodRef = firebaseAdmin.database().ref('/food_Value');
const foodRef1 = firebaseAdmin.database().ref('/food_Value_pond');
const autoRef = firebaseAdmin.database().ref('/auto_Status');
const autoRef1 = firebaseAdmin.database().ref('/auto_Status_pond');

function updateLightStatus(status) {
    lightRef.set(status);
}

function updateLight1Status(status) {
    light1Ref.set(status);
}

function updateLight2Status(status) {
    light2Ref.set(status);
}

function updateLight3Status(status) {
    light3Ref.set(status);
}

function updateFanStatus(status) {
    fanRef.set(status);
}

function updateFoodStatus(status) {
    foodRef.set(status);
}

function updateFoodStatus1(status) {
    foodRef1.set(status);
}

function updateAutoStatus(status) {
    autoRef.set(status);
}

function updateAutoStatus1(status) {
    autoRef1.set(status);
}

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('light', (data) => {
        console.log('Light status:', data.status);
        updateLightStatus(data.status);
    });

    socket.on('light1', (data) => {
        console.log('Light1 status:', data.status);
        updateLight1Status(data.status);
    });

    socket.on('light2', (data) => {
        console.log('Light2 status:', data.status);
        updateLight2Status(data.status);
    });

    socket.on('light3', (data) => {
        console.log('Light3 status:', data.status);
        updateLight3Status(data.status);
    });

    socket.on('fan', (data) => {
        console.log('Fan status:', data.status);
        updateFanStatus(data.status);
    });

    socket.on('food', (data) => {
        console.log('Food value:', data.value);
        updateFoodStatus(data.value);
    });

    socket.on('food1', (data) => {
        console.log('Food value:', data.value);
        updateFoodStatus1(data.value);
    });

    socket.on('auto', (data) => {
        console.log('Auto status:', data.status);
        updateAutoStatus(data.status);
    });

    socket.on('auto1', (data) => {
        console.log('Auto status:', data.status);
        updateAutoStatus1(data.status);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.json()); // Thêm dòng này để phân tích cú pháp JSON trong yêu cầu

app.post("/update-time", (req, res) => {
    const timeData = req.body;
    updateTimeData(timeData);
    res.sendStatus(200);
});

const timeRef1 = firebaseAdmin.database().ref("/Time1");
const timeRef2 = firebaseAdmin.database().ref("/Time2");
const foodRef3 = firebaseAdmin.database().ref('/food_Auto');

function updateTimeData(timeData) {
    timeRef1.set(timeData.time1);
    timeRef2.set(timeData.time2);
    foodRef3.set(timeData.foodValue);
}

app.post("/update-time1", (req, res) => {
    const timeData_pond = req.body;
    updateTimeData1(timeData_pond);
    res.sendStatus(200);
});

const timeRef_pond1 = firebaseAdmin.database().ref("/Time1_pond");
const timeRef_pond2 = firebaseAdmin.database().ref("/Time2_pond");
const timeRef_pond3 = firebaseAdmin.database().ref("/Time3_pond");

function updateTimeData1(timeData_pond) {
    timeRef_pond1.set(timeData_pond.time1);
    timeRef_pond2.set(timeData_pond.time2);
    timeRef_pond3.set(timeData_pond.time3);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'overlast123569@gmail.com',
        pass: 'dlbwzbwrbwfkbivs'
    }
});

let emailSent = false;
let emailSent1 = false;

function sendEmail(alertMessage) {

    const mailOptions = {
        from: 'overlast123569@gmail.com',
        to: 'DuyTung110101@gmail.com',
        subject: 'Cảnh Báo',
        text: `Nội dung cảnh báo:\n${alertMessage}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
            setTimeout(() => {
                emailSent = false;
            }, 60000);
        }
    });
}

function handleAlert(snapshot, alertType) {
    const status = snapshot.val();
    const alertKey = `Alert_${alertType}`;

    if (status) {
        alerts[alertKey] = `${alertType}: ${status}`;
    } else {
        delete alerts[alertKey];
    }
    checkAlerts(alerts);
}

function checkAlerts(alerts) {
    let alertMessage = '';

    for (const key in alerts) {
        if (alerts[key]) {
            alertMessage += `${alerts[key]}\n`;
        }
    }

    if (alertMessage) {
        sendEmail(alertMessage);
    }
}

function sendEmail1(alertMessage1) {

    const mailOptions1 = {
        from: 'overlast123569@gmail.com',
        to: 'dkaito1120@gmail.com',
        subject: 'Cảnh Báo',
        text: `Nội dung cảnh báo:\n${alertMessage1}`
    };

    transporter.sendMail(mailOptions1, (error1, info1) => {
        if (error1) {
            console.log('Error sending email:', error1);
        } else {
            console.log('Email sent:', info1.response);
            setTimeout(() => {
                emailSent1 = false;
            }, 60000);
        }
    });
}

function handleAlert1(snapshot1, alertType1) {
    const status1 = snapshot1.val();
    const alertKey1 = `Alert_${alertType1}`;

    if (status1) {
        alerts1[alertKey1] = `${alertType1}: ${status1}`;
    } else {
        delete alerts1[alertKey1];
    }

    checkAlerts1(alerts1);
}

function checkAlerts1(alerts1) {
    let alertMessage1 = '';

    for (const key1 in alerts1) {
        if (alerts1[key1]) {
            alertMessage1 += `${alerts1[key1]}\n`;
        }
    }

    if (alertMessage1) {
        sendEmail1(alertMessage1);
    }
}

const tempAlert = firebaseAdmin.database().ref('/Alert_temp');
const luxAlert = firebaseAdmin.database().ref('/Alert_lux');
const humAlert = firebaseAdmin.database().ref('/Alert_hum');
const nh3Alert = firebaseAdmin.database().ref('/Alert_nh3');

const tempAlertw = firebaseAdmin.database().ref('/Alert_tempw');
const phAlert = firebaseAdmin.database().ref('/Alert_ph');
const turAlert = firebaseAdmin.database().ref('/Alert_tur');

const alerts = {};
const alerts1 = {};

tempAlert.on('value', (snapshot) => handleAlert(snapshot, 'Temperature'));
luxAlert.on('value', (snapshot) => handleAlert(snapshot, 'Light level'));
humAlert.on('value', (snapshot) => handleAlert(snapshot, 'Humidity'));
nh3Alert.on('value', (snapshot) => handleAlert(snapshot, 'NH3 level'));

tempAlertw.on('value', (snapshot1) => handleAlert1(snapshot1, 'Temperature_Water'));
phAlert.on('value', (snapshot1) => handleAlert1(snapshot1, 'Ph'));
turAlert.on('value', (snapshot1) => handleAlert1(snapshot1, 'Turbidity'));


server.listen(port)
console.log("Server is listening on port 3000");