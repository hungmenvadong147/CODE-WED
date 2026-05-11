import React, { useState } from 'react';
import './CourseCard.css';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isAdmin: boolean;
  onClick?: () => void;
  onUpdate?: (id: string, course: Partial<Course>) => void;
  onDelete?: (id: string) => void;
  onUploadVideo?: (file: File) => Promise<string>;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isAdmin,
  onClick,
  onUpdate,
  onDelete,
  onUploadVideo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(course.title);
  const [editDescription, setEditDescription] = useState(course.description);
  const [editVideoUrl, setEditVideoUrl] = useState(course.videoUrl || '');
  const [uploading, setUploading] = useState(false);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(course.id, {
        title: editTitle,
        description: editDescription,
        videoUrl: editVideoUrl
      });
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa khóa học này?')) {
      if (onDelete) {
        onDelete(course.id);
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadVideo) {
      setUploading(true);
      try {
        const url = await onUploadVideo(file);
        setEditVideoUrl(url);
      } catch (error) {
        alert('Lỗi khi upload video');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div 
      className={`course-card ${!isEditing && onClick ? 'course-card-clickable' : ''}`}
      onClick={!isEditing && onClick ? onClick : undefined}
    >
      {isEditing ? (
        <div className="course-edit">
          <div className="form-group">
            <label>Tiêu đề:</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>Video:</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              disabled={uploading}
            />
            {uploading && <p>Đang upload...</p>}
            {editVideoUrl && <p className="video-info">✓ Video đã có</p>}
          </div>
          <div className="card-actions">
            <button className="btn btn-success" onClick={handleSave}>
              Lưu
            </button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <>
          {course.videoUrl && (
            <div className="course-video">
              <video controls>
                <source src={course.videoUrl} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>
            </div>
          )}
          <div className="course-content">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {isAdmin && (
              <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Sửa
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Xóa
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseCard;
