// admin.js

// 주제 관련 요소
const subjectInput = document.getElementById("subjectInput");
const saveSubjectBtn = document.getElementById("saveSubjectBtn");

// 상태 관련 요소
const statusSelect = document.getElementById("statusSelect");
const saveStatusBtn = document.getElementById("saveStatusBtn");

// 제목/설명 관련 요소
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const saveTitleDescBtn = document.getElementById("saveTitleDescBtn");

// 결과 관련 요소
const agreeCount = document.getElementById("agreeCount");
const disagreeCount = document.getElementById("disagreeCount");

// 초기화 버튼
const resetBtn = document.getElementById("resetBtn");

// ===== 1. 초기값 불러오기 =====

// 주제
const subject = localStorage.getItem("subject") || "";
subjectInput.value = subject;

// 제목/설명
titleInput.value = localStorage.getItem("title") || "";
descInput.value = localStorage.getItem("description") || "";

// 상태
const voteStatus = localStorage.getItem("voteStatus") || "open";
statusSelect.value = voteStatus;

// 투표 결과
const voteData = JSON.parse(localStorage.getItem("votes")) || { yes: 0, no: 0 };
agreeCount.textContent = voteData.yes;
disagreeCount.textContent = voteData.no;

// ===== 2. 저장 핸들러 =====

// 주제 저장
saveSubjectBtn.addEventListener("click", () => {
  const newSubject = subjectInput.value.trim();
  localStorage.setItem("subject", newSubject);
  alert("주제가 저장되었습니다.");
});

// 제목/설명 저장
saveTitleDescBtn.addEventListener("click", () => {
  const newTitle = titleInput.value.trim();
  const newDesc = descInput.value.trim();
  localStorage.setItem("title", newTitle);
  localStorage.setItem("description", newDesc);
  alert("제목과 설명이 저장되었습니다.");
});

// 상태 저장
saveStatusBtn.addEventListener("click", () => {
  const newStatus = statusSelect.value;
  localStorage.setItem("voteStatus", newStatus);
  alert("투표 상태가 저장되었습니다.");
});

// ===== 3. 초기화 버튼 =====

resetBtn.addEventListener("click", () => {
  if (confirm("정말 모든 데이터를 초기화하시겠습니까?")) {
    localStorage.removeItem("votes");
    localStorage.removeItem("voted");
    localStorage.removeItem("voteStatus");
    localStorage.removeItem("subject");
    localStorage.removeItem("title");
    localStorage.removeItem("description");
    alert("초기화가 완료되었습니다. 페이지를 새로고침해주세요.");
    location.reload();
  }
});