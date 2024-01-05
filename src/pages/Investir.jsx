import React, { useState } from "react"
import { Typography, Select, Form, Input, Button, Modal, QRCode, Alert, message } from "antd"
const { Title, Text } = Typography;
import Logo from '../assets/site-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPix } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { CurrencyInput } from 'react-currency-mask';

const Investir = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [codPix, setCodPix] = useState('https://monbank.net/'); //Estado para armazenar o código pix 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [debenture, setDebenture] = useState(''); //Estado para armazenar a debenture selecionada
    const [valor, setValor] = useState(''); //Estado para armazenar o valor a ser investido
    const [messageApi, contextHolder] = message.useMessage();
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Todos os dados devem ser preenchidos!',
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeDebenture = (value) => {
        setDebenture(value);
    };

    const handleChangeValor = (e) => {
        setValor(e.target.value);
        console.log(e.target.value);
    }

    // Função para copiar o texto para a área de transferência
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setAlertMessage('Chave pix copiada para a área de transferência!');
            setAlertType('success');
            setIsAlertVisible(true);
            setInterval(() => {
                setIsAlertVisible(false);
            }, 3000);
        }).catch(() => {
            setAlertMessage('Erro ao copiar texto!');
            setAlertType('error');
            setIsAlertVisible(true);
        });
    }

    const handleInvestir = () => {
        if (debenture === '' || valor === '') {
            warning();
        } else {
            showModal();
        }
    }



    return (
        <div style={{ width: '90%', margin: '30px auto' }}>
            {contextHolder}
            <Title>Investir</Title>
            <Form layout="vertical">
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px', maxWidth: '400px' }}>
                    <Form.Item label="Debênture" style={{ flexGrow: '1' }} name="debenture" rules={[{ required: true, message: 'Por favor, selecione a debenture!' }]}>
                        <Select
                            size="large"
                            placeholder="Selecione a debenture"
                            onChange={handleChangeDebenture}
                            options={[
                                {
                                    value: 'debenture1',
                                    label: 'Debenture 1',
                                },
                                {
                                    value: 'debenture2',
                                    label: 'Debenture 2',
                                },
                                {
                                    value: 'debenture3',
                                    label: 'Debenture 3',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Valor" style={{ flexGrow: '1' }} name="valor" rules={[{ required: true, message: 'Por favor, defina um valor' }]}>
                        <CurrencyInput
                            onChangeValue={(event, originalValue, maskedValue) => {
                                handleChangeValor(event);
                            }}
                            InputElement={
                                <Input size="large" placeholder="Valor a investir" shape="round" />
                            }
                        />
                    </Form.Item>
                    <Button style={{
                        background: 'linear-gradient(225deg, rgb(255 183 72), rgb(210, 140, 34))',
                        boxShadow: '3px 5px 10px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        top: '-18px',
                        width: '100%',
                        height: '80px',
                        margin: '20px auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                        bordered={false}
                        onClick={handleInvestir}
                    >
                        <Title style={{ margin: '0' }}>Investir</Title>
                    </Button>

                </div>

            </Form>
            <Modal title={<>Pagamento por PIX <FontAwesomeIcon icon={faPix} /></>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
                    <QRCode
                        errorLevel="H"
                        value={codPix}
                        icon={Logo}
                        size="200"
                    />
                    <Button style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => copyToClipboard(codPix)}>Copiar chave PIX <FontAwesomeIcon icon={faCopy} /></Button>

                </div>
                {isAlertVisible && <Alert message={alertMessage} type={alertType} showIcon />}
            </Modal>
        </div>
    )
}

export default Investir