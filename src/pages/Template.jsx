import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu, Button, Divider, Avatar } from 'antd';
import { DesktopOutlined, MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import Logo from "../assets/site-logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faArrowTrendUp, faUser, faDollarSign, faEuroSign, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../contexts/MyContext';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const { Header, Sider, Content, Footer } = Layout;

import Investimentos from './Investimentos';
import Perfil from './Perfil';
import Euro from '../assets/european-union.png';
import Dolar from '../assets/united-states.png';


const Template = (props) => {
  const { logoutUser, rootState } = useContext(MyContext);
  const { theUser } = rootState;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [collapsed, setCollapsed] = useState(isMobile);
  const { theme } = props;
  const [cotacoes, setCotacoes] = useState({});

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const getCotacoes = async () => {
    const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
    console.log(response.data);
    setCotacoes(response.data);
  }

  useEffect(() => {
    getCotacoes();

    const intervalId = setInterval(() => {
      getCotacoes();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []); 

  function getInitials(name) {
    const parts = name.split(' ');
    const initials = parts.length > 1
      ? parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      : name.charAt(0);
    return initials.toUpperCase();
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={toggleMenu}
              style={{ marginLeft: 10 }}
            />
            {theUser && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h3>Olá, {theUser.name}</h3>
              </div>
            )}
            <div style={{ display: 'flex', marginRight: '15px' }}>
              {cotacoes['USDBRL'] && (
                <span style={{ marginRight: 20, display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <img width={20} src={Dolar} alt="" />
                  <p>{cotacoes['USDBRL'].bid}</p>
                </span>
              )}
              {cotacoes['EURBRL'] && (
                <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <img width={20} src={Euro} alt="" />
                  {cotacoes['EURBRL'].bid}
                </span>
              )}

            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 20px' }}>
            <div style={{ display: 'flex' }}>
              {cotacoes['USDBRL'] && (
                <span style={{ marginRight: 20, display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <img width={20} src={Dolar} alt="" />
                  <p>{cotacoes['USDBRL'].bid}</p>
                </span>
              )}
              {cotacoes['EURBRL'] && (
                <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <img width={20} src={Euro} alt="" />
                  <p>{cotacoes['EURBRL'].bid}</p>
                </span>
              )}

            </div>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img width={80} src={Logo} alt="" />
            </div>
            <Button onClick={logoutUser} color="primary" variant="ghost" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Sair <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Button>
          </div>

        )}
      </Header>
      <Layout>
        {isMobile ? (
          <>
            {/* ********************* MENU LATERAL (MOBILE) ********************* */}
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
                  <Link to={`${import.meta.env.VITE_REACT_APP_PATH}investimentos`} onClick={handleLinkClick}>Investimentos</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FontAwesomeIcon icon={faUser} />}>
                  <Link to={`${import.meta.env.VITE_REACT_APP_PATH}perfil`} onClick={handleLinkClick}>Perfil</Link>
                </Menu.Item>
              </Menu>
            </Sider>
          </>

        ) : (
          <>
            {/* ********************* MENU LATERAL (DESKTOP) ********************* */}
            <Sider
              style={{ backgroundColor: theme.token.colorBgMenus, borderRight: '1px solid lightgrey' }}
              collapsed={collapsed}
              width={250}
            >
              <div style={{ height: '100px' }}>
                {theUser && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
                    {collapsed ? (
                      <Avatar
                        style={{
                          backgroundColor: theme.token.colorPrimary,
                        }}
                      >{getInitials(theUser.name)}</Avatar>
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
                      <Link to={`${import.meta.env.VITE_REACT_APP_PATH}investimentos`}>Investimentos</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FontAwesomeIcon icon={faUser} />}>
                      <Link to={`${import.meta.env.VITE_REACT_APP_PATH}perfil`}>Perfil</Link>
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
          </>

        )}
        <Layout>
          {/* ********************* CONTEÚDO ********************* */}
          <Content style={{ padding: 16 }}>
            <>
              <Routes>
                <Route path={`investimentos`} element={<Investimentos />} />
                <Route path={`perfil`} element={<Perfil />} />
              </Routes>
            </>

          </Content>

        </Layout>

      </Layout>
      <Footer style={{ display: 'flex', padding: '0', height: '30px' }}>
        <div style={{ background: '#ffb450', height: '100%', flexGrow: '1' }}></div>
        <div style={{ background: '#e3a654', height: '100%', flexGrow: '1' }}></div>
        <div style={{ background: '#dfb070', height: '100%', flexGrow: '1' }}></div>
        <div style={{ background: '#edc999', height: '100%', flexGrow: '1' }}></div>
      </Footer>
    </Layout>
  );
};

export default Template;
