import { Layout, Menu, Button, Divider, Avatar, Tooltip, Badge } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Logo from "../assets/site-logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const TemplateMobileHeader = (props) => {
    const { theme, toggleMenu, theUser, cotacoes, logoutUser } = props
    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '90px' }}>
            <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={toggleMenu}
                style={{ marginLeft: 10 }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <img width={60} src={Logo} alt="" />
            </div>
            <div style={{ marginRight: '15px' }}>
                <Badge count={5}  size="small">
                    <FontAwesomeIcon style={{ fontSize: '25px', color: '#fff' }} icon={faBell} />
                </Badge>
            </div>
        </div>

    )

}

export default TemplateMobileHeader