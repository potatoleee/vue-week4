export default {
    template: `
    <div class="container mt-4">
      <h2>圖片上傳區</h2>
      <label for="file" class="mb-2">圖片檔案僅接受 jpg、png 格式，感謝配合～</label>
      <input type="file" class="form-control mb-2" id="file" placeholder="請輸入圖片連結" @change="upload" />
      <a :href="uploadImages" target="_blank">上傳的圖片連結</a>
      <p class="break-word">
        {{uploadImages}}
      </p>
    </div>`,
    data() {
        return {
            uploadImages : "",
        }
    },
    methods: {
        upload(event) {
            // 取得上傳的檔案
            const file = event.target.files[0];
            
            /* 限制檔案上傳型別 */
            let fileType = file.name.substring(file.name.lastIndexOf('.') + 1);   /* 得到檔案字尾名 */
            if (fileType !== 'jpg' && fileType !== 'JPG' && fileType !== 'png') {
                alert("上傳檔案只能是 jpg、png 格式!，請注意格式上傳呦");
                return;
            }
            const formData = new FormData();
            formData.append('file-to-upload', file)
        
            axios.post(`${api_url}/api/${api_path}/admin/upload`,formData)
              .then((res) => {
                // console.log("上傳圖片網址", res.data.imageUrl);
                this.uploadImages = res.data.imageUrl;
                alert("圖片上傳成功");
              })
              .catch((err) => {
                alert(err.response.data.message);
              })
        
        }
    },
}