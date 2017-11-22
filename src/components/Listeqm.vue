<template>
  <div>
    <header style="background:#00b9e7;">
      <span @click="showList()">แสดงรายการ</span>
    </header>
    <main><br>
      <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md" v-if="scans.firstname == firstnames && scans.accepted < scans.amountLend" v-for="scans of scan" style="padding-top:10px;">
          <div class="card">
            <div class="card-block" style="padding-top:5px;"> 
              <p style="text-align:left;margin-left:5px;">{{scans.nameLend}}</p>
              <router-link :to="'/scanitem/' + scans['.key']"><span class="glyphicon glyphicon-qrcode"></span></router-link>
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
  width: 342px;
  margin: auto;
  height: 90px;
  border-radius: 5px;
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
  background:#00b9e7;
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

</style>
