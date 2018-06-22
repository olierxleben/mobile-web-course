class RestaurantsDB {

  constructor(db_name, version) {
    this.db_name = db_name;
    this.version = version;
    this.db;

    this._dbPromise = idb.open('restaurants', 1, (upgradeDb) => {
      switch (upgradeDb.oldVersion) {
        case 0:
          this.db = upgradeDb.createObjectStore('restaurants');
      }
    })
    
  }

  getRestaurants() {
    return this._dbPromise.then((db) => {
      if (!db) return;
      const transaction = db.transaction('restaurants');
      const store = transaction.objectStore('restaurants');
      return store.getAll();
    }).catch(err => {
      console.log('error getting data from database', err)
    })
  }

  saveRestaurants(restaurants) {
    return this._dbPromise.then((db) => {
      const transaction = db.transaction(this.db_name, 'readwrite');
      const store = transaction.objectStore(this.db_name);     
      restaurants.forEach(restaurant => store.put(restaurant, restaurant.id));
    }).catch(err => {
      console.log('error saving data to database', err)
    })
  }
}