import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { MyContext } from "../contexts/MyContext";
import { useMediaQuery } from 'react-responsive';
import Logo from "../assets/site-logo.png";

function Login() {
  const { toggleNav, loginUser, isLoggedIn } = useContext(MyContext);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const initialState = {
    userInfo: {
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitForm = async () => {
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.token);
      await isLoggedIn();
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = (
      <div className="ant-form-explain error-msg">
        {state.errorMsg}
      </div>
    );
  }
  if (state.successMsg) {
    successMsg = (
      <div className="ant-form-explain success-msg">
        {state.successMsg}
      </div>
    );
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
        title="Login"
        bordered={false}
        style={{
          width: 350,


        }}
      >
        <Form onFinish={submitForm} layout="vertical" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <Form.Item label="E-mail">
            <Input
              shape="round"
              name="email"
              type="user"
              value={state.userInfo.email}
              onChange={onChangeValue}
            />
          </Form.Item>
          <Form.Item label="Senha">
            <Input.Password name="password" value={state.userInfo.password} onChange={onChangeValue} />
          </Form.Item>
          {errorMsg}
          {successMsg}
          <Button shape="round" type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form>
        <Button shape="round" onClick={toggleNav} variant="outlined" style={{ width: '100%' }}>
          Cadastrar
        </Button>
      </Card>
    </div>

  );
}

export default Login;
