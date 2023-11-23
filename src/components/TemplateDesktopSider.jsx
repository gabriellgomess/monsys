import { Layout, Menu, Button, Divider, Avatar, Tooltip, Typography } from 'antd';
import { DesktopOutlined, MenuOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faHouse, faUser, faChartLine, faCircleDollarToSlot, faHeadset } from '@fortawesome/free-solid-svg-icons';
const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;
import { Link } from 'react-router-dom';
const TemplateDesktopSider = (props) => {
    const { theme, toggleMenu, theUser, getInitials, collapsed, handleLinkClick } = props
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
                            <div style={{ textAlign: 'center' }}>
                                <Title level={4}>Olá, {theUser.name}</Title>
                                <Text type="secondary">000012 - 123456789-0</Text>
                            </div>

                        )}
                        <Divider style={{ margin: '18px 0 0 0' }} />
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'fit-content' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '30px' }}>
                    <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ backgroundColor: 'transparent', fontSize: '22px', padding: '0 16px' }}>
                        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faHouse} />}>
                            <Link to={`inicio`}>Início</Link>
                        </Menu.Item>
                        <Divider style={{ marginTop: '18px' }} />
                        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faChartLine} />}>
                            <Link to={`investimentos`}>Investimentos</Link>
                        </Menu.Item>
                        <Divider style={{ marginTop: '18px' }} />
                        <Menu.Item key="3" icon={<FontAwesomeIcon icon={faCircleDollarToSlot} />}>
                            <Link to={`investir`}>Investir</Link>
                        </Menu.Item>
                        <Divider style={{ marginTop: '18px' }} />
                        <Menu.Item style={{ position: 'absolute', bottom: '76px', left: '-4px', textAlign: 'center', width: '100%', borderRadius: '0' }} key="4" icon={<FontAwesomeIcon icon={faUser} />}>
                            <Link to={`perfil`}>Minha Conta</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '30px', textAlign: 'center', width: '100%', color: '#fff', height: '50px', backgroundColor: '#ffb450', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={4}><FontAwesomeIcon icon={faHeadset} /> {!collapsed && 'Atendimento'}</Title>
            </div>
            <div onClick={toggleMenu} style={{ position: 'absolute', bottom: '0px', textAlign: 'center', width: '100%', color: '#fff', height: '30px', backgroundColor: theme.token.colorBgMenusDark, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    {collapsed ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronLeft} />}
                </div>
            </div>
        </Sider>
    )

}

export default TemplateDesktopSider