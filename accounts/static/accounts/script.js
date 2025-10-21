const container = document.querySelector(".container");
document.querySelector(".register-btn").addEventListener("click", () => {
  container.classList.add("active");
});
document.querySelector(".login-btn").addEventListener("click", () => {
  container.classList.remove("active");
});

