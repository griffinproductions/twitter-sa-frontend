/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '../stores/authContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="container">
      <nav>
        <h1>Twitter SA</h1>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          {!user && <li className="btn"><Link href="/login"><a>Login/Register</a></Link></li>}
          {user && (
            <>
              <li>
                Hello,
                { user.name}
              </li>
              <li><button type="button" onClick={logout}>Log Out</button></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
