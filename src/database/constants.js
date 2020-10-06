const defaultUser = {
  sex: "",
  height: "",
  weight: "",
  tobacco: "",
  alcohol: "",
  veteran: "",
  ethnicity: "",
  birthdate: "",
  blood_group: "",
  saved: [0],
  enrolled: [0],
  preferences: {
    confirmation: true,
    location: true
  }
}

const errors = {
  // COMMON
  'auth/invalid-email': { email: 'Email is invalid' },

  // SIGNUP
  'auth/email-already-in-use': { email: 'This email already exists' },
  'auth/operation-not-allowed': { email: 'This operation is not allowed' },
  'auth/weak-password': { password: 'The password is not strong enough' },

  // SIGNIN
  'auth/user-disabled': { email: 'Your account has been disabled' },
  'auth/user-not-found': { email: 'Email does not exist' },
  'auth/user-not-verified': { email: 'Email is not verified' },
  'auth/too-many-requests': { password: 'Too many unsuccessful attempts' },
  'auth/wrong-password': { password: 'Password is incorrect' },

  // EMAIL VERIFICATION or PASSWORD RESET
  'auth/expired-action-code': 'The email verification link has expired',
  'auth/invalid-action-code': 'The email verification link is invalid',



}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { defaultUser, errors, emailRegex }
