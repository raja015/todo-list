
import { Component, Input, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import {AppCookieService} from '../app-cookie.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo:TodoService;

  TaskList:any[];
  TagList:any[];
  todoTagList:any[]=[];
  showTodoTagList:any[]=[];
  displayForm:boolean=false;
  displayUpdate:boolean=false;
  displaySave:boolean=true;
  invalidForm:boolean=true;
  task:string;
  taskDiscription:string;
  tagTitle:string="";
  filterTaskList:any[]=[];

  currentIndex=null;
  taskreflen:any;

  constructor(private http: HttpClient,todoService:TodoService,private router:Router,private cookie : AppCookieService) {
    this.todo=todoService;
  }

  ngOnInit(): void {
     this.getAllTask();
  }

  add(){
    // this.TaskList.push({
    //   title:this.task,
    //   discription:this.taskDiscription
    // });
    // console.log(this.todo.title);
    // this.task="";
    // this.taskDiscription="";

    this.todo.create(
      {
        title:this.task,
        description:this.taskDiscription,
        Tag:this.todoTagList,
        User:"6053701ed87ea12dac7071c7"
      }
    ).subscribe(data =>{ this.getAllTask();
      this.task="";
      this.taskDiscription="";
      this.todoTagList=[];
      this.showTodoTagList=[];
    }  );
  }

  formValidatiom(){
    console.log(this.task);
    console.log(this.invalidForm);
    if(this.task.length>=3){
      this.invalidForm=false;
    }
    else
    this.invalidForm=true;

    console.log(this.task);
    console.log(this.invalidForm);
  }

  clear(i:number){
    // this.TaskList.splice(i,1);

    this.todo.delete(this.TaskList[i]._id
      ).subscribe(data=>{this.getAllTask()});
  }

  edit(i:number){

    this.task=this.TaskList[i].title;
    this.taskDiscription=this.TaskList[i].description;
    this.todoTagList=this.TaskList[i].Tag;
    for(var index=0;index<this.todoTagList.length;index++){
      for(var jIndex=0;jIndex<this.TagList.length;jIndex++){
        if(this.todoTagList[index]==this.TagList[jIndex]._id){
          this.showTodoTagList.push(this.TagList[jIndex].title)

          console.log(this.todoTagList);
          console.log(this.showTodoTagList);
        }
      }
    }
    console.log(this.TaskList[i].Tag);
    this.currentIndex=i;
    this.displayUpdate=true;
    this.displaySave=false;
    this.displayForm=true;
  }

  update(){
    this.TaskList[this.currentIndex].title=this.task;
    this.TaskList[this.currentIndex].discription=this.taskDiscription;
    this.TaskList[this.currentIndex].Tag= this.todoTagList;
    this.todo.update(
      this.TaskList[this.currentIndex]._id,
      {
        title:this.task,
        description:this.taskDiscription,
        Tag:this.todoTagList
      }
    ).subscribe(data=>{this.getAllTask();
    this.task="";
    this.taskDiscription="";
    this.todoTagList=[];
    this.showTodoTagList=[];

    });
    console.log(this.TaskList[this.currentIndex]._id);
      this.getAllTask();
      console.log(this.TaskList[this.currentIndex]._id,"after");

    this.currentIndex=null;

    this.displaySave=true;
    this.displayUpdate=false;


    console.log(this.TaskList);
  }

  openForm(){
    this.displayForm=true;
  }

  closeForm(){
    this.displayForm=false;
    this.todoTagList=[]
    this.showTodoTagList=[];
    this.clearForm();
  }

  clearForm(){
    this.task="";
    this.taskDiscription="";
  }

  getAllTask(){
    this.todo.getAll().subscribe(data => {this.TaskList=data });
    this.todo.getAllTags().subscribe(data =>{this.TagList=data})

  }

  showTagsList(index:number){

    this.filterTaskList=[];
    for(var i=0;i<this.TaskList.length;i++){
      for(var j=0;j<this.TaskList[i].Tag.length;j++){
        if(this.TaskList[i].Tag[j] == this.TagList[index]._id){
          this.filterTaskList.push(this.TaskList[i]);
        }
      }
    }
     console.log(this.TaskList);
     console.log(this.TagList[index]._id);
    console.log(this.TaskList[index].Tag);
    console.log(this.filterTaskList);
  }


  addTag(){

    if(this.tagTitle!=""){
      this.todo.createTag({title:this.tagTitle})
      .subscribe(data =>{ this.getAllTask(); // update get allTag
        this.tagTitle="";
      }  );
    }
    else{
      alert("tag cant be empty");
    }
    this.tagTitle="";
  }

  addTagInTodo(index:number){
    for(var i=0;i<this.showTodoTagList.length;i++){
      if(this.showTodoTagList[i]==this.TagList[index].title){
        alert("cant add same tags");
        return;
      }
    }
    this.todoTagList.push(this.TagList[index]._id);
    this.showTodoTagList.push(this.TagList[index].title);
    console.log(this.todoTagList);
  }

  deleteTagInTodo(index:number){
    this.showTodoTagList.splice(index,1);
    this.todoTagList.splice(index,1);
    console.log(this.showTodoTagList)
  }

  logout(){
    console.log("lo");
    console.log("logout",jwt_decode(this.cookie.get("token")))
    this.cookie.set("token",null);
    console.log(this.cookie.get("token"));
    this.router.navigate(['/login']);
  }

  // check(){
  //   const cool=this.cookie.get("token");
  //   this.jwt_Token.setToken(cool);
  //   console.log("get",this.jwt_Token.getDecodeToken());
  // }

}
