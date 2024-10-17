import { NitroSQLiteConnection, open } from "react-native-nitro-sqlite";

export let db: NitroSQLiteConnection | undefined;
export async function setup() {
  try {
    if (db != null) await close();

    db = open({
      name: "test",
    });

    db.execute("DROP TABLE IF EXISTS User;");
    db.execute(
      "CREATE TABLE User ( id REAL PRIMARY KEY, name TEXT NOT NULL, age REAL, networth REAL) STRICT;"
    );
  } catch (e) {
    console.warn("Error resetting user database", e);
  }
}

export async function close() {
  db?.close();
  db?.delete();
  db = undefined;
}
