import { useContext, useEffect } from 'react'
import { MyContext } from '../contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import { Typography, Form, Input, Table, Button } from "antd";
const { Title, Text } = Typography;

const Investimentos = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

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

    const data = [
        {
            key: '1',
            debenture: 'Debenture 1',
            serie: 'Série #8',
            dataInicial: '18/01/2021',
            valor: 22000,           
   
        },
        {
            key: '2',
            debenture: 'Debenture 2',
            serie: 'Série #8',
            dataInicial: '12/05/2022',
            valor: 12500,
        },
        {
            key: '3',
            debenture: 'Debenture 3',
            serie: 'Série #14',
            dataInicial: '23/04/2022',
            valor: 36000,
        },
        {
            key: '4',
            debenture: 'Debenture 1',
            serie: 'Série #14',
            dataInicial: '16/11/2021',
            valor: 11000,
        },
        {
            key: '5',
            debenture: 'Debenture 2',
            serie: 'Série #8',
            dataInicial: '18/01/2021',
            valor: 22000,
        },
        {
            key: '6',
            debenture: 'Debenture 3',
            serie: 'Série #8',
            dataInicial: '12/05/2022',
            valor: 12500,
        },
        {
            key: '7',
            debenture: 'Debenture 1',
            serie: 'Série #14',
            dataInicial: '23/04/2022',
            valor: 36000,
        },
        {
            key: '8',
            debenture: 'Debenture 2',
            serie: 'Série #14',
            dataInicial: '16/11/2021',
            valor: 18000,
        },
        
    ];

    const total = data.reduce((sum, item) => sum + item.valor, 0);

    const widthValue = isMobile ? '100%' : '60%';
    const directionValue = isMobile ? 'column' : 'row';
    const gapValue = isMobile ? '0px' : '10px';
    const pageSizeValue = isMobile ? 4 : 6;

    return (
        <div style={{width: '90%', margin: '30px auto'}}>
            <Title>Investimentos</Title>
            <Form>
                <div style={{display: 'flex', gap: gapValue, width: widthValue, flexDirection: directionValue}}>                    
                    <Form.Item style={{flexGrow: '1'}} name="debenture" rules={[{ required: true, message: 'Por favor, insira a debenture!' }]}>
                        <Text>Debênture</Text>
                        <Input placeholder="Debênture" shape="round" />
                    </Form.Item>
                    <Form.Item style={{flexGrow: '1'}} name="dataInicial" rules={[{ required: true, message: 'Por favor, insira a data inicial!' }]}>
                        <Text>Data Inicial</Text>
                        <Input type="date" placeholder="Data Inicial" shape="round" />
                    </Form.Item>
                </div>
                <Button type="primary" shape="round" >Buscar</Button>    
            </Form>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end'}}>
               <Text>Total em investimentos: {total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text> 
            </div>
            
            <Table 
                style={{marginTop: '30px'}} 
                columns={columns} 
                dataSource={data}
                pagination={{ pageSize: pageSizeValue }} 
            />
        </div>
    )
}

export default Investimentos;