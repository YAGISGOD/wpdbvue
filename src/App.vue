<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <button
          type="button"
          v-on:click="activetab = 1"
          v-bind:class="[activetab === 1 ? 'active' : '']"
          id="dataBtn"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          データ表示
        </button>
        <button
          type="button"
          v-on:click="activetab = 2"
          v-bind:class="[activetab === 2 ? 'active' : '']"
          id="inputBtn"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          データ入力
        </button>
        <button
          type="button"
          v-on:click="activetab = 3"
          v-bind:class="[activetab === 3 ? 'active' : '']"
          id="memoBtn"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          メモ
        </button>
        <div class="col-md-6 col-xl-1"></div>
        <button
          type="button"
          id="modalBtn"
          class="btn btn btn-success col-md-6 col-xl-1"
          data-toggle="modal"
          data-target="#filter-content"
        >
          絞り込み
        </button>
        <button
          type="button"
          id="testBtn"
          class="btn btn-warning col-xl-2 col-md-6 ml-auto"
        >
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
                  id="AllCheck"
                  class="btn btn-outline-primary col-12 col-xl-2 false"
                >
                  全チェック
                </button>
                <button
                  type="button"
                  id="AllNoCheck"
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
                  id="LcateBtn"
                  class="btn btn-outline-primary cateToggleBtn col-6"
                >
                  大カテゴリ(未実装)
                </button>
                <button
                  type="button"
                  id="ScateBtn"
                  class="btn btn-outline-primary cateToggleBtn col-6"
                >
                  小カテゴリ
                </button>
              </div>
              <div id="catePage1" class="row col-12 catePages">
                <div class="row col-12" v-for="index in newWpType" :key="index">
                   <div
                    class="dropdown-item col-md-6 col-xl-3"
                    style="vertical-align: middle !important"
                    v-for="value in index"
                    :key="value"
                  >
                    <div class="row col-12">
                      <div class="row col-12">
                        <input
                          type="checkbox"
                          name="wpTypeLCheck"
                          :value="value.wpTypeCateName"
                          checked="checked"
                          class="col-2"
                        />
                        <div class="col-8">{{ value.wpTypeCateName }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
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
              <th>ID</th>
              <th>装備種別</th>
              <th>装備名</th>
              <th>改修Lv</th>
              <th>目標Lv</th>
              <th>アイコン</th>
              <th>火力</th>
              <th>雷装</th>
              <th>対空</th>
              <th>装甲</th>
              <th>対潜</th>
              <th>回避</th>
              <th>索敵</th>
              <th>命中</th>
              <th>爆装</th>
              <th>射程</th>
              <th>行動範囲</th>
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
          ・改修可能装備の絞り込み<br />
          ・ステータス絞り込み（機能だけは実装済み）<br />
          ・改修目標入力（今はとりあえず列ごと非表示）<br />
          ・データ保存（ここの実装がちょっと見えない）<br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import wpTypeL from "./wpTypeL.js"; // eslint-disable-line

// import HelloWorld from './components/HelloWorld.vue'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// }

var newWpType = a();

function a() {
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

export default {
  data() {
    return {
      activetab: 1,
      newWpType,
    };
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
</style>
