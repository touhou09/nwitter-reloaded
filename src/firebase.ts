import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASzD8xQ50obwirGfuIk8Dc7QPpuZQ2ZEI",
  authDomain: "nwitter-reloaded-d515a.firebaseapp.com",
  projectId: "nwitter-reloaded-d515a",
  storageBucket: "nwitter-reloaded-d515a.appspot.com",
  messagingSenderId: "714009221351",
  appId: "1:714009221351:web:6cb52658629e7b1f14aa42"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);