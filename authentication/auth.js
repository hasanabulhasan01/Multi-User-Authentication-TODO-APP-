function signup(){
    console.log("signup calling!!!")

    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var confirmpassword = document.getElementById("confirmPassword").value
    var userId = generateUserId();

    //generate unique userId
    function generateUserId(){
        //use current time stamp as base
        var id = new Date().getTime().toString();
        //add a random number to the id to make it unique
        id += Math.random().toString(36).substr(2, 9);
        var userid = id.slice(-6)
        return userid;
    }

    //form validations
    if(!username || !email || !password || !confirmpassword){
        console.error("please fill all the fields")
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please fill all the fields",
            showConfirmButton: false,
            timer: 1500
          });
        return  
    }
    if(password.length < 6){
        console.error("password length must be equal to or greater than 6")
        return
    }
    if(password!==confirmpassword){
        console.error("confirm password does not match")
        return
    }

    //Get previous record of users
    var usersData = JSON.parse(localStorage.getItem("users"));

    var currentUser = {
        username,
        email,
        password,
        userId,
    }
    console.log(currentUser);

    //when there is no data
    if(!usersData){
        usersData = [currentUser];
    }else{
        //data exists
        usersData.push(currentUser);
    }
    localStorage.setItem("users", JSON.stringify(usersData));
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Sign Up Successful",
        showConfirmButton: false,
        timer: 2500
      });
      location.href = "./login.html";

      //clear input fields
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirmpassword").value = "";

}

function login(){
    console.log("login calling");

    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    //form validations
    if(!loginEmail || !loginPassword){
        console.error("please fill all the fields")
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please fill all the fields",
            showConfirmButton: false,
            timer: 1500
          });
        return  
    }

    //get previous record of users
    var usersdata = JSON.parse(localStorage.getItem("users"));

    if(!usersdata && !usersdata.length){
        console.error("No usersdata found")
    }

    var userFound = usersdata.find(function(userData){
        return (userData.email == loginEmail)
    })

    if(!userFound){
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Email is incorrect",
            showConfirmButton: false,
            timer: 1500
          });
          return
    }else{
        if(userFound.password !== loginPassword){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Password is incorrect",
                showConfirmButton: false,
                timer: 1500
              });
              return
        }
    }
    if(userFound){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500
          });
        console.log(userFound, "User found---");
        localStorage.setItem("currentUser" , JSON.stringify(userFound));
        location.href = "../Dashboard/dash.html"
    }else{
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Invalid credentials",
            showConfirmButton: false,
            timer: 2000
          });
          return
    }

}
