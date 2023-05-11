var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userUserName = userDoc.data().neighbourhood;
                    var userCity = userDoc.data().city;
                    var userPassword = userDoc.data().phone;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userNeighbourhood != null) {
                        document.getElementById("userNameInput").value = userUserName;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userPhone != null) {
                        document.getElementById("passwordInput").value = userPassword;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    // Get values from the form
    var userName = document.getElementById('nameInput').value;
    var userUserName = document.getElementById('userNameInput').value;
    var userCity = document.getElementById('cityInput').value;
    var userPassword = document.getElementById('passwordInput').value;

    // Asynch call to save the form fields into Firestore
    db.collection("users").doc(user.uid).update({
      name: userName,
      username: userUserName,
      city: userCity,
      password: userPassword
    })
    .then(function () {
      console.log('Saved user profile info');
      document.getElementById('personalInfoFields').disabled = true;
      window.location.href = "settings.ejs";  // redirect to profile page
    });
  });
}

function chooseFileListener() {
  const fileInput = document.getElementById("profile-pic-input");
  const image = document.getElementById("profile-pic-goes-here");

  // Attach listener to input file
  // When this file changes, do something
  fileInput.addEventListener('change', function (e) {
    // The change event returns a file "e.target.files[0]"
    var ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    // Change the DOM img element source to point to this file
    image.src = blob;    // Assign the "src" property of the "img" tag
  });
}
chooseFileListener();
