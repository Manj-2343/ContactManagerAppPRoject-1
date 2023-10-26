import mongoose from 'mongoose';

export class DBUtils {
  public static connectToDB(dbUrl: string, dbName: string):Promise<string> {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, {
        dbName: dbName, //1.url2.option i.e dbName
      })
        .then(() => {
          resolve("Connected to MongoDB Successfully!");
        })
        .catch((error) => {
          reject("Connection to MongoDB Failed");
        });
    });
  }
}
