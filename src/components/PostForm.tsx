import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

export default function PostForm({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null); 

  useEffect(() => {
   
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id); 
      } else if (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError('Utilisateur non authentifié');
      return;
    }

    if (!content.trim()) {
      setError('Le message ne peut pas être vide');
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{ content, user_id: userId }]) 
      .select()
      .single();

    if (error) {
      setError('Erreur lors de la création du message : ' + error.message);
      setSuccessMessage('');
    } else {
      setContent('');
      setError('');
      setSuccessMessage('Message publié avec succès !');
      onPostCreated(data); 
    }
  };

  return (
<div>
  <form onSubmit={handleSubmit}>
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Écrivez votre message ici..."
      required
      className="w-full p-3 bg-yellow-300 text-black border border-gray-300 rounded-lg"
    />
    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">
      Publier
    </button>
  </form>

  {error && <p style={{ color: 'red' }}>{error}</p>}
  {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
</div>

  );
}
