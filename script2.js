const btn1Gos = document.getElementById("btn1-gos")
const btn2Gos = document.getElementById("btn2-gos")
const sectionGos = document.getElementById("section-gos")

btn2Gos.addEventListener('click', () => {
  btn2Gos.style.background = 'white'
  btn1Gos.style.background = '#ebebeb'
  btn2Gos.style.zIndex = '1'
  btn1Gos.style.zIndex = '0'
  setTimeout(() => {
    sectionGos.style.display = 'block'
  }, 40)
})

btn1Gos.addEventListener('click', () => {
  btn1Gos.style.background = 'white'
  btn2Gos.style.background = '#ebebeb'
  btn1Gos.style.zIndex = '1'
  btn2Gos.style.zIndex = '0'
  setTimeout(() => {
    sectionGos.style.display = 'none'
  }, 40)
})  


const footerBtn1Gos = document.getElementById("footerBtn1-gos");
const windGos = document.getElementById("window-gos");
const closeBtnGos = document.getElementById("closeBtnGos");

footerBtn1Gos.addEventListener("click", () => {
  windGos.style.display = "flex";

  windGos.classList.remove("active");
  void windGos.offsetWidth;
  windGos.classList.add("active");
});

closeBtnGos.addEventListener("click", () => {
  windGos.classList.remove("active");

  setTimeout(() => {
    windGos.style.display = "none";
  }, 500);
});


const text4Gos = document.querySelector(".text4-gos");

function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}

function getRandomNumberString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += getRandomDigit();
  }
  return result;
}

footerBtn1Gos.addEventListener("click", () => {
  const length = text4Gos.textContent.length;
  text4Gos.textContent = getRandomNumberString(length);
});


const footerBtn2Gos = document.getElementById("footerBtn2-gos");

footerBtn2Gos.addEventListener("click", async () => {
  if (navigator.share && navigator.canShare) {
    try {
      const response = await fetch("./img/udostoverenie.jpg");
      const blob = await response.blob();
      const file = new File([blob], "udostoverenie.jpg", {
        type: "image/jpeg"
      });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Поделиться PDF",
          files: [file]
        });
      } else {
        alert("Ваш браузер не поддерживает отправку файлов");
      }
    } catch (err) {
      console.error("Ошибка при шаринге PDF:", err);
    }
  } else {
    alert("Ваш браузер не поддерживает Web Share API");
  }
});


const footerBtn3Gos = document.getElementById("footerBtn3-gos");

const shareTextGos =
`Жакаева Жулдыз Таразовна
050402650894
02.04.2005
07.07.2021
06.07.2031`;

function getShareTextGos() {
  const curInputs = document.querySelectorAll('.block-text2-gos');
  if (curInputs.length >= 5) {
    const lines = [];
    curInputs.forEach(inp => {
      if (inp.value && inp.value.trim()) lines.push(inp.value.trim());
    });
    if (lines.length > 0) return lines.join('\n');
  }
  return shareTextGos;
}

footerBtn3Gos.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Поделиться текстом',
        text: getShareTextGos()
      });
    } catch (err) {
      console.error('Ошибка при попытке поделиться:', err);
    }
  } else {
    alert('Ваш браузер не поддерживает Web Share API');
  }
});


const zoomAreaGos = document.querySelector('.con-section-gos');

let scaleGos = 1;
let startDistanceGos = 0;
let originXGos = 0;
let originYGos = 0;

zoomAreaGos.addEventListener('touchstart', e => {
  if (e.touches.length === 2) {
    startDistanceGos = getDistance(e.touches[0], e.touches[1]);

    const rect = zoomAreaGos.getBoundingClientRect();
    originXGos = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
    originYGos = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
  }
}, { passive: false });

zoomAreaGos.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();

    const newDistance = getDistance(e.touches[0], e.touches[1]);
    scaleGos *= newDistance / startDistanceGos;
    scaleGos = Math.min(Math.max(scaleGos, 1), 5);

    zoomAreaGos.style.transformOrigin = `${originXGos}px ${originYGos}px`;
    zoomAreaGos.style.transform = `scale(${scaleGos})`;

    startDistanceGos = newDistance;
  }
}, { passive: false });

function getDistance(t1, t2) {
  return Math.hypot(
    t2.clientX - t1.clientX,
    t2.clientY - t1.clientY
  );
}














document.getElementById("btn-gos").addEventListener("click", function(){

	let loader = document.getElementById("loader-screen");
	let bar = document.querySelector(".loader-bar");
	let pre = document.getElementById("pre-section");
	let page = document.querySelector(".con-gos");

	/* СБРОС СОСТОЯНИЯ */

	bar.style.width = "0%";
	loader.classList.remove("show");
	page.classList.remove("show");
	pre.style.display = "none";


	/* выезжает белый экран */

	setTimeout(()=>{
		loader.classList.add("show");
	}, 80);


	/* запуск загрузки */

	setTimeout(()=>{
		bar.style.width = "100%";
	},400);


	/* показывается pre-section */

	setTimeout(()=>{
		pre.style.display = "block";
	},900);


	/* открывается основная страница */

	setTimeout(()=>{
		page.classList.add("show");
	},1500);

});


document.getElementById("x-gos").addEventListener("click", function(){
	setTimeout(()=>{
		let loader = document.getElementById("loader-screen");
		let pre = document.getElementById("pre-section");
		let page = document.querySelector(".con-gos");

		page.classList.remove("show");
		loader.classList.remove("show");
		pre.style.display = "none";
	}, 75);
});


// Открытие экрана студенческого билета с анимацией загрузки
const btnStudent = document.getElementById("btn-student");
if (btnStudent) {
	btnStudent.addEventListener("click", function(){
		let loader = document.getElementById("loader-screen");
		let bar = document.querySelector(".loader-bar");
		let pre = document.getElementById("pre-section");
		let page = document.getElementById("con-student");

		bar.style.width = "0%";
		loader.classList.remove("show");
		page.classList.remove("show");
		pre.style.display = "none";

		setTimeout(()=>{
			loader.classList.add("show");
		}, 80);

		setTimeout(()=>{
			bar.style.width = "100%";
		}, 400);

		setTimeout(()=>{
			pre.style.display = "block";
		}, 900);

		setTimeout(()=>{
			page.classList.add("show");
		}, 1500);
	});
}

const xStudent = document.getElementById("x-student");
if (xStudent) {
	xStudent.addEventListener("click", function(){
		setTimeout(()=>{
			let loader = document.getElementById("loader-screen");
			let pre = document.getElementById("pre-section");
			let page = document.getElementById("con-student");

			page.classList.remove("show");
			loader.classList.remove("show");
			pre.style.display = "none";
		}, 75);
	});
}











const saveBtn = document.getElementById("saveBtn")
const inputs = document.querySelectorAll(".block-text2-gos")

// ===== фото документов: вставить можно один раз, потом заменить нельзя =====
function compressImage(file, maxSide, quality){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = e => {
      const im = new Image()
      im.onerror = reject
      im.onload = () => {
        const k = Math.min(1, maxSide / Math.max(im.width, im.height))
        const c = document.createElement("canvas")
        c.width = Math.round(im.width * k)
        c.height = Math.round(im.height * k)
        const ctx = c.getContext("2d")
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, c.width, c.height)
        ctx.drawImage(im, 0, 0, c.width, c.height)
        resolve(c.toDataURL("image/jpeg", quality))
      }
      im.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function initDocPhoto(n){
  const key = "docImg" + n
  const img = document.getElementById("docImg" + n)
  const input = document.getElementById("imgUpload" + n)
  const btn = document.getElementById("docAddBtn" + n)

  function showLocked(src){
    img.src = src
    img.style.display = "block"
    btn.style.display = "none"
    input.disabled = true
  }

  // уже сохранённое фото - показываем и блокируем замену
  const saved = localStorage.getItem(key)
  if(saved){
    showLocked(saved)
  }

  btn.addEventListener("click", () => {
    if(localStorage.getItem(key)) return
    input.click()
  })

  input.addEventListener("change", async function(){
    const file = this.files[0]
    if(!file || localStorage.getItem(key)) return

    try{
      const data = await compressImage(file, 1600, 0.85)
      localStorage.setItem(key, data)   // сохраняем навсегда
      showLocked(data)
    }catch(err){
      console.error("Не удалось сохранить фото:", err)
      alert("Не удалось сохранить фото. Попробуйте другое изображение.")
    }
    this.value = ""
  })
}

function initStaticIDPhoto() {
  localStorage.removeItem("docImg1");
  const docImg = document.getElementById("docImg1");
  if (docImg) {
    docImg.src = "./img/udostoverenie.jpg";
    docImg.style.display = "block";
  }
}
initStaticIDPhoto();
window.addEventListener("load", initStaticIDPhoto);

// ===== Фото студенческого билета =====
function initStudentDocPhoto() {
  const key = "docImgStudent";
  const img = document.getElementById("studentDocImg");
  const input = document.getElementById("studentImgUpload");
  const btn = document.getElementById("studentAddBtn");
  if (!img || !input || !btn) return;

  function showLocked(src) {
    img.src = src;
    img.style.display = "block";
    btn.style.display = "none";
    input.disabled = true;
  }

  const saved = localStorage.getItem(key);
  if (saved) {
    showLocked(saved);
  }

  btn.addEventListener("click", () => {
    if (localStorage.getItem(key)) return;
    input.click();
  });

  input.addEventListener("change", async function() {
    const file = this.files[0];
    if (!file || localStorage.getItem(key)) return;

    try {
      const data = await compressImage(file, 1600, 0.85);
      localStorage.setItem(key, data);
      showLocked(data);
    } catch(err) {
      console.error("Не удалось сохранить фото студенческого билета:", err);
      alert("Не удалось сохранить фото. Попробуйте другое изображение.");
    }
    this.value = "";
  });
}

initStudentDocPhoto();

// просим браузер не удалять сохранённые данные автоматически
if(navigator.storage && navigator.storage.persist){
  navigator.storage.persist().catch(()=>{})
}


// Функция обновления отображения профиля в Сервисах и в PIN-панели
function updateProfileDisplay(){
  const srvUserName = document.getElementById("srv-user-name");
  const srvUserSettings = document.getElementById("srv-user-settings");
  const panelInputEl = document.getElementById("panelInput");
  const modalInputEl = document.getElementById("textModalInput");
  const isPanelLocked = localStorage.getItem("panelLocked") === "true";
  const savedText = localStorage.getItem("panelText");
  const draftText = localStorage.getItem("panelTextDraft");

  if(isPanelLocked && savedText){
    if(srvUserName) srvUserName.textContent = savedText;
    if(srvUserSettings) srvUserSettings.style.display = "block";
    if(panelInputEl){
      panelInputEl.value = savedText;
      panelInputEl.disabled = true;
      panelInputEl.readOnly = true;
    }
    if(modalInputEl){
      modalInputEl.value = savedText;
    }
  } else if(draftText){
    if(srvUserName) srvUserName.textContent = draftText;
    if(srvUserSettings) srvUserSettings.style.display = "block";
    if(panelInputEl){
      panelInputEl.value = draftText;
    }
    if(modalInputEl){
      modalInputEl.value = draftText;
    }
  } else {
    if(srvUserName) srvUserName.textContent = "Вход/Регистрация";
    if(srvUserSettings) srvUserSettings.style.display = "none";
  }
}

// Привязка ввода в panelInput к черновику
const panelInputEl = document.getElementById("panelInput");
if(panelInputEl){
  panelInputEl.addEventListener("input", () => {
    if(localStorage.getItem("panelLocked") !== "true"){
      const val = panelInputEl.value.trim();
      localStorage.setItem("panelTextDraft", val);
      updateProfileDisplay();
    }
  });
}

// Кнопка сохранить в гос секции
if(saveBtn){
  saveBtn.addEventListener("click", function(){
    localStorage.removeItem("gosReset");

    // 1. Сохраняем поля документов в гос секции и блокируем
    inputs.forEach((inp, index)=>{
      localStorage.setItem("input"+index, inp.value);
      inp.readOnly = true;
    });

    // 2. Получаем вписанный текст (из модалки, panelInput или сохраненного черновика)
    const modalInputEl = document.getElementById("textModalInput");
    let finalText = "";
    if(modalInputEl && modalInputEl.value.trim()){
      finalText = modalInputEl.value.trim();
    } else if(panelInputEl && panelInputEl.value.trim()){
      finalText = panelInputEl.value.trim();
    } else if(localStorage.getItem("panelTextDraft")){
      finalText = localStorage.getItem("panelTextDraft");
    } else if(localStorage.getItem("panelText")){
      finalText = localStorage.getItem("panelText");
    }

    if(finalText){
      localStorage.setItem("panelText", finalText);
    }
    localStorage.setItem("panelLocked", "true");
    localStorage.setItem("locked", "true");

    if(panelInputEl){
      if(finalText) panelInputEl.value = finalText;
      panelInputEl.disabled = true;
      panelInputEl.readOnly = true;
    }

    updateProfileDisplay();

    // Скрываем кнопку "Сохранить"
    saveBtn.style.display = "none";
  });
}

// Загрузка состояния при открытии страницы
function loadSavedAppState(){
  // Удостоверение личности — статично и неизменно
  const idData = [
    "Жакаева Жулдыз Таразовна",
    "050402650894",
    "02.04.2005",
    "053279304",
    "07.07.2021",
    "06.07.2031"
  ];
  inputs.forEach((input, index)=>{
    if (idData[index] !== undefined) {
      input.value = idData[index];
    }
    input.readOnly = true;
  });

  const docImg = document.getElementById("docImg1");
  if (docImg) {
    docImg.src = "./img/udostoverenie.jpg";
    docImg.style.display = "block";
  }

  if (saveBtn) saveBtn.style.display = "none";

  // Обновляем профиль (Вход/Регистрация или имя)
  updateProfileDisplay();
}

window.addEventListener("load", loadSavedAppState);
document.addEventListener("DOMContentLoaded", loadSavedAppState);

// ===== Сброс данных Удостоверения личности и профиля по клику на карточку Dyson =====
function resetGosuslugiID(){
  return; // Сброс изменений и добавлений отключен

  // 1. Очищаем сохранённое фото удостоверения и восстанавливаем кнопку добавления
  localStorage.removeItem("docImg1");
  const docImg = document.getElementById("docImg1");
  if(docImg){
    docImg.src = "";
    docImg.style.display = "none";
  }
  const docAddBtn = document.getElementById("docAddBtn1");
  if(docAddBtn){
    docAddBtn.style.display = "flex";
  }
  const imgUpload = document.getElementById("imgUpload1");
  if(imgUpload){
    imgUpload.disabled = false;
    imgUpload.value = "";
  }

  // 1.1 Очищаем сохранённое фото студенческого билета
  localStorage.removeItem("docImgStudent");
  const studentImg = document.getElementById("studentDocImg");
  if(studentImg){
    studentImg.src = "";
    studentImg.style.display = "none";
  }
  const studentBtn = document.getElementById("studentAddBtn");
  if(studentBtn){
    studentBtn.style.display = "flex";
  }
  const studentUpload = document.getElementById("studentImgUpload");
  if(studentUpload){
    studentUpload.disabled = false;
    studentUpload.value = "";
  }

  // 2. Снимаем блокировку полей и очищаем значения
  localStorage.removeItem("locked");
  localStorage.setItem("gosReset", "true");
  inputs.forEach((inp, index)=>{
    localStorage.removeItem("input" + index);
    inp.readOnly = false;
    inp.value = "";
  });

  // 3. Возвращаем кнопку "Сохранить"
  if(saveBtn){
    saveBtn.style.display = "block";
  }

  // 4. Сброс имени пользователя и профиля (Сервисы и PIN)
  localStorage.removeItem("panelText");
  localStorage.removeItem("panelTextDraft");
  localStorage.removeItem("panelLocked");
  const srvUserName = document.getElementById("srv-user-name");
  const srvUserSettings = document.getElementById("srv-user-settings");
  const panelInputEl = document.getElementById("panelInput");
  const modalInputEl = document.getElementById("textModalInput");
  if(srvUserName) srvUserName.textContent = "Вход/Регистрация";
  if(srvUserSettings) srvUserSettings.style.display = "none";
  if(panelInputEl){
    panelInputEl.value = "";
    panelInputEl.disabled = false;
    panelInputEl.readOnly = false;
  }
  if(modalInputEl){
    modalInputEl.value = "";
  }

  // 5. Легкий тактильный виброотклик (если поддерживается)
  if(navigator.vibrate){
    try { navigator.vibrate(50); } catch(e){}
  }
}

// Привязываем клик к карточке Dyson Airwrap на главной
// Кнопка сброса всех изменений и добавлений (Dyson) отключена
function initDysonResetListener(){
  // Отключено по запросу пользователя: клик по Dyson больше не сбрасывает изменения
}

initDysonResetListener();
document.addEventListener("DOMContentLoaded", initDysonResetListener);

// Горизонтальный скролл мышью / тачем для карточек документов
function initCardsScroll() {
  const container = document.querySelector(".wind-cards-scroll");
  if (!container || container.dataset.scrollInited) return;
  container.dataset.scrollInited = "true";

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasMoved = false;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    hasMoved = false;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX);
    if (Math.abs(walk) > 3) {
      hasMoved = true;
    }
    container.scrollLeft = scrollLeft - walk;
  });

  container.addEventListener("click", (e) => {
    if (hasMoved) {
      e.stopPropagation();
      hasMoved = false;
    }
  }, true);
}

initCardsScroll();
document.addEventListener("DOMContentLoaded", initCardsScroll);

// ===== QR-код и отправка для студенческого билета =====
function initStudentActions() {
  const fBtn1Student = document.getElementById("footerBtn1-student");
  const text4Student = document.querySelector("#window-student .text4-student");
  if (fBtn1Student) {
    fBtn1Student.addEventListener("click", function(){
      if (text4Student) {
        text4Student.textContent = getRandomNumberString(6);
      }
      const winStudent = document.getElementById("window-student");
      if (winStudent) winStudent.classList.add("active");
    });
  }

  const closeBtnStudent = document.getElementById("closeBtnStudent");
  if (closeBtnStudent) {
    closeBtnStudent.addEventListener("click", function(){
      const winStudent = document.getElementById("window-student");
      if (winStudent) winStudent.classList.remove("active");
    });
  }

  const fBtn2Student = document.getElementById("footerBtn2-student");
  if (fBtn2Student) {
    fBtn2Student.addEventListener("click", async function(){
      const saved = localStorage.getItem("docImgStudent");
      if (saved && navigator.share) {
        try {
          const res = await fetch(saved);
          const blob = await res.blob();
          const file = new File([blob], "student_card.jpg", { type: "image/jpeg" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "Студенческий билет",
              files: [file]
            });
            return;
          }
        } catch(e) {}
      }
      alert("Документ готов к отправке.");
    });
  }
}

initStudentActions();
document.addEventListener("DOMContentLoaded", initStudentActions);


// ===== Управление балансами "Мой Банк" (Kaspi Gold, Депозит 1, Kaspi Бонус) =====
const DEFAULT_BANK_GOLD = "925 411,94 ₸";
const DEFAULT_BANK_DEPOSIT = "780 000,45 ₸";
const DEFAULT_BANK_BONUS = "0 Б";

function formatBonusHtml(bonusStr) {
  if (!bonusStr) return '0 <span class="bank-bonus-currency">Б</span>';
  const trimmed = bonusStr.trim();
  if (trimmed.endsWith("Б")) {
    const numPart = trimmed.slice(0, -1).trim();
    return numPart + ' <span class="bank-bonus-currency">Б</span>';
  }
  return trimmed;
}

function updateBankDisplay() {
  const isReset = localStorage.getItem("bankReset") === "true";
  const isLocked = localStorage.getItem("bankLocked") === "true";

  const valGoldEl = document.getElementById("bank-val-gold");
  const valDepositEl = document.getElementById("bank-val-deposit");
  const valBonusEl = document.getElementById("bank-val-bonus");

  const inputGold = document.getElementById("bank-input-gold");
  const inputDeposit = document.getElementById("bank-input-deposit");
  const inputBonus = document.getElementById("bank-input-bonus");

  const saveBtn = document.getElementById("bank-save-btn");
  const chatGold = document.getElementById("chat-gold-amount");

  if (!valGoldEl || !inputGold) return;

  let currentGold = localStorage.getItem("bankGold");
  let currentDeposit = localStorage.getItem("bankDeposit");
  let currentBonus = localStorage.getItem("bankBonus");

  if (currentGold === null) {
    currentGold = DEFAULT_BANK_GOLD;
  }
  if (currentDeposit === null) {
    currentDeposit = DEFAULT_BANK_DEPOSIT;
  }
  if (currentBonus === null) {
    currentBonus = DEFAULT_BANK_BONUS;
  }

  // Обновляем текстовые элементы
  valGoldEl.textContent = currentGold;
  valDepositEl.textContent = currentDeposit;
  valBonusEl.innerHTML = formatBonusHtml(currentBonus);

  if (chatGold) {
    chatGold.textContent = currentGold;
  }

  // Обновляем инпуты
  inputGold.value = currentGold;
  inputDeposit.value = currentDeposit;
  inputBonus.value = currentBonus;

  // Режим редактирования: если был вызван сброс и ещё не заблокировано
  const isEditing = isReset && !isLocked;

  if (isEditing) {
    valGoldEl.style.display = "none";
    valDepositEl.style.display = "none";
    valBonusEl.style.display = "none";

    inputGold.style.display = "block";
    inputDeposit.style.display = "block";
    inputBonus.style.display = "block";

    if (saveBtn) saveBtn.style.display = "flex";
  } else {
    valGoldEl.style.display = "block";
    valDepositEl.style.display = "block";
    valBonusEl.style.display = "block";

    inputGold.style.display = "none";
    inputDeposit.style.display = "none";
    inputBonus.style.display = "none";

    if (saveBtn) saveBtn.style.display = "none";
  }
}

function resetBankBalances() {
  // Обнуляем три счёта до 0 и открываем возможность редактирования
  localStorage.setItem("bankReset", "true");
  localStorage.setItem("bankLocked", "false");
  localStorage.setItem("bankGold", "0 ₸");
  localStorage.setItem("bankDeposit", "0 ₸");
  localStorage.setItem("bankBonus", "0 Б");

  updateBankDisplay();

  // Виброотклик подтверждения сброса
  if (navigator.vibrate) {
    try { navigator.vibrate([40, 50, 40]); } catch(e){}
  }
}

function saveBankBalances() {
  const inputGold = document.getElementById("bank-input-gold");
  const inputDeposit = document.getElementById("bank-input-deposit");
  const inputBonus = document.getElementById("bank-input-bonus");

  let gVal = inputGold ? inputGold.value.trim() : "0 ₸";
  let dVal = inputDeposit ? inputDeposit.value.trim() : "0 ₸";
  let bVal = inputBonus ? inputBonus.value.trim() : "0 Б";

  if (!gVal) gVal = "0 ₸";
  else if (!gVal.includes("₸")) gVal = gVal + " ₸";

  if (!dVal) dVal = "0 ₸";
  else if (!dVal.includes("₸")) dVal = dVal + " ₸";

  if (!bVal) bVal = "0 Б";
  else if (!bVal.includes("Б")) bVal = bVal + " Б";

  localStorage.setItem("bankGold", gVal);
  localStorage.setItem("bankDeposit", dVal);
  localStorage.setItem("bankBonus", bVal);
  localStorage.setItem("bankLocked", "true");

  updateBankDisplay();

  if (navigator.vibrate) {
    try { navigator.vibrate(50); } catch(e){}
  }
}

function initBankBalanceManager() {
  updateBankDisplay();

  const saveBtn = document.getElementById("bank-save-btn");
  if (saveBtn && !saveBtn.dataset.listenerAdded) {
    saveBtn.dataset.listenerAdded = "true";
    saveBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      saveBankBalances();
    });
  }

  [
    document.getElementById("bank-input-gold"),
    document.getElementById("bank-input-deposit"),
    document.getElementById("bank-input-bonus")
  ].forEach(function(inp) {
    if (inp && !inp.dataset.initEvents) {
      inp.dataset.initEvents = "true";
      inp.addEventListener("click", function(e) {
        e.stopPropagation();
      });
      inp.addEventListener("focus", function() {
        inp.select();
      });
      inp.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          inp.blur();
          saveBankBalances();
        }
      });
    }
  });

  const cardCharger = document.getElementById("card-charger-reset");
  if (cardCharger && !cardCharger.dataset.listenerAdded) {
    cardCharger.dataset.listenerAdded = "true";
    cardCharger.addEventListener("click", function() {
      resetBankBalances();
    });
  }
}

initBankBalanceManager();
document.addEventListener("DOMContentLoaded", initBankBalanceManager);
window.addEventListener("load", initBankBalanceManager);

// Копирование реквизитов по клику на иконку копирования
function initRequisiteCopyListeners() {
  document.querySelectorAll(".section2-block-gos").forEach(block => {
    const input = block.querySelector(".block-text2-gos");
    const copyImg = block.querySelector("img");
    if (copyImg && input && !copyImg.dataset.copyInited) {
      copyImg.dataset.copyInited = "true";
      copyImg.addEventListener("click", () => {
        const val = input.value;
        if (navigator.clipboard && val) {
          navigator.clipboard.writeText(val).then(() => {
            if (navigator.vibrate) try { navigator.vibrate(35); } catch(e){}
          }).catch(() => {});
        }
      });
    }
  });
}
initRequisiteCopyListeners();
document.addEventListener("DOMContentLoaded", initRequisiteCopyListeners);
