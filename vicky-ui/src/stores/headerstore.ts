import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface HeaderState {
  headerTextVisibility: boolean
}

export const useHeaderStore = defineStore('header', {
  state: () => ({
    headerTextVisibility: false
  } as HeaderState)
});
