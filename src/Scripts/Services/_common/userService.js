

const getUSerFromStorage = () => {
  return localStorage.getItem('user')
};

const setUserToStorage = (token) => {
  return localStorage.setItem('user', token);
};


const UserService = {
  getUSerFromStorage,
  setUserToStorage
}
export default UserService;
