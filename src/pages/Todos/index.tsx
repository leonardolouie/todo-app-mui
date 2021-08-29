import TodoList from 'components/TodoList';
import Container from 'components/Container';
import { useLocalStorage } from 'react-use';
import { Todo } from 'models/todo';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';

const TodoPage = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoInput, setTodoInput] = useState<string>('');

  const addTodo = () => {
    const todosArray = todos || []
    todosArray.push({
      id: todos?.length ? todos?.length + 1 : 0,
      title: todoInput,
      created_at: new Date()
    })
    setTodos(todosArray);
    setTodoInput('')
  };

  const removeTodo = (id: number) => {
    const todosArray = todos || []
    const findIndex = todosArray?.findIndex(val => val?.id === id) || 0
    todosArray?.splice(findIndex, 1)
    setTodos(todosArray)
  }

  const toggleTodo = (id: number) => {
    const todosArray = todos || []
    const findIndex = todosArray?.findIndex(val => val?.id === id) || 0
    todosArray[findIndex].completed = !todosArray[findIndex].completed
    setTodos(todosArray)
  }

  const updateTodo = (id: number, title: string) => {
    const todosArray = todos || []
    const findIndex = todosArray?.findIndex(val => val?.id === id) || 0
    todosArray[findIndex].title = title
    setTodos(todosArray)
  }


  return (
    <Container>
      <Box display="flex" flexDirection="row" padding="2% 1%">
        <TextField
          fullWidth
          placeholder="Add new todo"
          value={todoInput}
          onChange={e => setTodoInput(e?.target?.value)}
        />
        <Button
          size="large"
          style={{ color: '#ffff', marginLeft: '2%' }}
          variant="contained"
          color="primary"
          startIcon={<AddIcon style={{ color: '#ffff' }} />}
          onClick={() => addTodo()}
        >
          ADD
        </Button>
      </Box>
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </Container>
  );
};

export default TodoPage;
