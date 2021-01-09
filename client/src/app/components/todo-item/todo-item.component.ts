import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/modules/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  //Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-completed': this.todo.completed,
    };

    return classes;
  }

  onToggle(todo: Todo) {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle in server
    this.todoService.toggleCompleted(todo).subscribe((todo: Todo) => {
      console.log(todo);
    });
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }
}
