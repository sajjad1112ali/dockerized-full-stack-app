import hellowWorld from "./components/HelloWorld.vue";
import showProducts from "./components/products/show.vue";
import addProducts from "./components/admin/add.vue";
import showSingle from "./components/products/showSingle.vue";
import Login from "./components/admin/login.vue";
import Dashboard from "./components/admin/dashboard.vue";
import loadMoreComponent from "./components/products/loadMoreComponent.vue";
import EditProducts from "./components/admin/edit.vue";
import uploadImage from "./components/admin/uploadImage.vue";


export default [
    { path: '/', component: showProducts, name: "home"},
    { path: '/add', component: addProducts, name: "addProduct"},
    { path: '/product/:id', component: showSingle, name: "singleProduct"},
    { path: '/admin/login', component: Login, name: "login"},
    { path: '/admin/dashboard', component: Dashboard, name: "dashboard"},
    { path: '/loadmore', component: loadMoreComponent, name: "loadMoreComponent"},
    { path: '/admin/edit/:id', component: EditProducts, name: "editProduct"},
    { path: '/upload', component: uploadImage, name: "uploadImage"},
    
];