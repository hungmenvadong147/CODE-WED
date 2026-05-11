import { motion } from 'framer-motion';
import { CourseDetail } from '../../types/course';

interface CourseSidebarProps {
  course: CourseDetail;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onBack: () => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  course,
  collapsed,
  onToggleCollapse,
  onBack
}) => {
  return (
    <motion.aside
      className="bg-gradient-to-b from-primary-50 to-white border-r border-gray-200 flex-shrink-0 relative"
      initial={{ width: collapsed ? 80 : 320 }}
      animate={{ width: collapsed ? 80 : 320 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Toggle Button */}
      <motion.button
        onClick={onToggleCollapse}
        className="absolute -right-4 top-6 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: collapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.div>
      </motion.button>

      <div className="p-6 h-full overflow-y-auto">
        {collapsed ? (
          /* Collapsed View - Icon Only */
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          /* Expanded View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-primary-700 hover:text-primary-900 mb-6 transition-colors"
              whileHover={{ x: -4 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Quay lại</span>
            </motion.button>

            {/* Course Thumbnail */}
            {course.thumbnail && (
              <motion.div
                className="mb-4 rounded-lg overflow-hidden shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              </motion.div>
            )}

            {/* Course Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Tổng số bài học:</span>
                <span className="text-primary-700 font-bold text-lg">
                  {course.totalLessons}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-primary-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Học theo tiến độ của bạn</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Nội dung được cập nhật thường xuyên</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default CourseSidebar;
