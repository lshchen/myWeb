var BASE_URL = "http://cinema.api.xinglongdayuan.com/";  //开发
// var BASE_URL = "https://cinema.xlgoo.net/"; //正式
// var BASE_URL = "http://10.5.60.100/capi/frontend/web/"; //本地

/**
 * 获取url公共方法
 */
function getUrl(key) {
    var returnurl = "";
    for (var i = 0; i < requestArray.length; i++) {
        if (requestArray[i].key == key) {
            returnurl = BASE_URL + requestArray[i].url;
        }
    }
    return returnurl;
}

/**
 * 接口
 */
var requestArray = [
    { key: "query-film-info", url: "index.php?r=index/query-film-info" }, //主页在售影片信息
    { key: "slide", url: "index.php?r=site/slide" }, //轮播图 
    { key: "query-plan-info", url: "index.php?r=index/query-plan-info" }, //影片排期
    { key: "query-plan-seat", url: "index.php?r=index/query-plan-seat" }, //选座
    { key: "lock-seat", url: "index.php?r=pay/lock-seat" }, //锁座
    { key: "release-seat", url: "index.php?r=pay/release-seat" }, //解锁座位  
    { key: "app-login", url: "index.php?r=site/app-login" }, //快捷登录
    { key: "get-captcha", url: "index.php?r=site/get-captcha" }, //发送验证码
    { key: "captcha-login", url: "index.php?r=site/captcha-login" }, //手机号验证码登录 
    { key: "login", url: "index.php?r=site/login" }, //验证是否登录
    { key: "index", url: "index.php?r=pay/index" }, //下单 order_type:1=>纯影票 2=>卖品 4=>影片+卖品
    { key: "create-qrcode", url: "index.php?r=pay/create-qrcode" }, //生成二维码
    { key: "film-detail", url: "index.php?r=order-goods/film-detail" }, //核销页影片详情 
    { key: "order-goods/index-v2", url: "index.php?r=order-goods/index-v2" }, //订单列表（影票+卖品）
    { key: "notify", url: "index.php?r=notify/notify" }, //下单通知地址
    { key: "shop/index", url: "index.php?r=shop/index" }, //店铺列表
    { key: "wx-query-order", url: "index.php?r=pay/wx-query-order" }, //查询支付结果
    { key: "get-bylocation", url: "index.php?r=shop/get-bylocation" }, //经纬度查询最近店铺
    { key: "cinema-info", url: "index.php?r=shop/cinema-info" }, //影院信息
    { key: "query-merchandise", url: "index.php?r=order-goods/query-merchandise" }, //卖品列表
    { key: "unpaid/index", url: "index.php?r=order/index" },
    { key: "index/count-down", url: "index.php?r=index/count-down" }, // 用户锁座或创建卖品后 倒计时
    { key: "wx-pay", url: "index.php/index.php?r=pay/wx-pay" }, //确认支付
    { key: "send-coupons", url: "index.php?r=coupon/send-coupons" }, //微信领券
    { key: "coupon-list", url: "index.php?r=coupon/coupon-list" }, //微信券列表
    { key: "shop-banner", url: "index.php?r=shop/shop-banner" }, //卖品轮播图
    { key: "order-hints", url: "index.php?r=pay/order-hints" }, //订单提示
    { key: "pay-type", url: "index.php?r=pay/pay-type" }, //支付方式
    { key: "member-card/me", url: "index.php?r=member-card/me" }, //我的优惠券数量
    { key: "mer-order-detail", url: "index.php?r=order-goods/mer-order-detail" }, //卖品核销信息
    { key: "pay/refund", url: "index.php?r=pay/refund" }, //卖品核销信息
    { key: "query-member-info", url: "index.php?r=member-card/query-member-info" }, //辰星卡会员
    { key: "member-consume-v2p0", url: "index.php?r=member-card/member-consume-v2p0" }, //辰星卡支付
]

module.exports = {
    getUrl: getUrl
}
