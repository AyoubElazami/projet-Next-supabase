'use client'; 

import { useState } from 'react';
import supabase from '../lib/supabase';
import { useRouter } from 'next/navigation';
import '../styles/globals.css'; 


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const router = useRouter();

  async function handleSignIn() {
    setErrorMessage('');
    setSuccessMessage('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage('Bienvenue, vous êtes connecté !');
      router.push('/Acceuil');  
    }
  }

  async function handleSignUp() {
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(`Erreur : ${error.message}`);
    } else {
      setMessage('Vérifie ton email pour confirmer ton inscription.');
    }
  }

  async function checkEmailConfirmation() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      setMessage("❌ Impossible de vérifier l'utilisateur.");
      return;
    }
    if (data.user.email_confirmed_at) {
      setMessage('Inscription confirmée avec succès !');
    } else {
      setMessage("L'email n'est pas encore confirmé. Vérifie ta boîte mail.");
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">{isSignUp ? "Inscription" : "Connexion"}</h1>
      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="auth-input"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={isSignUp ? handleSignUp : handleSignIn} className="auth-button">
        {isSignUp ? "S'inscrire" : "Se connecter"}
      </button>
  
      {errorMessage && <p className="auth-message auth-error">{errorMessage}</p>}
      {successMessage && <p className="auth-message auth-success">{successMessage}</p>}
      {message && <p className="auth-message">{message}</p>}
  
      <button onClick={() => setIsSignUp(!isSignUp)} className="auth-toggle">
        {isSignUp ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
      </button>
  
      {isSignUp && (
        <div className="text-center mt-4">
          <button onClick={checkEmailConfirmation} className="auth-button">
            Vérifier l'email
          </button>
        </div>
      )}
    </div>
  );

}