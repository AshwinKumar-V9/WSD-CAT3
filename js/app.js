
const path = require('path')
const mysql = require('mysql2')
const express = require('express')
const formidable = require('express-formidable')
const app = express()
const port = 9000

app.listen(port, () => console.log(`Server listening on port ${port}!`))
app.use(express.static(path.join(__dirname, '../')))
app.use(formidable())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'christ'
})
connection.connect((err) => {
    if(!err) console.log('Database Connected')
    else console.log('Error Connecting to database \n' + err)
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    res.end()
})

app.get('/stuinfo', (req, res) => {
    connection.query('select * from stuinfo', (err, data) => {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/JSON'})
            res.write(data)
            res.end()
        }
        else {
            console.log(err);
        }
    })
})

app.post('/addStudentDB', (req, res) => {
    var obj = Object.values(req.fields)
    connection.query('insert into stuinfo values?', [[obj]], (err) => {
        if(!err) console.log(`Student ${obj[1]} added successfully to stuinfo`)
        else console.log(err)
    })
    res.setHeader('Location', '/')
    return res.end()
})

app.post('/updateStudentDB', (req, res) => {
    var obj = Object.values(req.fields)
    var sqlUpdate = "update stuinfo set stu_id=?, stu_name=?, age=?, gender=?, course=?, address=?, grade=? where stu_id=?"
    connection.query(sqlUpdate, obj, (err) => {
        if(!err) console.log(`Student ${obj} updated successfully to stuinfo`)
        else console.log(err)
    })
    res.setHeader('Location', '/')
    return res.end()
})

app.post('/delStudent', (req, res) => {
    var obj = Object.values(req.fields)
    connection.query('delete from stuinfo where stu_id=?', obj, (err) => {
        if(!err) console.log(`Student ${obj} deleted successfully from stuinfo`)
        else console.log(err)
    })
    return res.end()
})

app.get('/maleAG', (req, res) => {
    connection.query('select * from stuinfo where (gender="male" and grade="A")', (err, data) => {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/JSON'})
            res.write(data)
            res.end()
        }
        else {
            console.log(err);
        }
    })
})