import { DB, open } from "@op-engineering/op-sqlite";

let _testDb: DB | undefined;
function setupTestDb() {
  try {
    if (_testDb != null) {
      _testDb.close();
      _testDb.delete();
    }
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
}

export default {
  db: _testDb,
  setup: setupTestDb,
  close: closeTestDb,
};
