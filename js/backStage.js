
import pagination from "./pagination.js";
import productModal from "./newOrEditModal.js";
import deleteModal from "./deleteModal.js";
import uploadImage from "./uploadImage.js";



// var myModal = new bootstrap.Modal(editProductModal);//實體化
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            //產品資料
            products:[],
            page:{},
            isNew : false,//判斷是否為新增or編輯
            tempData:{
                "imagesUrl":[],
                "flavor":"",
            },
    
        }
    },
    methods: {
        //登入驗證
        checkAdmin() {
            axios.post(`${api_url}/api/user/check`)
                .then(res => {
                    //使用此api後驗證後再取得資料
                    this.getProductList();
                })
                .catch(error => {
                    alert("請先登入帳號密碼喔～不要偷懶(ゝ∀･)b 感謝你！")
                    location.href = "index.html";
                })
        },
        //取得產品列表
        getProductList( page = 1 ) {
            axios.get(`${api_url}/api/${api_path}/admin/products/?page=${page}`)
                .then(res => {
                    this.page = res.data.pagination;
                    this.products = res.data.products;
                })
                .catch(error => {
                    alert(error.response.data.message);
                })
        },
        //確認開啟的modal類別
        openModal(state, product) {
            if(state === 'new'  ){
                this.tempData = {
                    "imagesUrl":[]
                };
                this.$refs.editProductModal.show();
                this.isNew = true;
            }else if(state === 'edit'){
                this.$refs.editProductModal.show();
                this.tempData = {...product};
                this.isNew = false;
            } else if (state === 'delete'){
                this.$refs.deleteProductModal.show();
                this.tempData = {...product};
                this.isNew = false;
            }
        },     
        //上傳圖片API
        // upload(event) {
        //     // 取得上傳的檔案
        //     const file = event.target.files[0];
            
        //     /* 限制檔案上傳型別 */
        //     let fileType = file.name.substring(file.name.lastIndexOf('.') + 1);   /* 得到檔案字尾名 */
        //     if (fileType !== 'jpg' && fileType !== 'JPG' && fileType !== 'png') {
        //         alert("上傳檔案只能是 jpg、png 格式!，請注意格式上傳呦");
        //         return;
        //     }
        //     const formData = new FormData();
        //     formData.append('file-to-upload', file)
        
        //     axios.post(`${api_url}/api/${api_path}/admin/upload`,formData)
        //       .then((res) => {
        //         // console.log("上傳圖片網址", res.data.imageUrl);
        //         this.uploadImages = res.data.imageUrl;
        //         alert("圖片上傳成功");
        //       })
        //       .catch((err) => {
        //         alert(err.response.data.message);
        //       })
        
        // }
    },
    //區域註冊
    components: {
        pagination,productModal,deleteModal,uploadImage
    },
    mounted() { 
        //取出Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)week2HexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();        
    },
})


app.mount('#app');