export function getLoggedInUserId() {
  console.log('WILL CHECK TOKEN')
  // Return false if there is no local storage available
  if (!localStorage) return false
  const userSession = JSON.parse(localStorage.getItem("session") || "")
  // See if token exists
  if (!userSession) return false
  console.log("USER SESSION", userSession)
  return userSession.user_id
}

// Check to see if the logged in user created something.
export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false
  console.log('USER TO COMPARE', userIdToCompare)
  console.log('LOGGED IN USER', getLoggedInUserId())
  return userIdToCompare === getLoggedInUserId()
}

export function getToken() {
  const userSession = JSON.parse(localStorage.getItem("session") || "")
  return userSession.token
}
