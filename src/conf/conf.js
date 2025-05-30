export const conf_env = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL), // by doing this we will use appwriteURl , and it will always give a string value,
    // this conf stuff is done , because the environement wants everything to be in Strings
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

