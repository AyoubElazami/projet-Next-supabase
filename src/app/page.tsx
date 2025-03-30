'use client';  

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  interface NavigationHandler {
    (path: string): void;
  }

  const handleNavigation: NavigationHandler = (path) => {
    router.push(path); 
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenue sur notre application de chat</h1>
      <p>Choisissez une option :</p>

      <div>
        <button
          onClick={() => handleNavigation('Auth/login')}
          style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Se connecter
        </button>

        <button
          onClick={() => handleNavigation('Auth/register')}
          style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          S'inscrire
        </button>
      </div>
    </div>
  );  
}
