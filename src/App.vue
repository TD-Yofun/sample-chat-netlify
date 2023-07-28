<script setup lang="ts">
// base
import { ref } from "vue";

// component
import ConfigurationModal from "./components/ConfigurationModal.vue";

import { get } from "./utils/storage";
import { connect } from "./utils/chat.sdk";
import backgroundImage from "@/assets/suns-logo.png";

const src = import.meta.env.VITE_APP_LIB_URL;
const touchpointId = get();

const id = ref(touchpointId);
const visible = ref(!id.value);

const onVisibleChange = ({
  visible: show,
  id: tId,
}: {
  visible: boolean;
  id: string;
}) => {
  visible.value = show;
  id.value = tId;
};

if (src && id.value) connect(src, id.value);
</script>

<template>
  <div class="container">
    <img class="background_img" :src="backgroundImage" />

    <div
      style="
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
      "
    >
      <p class="touchpoint" v-if="id">
        Touchpoint Id: <label>{{ id }}</label>
      </p>

      <el-icon
        style="cursor: pointer"
        :size="26"
        @click="() => onVisibleChange({ visible: true, id })"
        ><Setting
      /></el-icon>
    </div>

    <configuration-modal
      :src="src"
      :visible="visible"
      :on-visible-change="onVisibleChange"
    />
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

.touchpoint {
  color: #333;
}
</style>
