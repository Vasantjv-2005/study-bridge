import React from 'react';

const friends = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const FriendList = ({ onSelectFriend, selectedFriend }) => (
  <div style={{ width: 200, borderRight: '1px solid #ccc', padding: 10 }}>
    <h3>Friends</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {friends.map(friend => (
        <li
          key={friend.id}
          style={{
            padding: '8px 0',
            cursor: 'pointer',
            fontWeight: selectedFriend && selectedFriend.id === friend.id ? 'bold' : 'normal',
          }}
          onClick={() => onSelectFriend(friend)}
        >
          {friend.name}
        </li>
      ))}
    </ul>
  </div>
);

export default FriendList; 