<template>
  <div>
    <header style="background:#4285f4;font-size:25px;">
      <span>
        <a style="margin-left:-180px;font-size:18px;color:#ffffff;" class="menuIcon" @click="openNav()"></a>
        <a style="margin-left:16px;color:#ffffff;" @click="showList()">แสดงรายการ</a>
      </span>
    </header>
    <main><br><br><br>
      <div class="content">
      <div class="container-fluid">
        <div class="row" style="margin-top:-2px;">
          <div class="col-md" v-if="scans.firstname == firstnames && scans.accepted < scans.amountLend  && todayCheckTs >= scans.dateLendTs && todayCheckTs < scans.timeLengthTs" v-for="scans of scan" style="padding-top:8px;">
          <div class="card" style="border-radius: 1px;">
            <div class="card-block" style="padding-top:20px;padding-left:10px;"> 
              <p style="text-align:left;margin-left:5px;font-size:15px;">{{scans.nameLend}}</p>
              <p style="text-align:left;margin-left:5px;font-size:13px;color:#003a8c;">
              เลขที่การยืม: {{scans.idLend}}<br>
              หมายเลขเครื่อง: {{scans.numberShow}}
              <!-- รับแล้ว: {{scans.accepted}}  -->
              <router-link :to="'/scanitem/' + scans['.key']">
              <span style="color:#00b9e7;font-size:25px;float:right;margin-right:20px;" class="glyphicon glyphicon-qrcode"></span><br>
              </router-link>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()" style="color:#003a8c;">&times;</a>
      <router-link to="/listeqm">
        <i class="glyphicon glyphicon-list-alt" style="color:#003a8c;font-size:70px;margin-top:120px;" @click="closeNav()"></i>
        <a @click="closeNav()" href="#" style="color:#003a8c;margin-top:10px;">แสดงรายการ</a>
      </router-link>
      <div class="signOut">
     <button @click="submitLogout()" style="margin-top:200px;border:1px solid #003a8c;background:#ffffff;border-radius:100px;font-size:16px;color:#003a8c;width:140px;height:50px;">
          <i class="glyphicon glyphicon-off" style="color:#003a8c;font-size:16px;"></i>
          ออกจากระบบ
     </button>
     </div>
    </div>

    </main>
  </div>
</template>

<script>
import 'webrtc-adapter'
import {equipmentRef, userRef, scanRef, auth, bookEqmRef} from './firebase'
import dateFormat from 'dateformat'

export default {
  name: 'hello',

  data () {
    return {
      firstnames: '',
      lastname: '',
      department: '',

      todayCheckTs: ''
    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    scan: scanRef,
    bookEqm: bookEqmRef
  },
  created () {
    this.user = auth.currentUser
    if (this.user) {
      this.firstnames = this.users.find(users => users.email === this.user.email).firstname
      this.lastname = this.users.find(users => users.email === this.user.email).lastname
    }

    this.todayCheck = dateFormat(new Date(), 'yyyy-mm-dd')
    this.todayCheckTs = new Date(this.todayCheck).getTime()
    console.log(this.todayCheck, this.todayCheckTs)
  },
  methods: {
    showList () {
      this.user = auth.currentUser
      if (this.user) {
        this.firstnames = this.users.find(users => users.email === this.user.email).firstname
        this.lastname = this.users.find(users => users.email === this.user.email).lastname
      }
    },
    openNav () {
      document.getElementById('mySidenav').style.width = '101%'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
      document.getElementById('main').style.marginLeft = '0'
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card {
  width: 347px;
  margin: auto;
  border-radius: 1px;
  margin-left: -3px;
}

.content {
  width: 366px;
  margin: auto;
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
  margin-left: -3px;
}

header {
  margin: 0;
  height: 56px;
  width: 101%;
  padding: 0 16px 0 24px;
  background:#ffffff;
  color: #003a8c;
  position: fixed;
  z-index: 1000;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 20px 0 rgba(0, 0, 0, 0.19); 
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
  font-style: normal;
}

.menuIcon {
    width: 150px;
    font-size: 20px;
    background-image: url('../assets/CCC.png');
    background-size: 22px 17px;
    background-position: 17px 17px; 
    background-repeat: no-repeat;
    padding: 12px 20px 12px 33px;
    height: 34px;
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: #ffffff;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}
.sidenav a {
    padding: 8px 8px 8px 10px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}
.sidenav a:hover {
    color: #f1f1f1;
}
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
