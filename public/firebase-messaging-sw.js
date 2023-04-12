// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCRZ2ccUkQUagNNPTCBlaDDLpD1lEDGV4w",
    authDomain: "marist-9d1a3.firebaseapp.com",
    projectId: "marist-9d1a3",
    storageBucket: "marist-9d1a3.appspot.com",
    messagingSenderId: "850605687036",
    appId: "1:850605687036:web:5cb5441ef6e8a617701779"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
self.addEventListener('notificationclick', function(event) 
  {
    console.log('event = ',event);
    event.notification.close();
    event.waitUntil(clients.openWindow("https://maristproject.online"));
   
        window.open("https://maristproject.online");
   
  }, false);