<template>
  <div class="form-builder">
    <voip-modal width="60%" @closeDialog="handleClose" :title="title">
      <template #content>
        <p class="head">[component-name]</p>
        <p class="hint">{{ title }}</p>
        <text-input
          v-model="v$.name.$model"
          label="Displayed Name"
          required
          hint="hello from the other side"
          placeholder="Enter name ..."
          :error="v$.name.$error"
          height="58px"
        >
          <template #errors>
            <p v-if="v$.name.required">{{ v$.name.required.$message }}</p>
          </template>
        </text-input>
        <text-input
          v-model="v$.description.$model"
          label="Description"
          placeholder="Write the description ..."
          required
          hint="hello from the other side"
          :error="v$.description.$error"
          type="textarea"
          height="58px"
        >
          <template #errors>
            <p v-if="v$.description.required">
              {{ v$.description.required.$message }}
            </p>
          </template>
        </text-input>
        <file-input
          v-model="v$.file.$model"
          label="File"
          placeholder="Write the file ..."
          required
          hint="hello from the other side"
          :error="v$.file.$error"
          height="58px"
          accept=".mp3,.wav"
          @onSelect="onSelect"
        ></file-input>
      </template>
      <template #footer>
        <div class="action-buttons">
          <action-button @onClick="handleClose" flat class="primary-outline"
            >Cancel</action-button
          >
          <action-button
            flat
            class="voip-success"
            :loading="uiFlags.isSubmitting"
            @onClick="onSubmit"
            >Submit</action-button
          >
        </div>
      </template>
    </voip-modal>
  </div>
</template>
<script>
import VoipModal from "@/shared/components/Dialog/VoipModal.vue";
import TextInput from "@/shared/components/settings/Inputs/TextInput.vue";
import ActionButton from "@/shared/components/settings/Buttons/ActionButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FileInput from "@/shared/components/settings/Inputs/FileInput.vue";
import { mapState } from "pinia";
import { [store-name] } from "[store-path]";

export default {
  name: "FormBuilder",
  components: {
    VoipModal,
    ActionButton,
    TextInput,
    FileInput,
  },
  props: {
    title: {
      type: String,
      default: "Add new",
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      description: "",
      file: null,
      img: null,
    };
  },
  validations() {
    return {
      name: { required },
      description: { required },
      file: { required },
    };
  },
  mounted() {
    if (this.item.displayname) {
      this.name = this.item.displayname;
      this.description = this.item.description;
    }
  },
  computed: {
    ...mapState([store-name], {
      uiFlags: "getUiFlags",
    }),
  },
  methods: {
    handleClose() {
      this.$emit("onClose", true);
    },
    onSelect(e) {
      this.img = e;
    },
    onSubmit() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const formData = new FormData();
        if (this.item.id) {
          formData.append("id", this.item.id);
        }
        if (this.img) {
          console.log(this.img);
          formData.append("file", this.img);
        }
        formData.append("name", this.name);
        formData.append("description", this.description);
        this.$emit("onSubmit", formData);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form-builder {
  height: 100%;
  overflow-y: auto;
  .head {
    margin-bottom: 8px;
  }
  .hint {
    margin-bottom: 32px;
    color: $gray500;
  }
  .action-buttons {
    display: flex;
    gap: 16px;
  }
}
</style>
