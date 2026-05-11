import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '../store/courseStore';
import { mockCourses } from '../data/mockCourses';
import CourseSidebar from '../components/course/CourseSidebar';
import LessonCard from '../components/course/LessonCard';
import LessonEditor from '../components/course/LessonEditor';
import CourseGallery from '../components/course/CourseGallery';
import Header from '../components/Header';

interface CoursePageProps {
  isAdmin: boolean;
  contact: { phone: string; email: string };
  onUpdateContact: (phone: string, email: string) => void;
  gallery: any[];
  onUpdateGallery: (id: string, data: any) => void;
  onUploadImage: (file: File) => Promise<string>;
}

const CoursePage: React.FC<CoursePageProps> = ({
  isAdmin,
  contact,
  onUpdateContact,
  gallery,
  onUpdateGallery,
  onUploadImage
}) => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { currentCourse, setCurrentCourse, addLesson, updateLesson, deleteLesson } = useCourseStore();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  useEffect(() => {
    if (courseId && mockCourses[courseId]) {
      setCurrentCourse(mockCourses[courseId]);
    } else {
      navigate('/');
    }
  }, [courseId, setCurrentCourse, navigate]);

  const handleAddLesson = () => {
    const newLesson = {
      id: `lesson-${Date.now()}`,
      title: 'Bài học mới',
      content: '<p>Nội dung bài học...</p>',
      titleColor: '#1b5e20',
      titleFont: 'Times New Roman',
      titleSize: '24px',
      order: (currentCourse?.lessons.length || 0) + 1,
      media: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addLesson(newLesson);
    setEditingLessonId(newLesson.id);
    setIsAddingLesson(false);
  };

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header giữ nguyên */}
      <Header
        phone={contact.phone}
        email={contact.email}
        isAdmin={isAdmin}
        onUpdate={onUpdateContact}
      />

      {/* Main Content - 2 cột */}
      <div className="flex-1 flex">
        {/* Sidebar bên trái - 30% */}
        <CourseSidebar
          course={currentCourse}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onBack={() => navigate('/')}
        />

        {/* Nội dung bên phải - 70% */}
        <motion.main
          className="flex-1 p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Danh sách bài học
            </h1>

            {/* Nút thêm bài học (Admin) */}
            {isAdmin && (
              <motion.button
                onClick={() => setIsAddingLesson(true)}
                className="mb-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                + Thêm bài học mới
              </motion.button>
            )}

            {/* Modal thêm bài học */}
            <AnimatePresence>
              {isAddingLesson && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsAddingLesson(false)}
                >
                  <motion.div
                    className="bg-white rounded-lg p-6 max-w-md w-full"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-xl font-bold mb-4">Thêm bài học mới</h3>
                    <p className="text-gray-600 mb-6">
                      Bạn có muốn thêm một bài học mới vào khóa học này?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddLesson}
                        className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Thêm
                      </button>
                      <button
                        onClick={() => setIsAddingLesson(false)}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Danh sách bài học */}
            <div className="space-y-4">
              <AnimatePresence>
                {currentCourse.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {editingLessonId === lesson.id ? (
                        <LessonEditor
                          lesson={lesson}
                          onSave={(updatedLesson) => {
                            updateLesson(lesson.id, updatedLesson);
                            setEditingLessonId(null);
                          }}
                          onCancel={() => setEditingLessonId(null)}
                          onUploadImage={onUploadImage}
                        />
                      ) : (
                        <LessonCard
                          lesson={lesson}
                          isAdmin={isAdmin}
                          onEdit={() => setEditingLessonId(lesson.id)}
                          onDelete={() => {
                            if (window.confirm('Bạn có chắc muốn xóa bài học này?')) {
                              deleteLesson(lesson.id);
                            }
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {currentCourse.lessons.length === 0 && (
              <motion.div
                className="text-center py-12 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-lg">Chưa có bài học nào</p>
                {isAdmin && (
                  <p className="text-sm mt-2">Nhấn nút "Thêm bài học mới" để bắt đầu</p>
                )}
              </motion.div>
            )}
          </div>
        </motion.main>
      </div>

      {/* Gallery ở dưới cùng */}
      <CourseGallery
        images={gallery}
        isAdmin={isAdmin}
        onUpdate={onUpdateGallery}
        onUploadImage={onUploadImage}
      />
    </div>
  );
};

export default CoursePage;
