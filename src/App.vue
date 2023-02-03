<script setup lang="ts">
// base
import { ref } from "vue";

// component
import InitModal from "./components/InitModal.vue";

import { get } from "./utils/config-storage";
import { connect } from "./utils/chat.sdk";
import backgroundImage from "@/assets/suns-logo.png";

const { src, flow_id } = get();
const visible = ref(!src && !flow_id);
const onVisibleChange = (show: boolean) => (visible.value = show);
if (src && flow_id) connect(src, flow_id);
</script>

<template>
  <div class="container">
    <img class="background_img" :src="backgroundImage" />
    <el-icon class="icon_config" :size="26" @click="() => onVisibleChange(true)"
      ><Setting
    /></el-icon>

    <InitModal :visible="visible" :on-visable-change="onVisibleChange" />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.background_img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.icon_config {
  cursor: pointer;
}
</style>
