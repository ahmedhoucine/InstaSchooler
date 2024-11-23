import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')

export class TodoController {

constructor(){ this.todos=[]}

todos: Todo[];



@Get('test?')
getHello(@Req() req: Request): string {
return 'HELLO NEST1';
}

@Get()
    getTodos(  ){
        
    console.log('récuperer la liste des todos');
return this.todos;
}


@Get('/:id')
getTodoByIdd( @Param('id') id){
    
    const todo = this. todos. find (  (actualTodo : Todo ) => actualTodo.id === +id);
    if (todo)
    return todo;
    throw new NotFoundException( `le todo did ${id} nexiste pas`);

    }

@Get('/:year/:id/:cc')
 getparam(@Param() mesRoutesParams): string {
 return  mesRoutesParams;
 }


@Get()
    getTodosv2(  ){
        
    console.log('récuperer la liste des todos');
    response.status(205);
    response.json({
        contenu:'je suis une réponse généré par l objet response'
    })
return "la liste des todos"
}




@Post()
addTodo(@Body() newtodo : Todo){
    if (this.todos.length){
        newtodo.id=this.todos[this.todos.length-1].id+1;
        
    }
    else{
        newtodo.id=1;
    }
    this.todos.push(newtodo)
    return newtodo;
    }

@Delete()
deleteTodo(){
    
     console.log('delete todo');
    return "delete un todo"

}

@Put()
modifierTodo(){
     console.log('modifier todo');
    return "modifier un todo"

}
}