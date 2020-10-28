<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <button
          type="button"
          v-on:click="activetab = 1"
          v-bind:class="[activetab === 1 ? 'active' : '']"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          データ表示
        </button>
        <button
          type="button"
          v-on:click="activetab = 2"
          v-bind:class="[activetab === 2 ? 'active' : '']"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          メモ
        </button>
        <div class="col-md-6 col-xl-1"></div>
        <button
          type="button"
          class="btn btn-success col-md-6 col-xl-1"
          data-toggle="modal"
          data-target="#filter-content"
        >
          絞り込み
        </button>
        <div class="col-md-6 col-xl-1"></div>
        <button
          type="button"
          v-on:click="
            startVisivle = !startVisivle;
            visivle(startVisivle);
          "
          class="btn btn-success col-md-6 col-xl-1"
        >
          データ切り替え
        </button>
      </div>
      <!-- <div class="row flex-nowrap" >
        <div class="col-6 flex-nowrap" v-for="(value, index) in newCateButtons"
          :key="index"
        > -->
      <!-- <button
            type="button"
            class="btn btn-outline-info col-1 flex-nowrap"
            v-for="Value in cateButtons"
            :key="Value"
          >
            {{Value}}
          </button> -->
      <!-- <button
            type="button"
            class="btn btn-outline-info col-1 flex-nowrap"
            v-for="(nestValue, nestIndex) in value"
            :key="nestIndex"
          >
            {{nestValue}}
          </button>
          </div>
      </div> -->
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <ul class="nav">
            <button
              class="btn btn-outline-info nav-item"
              v-for="(Value,index) in cateButtons"
              :key="index"
            >
              {{ Value }}
            </button>
          </ul>
      </nav>

      <div class="modal" id="filter-content" tabindex="-1" role="dialog">
        <div id="modal-filter" class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div class="row col-12">
                <li class="list-inline-item col-12 col-xl-7">
                  <span class="dropdown-item">選択してください</span>
                </li>
                <button
                  type="button"
                  v-on:click="
                    selectChecked = wpTypeL.map((obj) => obj.wpTypeCateName);
                    onChangeInput(selectChecked);
                  "
                  class="btn btn-outline-primary col-12 col-xl-2 false"
                >
                  全チェック
                </button>
                <button
                  type="button"
                  v-on:click="
                    selectChecked = [];
                    onChangeInput(selectChecked);
                  "
                  class="btn btn-outline-primary col-12 col-xl-2"
                >
                  チェックを外す
                </button>
              </div>
            </div>
            <div id="filter-body">
              <div class="row col-12">
                <button
                  type="button"
                  class="btn btn-outline-primary cateToggleBtn col-6"
                >
                  大カテゴリ(未実装)
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary cateToggleBtn col-6"
                >
                  小カテゴリ
                </button>
              </div>
              <div id="catePage1" class="row col-12 catePages">
                <div
                  class="row col-12"
                  v-for="(value, index) in newWpType"
                  :key="index"
                >
                  <div
                    class="dropdown-item col-md-6 col-xl-3"
                    style="vertical-align: middle !important"
                    v-for="(nestValue, nestIndex) in value"
                    :key="nestIndex"
                  >
                    <div class="row col-12">
                      <div class="row col-12">
                        <input
                          type="checkbox"
                          name="wpTypeLCheck"
                          :value="nestValue.wpTypeCateName"
                          class="col-2"
                          v-model="selectChecked"
                          @change="onChangeInput(selectChecked)"
                        />
                        <div class="col-8">{{ nestValue.wpTypeCateName }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div
                class="row col-12 h-100"
                v-for="(value, index) in sliderPro"
                :key="index"
              >
                <span class="col-2 text-nowrap">{{ value.name }}</span>
                <span class="col-1 text-right text-nowrap"
                  >{{ sValue[index][0] }} Min</span
                >
                <vue-slider
                  class="col-6"
                  ref="slider"
                  v-model="sValue[index]"
                  :min="value.min"
                  :max="value.max"
                  @drag-end="sliderChenged(sValue)"
                  :tooltip="'none'"
                ></vue-slider>
                <span class="col-2 text-nowrap"
                  >{{ sValue[index][1] }} Max</span
                >
              </div>
              <div class="row"></div>
              <button
                type="button"
                id="valReset"
                class="btn btn-outline-primary"
                v-on:click="sValue = resetSValue()"
              >
                スライダーリセット
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="page1" class="pages tabcontent" v-show="activetab === 1">
        <table
          id="tbl1"
          class="table table-sm table-bordered nowrap"
          width="100%"
        >
          <thead class="bg-primary text-light">
            <tr>
              <th v-for="value in ths" :key="value">{{ value }}</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div id="page2" class="pages tabcontent" v-show="activetab === 2">
        <p>
          ・改修可能装備の絞り込み(Veuでは未実装)<br />
          ・ステータス絞り込み（Veuでは未実装）<br />

          ・（詳細表示フィルタ）<br />
          ・改修値適用<br />
          与ダメージ（デフォルトは砲撃戦 選択[雷撃戦 夜戦 対潜攻撃]）<br />
          ・最大補正値適用（装備シナジーを除き艦シナジー）<br />
          ・艦載機の対空等意味のないものを外すフィルタ<br />
          ・改修目標入力（今はとりあえず列ごと非表示）<br />
          ・データ保存（AWS）<br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// jQuery
import $ from "jquery";
window.$ = $;
// bootstrap
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// datatables
import "datatables.net-bs4";
import "datatables.net-select-bs4";
import "datatables.net-responsive-bs4";
import "datatables.net-buttons-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css";
import "datatables.net-select-bs4/css/select.bootstrap4.min.css";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";
// モジュール
import columnsSet from "./columnsSettings.js"; // eslint-disable-line
import wpTypeL from "./wpTypeL.js"; // eslint-disable-line
//
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import db from "./wpdb.js";

// テストデータ
import testData from "./test.js"; // eslint-disable-line

var cateButtons = [
  "全て",
  "戦闘機",
  "爆撃機",
  "攻撃機",
  "偵察機",
  "陸戦\r\n陸攻",
  "小口径",
  "中口径",
  "大口径",
  "副砲",
  "魚雷",
  "電探",
  "対潜",
  "強化弾",
  "機銃\r\n高射",
  "機関\r\nバルジ",
  "探照灯",
  "偵察機",
  "瑞雲\r\n回翼",
  "大発",
  "大型飛",
  "その他",
];

var newWpType = sepArrayGen(wpTypeL, 4);
var newCateButtons = sepArrayGen(cateButtons, 12);

// function newWpTypeGen() {
//   var newTmpWpType = [];
//   var tmpType = [];
//   for (let i = 0; i < wpTypeL.length; i++) {
//     tmpType.push(wpTypeL[i]);
//     var tmp = i;
//     if ((tmp + 1) % 4 == 0 || i == wpTypeL.length - 1) {
//       newTmpWpType.push(tmpType);
//       tmpType = [];
//     }
//   }
//   return newTmpWpType;
// }

function sepArrayGen(ArrayObgect, sepNum) {
  var newArray = [];
  var tmpType = [];
  for (let i = 0; i < ArrayObgect.length; i++) {
    tmpType.push(ArrayObgect[i]);
    var tmp = i;
    if ((tmp + 1) % sepNum == 0 || i == ArrayObgect.length - 1) {
      newArray.push(tmpType);
      tmpType = [];
    }
  }
  return newArray;
}

function dbMax(key) {
  return Math.max.apply(
    null,
    db.map(function (o) {
      return o[key];
    })
  );
}
function dbMin(key) {
  return Math.min.apply(
    null,
    db.map(function (o) {
      return o[key];
    })
  );
}
var sliderPro = [
  { col: 3, name: "改修Lv", min: 0, max: 10 },
  { col: 6, name: "火力", min: dbMin("fire"), max: dbMax("fire") },
  { col: 7, name: "雷装", min: dbMin("torpedo"), max: dbMax("torpedo") },
  { col: 8, name: "対空", min: dbMin("aa"), max: dbMax("aa") },
  { col: 9, name: "装甲", min: dbMin("armor"), max: dbMax("armor") },
  { col: 10, name: "対潜", min: dbMin("asw"), max: dbMax("asw") },
  { col: 11, name: "回避", min: dbMin("evasion"), max: dbMax("evasion") },
  { col: 12, name: "索敵", min: dbMin("los"), max: dbMax("los") },
  { col: 13, name: "命中", min: dbMin("accuracy"), max: dbMax("accuracy") },
  { col: 14, name: "爆装", min: dbMin("bombing"), max: dbMax("bombing") },
];

function newsValueGen() {
  var sValueTmp = [];
  for (var i = 0; i < sliderPro.length; i++) {
    sValueTmp[i] = [sliderPro[i].min, sliderPro[i].max];
  }
  return sValueTmp;
}
var newsValue = newsValueGen();

var ths = [
  "ID",
  "装備種別",
  "装備名",
  "改修Lv",
  "目標Lv",
  "アイコン",
  "火力",
  "雷装",
  "対空",
  "装甲",
  "対潜",
  "回避",
  "索敵",
  "命中",
  "爆装",
  "射程",
  "行動範囲",
];

export default {
  data() {
    return {
      columnsSet,
      show_contents: [],
      dataTable: null,
      activetab: 1,
      wpTypeL,
      newWpType,
      selectChecked: wpTypeL.map((obj) => obj.wpTypeCateName),
      ths,
      sValue: newsValue,
      sliderPro,
      testData,
      db,
      startVisivle: true,
      newCateButtons,
      cateButtons,
    };
  },
  components: {
    vueSlider: VueSlider,
  },
  mounted: function () {
    const columnsSettings = columnsSet.columnsSettings;

    //datatables言語設定
    $.extend($.fn.dataTable.defaults, {
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Japanese.json",
      },
    });

    this.dataTable = window.$("#tbl1").DataTable({
      data: JSON.parse(JSON.stringify(testData)),
      responsive: true,
      lengthChange: false,
      displayLength: 500,
      select: true,
      columns: columnsSettings,
    });
    this.dataTable.columns(1).search("^小口径主砲$", true).draw();
  },
  methods: {
    onChangeInput(selectChecked) {
      var searchType = "^" + selectChecked.join("$|^");
      this.dataTable.columns(1).search(searchType, true).draw();
    },
    visivle(startVisivle) {
      this.dataTable
        .columns([6, 7, 8, 9, 10, 11, 12, 13, 14])
        .visible(startVisivle);
      // this.dataTable.columns.adjust().draw( false );
    },
    resetSValue() {
      $.fn.dataTable.ext.search = [];
      this.dataTable.draw();
      return newsValueGen();
    },
    sliderChenged(sValue) {
      $.fn.dataTable.ext.search = [];
      $.fn.dataTable.ext.search.push(function (settings, data) {
        for (var i = 0; i < sValue.length; i++) {
          if (
            sValue[i][0] > parseInt(data[sliderPro[i].col], 10) ||
            parseInt(data[sliderPro[i].col], 10) > sValue[i][1]
          ) {
            return false;
          }
        }
        return true;
      });

      // console.log($.fn.dataTable.ext.search.length);
      /* eslint-disable */
      /* eslint-enable */
      this.dataTable.draw();
    },
  },
};
</script>



<style>
html {
  font-size: 13px;
}

.dataTables_filter {
  display: none;
}

input {
  position: relative;
  top: 3px;
}

table.dataTable thead .sorting::after,
table.dataTable thead .sorting::before,
table.dataTable thead .sorting_asc::after,
table.dataTable thead .sorting_asc::before {
  display: none;
}

table.dataTable.dtr-inline.collapsed.table-sm
  > tbody
  > tr
  > td:first-child:before,
table.dataTable.dtr-inline.collapsed.table-sm
  > tbody
  > tr
  > th:first-child:before {
  top: 11px !important;
}

table.dataTable thead .sorting_desc::after,
table.dataTable thead .sorting_desc::before {
  display: none;
}

table.dataTable thead .sorting {
  background-image: url(https://datatables.net/media/images/sort_both.png);
  background-repeat: no-repeat;
  background-position: center right;
}

table.dataTable thead .sorting_asc {
  background-image: url(https://datatables.net/media/images/sort_asc.png);
  background-repeat: no-repeat;
  background-position: center right;
}

table.dataTable thead .sorting_desc {
  background-image: url(https://datatables.net/media/images/sort_desc.png);
  background-repeat: no-repeat;
  background-position: center right;
}
.modal-footer > * {
  font-size: 15px;
}
.vue-slider-dot-tooltip-inner {
  font-size: 10px;
  white-space: nowrap;
  padding: 0px 7px;
  min-width: 20px;
}
.btn:not(:disabled):not(.disabled) {
  font-size: 12px;
}
.wrap {
  white-space: pre;
}

.btn-outline-info {
  white-space: pre-line;
  min-width: 60px;
  min-height: 50px;
}
</style>
