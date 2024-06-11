import { openDB } from 'idb';

// Initialize the database
const initdb = async () => {
  // Open the 'jate' database, version 1
  openDB('jate', 1, {
    // Upgrade callback to create the object store if it doesn't exist
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store named 'jate' with auto-incrementing IDs
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Method to add or update content in the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the 'jate' database, version 1
  const contactDb = await openDB('jate', 1);

  // Create a new transaction with read-write privileges
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open the 'jate' object store
  const store = tx.objectStore('jate');

  // Use the .put() method to add or update the content
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method to get all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the 'jate' database, version 1
  const contactDb = await openDB('jate', 1);

  // Create a new transaction with read-only privileges
  const tx = contactDb.transaction('jate', 'readonly');

  // Open the 'jate' object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database
  const request = store.getAll();

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

// Initialize the database
initdb();
