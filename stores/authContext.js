import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext({
  user: null,
  errors: {},
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const getSession = async () => {
    const res = await fetch('http://localhost:81/users/session', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch((err) => err);
    const data = await res?.json();
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    console.log(data);
    setErrors(null);
    setUser(data);
  };

  useEffect(() => {
    getSession();
  }, []);

  const register = async (email, password) => {
    const res = await fetch('http://localhost:81/users/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
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
    router.push('/registerSuccess');
  };

  const login = async (email, password) => {
    const res = await fetch('http://localhost:81/users/login', {
      method: 'POST',
      credentials: 'include',
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

  const logout = async () => {
    const res = await fetch('http://localhost:81/users/logout', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => err);
    const data = await res.json();
    if (data?.errors) {
      setErrors(data.errors);
      return;
    }

    setErrors(null);
    setUser(data);
    router.push('/');
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
