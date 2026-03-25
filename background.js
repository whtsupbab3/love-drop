const ALARM_NAME = "love-drop-reminder";

let _messages = null;
let _pics = null;

async function getMessages() {
  if (!_messages) {
    const res = await fetch(chrome.runtime.getURL("messages.json"));
    _messages = await res.json();
  }
  return _messages;
}

async function getPics() {
  if (!_pics) {
    const res = await fetch(chrome.runtime.getURL("pics.json"));
    _pics = await res.json();
  }
  return _pics;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function sendNotification() {
  const [messages, pics] = await Promise.all([getMessages(), getPics()]);
  const message = pickRandom(messages);
  const hasPic = pics.length > 0;

  chrome.notifications.create({
    type: hasPic ? "image" : "basic",
    iconUrl: "icons/icon-128.png",
    title: "love drop 💛",
    message,
    priority: 1,
  });
}

async function scheduleNext() {
  const { enabled = true, minMinutes = 30, maxMinutes = 300 } =
    await chrome.storage.sync.get(["enabled", "minMinutes", "maxMinutes"]);

  if (!enabled) return;

  const delay = minMinutes + Math.random() * (maxMinutes - minMinutes);
  chrome.alarms.create(ALARM_NAME, { delayInMinutes: delay });
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return;

  const { enabled = true } = await chrome.storage.sync.get("enabled");
  if (!enabled) return;

  await sendNotification();
  scheduleNext();
});

chrome.runtime.onInstalled.addListener(scheduleNext);
chrome.runtime.onStartup.addListener(scheduleNext);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "reschedule") {
    chrome.alarms.clear(ALARM_NAME, () => scheduleNext());
  }
  if (msg.type === "preview") {
    sendNotification();
  }
});
