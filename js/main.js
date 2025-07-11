// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Firebase 설정
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



// 🔗 DOM 요소 연결
const titleEl = document.querySelector(".title");
const descEl = document.querySelector(".description");
const subjectEl = document.getElementById("vote-subject");
const agreeBtn = document.getElementById("agreeBtn");
const disagreeBtn = document.getElementById("disagreeBtn");
const resultBox = document.getElementById("resultBox");
const agreeCount = document.getElementById("agreeCount");
const disagreeCount = document.getElementById("disagreeCount");

let currentSubject = "default";
let hasVoted = false;
let lastResetId = localStorage.getItem("lastResetId");

// ✅ 투표 여부 체크 함수 (주제별)
function getLocalStorageKey() {
  return `hasVoted_${currentSubject}`;
}

function checkHasVoted() {
  return localStorage.getItem(getLocalStorageKey()) === "true";
}

function markAsVoted() {
  localStorage.setItem(getLocalStorageKey(), "true");
  hasVoted = true;
  agreeBtn.disabled = true;
  disagreeBtn.disabled = true;
}

// ✅ 실시간 데이터 감지 + 렌더링
onSnapshot(doc(db, "voteConfig", "main"), (snap) => {
  if (!snap.exists()) return;
  const data = snap.data();

  currentSubject = data.subject || "default";

  titleEl.textContent = data.title || "찬반 투표";
  descEl.textContent = data.description || "";
  subjectEl.textContent = currentSubject;
  agreeCount.textContent = data.agreeCount ?? 0;
  disagreeCount.textContent = data.disagreeCount ?? 0;

  // resetId 감지 → localStorage 초기화
  if (data.resetId && data.resetId !== lastResetId) {
    localStorage.removeItem(getLocalStorageKey());
    localStorage.setItem("lastResetId", data.resetId);
    hasVoted = false;
  }

  // 투표 상태에 따라 UI 제어
  const status = data.status || "open";
  if (status === "closed") {
    resultBox.style.display = "block";
    agreeBtn.disabled = true;
    disagreeBtn.disabled = true;
  } else {
    resultBox.style.display = "none";

    if (checkHasVoted()) {
      hasVoted = true;
      agreeBtn.disabled = true;
      disagreeBtn.disabled = true;
    } else {
      hasVoted = false;
      agreeBtn.disabled = false;
      disagreeBtn.disabled = false;
    }
  }
});

// ✅ 투표 버튼 동작
agreeBtn.addEventListener("click", async () => {
  if (hasVoted) return;

  const ref = doc(db, "voteConfig", "main");
  const snap = await getDoc(ref);
  const data = snap.data();
  const updatedAgree = (data.agreeCount ?? 0) + 1;

  await setDoc(ref, { agreeCount: updatedAgree }, { merge: true });
  markAsVoted();
  alert("찬성 투표 완료!");
});

disagreeBtn.addEventListener("click", async () => {
  if (hasVoted) return;

  const ref = doc(db, "voteConfig", "main");
  const snap = await getDoc(ref);
  const data = snap.data();
  const updatedDisagree = (data.disagreeCount ?? 0) + 1;

  await setDoc(ref, { disagreeCount: updatedDisagree }, { merge: true });
  markAsVoted();
  alert("반대 투표 완료!");
});

// 🔐 관리자 로그인 관련 (모달)
window.showPasswordModal = function () {
  document.getElementById("passwordModal").style.display = "flex";
};

window.closePasswordModal = function () {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("adminPasswordInput").value = "";
  document.getElementById("passwordError").textContent = "";
};

window.checkAdminPassword = function () {
  const input = document.getElementById("adminPasswordInput").value;
  const correctPassword = "admin123"; // 필요 시 변경

  if (input === correctPassword) {
    window.location.href = "admin.html";
  } else {
    document.getElementById("passwordError").textContent = "비밀번호가 올바르지 않습니다.";
  }
};


// 🔐 관리자 모달 함수들 (전역 등록)
window.showPasswordModal = function () {
  document.getElementById("passwordModal").style.display = "flex";
};

window.closePasswordModal = function () {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("adminPasswordInput").value = "";
  document.getElementById("passwordError").textContent = "";
};

window.checkAdminPassword = function () {
  const input = document.getElementById("adminPasswordInput").value;
  const correctPassword = "admin123"; // 변경 가능

  if (input === correctPassword) {
    window.location.href = "admin.html";
  } else {
    document.getElementById("passwordError").textContent = "비밀번호가 올바르지 않습니다.";
  }
};

