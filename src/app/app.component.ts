import { Component, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'to-do';
  displayTaskInput=false;
  tasksArray:{taskName:string,taskEditMode:boolean, taskCompleted:boolean}[] = [];
  isTasksArrayEmpty=true;
  //editMode = false;
  editIndex:number=-1;
  taskEdit : string = '';
  checkBoxSelected=false;
  addHighlight = false;
  taskInputInvalid=false;
  taskInput : string = '';
  @ViewChild('f',{static:false}) taskInputForm:NgForm;

  displayform(){
    this.displayTaskInput=true;
  }

  onSubmit(){
    console.log(this.taskInputForm.form.value.taskInput);
    if(this.taskInputForm.form.value.taskInput===''){
      this.taskInputInvalid=true;
    }else{
      this.isTasksArrayEmpty=false;
      this.taskInputInvalid=false;
      this.tasksArray.push({taskName:this.taskInputForm.form.value.taskInput,taskEditMode:false,taskCompleted:false});
      this.taskInputForm.reset();
    }
  }
  
  onSave(){
    //this.isTasksArrayEmpty=false;
    if(this.editIndex!==-1 && this.tasksArray[this.editIndex].taskEditMode===true && this.taskEdit){
      this.tasksArray[this.editIndex].taskName=this.taskEdit;
    }
    else{
    if(this.taskInput){
      if(this.taskInput!==''){
        
      }
    }
    }
    //this.editMode=false;
    if(this.editIndex!==-1){
    this.tasksArray[this.editIndex].taskEditMode=false;
    }
  }

  checkBoxClick(index:number){
    this.tasksArray[index].taskCompleted = !this.tasksArray[index].taskCompleted;
    setTimeout(() => this.onDelete(index),1000); 
  }

  onClear(){
    this.taskInputForm.reset();
  }
  
  onEdit(index:number){
    this.editIndex=index;
    this.tasksArray[index].taskEditMode=true;
    //this.editMode=true;
    this.taskEdit=this.tasksArray[index].taskName;
  }
  onCancel(){
    //this.editMode=false;
    this.tasksArray[this.editIndex].taskEditMode=false;
  }
  onDelete(index:number){
    this.tasksArray.splice(index,1);
    if(this.tasksArray.length===0){
      this.isTasksArrayEmpty=true;
    }
  }
  saveFile() {
    const file = new Blob([JSON.stringify(this.tasksArray, ["taskName"], 2)], {type: "application/json",});
    saveAs(file, 'todo-Tasks.json')
  }
}