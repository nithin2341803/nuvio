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


// Staff portal prototype. For production deployment, move authentication to a server-side auth service.
const STAFF_PASSWORD = "kxmbit2026";
const DEVELOPER_PASSWORD = "llimr2026";
// Add salesperson user codes here. All salespeople use the same sales password.
const SALES_PASSWORD = "nuknowsale26";
const SALES_USERS = null;

const views = ["staffLoginView","roleView","marketerView","salesLoginView","salesReportView","developerView","developerDashboard"];
const showView = id => views.forEach(v => document.getElementById(v)?.classList.toggle("hidden", v !== id));
const staffError = document.getElementById("staffError");
const salesError = document.getElementById("salesError");
const developerError = document.getElementById("developerError");

document.getElementById("staffLoginBtn")?.addEventListener("click", () => {
  staffError.textContent = document.getElementById("mainStaffPassword").value === STAFF_PASSWORD ? "" : "Incorrect staff password.";
  if (!staffError.textContent) showView("roleView");
});
document.getElementById("staffLogoutBtn")?.addEventListener("click", () => showView("staffLoginView"));
document.getElementById("marketerBtn")?.addEventListener("click", () => showView("marketerView"));
document.getElementById("developerBtn")?.addEventListener("click", () => showView("developerView"));
document.getElementById("backToRoles")?.addEventListener("click", () => showView("roleView"));
document.getElementById("salesBtn")?.addEventListener("click", () => showView("salesLoginView"));
document.getElementById("backToMarketer")?.addEventListener("click", () => showView("marketerView"));
document.getElementById("developerBack")?.addEventListener("click", () => showView("roleView"));
document.getElementById("developerLoginBtn")?.addEventListener("click", () => {
  developerError.textContent = document.getElementById("developerPassword").value === DEVELOPER_PASSWORD ? "" : "Incorrect developer password.";
  if (!developerError.textContent) showView("developerDashboard");
});
document.getElementById("developerLogout")?.addEventListener("click", () => showView("roleView"));

document.getElementById("salesLoginBtn")?.addEventListener("click", () => {
  const code = document.getElementById("salesUserCode").value.trim();
  const password = document.getElementById("salesPassword").value;
  const ok = code.length > 0 && password === SALES_PASSWORD;
  salesError.textContent = ok ? "" : "Check your user code and sales password.";
  if (ok) {
    document.getElementById("reportUserCode").textContent = code;
    document.getElementById("salesWelcome").textContent = `Welcome, ${code}`;
    document.getElementById("reportDate").textContent = new Date().toLocaleDateString("en-IN", {day:"2-digit", month:"short", year:"numeric"});
    resetReport(); showView("salesReportView");
  }
});
document.getElementById("salesLogoutBtn")?.addEventListener("click", () => showView("salesLoginView"));

const contactOptions = document.getElementById("contactOptions");
contactOptions?.addEventListener("click", e => {
  const button = e.target.closest("button[data-count]");
  if (!button) return;
  contactOptions.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
  button.classList.add("selected");
  document.getElementById("peopleContacted").value = button.dataset.count;
});
const clientRows = document.getElementById("clientRows");
function addClientRow(){ const row=document.createElement("div"); row.className="client-row"; row.innerHTML=`<input name="clientName" placeholder="Client name" required><select name="clientPlan"><option>Starter</option><option>Intermediate</option><option>Premium</option></select><select name="clientStatus"><option>Interested</option><option>Follow-up</option><option>Ready to Buy</option><option>Not Interested</option></select><button class="remove-client" type="button" aria-label="Remove client">×</button>`; row.querySelector(".remove-client").onclick=()=>row.remove(); clientRows.appendChild(row); }
document.getElementById("addClientBtn")?.addEventListener("click", addClientRow);
function resetReport(){
  const form = document.getElementById("salesReportForm");
  form.reset();
  contactOptions?.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
  document.getElementById("peopleContacted").value = "";
  clientRows.innerHTML = "";
  addClientRow();
  document.getElementById("reportUserCode").textContent = document.getElementById("salesUserCode").value.trim();
}

document.getElementById("salesReportForm")?.addEventListener("submit", e=>{
  e.preventDefault(); const count=document.getElementById("peopleContacted").value; if(!count){alert("Please select how many people you contacted today.");return;}
  const rows=[...document.querySelectorAll(".client-row")].map((r,i)=>`${i+1}. ${r.querySelector('[name="clientName"]').value} — ${r.querySelector('[name="clientPlan"]').value} — ${r.querySelector('[name="clientStatus"]').value}`);
  const files=document.getElementById("contactScreenshots").files;
  const msg=["NUVIO — DAILY SALES REPORT","",`User code: ${document.getElementById("reportUserCode").textContent}`,`Date: ${new Date().toLocaleDateString("en-IN")}`,`People contacted today: ${count}`,`Expected clients: ${rows.length}`,"", "CLIENTS", ...(rows.length?rows:["No client details added."]),"",`Screenshots to attach in WhatsApp: ${files.length}`].join("\n");
  window.open("https://wa.me/919037686996?text="+encodeURIComponent(msg),"_blank","noopener");
});
