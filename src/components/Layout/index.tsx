import AppBar from 'components/AppBar';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <AppBar />
            {children}
        </>
    );
};

export default Layout;
