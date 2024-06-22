import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"

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

export async function getVans(id) {

    

    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
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