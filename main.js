import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import {
  set,
  push,
  ref,
  get,
  child,
  update,
  getDatabase,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAC61i7uJOYsN0__JlZa0oTy0jE1ET60O4",
  authDomain: "car-showroom-e2b2f.firebaseapp.com",
  databaseURL: "https://car-showroom-e2b2f-default-rtdb.firebaseio.com",
  projectId: "car-showroom-e2b2f",
  storageBucket: "car-showroom-e2b2f.appspot.com",
  messagingSenderId: "364582271214",
  appId: "1:364582271214:web:961cd623cc1939cb91dbff",
  measurementId: "G-QGBM9HWQDK",
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
//------------------------------------------references------------------------------------------
var namebox = document.getElementById("namebox");
var rollbox = document.getElementById("rollbox");
var section = document.getElementById("sectionbox");
var Genbox = document.getElementById("Genbox");
var Insbtn = document.getElementById("Insbtn");
var delbtn = document.getElementById("Delbtn");
var Selbtn = document.getElementById("Selbtn");
var Upbtn = document.getElementById("Upbtn");
// -------------insert --------------------
function InsertData() {
  set(ref(db, "thestudet/ " + rollbox.value), {
    Nameodstd: namebox.value,
    RollNo: rollbox.value,
    section: section.value,
    Gender: Genbox.value,
  })
    .then(() => {
      alert("Data Inserted");
    })
    .catch((error) => {
      alert(`data could not be inserted ${error}`);
    });
}
// ----------get data through firebase --------------------
function SelectData() {
  const dbref = ref(db);
  get(child(dbref, "thestudet/ " + rollbox.value))
  .then((snapshot) => {
    if (snapshot.exists()) {
      namebox.value = snapshot.val().Nameodstd;
      section.value = snapshot.val().section;
      Genbox.value = snapshot.val().Gender;
    }
   else{
    alert("no data");
   }
  })
  .catch((Error)=>{
    console.log(Error);
    // alert(`data could not be inserted ${Error}`);
   }); 
}
// ---------------------------------------------edit data------------------------
function updateData() {
        update(ref(db, "thestudet/ " + rollbox.value), {
          Nameodstd: namebox.value,
          section: section.value,
          Gender: Genbox.value,
        })
          .then(() => {
            alert("update database successfully");
          })
          .catch((error) => {
            alert(`could not update ${error}`);
          });
      }
    //   ------------------------remove data------`
    function deldata() {
        remove(ref(db, "thestudet/" + rollbox.value))
          .then(() => {
            alert("Data deleted from the database");
          })
          .catch((error) => {
            console.log();("Error deleting data:", error);
          });
      }
      
    
// -------addevent event--------------------------------

Insbtn.addEventListener("click", InsertData);
Selbtn.addEventListener("click", SelectData);
Upbtn.addEventListener("click", updateData);
delbtn.addEventListener("click", deldata);