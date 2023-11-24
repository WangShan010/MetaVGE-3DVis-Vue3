<template>
  <div class="dark">
    <div class="title">
      <span>地区:</span>
      <span id="province">{{ provinceName }}</span>
      <span id="city"></span>
      <span id="district"></span>
      <i class="el-icon-top toBlack" @click="toBack()" v-if="status !== 1"></i>
    </div>
    <div class="city-list">
      <!--省-->
      <div class="city-table" id="city-table" style="display: block;" v-if="provinceShow">
        <table class="mars-primary-table">
          <tbody>
          <tr>
            <th class="area" width="50">华北</th>
            <th height="48" class="city" id="northChian">
              <p @click="flyToProvince(110000)">北京</p>
              <p @click="flyToProvince(120000)">天津</p>
              <p @click="flyToProvince(130000)">河北</p>
              <p @click="flyToProvince(140000)">山西</p>
              <p @click="flyToProvince(150000)">内蒙古</p>
            </th>
          </tr>
          <tr>
            <th class="area">东北</th>
            <th height="48" class="city" id="northeastChain">
              <p @click="flyToProvince(210000)">辽宁</p>
              <p @click="flyToProvince(220000)">吉林</p>
              <p @click="flyToProvince(230000)">黑龙江</p>
            </th>
          </tr>
          <tr>
            <th class="area">华东</th>
            <th height="48" class="city" id="eastChian">
              <p @click="flyToProvince(310000)">上海</p>
              <p @click="flyToProvince(320000)">江苏</p>
              <p @click="flyToProvince(330000)">浙江</p>
              <p @click="flyToProvince(340000)">安徽</p>
              <p @click="flyToProvince(350000)">福建</p>
              <p @click="flyToProvince(360000)">江西</p>
              <p @click="flyToProvince(370000)">山东</p>
            </th>
          </tr>
          <tr>
            <th class="area">华中</th>
            <th height="48" class="city" id="centralChian">
              <p @click="flyToProvince(410000)">河南</p>
              <p @click="flyToProvince(420000)">湖北</p>
              <p @click="flyToProvince(430000)">湖南</p>
            </th>
          </tr>
          <tr>
            <th class="area">华南</th>
            <th height="48" class="city" id="southChian">
              <p @click="flyToProvince(440000)">广东</p>
              <p @click="flyToProvince(450000)">广西</p>
              <p @click="flyToProvince(460000)">海南</p>
            </th>
          </tr>
          <tr>
            <th class="area">西南</th>
            <th height="48" class="city" id="southwestChian">
              <p @click="flyToProvince(500000)">重庆</p>
              <p @click="flyToProvince(510000)">四川</p>
              <p @click="flyToProvince(520000)">贵州</p>
              <p @click="flyToProvince(530000)">云南</p>
              <p @click="flyToProvince(540000)">西藏</p>
            </th>
          </tr>
          <tr>
            <th class="area">西北</th>
            <th height="48" class="city" id="northwestChian">
              <p @click="flyToProvince(610000)">陕西</p>
              <p @click="flyToProvince(620000)">甘肃</p>
              <p @click="flyToProvince(630000)">青海</p>
              <p @click="flyToProvince(640000)">宁夏</p>
              <p @click="flyToProvince(650000)">新疆</p>
            </th>
          </tr>
          <tr>
            <th class="area">港澳台</th>
            <th height="48" class="city" id="GAT">
              <p @click="flyTaiwan(710000)">台湾</p>
              <p @click="flyToProvince(810000)">香港</p>
              <p @click="flyToProvince(820000)">澳门</p>
            </th>
          </tr>
          </tbody>
        </table>
      </div>
      <!--市-->
      <div class="city-list-item" id="city-list-item" style="display: block;" v-if="cityShow">
        <p v-for="cityItem in cityFeatures" @click="flyToCity(cityItem)">{{ cityItem.properties.name }}</p>
      </div>
      <!--区-->
      <div class="district-list-item" id="district-list-item" style="display: block;" v-if="areaShow">
        <p v-for="areaItem in areaFeatures" @click="flyToArea(areaItem)">{{ areaItem.properties.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import coordinateOffset from './lib/CoordinateOffset.js';

let aLiYun = 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/';
export default {
  name: 'areaNavigationContent',
  data() {
    return {
      //当前状态1是省，2是市，3是区
      status: 1,
      provinceShow: true,
      cityShow: false,
      areaShow: false,
      provinceName: '全国',
      municipality: new Set([
        '北京市', '上海市', '天津市', '香港特别行政区', '澳门特别行政区', '重庆市'
        , '密云区', '延庆区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '东城区', '西城区'
        , '和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '宁河区', '静海区', '蓟州区', '滨海新区'
        , '万州区', '涪陵区', '梁平区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '渝北区', '巴南区', '长寿区', '綦江区', '潼南区', '铜梁区', '大足区', '荣昌区', '璧山区', '城口县', '丰都县', '垫江县', '武隆区', '忠县', '开州区', '云阳县', '奉节县', '巫山县', '巫溪县', '黔江区', '石柱土家族自治县', '秀山土家族苗族自治县', '酉阳土家族苗族自治县', '彭水苗族土家族自治县', '江津区', '合川区', '永川区', '南川区'
        , '花地玛堂区', '圣安多尼堂区', '大堂区', '望德堂区', '风顺堂区', '路凼填海区', '嘉模堂区', '圣方济各堂区', '花王堂区'
        , '中西区', '湾仔区', '东区', '南区', '九龙城区', '油尖旺区', '观塘区', '黄大仙区', '深水埗区', '新界', '北区', '大埔区', '沙田区', '西贡区', '元朗区', '屯门区', '荃湾区', '葵青区', '离岛区'
        , '黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'
      ]),
      //省数组
      provinceFeatures: [],
      //市数组
      cityFeatures: [],
      //区数组
      areaFeatures: [],
      // 当前市级adcode
      cityAdcode: 0,
      // 当前区级adcode
      areaAdcode: 0,
    };
  },
  methods: {
    media(coordinates) {
      let c = JSON.parse(JSON.stringify(coordinates));
      for (let i = 0; i < coordinates.length; i++) {
        for (let j = 0; j < coordinates[i].length; j++) {
          for (let s = 0; s < coordinates[j].length; s++) {
            let result = coordinateOffset.gcj_decrypt_exact(coordinates[i][j][s][1], coordinates[i][j][s][0]);
            c[i][j][s][0] = result.lon;
            c[i][j][s][1] = result.lat;
            // console.log(result.lon,result.lat)
          }
        }
      }
      let entity = this.addPolygon(c);
      window.earth.viewer3D.flyTo(entity);
    },
    /**
     * 视角飞行时调用，增加矢量边界实体
     * @param coordinates 边界坐标数组
     */
    addPolygon(coordinates) {
      window.earth.viewer3D.entities.removeAll();
      let arr = [];
      for (let i = 0; i < coordinates[0][0].length; i++) {
        arr.push(coordinates[0][0][i][0]);
        arr.push(coordinates[0][0][i][1]);
      }
      let areaPolygon = window.earth.viewer3D.entities.add({
        id: 'areaPolygon',
        name: 'areaPolygon',
        polyline: {
          id: 'glowingLine',
          width: 12,
          positions: Cesium.Cartesian3.fromDegreesArray(arr),
          material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
            color: Cesium.Color.AQUA,
            duration: 5000,
          }),
          clampToGround: true
        }
      });
      return areaPolygon;
    },
    /**
     * 飞行到省,加载市列表
     * @param adcode 请求json数据各个地区的编码
     */
    flyToProvince(adcode) {
      this.provinceShow = false;
      this.cityShow = true;
      this.areaShow = false;
      axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/100000.json`).then(res => {
        this.provinceFeatures = res.data.features;
        this.provinceFeatures.forEach(element => {
          if (element.properties.adcode === adcode) {
            this.provinceName = element.properties.name;
            // let entity = this.addPolygon1(element.geometry.coordinates);
            // window.earth.viewer3D.flyTo(entity);// 飞向实体
            this.media(element.geometry.coordinates);
          }
        });
      });
      axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`).then(res => {
        this.cityFeatures = res.data.features;
        this.status = 2;
        this.cityAdcode = adcode;
      });
    },
    /**
     * 视角飞行市，加载区列表
     * @param cityInfo
     */
    flyToCity(cityInfo) {
      if (this.municipality.has(this.provinceName)) {
        axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${cityInfo.properties.adcode}.json`).then(res => {
          // let entity = this.addPolygon(cityInfo.geometry.coordinates);
          // window.earth.viewer3D.flyTo(entity);// 飞向实体
          this.media(cityInfo.geometry.coordinates);
          this.provinceName = cityInfo.properties.name;
          this.areaAdcode = cityInfo.properties.adcode;
          this.status = 3;
        });
      } else {
        this.provinceName = cityInfo.properties.name;
        this.provinceShow = false;
        this.cityShow = false;
        this.areaShow = true;
        axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${cityInfo.properties.adcode}.json`).then(
            res => {
              this.areaFeatures = res.data.features;
              // let entity = this.addPolygon(cityInfo.geometry.coordinates);
              // window.earth.viewer3D.flyTo(entity);// 飞向实体
              this.media(cityInfo.geometry.coordinates);
              this.areaAdcode = cityInfo.properties.adcode;
              this.status = 3;
            });
      }
    },
    /**
     * 视角飞行区
     * @param areaInfo
     */
    flyToArea(areaInfo) {
      this.provinceName = areaInfo.properties.name;
      axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${areaInfo.properties.adcode}.json`).then(res => {
        this.areasFeatures = res.data.features;
        // let entity = this.addPolygon(areaInfo.geometry.coordinates);
        // window.earth.viewer3D.flyTo(entity);// 飞向实体
        this.media(areaInfo.geometry.coordinates);
        this.status = 4;
      });
    },
    /**
     * 视角飞行到台湾省，由于台湾下属不含区故单独调用函数
     * @param adcode
     */
    flyTaiwan(adcode) {
      this.provinceShow = true;
      this.cityShow = false;
      this.areaShow = false;
      axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`).then(res => {
        this.provinceFeatures = res.data.features;
        this.provinceFeatures.forEach(element => {
          if (element.properties.adcode === adcode) {
            this.provinceName = element.properties.name;
            // let entity = this.addPolygon(element.geometry.coordinates);
            // window.earth.viewer3D.flyTo(entity);// 飞向实体
            this.media(element.geometry.coordinates);
          }
        });
      });
    },
    /**
     * 返回事件 市级
     * @param adcode
     */
    cityBack(adcode) {
      axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${this.cityAdcode}.json`).then(res => {
        this.provinceFeatures = res.data.features;
        this.provinceFeatures.forEach(element => {
          if (element.properties.adcode === adcode) {
            this.provinceName = element.properties.name;
            // let entity = this.addPolygon(element.geometry.coordinates);
            // window.earth.viewer3D.flyTo(entity);
            this.media(element.geometry.coordinates);
          }
        });
      });
      this.provinceShow = false;
      this.cityShow = true;
      this.areaShow = false;
      axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`).then(
          res => {
            this.areaFeatures = res.data.features;
            this.status = 3;
          });
    },
    /**
     * 返回上一层
     */
    toBack() {
      if (this.status === 2) {
        window.earth.viewer3D.entities.removeAll();
        //this.inintalView();//初始视角
        this.status = 1;
        this.provinceShow = true;
        this.cityShow = false;
        this.areaShow = false;
      } else if (this.status === 3) {
        this.status = 2;
        this.flyToProvince(this.cityAdcode);
      } else if (this.status === 4) {
        this.status = 3;
        this.cityBack(this.areaAdcode);
      }
    },
    /**
     * 初始视角
     */
    inintalView() {
      window.earth.viewer3D.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(117.30, 42.40, 10000.0),
        orientation: {
          pitch: Cesium.Math.toRadians(-35.0)
        }
      });
    }
  }
};
</script>

<style scoped>
.dark a {
  color: #fff;
  text-decoration: none;
  margin-top: 1px;
  margin-right: 2px;
}

.dark {
  overflow: hidden;
  color: #fff;
}

.title {
  margin-top: 10px;
  border-bottom: 1px #0ff solid;
}

.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.toBlack {
  position: absolute;
  right: 15px;
  cursor: pointer;
  color: white;
  width: 0;
  height: 0;
  border-right: 7px solid #ccc;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
}

.city-list {
  padding: 10px 5px;
}

.area {
  color: #0ff;
}

.city p,
.city-list-item p,
.district-list-item p {
  display: inline;
  padding-left: 4px;
  font-weight: 400;
  margin: 0 0 6px;
  cursor: pointer;
  float: left;
}
</style>
