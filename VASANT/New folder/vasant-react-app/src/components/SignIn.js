import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert('Sign in failed: ' + error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Sign In to ChatLink</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SignIn; 