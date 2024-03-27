<script setup lang="ts">
import { ref, reactive, watch, defineProps, toRefs } from "vue";
import type { FormRules, FormInstance } from "element-plus";

import { get, save } from "@/utils/storage";
import { connect } from "../utils/chat.sdk";
import { ENVIRONMENT } from "../utils/environment";

import type { ChatConfigModel } from "../model/ChatConfig";

// props
const props = defineProps<{
  visible: boolean;
  onCancel: () => void;
  onConfirm: (value: ChatConfigModel) => void;
}>();
const { visible, onConfirm, onCancel } = toRefs(props);

// data
const ruleFormRef = ref<FormInstance>();
const form = reactive<ChatConfigModel>({
  environment: "STG",
  flow_id: "",
});
const rules = reactive<FormRules>({
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
  visible,
  (value) => {
    if (value) {
      const configuration = get();
      form.environment = configuration?.environment || "STG";
      form.flow_id = configuration?.flow_id || "";
      ruleFormRef.value?.clearValidate();
    }
  },
  { immediate: true }
);

// methods
const start = async () => {
  const valid = await ruleFormRef.value?.validate();
  if (!valid) return;
  const { environment, flow_id } = form;
  connect(ENVIRONMENT[environment], flow_id);
  save(form);
  onConfirm.value(form);
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
      <el-form-item label="Environment" prop="environment" :required="true">
        <el-radio-group v-model="form.environment">
          <el-radio-button
            v-for="item in Object.keys(ENVIRONMENT)"
            :label="item"
            :key="item"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Touchpoint Id" prop="flow_id">
        <el-input v-model="form.flow_id" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => onCancel()">Cancel</el-button>
        <el-button type="primary" @click="() => start()"> Start </el-button>
      </span>
    </template>
  </el-dialog>
</template>
