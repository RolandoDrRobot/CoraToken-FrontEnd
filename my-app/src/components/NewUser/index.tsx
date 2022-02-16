import React from 'react';
import axios from 'axios';
import { globalContext } from '../../hooks/appContext';
import { Link, useNavigate } from 'react-router-dom';
import './main.css';

function NewUser() {
  const navigate = useNavigate();
  const { 
    setLoginStatus,
    setEmail } = React.useContext(globalContext);
  let [createUserStatus, setCreateUserStatus] = React.useState<string>('When you create an account, you agree to complain with our TOS');

  const CreateUser = async (email: string, password: string, name: string) => {
    await axios.post('http://localhost:443/createUser', { email: email, password: password, name: name }).then((response) => {
      setCreateUserStatus(response.data.status);
      if (response.data.status === 'created') {
        setLoginStatus('granted');
        setEmail(email);
        navigate('/', { replace: true });
      }
    });
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      name: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const name = target.name.value;        
    
    CreateUser(email, password, name);
  }

  return (
    <>
      <div className="new-user d-flex align-items-center">
        <div className="container d-flex justify-content-center">
          <form onSubmit={onSubmitForm}>
            <input placeholder="Email Address" name="email" type="email" />
            <input placeholder="New Password" name="password" type="password" />
            <input placeholder="What's your name?" name="name" type="text" />
            <button type="submit" className="main-button">Create User</button>
            <Link to="/" className="text-button gray text-center d-block mb-4">Go back</Link>
            <span className="alert-text">{createUserStatus}</span>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewUser;