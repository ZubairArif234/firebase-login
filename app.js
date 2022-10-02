

// // const signUpButton = document.getElementById("signUp");
// // const signInButton = document.getElementById("signIn");
// // const container = document.getElementById("container");

// // signUpButton.addEventListener("click", () => {
// //   container.classList.add("right-panel-active");
// // });

// // signInButton.addEventListener("click", () => {
// //   container.classList.remove("right-panel-active");
// // });







import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { doc,
   setDoc,
   getDoc,
   getFirestore,
   getDocFromCache,
   collection, 
   getDocs,
   query,
    where
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


const firebaseConfig = {
  apiKey: "AIzaSyBKYcD_35A49akt0OitN62MQbMCwcKGvuU",
  authDomain: "saylani-project-assignment.firebaseapp.com",
  projectId: "saylani-project-assignment",
  storageBucket: "saylani-project-assignment.appspot.com",
  messagingSenderId: "677719458063",
  appId: "1:677719458063:web:11e29676238dbb299cfe7a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

// // codepen end
let register = document.getElementById("regiterBtn")


var emailregix = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
var phoneregex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;


let registerEmail = document.getElementById("registerEmail");
    let registerPassword = document.getElementById("registerPassword");
    let registerName = document.getElementById("registerName");
    let registerPhone = document.getElementById("registerPhone");
    let registerQuali = document.getElementById("registerQuali");
    let registerImage = document.getElementById("registerImg");


// let register = document.getElementById("regiterBtn")

register.addEventListener("click", function(event){
  event.preventDefault()
if (registerPassword.value.trim() === "" ){
  Swal.fire(
    'Error',
    'Invalid Password (atleast 8 characters)',
    'error'
  )
 }else if (registerName.value.trim() === "" ){
  // alert("iok")
  Swal.fire(
    'Error',
    'Invalid Name',
    'error'
  )
 }else if (registerQuali.value.trim() === ""){
  Swal.fire(
    'Error',
    'Invalid Qualification',
    'error'
  )
 }else if (registerEmail.value === "" || !registerEmail.value.match(emailregix)){
  Swal.fire(
    'Error',
    'Invalid Email',
    'error'
  )
 }else if (registerPhone.value === "" || !registerPhone.value.match(phoneregex)){
  Swal.fire(
    'Error',
    'Invalid phone number',
    'error'
  )
 }
 else{
  let loaderR = document.getElementById('loaderR');
  loaderR.style.display = "block";
  register.style.display = "none"
  createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
    
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("USER",user)
      await setDoc(doc(db, "users", user.uid), {
        name: registerName.value,
        email: registerEmail.value,
        phone: registerPhone.value ,
        qualification: registerQuali.value,
        password: registerPassword.value,
       


      });
      // ...
      loaderR.style.display = "none";
  register.style.display = "block"
      Swal.fire(
        'Success',
        'Successfully Registered ',
        'success'
      )
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(
        'Error',
        'Email already in use',
        'error'
      )
      // ..
    });
  
 
 }

})






















let arrfriend = [];





// firebase login
let login = document.getElementById("loginBtn")
login.addEventListener("click", function(){
  let loaderL = document.getElementById("loaderL");
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");
loaderL.style.display = "block"
login.style.display = "none"
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then(async (userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    console.log("USER",user)
    // let loaderL = document.getElementById("loaderL");
    loaderL.style.display = "block"
login.style.display = "none"
    Swal.fire(
      'success',
      `login successfully`,
      'success'
    )
    // ...
    const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);




window.localStorage.setItem("userobj", JSON.stringify(docSnap.data()))
// window.location.href = "profile.html";
if (docSnap.exists()) {
  
  console.log("Document data:", docSnap.data());
  
  const querySnapshot = await getDocs(collection(db, "users")) ;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, )//" => ", doc.data());
    let  docsss =  doc.data()
    console.log(docsss)
     if( doc.id){
    // let oi = document.getElementById("oi")
    // console.log(oi)
    // oi.innerHTML += `
    // <table>
  
    // <tr ><td class="pup">${docsss.name}</td></tr>
    // </table
    // `
    
  }
  arrfriend.push(docsss.name)
    window.localStorage.setItem("namearr",JSON.stringify(arrfriend))
    console.log(arrfriend)
  });


  
  // window.localStorage.setItem("userobj", JSON.stringify(docSnap.data()))
  
  
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

window.location.href = "profile.html";

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message
   let splitmessage = errorMessage.split("/")
   
  
      Swal.fire(
        'Error',
        `(${splitmessage[1]}`,
        'error'
      )
    // }
    
  });

  
  
})








// window.onload =()=>{
//   // event.preventDefault()
//     onAuthStateChanged(auth,async(user) => {
//       // console.log(user)
 

// const docRef = doc(db, "users", user.uid);
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
  

// let dta =  docSnap.data()
//   let o = document.getElementById("o")
//   o.innerHTML += `
//   <table>
//   <tr>
//   <th class="pup">Name: </th><td class="pup">${dta.name}<td>
//   </tr>
//   <tr>
//   <th class="pup">Email: </th><td class="pup">${dta.email}<td>
//   </tr>
//   <tr>
//   <th class="pup">Nationality: </th><td class="pup">  ${dta.nationality}<td>
//   </tr>
//   <tr>
//   <th class="pup">Age: </th><td class="pup">${dta.age}<td>
//   </tr>
//   <tr>
//   <th class="pup">Phone: </th><td class="pup">${dta.number}<td>
//   </tr>
//   </table>
//   `




//   // import { collection, getDocs } from "firebase/firestore";

//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, )//" => ", doc.data());
//     let  docsss =  doc.data()
//     console.log(docsss)
//      if( doc.id){
//     let oi = document.getElementById("oi")
//     console.log(oi)
//     oi.innerHTML += `
//     <table>
  
//     <tr ><td class="pup">${docsss.name}</td></tr>
//     </table
//     `
//   }
//   });
 



// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }


//     if (!user) {
//       const uid = user.Name;
//       const uid2 = user.email;
//       console.log( user )
//       console.log(uid2)
//       window.location = ("/index.html")
//     } 
     
    
//   });
// }




// //signout
// var signout = document.getElementById("signout")
// if(signout){
// signout.addEventListener("click",()=>{
//   const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
//   window.location = "/index.html"
//   console.log("Successfull")
// }).catch((error) => {
//   // An error happened.
// });
// })} 
















