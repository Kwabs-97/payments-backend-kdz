import env from "dotenv";
env.config();
export const uri = `mongodb+srv://thisissamuelyeboah:${process.env.DB_USER_PASSWORD}@kwabscluster.d7jjk.mongodb.net/?retryWrites=true&w=majority&appName=KwabsCluster`;

