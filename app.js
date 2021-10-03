const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

const sessionsRouter = express.Router();

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, '/public/')))

app.set('views', './src/views');
app.set('view engine', 'ejs');

sessionsRouter.route('/').get((req, res) => {
    res.render("sessions", {
        sessions: [
            { title: "Sessions-1", description: "Sessions-1 Description" },
            { title: "Sessions-2", description: "Sessions-2 Description" },
            { title: "Sessions-3", description: "Sessions-3 Description" }
        ]
    })
});

sessionsRouter.route("/1").get((req, res) => {
    res.send("single sessions");
})

app.use('/sessions', sessionsRouter);

app.get('/', (req, res) => {
    res.render("index", { title: "OKAN TOPER", data: ["ad", "soyad", "yaş"] })
});

app.listen(PORT, () => {
    debug(`Listening Port Number ${chalk.green(PORT)}`)
});