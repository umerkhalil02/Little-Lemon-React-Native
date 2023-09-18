import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb',
() => {
  console.log("Database connected!")
}, 
error => console.log("Database error", error) 
)
export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, price text, category text, image text, description text);',
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      },
      );
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    menuItems.map(item => {
      tx.executeSql('INSERT INTO menuitems (name, price, category, image, description ) values (?, ?, ?, ?, ?)', [item.name, item.price, item.category, item.image, item.description],
      )
    })
    
    // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
    // Check the createTable() function above to see all the different columns the table has
    // Hint: You need a SQL statement to insert multiple rows at once.
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  var categories = `('${activeCategories.join("','")}')`;
  return new Promise((resolve, reject) => {
    if(query.length > 0 && activeCategories.length <3 ){
      db.transaction((tx) => {
        tx.executeSql(`select * from menuitems where name LIKE '%${query}%' and category in ${categories}` , [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    }
    else if(query.length > 0){
      db.transaction((tx) => {
        tx.executeSql(`select * from menuitems where name LIKE '%${query}%'` , [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    }
    else if(activeCategories.length >0){
      db.transaction((tx) => {
        tx.executeSql(`select * from menuitems where category in ${categories}` , [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    }
  });
}
