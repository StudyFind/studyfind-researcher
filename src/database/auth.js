import { auth, database, firestore } from './firebase'
import { errors, defaultUser, emailRegex } from './constants'

// === DATA === //
const fetchRef = ref => ref.once('value').then(data => data.val())
const fetchUser = uid => fetchRef(database.ref(`users/${uid}`))
const fetchStudies = () => fetchRef(database.ref('studies'))

const fetchData = async uid => {
  const [user, studies] = await Promise.all([fetchUser(uid), fetchStudies()])
  return { user, studies }
}


// === AUTH === //

// ========================== HANDLE API ERRORS ========================== //
const getError = ({ code }) => {
  return { email: '', password: '', ...errors[code] }
}

// ========================== HANDLE SIGN UP ========================== //
// 1. Create Firebase Auth User
// 2. Set User Type (displayName is used to store user type)
// 3. Add User Data Ref to Realtime Database
// 4. Send Verification Email

const createUserAuth = async (email, password) => auth.createUserAuthWithEmailAndPassword(email, password)
const deleteUserAuth = user => user.delete()
const updateUser = data => database.ref(`users/${uid}`).set(defaultUser)

const createCookie = () => localStorage.setItem('exists', true)
const deleteCookie = () => localStorage.setItem('exists', false)

const setUserData = ({ uid }) => database.ref(`users/${uid}`).set(defaultUser)
const setUserType = user => user.updateProfile({ displayName: 'participant' })

const sendVerificationEmail = user => user.sendEmailVerification()
const sendPasswordResetEmail = async () => auth.sendPasswordResetEmail()


function validateEmail(email) {
  if(!email) return ' '
  const checkValid = emailRegex.test(email.toLowerCase())
  if(!checkValid) return 'Email is invalid'
  return ''
}

function validatePassword(password) {
  if(!password) return ' '
  const checkCase = password !== password.toLowerCase()
  const checkSize = password.length > 7
  if(!checkCase && !checkSize)  return 'Password must have atleast 8 digits and one capital letter'
  if(!checkCase)                return 'Password must have a capital letter'
  if(!checkSize)                return 'Password must be at least 8 characters long'
  return ''
}

function validate({ email, password, newPassword }) {
  const error = {}
  if(email       !== undefined) error.email       = validateEmail(email)
  if(password    !== undefined) error.password    = validatePassword(password)
  if(newPassword !== undefined) error.newPassword = validatePassword(newPassword)
  if(error.email || error.password || error.newPassword) throw error
}

const signup = async (email, password) => {

  validate({ email, password })

  try {

    const { user } = await createUserAuth(email, password)
    createCookie()
    setUserType(user)
    setUserData(user)
    sendVerificationEmail(user)
    return user

  } catch(error) {
    throw getError(error)

  }
}


// ========================== HANDLE SIGN IN ========================== //
const authenticateUser = async (email, password) => auth.signInWithEmailAndPassword(email, password)

function checkVerified(user) {
  if(!user.emailVerified) {
    sendVerificationEmail(user)
    throw { code: 'auth/user-not-verified' }
  }
}

function checkUsertype(user) {
  if(user.displayName !== 'participant') {
    throw { code: 'auth/user-not-found' }
  }
}

const signin = async (email, password) => {
  validate({ email, password })

  try {

    const { user } = await authenticateUser(email, password)
    createCookie()
    // checkUsertype(user)
    checkVerified(user)
    return user

  } catch(error) {
    signout()
    throw getError(error)

  }
}


// ========================== HANDLE SIGN OUT ========================== //
const signout = async () => auth.signOut()



// ========================== EMAIL VERIFICATION ========================== //

const verify = async actionCode => auth.applyActionCode(actionCode)


// ========================== ACCOUNT DELETION ========================== //

const deleteUser = async (email, password) => {

  validate({ password })

  try {

    const { user } = await authenticateUser(email, password)
    await deleteUserAuth(user)
    deleteCookie()

  } catch(error) {

    throw getError(error)

  }
}


// ========================== PASSWORD UPDATES ========================== //

const resetPassword = async (actionCode, password) => {

  validate({ password })

  try {

    const email = await auth.verifyPasswordResetCode(actionCode)
    await auth.confirmPasswordReset(actionCode, password)
    return signin(email, password)

  } catch(error) {

    throw getError(error)

  }
}


const changePassword = async (email, password, newPassword) => {

  validate({ password, newPassword })

  try {

    const { user } = await authenticateUser(email, password)
    return user.updatePassword(newPassword)

  } catch(error) {

    throw getError(error)

  }
}



export {
  // DATA //
  updateUser,
  deleteUserAuth,
  fetchData,
  fetchUser,
  fetchStudies,

  // AUTH //
  signin,
  signup,
  signout,
}
