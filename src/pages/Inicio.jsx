import React, { useState } from "react";
import { Card, Typography, Divider, Button } from "antd";
const { Title } = Typography;
import TemplateSubHeaderMobile from "../components/TemplateSubHeaderMobile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import {
    WhatsAppOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons';

const Inicio = (props) => {
    const { isMobile, collapsed, cotacoes, theUser, theme } = props
    const [isValueVisible, setIsValueVisible] = useState(false);

    const toggleVisibility = () => {
        setIsValueVisible(!isValueVisible);
    };

    return (
        <div>
            {isMobile && collapsed ? (
                <>
                    <TemplateSubHeaderMobile
                        cotacoes={cotacoes}
                        theUser={theUser}
                    />
                    <Card style={{
                        background: 'linear-gradient(225deg, rgb(255 183 72), rgb(210, 140, 34))',
                        boxShadow: '3px 5px 10px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        top: '-18px',
                        width: '70%',
                        height: '100px',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                        bordered={false}
                    >
                        <Title style={{ margin: '0' }}>Investir</Title>
                        <Title style={{ margin: '0' }} level={5}>Propaganda / Campanha</Title>

                    </Card>
                </>

            ) : null}
            {!collapsed && isMobile ? null : (
            <div style={{ width: '90%', margin: isMobile?'20px auto':'50px auto' }}>
                <Title level={2}>Aplicações</Title>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Title style={{ margin: '0' }} level={5}>Saldo atualizado em debêntures</Title>
                    <Button
                        onClick={toggleVisibility}
                        shape="circle"
                        size="small" icon={isValueVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    />
                </div>
                <Title style={{ margin: '0', color: theme.token.colorPrimary }} level={2}>
                    {isValueVisible ? 'R$ 250.000,00' : '***********'}
                </Title>

                <Divider style={{border: '1px solid grey', margin: '60px 0'}} />
                <Title level={2}>Ajuda?</Title>
                <Title style={{ margin: '0' }} level={5}>Atendimento</Title>
                <div style={{ width: '30%', maxWidth: '150px', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <WhatsAppOutlined style={{ fontSize: '20px', color: theme.token.colorPrimary, cursor: 'pointer' }} />
                    <MailOutlined style={{ fontSize: '20px', color: theme.token.colorPrimary, cursor: 'pointer' }} />
                    <PhoneOutlined style={{ fontSize: '20px', color: theme.token.colorPrimary, cursor: 'pointer' }} />
                </div>
                <Divider style={{border: '1px solid grey', margin: '60px 0'}} />
            </div>
            )}

        </div>

    );
}

export default Inicio;