<template>
  <div>
    <div class="container-sigup">
        <form>
          <div class="group">      
           <input type="text" required v-model="firstname">
           <span class="highlight"></span>
           <span class="bar"></span>
           <label>Firstname</label>
          </div>
          <div class="group">      
            <input type="text" required v-model="lastname">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Lastname</label>
          </div>
          <div class="group">      
            <input type="text" required v-model="department">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Department</label>
          </div>
          <div class="group">      
            <input type="text" required v-model="email">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Email</label>
          </div>
          <div class="group">      
            <input type="text" required v-model="phoneNumber">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Phone Number</label>
          </div>
          <div class="group">      
            <input type="password" required v-model="password">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Password</label>
          </div>
          <div class="group">      
            <input type="password" required v-model="confirmpassword">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Confirm Password</label>
          </div>
        </form>
        <div class="signup">
        <button @click="submitRegister()" style="opacity: 0.6;background-color: #F6E3E3;">REGISTER</button>
        </div>
    </div>
  </div>
</template>

<script>
import {userRef, auth} from './firebase'

export default {
  name: 'signup',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      department: '',
      phoneNumber: ''
    }
  },
  firebase: {
    users: userRef
  },
  created () {
  },
  methods: {
    submitRegister () {
      if (this.password !== this.confirmpassword) {
        alert('กรุณากรอกรหัสผ่านทั้ง 2 ช่องให้ตรงกัน')
      } else if (this.firstname === '' || this.lastname === '' || this.email === '' || this.password === '' || this.confirmpassword === '' || this.department === '' || this.phoneNumber === '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน !!!')
      } else {
        userRef.push({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email.toLowerCase(),
          password: this.password,
          confirmpassword: this.confirmpassword,
          department: this.department,
          phoneNumber: this.phoneNumber,
          status: 'user',
          editProfile: false
        })
        auth.createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password') {
            alert('pass 6')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
        alert('ลงทะเบียนสำเร็จ')
        this.$router.push('/')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container-sigup {
  padding-top: 20px;  
  position: fixed; 
  top: 0;
  bottom: 0;
  
  width: 100%;
  background: -webkit-linear-gradient(left, #22d686, #24d3d3, #22d686, #24d3d3);
  background: linear-gradient(to right, #22d686, #24d3d3, #22d686, #24d3d3);
  background-size: 600% 100%;
  -webkit-animation: HeroBG 20s ease infinite;
          animation: HeroBG 20s ease infinite;
}
@-webkit-keyframes HeroBG {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
main {
  text-align: center;
  margin-top: 0px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

/* basic stylings ------------------------------------------ */

.signup button {
  height: 55px;
  border: none;
  padding: 18px;
  width: 320px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 100px
}

h2 		 { 
  text-align:center; 
  margin-bottom:50px; 
}
h2 small { 
  font-weight:normal; 
  color:#888; 
  display:block; 
}

/* form starting stylings ------------------------------- */
.group 			  { 
  position:relative; 
  margin-bottom:25px; 
}
input 				{
  margin: auto;
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  color: #F6E3E3;
  border:none;
  background: transparent; 
  border-bottom:1px solid #F6E3E3;
}
input:focus { 
  outline:none;
}

/* LABEL ======================================= */
label 				 {
  color:#F6E3E3; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  margin-left: -145px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#F6E3E3;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; margin: auto; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#F6E3E3; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:800px;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#F6E3E3; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#F6E3E3; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#F6E3E3; }
  to 	{ width:0; background:transparent; }
}
</style>
