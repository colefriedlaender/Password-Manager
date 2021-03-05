import { Collection, Db, MongoClient } from "mongodb";
import CryptoJS from "crypto-js";
let client: MongoClient = null;
let db: Db = null;
export type PasswordDoc = {
  name: string;
  value: string;
};

export async function connectDB(url: string, dbName: string) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}
export function getCollection<T>(collectionName: string): Collection<any> {
  return db.collection<T>(collectionName);
}
export function closeDB() {
  client.close();
}
export async function createPasswordDoc(passwordDoc: PasswordDoc) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  const encryptedPasswordDoc = {
    name: passwordDoc.name,
    value: encryptpassword(passwordDoc.value),
  };

  return await passwordCollection.insertOne(encryptedPasswordDoc);
}
export async function readPasswordDoc(passwordName: string) {
  const passwordCollection = await getCollection<PasswordDoc | null>(
    "passwords"
  );
  const passwordDoc = await passwordCollection.findOne({ name: passwordName });
  if (!passwordDoc) {
    return null;
  }
  return {
    name: passwordDoc.name,
    value: decryptpassword(passwordDoc.value),
  };
}
export async function updatePasswordDoc(
  passwordName: string,
  fieldstoUpdate: Partial<PasswordDoc>
): Promise<Boolean> {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  const updateResult = await passwordCollection.updateOne(
    { name: passwordName },
    { $set: fieldstoUpdate }
  );
  return updateResult.modifiedCount >= 1;
}
export async function updatePasswordValue(
  passwordName: string,
  newPasswordValue: string
): Promise<Boolean> {
  return await updatePasswordDoc(passwordName, { value: newPasswordValue });
}

export async function deletePasswordDoc(
  passwordName: string
): Promise<Boolean> {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  const deleteResult = await passwordCollection.deleteOne({
    name: passwordName,
  });
  return deleteResult.deletedCount >= 1;
}
export function encryptpassword(password: string) {
  return CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_MASTER_KEY
  ).toString();
}
export function decryptpassword(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.CRYPTO_MASTER_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
