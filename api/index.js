// Vercel Serverless Function
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// In-memory database
let siteData = {
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

// Multer config for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `learning-website/${folder}`,
        resource_type: resourceType
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

// Routes
app.get('/api/data', (req, res) => {
  res.json(siteData);
});

app.put('/api/contact', (req, res) => {
  const { phone, email } = req.body;
  siteData.contact = { phone, email };
  res.json({ success: true, data: siteData.contact });
});

app.get('/api/menu-items', (req, res) => {
  res.json(siteData.menuItems);
});

app.put('/api/menu-items/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, videoUrl } = req.body;
  
  const index = siteData.menuItems.findIndex(item => item.id === id);
  if (index !== -1) {
    siteData.menuItems[index] = { ...siteData.menuItems[index], title, content, videoUrl };
    res.json({ success: true, data: siteData.menuItems[index] });
  } else {
    res.status(404).json({ success: false, message: 'Menu item không tìm thấy' });
  }
});

app.get('/api/courses', (req, res) => {
  res.json(siteData.courses);
});

app.post('/api/courses', (req, res) => {
  const { title, description, videoUrl } = req.body;
  const newCourse = {
    id: Date.now().toString(),
    title,
    description,
    videoUrl: videoUrl || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  siteData.courses.push(newCourse);
  res.json({ success: true, data: newCourse });
});

app.put('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, videoUrl } = req.body;
  
  const index = siteData.courses.findIndex(course => course.id === id);
  if (index !== -1) {
    siteData.courses[index] = {
      ...siteData.courses[index],
      title,
      description,
      videoUrl,
      updatedAt: new Date().toISOString()
    };
    res.json({ success: true, data: siteData.courses[index] });
  } else {
    res.status(404).json({ success: false, message: 'Khóa học không tìm thấy' });
  }
});

app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const index = siteData.courses.findIndex(course => course.id === id);
  
  if (index !== -1) {
    siteData.courses.splice(index, 1);
    res.json({ success: true, message: 'Đã xóa khóa học' });
  } else {
    res.status(404).json({ success: false, message: 'Khóa học không tìm thấy' });
  }
});

app.get('/api/gallery', (req, res) => {
  res.json(siteData.gallery);
});

app.put('/api/gallery/:id', (req, res) => {
  const { id } = req.params;
  const { url, alt } = req.body;
  
  const index = siteData.gallery.findIndex(img => img.id === id);
  if (index !== -1) {
    siteData.gallery[index] = { ...siteData.gallery[index], url, alt };
    res.json({ success: true, data: siteData.gallery[index] });
  } else {
    res.status(404).json({ success: false, message: 'Hình ảnh không tìm thấy' });
  }
});

app.post('/api/upload/video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Không có file video' });
    }
    const url = await uploadToCloudinary(req.file.buffer, 'videos', 'video');
    res.json({ success: true, url });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi upload video' });
  }
});

app.post('/api/upload/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Không có file ảnh' });
    }
    const url = await uploadToCloudinary(req.file.buffer, 'images', 'image');
    res.json({ success: true, url });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi upload ảnh' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server đang hoạt động' });
});

// Export for Vercel
module.exports = app;
