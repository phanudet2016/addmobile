<template>
  <div>
    <header style="background:#4285f4;font-size:25px;">
      <span>
        <a style="margin-left:-152px;font-size:18px;color:#ffffff;" class="menuIcon"></a>
        <a style="margin-left:16px;color:#ffffff;">สแกนรับอุปกรณ์</a>
      </span>
    </header>
    <main>
      <div class="contenscan">
        <div class="qrcode-reader-demo container">

          <div class="scan" style="margin-top:200px;border-radius:4px;color:#000000;border:1px solid #073e8c;font-weight:bold;background-color: #ffffff;" v-if="open === ''">
            <button @click="opencam">สแกนเพื่อรับอุปกรณ์</button>
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
            <div class="container-fluid">
              <div class="row" style="margin-top:-2px;">
                <div class="col-md" style="padding-top:10px;">
                  <div class="card">
                    <div class="card-block" style="padding-top:5px;"> 
                      หมายเลขอุปกรณ์: {{eqmID}}
                      <br><br>
                      {{nameEqms}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <button @click="getEqm()">ตกลง</button>
          </div>
          
          <div v-if="nameEqmTure === false">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md" style="padding-top:10px;">
                  <div class="card">
                    <div class="card-block" style="padding-top:5px;"> 
                      อุปกรณ์ไม่อยู่ในรายการยืม
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="msgStatus === true">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md" style="padding-top:10px;">
                  <div class="card">
                    <div class="card-block" style="padding-top:5px;"> 
                      อุปกรณ์นี้ถูกยืมไปแล้ว
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="acceptedSucsess">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md" style="padding-top:10px;">
                  <div class="card">
                    <div class="card-block" style="padding-top:5px;"> 
                      รับอุปกรณ์ครบแล้ว!!!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="navbar-toggler"></button>
      </div>
    </main>
  </div>
</template>

<script>
import 'webrtc-adapter'
import {equipmentRef, auth, userRef, scanRef, historyRef} from './firebase'

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
      dateHit: ''
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
        status: 'ถูกยืม',
        nameLend: this.firstname,
        lastnameLend: this.lastname
      })
      this.balanceScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).balance
      this.acceptedScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).accepted
      // push history
      this.amountScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).amountLend
      this.categoryhit = this.scans.find(scan => scan['.key'] === this.$route.params.id).categoryLend
      this.nameEqmHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).nameLend
      this.departmentHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).departmentLend
      this.HnnoHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).HnNo
      this.dateHit = this.scans.find(scan => scan['.key'] === this.$route.params.id).dateLend
      // end history
      this.amountScan = this.amountScan * 1
      this.acceptedScan = this.acceptedScan + 1
      this.balanceScan = this.balanceScan * 1 - 1
      if (this.acceptedScan >= this.amountScan) {
        this.acceptedSucsess = true
        historyRef.push({
          date: this.dateHit,
          nameEqm: this.nameEqmHit,
          firstname: this.firstname,
          lastname: this.lastname,
          amount: this.amountScan,
          category: this.categoryhit,
          department: this.departmentHit,
          HnNo: this.HnnoHit,
          returnedEqm: 0,
          returnedDate: ''
        })
      }
      if (this.acceptedScan <= this.amountScan) {
        scanRef.child(this.$route.params.id).update({
          balance: this.balanceScan,
          accepted: this.acceptedScan
        })
      }
      this.okHidden = false
    },
    signout () {
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
      this.eqmID = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].number
      this.nameEqms = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).nameEqm
      this.statusEqm = this.equipments.find(equipments => equipments['.key'] === this.keyEqm).equipmentID[this.idexEqm].status

      this.nameLendScan = this.scans.find(scan => scan['.key'] === this.$route.params.id).nameLend
      this.open = false

      if (this.statusEqm === 'ถูกยืม') {
        this.msgStatus = true
      } else if (this.nameEqms === this.nameLendScan) {
        this.nameEqmTure = true
        this.okHidden = true
        this.msgStatus = false
      } else {
        this.nameEqmTure = false
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
  background-color: #ffffff; /* Green */
  border: none;
  padding: 18px;
  width: 320px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  opacity: 0.6;
  color: #073e8c;
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

</style>
