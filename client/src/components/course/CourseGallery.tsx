import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface CourseGalleryProps {
  images: GalleryImage[];
  isAdmin: boolean;
  onUpdate: (id: string, data: any) => void;
  onUploadImage: (file: File) => Promise<string>;
}

const CourseGallery: React.FC<CourseGalleryProps> = ({
  images,
  isAdmin,
  onUpdate,
  onUploadImage
}) => {
  const [uploading, setUploading] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

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
    <>
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Hình Ảnh Học Trò
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow aspect-[4/3]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setFullscreenImage(image.url)}
                />
                
                {/* Overlay */}
                {isAdmin && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <label className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      {uploading === image.id ? (
                        <span className="text-white text-sm">Đang upload...</span>
                      ) : (
                        <>
                          <span className="text-white text-sm font-medium bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                            📷 Thay đổi ảnh
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(image.id, e)}
                            className="hidden"
                          />
                        </>
                      )}
                    </label>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
          >
            <motion.img
              src={fullscreenImage}
              alt="Fullscreen"
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourseGallery;
