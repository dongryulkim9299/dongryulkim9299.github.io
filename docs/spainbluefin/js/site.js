const dateEditor = function (cell, onRendered, success, cancel) {
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = moment(cell.getValue(), "DD/MM/YYYY").format("YYYY-MM-DD"),
        input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function () {
        input.focus();
        input.style.height = "100%";
    });

    function onChange() {
        if (input.value != cellValue) {
            success(moment(input.value, "YYYY-MM-DD").format("DD/MM/YYYY"));
        } else {
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            onChange();
        }

        if (e.keyCode == 27) {
            cancel();
        }
    });

    return input;
};

var callFunc = null;
const popupDiv = function (target, url, modal, width, height, rtnFunc, buttons, params) {
    if (!buttons) {
        buttons = [
            {
                  text: "Close"
                , icon: "ui-icon-close"
                , click: function () {
                    $(this).dialog("close");
                }
            }
        ];
    }

    let fnDialog = $(target).data('params', params).dialog({
        autoOpen: false
        , modal: modal
        , width: width
        , height: height
        , resizable: true
        , title : ''
        , buttons: buttons
        , open: function (event, ui) {
            callFunc = rtnFunc;
        }
        , close: function (event, ui) {
        }
    });

    fnDialog.load(url).dialog('open');

    return;
};

var callFunc2 = null;
const popupDiv2 = function (target, url, modal, width, height, rtnFunc, buttons, params) {
    if (!buttons) {
        buttons = [
            {
                text: "Close"
                , icon: "ui-icon-close"
                , click: function () {
                    $(this).dialog("close");
                }
            }
        ];
    }

    const fnDialog = $(target).data('params', params).dialog({
        autoOpen: false
        , modal: modal
        , width: width
        , height: height
        , resizable: true
        , title: ''
        , buttons: buttons
        , open: function (event, ui) {
            callFunc2 = rtnFunc;
        }
        , close: function (event, ui) {
        }
    });

    fnDialog.load(url).dialog('open');

    return;
};


const popupOrder = function (target, url, rtnFunc, params) {

    const fnPop = $(target).data('params', params).dialog({
        autoOpen: false
        , modal: false
        , resizable: false
        , width: 0
        , height: 0
        , minWidth: 0
        , minHeight: 0
        , position: {
            my: "left bottom",
            at: "left bottom",
            collision: "none"
        }
        , open: function (event, ui) {
            callFunc = rtnFunc;
        }
    });

    fnPop.load(url).dialog('open');

    return;
};

/*
message : Display message (String)
confirm : Confirm? (true/false)
callFunc : call Function
*/
var popupMsg = function (message, confirm, callFunc) {
    let buttons = null;
    if (isEmpty(confirm)) {
        buttons = [
            {
                text: "OK"
                , icon: "ui-icon-close"
                , click: function () {
                    $(this).dialog("close");
                }
            }
        ];
    } else {
        buttons = [
            {
                text: "Yes" //"Submit"
                , icon: "ui-icon-disk"
                , click: function () {
                    if (!isEmpty(callFunc)) {
                        callFunc();
                    }
                    $(this).dialog("close");
                }
            }
            , {
                text: "No" //"Cancel"
                , icon: "ui-icon-cancel"
                , click: function () {
                    $(this).dialog("close");
                }
            }
        ];
    }

    $('#dialog-message').find("#divMessage").html(message);
    $('#dialog-message').dialog({
        modal: true
        , buttons: buttons
        , width: 500
    });

    return;
};

//RequireHeader("Code ID")
var RequireHeader = function (title) {
    var label = "<i class='fas fa-asterisk' style='color:#ff6a00;height:2px;font-size:2px;margin-right:3px;'></i>";
    label += title;

    return label;
};

//formatter:printIcon,
var printIcon = function (cell, formatterParams, onRendered) { //plain text value
    return "<i class='fa fa-print'></i>";
};

var searchIcon = function (cell, formatterParams, onRendered) { //plain text value
    return "<i class='fa fa-search'></i>";
};

var noteIcon = function (cell, formatterParams, onRendered) { //plain text value
    return "<i class='far fa-edit'></i>";
};

var isEmpty = function (str) {
    if (typeof str == "undefined" || str == null || str == "") {
        return true;
    } else {
        return false;
    }
}

var nvl = function (str, defaultStr) {
    if (typeof str == "undefined" || str == null || str == "")
        str = defaultStr;

    return str;
}

function isNumeric(num, opt) {
    // 좌우 trim(공백제거)을 해준다.
    num = String(num).replace(/^\s+|\s+$/g, "");

    if (typeof opt == "undefined" || opt == "1") {
        // 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
        var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
    } else if (opt == "2") {
        // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
        var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
    } else if (opt == "3") {
        // 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
        var regex = /^[0-9]+(\.[0-9]+)?$/g;
    } else {
        // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
        var regex = /^[0-9]$/g;
    }

    if (regex.test(num)) {
        num = num.replace(/,/g, "");
        return isNaN(num) ? false : true;
    } else { return false; }
}

function to_date2(date_str) {
    //MM/DD/YYYY
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(6, 10);
    var sMonth = yyyyMMdd.substring(0, 2);
    var sDate = yyyyMMdd.substring(3, 5);

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

function WithCommas(num) {
    var parts = num.toString().split("."); return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

    return parts;
}

function RemoveCommas(str) {
    n = parseFloat(nvl(str,0).toString().replace(/,/g, ""));
    return n;
}