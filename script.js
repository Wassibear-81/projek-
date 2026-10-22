/* =========================================================
   DATA ANGGOTA - EDIT DI SINI SAJA
   Ganti teks placeholder dengan data asli masing-masing
   anggota (dengan izin yang bersangkutan).
   ========================================================= */
const members = [
  {
    name: "Raska",
    age: "17 tahun",
    className: "XII TKJ",
    hobby: "Gaming",
    interest: "Teknologi, komputer, dan pengembangan website",
    description: "Raska tertarik pada dunia teknologi, komputer, dan pengembangan website."
  },
  {
    name: "Nama Anggota 2",
    age: "[isi umur]",
    className: "[isi kelas]",
    hobby: "[isi hobi]",
    interest: "[isi minat]",
    description: "[Isi deskripsi singkat anggota 2 di sini.]"
  },
  {
    name: "Nama Anggota 3",
    age: "[isi umur]",
    className: "[isi kelas]",
    hobby: "[isi hobi]",
    interest: "[isi minat]",
    description: "[Isi deskripsi singkat anggota 3 di sini.]"
  },
  {
    name: "Nama Anggota 4",
    age: "[isi umur]",
    className: "[isi kelas]",
    hobby: "[isi hobi]",
    interest: "[isi minat]",
    description: "[Isi deskripsi singkat anggota 4 di sini.]"
  },
  {
    name: "Nama Anggota 5",
    age: "[isi umur]",
    className: "[isi kelas]",
    hobby: "[isi hobi]",
    interest: "[isi minat]",
    description: "[Isi deskripsi singkat anggota 5 di sini.]"
  },
  {
    name: "Nama Anggota 6",
    age: "[isi umur]",
    className: "[isi kelas]",
    hobby: "[isi hobi]",
    interest: "[isi minat]",
    description: "[Isi deskripsi singkat anggota 6 di sini.]"
  },
  {
    name: "Nama Anggota 7",
    age: "[isi umur]",
    className: "[isi kelas]",
    hobby: "[isi hobi]",
    interest: "[isi minat]",
    description: "[Isi deskripsi singkat anggota 7 di sini.]"
  }
];

/* ===================== Helper ===================== */
function getInitial(member, index) {
  const isPlaceholder = member.name.toLowerCase().startsWith("nama anggota");
  return isPlaceholder ? String(index + 1) : member.name.trim().charAt(0).toUpperCase();
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ===================== Render kartu ===================== */
const grid = document.getElementById("cardGrid");

members.forEach((m, i) => {
  const card = el("article", "card glass reveal");
  card.tabIndex = 0;
  card.setAttribute("aria-label", "Profil " + m.name);

  const top = el("div", "card-top");
  const avatar = el("div", "avatar", getInitial(m, i));
  avatar.setAttribute("aria-hidden", "true");
  const titleWrap = el("div");
  titleWrap.append(el("h3", "", m.name), el("span", "class", m.className));
  top.append(avatar, titleWrap);

  const info = el("div", "card-info");
  [["Umur", m.age], ["Hobi", m.hobby], ["Minat", m.interest]].forEach(([label, value]) => {
    const p = el("p");
    p.append(el("strong", "", label + ": "), document.createTextNode(value));
    info.append(p);
  });

  const desc = el("p", "card-desc", m.description);
  const btn = el("button", "btn btn-ghost", "Lihat Detail");
  btn.type = "button";

  card.append(top, info, desc, btn);
  grid.append(card);

  const open = () => openModal(i, card);
  btn.addEventListener("click", (e) => { e.stopPropagation(); open(); });
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.target === card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open();
    }
  });
});

/* ===================== Modal ===================== */
const modal = document.getElementById("modal");
const modalBox = modal.querySelector(".modal-box");
const closeBtn = document.getElementById("modalClose");
let lastFocused = null;

function openModal(index, trigger) {
  const m = members[index];
  lastFocused = trigger || document.activeElement;
  document.getElementById("modalAvatar").textContent = getInitial(m, index);
  document.getElementById("modalName").textContent = m.name;
  document.getElementById("modalRole").textContent = "Anggota " + (index + 1) + " \u2022 Kelompok 1 TKJ";
  document.getElementById("modalAge").textContent = m.age;
  document.getElementById("modalClass").textContent = m.className;
  document.getElementById("modalHobby").textContent = m.hobby;
  document.getElementById("modalInterest").textContent = m.interest;
  document.getElementById("modalDesc").textContent = m.description;
  modal.hidden = false;
  document.body.classList.add("no-scroll");
  closeBtn.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") { // jaga fokus tetap di dalam modal
    const focusables = modalBox.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])");
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ===================== Menu mobile ===================== */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function setMenu(open) {
  navMenu.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}

navToggle.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
navMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
window.addEventListener("resize", () => { if (window.innerWidth > 820) setMenu(false); });

/* ===================== Header saat scroll ===================== */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ===================== Animasi muncul ===================== */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((node) => io.observe(node));
} else {
  revealEls.forEach((node) => node.classList.add("visible"));
}

/* ===================== Link menu aktif ===================== */
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-menu a");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* ===================== Tahun footer ===================== */
document.getElementById("year").textContent = new Date().getFullYear();
