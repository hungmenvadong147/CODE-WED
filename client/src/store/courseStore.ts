import { create } from 'zustand';
import { CourseDetail, Lesson } from '../types/course';

interface CourseStore {
  currentCourse: CourseDetail | null;
  setCurrentCourse: (course: CourseDetail) => void;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (id: string, lesson: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  reorderLessons: (lessons: Lesson[]) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  currentCourse: null,
  
  setCurrentCourse: (course) => set({ currentCourse: course }),
  
  addLesson: (lesson) => set((state) => {
    if (!state.currentCourse) return state;
    return {
      currentCourse: {
        ...state.currentCourse,
        lessons: [...state.currentCourse.lessons, lesson],
        totalLessons: state.currentCourse.totalLessons + 1
      }
    };
  }),
  
  updateLesson: (id, updatedLesson) => set((state) => {
    if (!state.currentCourse) return state;
    return {
      currentCourse: {
        ...state.currentCourse,
        lessons: state.currentCourse.lessons.map(lesson =>
          lesson.id === id ? { ...lesson, ...updatedLesson } : lesson
        )
      }
    };
  }),
  
  deleteLesson: (id) => set((state) => {
    if (!state.currentCourse) return state;
    return {
      currentCourse: {
        ...state.currentCourse,
        lessons: state.currentCourse.lessons.filter(lesson => lesson.id !== id),
        totalLessons: state.currentCourse.totalLessons - 1
      }
    };
  }),
  
  reorderLessons: (lessons) => set((state) => {
    if (!state.currentCourse) return state;
    return {
      currentCourse: {
        ...state.currentCourse,
        lessons
      }
    };
  })
}));
