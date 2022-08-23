const data = require('./data');

class Controller{
    
    async getStudents(){
        return new Promise( (resolve,_) => resolve(data));
    }


    async getStudent(id){
        return new Promise((resolve, reject) => {

            let student =data.find( (student) => student.id === parseInt(id));

            if(student){
                resolve(student);
            }else{
                reject(`Student with id ${id} not found`);
            }

        });
    }

    async createStudent(student){
        return new Promise( (resolve,_) => {
            let newStudent = {
                id: Math.floor(4 + Math.random() * 10),
                ...student
            };
            resolve(newStudent);
        });
    }

    async updateStudent(id){
        return new Promise( (resolve,reject) => {

            let student = data.find( (student) => student.id === parseInt(id));

            if(!student){
                reject(`No student with id ${id} found`);
            }

            student["active"] = true;
            resolve(student);
        });
    }

    async deleteStudent(id){
        return new Promise( (resolve, reject) => {

            let student =data.find( (student) => student.id === parseInt(id));
            if(!student){
                reject(`No Student with id ${id} found`);
            }

            resolve('Student Deleted Successfully')

        });
    }
}

module.exports = Controller;
