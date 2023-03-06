class Promise {
   constructor(t) {
      // this is how you define variable
      this.x;
      this.resolve = this.resolve.bind(this);
      t(this.resolve)
   }

   resolve(value) {
      this.func(value);
   }

   then(foo) {
      this.func = foo;
   }
}


const p = new Promise((resolve, reject) => {
   console.log("action");

   setTimeout(() => resolve(1), 1000);
});

p.then((value) => {
   console.log("first print1", value);
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(value + 2), 1000);
   });
});


// .then((value) => {
//    console.log('last print1', value);
//    return value + 1;
//})
