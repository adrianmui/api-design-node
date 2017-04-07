const router = require('express').Router();
const controller = require('./controller');
const verifyUser = require('./auth').verifyUser;

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.route('/')
    .get((req, res, next) => {
        res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Bordered form */
          form {
              border: 3px solid #009688;
              margin: 5% 27.5% 0 27.5%;
              background-color: white;
          }

          /* Full-width inputs */
          input[type=text], input[type=password] {
              width: 100%;
              padding: 14px 20px;
              margin: 10px 0 10px;
              display: inline-block;
              border: 1px solid #ccc;
              box-sizing: border-box;
          }
          
          a {
            color: white;
          }

          a:hover {
            color: red;
          }

          /* Set a style for all buttons */
          button {
              background-color: #009688;
              color: white;
              
              padding: 14px 20px;
              margin: 8px 0;
              border: none;
              cursor: pointer;
              width: 30%;
          }

          /* Add a hover effect for buttons */
          button:hover {
              opacity: 0.8;
          }

          /* Extra style for the cancel button (red) */
          .cancelbtn {
              width: auto;
              padding: 10px 18px;
              background-color: #f44336;
          }

          /* Center the avatar image inside this container */
          .imgcontainer {
              text-align: center;
              margin: 24px 0 12px 0;
          }

          /* Avatar image */
          img.avatar {
              width: 40%;
              border-radius: 50%;
          }

          /* Add padding to containers */
          .container {
            padding: 16px;
          }
          
          #formContainer {
              border-top: 1px solid #009688;
              margin: 0 7% 0 7%;
          }

          /* The "Forgot password" text */
          span.psw {
              float: right;
              padding-top: 16px;
              color: white;
          }

          /* Change styles for span and cancel button on extra small screens */
          @media screen and (max-width: 300px) {
              span.psw {
                  display: block;
                  float: none;
              }
              .cancelbtn {
                  width: 100%;
              }
          }
        </style>
      </head>
      <body style="background-color: #F5F5F5">
        <form action="/auth/signin" method="post">
          <div class="imgcontainer">
            <img src="https://media1.giphy.com/media/kuWN0iF9BLQKk/giphy.gif" alt="Avatar" class="avatar" style="height: 100px; width: 100px; border: 1px solid black; background-color: #80CBC4; border-radius: 50px;">
          </div>

          <div class="container" id="formContainer">
            <label><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required>

            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required>

            <button type="submit">Login</button>
            <!-- <input type="checkbox" checked="checked"> Remember me -->
          </div>

          <div class="container" style="background-color:#009688">
            <button type="button" class="cancelbtn">Cancel</button>
            <span class="psw">Forgot <a href="#">password?</a></span>
          </div>
        </form>
      </body>
  </html>
  `)
    });


router.route('/signin')
    .post([verifyUser()], controller.signin);

module.exports = router;