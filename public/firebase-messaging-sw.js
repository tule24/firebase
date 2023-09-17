/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDPUYUxGnqqiwHYj4yEg3c_hs1XbOe6qcQ",
    authDomain: "noti-demo-6558c.firebaseapp.com",
    projectId: "noti-demo-6558c",
    storageBucket: "noti-demo-6558c.appspot.com",
    messagingSenderId: "894052503652",
    appId: "1:894052503652:web:010301cbe7700b1cadcf71",
    measurementId: "G-NBR6JJT3QP"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
if (firebase.messaging.isSupported()) {
    const messaging = !firebase.apps.length
        ? firebase.initializeApp(firebaseConfig).messaging()
        : firebase.app().messaging();

    messaging.onBackgroundMessage(payload => {
        console.log('Received background message ', payload);

        const { notification } = payload;
        notification.data = payload.data;
        self.registration.showNotification(notification.title, { ...notification });
    });
}

// self.addEventListener('notificationclick', function (event) {
//     const { notification } = event;
//     self.clients.openWindow(notification.data.link, "_blank")
// });
