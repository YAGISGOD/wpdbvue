import wpdb from './wpdb.js'
const db = wpdb.db
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
        width: "50px"
    },
    {
        data: null,
        visible: false,
        render: function (data) { return "" },// eslint-disable-line
        width: "50px"
    },
    {
        data: "api_slotitem_id",
        visible: false,
        render: function (data) { return db.find((v) => v.wpId === data.toString()).iconId },
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
];
export default { columnsSettings }