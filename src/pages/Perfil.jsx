import React, { useState } from 'react';
import { Typography, Form, Input, Button, Card, notification } from 'antd';
const { Title, Text } = Typography;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faKey } from '@fortawesome/free-solid-svg-icons';

const Perfil = () => {
    const [isEditing, setIsEditing] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault(); // Para evitar o recarregamento da página
        if (validatePassword()) {
            // Proceda com a atualização da senha ou outras ações necessárias
            openNotificationWithIcon('success', 'Atualização realizada!', 'Senha alterada com sucesso!');
        } else {
            console.log("Erro ao atualizar senha!");
        }
    };


    const [cliente, setCliente] = useState({
        nome: 'Gabriel Gomes',
        cpf: '123.456.789-00',
        dataNascimento: '1990-01-01',
        telefone: '(11) 99999-9999',
        email: 'gabriel.gomes@outlook.com',
        endereco: 'Rua Gilberto Ferraz, 340',
        senha: '123456'
    });

    return (
        <div style={{ width: '90%', margin: '30px auto' }}>
            {contextHolder}
            <Title level={2}>Dados Cadastrais</Title>
            <Form layout="vertical">
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: '300px', maxWidth: '400px' }}>
                        <Form.Item label="Nome" labelCol={{ style: { fontWeight: 'bold' } }}>
                            {isEditing ? <Input placeholder="Nome" value={cliente.nome} onChange={(e) => setCliente({ ...cliente, nome: e.target.value })} /> : <Text>{cliente.nome}</Text>}
                        </Form.Item>
                        <Form.Item label="CPF" labelCol={{ style: { fontWeight: 'bold' } }}>
                            {isEditing ? <Input placeholder="CPF" value={cliente.cpf} onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })} /> : <Text>{cliente.cpf}</Text>}
                        </Form.Item>
                        <Form.Item label="Data de Nascimento" labelCol={{ style: { fontWeight: 'bold' } }}>
                            {isEditing ? <Input placeholder="Data de Nascimento" type='date' value={cliente.dataNascimento} onChange={(e) => setCliente({ ...cliente, dataNascimento: e.target.value })} /> : <Text>{cliente.dataNascimento.split('-').reverse().join('/')}</Text>}
                        </Form.Item>
                    </div>
                    <div style={{ minWidth: '300px', maxWidth: '400px' }}>
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
                    <div style={{ minWidth: '300px', maxWidth: '400px' }}>
                        <Card title={<>Alterar senha <FontAwesomeIcon icon={faKey} /></>} bordered={false} style={{ width: 300 }}>
                            <Form>
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
                                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                        Salvar
                                    </Button>
                                </div>

                            </Form>

                        </Card>
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

        </div>
    );
};

export default Perfil;