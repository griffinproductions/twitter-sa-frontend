import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext({
  user: null,
  errors: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const router = useRouter();

  const getSession = async () => {
    const res = await fetch('/users/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => err);
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    setErrors(null);
    setUser(data);
  };

  useEffect(() => {
    getSession();
  }, []);

  const register = async (email, password) => {
    const res = await fetch('http://localhost:81/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    setUser(data);
  };

  const login = async (email, password) => {
    const res = await fetch('http://localhost:81/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((err) => err);

    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
      return;
    }

    setErrors(null);
    setUser(data);
    console.log(data);
    router.push('/');
  };

  const logout = () => {

  };

  const context = {
    user, errors, register, login, logout,
  };

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
