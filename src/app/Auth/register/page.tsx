'use client';  

import { useState } from 'react';
import supabase from '../../../lib/supabase';
import Auth from '../../../components/Authentification';
import Link from 'next/link';

export default function Home() {

  async function checkConnection() {
    const { data, error } = await supabase.from('test').select('*');
    console.log(data, error);
  }


  checkConnection();

  return (
    <div>
      <h1>Page d'inscription</h1>
      <Auth /> 
      </div>
  );
}
