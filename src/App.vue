<script setup lang="ts">
// base
import { reactive, ref } from "vue";

// component
import ConfigurationModal from "./components/ConfigurationModal.vue";

import { get } from "./utils/storage";
import { connect } from "./utils/chat.sdk";
import { getURLParams, isValid } from "./utils/environment";
import backgroundImage from "@/assets/kirin.png";
import type { ChatConfigModel } from "./model/ChatConfig";

const configReactive = reactive<ChatConfigModel>(
  getURLParams() || get() || ({} as ChatConfigModel)
);

const visible = ref(!configReactive);

if (isValid(configReactive)) {
  const { environment, touchpoint_id, region } = configReactive;
  connect(environment, touchpoint_id, region);
}

const onCancel = () => {
  visible.value = false;
};
const onConfirm = (value: ChatConfigModel) => {
  visible.value = false;
  configReactive.region = value.region;
  configReactive.environment = value.environment;
  configReactive.touchpoint_id = value.touchpoint_id;
};
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
      <div>
        <p class="touchpoint" v-if="configReactive.region">
          Region: <label>{{ configReactive.region }}</label>
        </p>

        <p class="touchpoint" v-if="configReactive.environment">
          Environment: <label>{{ configReactive.environment }}</label>
        </p>

        <p class="touchpoint" v-if="configReactive.touchpoint_id">
          Touchpoint ID: <label>{{ configReactive.touchpoint_id }}</label>
        </p>
      </div>

      <el-icon
        style="cursor: pointer"
        :size="26"
        @click="() => (visible = true)"
      >
        <Setting />
      </el-icon>
    </div>

    <configuration-modal
      :visible="visible"
      @cancel="onCancel"
      @confirm="onConfirm"
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
