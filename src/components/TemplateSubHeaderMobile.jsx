import Euro from '../assets/european-union.png';
import Dolar from '../assets/united-states.png';
const TemplateSubHeaderMobile = (props) => {
    const { cotacoes, theUser } = props
    return (

            <div style={{ background: '#393939', display: 'flex', justifyContent: 'space-between', padding: '10px', height: '90px', color: '#fff' }}>
                {theUser && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
                        <h4 style={{ lineHeight: '1', margin: '0', color: 'white' }}>Olá, {theUser.name}</h4>
                    </div>
                )}
                <div style={{ display: 'flex', marginRight: '15px', fontSize: '10px' }}>
                    {cotacoes['USDBRL'] && (
                        <span style={{ marginRight: 10, display: 'flex', alignItems: 'center', gap: '5px'}}>
                            <img width={20} src={Dolar} alt="" />
                            <p style={{ lineHeight: '1.6' }}>{parseFloat(cotacoes['USDBRL'].bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}</p>
                        </span>
                    )}
                    {cotacoes['EURBRL'] && (
                        <span style={{ marginRight: 10, display: 'flex', alignItems: 'center', gap: '5px'}}>
                            <img width={20} src={Euro} alt="" />
                            <p style={{ lineHeight: '1.6' }}>{parseFloat(cotacoes['EURBRL'].bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}</p>
                        </span>
                    )}
                </div>

            </div>
          



    )
}
export default TemplateSubHeaderMobile