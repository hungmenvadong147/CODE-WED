import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import CourseList from '../components/CourseList';
import Gallery from '../components/Gallery';
import MenuItemModal from '../components/MenuItemModal';
import { SiteData, MenuItem } from '../types';
import { api } from '../services/api';

interface HomePageProps {
  siteData: SiteData;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onUpdateContact: (phone: string, email: string) => void;
  onUpdateGallery: (id: string, data: any) => void;
  onUploadImage: (file: File) => Promise<string>;
}

const HomePage: React.FC<HomePageProps> = ({
  siteData,
  isAdmin,
  onToggleAdmin,
  onUpdateContact,
  onUpdateGallery,
  onUploadImage
}) => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  const handleCourseClick = (courseId: string) => {
    // Convert course title to URL-friendly slug
    const slug = courseId.toLowerCase().replace(/\s+/g, '-');
    navigate(`/course/${slug}`);
  };

  const handleUpdateMenuItem = async (id: string, data: Partial<MenuItem>) => {
    try {
      await api.updateMenuItem(id, data);
      if (selectedMenuItem?.id === id) {
        setSelectedMenuItem({ ...selectedMenuItem, ...data });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật menu:', error);
      alert('Không thể cập nhật menu');
    }
  };

  const handleUploadVideo = async (file: File): Promise<string> => {
    try {
      return await api.uploadVideo(file);
    } catch (error) {
      console.error('Lỗi khi upload video:', error);
      throw error;
    }
  };

  return (
    <div className="app min-h-screen flex flex-col bg-white">
      <Header
        phone={siteData.contact.phone}
        email={siteData.contact.email}
        isAdmin={isAdmin}
        onUpdate={onUpdateContact}
      />
      
      <Navigation
        menuItems={siteData.menuItems}
        onMenuClick={setSelectedMenuItem}
      />

      <main className="flex-1">
        <CourseList
          courses={siteData.courses}
          isAdmin={isAdmin}
          onCourseClick={handleCourseClick}
        />

        <Gallery
          images={siteData.gallery}
          isAdmin={isAdmin}
          onUpdate={onUpdateGallery}
          onUploadImage={onUploadImage}
        />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2024 Website Học Tập Cá Nhân. All rights reserved.
          </p>
        </div>
      </footer>

      <motion.button
        className={`fixed bottom-6 right-6 px-6 py-3 rounded-full shadow-lg font-medium transition-colors z-50 ${
          isAdmin
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-800 text-white hover:bg-gray-900'
        }`}
        onClick={onToggleAdmin}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isAdmin ? 'Tắt chế độ Admin' : 'Bật chế độ Admin'}
      >
        {isAdmin ? '🔓 Admin' : '🔒 Admin'}
      </motion.button>

      {selectedMenuItem && (
        <MenuItemModal
          item={selectedMenuItem}
          isAdmin={isAdmin}
          onClose={() => setSelectedMenuItem(null)}
          onUpdate={handleUpdateMenuItem}
          onUploadVideo={handleUploadVideo}
        />
      )}
    </div>
  );
};

export default HomePage;
