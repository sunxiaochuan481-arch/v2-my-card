// 音乐编辑器
import { useState } from 'react';
import './Admin.css';

function MusicEditor() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 实现保存逻辑
    console.log('保存音乐', { title, artist, album, genre, audioFile, coverFile });
  };

  return (
    <div className="music-editor">
      <h2>音乐编辑器</h2>
      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-row">
          <div className="form-group">
            <label>标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="歌曲名称"
            />
          </div>
          <div className="form-group">
            <label>艺术家</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="艺术家名称"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>专辑</label>
            <input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              placeholder="专辑名称"
            />
          </div>
          <div className="form-group">
            <label>流派</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">选择流派</option>
              <option value="pop">流行</option>
              <option value="rock">摇滚</option>
              <option value="jazz">爵士</option>
              <option value="classical">古典</option>
              <option value="electronic">电子</option>
              <option value="ambient">环境</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>音频文件</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label>封面图片</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
          />
        </div>
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

export default MusicEditor;
