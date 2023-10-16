<template>
  <win-tabs :initCSS="{width: 370,height: 560,left:900,top:30}" @close="close" v-if="show">
    <tab-pane :label="'实时天气&nbsp;'+time+'&nbsp;'">
      <div class="modal-body" style="padding: 0;overflow-x: hidden;">
        <iframe
            height="450"
            width="345"
            :src=h5Url
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
        ></iframe>
      </div>
    </tab-pane>
  </win-tabs>
</template>

<script>

import {tabPane, winTabs} from "@/VGEUtils/components/winTabs/index.js";


// 获取当前时间
function getNowFormatDate() {
  let date = new Date();
  let seperator1 = '-';
  let seperator2 = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + ' ' + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
  return currentdate;
}

let key = 'e4f2b99de28e48bfa0f5f1a45afedebf';
export default {
  name: 'weather',
  components: {winTabs, tabPane},
  data: function () {
    return {
      time: getNowFormatDate(),
      h5Url: ''
    };
  },
  methods: {
    // 刷新位置
    async reSetWeather() {
      let that = this;

      let cityInfo = await that.getCityByLonLat();

      let id = cityInfo.id;
      this.h5Url = `https://widget-page.qweather.net/h5/index.html?bg=1&md=012346&lc=${id}&key=64742dac690045b88e199af55ea9d624`;
    },
    async getCityInfo(cityName = '万州') {
      let cityInfo = await axios.get('https://geoapi.qweather.com/v2/city/lookup?key=' + key + '&location=' + cityName);
      return cityInfo.data.location[0];
    },
    async getCityByLonLat() {
      let worldPoint = VGEEarth.CameraUtils.getScreenCenterPoint();
      let cityInfo = await axios.get('https://geoapi.qweather.com/v2/city/lookup?key=' + key + '&location=' + worldPoint.longitude + ',' + worldPoint.latitude);
      return cityInfo.data.location[0];
    },
    close() {
      this.$store.commit('setVGEEarthComAction', {name: 'weather', on_off: 2});
    }
  },
  computed: {
    show() {
      let s = this.$store.getters.comStatus('weather');
      if (s) {
        this.reSetWeather();
      }
      return s;
    }
  },
  props: ['lat', 'lon']
};
</script>
