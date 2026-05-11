import { SiteData } from '../types';

export const initialData: SiteData = {
  contact: {
    phone: '0786985687',
    email: 'huynhnhathunghhcl@gmail.com'
  },
  menuItems: [
    {
      id: 'intro',
      title: 'Giới thiệu giáo viên',
      content: 'Xin chào! Tôi là giáo viên với nhiều năm kinh nghiệm trong lĩnh vực giáo dục. Tôi cam kết mang đến những khóa học chất lượng cao, giúp học viên phát triển kỹ năng và kiến thức một cách hiệu quả nhất.',
      videoUrl: ''
    },
    {
      id: 'courses',
      title: 'Nội dung khóa học',
      content: 'Các khóa học được thiết kế bài bản, từ cơ bản đến nâng cao. Mỗi khóa học đều có video hướng dẫn chi tiết và tài liệu học tập đầy đủ.',
      videoUrl: ''
    },
    {
      id: 'reviews',
      title: 'Nhận xét',
      content: 'Học viên của tôi đã đạt được nhiều thành tích xuất sắc. Họ đánh giá cao phương pháp giảng dạy và sự tận tâm trong từng bài học.',
      videoUrl: ''
    },
    {
      id: 'contact',
      title: 'Liên hệ',
      content: 'Hãy liên hệ với tôi qua số điện thoại hoặc email để được tư vấn chi tiết về các khóa học phù hợp với bạn.',
      videoUrl: ''
    }
  ],
  courses: [
    {
      id: '1',
      title: 'Khóa học cơ bản',
      description: 'Khóa học dành cho người mới bắt đầu, cung cấp nền tảng kiến thức vững chắc.',
      videoUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Khóa học nâng cao',
      description: 'Khóa học chuyên sâu dành cho học viên đã có kiến thức cơ bản.',
      videoUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  gallery: [
    {
      id: '1',
      url: 'https://via.placeholder.com/400x300/4A90E2/ffffff?text=Học+trò+1',
      alt: 'Học trò 1'
    },
    {
      id: '2',
      url: 'https://via.placeholder.com/400x300/50C878/ffffff?text=Học+trò+2',
      alt: 'Học trò 2'
    },
    {
      id: '3',
      url: 'https://via.placeholder.com/400x300/FF6B6B/ffffff?text=Học+trò+3',
      alt: 'Học trò 3'
    },
    {
      id: '4',
      url: 'https://via.placeholder.com/400x300/FFD93D/ffffff?text=Học+trò+4',
      alt: 'Học trò 4'
    },
    {
      id: '5',
      url: 'https://via.placeholder.com/400x300/9B59B6/ffffff?text=Học+trò+5',
      alt: 'Học trò 5'
    },
    {
      id: '6',
      url: 'https://via.placeholder.com/400x300/E67E22/ffffff?text=Học+trò+6',
      alt: 'Học trò 6'
    },
    {
      id: '7',
      url: 'https://via.placeholder.com/400x300/1ABC9C/ffffff?text=Học+trò+7',
      alt: 'Học trò 7'
    },
    {
      id: '8',
      url: 'https://via.placeholder.com/400x300/E74C3C/ffffff?text=Học+trò+8',
      alt: 'Học trò 8'
    }
  ]
};
