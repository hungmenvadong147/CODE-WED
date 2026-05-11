export interface Lesson {
  id: string;
  title: string;
  content: string;
  titleColor: string;
  titleFont: string;
  titleSize: string;
  order: number;
  media: LessonMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface LessonMedia {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  caption?: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  lessons: Lesson[];
  totalLessons: number;
  createdAt: string;
  updatedAt: string;
}
