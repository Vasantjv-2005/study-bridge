import React, { useState } from 'react';

const Chat = ({ friend }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([
    // Placeholder messages
    { id: 1, sender: 'me', type: 'text', content: 'Hello!' },
    { id: 2, sender: friend?.name, type: 'text', content: 'Hi there!' },
  ]);

  const handleSend = () => {
    if (!message && !file) return;
    let newMsg = { id: Date.now(), sender: 'me', type: 'text', content: message };
    if (file) {
      const fileType = file.type.startsWith('image') ? 'photo' : file.type.startsWith('video') ? 'video' : 'file';
      newMsg = { id: Date.now(), sender: 'me', type: fileType, content: URL.createObjectURL(file), name: file.name };
      setFile(null);
    }
    setMessages([...messages, newMsg]);
    setMessage('');
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  return (
    <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h3>Chat with {friend?.name}</h3>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 10, border: '1px solid #eee', padding: 10 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ margin: '10px 0', textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
            {msg.type === 'text' && <span>{msg.content}</span>}
            {msg.type === 'photo' && <img src={msg.content} alt={msg.name} style={{ maxWidth: 200 }} />}
            {msg.type === 'video' && <video src={msg.content} controls style={{ maxWidth: 200 }} />}
            {msg.type === 'file' && <a href={msg.content} download={msg.name}>{msg.name}</a>}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Type a message or paste a link..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ flex: 1 }}
        />
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat; 