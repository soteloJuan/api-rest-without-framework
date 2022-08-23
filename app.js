require('dotenv').config()

const http = require("http");
const StudentController = require('./controller');
const { getReqData } = require('./helpers');

const PORT = process.env.PORT || 400;

const server = http.createServer( async(req, res) => {

    if(req.url === "/api/students"  && req.method === "GET"){

        const students = await new StudentController().getStudents();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(students));
    }

    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "GET") {
        try{
            const id = req.url.split("/")[3];
            
            const student = await new StudentController().getStudent(id);
            
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(student));

        }catch(error){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "DELETE") {
        try {

            const id = req.url.split("/")[3];

            let message = await new StudentController().deleteStudent(id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message }));
        } catch (error) {

            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "PATCH") {
        try {

            const id = req.url.split("/")[3];
            let updated_student = await new StudentController().updateStudent(id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updated_student));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    else if (req.url === "/api/students" && req.method === "POST") {

        let student_data = await getReqData(req);
        let todo = await new StudentController().createStudent(JSON.parse(student_data));
        
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todo));
    }

    else{
        res.writeHead(404, {"Content-Type":"application/json"});
        res.end(JSON.stringify({message: "Route not found"}));
    }
});

server.listen(PORT, () => {
    console.log('server en el puerto : ', PORT);
});
