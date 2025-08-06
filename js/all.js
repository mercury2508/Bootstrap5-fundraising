// 提示框 tooltips 初始化
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (el) => new bootstrap.Tooltip(el)
  );
});

// form表單驗證
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// 頁籤tab切換後 畫面滾動到指定tab區塊
const buttons = document.querySelectorAll("#tab-buttons .nav-link");
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    scrollToTab(index);
  });
});

function scrollToTab(index) {
  const target = document.getElementsByClassName("tab-pane")[index];
  // 導覽列高度 75px
  const navBarHeight = 75;
  window.scrollTo({
    top: target.offsetTop - navBarHeight,
    behavior: "smooth",
  });
}

// 底部釘選贊助按鈕
function scrollToForm() {
  const target = document.getElementById("sponsorForm").offsetTop;
  window.scrollTo({
    top: target - 58,
    behavior: "smooth",
  });
}

const bottomSponsorBtn = document.getElementById("bottomSponsorBtn");
bottomSponsorBtn.style.display = "none";

window.onscroll = function () {
  const viewTop = document.documentElement.scrollTop;
  const start = document.getElementsByClassName("tab-pane")[0].offsetTop - 100;
  const end = document.getElementById("sponsorForm").offsetTop - 58;
  if (bottomSponsorBtn !== null) {
    if (viewTop > start && viewTop < end) {
      bottomSponsorBtn.style.display = "block";
    } else {
      bottomSponsorBtn.style.display = "none";
    }
  }
};