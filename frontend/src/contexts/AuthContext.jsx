// import React, { createContext, useEffect, useState, useContext } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [isAuthenticated, setAuthenticated] = useState(false);
//     const [loading,setLoading]=useState(true);

//     useEffect(() => {
//         const storedData = localStorage.getItem('dotconnectoken');
//         try {
//             const parsedData = storedData && JSON.parse(storedData);
//             if (parsedData) {
//                 console.log(parsedData);
                
//                 const { userToken } = parsedData;
//                 setToken(userToken);
//                 // setUserData(user);
//                 setAuthenticated(true);
//             }
//         } catch (error) {
//             console.error('Failed to parse stored token data:', error);
//         }
//         setLoading(false);
//     }, []);

//     const login = (newToken, newData) => {
//         const dataToStore = JSON.stringify({ userToken: newToken, user: newData });
//         localStorage.setItem('dotconnectoken', dataToStore);

//         setToken(newToken);
//         setUserData(newData);
//         setAuthenticated(true);
//     };

//     const logout = () => {
//         localStorage.removeItem('dotconnectoken');
//         setToken(null);
//         setUserData(null);
//         setAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider
//             value={{ token, isAuthenticated, login, logout, userData }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useEffect, useState, useContext, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
 
const AuthContext = createContext(null);
 
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const storedData = localStorage.getItem('dotconnectoken');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && parsedData.userToken) {
          const decodedData = jwtDecode(parsedData.userToken);
          setToken(parsedData.userToken);
          setUserData(decodedData);
          console.log(JSON.stringify(decodedData, null, 2));
 
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to parse stored token data:', error);
        localStorage.removeItem('dotconnectoken');
      }
    }
    setLoading(false);
  }, []);
 
  const login = useCallback((newToken, newData) => {
    const dataToStore = JSON.stringify({ userToken: newToken, user: newData });
    localStorage.setItem('dotconnectoken', dataToStore);
 
    setToken(newToken);
    setUserData(newData);
    setAuthenticated(true);
  }, []);
 
  const logout = useCallback(() => {
    localStorage.removeItem('dotconnectoken');
    setToken(null);
    setUserData(null);
    setAuthenticated(false);
  }, []);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, setAuthenticated,login, logout, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
 
export const useAuth = () => useContext(AuthContext);