<template>
  <div>
    <header style="background:#4285f4;font-size:25px;">
      <span>
        <a style="margin-left:-152px;font-size:18px;color:#ffffff;" class="menuIcon" @click="openNav()"></a>
        <a style="margin-left:16px;color:#ffffff;">สแกนรับอุปกรณ์{{test}}</a>
      </span>
    </header>
    <main>
      <div class="contenscan">
        <div class="qrcode-reader-demo container">
          <div class="scan" v-if="open === ''">
            <button @click="opencam" style="margin-top:250px;border-radius:4px;color: #ffffff;background:#4285f4;">สแกนเพื่อรับอุปกรณ์</button>
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
          
          <div v-if="nameEqmTure === false">
            <div class="container-fluid" style="margin-left: -4px;margin-top:80px;">
              <div class="row">
                <div class="col-md" style="padding-top:10px;background:fffffff;">
                  <div class="card">
                    <div class="card-block" style="padding-top:20px;font-size:20px;">
                      <br> 
                      รับอุปกรณ์ไม่ตรงตามหมายเลข
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
                      อุปกรณ์นี้ถูกยืมไปแล้ว
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
                      รับอุปกรณ์แล้ว
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
import {equipmentRef, auth, userRef, scanRef, historyRef, bookEqmRef} from './firebase'
import moment from 'moment'

export default {
  name: 'hello',

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

      month: '',
      year: '',
      amountDate: '',
      dateCheckCalibrate: '',
      numberShow: '',
      recipient: '',
      dateLendTs: '',
      timeLengthTs: '',
      balanceLend: '',
      borrowedLend: '',
      keyRemoveBook: ''

    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    scans: scanRef,
    historys: historyRef,
    bookEqm: bookEqmRef
  },
  created () {
    this.formIdlend = this.scans.find(scan => scan['.key'] === this.$route.params.id).formIdlend
    console.log(this.formIdlend, 'gg')
    if (this.formIdlend !== '') {
      this.arrayEqm = this.scans.find(scans => scans.idLend === this.formIdlend).number
      console.log(this.arrayEqm)
    }
    this.user = auth.currentUser
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
      }

      equipmentRef.child(this.keyEqm + '/equipmentID/' + [this.idexEqm]).update({
        status: 'ถูกยืม',
        nameLend: this.firstname,
        lastnameLend: this.lastname
      })
      this.balanceScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).balance
      this.acceptedScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).accepted
      this.forwardCoundScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).forwardCound
      // push history
      this.amountScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).amountLend
      this.categoryhit = this.scans.find(scan => scan['.key'] === this.$route.params.id).categoryLend
      this.nameEqmHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).nameLend
      this.departmentHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).departmentLend
      this.HnnoHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).HnNo
      this.dateHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).dateLend
      this.idLend = this.scans.find(scan => scan['.key'] === this.$route.params.id).idLend
      this.timeLengthHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).timeLength
      this.dateCheckReturn = this.scans.find(scan => scan['.key'] === this.$route.params.id).dateCheckReturn
      this.dateCheckRepair = this.scans.find(scan => scan['.key'] === this.$route.params.id).dateCheckRepair
      this.dateCheckCalibrate = this.scans.find(scan => scan['.key'] === this.$route.params.id).dateCheckCalibrate
      this.email = this.scans.find(scan => scan['.key'] === this.$route.params.id).email
      this.month = this.scans.find(scan => scan['.key'] === this.$route.params.id).month
      this.year = this.scans.find(scan => scan['.key'] === this.$route.params.id).year
      this.amountDate = this.scans.find(scan => scan['.key'] === this.$route.params.id).amountDate

      if (this.formIdlend !== '') {
        this.keyFormIdlen = this.historys.find(historys => historys.idLend === this.formIdlend)['.key']
        this.borrowedTo = this.historys.find(historys => historys.idLend === this.formIdlend).borrowedTo
        this.arrayEqmHit = this.historys.find(historys => historys.idLend === this.formIdlend).returnedDate
        this.indexForward = this.arrayEqmHit.findIndex(arrayEqmHit => arrayEqmHit.number === this.eqmID)

        this.keyUpdateScan = this.scans.find(scans => scans.idLend === this.formIdlend)['.key']
        this.arrayEqmScan = this.scans.find(scans => scans.idLend === this.formIdlend).number
        this.indexUpdateScan = this.arrayEqmScan.findIndex(arrayEqmScan => arrayEqmScan.number === this.eqmID)

        this.borrowedTo = this.borrowedTo + 1
        console.log(this.borrowedTo)
        historyRef.child(this.keyFormIdlen + '/returnedDate/' + [this.indexForward]).update({
          date: moment().format('DD/MM/YYYY LTS'),
          status: 'ถูกยืมต่อ'
        })
        scanRef.child(this.keyUpdateScan + '/number/' + [this.indexUpdateScan]).update({
          date: moment().format('DD/MM/YYYY LTS'),
          status: 'ถูกยืมต่อ'
        })
        historyRef.child(this.keyFormIdlen).update({
          borrowedTo: this.borrowedTo
        })
      }

      this.number = this.scans.find(scan => scan['.key'] === this.$route.params.id).number
      // end history
      console.log(this.eqmID)
      var insertNumber = {
        number: this.eqmID,
        date: '',
        status: 'ยังไม่ส่งคืน',
        indexReturn: this.idexEqm,
        dateCheckReturn: this.dateCheckReturn
      }
      this.number.push(insertNumber)

      this.amountScan = this.amountScan * 1
      this.acceptedScan = this.acceptedScan + 1
      this.balanceScan = this.balanceScan * 1 - 1
      this.forwardCoundScan = this.forwardCoundScan * 1 + 1
      if (this.acceptedScan >= this.amountScan) {
        this.acceptedSucsess = true
        historyRef.push({
          amountDate: this.amountDate,
          month: this.month,
          year: this.year,
          date: this.dateHit,
          nameEqm: this.nameEqmHit,
          firstname: this.firstname,
          lastname: this.lastname,
          amount: this.amountScan,
          category: this.categoryhit,
          department: this.departmentHit,
          HnNo: this.HnnoHit,
          borrowedTo: 0,
          returnedEqm: 0,
          returnedDate: this.number,
          returnKey: this.keyEqm,
          idLend: this.idLend,
          timeLength: this.timeLengthHit,
          dateCheckReturn: this.dateCheckReturn,
          dateCheckRepair: this.dateCheckRepair,
          dateCheckCalibrate: this.dateCheckCalibrate,
          email: this.email,
          status: 'ถูกยืม',
          // ****************************
          numberShow: this.numberShow,
          recipient: this.firstname + ' ' + this.lastname,
          dateLendTs: this.dateLendTs,
          timeLengthTs: this.timeLengthTs
        })
      }
      if (this.acceptedScan <= this.amountScan) {
        scanRef.child(this.$route.params.id).update({
          balance: this.balanceScan,
          accepted: this.acceptedScan,
          number: this.number,
          forwardCound: this.forwardCoundScan
        })
      }

      var keyUpdate = this.keyEqm
      this.balanceLend = this.equipments.find(equipments => equipments['.key'] === keyUpdate).balanceEqm
      this.borrowedLend = this.equipments.find(equipments => equipments['.key'] === keyUpdate).borrowedEqm
      this.keyRemoveBook = this.bookEqm.find(bookEqm => bookEqm.idLend === this.idLend)['.key']
      if (this.formIdlend === '') {
        this.balanceLend = this.balanceLend * 1 - 1
        this.borrowedLend = this.borrowedLend * 1 + 1
        equipmentRef.child(keyUpdate).update({borrowedEqm: this.borrowedLend})
        equipmentRef.child(keyUpdate).update({balanceEqm: this.balanceLend})
      }
      bookEqmRef.child(this.keyRemoveBook).update({status: 'รับแล้ว'})

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
      this.$router.push('/listeqm')
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
      this.formIdlend = this.scans.find(scan => scan['.key'] === this.$route.params.id).formIdlend

      this.numberShow = this.scans.find(scan => scan['.key'] === this.$route.params.id).numberShow
      this.dateLendTs = this.scans.find(scan => scan['.key'] === this.$route.params.id).dateLendTs
      this.timeLengthTs = this.scans.find(scan => scan['.key'] === this.$route.params.id).timeLengthTs

      if (this.formIdlend !== '') {
        this.open = false
        this.formFirstname = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].nameLend
        this.formLastname = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].nameLend
        // this.nameEqms = this.arrayEqm.find(arrayEqm => arrayEqm.number === this.eqmID).number
        console.log(this.formFirstname, this.formLastname, 'GG')
        this.nameEqmformIdlend = this.scans.find(scan => scan.idLend === this.formIdlend).nameLend
        for (var i = 0; i < this.arrayEqm.length; i++) {
          if (this.arrayEqm[i].number === this.eqmID && this.nameEqmformIdlend === this.nameEqms && this.formFirstname !== this.firstname && this.formLastname !== this.Lastname) {
            this.nameEqmTure = true
            this.okHidden = true
            break
          } else {
            this.nameEqmTure = false
          }
        }
      } else if (this.formIdlend === '') {
        console.log('555')
        this.nameLendScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).nameLend
        this.open = false
        if (this.statusEqm === 'ถูกยืม') {
          this.msgStatus = true
        } else if (this.nameEqms === this.nameLendScan && this.numberShow === this.eqmID) {
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
