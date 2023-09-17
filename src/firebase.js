import { initializeApp } from 'firebase/app'
import { getMessaging, isSupported, getToken, onMessage, deleteToken } from 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyDPUYUxGnqqiwHYj4yEg3c_hs1XbOe6qcQ",
    authDomain: "noti-demo-6558c.firebaseapp.com",
    projectId: "noti-demo-6558c",
    storageBucket: "noti-demo-6558c.appspot.com",
    messagingSenderId: "894052503652",
    appId: "1:894052503652:web:010301cbe7700b1cadcf71",
    measurementId: "G-NBR6JJT3QP"
};
const VAPID_KEY = 'BPgBumJj_cE__tp3gWsklHKrQBvkbrqyHV2pEBRrqP61R4c9BJYBEJzastC2x1Xvi9lpHv9YaTJsZH04fn2Lz-E';

async function requestNotificationsPermissions() {
    console.log('Requesting notification permission...');
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Notification permission granted");
    } else {
        console.log('Unable to get permission to notify')
    }
}

export async function getDeviceToken() {
    try {
        await requestNotificationsPermissions()
        const app = initializeApp(firebaseConfig);
        const messaging = async () => await isSupported() && getMessaging(app);
        const msg = await messaging();
        const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY });
        if (fcmToken) {
            console.log('Got FCM device token: ', fcmToken);
            // This will fire when a is received while the app is in the foreground
            // When the app is in the background, firebase-messaging-sw.js will receive the message instead
            onMessage(msg, (message) => {
                console.log(message);
                const { notification } = message;
                new Notification(notification.title, { ...notification })
                // newNoti.onclick = (() => {
                //     window.open(message.data.link, "_blank")
                // })
            })
            return msg;
        }
        return null;
    } catch (error) {
        console.log('Unable to get messaging token. ', error);
    }
}

export async function deleteDeviceToken(msg) {
    try {
        await deleteToken(msg);
        return null;
    } catch (error) {
        console.log('Unable to get messaging token. ', error);
    }
}