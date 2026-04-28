import { useState } from 'react';
import './Gallery.css';
import { GalleryImage } from '../types';

interface GalleryProps {
  images: GalleryImage[];
  isAdmin: boolean;
  onUpdate?: (id: string, data: Partial<GalleryImage>) => void;
  onUploadImage?: (file: File) => Promise<string>;
}

const Gallery: React.FC<GalleryProps> = ({ images, isAdmin, onUpdate, onUploadImage }) => {
  const [uploading, setUploading] = useState<string | null>(null);

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage && onUpdate) {
      setUploading(id);
      try {
        const url = await onUploadImage(file);
        onUpdate(id, { url });
      } catch (error) {
        alert('Lỗi khi upload ảnh');
      } finally {
        setUploading(null);
      }
    }
  };

  return (
    <section className="gallery">
      <div className="container">
        <h2>Hình Ảnh Học Trò</h2>
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.url} alt={image.alt} />
              {isAdmin && (
                <div className="gallery-overlay">
                  <label className="upload-label">
                    {uploading === image.id ? (
                      <span>Đang upload...</span>
                    ) : (
                      <>
                        <span>📷 Thay đổi ảnh</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(image.id, e)}
                          style={{ display: 'none' }}
                        />
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
