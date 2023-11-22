import { Layout, Menu, Button, Divider, Avatar, Tooltip } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Logo from "../assets/site-logo.png";
import Euro from '../assets/european-union.png';
import Dolar from '../assets/united-states.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const TemplateDesktopHeader = (props) => {
    const { theme, theUser, cotacoes, logoutUser } = props
    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 20px' }}>
            <div style={{ display: 'flex' }}>
                {cotacoes['USDBRL'] && (
                    <span style={{ marginRight: 20, display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <img width={20} src={Dolar} alt="" />
                        {parseFloat(cotacoes['USDBRL'].bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}
                    </span>
                )}
                {cotacoes['EURBRL'] && (
                    <span style={{ marginRight: 20, display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <img width={20} src={Euro} alt="" />
                        {parseFloat(cotacoes['EURBRL'].bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}
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
    )

}

export default TemplateDesktopHeader