#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student { static counter = 786500;
                id:number; name:string;
                courses:string[]; 
                balance:number; 

constructor(name:string){
                this.id = Student.counter++;
                this.name = name;
                this.courses = [];
                this.balance = 500;
}
enroll_course(course:string){
                this.courses.push(course);
}
view_balance(){                
                console.warn(`Balance for ${this.name} : ${this.balance}`);
}
pay_fee(amount:number){
                this.balance -= amount;
                console.warn(`Fee ${amount} paid for ${this.name} successfully`);
}
show_status(){
    console.warn(`Id: ${this.id}`)
    console.warn(`St Name: ${this.name}`)
    console.warn(`Courses: ${this.courses}`)
    console.warn(`Balance: ${this.balance}`)
}

}

//defining a student_manager class to manage student
class Student_manager {
    students: Student[]

    constructor(){
        this.students = [];
    }
    add_student(name:string){
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.bgCyan(`Student: ${name} Added Successfully To Database With Student ID: ${student.id}`));
    }
    
    enroll_student(student_id: number, course: string ) {
        let student = this.find_student(student_id);
        if (student){
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }else{
           console.log('Sorry! Student Not Found In Your Database');
        }
    }

    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.view_balance();
        } else {
            console.log("Student Is Not In Your Database. Try It Again.")
        }
    }


    pay_student_fee(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if (student){
           student.pay_fee(amount);
        } else {
            console.log("Student nog found. please enter a correct studnet ID.")
        }
    }



    show_student_status(student_id:number) {
        let student = this.find_student(student_id);
        if (student){
            student.show_status();
        }
    }

    
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    } 
    
}


// MAIN CODE STARTS FROM HEAR

async function main(){
    console.log(chalk.blue("♦".repeat(65)));
    console.warn(chalk.green(' \t   STUDENT MANAGEMENT SYSTEM - BY MERCHANTSONS'));
    console.log(chalk.blue("♦".repeat(65)));


    let student_manager = new Student_manager();
    
    while(true){
      let choice = await inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "Please Select Option",
        choices:["Add Student","Enroll Student","View Student Balance","Pay Fees","Show Status","Quit"]
    }]);

    switch(choice.choice){
        case "Add Student":
            let name_input = await inquirer.prompt([{
                name: "name",
                type: "input",
                message: "Enter A Student Name",
            }]);
            console.log(chalk.blue("♣".repeat(65)));
            student_manager.add_student(name_input.name);
            console.log(chalk.blue("♣".repeat(65)));
            break;
        case "Enroll Student":
            let course_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message:"Enter A Student ID:",
            },
            {
                name: "course",
                type: "input",
                message: "Enter A Course Name",
            }
        ]);
            console.log(chalk.blue("♣".repeat(65)));
            student_manager.enroll_student(course_input.student_id, course_input.course);
            console.log(chalk.blue("♣".repeat(65)));
            break;           
        case "View Student Balance":
            let balance_input = await inquirer.prompt ([
            {
                name: "student_id",
                type: "number",
                message: "Enter a Student ID:",
            }
        ]);
            console.log(chalk.blue("♣".repeat(65)));
            student_manager.view_student_balance(balance_input.student_id);
            console.log(chalk.blue("♣".repeat(65)));
            break;            
        case "Pay Fees":
            let fees_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter A Student ID:",                
            },
            {
                name: "amount",
                type: "number",
                message: "Enter Amount To Be Paid",
                                
            }
        ]);
           console.log(chalk.blue("♣".repeat(65)));
           student_manager.pay_student_fee(fees_input.student_id, fees_input.amount);
           console.log(chalk.blue("♣".repeat(65)));
           break;
        case "Show Status":
            let status_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter A Student ID:",
            }
        ]);
           console.log(chalk.blue("♣".repeat(65)));
           student_manager.show_student_status(status_input.student_id);
           console.log(chalk.blue("♣".repeat(65)));
           break;
        case "Quit":
            console.log(chalk.blue("♣".repeat(65)));
            console.warn(chalk.green("THANK YOU FOR USING STUDENT MANAGEMENT SYSTEM"));
            console.log(chalk.blue("♣".repeat(65)));
            process.exit();    
    }
  }
}


main();