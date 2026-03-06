const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");
const languageSelect = document.getElementById("languageSelect");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const detailToggles = document.querySelectorAll(".details-toggle");
detailToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const card = toggle.closest(".tour-card");
    if (!card) return;
    const isOpen = card.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

const bookButtons = document.querySelectorAll(".book-btn");
const bookingModal = document.getElementById("bookingModal");
const modalClose = document.querySelector(".modal-close");
const bookingForm = document.getElementById("bookingForm");
const selectedPackageName = document.getElementById("selectedPackageName");
const paymentSuccess = document.getElementById("paymentSuccess");
const bookingDialog = document.querySelector(".booking-dialog");
const typingElement = document.getElementById("typingText");

const i18n = {
  en: {
    eyebrow: "WHY YOU ARE WAITING FOR ?",
    paymentSuccess: "Thank you. Your payment was successful and your booking is confirmed.",
    categoriesTitle: "Package Categories",
    categories: [
      "Family Packages",
      "Kids Friendly",
      "Honeymoon Packages",
      "Adventure Tours",
      "Wellness and Spa",
      "Luxury Escapes"
    ],
    popularTitle: "Popular Destinations",
    countries: ["BANGKOK", "CHIANG MAI", "PHUKET AND KRABI", "PATTAYA", "KHAO SOK", "AYUTTHAYA"],
    tours: [
      "Bangkok City Explorer",
      "Northern Culture Escape",
      "Island Hopping Retreat",
      "Beach and Nightlife Break",
      "Rainforest Lake Adventure",
      "Ancient Temples Journey"
    ],
    from: "From ",
    moreDetails: "More Details",
    days: ["3 Days / 2 Nights", "4 Days / 3 Nights", "5 Days / 4 Nights", "3 Days / 2 Nights", "4 Days / 3 Nights", "2 Days / 1 Night"],
    tourDetails: [
      ["Day 1: City temple tour and street food walk.", "Day 2: Floating market and canal boat ride.", "Includes: hotel, airport transfer, local guide."],
      ["Day 1: Old city temples and night bazaar.", "Day 2: Doi Suthep and cultural village.", "Includes: boutique stay, breakfast, transport."],
      ["Day 1-2: Phuket beach stay and sunset cruise.", "Day 3: Phi Phi island speedboat tour.", "Includes: hotel, island tickets, transfers."],
      ["Day 1: Beach check-in and evening market.", "Day 2: Coral island day trip.", "Includes: hotel, breakfast, island transfer."],
      ["Day 1: Lake rafting and cave temple visit.", "Day 2: Jungle safari and viewpoint trek.", "Includes: raft house stay, guide, meals."],
      ["Day 1: Temple ruins and river sunset cruise.", "Day 2: Historical park cycling tour.", "Includes: hotel, guide, entrance tickets."]
    ],
    bookNow: "Book Now",
    experiencesTitle: "Signature Experiences",
    experiences: [
      "Sunrise temple tour with local historian",
      "Thai cooking class in a family home",
      "Island picnic on a hidden beach",
      "Northern jungle trek with hill tribe guide"
    ],
    planTitle: "Plan With Blue Moon",
    planText: "Share your dates and preferences. Our team will prepare your personalized Thailand itinerary within 24 hours.",
    modalTitle: "Book Your Package",
    packageLabel: "Package:",
    formLabels: ["Name", "Email", "Number of Persons", "Date"],
    submit: "Submit",
    thanks: "Thank you. Your booking request has been received."
  },
  th: {
    eyebrow: "รออะไรอยู่?",
    paymentSuccess: "ขอบคุณค่ะ การชำระเงินสำเร็จและยืนยันการจองเรียบร้อยแล้ว",
    categoriesTitle: "หมวดหมู่แพ็กเกจ",
    categories: ["แพ็กเกจครอบครัว", "เหมาะสำหรับเด็ก", "แพ็กเกจฮันนีมูน", "ทัวร์ผจญภัย", "สุขภาพและสปา", "พักผ่อนหรูหรา"],
    popularTitle: "จุดหมายปลายทางยอดนิยม",
    countries: ["กรุงเทพฯ", "เชียงใหม่", "ภูเก็ตและกระบี่", "พัทยา", "เขาสก", "อยุธยา"],
    tours: ["เที่ยวกรุงเทพฯ เมืองหลวง", "เที่ยววัฒนธรรมเหนือ", "ทริปเกาะสุดชิล", "พักผ่อนชายหาดและไนต์ไลฟ์", "ผจญภัยทะเลสาบป่าฝน", "เส้นทางวัดโบราณ"],
    from: "เริ่มต้น ",
    moreDetails: "รายละเอียดเพิ่มเติม",
    days: ["3 วัน / 2 คืน", "4 วัน / 3 คืน", "5 วัน / 4 คืน", "3 วัน / 2 คืน", "4 วัน / 3 คืน", "2 วัน / 1 คืน"],
    tourDetails: [
      ["วันที่ 1: เที่ยววัดในเมืองและสตรีทฟู้ด", "วันที่ 2: ตลาดน้ำและล่องเรือคลอง", "รวม: โรงแรม รถรับส่งสนามบิน ไกด์ท้องถิ่น"],
      ["วันที่ 1: วัดในเมืองเก่าและไนท์บาซาร์", "วันที่ 2: ดอยสุเทพและหมู่บ้านวัฒนธรรม", "รวม: ที่พักบูติก อาหารเช้า การเดินทาง"],
      ["วันที่ 1-2: พักผ่อนชายหาดภูเก็ตและล่องเรือชมพระอาทิตย์ตก", "วันที่ 3: ทัวร์สปีดโบ๊ทเกาะพีพี", "รวม: โรงแรม ตั๋วทัวร์เกาะ รถรับส่ง"],
      ["วันที่ 1: เช็กอินชายหาดและตลาดเย็น", "วันที่ 2: ทริปเกาะล้าน", "รวม: โรงแรม อาหารเช้า รถรับส่งเกาะ"],
      ["วันที่ 1: แพในทะเลสาบและถ้ำ", "วันที่ 2: ซาฟารีป่าและเดินเขาจุดชมวิว", "รวม: แพพัก ไกด์ อาหาร"],
      ["วันที่ 1: เที่ยวโบราณสถานและล่องเรือยามเย็น", "วันที่ 2: ปั่นจักรยานในอุทยานประวัติศาสตร์", "รวม: โรงแรม ไกด์ ค่าเข้าชม"]
    ],
    bookNow: "จองเลย",
    experiencesTitle: "ประสบการณ์แนะนำ",
    experiences: ["ทัวร์วัดยามเช้ากับนักประวัติศาสตร์ท้องถิ่น", "คลาสทำอาหารไทยกับครอบครัวท้องถิ่น", "ปิกนิกบนเกาะลับ", "เดินป่าภาคเหนือกับไกด์ชนเผ่า"],
    planTitle: "วางแผนกับบลูมูน",
    planText: "แจ้งวันที่และสไตล์การเดินทาง ทีมงานจะจัดแผนการเดินทางเฉพาะคุณภายใน 24 ชั่วโมง",
    modalTitle: "จองแพ็กเกจของคุณ",
    packageLabel: "แพ็กเกจ:",
    formLabels: ["ชื่อ", "อีเมล", "จำนวนผู้เดินทาง", "วันที่"],
    submit: "ส่งข้อมูล",
    thanks: "ขอบคุณค่ะ เราได้รับคำขอจองของคุณแล้ว"
  },
  ar: {
    eyebrow: "لماذا الانتظار؟",
    paymentSuccess: "شكرا لك. تم الدفع بنجاح وتم تأكيد الحجز.",
    categoriesTitle: "فئات الباقات",
    categories: ["باقات العائلة", "مناسب للأطفال", "باقات شهر العسل", "جولات المغامرة", "العافية والسبا", "رحلات فاخرة"],
    popularTitle: "الوجهات الأكثر شعبية",
    countries: ["بانكوك", "تشيانغ ماي", "فوكيت وكرابي", "باتايا", "خاو سوك", "أيوثايا"],
    tours: ["استكشاف مدينة بانكوك", "رحلة الثقافة الشمالية", "الانتقال بين الجزر", "استراحة الشاطئ والحياة الليلية", "مغامرة بحيرة الغابات", "رحلة المعابد القديمة"],
    from: "ابتداء من ",
    moreDetails: "المزيد من التفاصيل",
    days: ["3 أيام / ليلتان", "4 أيام / 3 ليال", "5 أيام / 4 ليال", "3 أيام / ليلتان", "4 أيام / 3 ليال", "يومان / ليلة واحدة"],
    tourDetails: [
      ["اليوم 1: جولة معابد وطعام الشارع.", "اليوم 2: سوق عائم وجولة بالقارب.", "يشمل: فندق، نقل المطار، دليل محلي."],
      ["اليوم 1: معابد المدينة القديمة والسوق الليلي.", "اليوم 2: دوي سوثيب والقرية الثقافية.", "يشمل: إقامة بوتيك، إفطار، مواصلات."],
      ["اليوم 1-2: إقامة شاطئية في فوكيت ورحلة غروب.", "اليوم 3: جولة قارب سريع إلى في في.", "يشمل: فندق، تذاكر الجزر، نقل."],
      ["اليوم 1: تسجيل دخول الشاطئ وسوق المساء.", "اليوم 2: رحلة جزيرة مرجانية.", "يشمل: فندق، إفطار، نقل."],
      ["اليوم 1: قوارب البحيرة وزيارة الكهف.", "اليوم 2: سفاري الغابة وممشى إطلالة.", "يشمل: إقامة عائمة، دليل، وجبات."],
      ["اليوم 1: آثار المعابد ورحلة نهر.", "اليوم 2: جولة دراجات تاريخية.", "يشمل: فندق، دليل، تذاكر."]
    ],
    bookNow: "احجز الآن",
    experiencesTitle: "تجارب مميزة",
    experiences: ["جولة معابد عند الشروق", "درس طبخ تايلندي", "نزهة جزيرة مخفية", "رحلة غابة شمالية"],
    planTitle: "خطط مع بلو مون",
    planText: "شاركنا التواريخ وتفضيلاتك، وسنجهز لك برنامجاً مخصصاً خلال 24 ساعة.",
    modalTitle: "احجز باقتك",
    packageLabel: "الباقة:",
    formLabels: ["الاسم", "البريد الإلكتروني", "عدد الأشخاص", "التاريخ"],
    submit: "إرسال",
    thanks: "شكرا لك. تم استلام طلب الحجز."
  },
  ru: {
    eyebrow: "Чего вы ждете?",
    paymentSuccess: "Спасибо. Оплата прошла успешно, бронирование подтверждено.",
    categoriesTitle: "Категории пакетов",
    categories: ["Семейные пакеты", "Для детей", "Медовый месяц", "Приключения", "Спа и велнес", "Премиум отдых"],
    popularTitle: "Популярные направления",
    countries: ["Бангкок", "Чиангмай", "Пхукет и Краби", "Паттайя", "Као Сок", "Аюттхая"],
    tours: ["Знакомство с Бангкоком", "Северная культура", "Островной отдых", "Пляж и ночная жизнь", "Озеро и джунгли", "Древние храмы"],
    from: "От ",
    moreDetails: "Подробнее",
    days: ["3 дня / 2 ночи", "4 дня / 3 ночи", "5 дней / 4 ночи", "3 дня / 2 ночи", "4 дня / 3 ночи", "2 дня / 1 ночь"],
    tourDetails: [
      ["День 1: Храмы и стрит-фуд.", "День 2: Плавучий рынок и лодка.", "Включено: отель, трансфер, гид."],
      ["День 1: Старый город и ночной рынок.", "День 2: Дой Сутхеп и культурная деревня.", "Включено: бутик-отель, завтрак, транспорт."],
      ["Дни 1-2: Пляж Пхукета и круиз на закате.", "День 3: Поездка на Пхи-Пхи.", "Включено: отель, билеты, трансферы."],
      ["День 1: Пляж и вечерний рынок.", "День 2: Поездка на остров.", "Включено: отель, завтрак, трансфер."],
      ["День 1: Озеро и пещерный храм.", "День 2: Сафари и треккинг.", "Включено: проживание, гид, питание."],
      ["День 1: Руины и речной закат.", "День 2: Велотур по парку.", "Включено: отель, гид, билеты."]
    ],
    bookNow: "Забронировать",
    experiencesTitle: "Фирменные впечатления",
    experiences: ["Храмы на рассвете", "Тайский кулинарный класс", "Пикник на скрытом пляже", "Треккинг с местным гидом"],
    planTitle: "Планируйте с Blue Moon",
    planText: "Сообщите даты и формат поездки. Мы подготовим маршрут за 24 часа.",
    modalTitle: "Забронируйте пакет",
    packageLabel: "Пакет:",
    formLabels: ["Имя", "Email", "Количество человек", "Дата"],
    submit: "Отправить",
    thanks: "Спасибо. Ваша заявка на бронирование получена."
  }
};

let typingTimer = null;
let typingState = { phraseIndex: 0, charIndex: 0, deleting: false };

function getTypingPhrases(lang) {
  const phrases = {
    en: [
      { text: "We've got your full covered insurance. 🛡️", tone: "primary" },
      { text: "We've got your visa covered. 🛂", tone: "primary" },
      { text: "Luxury transfers waiting for you.. 🚘", tone: "primary" },
      { text: "5-Star accommodations guaranteed. 🏨", tone: "primary" },
      { text: "GPS safety bands for kids. 📍", tone: "primary" },
      { text: "Experienced local guides with you. 🧭", tone: "primary" },
      { text: "Want something unique?", tone: "alert" },
      { text: "Customize your own travel package 🎯", tone: "primary" },
      { text: "& More ...", tone: "primary" },
      { text: "BOOK NOW", tone: "primary" }
    ],
    th: [
      { text: "เรามีประกันการเดินทางให้ครบ 🛡️", tone: "primary" },
      { text: "เราดูแลเรื่องวีซ่าให้คุณ 🛂", tone: "primary" },
      { text: "มีรถรับส่งหรูรอคุณอยู่ 🚘", tone: "primary" },
      { text: "รับประกันที่พักระดับ 5 ดาว 🏨", tone: "primary" },
      { text: "สายรัด GPS เพื่อความปลอดภัยเด็ก 📍", tone: "primary" },
      { text: "มีไกด์ท้องถิ่นมืออาชีพดูแลคุณ 🧭", tone: "primary" },
      { text: "อยากได้ทริปที่ไม่เหมือนใคร?", tone: "alert" },
      { text: "ออกแบบแพ็กเกจท่องเที่ยวของคุณเอง 🎯", tone: "primary" },
      { text: "และอีกมากมาย ...", tone: "primary" },
      { text: "จองเลย", tone: "primary" }
    ],
    ar: [
      { text: "لدينا تأمين سفر كامل لك 🛡️", tone: "primary" },
      { text: "نتولى إجراءات التأشيرة لك 🛂", tone: "primary" },
      { text: "نقل فاخر بانتظارك 🚘", tone: "primary" },
      { text: "إقامة 5 نجوم مضمونة 🏨", tone: "primary" },
      { text: "أساور GPS لسلامة الأطفال 📍", tone: "primary" },
      { text: "مرشدون محليون محترفون معك 🧭", tone: "primary" },
      { text: "تريد شيئا فريدا؟", tone: "alert" },
      { text: "خصص باقة سفرك بنفسك 🎯", tone: "primary" },
      { text: "والمزيد ...", tone: "primary" },
      { text: "احجز الآن", tone: "primary" }
    ],
    ru: [
      { text: "Полная страховка уже включена 🛡️", tone: "primary" },
      { text: "Мы оформим вам визу 🛂", tone: "primary" },
      { text: "Премиум трансфер уже ждет 🚘", tone: "primary" },
      { text: "Гарантированное 5-звездочное проживание 🏨", tone: "primary" },
      { text: "GPS-браслеты для безопасности детей 📍", tone: "primary" },
      { text: "Опытные местные гиды с вами 🧭", tone: "primary" },
      { text: "Хотите что-то уникальное?", tone: "alert" },
      { text: "Создайте свой туристический пакет 🎯", tone: "primary" },
      { text: "И многое другое ...", tone: "primary" },
      { text: "ЗАБРОНИРОВАТЬ", tone: "primary" }
    ]
  };
  return phrases[lang] || phrases.en;
}

function startTyping(lang) {
  if (!typingElement) return;
  if (typingTimer) clearTimeout(typingTimer);
  typingState = { phraseIndex: 0, charIndex: 0, deleting: false };
  const lines = getTypingPhrases(lang);

  function loop() {
    const current = lines[typingState.phraseIndex];
    typingState.charIndex += typingState.deleting ? -1 : 1;
    const visible = current.text.slice(0, typingState.charIndex);
    const toneClass = current.tone === "alert" ? "typing-alert" : "typing-primary";
    typingElement.innerHTML = `<span class="${toneClass}">${visible}</span>`;

    let delay = typingState.deleting ? 35 : 55;
    if (!typingState.deleting && typingState.charIndex === current.text.length) {
      delay = current.text.toUpperCase() === "BOOK NOW" || current.text === "จองเลย" || current.text === "احجز الآن" || current.text === "ЗАБРОНИРОВАТЬ" ? 3000 : 900;
      typingState.deleting = true;
    } else if (typingState.deleting && typingState.charIndex === 0) {
      typingState.deleting = false;
      typingState.phraseIndex = (typingState.phraseIndex + 1) % lines.length;
      delay = 260;
    }
    typingTimer = setTimeout(loop, delay);
  }

  loop();
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function applyLanguage(lang) {
  const t = i18n[lang] || i18n.en;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  setText(".eyebrow", t.eyebrow);
  setText("#paymentSuccess p", t.paymentSuccess);
  setText("#categories .section-title", t.categoriesTitle);
  setText("#destinations .section-title", t.popularTitle);
  setText("#experiences .section-title", t.experiencesTitle);
  setText("#contact .section-title", t.planTitle);
  setText("#contact p", t.planText);

  document.querySelectorAll(".category-card h3").forEach((el, i) => { if (t.categories[i]) el.textContent = t.categories[i]; });
  document.querySelectorAll(".tour-country").forEach((el, i) => { if (t.countries[i]) el.textContent = t.countries[i]; });
  document.querySelectorAll(".tour-card h3").forEach((el, i) => { if (t.tours[i]) el.textContent = t.tours[i]; });
  document.querySelectorAll(".details-toggle span:first-child").forEach((el) => { el.textContent = t.moreDetails; });
  document.querySelectorAll(".tour-meta").forEach((el, i) => { if (t.days[i]) el.textContent = t.days[i]; });
  document.querySelectorAll(".book-btn").forEach((el) => { el.textContent = t.bookNow; });
  document.querySelectorAll(".feature").forEach((el, i) => { if (t.experiences[i]) el.textContent = t.experiences[i]; });

  document.querySelectorAll(".tour-price").forEach((el) => {
    const strong = el.querySelector("strong");
    if (strong && el.firstChild) el.firstChild.textContent = t.from;
  });

  document.querySelectorAll(".tour-details").forEach((group, gi) => {
    const lines = group.querySelectorAll("p");
    lines.forEach((line, li) => {
      if (t.tourDetails[gi] && t.tourDetails[gi][li]) line.textContent = t.tourDetails[gi][li];
    });
  });

  const modalTitle = document.querySelector(".booking-dialog h3");
  if (modalTitle) modalTitle.textContent = t.modalTitle;

  const packageWrap = document.querySelector(".selected-package");
  if (packageWrap) packageWrap.childNodes[0].textContent = `${t.packageLabel} `;

  document.querySelectorAll("#bookingForm label").forEach((label, i) => {
    if (t.formLabels[i]) label.textContent = t.formLabels[i];
  });

  const submitBtn = document.querySelector(".submit-booking");
  if (submitBtn) submitBtn.textContent = t.submit;

  const thanks = document.getElementById("bookingThanksMessage");
  if (thanks) thanks.textContent = t.thanks;

  startTyping(lang);
  localStorage.setItem("site_lang", lang);
}

bookButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const card = button.closest(".tour-card");
    const packageTitle = card?.querySelector("h3")?.textContent?.trim() || "Selected Package";
    if (selectedPackageName) selectedPackageName.textContent = packageTitle;
    if (bookingForm) {
      bookingForm.reset();
      bookingForm.style.display = "grid";
    }
    const thanks = document.getElementById("bookingThanksMessage");
    if (thanks) thanks.hidden = true;
    bookingModal?.classList.add("open");
    bookingModal?.setAttribute("aria-hidden", "false");
  });
});

modalClose?.addEventListener("click", () => {
  bookingModal?.classList.remove("open");
  bookingModal?.setAttribute("aria-hidden", "true");
});

bookingModal?.addEventListener("click", (event) => {
  if (event.target === bookingModal) {
    bookingModal.classList.remove("open");
    bookingModal.setAttribute("aria-hidden", "true");
  }
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingForm.style.display = "none";
  const lang = languageSelect?.value || "en";
  const t = i18n[lang] || i18n.en;

  let thanks = document.getElementById("bookingThanksMessage");
  if (!thanks) {
    thanks = document.createElement("p");
    thanks.id = "bookingThanksMessage";
    thanks.style.margin = "0.9rem 0 0";
    thanks.style.color = "#0f6a39";
    thanks.style.fontWeight = "700";
    bookingDialog?.appendChild(thanks);
  }
  thanks.textContent = t.thanks;
  thanks.hidden = false;
});

const params = new URLSearchParams(window.location.search);
if (params.get("payment") === "success" && paymentSuccess) {
  paymentSuccess.hidden = false;
}

const savedLang = localStorage.getItem("site_lang") || "en";
if (languageSelect) {
  languageSelect.value = savedLang;
  languageSelect.addEventListener("change", (e) => {
    applyLanguage(e.target.value);
  });
}
applyLanguage(savedLang);
