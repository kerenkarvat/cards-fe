import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
  PhoneAuthProvider,
} from 'firebase/auth';
import * as firebaseui from 'firebaseui';

// TODO: Replace the following with your app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYOEG7qrs5yCIN7ZDvombuKPXD49HPyHA',
  authDomain: 'bebehcards.firebaseapp.com',
  projectId: 'bebehcards',
  storageBucket: 'bebehcards.firebasestorage.app',
  messagingSenderId: '831823914968',
  appId: '1:831823914968:web:887220b88fd6a85a9df4ad',
  measurementId: 'G-HF8W8VPY7D',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// FirebaseUI configuration
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
    uiShown: function () {
      document.getElementById('loader').style.display = 'none';
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    PhoneAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>',
};

const ui = new firebaseui.auth.AuthUI(auth);

function startFirebaseUI() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ui.start('#firebaseui-auth-container', uiConfig);
    });
  } else {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}

function observeAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      console.log('User is signed in:', user);
    } else {
      console.log('No user is signed in');
    }
  });
}

export { auth, ui, uiConfig, startFirebaseUI, observeAuthState };
