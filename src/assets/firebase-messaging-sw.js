importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDYCifT1SLY_yO8T0eL-2QU3Hd_yyQOOAU",
    authDomain: "https://order-taking-eathub.firebaseio.com",
    projectId: "order-taking-eathub",
    storageBucket: "order-taking-eathub.firebasestorage.app",
    messagingSenderId: "126522779790",
    appId: "1:126522779790:android:3e8d88f6a2028902"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
