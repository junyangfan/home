/*
作者: 俊阳
主页：https://fanjunyang.zone/
GitHub：https://github.com/junyangfan
版权所有，请勿删除
*/

// 背景图片 Cookies 
function setBgImg(bg_img) {
    if (bg_img) {
        localStorage && localStorage.setItem('jy_home_bg', JSON.stringify(bg_img));
        return true;
    }
    return false;
};

// 获取背景图片 Cookies
function getBgImg() {
    if (localStorage && localStorage.getItem('jy_home_bg')) {
        return JSON.parse(localStorage.getItem('jy_home_bg'));
    }
    setBgImg(bg_img_perInstall);
    return bg_img_perInstall;
}

let bg_img_perInstall = {
    "type": "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
    "2": "https://api.dujin.org/bing/1920.php", // 每日一图
    "3": "https://api.ixiaowai.cn/gqapi/gqapi.php", // 随机风景
    "4": "https://api.ixiaowai.cn/api/api.php" // 随机动漫
};

// 更改背景图片
function setBgImgInit() {
    let bg_img = getBgImg();
    $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

    switch (bg_img["type"]) {
        case "1":
            $('#bg').attr('src', `https://resource.fanjunyang.zone/home-nav-background${1 + ~~(Math.random() * 10)}.webp?imageMogr2/format/webp/interlace/1/rquality/80`) //随机默认壁纸
            break;
        case "2":
            $('#bg').attr('src', bg_img_perInstall[2]); //必应每日
            break;
        case "3":
            $('#bg').attr('src', bg_img_perInstall[3]); //随机风景
            break;
        case "4":
            $('#bg').attr('src', bg_img_perInstall[4]); //随机动漫
            break;
    }
};

$(document).ready(function () {
    // 壁纸数据加载
    setBgImgInit();
    // 设置背景图片
    $("#wallpaper").on("click", ".set-wallpaper", function () {
        let type = $(this).val();
        let bg_img = getBgImg();
        bg_img["type"] = type;
        iziToast.show({
            icon: "fa-solid fa-image",
            timeout: 2500,
            message: '壁纸设置成功，刷新后生效',
        });
        setBgImg(bg_img);
    });
});