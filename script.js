const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const businessSelect = document.getElementById("businessSelect");
const otherWrap = document.getElementById("otherBusinessWrap");
businessSelect?.addEventListener("change", () => {
  otherWrap.classList.toggle("hidden", businessSelect.value !== "Other");
  const input = otherWrap.querySelector("input");
  input.required = businessSelect.value === "Other";
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("projectForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const business = form.get("business") === "Other" ? form.get("otherBusiness") : form.get("business");
  const message = [
    "Hi Nuvio! I'd like to build a website.",
    "",
    `Company / Brand: ${form.get("company")}`,
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Plan: ${form.get("plan")}`,
    `Business type: ${business}`,
    "",
    "Please share the next steps. Thank you!"
  ].join("\n");

  const whatsappUrl = "https://wa.me/919037686996?text=" + encodeURIComponent(message);
  window.open(whatsappUrl, "_blank", "noopener");
});
