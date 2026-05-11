import React, { useState } from 'react';
import './CourseList.css';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
  isAdmin: boolean;
  onCourseClick?: (courseId: string) => void;
  onAdd?: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate?: (id: string, course: Partial<Course>) => void;
  onDelete?: (id: string) => void;
  onUploadVideo?: (file: File) => Promise<string>;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  isAdmin,
  onCourseClick,
  onAdd,
  onUpdate,
  onDelete,
  onUploadVideo
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleAdd = () => {
    if (newTitle.trim() && newDescription.trim() && onAdd) {
      onAdd({
        title: newTitle,
        description: newDescription,
        videoUrl: newVideoUrl
      });
      setNewTitle('');
      setNewDescription('');
      setNewVideoUrl('');
      setIsAdding(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadVideo) {
      setUploading(true);
      try {
        const url = await onUploadVideo(file);
        setNewVideoUrl(url);
      } catch (error) {
        alert('Lỗi khi upload video');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <section className="course-list">
      <div className="container">
        <div className="section-header">
          <h2>Các Khóa Học</h2>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
              + Thêm khóa học
            </button>
          )}
        </div>

        {isAdding && (
          <div className="add-course-form">
            <h3>Thêm khóa học mới</h3>
            <div className="form-group">
              <label>Tiêu đề:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Nhập tiêu đề khóa học"
              />
            </div>
            <div className="form-group">
              <label>Mô tả:</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Nhập mô tả khóa học"
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>Video (tùy chọn):</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={uploading}
              />
              {uploading && <p>Đang upload...</p>}
              {newVideoUrl && <p className="video-info">✓ Video đã upload</p>}
            </div>
            <div className="form-actions">
              <button className="btn btn-success" onClick={handleAdd}>
                Thêm
              </button>
              <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isAdmin={isAdmin}
              onClick={() => onCourseClick?.(course.id)}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onUploadVideo={onUploadVideo}
            />
          ))}
        </div>

        {courses.length === 0 && !isAdding && (
          <div className="empty-state">
            <p>Chưa có khóa học nào</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseList;
