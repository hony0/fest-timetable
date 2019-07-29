<template>
  <div class="container">
    <div class="header">
      <h1 class="header_logo">
      <span class="header_logo_01">タムテブ</span>
      <span class="header_logo_02">ROCK IN JAPAN FES.2019</span>
      </h1>
      <p class="header_lead">マイタイムテーブルの作成と共有ができるサービスです</p>
    </div>
    <div class="tab_block">
      <ul class="tab">
        <li v-for="day in timeTableData.days" 
          :class="{isSelected:judgeSelectedDay(day)}"
          @click="selectDay(day)">
            {{day.date}}
        </li>
      </ul>
      <button class="btn-view"
        @click="selectView">{{viewText}}</button>
    </div>
    <time-table :timeTableData="timeTableData" :selectedDay="selectedDay"></time-table>
  </div>

</template>

<script>
import TimeTable from '~/components/TimeTable.vue'
import axios from 'axios'
import db from '~/plugins/firebase.js'

export default {
  components: {
    TimeTable
  },
  data() {
    return {
      timeTableData: {},
      selectedDay: "8/3(SAT)",
      isNormalViewMode: true,
      loading: false,
      currentVersion: localStorage.rockin2019ver,
      currentId: localStorage.rockin2019id,
      shareUrl: "https://fest-timetable.web.app/rockin2019/myTable/",
    }
  },
  mounted () {
    var self = this;
    db.collection("timetable").doc(self.$route.params.id).get().then(function(docRef) {
        if (docRef) {
          self.timeTableData = docRef.data()
        } else {
          console.log("No such document!")
        }
    }).catch(function(t) {
        console.log("Error getting document:", t)
    })
  },
  computed: {
    viewText() {
      return this.isNormalViewMode ? "全体表示" : "通常表示";
    },
    btnText() {
      return this.currentId ? "タイムテーブルを更新する" : "タイムテーブルを共有する"
    }
  },
  methods: {
    uploadFirebase: function() {
      var self = this;
      self.loading = !0,
      setTimeout(function() {               
          db.collection("timetable").add(JSON.parse(localStorage.rockin2019data)).then(function(docRef) {
              console.log("Document written with ID: ", docRef.id),
              self.currentVersion = localStorage.rockin2019ver;
              self.currentId = docRef.id;
              localStorage.setItem("rockin2019id", docRef.id);
              self.loading = false;
          }).catch(function(e) {
              console.error("Error adding document: ", e),
              alert("エラーが発生しました"),
              self.loading = false
          })
      }, 1e3)
    },
    judgeSelectedDay: function(_day) {
      return this.selectedDay === _day.date ? true : false;
    },
    selectDay: function(_day) {
      this.selectedDay = _day.date;
    },
    selectView: function() {
      if (this.isNormalViewMode) {
        var scale = window.innerWidth / 750;
        document.querySelector("meta[name='viewport']").setAttribute("content", "width=750, initial-scale=" + scale);
      } else {
        document.querySelector("meta[name='viewport']").setAttribute("content", "width=device-width, initial-scale=1");
      }
      this.isNormalViewMode ? this.isNormalViewMode = false : this.isNormalViewMode = true;
    }
  }
}


</script>

<style>
button, input, select, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
}

.header {
    width: 100%;
    padding: 16px 0 8px 16px;
}

.header_logo {
    font-size: 21px;
    font-weight: 400;
}

.header_logo_01 {
    color: #54bbc1;
}

.header_logo_02 {
    color: #555;
    margin-left: -3px;
}

.header_lead {
    font-size: 12px;
}

.tab_block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 20px;
}

.tab {
    display: flex;
    padding: 0;
}

.tab>li.isSelected {
    color: #000;
    border-bottom: 3px solid #54bbc1;
}

.tab>li {
    list-style: none;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    color: #999;
    border-bottom: 3px solid #eee;
    padding: 10px 20px;
}

.btn-view {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 10px;
    background-color: #54bbc1;
    font-size: 14px;
    text-decoration: none;
    font-weight: 700;
    cursor: pointer;
}

.btn-view, .stage_name {
    color: #fff;
    text-align: center;
}

.share {
    width: 100%;
    margin: 40px auto 20px;
    max-width: 600px;
    padding: 12px;
}
</style>
