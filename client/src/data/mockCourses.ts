import { CourseDetail } from '../types/course';

export const mockCourses: Record<string, CourseDetail> = {
  'lop-10': {
    id: 'lop-10',
    title: 'Lớp 10',
    description: 'Khóa học dành cho học sinh lớp 10, bao gồm các môn học cơ bản và nâng cao.',
    thumbnail: 'https://via.placeholder.com/400x300/4A90E2/ffffff?text=Lớp+10',
    totalLessons: 3,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Bài 1: Giới thiệu khóa học',
        content: '<p>Chào mừng các em đến với khóa học Lớp 10!</p><p>Trong khóa học này, chúng ta sẽ học về các kiến thức cơ bản và nâng cao.</p>',
        titleColor: '#1b5e20',
        titleFont: 'Times New Roman',
        titleSize: '24px',
        order: 1,
        media: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'lesson-2',
        title: 'Bài 2: Kiến thức cơ bản',
        content: '<h2>Nội dung bài học</h2><p>Đây là nội dung chi tiết của bài học 2.</p><ul><li>Mục 1</li><li>Mục 2</li><li>Mục 3</li></ul>',
        titleColor: '#1b5e20',
        titleFont: 'Times New Roman',
        titleSize: '24px',
        order: 2,
        media: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'lesson-3',
        title: 'Bài 3: Bài tập thực hành',
        content: '<p>Hãy thực hành các bài tập sau:</p><ol><li>Bài tập 1</li><li>Bài tập 2</li><li>Bài tập 3</li></ol>',
        titleColor: '#1b5e20',
        titleFont: 'Times New Roman',
        titleSize: '24px',
        order: 3,
        media: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};
