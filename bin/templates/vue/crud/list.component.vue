<template>
  <div class="[class-name]">
    <v-row>
      <v-col cols="12">
        <SettingsTable
          title="[table-title]"
          :loading="uiFlags.isLoading"
          :headers="headers"
          :meta="items"
          :items="items?.data || []"
          @onPageChanges="onPageChanges"
          @onSearch="onSearch"
        >
          <template #setting-table-actions>
            <ActionButton class="success" flat @onClick="addHandler">
              <font-awesome-icon :icon="['fas', 'plus']" />
              <span class="ml-1">Add New</span></ActionButton
            >
          </template>
          <template #actions="{ item }">
            <VoipButton @click="editHandler(item)"
              ><img src="@/assets/images/icons/edit.png" alt=""
            /></VoipButton>
            <VoipButton type="danger" @click="deleteHandler(item)"
              ><img src="@/assets/images/icons/delete.png" alt=""
            /></VoipButton>
          </template>
          <template #file="item">
            <router-link :to="item.item.file.path">{{
              item.item.file.name
            }}</router-link>
          </template>
        </SettingsTable>
      </v-col>
    </v-row>
    <FormBuilder v-if="addTrigger" @onSubmit="addItem" @onClose="addHandler" />
    <FormBuilder
      v-if="editTrigger"
      :item="selectedItem"
      :title="`Edit: ${selectedItem?.displayname}`"
      @onSubmit="editItem"
      @onClose="closeEditModal"
    />
    <ConfirmDialog
      v-if="deleteTrigger && selectedItem"
      title="Confirm Deletion"
      cancelText="No, Cancel"
      confirmText="Yes, Delete"
      @onConfirm="deleteConfirm"
      @onCancel="deleteCancel"
    >
      <template #content>
        <p>
          Are you sure you want to delete
          <b>{{ selectedItem.description }} ?</b>
        </p>
      </template>
    </ConfirmDialog>
  </div>
</template>
<script>
import SettingsTable from "@/shared/components/settings/Tables/SettingsTable.vue";
import VoipButton from "@/shared/components/settings/Buttons/VoipButton.vue";
import ActionButton from "@/shared/components/settings/Buttons/ActionButton.vue";
import ConfirmDialog from "@/shared/components/settings/Popups/ConfirmDialog.vue";
import FormBuilder from "./FormBuilder.vue";
import { mapActions, mapState } from "pinia";
import { [store-name] } from "[store-path]";
export default {
  name: "[component-name]",
  components: {
    SettingsTable,
    VoipButton,
    ActionButton,
    ConfirmDialog,
    FormBuilder,
  },
  data() {
    return {
      addTrigger: false,
      editTrigger: false,
      deleteTrigger: false,
      selectedItem: null,
      timeOut: null,
      page: 1,
      headers: [
        { text: "Name", value: "displayname" },
        { text: "Description", value: "description" },
        { text: "File", value: "filename" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  computed: {
    ...mapState([store-name], {
      items: "getData",
      uiFlags: "getUiFlags",
    }),
  },
  mounted() {
    this.get();
  },
  methods: {
    ...mapActions([store-name], [
      "get",
      "delete",
      "add",
      "update",
    ]),
    addHandler() {
      this.addTrigger = !this.addTrigger;
    },
    editHandler(item) {
      this.selectedItem = item;
      this.editTrigger = true;
    },
    addItem(data) {
      this.add(data);
    },
    editItem(data) {
      this.update(data);
    },
    closeEditModal() {
      this.editTrigger = false;
      this.selectedItem = null;
    },
    onClose() {
      this.editTrigger = false;
    },
    deleteHandler(item) {
      this.deleteTrigger = !this.deleteTrigger;
      this.selectedItem = item;
    },
    deleteConfirm() {
      this.delete(this.selectedItem.id);
      this.deleteTrigger = false;
      this.selectedItem = null;
    },
    deleteCancel() {
      this.deleteTrigger = false;
      this.selectedItem = null;
    },
    onPageChanges(page) {
      this.page = page;
      if (!this.uiFlags.isLoading) {
        this.get({ page });
      }
    },
    onSearch(e) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.get({ page: 1, search: e });
      }, 500);
    },
  },
  watch: {
    "uiFlags.isSubmitting"(val, oldval) {
      if (val === false && oldval === true) {
        this.addTrigger = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.[class-name] {
  padding: 30px 32px;
  height: 100%;
  overflow-y: auto;
}
</style>
