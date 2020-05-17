import Vue from 'vue'
import Router from 'vue-router'
import shopCart from "./components/shopCart";

const Discovery = () => import('@/page/discovery')
const PlaylistDetail = () => import('@/page/playlist-detail')
const Playlists = () => import('@/page/playlists')
const Songs = () => import('@/page/songs')
const Search = () => import('@/page/search')
const SearchSongs = () => import('@/page/search/songs')
const SearchPlaylists = () => import('@/page/search/playlists')
const SearchMvs = () => import('@/page/search/mvs')

const Mvs = () => import('@/page/mvs')
const Mv = () => import('@/page/mv')
const Goods = () => import('@/page/goods')
const GoodDec = () => import('./components/goodDec.vue');
const HotGoods = () => import('./components/hotGoods.vue');
const IpPeriphery = () => import('./components/ipPeriphery.vue');
const ShopCart = () => import('./components/shopCart.vue');
const Register = () => import('./components/register.vue');
const MyOrder = () => import('./components/myOrder.vue');
const MyAddress = () => import('./components/myAddress.vue');
const OrderCheck = () => import('@/page/goods/orderCheck.vue');

// 内容需要居中的页面
export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']

// 需要显示在侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: 'music',
    },
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists,
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu',
    },
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs,
    meta: {
      title: '最新音乐',
      icon: 'yinyue',
    },
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: {
      title: '最新MV',
      icon: 'mv',
    },
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods,
    meta: {
      title: '云音乐商城',
      icon: 'el-icon-goods',
    },
  },
]

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/discovery',
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlaylistDetail,
    },
    {
      path: '/search/:keywords',
      name: 'search',
      component: Search,
      props: true,
      children: [
        {
          path: '/',
          redirect: 'songs',
        },
        {
          path: 'songs',
          name: 'searchSongs',
          component: SearchSongs,
        },
        {
          path: 'playlists',
          name: 'searchPlaylists',
          component: SearchPlaylists,
        },
        {
          path: 'mvs',
          name: 'searchMvs',
          component: SearchMvs,
        },
      ],
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: Mv,
      props: (route) => ({ id: route.params.id }),
    },
    {
      path: '/goods/goodDec/:id',
      name: 'goodDec',
      component: GoodDec,
      // props: (route) => ({id: route.params.id}),
    },
    {
      path: '/goods/hotGoods',
      name: 'hotGoods',
      component: HotGoods,
    },
    {
      path: '/goods/ipPeriphery',
      name: 'ipPeriphery',
      component: IpPeriphery,
    },
    {
      path: '/goods/shopCart',
      name: 'shopCart',
      component: ShopCart
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: MyOrder
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: MyAddress
    },
    {
      path: '/goods/order',
      name: 'orderCheck',
      component: OrderCheck
    },
    ...menuRoutes,
  ],
})
