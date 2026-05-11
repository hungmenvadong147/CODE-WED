import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import { api } from './services/api';
import { SiteData } from './types';

function App() {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getData();
      setSiteData(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối server.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContact = async (phone: string, email: string) => {
    try {
      await api.updateContact(phone, email);
      if (siteData) {
        setSiteData({
          ...siteData,
          contact: { phone, email }
        });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật liên hệ:', error);
      alert('Không thể cập nhật thông tin liên hệ');
    }
  };

  const handleUpdateGalleryImage = async (id: string, data: any) => {
    try {
      await api.updateGalleryImage(id, data);
      if (siteData) {
        const updatedGallery = siteData.gallery.map(img =>
          img.id === id ? { ...img, ...data } : img
        );
        setSiteData({ ...siteData, gallery: updatedGallery });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật gallery:', error);
      alert('Không thể cập nhật hình ảnh');
    }
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    try {
      return await api.uploadImage(file);
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="error-state">
        <p>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
        <button className="btn btn-primary" onClick={loadData}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                siteData={siteData}
                isAdmin={isAdmin}
                onToggleAdmin={() => setIsAdmin(!isAdmin)}
                onUpdateContact={handleUpdateContact}
                onUpdateGallery={handleUpdateGalleryImage}
                onUploadImage={handleUploadImage}
              />
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <CoursePage
                isAdmin={isAdmin}
                contact={siteData.contact}
                onUpdateContact={handleUpdateContact}
                gallery={siteData.gallery}
                onUpdateGallery={handleUpdateGalleryImage}
                onUploadImage={handleUploadImage}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
