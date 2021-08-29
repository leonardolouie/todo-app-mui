import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { getCurrentDate } from 'service/utils.service'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold'
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subTitle1: {
    color: '#ffff'
  }
}));

const AppBarComp = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}>
            TODO APP
          </Typography>
          <Typography variant="caption" className={classes.subTitle1}>
            {getCurrentDate()}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComp;
