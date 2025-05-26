import conf from "./conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    constructor() {
      this.client
        .setEndpoint(conf.appwriteUrl)   // your api endpoint
        .setProject(conf.appwriteProjectId); // your project id
      this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAcount = await this.account.create(ID.unique(), email, password, name); // creating an new account
      if (userAcount) {
        // call another method , the login method
        return this.login({ email, password });
      } else {
        return userAcount;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    }catch(error) {
      console.log("Appwrite service error :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch {
      console.log("Appwrite service error :: logout :: error", error);
    }
  }
 }

const authService = new AuthService();

export default authService;   // exporting directly the object (authService)
// now whatever i have to use , login logout, all i have to use this object "authService" .login or logout function ,,\
// later what so eve function i have to add i can make that function inside this class
