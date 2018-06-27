<template>
  <div>
    <header style="background:#4285f4;font-size:25px;">
      <span>
        <a style="margin-left:-152px;font-size:18px;color:#ffffff;" class="menuIcon" @click="openNav()"></a>
        <a style="margin-left:16px;color:#ffffff;">ส่งซ่อมอุปกรณ์</a>
      </span>
    </header>
    <main>
      <div class="contenscan">
        <div class="qrcode-reader-demo container">
          <div class="scan" v-if="open === ''">
            <button @click="opencam" style="margin-top:250px;border-radius:4px;color: #ffffff;background:#4285f4;">สแกนส่งซ่อมอุปกรณ์</button>
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
                      <br>
                      <textarea style="border-radius:4px;border: 2px solid #ccc;" v-model="text"></textarea><br><br>
                      <button @click="getEqm()" style="border-radius:4px;color: #ffffff;background:#4285f4;width:254px;">ตกลง</button>
                      <br><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
            
          </div>
          
          <div v-if="nameEqmTure === false">
            <div class="container-fluid" style="margin-left: -4px;margin-top:80px;">
              <div class="row">
                <div class="col-md" style="padding-top:10px;background:fffffff;">
                  <div class="card">
                    <div class="card-block" style="padding-top:20px;font-size:20px;">
                      <br> 
                      อุปกรณ์ไม่อยู่ในสถานะส่งซ่อมได้
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
                      อุปกรณ์นี้ถูกส่งซ่อมแล้ว หรืออยู่ในสถานะถูกยืม
                      <br><br><br><br>
                      <button @click="OK()" style="border-radius:4px;color: #ffffff;background:#4285f4;height: 55px;width:200px;border:none;font-size18px;">ตกลง</button>
                      <br><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="acceptedSucsess">
            <div class="container-fluid" style="margin-left: -4px;margin-top:80px;">
              <div class="row">
                <div class="col-md" style="padding-top:10px;background:fffffff;">
                  <div class="card">
                    <div class="card-block" style="padding-top:20px;font-size:20px;">
                      <br> 
                      ส่งซ่อมอุปกรณ์แล้ว
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
     <button @click="submitLogout()" style="margin-top:50px;border:1px solid #003a8c;background:#ffffff;border-radius:100px;font-size:16px;color:#003a8c;width:140px;height:50px;">
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
  name: 'ascanrepair',

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
      acceptedScan: '',
      nameLendScan: '',
      nameEqmTure: '',
      amountScan: '',
      acceptedSucsess: '',
      okHidden: '',
      msgStatus: '',
      categoryhit: '',
      departmentHit: '',
      HnnoHit: '',
      dateHit: '',
      number: [],
      idLend: '',
      formIdlend: '',
      arrayEqm: [],
      test: '',
      forwardCoundScan: '',

      keyFormIdlen: '',
      borrowedTo: '',
      arrayEqmHit: '',
      indexForward: '',
      keyUpdateScan: '',
      arrayEqmScan: '',
      indexUpdateScan: '',

      dateCheckReturn: '',
      dateCheckRepair: '',
      email: '',
      formFirstname: '',
      formLastname: '',
      balanceLend: '',
      amountRepair: '',
      text: ''
    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    scans: scanRef,
    historys: historyRef
  },
  created () {
    if (this.user) {
      this.firstname = this.users.find(users => users.email === this.user.email).firstname
      this.lastname = this.users.find(users => users.email === this.user.email).lastname
    }
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
        this.departmentHit = this.users.find(users => users.email === this.user.email).department
        this.email = this.users.find(users => users.email === this.user.email).email
      }

      equipmentRef.child(this.keyEqm + '/equipmentID/' + [this.idexEqm]).update({
        status: 'ส่งซ่อม'
      })
      // this.balanceScan = this.scans.find(scan => scan['.key'] === this.keyEqm).balance
      // this.acceptedScan = this.scans.find(scan => scan['.key'] === this.keyEqm).accepted
      // this.forwardCoundScan = this.scans.find(scan => scan['.key'] === this.keyEqm).forwardCound
      // push history
      // this.amountScan = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).amountLend
      this.categoryhit = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).categoryEqm
      this.nameEqmHit = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).nameEqm
      // this.departmentHit = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).departmentLend
      // this.HnnoHit = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).HnNo
      // this.dateHit = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).dateLend
      // this.idLend = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).idLend
      // this.timeLengthHit = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).timeLength
      // this.dateCheckReturn = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).dateCheckReturn
      // this.dateCheckRepair = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).dateCheckRepair
      // this.email = this.equipments.find(equipment => equipment['.key'] === this.keyEqm).email
      this.balanceLend = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).balanceEqm
      this.amountRepair = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).amountRepair

      // this.number = this.equipments.find(equipment => equipment['.key'] === this.$route.params.id).number
      // end history
      // var insertNumber = {
      //   number: this.eqmID,
      //   date: '',
      //   status: 'ยังไม่ส่งคืน',
      //   indexReturn: this.idexEqm
      // }
      // this.number.push(insertNumber)
      this.balanceLend = this.balanceLend * 1 - 1
      this.amountRepair = this.amountRepair * 1 + 1
      equipmentRef.child(this.keyEqm).update({balanceEqm: this.balanceLend})
      equipmentRef.child(this.keyEqm).update({amountRepair: this.amountRepair})

      var s = ''
      if (this.categoryhit === 'สนับสนุน') {
        s = 'SUP'
      } else if (this.categoryhit === 'วินิจฉัยและรักษา') {
        s = 'DXRX'
      } else if (this.categoryhit === 'รักษา') {
        s = 'RX'
      } else if (this.categoryhit === 'วินิจฉัย') {
        s = 'DX'
      }
      var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
      var timestamp = new Date().getUTCMilliseconds()
      var id = getRandomInt + timestamp
      var idLend = s + id
      // this.amountScan = this.amountScan * 1
      // this.acceptedScan = this.acceptedScan + 1
      // this.balanceScan = this.balanceScan * 1 - 1
      // this.forwardCoundScan = this.forwardCoundScan * 1 + 1
      if (this.text === '') {
        this.text = '-'
      }
      this.acceptedSucsess = true
      historyRef.push({
        amountDate: '',
        date: moment().format('DD/MM/YYYY'),
        nameEqm: this.nameEqmHit,
        firstname: this.firstname,
        lastname: this.lastname,
        amount: 1,
        category: this.categoryhit,
        department: this.departmentHit,
        HnNo: '-',
        borrowedTo: 0,
        returnedEqm: 0,
        returnedDate: this.number,
        returnKey: this.keyEqm,
        idLend: idLend,
        timeLength: '-',
        dateCheckReturn: '-',
        dateCheckRepair: '-',
        dateCheckCalibrate: '-',
        email: this.email,
        status: 'ส่งซ่อม',
        numberEqm: this.eqmID,
        statuscheck: 'กำลังส่งซ่อม',
        year: moment().format('YYYY'),
        month: moment().format('MM'),
        note: this.text
      })
      // if (this.acceptedScan <= this.amountScan) {
      //   scanRef.child(this.$route.params.id).update({
      //     balance: this.balanceScan,
      //     accepted: this.acceptedScan,
      //     number: this.number,
      //     forwardCound: this.forwardCoundScan
      //   })
      // }
      this.okHidden = false
      if (this.acceptedSucsess === true) {
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
      this.$router.push('/ascanrepair')
      this.acceptedSucsess = false
    },
    openNav () {
      document.getElementById('mySidenav').style.width = '101%'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0px'
      document.getElementById('main').style.marginLeft = '0'
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    },
    opencam () {
      this.open = true
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
      console.log(this.idexEqm, this.keyEqm)

      this.eqmID = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].number
      this.nameEqms = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).nameEqm
      this.statusEqm = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].status
      this.amountRepairCheck = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).amountRepair
      this.balanceEqmCheck = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).balanceEqm
      // this.formIdlend = this.scans.find(scan => scan['.key'] === this.$route.params.id).formIdlend

      // if (this.formIdlend !== '') {
      //   this.open = false
      //   this.formFirstname = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].nameLend
      //   this.formLastname = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].nameLend
      //   // this.nameEqms = this.arrayEqm.find(arrayEqm => arrayEqm.number === this.eqmID).number
      //   console.log(this.formFirstname, this.formLastname, 'GG')
      //   this.nameEqmformIdlend = this.scans.find(scan => scan.idLend === this.formIdlend).nameLend
      //   for (var i = 0; i < this.arrayEqm.length; i++) {
      //     if (this.arrayEqm[i].number === this.eqmID && this.nameEqmformIdlend === this.nameEqms && this.formFirstname !== this.firstname && this.formLastname !== this.Lastname) {
      //       this.nameEqmTure = true
      //       this.okHidden = true
      //       break
      //     } else {
      //       this.nameEqmTure = false
      //     }
      //   }
      // } else if (this.formIdlend === '') {
      // this.nameLendScan = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).nameLend
      this.open = false
      if (this.statusEqm === 'ส่งซ่อม' || this.statusEqm === 'ถูกยืม') {
        this.msgStatus = true
      } else if (this.nameEqms !== '') {
        this.nameEqmTure = true
        this.okHidden = true
        this.msgStatus = false
        console.log('1')
      } else {
        this.nameEqmTure = false
        this.open = false
        console.log('2')
      }
      if (this.pauseOnCapture) {
        this.paused = true
      }
      // }
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
  background: #4285f4;
  border: none;
  padding: 18px;
  width: 200px;
  color: #ffffff;
  font-size: 18px;
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
  width: 100%;
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
