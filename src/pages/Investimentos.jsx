import { Card, Typography, Divider } from "antd";
const { Title } = Typography;
import TemplateSubHeaderMobile from "../components/TemplateSubHeaderMobile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import {
    WhatsAppOutlined,
    MailOutlined,
    PhoneOutlined
  } from '@ant-design/icons';

const Investimentos = (props) => {
    const { isMobile, collapsed, cotacoes, theUser, theme } = props
    return (
        <div>
            {isMobile && collapsed ? (
                <>
                    <TemplateSubHeaderMobile
                        cotacoes={cotacoes}
                        theUser={theUser}
                    />
                    <Card style={{
                        background: 'linear-gradient(45deg, rgba(196,131,32,1) 41%, rgba(255,154,0,1) 79%)',
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
            <div style={{ width: '90%', margin: '0 auto' }}>
                <Title>Aplicações</Title>
                <Title style={{ margin: '0' }} level={5}>Saldo atualizado em debêntures</Title>
                <Title style={{ margin: '0', color: theme.token.colorPrimary }} level={4}>R$ 250.000,00</Title>
                <Divider />
                <Title>Ajuda?</Title>
                <Title style={{ margin: '0' }} level={5}>Atendimento</Title>
                <div style={{width: '20%', display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                <WhatsAppOutlined style={{fontSize: '20px', color: theme.token.colorPrimary}} />
                <MailOutlined style={{fontSize: '20px', color: theme.token.colorPrimary}} />
                <PhoneOutlined style={{fontSize: '20px', color: theme.token.colorPrimary}} />
                </div>
                <Divider />
            </div>

        </div>

    );
}

export default Investimentos;