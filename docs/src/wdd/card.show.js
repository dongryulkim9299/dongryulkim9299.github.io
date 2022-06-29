function floatGarland() {
    $(".floatingBox").addClass("see animated animate__fadeInUp");
    setTimeout(function() {
        $(".floatingBox").toggleClass("hi");
    }, 2000);
}
$(".floatingBox").click(function() {
    $(".bttmGarlandWrapper").removeClass("animate__fadeOutDown");
    $(".bttmGarlandWrapper").addClass("see animated animate__fadeInUp");
});
$(".bttmGarlandWrapper .close").click(function() {
    $(".bttmGarlandWrapper").addClass("animate__fadeOutDown");
});

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function bgmAniFunc() {
    $('.anibox2').addClass("hd").viewportChecker({
        classToAdd: 'visible animated fadeInDown ',
        offset: 0,
        callbackFunction: function(elem, action) {
            setTimeout(function() {
                $(".bgmbar").addClass("fadeBg");
            }, 2500);
        }
    });
    var videocontrol = document.getElementById("videoplay");
    if (!videocontrol.paused) {
        $(".bgmbar .sound").find("i.fa").removeClass("fa-volume-off");
        $(".bgmbar .sound").find("i.fa").addClass("fa-volume-up");
    }
}

function splashAniFunc(isBgm, isGarland) {
    var typingBool = false;
    var typingIdx = 0;
    var typingTxt = $(".typing-txt").text();
    typingTxt = typingTxt.split("");
    $(typingTxt).each(function(idx, val) {
        if (val == '️') {
            typingTxt.splice(idx, 1);
        }
    });
    if (typingBool == false) {
        typingBool = true;
        var tyInt = setInterval(typing, 90);
    }

    function typing() {
        if (typingIdx < typingTxt.length) {
            $(".typing").append(typingTxt[typingIdx]);
            typingIdx++;
        } else {
            clearInterval(tyInt);
        }
    }
    setTimeout(function() {
        $(".splash").addClass("animate__animated animate__fadeOut");
        setTimeout(function() {
            if (isBgm) {
                bgmAniFunc();
            }
            $(".splash").detach();
            if (isGarland) {
                floatGarland();
            };
        }, 1000);
    }, 2200);
}

function openAcctBox(i) {
    $("#acctBox .grp").text($(i).attr("data-group"));
    $("#acctBox .ment").html($(i).attr("data-bank") + "<br/>" + $(i).attr("data-number") + "<br/>" + $(i).attr("data-name"));
    $("#copytext").val($(i).attr("data-number"));
    $("#acctBox").css("display", "block");
}

function closeAcctBox() {
    $("#acctBox").css("display", "none");
}

function copy_to_clipboard(txtId) {
    var copytxt = $("#" + txtId).val();
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = copytxt;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사가 완료되었습니다.");
}

function copy_to_clipboard2(txtId) {
    var copytxt = $("#" + txtId).val();
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = copytxt;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사가 완료되었습니다.");
}

function remove_focus_clipboard() {
    var sel = window.getSelection ? window.getSelection() : document.selection;
    if (sel) {
        if (sel.removeAllRanges) {
            sel.removeAllRanges();
        } else if (sel.empty) {
            sel.empty();
        }
    }
}

function searchDirCoord(x, y) {
    var point = new naver.maps.Point(x, y);
    NAVER_MAP = new naver.maps.Map("map", {
        center: point,
        zoom: 16,
        mapTypeControl: false,
        anchorSkew: true
    });
    marker = new naver.maps.Marker({
        position: point,
        map: NAVER_MAP
    });
}

function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({
        query: address
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return;
        }
        if (response.v2.meta.totalCount === 0) {
            return;
        }
        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);
        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }
        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }
        if (item.englishAddress) {
            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }
        NAVER_MAP = new naver.maps.Map("map", {
            center: point,
            zoom: 16,
            mapTypeControl: false,
            anchorSkew: true
        });
        marker = new naver.maps.Marker({
            position: point,
            map: NAVER_MAP
        });
    });
}