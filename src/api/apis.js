import axios from 'axios'

//IP
const IP = 'http://127.0.0.1:5000'

// 请求基本路径 
axios.defaults.baseURL = IP

//图片下载路径
export const img_download = IP + '/upload/imgs/goods_img/';
export const shop_download = IP + '/upload/shop/';


/* ☆账号管理模块 */
//1.登录
export const login = (account, password) => axios.post('/users/checkLogin', {
    account,
    password
})

//2.添加账号
export const accadd = (account, password, userGroup) => axios.post('/users/add', {
    account,
    password,
    userGroup
})

//3.获取账户列表
export const acclist = (currentPage, pageSize) => axios.get('/users/list', {
    params: {
        currentPage,
        pageSize,
    }
})

//4.删除账号
export const accdel = (id) => axios.get('/users/del', {
    params: {
        id,
    }
})

//5.批量删除账号
export const accclear = (ids) => axios.get('/users/batchdel', {
    params: {
        ids,
    }
})

//6.修改账号
export const accreplace = (id, account, userGroup) => axios.post('/users/edit', {
    id,
    account,
    userGroup,
})

//7.检查旧密码正确
export const accoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', {
    params: {
        oldPwd,
        id,
    }
})

//8.修改密码
export const accnewpwd = (newPwd, id) => axios.post('/users/editpwd', {
    newPwd,
    id,
})

//9.获取账号（个人中心）信息
export const accinfo = (id) => axios.get('/users/accountinfo', {
    params: {
        id,
    }
})

//10.商品图片上传
export const acc_upload = IP + '/users/avatar_upload';

//11.toke接口
export const checktoken = (token) => axios.get('/users/checktoken', {
    params: {
        token,
    }
})


/* ☆商品管理模块 */
//12.添加分类
export const shopadd = (cateName, state) => axios.post('/goods/addcate', {
    cateName,
    state,
})

//13.获取分类
export const shoplist = (currentPage, pageSize) => axios.get('/goods/catelist', {
    params: {
        currentPage,
        pageSize,
    }
})

//14.删除分类
export const shopdel = (id) => axios.get('/goods/delcate', {
    params: {
        id,
    }
})

//15.修改分类
export const shopreplace = (id, cateName, state) => axios.post('/goods/editcate', {
    id,
    cateName,
    state,
})

//16.查询所有分类名称
export const goodsalllist = () => axios.get('/goods/categories', {
    params: {}
})

//17.商品图片上传
export const img_upload = IP + '/goods/goods_img_upload';

//18.添加商品
export const goodsadd = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', {
    name,
    category,
    price,
    imgUrl,
    goodsDesc,
})

//19.获取商品列表
export const goodslist = (currentPage, pageSize) => axios.get('/goods/list', {
    params: {
        currentPage,
        pageSize,
    }

})

//20.删除商品
export const goodsdel = (id, code, msg) => axios.get('/goods/del', {
    params: {
        id,
        code,
        msg,
    }
})

//21.修改商品
export const goodsreplace = (name, category, price, imgUrl, goodsDesc, id) => axios.post('/goods/edit', {
    name,
    category,
    price,
    imgUrl,
    goodsDesc,
    id,
})

/* ☆订单管理模块 */
//22.获取订单列表(带查询功能)
export const orderlist = (currentPage, pageSize, orderNo, consignee, phone, orderState, date ) => axios.get('/order/list', {
    params: {
        currentPage,
        pageSize,
        orderNo,
        consignee,
        phone,
        orderState,
        date,
    }
})

//23.查询
/* export const ordersearch = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', {
    params: {
        currentPage,
        pageSize,
        orderNo,
        consignee,
        phone,
        orderState,
        date,
    }
}) */

//24.获取订单详情
export const orderdetail = (id) => axios.get('/order/detail', {
    params: {
        id,
    }
})

//25.修改订单
export const orderedit = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post('/order/edit', {
    id,
    orderNo,
    orderTime,
    phone,
    consignee,
    deliverAddress,
    deliveryTime,
    remarks,
    orderAmount,
    orderState,
})


/* ☆店铺管理模块 */
//26.获取店铺详情
export const shopinfo = () => axios.get('/shop/info', {
    params: {}
})

//27.店铺图片上传接口
export const shop_upload = IP + '/shop/upload';

//28.店铺内容修改
export const shopedit = (id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics) => axios.post('/shop/edit', {
    id,
    name,
    bulletin,
    avatar,
    deliveryPrice,
    deliveryTime,
    description,
    score,
    sellCount,
    supports,
    date,
    pics,
})

/* ☆报表统计 */
//29.首页报表接口
export const totaldata = () => axios.get('/order/totaldata', {
    params: {}
})

//30.订单报表接口
export const ordertotal = (date) => axios.get('/order/ordertotal', {
    params: {
        date,
    }
})