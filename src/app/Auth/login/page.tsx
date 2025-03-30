
'use client'; 
import supabase from '../../../lib/supabase';

import Auth from '../../../components/Authentification';

export default function Connexion() {
  return (
    <div>
      <h1>Page de connexion</h1>
      <Auth /> 
    </div>
  );
}
