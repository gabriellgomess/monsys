import { useContext, useEffect, useState } from 'react'
import { MyContext } from '../contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import { Typography, Form, Input, Table, Button, Statistic, Card } from "antd";
const { Title, Text } = Typography;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Investimentos = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [filters, setFilters] = useState({ debenture: '', dataInicial: '' });
    const { dadosCliente } = useContext(MyContext);

    const columns = [
        {
            title: 'Debenture',
            dataIndex: 'debenture',
        },
        {
            title: 'Série',
            dataIndex: 'serie',
        },
        {
            title: 'Data Inicial',
            dataIndex: 'dataInicial',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
        },
    ];

    console.log(dadosCliente[0].aplicacoes);

    const [filteredData, setFilteredData] = useState(dadosCliente[0].aplicacoes);

    // Função para atualizar os filtros e aplicar a filtragem
    const handleFilter = (values) => {
        console.log(values)
        const { debenture, dataInicial } = values;
        setFilters(values); // Atualiza os valores dos filtros

        // Aplica a filtragem
        const newData = dadosCliente[0].aplicacoes.filter(item => {
            return (debenture ? item.debenture.includes(debenture) : true) &&
                (dataInicial ? item.dataInicial === dataInicial : true);
        });
        setFilteredData(newData); // Atualiza os dados filtrados
    };

    const widthValue = isMobile ? '100%' : '60%';
    const directionValue = isMobile ? 'column' : 'row';
    const gapValue = isMobile ? '0px' : '10px';
    const pageSizeValue = isMobile ? 4 : 4;


    return (
        <div style={{ width: '90%', margin: '30px auto' }}>
            <Title>Investimentos</Title>
            <Form onFinish={handleFilter}>
                <div style={{ display: 'flex', gap: gapValue, width: widthValue, flexDirection: directionValue }}>
                    <Form.Item style={{ flexGrow: '1' }} name="debenture" rules={[{ required: true, message: 'Por favor, insira a debenture!' }]}>
                        <Text>Debênture</Text>
                        <Input placeholder="Debênture" shape="round" />
                    </Form.Item>
                    <Form.Item style={{ flexGrow: '1' }} name="dataInicial" rules={[{ required: true, message: 'Por favor, insira a data inicial!' }]}>
                        <Text>Data Inicial</Text>
                        <Input type="date" placeholder="Data Inicial" shape="round" />
                    </Form.Item>
                </div>
                <Button type="primary" shape="round" >Buscar</Button>
            </Form>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '30px' }}>
                {dadosCliente[0].aplicacoes.map((item) => {
                    return (
                        <Card key={item.id} bordered={false}>
                            <Statistic
                                title={item.debenture}
                                value={item.rendimento}
                                precision={2}
                                valueStyle={{
                                    color: item.rendimento > 0 ? '#3f8600' : '#cf1322'
                                }}
                                prefix={item.rendimento > 0 ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                                suffix="%"
                            />
                            <h4>{item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                            <p>{item.serie}</p>
                        </Card>
                    )
                }
                )}
            </div>
            <Table
                style={{ marginTop: '30px' }}
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: pageSizeValue }}
            />



        </div>
    )
}

export default Investimentos;