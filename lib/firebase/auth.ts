import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './config';
import { createUser, getUser } from '@/lib/services/userService';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const existingUser = await getUser(user.uid);

    if (!existingUser) {
      await createUser(user.uid, {
        id: user.uid,
        email: user.email!,
        displayName: user.displayName || 'Unbekannt',
        avatar: user.photoURL || undefined
      });
    }

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
