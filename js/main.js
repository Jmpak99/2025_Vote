// main.js

// 요소 선택
const agreeBtn = document.getElementById("agreeBtn");
const disagreeBtn = document.getElementById("disagreeBtn");
const resultBox = document.getElementById("resultBox");
const agreeCount = document.getElementById("agreeCount");
const disagreeCount = document.getElementById("disagreeCount");
const subjectEl = document.getElementById("vote-subject");
const titleEl = document.querySelector(".title");
const descEl = document.querySelector(".description");
const resetBtn = document.getElementById("resetBtn");

// 저장된 데이터 불러오기
const voteData = JSON.parse(localStorage.getItem("votes")) || { yes: 0, no: 0 };
const voteStatus = localStorage.getItem("voteStatus") || "open"; // 진행 상태
const hasVoted = localStorage.getItem("voted") === "true";

// 제목, 설명, 주제 불러오기
const savedTitle = localStorage.getItem("title") || "찬반 투표";
const savedDesc = localStorage.getItem("description") || "아래 항목에 대해 찬반 투표를 해주세요.";
const savedSubject = localStorage.getItem("subject") || "투표 주제가 없습니다.";

// 페이지에 반영
titleEl.textContent = savedTitle;
descEl.textContent = savedDesc;
subjectEl.textContent = savedSubject;

// 이미 투표했거나 종료 상태라면 버튼 비활성화
if (hasVoted || voteStatus === "closed") {
  agreeBtn.disabled = true;
  disagreeBtn.disabled = true;
}

// 종료 상태일 경우 결과 표시
if (voteStatus === "closed") {
  resultBox.style.display = "block";
  agreeCount.textContent = voteData.yes;
  disagreeCount.textContent = voteData.no;
}

// ===== 투표 버튼 이벤트 =====

agreeBtn.addEventListener("click", () => {
  voteData.yes += 1;
  localStorage.setItem("votes", JSON.stringify(voteData));
  localStorage.setItem("voted", "true");

  agreeBtn.disabled = true;
  disagreeBtn.disabled = true;
  agreeBtn.classList.add("selected", "agree");

  alert("찬성 투표가 완료되었습니다!");
});

disagreeBtn.addEventListener("click", () => {
  voteData.no += 1;
  localStorage.setItem("votes", JSON.stringify(voteData));
  localStorage.setItem("voted", "true");

  agreeBtn.disabled = true;
  disagreeBtn.disabled = true;
  disagreeBtn.classList.add("selected", "disagree");

  alert("반대 투표가 완료되었습니다!");
});

// ===== 테스트용 초기화 버튼 =====

resetBtn.addEventListener("click", () => {
  if (confirm("로컬 저장소를 초기화하시겠습니까? (테스트용)")) {
    localStorage.removeItem("voted");
    localStorage.removeItem("votes");
    localStorage.removeItem("title");
    localStorage.removeItem("description");
    localStorage.removeItem("subject");
    localStorage.removeItem("voteStatus");
    location.reload();
  }
});


// 비밀번호 모달 보여주기
function showPasswordModal() {
  document.getElementById("passwordModal").style.display = "flex";
}

// 모달 닫기
function closePasswordModal() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("adminPasswordInput").value = "";
  document.getElementById("passwordError").textContent = "";
}

// 비밀번호 체크
function checkAdminPassword() {
  const input = document.getElementById("adminPasswordInput").value;
  const error = document.getElementById("passwordError");
  const correctPassword = "admin"; // 비밀번호 변경 시 수정
    
  if (input === correctPassword) {
    window.location.href = "admin.html";
  } else {
    error.textContent = "비밀번호가 올바르지 않습니다.";
  }
}