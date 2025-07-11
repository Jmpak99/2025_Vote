// admin.js (Firebase Firestore 연동)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Firebase 설정 (자신의 값으로 변경)
  const firebaseConfig = {
    apiKey: "AIzaSyDq5m2A3DliRYkv19mpYw-mYckPfIWRZVY",
    authDomain: "voteapp-ed951.firebaseapp.com",
    projectId: "voteapp-ed951",
    storageBucket: "voteapp-ed951.firebasestorage.app",
    messagingSenderId: "236976658936",
    appId: "1:236976658936:web:a26c4331a191dd8d031e0d",
    measurementId: "G-KR3LQ3Z2VG"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const configRef = doc(db, "voteConfig", "main");

// 🔁 제목/설명 저장
document.getElementById("saveTitleDescBtn").addEventListener("click", async () => {
  const title = document.getElementById("inputTitle").value.trim();
  const description = document.getElementById("inputDesc").value.trim();

  if (!title || !description) {
    alert("제목과 설명을 모두 입력해주세요.");
    return;
  }

  await setDoc(configRef, {
    title,
    description
  }, { merge: true });

  alert("제목과 설명이 저장되었습니다.");
});

// 🔁 주제 저장
document.getElementById("saveSubjectBtn").addEventListener("click", async () => {
  const subject = document.getElementById("inputSubject").value.trim();

  if (!subject) {
    alert("주제를 입력해주세요.");
    return;
  }

  await setDoc(configRef, {
    subject
  }, { merge: true });

  alert("주제가 저장되었습니다.");
});

// 🔁 투표 종료
document.getElementById("endVoteBtn").addEventListener("click", async () => {
  await setDoc(configRef, {
    status: "closed"
  }, { merge: true });

  alert("투표가 종료되었습니다.");
});

// 🔁 투표 초기화
document.getElementById("resetBtn").addEventListener("click", async () => {
  await setDoc(configRef, {
    agreeCount: 0,
    disagreeCount: 0,
    status: "open",
    resetId: Date.now()
  }, { merge: true });

  alert("투표가 초기화되었습니다.");
});

// 🔁 실시간 결과 표시
onSnapshot(configRef, (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("liveSubject").textContent = data.subject ?? "-";
    document.getElementById("liveAgree").textContent = data.agreeCount ?? 0;
    document.getElementById("liveDisagree").textContent = data.disagreeCount ?? 0;
    document.getElementById("voteStatus").textContent = data.status === "closed" ? "종료됨" : "진행 중";
  }
});
