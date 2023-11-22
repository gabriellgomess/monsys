import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import MyContextProvider, { MyContext } from "./contexts/MyContext";
import ptBR from "antd/locale/pt_BR"
import { StyleProvider } from '@ant-design/cssinjs';

// Pages
import Home from "./pages/Home";
import Template from "./pages/Template";

// Layout components
const { Content } = Layout;

function WithAuthentication({ children }) {
  const { rootState } = useContext(MyContext);
  const { isAuth } = rootState;
  return isAuth ? (
    children
  ) : (
    <Navigate to={`${import.meta.env.VITE_REACT_APP_PATH}`} replace />
  );
}

const theme = {
  token: {
    colorPrimary: "#C48320",
    colorSuccess: "#38a900",
    colorWarning: "#ffdd00",
    colorError: "#f67c7e",
    colorInfo: "#e9434b",
    colorTextBase: "#313131",
    colorBgMenus: "#F5F6F9",
    colorBgMenusDark: "#323232",
    borderRadius: '15px'
  },
};

const App = () => {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={theme} locale={ptBR}>
        <MyContextProvider>
          <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ display: "flex", justifyContent: "center" }}>
              <Routes>
                <Route path={`${import.meta.env.VITE_REACT_APP_PATH}`} element={<Home />} />
                <Route
                  path={`${import.meta.env.VITE_REACT_APP_PATH}*`}
                  element={
                    <WithAuthentication>
                      <Template theme={theme} />
                    </WithAuthentication>
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </MyContextProvider>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default App;
