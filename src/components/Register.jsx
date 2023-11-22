import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { MyContext } from "../contexts/MyContext";
import { useMediaQuery } from 'react-responsive';


function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const initialState = {
    userInfo: {
      name: "",
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  // On Submit the Registration Form
  const submitForm = async (values) => {
    const data = await registerUser(values);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
    // console.log(values);
  };

  // Show Message on Success or Error
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    <div style={{
      height: '100vh',
      clipPath: !isMobile ? 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' : '',
      background: 'grey',
      backdropFilter: 'blur(5px) saturate(180%)',
      backgroundColor: 'rgb(157 116 59 / 40%)',
      display: 'flex',
      gap: '50px',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'center',
      justifyContent: isMobile ? 'center' : 'end',
      width: '590px',
      paddingRight: isMobile ? '0px' : '50px',
    }}>
      {isMobile &&
        <img width={200} src={Logo} alt="" />
      }
      <Card
        title="Cadastro de Usuário"
        bordered={false}
        style={{
          width: 350,
        }}
      >
        <Form onFinish={() => submitForm(state.userInfo)} layout="vertical" style={{display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <Form.Item label="Nome">
            <Input
              name="name"
              required
              value={state.userInfo.name}
              onChange={(e) => setState({ ...state, userInfo: { ...state.userInfo, name: e.target.value } })}
              placeholder="Digite seu nome completo"
            />
          </Form.Item>
          <Form.Item label="Usuário">
            <Input
              name="email"
              required
              type="text"
              value={state.userInfo.email}
              onChange={(e) => setState({ ...state, userInfo: { ...state.userInfo, email: e.target.value } })}
              placeholder="Digite seu usuário"
            />
          </Form.Item>
          <Form.Item label="Senha">
            <Input.Password
              name="password"
              required
              value={state.userInfo.password}
              onChange={(e) => setState({ ...state, userInfo: { ...state.userInfo, password: e.target.value } })}
              placeholder="Digite sua senha"
            />
          </Form.Item>
          {errorMsg}
          {successMsg}          
            <Button shape="round" type="primary" htmlType="submit">
              Cadastrar
            </Button>          
        </Form>
        <div style={{width: '100%'}}>
          <Button  style={{width: '100%'}} shape="round" variant="outlined" onClick={toggleNav}>Entrar</Button>
        </div>
      </Card>
    </div>
  );
}

export default Register;
