import { Layout, Menu, Button, Divider, Avatar, Tooltip } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faArrowRightFromBracket, faChartLine, faCircleDollarToSlot, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TemplateMobileSider = (props) => {
    const { theme, toggleMenu, handleLinkClick, collapsed, logoutUser } = props

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
            <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ backgroundColor: 'transparent', height: '86%', fontSize: '22px', padding: '18px 16px' }}>
                <Menu.Item key="1" icon={<FontAwesomeIcon icon={faHouse} />} onClick={handleLinkClick} title=''>
                    <Link to={`inicio`}>Início</Link>
                </Menu.Item>
                <Divider style={{ marginTop: '18px' }} />
                <Menu.Item key="2" icon={<FontAwesomeIcon icon={faChartLine} />} onClick={handleLinkClick} title=''>
                    <Link to={`investimentos`}>Investimentos</Link>
                </Menu.Item>
                <Divider style={{ marginTop: '18px' }} />
                <Menu.Item key="3" icon={<FontAwesomeIcon icon={faCircleDollarToSlot} />} onClick={handleLinkClick} title=''>
                    <Link to={`investir`}>Investir</Link>
                </Menu.Item>
                <Divider style={{ marginTop: '18px' }} />
                <Menu.Item key="4" icon={<FontAwesomeIcon icon={faUser} />} onClick={handleLinkClick} title=''>
                    <Link to={`perfil`}>Minha Conta</Link>
                </Menu.Item>
            </Menu>
            <div
                style={{
                    backgroundColor: '#ffb450',
                    height: '7%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    gap: '10px',
                    cursor: 'pointer'
                }}
            >
                Atendimento <FontAwesomeIcon icon={faHeadset} />
            </div>
            <div
                style={{
                    backgroundColor: theme.token.colorBgMenusDark,
                    height: '7%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    gap: '10px',
                    cursor: 'pointer'
                }}
                onClick={logoutUser}
            >
                Sair <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </div>
        </Sider>
    )

}

export default TemplateMobileSider