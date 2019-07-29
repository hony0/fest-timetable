<template>
    <div class="timetable">
      <div class="timetable_grid"><div class="timetable_grid-h"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
      <div class="timetable_01"><div class="timetable_h"><div>09</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div></div></div>
      <div class="timetable_02">
          <div class="timetable_line" v-for="stage in selectedDayTimetable">
                <div class="stage_name" :style="{backgroundColor: stage.color}">
                  {{stage.name}}
                </div>
                <div 
                  v-for="act in stage.acts"
                  class="timetable_block"
                  :class="{isSelected: act.select}"
                  :style="getPosition(act)"
                  :key="act.name"
                  @click="selectAct(act)">
                  {{act.startH}}:{{act.startM}} ~<br>
                  {{act.name}}
                </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
      timeTableData: Object,
      selectedDay: String
  },
  computed: {
    selectedDayTimetable() {
      let self = this;  
      if (self.timeTableData.days) {
        let day = self.timeTableData.days.find( day =>  {
            return day.date === self.selectedDay; 
        });
        return day.stages;
      }
      return [];
    }
  },
  methods: {
    getPosition: function(act) {
      let style = {};
      let top = (act.startH -9) * 90 + 70;
      top += act.startM * 1.5;

      style.height = ((act.time * 1.5) - 1) + 'px';
      style.top = top + 'px';
      return style; 
    },
    selectAct: function(act) {
      act.select = act.select ? false : true;
      let version = parseInt(localStorage.rockin2019ver, 10) + 1;
      localStorage.setItem('rockin2019ver', version);
      localStorage.setItem('rockin2019data', JSON.stringify(this.timeTableData));
    }
  }
}
</script>
<style>

.timetable {
    min-width: 750px;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
}

.timetable_grid {
    min-width: 720px;
    width: calc(100% - 30px);
    position: absolute;
    left: 30px;
    z-index: 1;
}

.timetable_grid-h div:first-child {
    height: 70px;
}

.timetable_grid-h div:nth-child(2n) {
    border-bottom: 1px solid #ddd;
}

.timetable_grid-h div {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #aaa;
}

.timetable_h {
    width: 30px;
    margin-top: 60px;
    padding-left: 8px;
}

.timetable_h div {
    height: 90px;
}

.timetable_02 {
    min-width: 720px;
    width: calc(100% - 30px);
    display: flex;
}

.stage_name {
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    font-weight: bold;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;
}

.timetable_line {
    min-width: 84px;
    width: 12.5%;
    height: 1320px;
    position: relative;
    margin-left: 3px;
    margin-right: 3px;
    background-color: #fafafa;
}

.timetable_block {
    background-color: #ececec;
    position: absolute;
    font-size: 11px;
    z-index: 2;
    width: 100%;
    padding: 4px;
    cursor: pointer;
}

.timetable_block.isSelected {
    background-color: #54bbc1;
    color: #fff;
}
</style>