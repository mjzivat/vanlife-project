import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyCA8FDmtl5OTzsyIYcXSgw2wT-2o658Cd4",
    authDomain: "van-life-c98f2.firebaseapp.com",
    projectId: "van-life-c98f2",
    storageBucket: "van-life-c98f2.appspot.com",
    messagingSenderId: "236271472691",
    appId: "1:236271472691:web:bfb0898350af42fe37d346"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const vansCollectionRef = collection(db, "vans")




  export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(vans)

    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return (
        snapshot.data()
        )
}

// export async function getVans(id) {

//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}