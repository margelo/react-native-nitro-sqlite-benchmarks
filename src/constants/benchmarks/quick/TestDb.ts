import { open, QuickSQLiteConnection } from "react-native-quick-sqlite";

let _testDb: QuickSQLiteConnection | undefined;
function setupTestDb() {
  try {
    if (_testDb != null) closeTestDb();

    _testDb = open({
      name: "test",
    });

    _testDb.execute("DROP TABLE IF EXISTS User;");
    _testDb.execute(
      "CREATE TABLE User ( id REAL PRIMARY KEY, name TEXT NOT NULL, age REAL, networth REAL) STRICT;"
    );
  } catch (e) {
    console.warn("Error resetting user database", e);
  }
}

function closeTestDb() {
  _testDb?.close();
  _testDb?.delete();
  _testDb = undefined;
}

export default {
  db: _testDb,
  setup: setupTestDb,
  close: closeTestDb,
};
