import NavBar from '../organismos/NavBar'
import LayoutSidenav from '../organismos/LayoutSideNav'

function AdminLayout({children}){
    return (
        <>
        <NavBar/>
        <LayoutSidenav>
            {children}
        </LayoutSidenav>
        </>
    )
}

export default AdminLayout