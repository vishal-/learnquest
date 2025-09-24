import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';

export async function getFlags() {
  try {
    const docRef = doc(db, 'datasets', 'flags-of-countries');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const { updatedAt, ...flags } = data;
      return flags;
    } else {
      console.error('No flags data found');
      return {};
    }
  } catch (error) {
    console.error('Error fetching flags:', error);
    return {};
  }
}