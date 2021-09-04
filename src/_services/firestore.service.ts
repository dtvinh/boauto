import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc, getFirestore, updateDoc, serverTimestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  async getById(collection: string, accountId: string) {
    const docSnap = await getDoc(doc(getFirestore(), collection, accountId));
    return docSnap?.data();
  }

  async updateById(collection: string, accountId: string, data: any) {
    data.updatedAt = serverTimestamp();
    await updateDoc(doc(getFirestore(), collection, accountId), data);
  }
}
