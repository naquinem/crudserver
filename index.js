import express, { request, response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Setting connection in database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3307',
    password: '',
    database: 'expressreact'
});
//Check if the server is connected in database
db.connect(function (error) {
    if(error) {
        console.log('Not connected to database')
    } else {
        console.log('Database connected');
    }
});
//Create data from input field to database
app.post('/create', (request, response) => {
    const sql = 'INSERT INTO crud (`fullname`, `email`, `contact`) VALUES (?)';
    const values = [
        request.body.fullname,
        request.body.email,
        request.body.contact,
    ];
    db.query(sql, [values], (error, result) => {
        if (error) {
            return response.json(error);
        } else {
            return response.json(result);
        }
    });
});
//Read all data from MySQL database
app.get('/read', (request, response) => {
    const sql = 'SELECT * FROM crud';
    db.query(sql, (error, result) => {
        if(error) {
            return response.json({Message: "Error in server"});
        } else {
            return response.json(result);
        }
    });
});
//Read individual data from database
app.get('/info/:id', (request, response) => {
    const sql = 'SELECT * FROM crud WHERE id = ?';
    const id = request.params.id;
    db.query(sql, [id], (error, result) => {
        if(error) {
            return response.json({Message: "Error in server"});
        } else {
            return response.json(result);
        }
    });
});
//Update the data in database
app.put('/update/:id', (request, response) => {
    const sql = "UPDATE crud SET `fullname`=?, `email`=?, `contact`=? WHERE id=?";
    const id = request.params.id;
    db.query(sql, [request.body.fullname, request.body.email, request.body.contact, id], (error, result) => {
        if (error) {
            return response.json({Message: 'Error in server'});
        } else {
            return response.json(result);
        }
    });
});
//Delete data from database
app.delete('/delete/:id', (request, response) => {
    const sql = 'DELETE FROM crud WHERE id=?';
    const id = request.params.id;
    db.query(sql, [id], (error, result) => {
        if (error) {
            return response.json({Message: 'Error in server'});
        } else {
            return response.json(result)
        }
    });
});

app.listen(8000, () => {
    console.log('You can now view website in the browser');
    console.log('  Local: http://localhost:8000');
    console.log('  On Your Network: http://192.168.45.197:8000');
});