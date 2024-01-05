import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_URL}/api/login/`,
});

const MyContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [theUser, setTheUser] = useState(null);

  useEffect(() => {
    isLoggedIn();
  }, []);


  const toggleNav = () => {
    setShowLogin(!showLogin);
  };

  const logoutUser = () => {
    localStorage.removeItem("loginToken");
    setIsAuth(false);
  };

  const registerUser = async (user) => {
    const register = await Axios.post("register.php", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return register.data;
  };

  const loginUser = async (user) => {
    const login = await Axios.post("login.php", {
      email: user.email,
      password: user.password,
    });
    return login.data;
  };

  const isLoggedIn = async () => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      Axios.defaults.headers.common["Authorization"] = "bearer " + loginToken;
      const { data } = await Axios.get("user-info.php");
      if (data.success && data.user) {
        setIsAuth(true);
        setTheUser(data.user);
      }
    }
  };

  const dadosCliente = [
    {
        nome: 'Gabriel Gomes',
        cpf: '830.290.5207',
        dataNascimento: '1983-05-12',
        telefone: '(51) 99707-3430',
        email: 'gabriel.gomes@outlook.com',
        endereco: 'Rua Gilberto Ferraz, 340',
        senha: '123456',
        aplicacoes: [
            {
                key: '1',
                debenture: 'Debenture 1',
                serie: 'Série #8',
                dataInicial: '18/01/2021',
                valor: 22000,
                rendimento: 0.05,
  
            },
            {
                key: '2',
                debenture: 'Debenture 2',
                serie: 'Série #8',
                dataInicial: '12/05/2022',
                valor: 12500,
                rendimento: 0.15,
            },
            {
                key: '3',
                debenture: 'Debenture 3',
                serie: 'Série #14',
                dataInicial: '23/04/2022',
                valor: 36500,
                rendimento: -0.10,
            },
            {
                key: '4',
                debenture: 'Debenture 1',
                serie: 'Série #14',
                dataInicial: '16/11/2021',
                valor: 11000,
                rendimento: 0.18,
            },
            {
                key: '5',
                debenture: 'Debenture 2',
                serie: 'Série #8',
                dataInicial: '18/01/2021',
                valor: 22000,
                rendimento: 0.05,
            },
            {
                key: '6',
                debenture: 'Debenture 3',
                serie: 'Série #8',
                dataInicial: '12/05/2022',
                valor: 12500,
                rendimento: 0.15,
            },
            {
                key: '7',
                debenture: 'Debenture 1',
                serie: 'Série #14',
                dataInicial: '23/04/2022',
                valor: 36000,
                rendimento: -0.10,
            },
            {
                key: '8',
                debenture: 'Debenture 2',
                serie: 'Série #14',
                dataInicial: '16/11/2021',
                valor: 18000,
                rendimento: 0.18,
            },
        ]
    }
  ];

  const total = dadosCliente[0].aplicacoes.reduce((sum, item) => sum + item.valor, 0);

  // add total in dadosCliente
  dadosCliente[0].totalDebentures = total;

  const contextValue = {
    rootState: { showLogin, isAuth, theUser },
    toggleNav,
    isLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    dadosCliente
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
