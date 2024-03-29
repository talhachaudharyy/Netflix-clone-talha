import Input from "@/components/Input";
import { useState, useCallback } from "react";
import axios from "axios";
import {signIn} from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';



const Auth = () => {
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async ()=> {
    try {
        await signIn('credentials', {
            email,
            password,
           
            callbackUrl: '/profiles'
        });
        
    } catch (error) {
        console.log(error);
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();

      
      console.log('Registration successful:', response.data);

    } catch (error) {
      console.error('Error during registration:', error);

      
      console.log('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, name, password, login]);

  

  return (
    <div className="relative h-full w-full bg-no-repeat bg-center bg-fixed bg-cover bg-[url('/images/hero.jpg')]">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-4 md:px-12 py-5 flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-12"
          />
        </nav>

        <div className="flex justify-center text-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Create an account'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>

            <button
              onClick={variant === 'login'? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? 'Registering...' : (variant === 'login' ? 'Login' : 'Sign up')}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={32} />
              </div>
              <div 
              onClick={()=> signIn('github', {callbackUrl: '/profiles'})} 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={32} />
              </div>
            </div>
            
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : "Already have an account"}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
