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
          データ入力
        </button>
        <button
          type="button"
          v-on:click="activetab = 3"
          v-bind:class="[activetab === 3 ? 'active' : '']"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          メモ
        </button>
        <div class="col-md-6 col-xl-1"></div>
        <button
          type="button"
          class="btn btn btn-success col-md-6 col-xl-1"
          data-toggle="modal"
          data-target="#filter-content"
        >
          絞り込み
        </button>
        <button type="button" class="btn btn-warning col-xl-2 col-md-6 ml-auto">
          テストデータ入力
        </button>
      </div>

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
              <div class="row col-12">
                <vue-slider
                  class="col-12"
                  ref="slider"
                  v-model="sValue"
                  :min="0"
                  :max="50"
                  @drag-end="sliderChenged(sValue)"
                ></vue-slider>
              </div>
              <div class="row"></div>
              <button
                type="button"
                id="valReset"
                class="btn btn-outline-primary"
              >
                数値リセット
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
        <hr />
        艦隊分析ページの装備用コードを下のテキストフィールドに入力して反映を押す<br />
        <button type="button" id="putBtn" class="btn btn-outline-primary">
          反映</button
        ><br /><br />
        <textarea name="data" id="jsonData" cols="100" rows="20"></textarea>
      </div>
      <div id="page3" class="pages tabcontent" v-show="activetab === 3">
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

import numberRangeRegexp from "./numberRangeRegexp.js";

// テストデータ
import testData from "./test.js"; // eslint-disable-line

var newWpType = newWpTypeGen();

function newWpTypeGen() {
  var newTmpWpType = [];
  var tmpType = [];
  for (let i = 0; i < wpTypeL.length; i++) {
    tmpType.push(wpTypeL[i]);
    var tmp = i;
    if ((tmp + 1) % 4 == 0 || i == wpTypeL.length - 1) {
      newTmpWpType.push(tmpType);
      tmpType = [];
    }
  }
  return newTmpWpType;
}

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
      sValue: [0, 30],
    };
  },
  components: {
    vueSlider: VueSlider,
  },
  // props: ['sdef'],
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
      displayLength: 50,
      select: true,
      columns: columnsSettings,
    });
  },
  methods: {
    onChangeInput(selectChecked) {
      var searchType = "^" + selectChecked.join("$|^");
      this.dataTable.columns(1).search(searchType, true).draw();
    },
    sliderChenged(sValue) {
      this.dataTable
        .columns(6)
        .search(
          "^" + numberRangeRegexp(sValue[0], sValue[1], false) + "$",
          true
        )
        .draw();
    },
  },
};
// //スライダー操作時の挙動
// $('.modal-footer').click(function () {
//     for (var i = 0; i < sliderPro.length; i++) {
//         max = parseInt(sliders[i]._state.value[1]);
//         min = parseInt(sliders[i]._state.value[0]);
//         dt.columns(sliderPro[i].col).search('^' + numberRangeRegexp(min, max, false) + '$', true).draw();
//     }
// });
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
</style>
