import { motion } from 'framer-motion';
import { Lesson } from '../../types/course';

interface LessonCardProps {
  lesson: Lesson;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, isAdmin, onEdit, onDelete }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        {/* Title */}
        <h3
          className="font-times mb-4"
          style={{
            color: lesson.titleColor,
            fontFamily: lesson.titleFont,
            fontSize: lesson.titleSize
          }}
        >
          {lesson.title}
        </h3>

        {/* Content */}
        <div
          className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        {/* Media */}
        {lesson.media && lesson.media.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {lesson.media.map((media) => (
              <div key={media.id} className="rounded-lg overflow-hidden">
                {media.type === 'image' && (
                  <img
                    src={media.url}
                    alt={media.caption || ''}
                    className="w-full h-32 object-cover"
                  />
                )}
                {media.type === 'video' && (
                  <video
                    src={media.url}
                    controls
                    className="w-full h-32 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Admin Actions */}
        {isAdmin && (
          <div className="mt-6 flex gap-3 pt-4 border-t border-gray-100">
            <motion.button
              onClick={onEdit}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ✏️ Chỉnh sửa
            </motion.button>
            <motion.button
              onClick={onDelete}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🗑️ Xóa
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LessonCard;
