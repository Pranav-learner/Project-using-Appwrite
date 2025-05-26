import conf from "./conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)   // your api endpoint
        .setProject(conf.appwriteProjectId); // your project id
        this.Databases = new Databases(this.client);
        this.Storage = new Storage(this.client);
    }

    async createPost({title,slug,content,feturedImage,status,userId}) {
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status,
                    userId
                }
            )
        } catch {
            console.log("Appwrite service error :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,feturedImage,status}) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // this is the slug OF WHIHC THAT HAS TO BE UPDATED
                {
                    title,
                    content,
                    feturedImage,
                    status,
                    userId
                }
            )
        } catch {
            console.log("Appwrite service error :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
               await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug // this is the slug OF WHIHC THAT HAS TO BE UPDATED
                
            )
            return true
        } catch {
            console.log("Appwrite service error :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch {
            console.log("Appwrite service error :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

            )
        } catch {
            console.log("Appwrite service error :: getPosts :: error", error);
            return false
        }
    }

    // file upload service
    
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch {
            console.log("Appwrite service error :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(file) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                file
            )
            return true
        }catch {
            console.log("Appwrite service error :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(file) {
        return this.storage.getFileView(
            conf.appwriteBucketId,
            file
        )
    }
}
const service  = new Service();
export default service