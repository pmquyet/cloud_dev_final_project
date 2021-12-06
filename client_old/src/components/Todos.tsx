import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createTodo, deleteTodo, getTodos, patchTodo } from '../api/todos-api'
import Auth from '../auth/Auth'
import { CreateTodoRequest } from '../types/CreateTodoRequest'
import { Todo } from '../types/Todo'

interface Props {
  auth: Auth
  history: History
}

export const Todos: React.FC<Props> = (props) => {
  const [newTodoName, setNewToDoName] = React.useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [reRender, setReRender] = useState<Boolean>(true)

  useEffect(() => {
    async function getTodoList() {
      console.log('hi')
      const tdlist = await getTodos(props.auth.getIdToken())
      setTodos(tdlist)
    }

    getTodoList()
  }, [reRender])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewToDoName(event.target.value)
  }

  const onEditButtonClick = (todoId: string) => {
    props.history.push(`/todos/${todoId}/edit`)
  }

  const onTodoCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const dueDate = calculateDueDate()
      const td: CreateTodoRequest = {
        name: newTodoName,
        dueDate
      }
      const newTodo = await createTodo(props.auth.getIdToken(), td)
      if (newTodo !== undefined) {
        const todos_temp = [...todos, newTodo]
        setTodos(todos_temp)
        setNewToDoName('')
      }
      setReRender(!reRender)
      setNewToDoName('')
    } catch {
      alert('Todo creation failed')
    }
  }

  const onTodoDelete = async (todoId: string) => {
    try {
      await deleteTodo(props.auth.getIdToken(), todoId)
      const todo_temp = todos.filter((todo) => todo.todoId !== todoId)
      setTodos(todo_temp)
    } catch {
      alert('Todo deletion failed')
    }
  }

  const onTodoCheck = async (pos: number) => {
    try {
      const todo = todos[pos]
      await patchTodo(props.auth.getIdToken(), todo.todoId, {
        name: todo.name,
        dueDate: todo.dueDate,
        done: !todo.done
      })

      const todos_temp = update(todos, {
        [pos]: { done: { $set: !todo.done } }
      })
      setTodos(todos_temp)
    } catch {
      alert('Todo check  failed')
    }
  }

  const calculateDueDate = (): string => {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }

  return (
    <div>
      <Header as="h1">CREATE AND EDIT TODOs</Header>
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New task',
              onClick: onTodoCreate
            }}
            value={newTodoName}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>

      <Grid padded>
        {todos.length > 0
          ? todos.map((todo, pos) => {
              return (
                <Grid.Row key={todo.todoId}>
                  <Grid.Column width={1} verticalAlign="middle">
                    <Checkbox
                      onChange={() => onTodoCheck(pos)}
                      checked={todo.done}
                    />
                  </Grid.Column>
                  <Grid.Column width={10} verticalAlign="middle">
                    {todo.name}
                  </Grid.Column>
                  <Grid.Column width={3} floated="right">
                    {todo.dueDate}
                  </Grid.Column>
                  <Grid.Column width={1} floated="right">
                    <Button
                      icon
                      color="blue"
                      onClick={() => onEditButtonClick(todo.todoId)}
                    >
                      <Icon name="pencil" />
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={1} floated="right">
                    <Button
                      icon
                      color="red"
                      onClick={() => onTodoDelete(todo.todoId)}
                    >
                      <Icon name="delete" />
                    </Button>
                  </Grid.Column>
                  {todo.attachmentUrl && (
                    <Image src={todo.attachmentUrl} size="small" wrapped />
                  )}
                  <Grid.Column width={16}>
                    <Divider />
                  </Grid.Column>
                </Grid.Row>
              )
            })
          : null}
      </Grid>

      {/* {this.renderCreateTodoInput()}

        {this.renderTodos()} */}
    </div>
  )

  // renderCreateTodoInput() {
  //   return (
  //     <Grid.Row>
  //       <Grid.Column width={16}>
  //         <Input
  //           action={{
  //             color: 'teal',
  //             labelPosition: 'left',
  //             icon: 'add',
  //             content: 'New task',
  //             onClick: this.onTodoCreate
  //           }}
  //           fluid
  //           actionPosition="left"
  //           placeholder="To change the world..."
  //           onChange={this.handleNameChange}
  //         />
  //       </Grid.Column>
  //       <Grid.Column width={16}>
  //         <Divider />
  //       </Grid.Column>
  //     </Grid.Row>
  //   )
  // }

  // renderTodos() {
  //   if (this.state.loadingTodos) {
  //     return this.renderLoading()
  //   }

  //   return this.renderTodosList()
  // }

  // renderLoading() {
  //   return (
  //     <Grid.Row>
  //       <Loader indeterminate active inline="centered">
  //         Loading TODOs
  //       </Loader>
  //     </Grid.Row>
  //   )
  // }

  // renderTodosList() {
  //   return (
  //     <Grid padded>
  //       {this.state.todos.map((todo, pos) => {
  //         return (
  //           <Grid.Row key={todo.todoId}>
  //             <Grid.Column width={1} verticalAlign="middle">
  //               <Checkbox
  //                 onChange={() => this.onTodoCheck(pos)}
  //                 checked={todo.done}
  //               />
  //             </Grid.Column>
  //             <Grid.Column width={10} verticalAlign="middle">
  //               {todo.name}
  //             </Grid.Column>
  //             <Grid.Column width={3} floated="right">
  //               {todo.dueDate}
  //             </Grid.Column>
  //             <Grid.Column width={1} floated="right">
  //               <Button
  //                 icon
  //                 color="blue"
  //                 onClick={() => this.onEditButtonClick(todo.todoId)}
  //               >
  //                 <Icon name="pencil" />
  //               </Button>
  //             </Grid.Column>
  //             <Grid.Column width={1} floated="right">
  //               <Button
  //                 icon
  //                 color="red"
  //                 onClick={() => this.onTodoDelete(todo.todoId)}
  //               >
  //                 <Icon name="delete" />
  //               </Button>
  //             </Grid.Column>
  //             {todo.attachmentUrl && (
  //               <Image src={todo.attachmentUrl} size="small" wrapped />
  //             )}
  //             <Grid.Column width={16}>
  //               <Divider />
  //             </Grid.Column>
  //           </Grid.Row>
  //         )
  //       })}
  //     </Grid>
  //   )
  // }
}
