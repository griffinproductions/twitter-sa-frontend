import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext({
  user: null,
  loading: false,
  fetching: false,
  errors: {},
  register: () => {},
  login: () => {},
  logout: () => {},
  updateFavorites: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const getSession = async () => {
    setFetching(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/session`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetching ', fetching);
        setFetching(false);
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        console.log(data);
        setErrors(null);
        setUser(data);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getSession();
  }, []);

  const register = async (email, password) => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
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
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        setErrors(null);
        setUser(data);
        router.push('/registerSuccess');
      })
      .catch((err) => err);
  };

  const login = async (email, password) => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        setErrors(null);
        setUser(data);
        console.log(data);
        router.push('/');
      })
      .catch((err) => err);
  };

  const logout = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.errors) {
          setErrors(data.errors);
          return;
        }
        setErrors(null);
        setUser(data);
        router.push('/');
      })
      .catch((err) => err);
  };

  const updateFavorites = (favorites) => {
    setUser({ ...user, favorites });
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/update/favorites`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          favorites,
        },
      }),
    }).catch((err) => err);
  };

  const context = {
    user, errors, register, login, logout, updateFavorites, loading, fetching,
  };

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
