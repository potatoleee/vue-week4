export default {
    props : ['tempData'],
    template:`
    <div id="deleteProductModal"  class="modal fade " tabindex="-1"
    aria-labelledby="deleteProductModalLabel" aria-hidden="true" ref="deleteProductModal">
 <div class="modal-dialog">
   <div class="modal-content border-0">
     <div class="modal-header bg-danger text-white">
       <h5 id="deleteProductModalLabel" class="modal-title">
         <span>刪除產品</span>
       </h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div class="modal-body">
       是否刪除
       <strong class="text-danger" >{{tempData.title}}</strong> 商品(刪除後將無法恢復)。
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
         取消
       </button>
       <button type="button" class="btn btn-danger" @click="deleteProduct">
         確認刪除
       </button>
     </div>
   </div>
 </div>
</div>`,
    data() {
      return {
        deleteProductModal: ''
      }
    },
    methods: {
      deleteProduct() {
        axios.delete(`${api_url}/api/${api_path}/admin/product/${this.tempData.id}`)
            .then(res => {
              this.deleteProductModal.hide();
                this.$emit('update')
                // this.getProductList();
                alert("刪除成功");
            })
            .catch(error => {
                alert(error.response.data.message);
            })
      },
      show(){
        this.deleteProduct.show()
      },
      hide(){
        this.deleteProduct.hide()
      }
    },
    mounted() {
       this.deleteProductModal = new bootstrap.Modal(this.$refs.deleteProductModal)
        // deleteProductModal = new bootstrap.Modal(document.querySelector("#deleteProductModal"));//實體化
    }
}