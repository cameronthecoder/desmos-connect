<template>
  <access-dialog v-if="role == 'owner'" :is-visible="isAccessDialogVisible" @toggleModal="toggleAccessDialog()" />
  <import-dialog v-if="role == 'owner'" :is-visible="isImportDialogVisible" @toggleModal="toggleImportDialog()" />
  <analytics-dialog :is-visible="isAnalyticsDialogVisible" @toggleModal="toggleAnalyticsDialog()" />
  <div id="col-container">
    <div v-if="role == 'owner' || !role" id="toolbar">
      <button
        class="spectrum-ActionButton spectrum-ActionButton--sizeM"
        @click="toggleAccessDialog()"
      >
        <span class="spectrum-ActionButton-label">Participant Access</span>
      </button>
      

      <button class="spectrum-ActionButton spectrum-ActionButton--sizeM" @click="toggleImportDialog()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="spectrum-Icon spectrum-Icon--sizeS"
          focusable="false"
          aria-hidden="true"
          aria-label="Import from URL"
          height="18"
          viewBox="0 0 18 18"
          width="18"
        >
          <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" />
          <path
            class="a"
            d="M16.5,12h-1a.5.5,0,0,0-.5.5V15H3V12.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v4a.5.5,0,0,0,.5.5h15a.5.5,0,0,0,.5-.5v-4A.5.5,0,0,0,16.5,12Z"
          />
          <path
            class="a"
            d="M8.8245,13.428a.25.25,0,0,0,.35,0L12.9,9.6655a.391.391,0,0,0,.1-.263.4.4,0,0,0-.4-.4H10V1.5A.5.5,0,0,0,9.5,1h-1a.5.5,0,0,0-.5.5V9H5.4a.4.4,0,0,0-.4.4.391.391,0,0,0,.1.263Z"
          />
        </svg>
        <span class="spectrum-ActionButton-label">Import from URL</span>
      </button>
    </div>
    <div id="container">
      <div
        v-if="role == 'viewer'"
        id="expressions_panel"
      >
        <h1>Expressions</h1>
        <div
          v-for="expression in expressions"
          id="expressions"
          :key="expression.id"
        >
          <Expression :expression="expression" />
        </div>
      </div>
      <div id="calculator" ref="calc" />
    </div>
  </div>
</template>

<script>
import { useCalculator } from "../functions/calculator";
import { useCPU } from "../functions/cpu";
import Expression from "./Expression.vue";
import AccessDialog from "./AccessDialog.vue";
import ImportDialog from "./ImportDialog.vue";
import AnalyticsDialog from "./AnalyticsDialog.vue";
import { ref } from "vue";

export default {
  components: {
    Expression,
    AccessDialog,
    ImportDialog,
    AnalyticsDialog
  },
  setup() {
    const { role } = useCPU();
    const { calc, expressions, isUserIncluded } = useCalculator();
    const isAccessDialogVisible = ref(false);
    const isImportDialogVisible = ref(false);
    const isAnalyticsDialogVisible = ref(localStorage.getItem('graphingConnectModal') !== "true");

    const toggleAccessDialog = () => isAccessDialogVisible.value = !isAccessDialogVisible.value;
    const toggleAnalyticsDialog = () => isAnalyticsDialogVisible.value = !isAnalyticsDialogVisible.value;
    const toggleImportDialog = () => isImportDialogVisible.value = !isImportDialogVisible.value;

    return {
      calc,
      expressions,
      role,
      isUserIncluded,
      isAccessDialogVisible,
      isAnalyticsDialogVisible,
      toggleAnalyticsDialog,
      isImportDialogVisible,
      toggleAccessDialog,
      toggleImportDialog,
    };
  },
};
</script>
<style>
#toolbar {
  padding: 2px;
  display: flex; 
  gap: 0px 5px;
}
#col-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#container {
  display: flex;
  padding: 10px;
  overflow: hidden;
  flex-grow: 1;
}
#calculator {
  width: 100%;
}
#expressions_panel {
  width: 300px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  flex: none;
  overflow-y: auto;
}
#expressions_panel h1 {
  text-align: center;
  margin: 0;
}
#expressions {
  display: flex;
  flex-direction: column;
}
</style>