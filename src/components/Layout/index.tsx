import AppBar from 'components/AppBar';
import { SnackbarProvider, SnackbarUtilsConfigurator } from 'components/Toast';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SnackbarProvider
        autoHideDuration={3000}
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
      <AppBar />
      {children}
    </>
  );
};

export default Layout;
