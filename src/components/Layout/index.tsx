import AppBar from '@material-ui/core/AppBar';


interface Props {
    children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {

    return (
        <AppBar >
            {children}
        </AppBar>
    )
}

export default Layout