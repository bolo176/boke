// 这个文件是我自己封装的数据请求文件,该项目所有的数据请求都在这个文件中实现
import axios from "axios"



// 开发的时候使用本地代理接口
var baseUrl ="/myShop"

// 打包发布的时候使用真实的接口路径
// var baseUrl ="http:127.0.0.1:1024/api"



// 封装一个通用的get请求函数

function ajax_get(url, params = {}) {
    return new Promise(resolve => {
        axios.get(url, { params }).then(r => {
            resolve(r.data)
        })
    })
}


var getBanner = () => ajax_get(baseUrl+"/banner")
var getGoodList = data => ajax_get(baseUrl+"/goodList", data)
var getLogin= data=>ajax_get(baseUrl+"/login", data)

// 获取个护等27条列表名
var getTypeOner = () => ajax_get(baseUrl+"/getTypeOne")


// 获取个护保健等列表内的数据
var getTypeList = () => ajax_get(baseUrl+"/goodList",data)

// 获取注册页面的信息
var getrRegister = data => ajax_get(baseUrl+"/register",data)


// 获取搜索页面的信息
var getSearch = data => ajax_get(baseUrl+"/search", data)

var getDetail = data => ajax_get(baseUrl+"/detail", data)

// 同店推荐商品
var getsameList = data => ajax_get(baseUrl+"/sameList", data)

// 获取购物车信息
var getShopList = data => ajax_get(baseUrl+"/shopList", data)

// 获取购物车添加信息
var getAdd = data => ajax_get(baseUrl+"/add", data)

// 删除购物车指定商品
var getDel = data => ajax_get(baseUrl+"/del", data)

// 减少购物车指定商品
var getRemove = data => ajax_get(baseUrl+"/remove", data)

// 按需导出一个对象
export {
    getBanner,
    getGoodList,
    getLogin,
    getTypeOner,
    getTypeList,
    getrRegister,
    getSearch,
    getDetail,
    getsameList,
    getShopList,
    getAdd,
    getDel,
    getRemove
   
}