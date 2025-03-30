import { useState } from 'react';
import supabase from '../lib/supabase';

interface ImageUploaderProps {
  userId: string;
  onUpload: (url: string) => void;
}

export default function ImageUploader({ userId, onUpload }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const sanitizeFileName = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-') 
      .replace(/[^a-z0-9.-]/g, '');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif']; 
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!validExtensions.includes(fileExt || '')) {
      setError('Seuls les fichiers JPG, PNG et GIF sont autorisés.');
      return;
    }

    setIsUploading(true);
    setError('');

    const fileName = sanitizeFileName(file.name);
    const filePath = `messages/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Erreur lors du téléchargement du fichier:', uploadError.message);
      setError('Erreur lors du téléchargement.');
      setIsUploading(false);
      return;
    }

    const avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId);

    if (updateError) {
      console.error('Erreur lors de la mise à jour de l\'avatar:', updateError.message);
      setError('Erreur lors de la mise à jour de votre profil.');
    } else {
      onUpload(avatarUrl); 
    }

    setIsUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isUploading} />
      {isUploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
