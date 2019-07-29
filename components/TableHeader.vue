<template>
<!-- 未使用 本当はコンポーネントに切り出したい -->
  <div class="">
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
  </div>
</template>

<script>
export default {
  props: {
      timeTableData: Object,
      selectedDay: String
  },
    computed: {
    viewText() {
      return this.isNormalViewMode ? "全体表示" : "通常表示";
    }
  },
  methods: {
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
</style>