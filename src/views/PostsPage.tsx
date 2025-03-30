'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../lib/supabase';
import PostForm from '../components/PostForm';
import ImageUploader from '../components/ImageUploader';
import '../styles/globals.css';

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      router.push('/Auth/login'); 
      return;
    }

    setUserId(user.id);

    const { data: profileData } = await supabase.from('profiles').select('avatar_url').eq('id', user.id).single();
    if (profileData) setAvatarUrl(profileData.avatar_url);

    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id) 
      .order('created_at', { ascending: false });

    if (postsError) {
      setError('Erreur lors du chargement des messages');
    } else {
      setPosts(postsData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title text-center">Messages</h1> 
  
      <div className="flex flex-col items-center gap-6 mb-6"> 
        {userId && (
          <div className="form-container w-full max-w-md p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
              Cliquez pour télécharger la photo de profil
            </h2>
            <ImageUploader userId={userId} onUpload={(url) => setAvatarUrl(url)} />
          </div>
        )}
  
        <div className="form-container w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Message</h2>
          <PostForm onPostCreated={(newPost) => setPosts((prevPosts) => [newPost, ...prevPosts])} />
        </div>
      </div>
  
      {error && <p className="error-message">{error}</p>}
  
      <div className="flex flex-col items-center">
        {posts.length === 0 ? (
          <p className="text-center text-black">Aucun message à afficher</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post w-full max-w-md p-6 rounded-lg shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <img
                src={avatarUrl || '/default-avatar.png'}
                alt="Avatar"
                className="w-12 h-12 rounded-full mx-auto"
              />
              <div className="post-content text-center mt-2">
                <p className="text-gray-800">{post.content}</p>
                <small className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
