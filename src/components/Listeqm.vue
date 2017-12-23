<template>
  <div>
    <header style="background:#4285f4;font-size:25px;">
      <span>
        <a style="margin-left:-180px;font-size:18px;color:#ffffff;" class="menuIcon"></a>
        <a style="margin-left:16px;color:#ffffff;" @click="showList()">แสดงรายการ</a>
      </span>
    </header>
    <main><br><br><br>
      <div class="content">
      <div class="container-fluid">
        <div class="row" style="margin-top:-2px;">
          <div class="col-md" v-if="scans.firstname == firstnames && scans.accepted < scans.amountLend" v-for="scans of scan" style="padding-top:8px;">
          <div class="card" style="border-radius: 1px;">
            <div class="card-block" style="padding-top:20px;padding-left:10px;"> 
              <p style="text-align:left;margin-left:5px;font-size:15px;">{{scans.nameLend}}</p>
              <p style="text-align:left;margin-left:5px;font-size:13px;color:#003a8c;">
              จำนวน: {{scans.amountLend}} <br>
              รับแล้ว: {{scans.accepted}} 
              <router-link :to="'/scanitem/' + scans['.key']">
              <span style="color:#00b9e7;font-size:25px;float:right;margin-right:20px;" class="glyphicon glyphicon-qrcode"></span>
              </router-link>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  </div>
</template>

<script>
import 'webrtc-adapter'
import {equipmentRef, userRef, scanRef, auth} from './firebase'

export default {
  name: 'hello',

  data () {
    return {
      firstnames: '',
      lastname: '',
      department: ''
    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    scan: scanRef
  },
  created () {
    this.user = auth.currentUser
    if (this.user) {
      this.firstnames = this.users.find(users => users.email === this.user.email).firstname
      this.lastname = this.users.find(users => users.email === this.user.email).lastname
    }
  },
  methods: {
    showList () {
      this.user = auth.currentUser
      if (this.user) {
        this.firstnames = this.users.find(users => users.email === this.user.email).firstname
        this.lastname = this.users.find(users => users.email === this.user.email).lastname
      }
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
</style>
