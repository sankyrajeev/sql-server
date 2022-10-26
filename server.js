const inquirer = require('inquirer');
const db = require('./db/connection.js');

require('console.table');

const utils = require('util');

db.query = utils.promisify(db.query);

function menu(){
    inquirer.prompt([
        {
            type:"list",
            name:"choice",
            message:"Make a choice",
            choices:[
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Quit"
            ]
        }
    ])
    .then(answer =>{
        switch(answer.choice){
            case "View All Departments": viewDepartments();
                break;

                case "View All Roles": viewRoles();
                break;
                
                case "View All Employees": viewEmployees();
                break;

                case "Add a Department": addDept();
                break;

                case "Add a Role": addRole();
                break;

                case "Add an Employee": addEmployee();
                break;

                case "Update an Employee Role": updateEmployee();
                break;

                default:
                    process.exit(0);
                

                


        }
    })
}



async function viewDepartments(){
    const result =await db.query('SELECT * FROM department');
    console.table(result);
    menu();
}

async function viewRoles(){
    const result = await db.query('SELECT role.id,role.title,role.salary,department.name AS department_name FROM role left join department on role.department_id = department.id');
    console.table(result);
    menu();
}

async function viewEmployees(){
    const result = await db.query('SELECT employee.id, employee.first_name,employee.last_name,role.title,department.name,role.salary,concat(manager.first_name," ",manager.last_name)AS manager FROM employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on manager.id = employee.manager_id');
    console.table(result);
    menu();
}

async function addRole(){
    inquirer.prompt([
        {
            type:'input',
            name:'role',
            message:'What is the name of the new role?'
        },

        {
            type:'input',
            name:'salary',
            message:'What is the salary of the new role?'
        }
    ])

    .then(answer =>{
        let name = answer.role;

        let salary = answer.salary;
        db.query('SELECT * FROM department').then((result,error) =>{
            const departments = result.map(({id,name})=>({
                value:id,
                name:name

            }))
            inquirer.prompt([
                {
                    type:'list',
                    name:'choice',
                    message:'Choose a department',
                    choices:departments
                }
            ]).then (answer=>{
                db.query('INSERT INTO role(title,salary,department_id)values ( ?,?,? )' , [name,salary,answer.choice]).then(res=>{
                    console.log(`${name} Role added with a salary of ${salary} dollars`);
                    menu();
                })
            })
        });

        

        
       

    })
}

menu();