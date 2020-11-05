import db from './wpdb.js'
const columnsSettings = [
    {
        data: "api_slotitem_id",
        width: "10px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).typeName },
        width: "150px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).wpName },
        width: "300px"
    },
    {
        data: "api_level",
        visible: false,
        width: "50px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },// eslint-disable-line
        width: "50px"
    },
    {
        data: "api_slotitem_id",
        visible: false,
        render: function (data) { return db.find((v) => v.wpId === data.toString()).icon },
        width: "50px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).fire },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).torpedo },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).aa },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).armor },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).asw },
        width: "28px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },
        width: "28px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },
        width: "28px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },
        width: "28px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        visible: false,
        render: function (data) { 
            return parseInt((db.find((v) => v.wpId === data.toString()).fire),10) + parseInt((db.find((v) => v.wpId === data.toString()).torpedo),10) },
        width: "28px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },
        width: "28px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },
        width: "28px"
    },
    {
        data: null,
        visible: false,
        render: function () { return "" },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).evasion },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).los },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).accuracy },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).bombing },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).range },
        width: "28px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).radius },
        width: "250px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).Improvement },
        width: "250px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { return db.find((v) => v.wpId === data.toString()).Bonus },
        width: "250px"
    },
    {
        data: "api_slotitem_id",
        render: function (data) { 
            return '<a href="https://wikiwiki.jp/kancolle/' + encodeURI(db.find((v) => v.wpId === data.toString()).wikiName) + '" target="_blank" rel="noopener">wiki</a>' },
        width: "250px"
    },
];
export default { columnsSettings }