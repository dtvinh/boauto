import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private firestore: AngularFirestore) {}

  getExBaseAccount() {
    return this.firestore.collection('accounts').snapshotChanges();
  }

  async getAccountById(accountId: any) {
    const docSnap = await getDoc(doc(getFirestore(), 'accounts', accountId));
    return docSnap?.data();
  }
}
