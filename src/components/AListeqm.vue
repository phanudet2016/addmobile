<template>
  <div>
    <header style="background:#00b9e7;">
      <span @click="showList()">แสดงรายการ</span>
    </header>
    <main><br>
      <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md" v-for="history of historys" v-if="history.returnedEqm < history.amount" style="padding-top:10px;">
          <div class="card">
            <div class="card-block" style="padding-top:5px;"> 
              <p style="text-align:left;margin-left:5px;">{{history.nameEqm}}</p>
              <p style="text-align:left;margin-left:5px;">
                ผู้ยืม: {{history.firstname}} {{history.lastname}} <br>
                จำนวน: {{history.amount}}
                <router-link :to="'/ascanitem/' + history['.key']">
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
import {equipmentRef, userRef, scanRef, auth, historyRef} from './firebase'

export default {
  name: 'alisteqm',

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
    scan: scanRef,
    historys: historyRef
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
