// 内容编辑器
import './Admin.css';

function ContentEditor({ type = 'video' }) {
  const typeLabels = {
    video: '视频',
    travel: '旅游',
    review: '影评',
    music: '音乐',
  };

  return (
    <div className="content-editor">
      <h2>{typeLabels[type]}编辑器</h2>
      <form className="editor-form">
        <div className="form-group">
          <label>标题</label>
          <input type="text" placeholder="请输入标题" />
        </div>
        <div className="form-group">
          <label>描述</label>
          <textarea placeholder="请输入描述" rows={4}></textarea>
        </div>
        <div className="form-group">
          <label>封面图片</label>
          <input type="file" accept="image/*" />
        </div>
        {type === 'video' && (
          <div className="form-group">
            <label>视频文件</label>
            <input type="file" accept="video/*" />
          </div>
        )}
        {type === 'music' && (
          <div className="form-group">
            <label>音频文件</label>
            <input type="file" accept="audio/*" />
          </div>
        )}
        <div className="form-actions">
          <button type="button" className="btn-secondary">
            取消
          </button>
          <button type="submit" className="btn-primary">
            保存
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContentEditor;
