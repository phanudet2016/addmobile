<template>
  <div>
    <header style="background:#4285f4;font-size:25px;">
      <span>
        <a style="margin-left:-152px;font-size:18px;color:#ffffff;" class="menuIcon" @click="openNav()"></a>
        <a style="margin-left:13px;color:#ffffff;">สแกนคืนอุปกรณ์</a>
      </span>
    </header>
    <main>
      <div class="contenscan">
        <div class="qrcode-reader-demo container">

          <div class="scan" v-if="open === ''">
            <button @click="opencam" style="margin-top:250px;border-radius:4px;color: #ffffff;background:#4285f4;">สแกนเพื่อรับอุปกรณ์คืน</button>
          </div>
          <div v-if="open">
            <qrcode-reader :paused="paused" @decode="onDecode" @locate="onLocate" @init="onInit">
              <div class="point" v-for="point in points" :style="positionOf(point)"></div>
              <div class="content"></div>
            </qrcode-reader>
          </div>
          <div v-if="open === false && content !== null">
            <br>         
          </div>
          <div v-if="nameEqmTure && okHidden" class="scan">
            <div class="container-fluid" style="width:366px;margin-left: -2px;margin-top:80px;">
              <div class="row" style="margin-top:-2px;">
                <div class="col-md" style="padding-top:10px;background:fffffff;">
                  <div class="card">
                    <div class="card-block" style="padding-top:20px;font-size:20px;"> 
                      <b>หมายเลขอุปกรณ์ </b> <br><br> <h4>{{eqmID}}</h4>
                      <br>
                      <b> ชื่ออุปกรณ์ </b> <br><br>
                      <h4>{{nameEqms}}</h4>
                      <br><br>
                      <button @click="getEqm()" style="border-radius:4px;color: #ffffff;background:#4285f4;">ตกลง</button>
                      <br><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
            
          </div>

          <div v-if="nameEqmTure === false || msgCheck === false">
            <div class="container-fluid" style="margin-left: -4px;margin-top:80px;">
              <div class="row">
                <div class="col-md" style="padding-top:10px;background:fffffff;">
                  <div class="card">
                    <div class="card-block" style="padding-top:20px;font-size:20px;">
                      <br> 
                      อุปกรณ์ไม่อยู่ในรายการนี้
                      <br><br><br><br>
                      <button @click="OK()" style="border-radius:4px;color: #ffffff;background:#4285f4;height: 55px;width:200px;border:none;font-size18px;">ตกลง</button>
                      <br><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="msgStatus">
            <div class="container-fluid" style="margin-left: -4px;margin-top:80px;">
              <div class="row">
                <div class="col-md" style="padding-top:10px;background:fffffff;">
                  <div class="card">
                    <div class="card-block" style="padding-top:20px;font-size:20px;">
                      <br> 
                      อุปกรณ์นี้รับคืนแล้ว
                      <br><br><br><br>
                      <button @click="OK()" style="border-radius:4px;color: #ffffff;background:#4285f4;height: 55px;width:200px;border:none;font-size18px;">ตกลง</button>
                      <br><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="returnedSucsess">
            <div class="container-fluid" style="margin-left: -4px;margin-top:80px;">
              <div class="row">
                <div class="col-md" style="padding-top:10px;background:fffffff;">
                  <div class="card">
                    <div class="card-block" style="padding-top:20px;font-size:20px;">
                      <br> 
                      รับอุปกรณ์ครบแล้ว
                      <br><br><br><br>
                      <button @click="okBackHome()" style="border-radius:4px;color: #ffffff;background:#4285f4;height: 55px;width:200px;border:none;font-size18px;">ตกลง</button>
                      <br><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="navbar-toggler"></button>
      </div>

      <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()" style="color:#003a8c;">&times;</a>
      <router-link to="/alisteqm">
        <i class="glyphicon glyphicon-list-alt" style="color:#003a8c;font-size:50px;margin-top:30px;margin-left:-40px;" @click="closeNav()"></i>
        <a @click="closeNav()" href="#" style="color:#003a8c;margin-top:10px;margin-left:-50px;">แสดงรายการ</a>
      </router-link>
      <router-link to="/ascanrepair">
        <i class="glyphicon glyphicon-wrench" style="color:#003a8c;font-size:50px;margin-top:20px;margin-left:-33px;" @click="closeNav()"></i>
        <a @click="closeNav()" href="#" style="color:#003a8c;margin-top:10px;margin-left:-50px;">ส่งซ่อมอุปกรณ์</a>
      </router-link>
      <router-link to="/alistrepair">
        <i class="glyphicon glyphicon-save" style="color:#003a8c;font-size:50px;margin-top:20;margin-left:-33px;" @click="closeNav()"></i>
        <a @click="closeNav()" href="#" style="color:#003a8c;margin-top:10px;margin-left:-50px;">รับอุปกรณ์ที่ส่งซ่อมคืน</a>
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
import {equipmentRef, auth, userRef, scanRef, historyRef} from './firebase'
import moment from 'moment'

export default {
  name: 'areturnrepair',

  data () {
    return {
      points: [],
      content: '',

      open: '',
      eqmID: '',
      msg: '',
      arr: [],
      idexEqm: '',
      nameEqms: '',
      keyEqm: '',
      firstname: '',
      lastname: '',
      user: '',
      scan: '',

      paused: false,
      pauseOnCapture: true,

      balanceScan: '',
      returnedScan: '',
      nameLendScan: '',
      nameEqmTure: '',
      amountScan: '',
      returnedSucsess: '',
      okHidden: '',
      msgStatus: '',
      categoryhit: '',
      departmentHit: '',
      HnnoHit: '',
      dateHit: '',
      checkName: '',
      checkLast: '',
      nameLendCheck: '',
      lastnameLendCheck: '',
      msgCheck: '',
      balanceReturn: '',
      borrowedReturn: '',
      returnedDate: '',
      firstnameHis: '',
      lastnasmeHis: '',
      returnNumber: '',
      returned: '',
      return: '',
      aaaa: '',
      indexNumber: '',
      numberEqm: '',
      statuscheck: ''
    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    scans: scanRef,
    historys: historyRef
  },
  created () {
  },
  methods: {
    scanEqm () {
      this.scan = true
    },
    getEqm () {
      this.user = auth.currentUser
      if (this.user) {
        this.firstname = this.users.find(users => users.email === this.user.email).firstname
        this.lastname = this.users.find(users => users.email === this.user.email).lastname
      }

      equipmentRef.child(this.keyEqm + '/equipmentID/' + [this.idexEqm]).update({
        status: 'พร้อมใช้งาน',
        nameLend: '',
        lastnameLend: ''
      })
      // this.amountScan = this.historys.find(history => history['.key'] === this.$route.params.id).amount
      // this.returnedScan = this.historys.find(history => history['.key'] === this.$route.params.id).returnedEqm
      this.balanceReturn = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).balanceEqm
      this.amountRepair = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).amountRepair

      // historyRef.child(this.$route.params.id + '/returnedDate/' + [this.indexNumber]).update({
      //   number: this.eqmID,
      //   date: new Date().toLocaleString(),
      //   status: 'ส่งคืนแล้ว'
      // })
      this.amountRepair = this.amountRepair * 1 - 1
      this.balanceReturn = this.balanceReturn * 1 + 1
      // this.amountScan = this.amountScan * 1
      // this.returnedScan = this.returnedScan + 1
      historyRef.child(this.$route.params.id).update({
        statuscheck: 'พร้อมใช้งาน',
        dateReturn: moment().format('DD/MM/YYYY LTS')
      })
      equipmentRef.child(this.keyEqm).update({
        balanceEqm: this.balanceReturn,
        amountRepair: this.amountRepair
      })
      this.returnedSucsess = true
      this.okHidden = false
      if (this.returnedSucsess === true) {
        this.open = false
      } else {
        this.open = ''
      }
    },
    OK () {
      this.open = ''
      this.nameEqmTure = ''
      this.msgStatus = ''
    },
    okBackHome () {
      this.$router.push('/alistrepair')
      this.returnedSucsess = false
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    },
    opencam () {
      this.open = true
    },
    openNav () {
      document.getElementById('mySidenav').style.width = '101%'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
      document.getElementById('main').style.marginLeft = '0'
    },
    clcam () {
      this.open = ''
    },
    onDecode (content) {
      this.content = content
      var str = content
      var n = str.indexOf(' ')
      this.idexEqm = str.substring(0, n)
      this.keyEqm = str.substring(n + 1)
      this.eqmID = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].number
      this.nameEqms = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).nameEqm
      this.statusEqm = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].status
      // this.nameLendCheck = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].nameLend
      // this.lastnameLendCheck = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].lastnameLend

      this.nameLendScan = this.historys.find(history => history['.key'] === this.$route.params.id).nameEqm
      this.firstnameHis = this.historys.find(history => history['.key'] === this.$route.params.id).firstname
      this.lastnameHis = this.historys.find(history => history['.key'] === this.$route.params.id).lastname
      this.numberEqm = this.historys.find(history => history['.key'] === this.$route.params.id).numberEqm
      this.statuscheck = this.historys.find(history => history['.key'] === this.$route.params.id).statuscheck
      // this.indexNumber = this.returned.findIndex(returned => returned.number === this.eqmID)

      if (this.nameEqms === this.nameLendScan) {
        if (this.statusEqm === 'พร้อมใช้งาน') {
          this.open = false
          this.msgStatus = true
          this.statusEqm = '555'
        } else if (this.nameEqms === this.nameLendScan && this.eqmID === this.numberEqm) {
          this.nameEqmTure = true
          this.okHidden = true
          this.msgStatus = false
          this.open = false
        } else {
          this.nameEqmTure = false
          this.open = false
        }
      } else {
        this.nameEqmTure = false
        this.open = false
      }

      if (this.pauseOnCapture) {
        this.paused = true
      }
    },

    onLocate (points) {
      this.points = points
    },

    async onInit (promise) {
      this.content = 'STREAM LOADING...'

      try {
        this.content = ''
      } catch (e) {
        console.error(e)

        if (e.name === 'NotAllowedError') {
          this.content = 'To scan QR codes this component needs to access your camera.'
        } else {
          this.content = e.message
        }
      }
    },

    positionOf ({ x, y }) {
      return {
        'top': y + 'px',
        'left': x + 'px'
      }
    },

    togglePauseOnCapture () {
      this.pauseOnCapture = !this.pauseOnCapture

      if (!this.pauseOnCapture) {
        this.paused = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.scan button {
  height: 55px;
  border: none;
  padding: 18px;
  width: 200px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.card {
  width: 342px;
  margin: auto;
  margin-left:-17px;
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
    padding: 8px 8px 8px 32px;
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
