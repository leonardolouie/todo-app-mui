import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { Todo } from 'models/todo';
import { formatDate } from 'service/utils.service'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';

interface Props {
  todos?: Todo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "600px",
    overflow: "auto",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme?.palette.primary.light
    }
  },
  textCompleted: {
    textDecoration: 'line-through',
    color: '#E5E5E5'
  }
}));

const TodoList: React.FC<Props> = ({ todos, removeTodo, toggleTodo }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {_.orderBy(todos, 'id', 'desc')?.map((value) => {
        const labelId = `checkbox-list-label-${value?.id}`;
        return (
          <ListItem key={value?.id} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={value?.completed}
                checkedIcon={<CheckCircleIcon />}
                icon={<RadioButtonUncheckedIcon />}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                onClick={() => toggleTodo(value.id)}
              />
            </ListItemIcon>
            <div>
              <Typography
                className={`${value?.completed && classes?.textCompleted}`}
                variant="subtitle2"
              >
                {value?.title}
              </Typography>
              <Typography
                className={`${value?.completed && classes?.textCompleted}`}
                variant="caption"
              >
                <p> {formatDate(value?.created_at)}</p>
              </Typography>
            </div>
            <ListItemSecondaryAction>
              <DeleteIcon color="error" onClick={() => removeTodo(value.id)} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TodoList;
