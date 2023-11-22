import { Layout, Menu, Button, Divider, Avatar, Tooltip } from 'antd';
import { DesktopOutlined, MenuOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faArrowTrendUp, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const { Header, Sider, Content, Footer } = Layout;
import { Link } from 'react-router-dom';
const TemplateDesktopSider = (props) => {
    const { theme, toggleMenu, theUser, getInitials, collapsed, handleLinkClick  } = props
    return (
        <Sider
            style={{ backgroundColor: theme.token.colorBgMenus, borderRight: '1px solid lightgrey' }}
            collapsed={collapsed}
            width={250}
        >
            <div style={{ height: '100px' }}>
                {theUser && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
                        {collapsed ? (
                            <Tooltip title={theUser.name} placement="right">
                                <Avatar
                                    style={{
                                        backgroundColor: theme.token.colorPrimary,
                                    }}
                                >{getInitials(theUser.name)}</Avatar>
                            </Tooltip>
                        ) : (
                            <h3 style={{ lineHeight: '1', margin: '0' }}>Olá, {theUser.name}</h3>
                        )}
                        <Divider style={{ margin: '18px 0 0 0' }} />
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'fit-content' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '30px' }}>
                    <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ backgroundColor: 'transparent' }}>
                        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faArrowTrendUp} />}>
                            <Link to={`investimentos`}>Investimentos</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faUser} />}>
                            <Link to={`perfil`}>Perfil</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: '10px', textAlign: 'center', width: '100%' }}>
                <Button type="primary" onClick={toggleMenu}>
                    {collapsed ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronLeft} />}
                </Button>
            </div>
        </Sider>
    )

}

export default TemplateDesktopSider