<template>
  <a-modal
      title="添加网站"
      ok-text="确认"
      cancel-text="取消"
      @ok="addWebClick"
      v-model:visible="visible"
      centered
      :maskClosable="false">
    <div class="modal-content">
      <a-form
          ref="formRef"
          :model="formData"
          name="basic"
          :label-col="{ span: 5}"
          :wrapper-col="{ span: 18 }"
          autocomplete="off">
        <a-form-item label="域名" name="serverName" :rules="[{ required: true, message: '请输入域名!' }]">
          <a-input v-model:value="formData.serverName" @change="serverNameChange"/>
        </a-form-item>

        <a-form-item label="端口" name="port" :rules="[{  required: true, type: 'number', min: 80, max: 65535 }]">
          <a-input-number v-model:value="formData.port" min="80" max="65535"/>
        </a-form-item>

        <a-form-item label="根目录" name="rootPath" :rules="[{ required: true, message: '请选择根目录!' }]">
          <input-open-dir-dialog v-model:value="formData.rootPath" ></input-open-dir-dialog>
        </a-form-item>

        <a-form-item label="PHP版本" name="phpVersion">
          <a-select style="width: 100px" v-model:value="formData.phpVersion" :options="phpVersionList"/>
        </a-form-item>
      </a-form>

    </div>
  </a-modal>
</template>


<script setup>
// eslint-disable-next-line no-unused-vars
import {ref, reactive, inject} from "vue";
import InputOpenDirDialog from "@/renderer/components/InputOpenDirDialog";
import path from "path";
import Website from "@/main/core/website/Website";
import GetPath from "@/shared/utils/GetPath";
import MessageBox from "@/renderer/utils/MessageBox";
import {STATIC_WEB_NAME} from "@/shared/constant";
import SoftwareExtend from "@/main/core/software/SoftwareExtend";

const {search, addModalVisible: visible} = inject('website');

const wwwPath = GetPath.getWWWPath();
const formRef = ref();

const formData = reactive({
  serverName: '',
  port: 80,
  rootPath: wwwPath,
  phpVersion: '',
});

const phpVersionList = ref([]);
let list = SoftwareExtend.getPHPList();
phpVersionList.value = list.map(item => {
  return {value: item.version, label: item.name};
});
phpVersionList.value.push({value: '', label: STATIC_WEB_NAME});

const serverNameChange = () => {
  formData.rootPath = path.join(wwwPath, formData.serverName);
}

const addWebClick = async () => {
  try {
    let values = await formRef.value.validateFields();
    visible.value = false;
    formRef.value.resetFields();
    await addWeb(values);
    search();
  } catch (errorInfo) {
    console.log('Validate Failed:', errorInfo);
  }
};

const addWeb = async (websiteInfo) => {
  try {
    await Website.add(websiteInfo);
  } catch (error) {
    MessageBox.error(error.message ?? error, '添加网站出错！');
  }
}
</script>

<style scoped>
.modal-content {
  padding: 0 5px;
}
</style>
