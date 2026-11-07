document.addEventListener("DOMContentLoaded", function () {

let code = "";
const correct = "0000";

// Единый флаг: пароль уже был введён или нет
let pinPassed = false;

// Что открывать после пароля: 'gos' или 'qr'
let pendingAction = null;

const btnGos = document.getElementById("brt-gos");
const btnBank = document.getElementById("btn-moy-bank");
const btnQr  = document.getElementById("btn-qr-footer");
const pinPanel  = document.getElementById("pinPanel");
const loader    = document.getElementById("loader");
const nextWindow = document.getElementById("next-window");
const bankWindow = document.getElementById("moy-bank-window");
const arrow     = document.getElementById("arrow1");
const arrowBank = document.getElementById("arrow-bank");
const del       = document.getElementById("del");
const qrScreen  = document.getElementById("qr-screen");


// ---------- ОТКРЫТИЕ ОКОН (С МЯГКОЙ ЗАДЕРЖКОЙ И ПЛАВНОСТЬЮ) ----------
function openGos(){
  setTimeout(() => {
    nextWindow.classList.add("show");
  }, 75);
}

function closeGos(){
  setTimeout(() => {
    nextWindow.classList.remove("show");
  }, 75);
}

function openBank(){
  setTimeout(() => {
    bankWindow.classList.add("show");
  }, 75);
}

function closeBank(){
  setTimeout(() => {
    bankWindow.classList.remove("show");
  }, 75);
}

function openQR(){
  setTimeout(() => {
    qrScreen.classList.add("show");
    startCamera();
  }, 75);
}

function closeQR(){
  setTimeout(() => {
    qrScreen.classList.remove("show");
    stopCamera();
  }, 75);
}


// ---------- ОБРАБОТЧИКИ НАЖАТИЙ СЕРВИСОВ ----------
function handleGosClick() {
  if(!pinPassed){
    pendingAction = 'gos';
    pinPanel.classList.add("show");
  } else {
    openGos();
  }
}

function handleBankClick() {
  if(!pinPassed){
    pendingAction = 'bank';
    pinPanel.classList.add("show");
  } else {
    openBank();
  }
}

function handleMagazinClick() {
  if (typeof window.setActiveTab === 'function') {
    window.setActiveTab('home');
  } else {
    const homeTab = document.getElementById('btn-home');
    if (homeTab) homeTab.click();
  }
  setTimeout(() => {
    const target = document.querySelector('.section-products') || document.querySelector('.section-filters');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

// Привязка кнопок Госуслуги (на главной и в Сервисах)
if (btnGos) btnGos.onclick = handleGosClick;
const srvBtnGos = document.getElementById("srv-btn-gos");
if (srvBtnGos) srvBtnGos.onclick = handleGosClick;

// Привязка кнопок Мой Банк (на главной и в Сервисах)
if (btnBank) btnBank.onclick = handleBankClick;
const srvBtnBank = document.getElementById("srv-btn-moy-bank");
if (srvBtnBank) srvBtnBank.onclick = handleBankClick;

// Привязка кнопок Магазин (на главной и в Сервисах)
const btnMagazin = document.getElementById("btn-magazin");
if (btnMagazin) btnMagazin.onclick = handleMagazinClick;
const srvBtnMagazin = document.getElementById("srv-btn-magazin");
if (srvBtnMagazin) srvBtnMagazin.onclick = handleMagazinClick;

// Кнопка Сервисы внутри Сервисов (скролл наверх)
const srvBtnServices = document.getElementById("srv-btn-services");
if (srvBtnServices) {
  srvBtnServices.onclick = () => {
    const pageServices = document.getElementById('page-services');
    if (pageServices) pageServices.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// Закрытие PIN-панели по крестику
const pinCloseBtn = document.querySelector(".panel-box3 img[src*='x.png']");
if (pinCloseBtn) {
  pinCloseBtn.style.cursor = "pointer";
  pinCloseBtn.onclick = () => {
    pinPanel.classList.remove("show");
    code = "";
    updateDots();
    pendingAction = null;
  };
}


// ---------- КНОПКА KASPI QR ----------
btnQr.onclick = () => {
  if(!pinPassed){
    pendingAction = 'qr';
    pinPanel.classList.add("show");
  } else {
    openQR();
  }
};


// ---------- ОБРАБОТЧИК ВХОД/РЕГИСТРАЦИЯ В СЕРВИСАХ ----------
const srvUserRow = document.getElementById("srv-user-row");
function handleUserLoginClick() {
  const isPanelLocked = localStorage.getItem("panelLocked") === "true";
  if (isPanelLocked) {
    // Уже заблокировано — имя менять нельзя
    return;
  }
  if (!pinPassed) {
    pendingAction = 'login';
    pinPanel.classList.add("show");
  } else {
    window.openTextModal();
  }
}
if (srvUserRow) {
  srvUserRow.addEventListener("click", handleUserLoginClick);
}


// ---------- МОДАЛЬНОЕ ОКНО ДЛЯ ВВОДА ИМЕНИ ПОЛЬЗОВАТЕЛЯ ----------
window.openTextModal = function(onDone) {
  const overlay = document.getElementById("textModalOverlay");
  const input = document.getElementById("textModalInput");
  const btn = document.getElementById("textModalSubmitBtn");
  const panelInput = document.getElementById("panelInput");
  const srvUserName = document.getElementById("srv-user-name");
  const srvUserSettings = document.getElementById("srv-user-settings");

  if (!overlay || !input || !btn) {
    if (typeof onDone === 'function') onDone();
    return;
  }

  // Если уже заблокировано — не открываем модалку вообще
  if (localStorage.getItem("panelLocked") === "true") {
    if (typeof onDone === 'function') onDone();
    return;
  }

  const currentText = localStorage.getItem("panelText") || (panelInput ? panelInput.value : "");
  input.value = currentText;

  overlay.classList.add("show");
  setTimeout(() => {
    input.focus();
    if (input.value) input.select();
  }, 100);

  function submit() {
    const val = input.value.trim();
    if (!val) {
      input.focus();
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 400);
      return;
    }

    localStorage.setItem("panelText", val);
    localStorage.setItem("panelLocked", "true");
    localStorage.removeItem("panelTextDraft");

    if (panelInput) {
      panelInput.value = val;
      panelInput.disabled = true;
      panelInput.readOnly = true;
    }
    if (srvUserName) srvUserName.textContent = val;
    if (srvUserSettings) srvUserSettings.style.display = "block";

    overlay.classList.remove("show");
    btn.removeEventListener("click", submit);
    input.removeEventListener("keydown", onEnter);
    if (typeof onDone === 'function') {
      onDone();
    }
  }

  function onEnter(e) {
    if (e.key === "Enter") {
      submit();
    }
  }

  btn.addEventListener("click", submit);
  input.addEventListener("keydown", onEnter);
};

// Запрос имени только один раз при первом входе, если оно ещё не заблокировано
setTimeout(() => {
  const isPanelLocked = localStorage.getItem("panelLocked") === "true";
  const hasName = localStorage.getItem("panelText");
  if (!isPanelLocked && !hasName) {
    window.openTextModal();
  }
}, 400);


// ---------- ВВОД PIN ----------
window.press = function(num){

  if(code.length >= 4) return;

  code += num;
  updateDots();
  del.style.visibility = "visible";

  if(code.length === 4){
    setTimeout(()=>{
      if(code === correct){

        loader.classList.add("show");

        setTimeout(()=>{
          loader.classList.remove("show");
          pinPanel.classList.remove("show");

          setTimeout(()=>{
            pinPassed = true;

            const isPanelLocked = localStorage.getItem("panelLocked") === "true";

            function proceed() {
              if (pendingAction === 'gos') {
                openGos();
              } else if (pendingAction === 'bank') {
                openBank();
              } else if (pendingAction === 'qr') {
                openQR();
              }
              pendingAction = null;
            }

            if (!isPanelLocked && pendingAction === 'login') {
              window.openTextModal(proceed);
            } else {
              proceed();
            }

          }, 300);

        }, 400);

      } else {
        code = "";
        updateDots();
        del.style.visibility = "hidden";
      }
    }, 200);
  }

};


// ---------- УДАЛЕНИЕ ----------
window.removeDigit = function(){
  code = code.slice(0, -1);
  updateDots();
  if(code.length === 0) del.style.visibility = "hidden";
};


// ---------- ТОЧКИ ----------
function updateDots(){
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i < code.length);
  });
}


// ---------- СТРЕЛКА (закрыть Госуслуги) ----------
arrow.onclick = () => closeGos();

// ---------- СТРЕЛКА (закрыть Мой Банк) ----------
arrowBank.onclick = () => closeBank();

// ---------- SWIPE (закрыть Госуслуги) ----------
let startX = 0;
nextWindow.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
nextWindow.addEventListener("touchend", e => {
  if(e.changedTouches[0].clientX - startX > 120) closeGos();
});

// ---------- SWIPE (закрыть Мой Банк) ----------
let startXBank = 0;
bankWindow.addEventListener("touchstart", e => { startXBank = e.touches[0].clientX; });
bankWindow.addEventListener("touchend", e => {
  if(e.changedTouches[0].clientX - startXBank > 120) closeBank();
});


// ---------- КАМЕРА ----------
let cameraStream = null;

window.startCamera = async function(){
  const video = document.getElementById("qr-video");
  if(cameraStream) return;
  try {
    // ideal вместо exact — работает и на телефоне (задняя) и на компьютере (любая)
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    cameraStream = stream;
    video.srcObject = stream;
  } catch(err) {
    console.warn("Камера недоступна:", err);
  }
};

window.stopCamera = function(){
  const video = document.getElementById("qr-video");
  if(cameraStream){
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
    video.srcObject = null;
  }
};


// ---------- ЗАКРЫТИЕ QR ----------
document.getElementById("qr-close-btn").addEventListener("click", closeQR);

// Фонарик (если поддерживается)
document.getElementById("qr-torch-btn").addEventListener("click", async () => {
  if(!cameraStream) return;
  const track = cameraStream.getVideoTracks()[0];
  if(!track) return;
  try {
    const cap = track.getCapabilities();
    if(cap.torch){
      const settings = track.getSettings();
      await track.applyConstraints({ advanced: [{ torch: !settings.torch }] });
    }
  } catch(e) {}
});

});


// ---------- GOC TABS (из оригинального script.js) ----------
const btn1Wind = document.getElementById("btn1-wind")
const btn2Wind = document.getElementById("btn2-wind")
const section1Wind = document.getElementById("section1-wind")
const section2Wind = document.getElementById("section2-wind")

btn2Wind.addEventListener('click', () => {
  btn2Wind.style.background = 'white'
  btn1Wind.style.background = '#ebebeb'
  btn2Wind.style.zIndex = '1'
  btn1Wind.style.zIndex = '0'
  setTimeout(() => {
    section1Wind.style.display = 'none'
    section2Wind.style.display = 'block'
  }, 40)
})

btn1Wind.addEventListener('click', () => {
  btn1Wind.style.background = 'white'
  btn2Wind.style.background = '#ebebeb'
  btn1Wind.style.zIndex = '1'
  btn2Wind.style.zIndex = '0'
  setTimeout(() => {
    section1Wind.style.display = 'block'
    section2Wind.style.display = 'none'
  }, 40)
})


// ======== НАВИГАЦИЯ ВКЛАДОК ========
document.addEventListener('DOMContentLoaded', function () {

  const pages = {
    messages: document.getElementById('page-messages'),
    services:  document.getElementById('page-services'),
  };

  const tabs = {
    home:     document.getElementById('btn-home'),
    messages: document.getElementById('btn-messages'),
    services: document.getElementById('btn-services'),
  };

  const allTabBtns = document.querySelectorAll('.footer .a p');

  function setActiveTab(name) {
    allTabBtns.forEach(p => p.style.color = '');

    if (name === 'home') {
      if (tabs.home) tabs.home.querySelector('p').style.color = 'red';
    } else if (name === 'messages') {
      if (tabs.messages) tabs.messages.querySelector('p').style.color = 'red';
    } else if (name === 'services') {
      if (tabs.services) tabs.services.querySelector('p').style.color = 'red';
    }

    setTimeout(() => {
      Object.values(pages).forEach(p => p && p.classList.remove('page-open'));
      if (name === 'messages' && pages.messages) pages.messages.classList.add('page-open');
      if (name === 'services' && pages.services) pages.services.classList.add('page-open');
    }, 60);
  }

  window.setActiveTab = setActiveTab;

  if (tabs.home) tabs.home.querySelector('p').style.color = 'red';

  if (tabs.home)     tabs.home.addEventListener('click',     () => setActiveTab('home'));
  if (tabs.messages) tabs.messages.addEventListener('click', () => setActiveTab('messages'));
  if (tabs.services) tabs.services.addEventListener('click', () => setActiveTab('services'));

});


// ======== ЧАТ KASPI GOLD ========
document.addEventListener('DOMContentLoaded', function () {

  const chatScreen    = document.getElementById('chat-kaspi-gold');
  const chatMessages  = document.getElementById('chat-messages');
  const chatBackBtn   = document.getElementById('chat-back-btn');
  const scrollDownBtn = document.getElementById('chat-scroll-down');

  // Первый элемент в списке сообщений — Kaspi Gold
  const kaspiGoldItem = document.querySelector('#page-messages .msg-item');

  function openChat() {
    setTimeout(() => {
      chatScreen.classList.add('chat-open');
      if (scrollDownBtn) scrollDownBtn.classList.remove('visible');
      requestAnimationFrame(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    }, 75);
  }

  function closeChat() {
    setTimeout(() => {
      chatScreen.classList.remove('chat-open');
    }, 75);
  }

  if (kaspiGoldItem) {
    kaspiGoldItem.addEventListener('click', openChat);
  }

  if (chatBackBtn) {
    chatBackBtn.addEventListener('click', closeChat);
  }

  // Кнопка прокрутки вниз
  if (scrollDownBtn && chatMessages) {
    scrollDownBtn.addEventListener('click', () => {
      chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    });

    chatMessages.addEventListener('scroll', () => {
      const distFromBottom = chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight;
      if (distFromBottom > 80) {
        scrollDownBtn.classList.add('visible');
      } else {
        scrollDownBtn.classList.remove('visible');
      }
    }, { passive: true });
  }

  // Свайп вправо — закрыть чат
  let chatStartX = 0;
  if (chatScreen) {
    chatScreen.addEventListener('touchstart', e => {
      chatStartX = e.touches[0].clientX;
    }, { passive: true });
    chatScreen.addEventListener('touchend', e => {
      if (e.changedTouches[0].clientX - chatStartX > 80) closeChat();
    }, { passive: true });
  }

});
