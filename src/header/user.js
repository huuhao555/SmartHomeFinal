class User {
    constructor() {
      this.token = null;
    }
  
    setToken(token) {
      this.token = token;
    }
  
    getToken() {
      return this.token;
    }
  }
  
  export default User;