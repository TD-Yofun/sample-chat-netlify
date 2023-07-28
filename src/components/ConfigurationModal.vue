<script setup lang="ts">
import { ref, reactive, watch, defineProps, toRefs } from "vue";
import type { FormRules, FormInstance } from "element-plus";

import { get, save } from "@/utils/storage";
import { connect } from "../utils/chat.sdk";

import type { ChatConfigModel } from "../model/ChatConfig";

// props
const props = defineProps<{
  src: string;
  visible: boolean;
  onVisibleChange: (params: { visible: boolean; id: string }) => void;
}>();
const { src, visible, onVisibleChange } = toRefs(props);

// data
const ruleFormRef = ref<FormInstance>();
const form = reactive<ChatConfigModel>({
  src: "",
  flow_id: "",
});
const rules = reactive<FormRules>({
  src: [
    { required: true, message: "Please input src value", trigger: "blur" },
    {
      validator: (rule, value: string, callback) => {
        if (!value.trim()) {
          callback(new Error("Please input src value"));
        } else if (!/^https:\/\//.test(value)) {
          callback(new Error("Please enter the correct url address"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  flow_id: [
    {
      required: true,
      message: "Please input touchpoint id value",
      trigger: "blur",
    },
    {
      validator: (rule, value: string, callback) => {
        if (!value.trim()) {
          callback(new Error("Please input touchpoint id value"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// watch
watch(
  () => visible,
  (value) => {
    if (value) {
      const flow_id = get();
      form.src = src.value;
      form.flow_id = flow_id;
      ruleFormRef.value?.clearValidate();
    }
  },
  { immediate: true }
);

// methods
const start = async () => {
  const valid = await ruleFormRef.value?.validate();
  if (!valid) return;
  const { src, flow_id } = form;
  connect(src, flow_id);
  save(flow_id);
  onVisibleChange.value({ visible: false, id: flow_id });
};
</script>

<template>
  <el-dialog
    v-model="visible"
    title="Configuration"
    width="50%"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      label-width="120px"
      :rules="rules"
      label-position="left"
    >
      <el-form-item label="JS url" prop="src">
        <el-input v-model="form.src" disabled />
      </el-form-item>

      <el-form-item label="Touchpoint Id" prop="flow_id">
        <el-input v-model="form.flow_id" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="() => onVisibleChange({ visible: false, id: form.flow_id })"
          >Cancel</el-button
        >
        <el-button type="primary" @click="() => start()"> Start </el-button>
      </span>
    </template>
  </el-dialog>
</template>
