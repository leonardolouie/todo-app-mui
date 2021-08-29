import TodoList from 'components/TodoList';
import Container from 'components/Container';
import { useLocalStorage } from 'react-use';
import { Todo } from 'models/todo';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import { Toast } from 'components/Toast';
import { getComments } from 'service/api.service';
import Typography from '@material-ui/core/Typography';

const TodoPage = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoInput, setTodoInput] = useState<string>('');
  const [todoUpdateInput, setTodoUpdateInput] = useState<string>('');
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenModalSyncing, setIsOpenModalSyncing] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const addTodo = () => {
    if (todoInput) {
      const todosArray = todos || [];
      todosArray.push({
        id: todos?.length ? todos?.length + 1 : 0,
        title: todoInput,
        created_at: new Date()
      });
      setTodos(todosArray);
      setTodoInput('');
      Toast.info('Succesfully added new todo');
    } else Toast.error('Please fill up add new todo field');
  };

  const removeTodo = (id: number) => {
    const todosArray = todos || [];
    const findIndex = todosArray?.findIndex(val => val?.id === id) || 0;
    todosArray?.splice(findIndex, 1);
    setTodos(todosArray);
    Toast.info('Succesfully removed selected todo');
  };

  const toggleTodo = (id: number) => {
    const todosArray = todos || [];
    const findIndex = todosArray?.findIndex(val => val?.id === id) || 0;
    todosArray[findIndex].completed = !todosArray[findIndex].completed;
    if (todosArray[findIndex].completed)
      Toast.info('Succesfully mark as done selected todo');
    else Toast.info('Succesfully mark as undone selected todo');
    setTodos(todosArray);
  };

  const closeModal = () => {
    setSelectedTodo(undefined);
    setIsOpenUpdateModal(false);
  };

  const updateTodo = () => {
    if (todoUpdateInput) {
      const todosArray = todos || [];
      const findIndex =
        todosArray?.findIndex(val => val?.id === selectedTodo?.id) || 0;
      todosArray[findIndex].title = todoUpdateInput;
      todosArray[findIndex].created_at = new Date();
      setTodos(todosArray);
      Toast.info('Succesfully update selected todo');
      closeModal();
    } else Toast.error('Please fill up add update todo field');
  };

  useEffect(() => {
    if (selectedTodo?.title) {
      setIsOpenUpdateModal(true);
      setTodoUpdateInput(selectedTodo?.title);
    }
  }, [selectedTodo]);

  useEffect(() => {
    setIsOpenModalSyncing(true);
    const timer = setTimeout(() => {
      try {
        getComments().then(() => {
          setIsOpenModalSyncing(false);
          const d = Math.random();
          if (d < 0.8) Toast.info('Request successfully');
          else
            Toast.error(
              'Something went wrong, Mock server randomly rejects 20% of time'
            );
        });
      } catch (e) {
        Toast.error('Something went wrong');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Modal isOpen={isOpenModalSyncing}>
        <Box width="400px" alignItems="center" padding="2%">
          <Typography variant="h5"> Syncing server please wait...</Typography>
        </Box>
      </Modal>
      <Modal isOpen={isOpenUpdateModal} onClose={() => closeModal()}>
        <Box width="400px" alignItems="center" padding="2%">
          <TextField
            fullWidth
            placeholder="Update todo"
            value={todoUpdateInput}
            onChange={e => setTodoUpdateInput(e?.target?.value)}
          />
          <Box display="flex" justifyContent="flex-end" mt="2%">
            <Button
              size="large"
              style={{ color: '#ffff', marginLeft: '2%' }}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon style={{ color: '#ffff' }} />}
              onClick={() => updateTodo()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
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
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        setSelectedTodo={setSelectedTodo}
      />
    </Container>
  );
};

export default TodoPage;
