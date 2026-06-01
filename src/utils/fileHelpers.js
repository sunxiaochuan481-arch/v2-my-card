// 文件操作辅助函数

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的大小字符串
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string} 扩展名
 */
export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * 验证文件类型
 * @param {File} file - 文件对象
 * @param {string[]} allowedTypes - 允许的文件类型数组
 * @returns {boolean} 是否允许
 */
export function validateFileType(file, allowedTypes) {
  return allowedTypes.includes(file.type);
}

/**
 * 验证图片文件
 * @param {File} file - 文件对象
 * @returns {boolean} 是否为允许的图片类型
 */
export function validateImageFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validateFileType(file, allowedTypes);
}

/**
 * 验证视频文件
 * @param {File} file - 文件对象
 * @returns {boolean} 是否为允许的视频类型
 */
export function validateVideoFile(file) {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  return validateFileType(file, allowedTypes);
}

/**
 * 验证音频文件
 * @param {File} file - 文件对象
 * @returns {boolean} 是否为允许的音频类型
 */
export function validateAudioFile(file) {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];
  return validateFileType(file, allowedTypes);
}

/**
 * 生成文件预览 URL
 * @param {File} file - 文件对象
 * @returns {string} 预览 URL
 */
export function createFilePreview(file) {
  return URL.createObjectURL(file);
}

/**
 * 清理文件预览 URL
 * @param {string} url - 预览 URL
 */
export function revokeFilePreview(url) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

export default {
  formatFileSize,
  getFileExtension,
  validateFileType,
  validateImageFile,
  validateVideoFile,
  validateAudioFile,
  createFilePreview,
  revokeFilePreview,
};
