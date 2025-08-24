import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SignIn from './components/SignIn';
import FriendList from './components/FriendList';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, right: 20 }}>
        <span>{user.displayName}</span>
        <button style={{ marginLeft: 10 }} onClick={() => signOut(auth)}>Sign Out</button>
      </div>
      <FriendList onSelectFriend={setSelectedFriend} selectedFriend={selectedFriend} />
      {selectedFriend ? (
        <Chat friend={selectedFriend} />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Select a friend to start chatting</h2>
        </div>
      )}
    </div>
  );
}

export default App;
