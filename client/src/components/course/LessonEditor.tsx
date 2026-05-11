import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lesson } from '../../types/course';

interface LessonEditorProps {
  lesson: Lesson;
  onSave: (lesson: Partial<Lesson>) => void;
  onCancel: () => void;
  onUploadImage?: (file: File) => Promise<string>;
}

const LessonEditor: React.FC<LessonEditorProps> = ({
  lesson,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(lesson.title);
  const [content, setContent] = useState(lesson.content);
  const [titleColor, setTitleColor] = useState(lesson.titleColor);
  const [titleFont, setTitleFont] = useState(lesson.titleFont);
  const [titleSize, setTitleSize] = useState(lesson.titleSize);

  const handleSave = () => {
    onSave({
      title,
      content,
      titleColor,
      titleFont,
      titleSize,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
        <h3 className="text-lg font-bold text-primary-900">Chỉnh sửa bài học</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Title Settings */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Tiêu đề bài học
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Nhập tiêu đề..."
          />

          {/* Title Customization */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Màu chữ
              </label>
              <input
                type="color"
                value={titleColor}
                onChange={(e) => setTitleColor(e.target.value)}
                className="w-full h-10 rounded border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Font chữ
              </label>
              <select
                value={titleFont}
                onChange={(e) => setTitleFont(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="Times New Roman">Times New Roman</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Kích thước
              </label>
              <select
                value={titleSize}
                onChange={(e) => setTitleSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="18px">Nhỏ</option>
                <option value="24px">Trung bình</option>
                <option value="32px">Lớn</option>
              </select>
            </div>
          </div>

          {/* Title Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Xem trước tiêu đề:</p>
            <h4
              style={{
                color: titleColor,
                fontFamily: titleFont,
                fontSize: titleSize
              }}
            >
              {title || 'Tiêu đề bài học'}
            </h4>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung bài học
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[200px] font-mono text-sm"
            placeholder="Nhập nội dung (hỗ trợ HTML)..."
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Hỗ trợ HTML: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;strong&gt;, &lt;em&gt;
          </p>
        </div>

        {/* Content Preview */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Xem trước nội dung:</p>
          <div
            className="p-4 bg-gray-50 rounded-lg prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <motion.button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            💾 Lưu thay đổi
          </motion.button>
          <motion.button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ❌ Hủy
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonEditor;
