import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCrudModal = defineStore('crudStore', () => {
  const modalAdd = ref(false);
  const modalEdit = ref(false);
  const modalDelete = ref(false);

  function showCreateModal() {
    modalAdd.value = !modalAdd.value;
    console.log('Show Clicked');
  }
  function showEditModal() {
    modalEdit.value = !modalEdit.value;
    console.log('Edit Clicked');
  }
  function showDeleteModal() {
    modalDelete.value = !modalDelete.value;
    console.log('delete Clicked');
  }

  return { modalAdd, modalEdit, modalDelete, showCreateModal, showEditModal, showDeleteModal };
});