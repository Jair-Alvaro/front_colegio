import SideBar from "../moleculas/SideBar"
import Content from "../moleculas/Content"
import FooterContent from "../moleculas/FooterContent"

function LayoutSidenav({children}){
    return(
        <div id="layoutSidenav">
                <SideBar/>
                <div id="layoutSidenav_content">
                    <Content>
                        {children}
                    </Content>
                    <FooterContent/>
                </div>    
        </div>
    )
}

export default LayoutSidenav