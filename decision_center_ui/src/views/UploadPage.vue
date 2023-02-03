<template>
  <a-upload-dragger
    name="file"
    accept=".xlsx"
    :file-list="fileList"
    :multiple="true"
    :customRequest="handleUpload"
    :showUploadList="false"
    :disabled="uploading"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </a-upload-dragger>

  <section v-if="uploadResult" style="margin-top: 30px">
    <a-alert
      :message="`上传成功！${uploadResult.success.length} 条上传成功，
      ${uploadResult.failed.length} 条上传失败`"
      type="success"
    />
    <p></p>
  </section>
</template>
<script setup>
import { InboxOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { apiService } from "@/api";
import { message } from "ant-design-vue";

const fileList = ref([]);
const uploading = ref(false);
const uploadResult = ref(null);

const handleUpload = async (info) => {
  uploading.value = true;
  console.log("handleUpload", info);
  const formdata = new FormData();
  formdata.append("file", info.file);
  try {
    const res = await apiService.uploadExcel(formdata);
    console.log(res.data);
    uploadResult.value = res.data;
  } catch (e) {
    console.log(e);
    message.error("上传处理失败");
  } finally {
    uploading.value = false;
  }
};
</script>
