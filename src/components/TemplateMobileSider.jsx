import { Layout, Menu, Button, Divider, Avatar, Tooltip } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faArrowTrendUp, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TemplateMobileSider = (props) => {
    const { theme, toggleMenu, handleLinkClick, collapsed } = props
    
    return (
        <Sider
            style={{ backgroundColor: theme.token.colorBgMenus }}
            collapsible
            collapsed={collapsed}
            onCollapse={toggleMenu}
            collapsedWidth={0}
            width='100%'
            trigger={null}
        >
            <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
                <Menu.Item key="1" icon={<FontAwesomeIcon icon={faArrowTrendUp} />}>
                    <Link to={`investimentos`} onClick={handleLinkClick}>Investimentos</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FontAwesomeIcon icon={faUser} />}>
                    <Link to={`perfil`} onClick={handleLinkClick}>Perfil</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )

}

export default TemplateMobileSider