import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu, Button, Divider, Avatar, Tooltip, Card, Typography } from 'antd';
import { DesktopOutlined, MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import Logo from "../assets/site-logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faArrowTrendUp, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../contexts/MyContext';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

import Investimentos from './Investimentos';
import Perfil from './Perfil';
import TemplateDesktopHeader from '../components/TemplateDesktopHeader';
import TemplateMobileHeader from '../components/TemplateMobileHeader';
import TemplateSubHeaderMobile from '../components/TemplateSubHeaderMobile';
import TemplateDesktopSider from '../components/TemplateDesktopSider';
import TemplateMobileSider from '../components/TemplateMobileSider';


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
    try {
      const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
      setCotacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    }
  };

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
      <Header style={{ background: theme.token.colorBgMenusDark, padding: 0, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: isMobile ? '90px' : '70px' }}>
        {isMobile ? (
          <>
            <TemplateMobileHeader
              theme={theme}
              toggleMenu={toggleMenu}
              theUser={theUser}
              cotacoes={cotacoes}
              logoutUser={logoutUser}
            />
          </>

        ) : (
          <TemplateDesktopHeader
            theme={theme}
            theUser={theUser}
            logoutUser={logoutUser}
            toggleMenu={toggleMenu}
            collapsed={collapsed}
            cotacoes={cotacoes}
          />
        )}
      </Header>

      <Layout>        
        {isMobile ? (
          <TemplateMobileSider
            theme={theme}
            collapsed={collapsed}
            toggleMenu={toggleMenu}
            handleLinkClick={handleLinkClick}
          />
        ) : (
          <TemplateDesktopSider
            theme={theme}
            collapsed={collapsed}
            toggleMenu={toggleMenu}
            handleLinkClick={handleLinkClick}
            getInitials={getInitials}
            theUser={theUser}
          />
        )}
        <Layout>
          <Content>
            <>              
              <Routes>
                <Route path={`investimentos`} element={<Investimentos cotacoes={cotacoes} theUser={theUser} isMobile={isMobile} collapsed={collapsed} theme={theme} />} />
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
