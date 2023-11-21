import { useContext, useEffect } from 'react'
import { MyContext } from '../contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';

// Importing the Login & Register Component
import Login from '../components/Login'
import Register from '../components/Register'

import ImageBackground from '../assets/monbank-header.jpg'

function Home() {

    const { rootState, logoutUser } = useContext(MyContext);
    const { isAuth, theUser, showLogin } = rootState;

    const isMobile = useMediaQuery({ maxWidth: 767 });

    // Hook from react-router-dom
    const navigate = useNavigate();

    useEffect(() => {
        // If user Logged in
        if (isAuth) {
            // Navigate to Dashboard
            navigate(`${import.meta.env.VITE_REACT_APP_PATH}investimentos`);
        }
    }, [isAuth, navigate]);

    // Showing Login Or Register Page According to the condition
    if (showLogin) {
        return (
            <>
                {!isMobile ?
                    <div style={{
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        backgroundImage: `url(${ImageBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '88%',
                        backgroundSize: 'cover'
                    }}>
                        <Login />
                    </div>
                    :
                    <Login />
                }

            </>

        );
    }
    else {
        return (
            <div>
                <Register />
            </div>

        );
    }
}

export default Home;
