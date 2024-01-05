import React, { useState, useContext } from 'react';
import { MyContext } from '../contexts/MyContext';
import { Typography, Form, Input, Button, Card, notification, Modal } from 'antd';
const { Title, Text } = Typography;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faKey } from '@fortawesome/free-solid-svg-icons';

const Perfil = () => {
    const [cliente, setCliente] = useState(useContext(MyContext).dadosCliente[0]);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        handleSubmit();
        
      };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, title, description) => {
        api[type]({
            message: title,
            description: description,
        });
    };

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(newPassword)) {
            openNotificationWithIcon('error', 'Erro ao atualizar senha!', 'A senha deve conter no mínimo 8 caracteres, sendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            return false;
        }
        if (newPassword !== confirmPassword) {
            openNotificationWithIcon('error', 'Erro ao atualizar senha!', 'As senhas não coincidem.');
            return false;
        }
        // Adicione aqui qualquer outra regra ou validação necessária
        setPasswordError(""); // Limpa qualquer erro anterior
        return true;
    };

    const handleSubmit = () => {
        // Para evitar o recarregamento da página
        if (validatePassword()) {
            // Proceda com a atualização da senha ou outras ações necessárias
            openNotificationWithIcon('success', 'Atualização realizada!', 'Senha alterada com sucesso!');
            setIsModalOpen(false);
        } else {
            console.log("Erro ao atualizar senha!");
        }
    };


    return (
        <div style={{ width: '90%', margin: '30px auto' }}>
            {contextHolder}
            <Title level={2}>Dados Cadastrais</Title>
            <Form layout="vertical">
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: '300px', maxWidth: '400px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: '18px' }}>{cliente.nome}</Text>
                                <Text style={{ color: '#c8c8c8', fontSize: '14px' }}>CPF: {cliente.cpf}</Text>
                                <Text style={{ color: '#c8c8c8', fontSize: '14px' }}>Nasc: {cliente.dataNascimento.split('-').reverse().join('/')}</Text>
                            </div>
                            <Button size='small' type="primary" onClick={showModal}>
                                Alterar senha
                            </Button>
                        </div>
                        <Form.Item label="Telefone" labelCol={{ style: { fontWeight: 'bold' } }}>
                            {isEditing ? <Input placeholder="Telefone" value={cliente.telefone} onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })} /> : <Text>{cliente.telefone}</Text>}
                        </Form.Item>
                        <Form.Item label="Email" labelCol={{ style: { fontWeight: 'bold' } }}>
                            {isEditing ? <Input placeholder="Email" value={cliente.email} onChange={(e) => setCliente({ ...cliente, email: e.target.value })} /> : <Text>{cliente.email}</Text>}
                        </Form.Item>
                        <Form.Item label="Endereço" labelCol={{ style: { fontWeight: 'bold' } }}>
                            {isEditing ? <Input placeholder="Endereço" value={cliente.endereco} onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })} /> : <Text>{cliente.endereco}</Text>}
                        </Form.Item>
                    </div>
                </div>

            </Form>
            <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span>Salvar</span><FontAwesomeIcon icon={faFloppyDisk} /></div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span>Editar</span><FontAwesomeIcon icon={faPenToSquare} /></div>
                )}
            </Button>

            <Modal title={<>Alterar senha <FontAwesomeIcon icon={faKey} /></>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form layout="vertical">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginBottom: '20px'
                    }}>
                        <Form.Item label="Senha Atual" labelCol={{ style: { fontWeight: 'bold' } }}>
                            <Input.Password placeholder="Senha Atual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Nova Senha" labelCol={{ style: { fontWeight: 'bold' } }}>
                            <Input.Password placeholder="Nova Senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Confirmar Senha" labelCol={{ style: { fontWeight: 'bold' } }}>
                            <Input.Password placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Item>
                        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}                       
                    </div>
                </Form>                
            </Modal>
        </div>
    );
};

export default Perfil;