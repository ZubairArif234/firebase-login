







let loaderP = document.getElementById("loaderP");
// let loaderC = document.getElementById("loaderC")



// window.onload = () =>{
let userdata = JSON.parse(window.localStorage.getItem("userobj"));
console.log(userdata)



let profileLIST = document.getElementById("itmlist");
let profileLi =
 `<li><b>${userdata.name}</b></li>
<li>Email  =  ${userdata.email}</li>
<li>Phone  =  ${userdata.phone}</li>
<li>Qualification  =  ${userdata.qualification}</li>
`
profileLIST.innerHTML = profileLi;



let frndarr = JSON.parse(window.localStorage.getItem("namearr"))
console.log(frndarr);

let yourfrnd = []
console.log(yourfrnd)
// let push = ()=> yourfrnd.push(frndarr[i])
// document.getElementById("addbtn").addEventListener("click",push)

let uefrndlist = document.getElementById("uefrndlist");
let findlistul = document.getElementById("findlist");
// for (var i = 0 ; i<frndarr.length ; i++ ){
//  let findli = `<tr class="findli" id="qwert"><li  class="findli" id="qwert"><td>${frndarr[i]}</td><td><button class="btn btn-primary" id = "addbtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Start Chat</button></td> </li></tr>`


// findlistul.innerHTML += findli

// }

// firestore chat app


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    sendEmailVerification
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import {
    doc,
    setDoc,
    getFirestore,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    onSnapshot,
    orderBy,
    serverTimestamp,
    // timeStamp,
    updateDoc
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


  window.onload = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Email sent");
            })
            .catch((err) => console.log(err));
        }
        getUserFromDataBase(user.uid);
      } else {
        console.log("not login");
      }
    });
  };

const getUserFromDataBase = async (uid) => {
    const docRef = doc(db, "users", uid);
    // console.log(docRef)
    const docSnap = await getDoc(docRef);
    // let currentUser = document.getElementById("current-user");
    if (docSnap.exists()) {
      let profile = document.getElementById("profile");
    profile.src = docSnap.data().profile;
    //   currentUser.innerHTML = `${docSnap.data().name} (${docSnap.data().email})`;
      console.log("name= ", docSnap.data().name ,"id = ",docSnap.data().email )
    getAllUsers(docSnap.data().email, uid, docSnap.data().name);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
// getUserFromDataBase()
  
  const getAllUsers = async (email, currentId, currentName) => {
    const q = query(collection(db, "users"), where("email", "!=", email));
    const querySnapshot = await getDocs(q);
    let users = document.getElementById("users");
    loaderP.style.display = "none"
    querySnapshot.forEach((doc) => {
        // <tr class="findli" id="qwert"><li  class="findli" id="qwert"><td>${doc.data().name}</td><td><button onclick='startChat("${
        //     doc.id
        //   }","${
        //     doc.data().name
        //   }","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></td> </li></tr>
        // <button  class="btn btn-primary" id = "addbtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Start Chat</button>
        findlistul.innerHTML += `<tr class="findli" id="qwert"><li  class="findli" id="qwert"><td>${doc.data().name}</td><td><button class="btn btn-primary" id = "addbtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onclick='startChat("${
            doc.id
          }","${
            doc.data().name
          }","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></td> </li></tr>`
    //      `<li>${doc.data().name} <button onclick='startChat("${
    //     doc.id
    //   }","${
    //     doc.data().name
    //   }","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li>`;
    });
  };
  
  let unsubscribe;
  let startChat = (id, name, currentId, currentName) => {
    if (unsubscribe){
        unsubscribe();
    }
    let chatWith = document.getElementById("chat-with");
    chatWith.innerHTML = name;
    let send = document.getElementById("send");
    let message = document.getElementById("message");
    // console.log(currentId)
    let chatID;
    if (id < currentId) {
      chatID = `${id}${currentId}`;
    } else {
      chatID = `${currentId}${id}`;
    }
    loadAllChats(chatID,currentId);
    
    send.addEventListener("click", async () => {
      let allMessages = document.getElementById("all-messages");
      allMessages.innerHTML = "";
      await addDoc(collection(db, "messages"), {
        sender_name: currentName,
        receiver_name: name,
        sender_id: currentId,
        receiver_id: id,
        chat_id: chatID,
        message: message.value,
        
        timestamp: new Date(),
        
      });
    //   console.log(sender_id,sender_name,receiver_id,receiver_name,message)
    });
    // console.log(doc.data().message)
  };
  
  const loadAllChats = (chatID, currentId) => {
    try {
      const q = query(
        collection(db, "messages"),
        where("chat_id", "==", chatID),
        // orderBy("timestamp", "asc")
      );
      let allMessages = document.getElementById("all-messages");
      
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        allMessages.innerHTML = "";
        // let date = new Date;
        // let time = date.getHours() + " : " + date.getMinutes();
        querySnapshot.forEach((doc) => {
          let className =
            doc.data().sender_id === currentId ? "my-message" : "user-message";
          allMessages.innerHTML += `<div><li class="${className}">
          
           ${doc.data().message}
           `;
          
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  window.startChat = startChat;



///profile

  let uploadBtn = document.getElementById("upload-btn");

uploadBtn.addEventListener("click", async () => {
  let myFile = document.getElementById("file");
  let file = myFile.files[0];
  const auth = getAuth();
  let uid = auth.currentUser.uid;
  let url = await uploadFiles(file);
  console.log(url)
  const washingtonRef = doc(db, "users", uid);
  await updateDoc(washingtonRef, {
    profile: url,
    // profile.src= ur;
  });
});

const uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const auth = getAuth();
    let uid = auth.currentUser.uid;
    const storageRef = ref(storage, `users/${uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};



// video calling


const zg = new ZegoExpressEngine(appID, server);
const result = await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});



const localStream = await zg.createStream();

const localVideo = document.getElementById('local-video');

localVideo.srcObject = localStream;

 

zg.startPublishingStream(streamID, localStream)
const remoteStream = await zg.startPlayingStream(streamID);
remoteVideo.srcObject = remoteStream;
zg.stopPublishingStream(streamID)

zg.destroyStream(localStream)

zg.stopPlayingStream(streamID)

zg.logoutRoom(roomID)