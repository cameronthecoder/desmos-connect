import { computed, onMounted, ref, watch } from "vue";
import { useCalculator } from "./calculator";
const { calculator, getOptions, setLastEvent } = useCalculator();
const cpu = ref(null);
const role = ref(null);
const selected = ref([]);

export function useCPU() {

  const getConfig = () => {
    if (cpu.value) {
      return cpu.value.getConfig();
    }
  };

  watch(selected, () => {
    if (cpu.value) {
      const userConfig = getConfig();
      calculator.value.setOptions(getOptions(userConfig.role, selected.value));
    }
  });

  const onConfigured = () => {
    console.log("Configured");
  };

  const onRoleChanged = (e) => {
    const userConfig = getConfig();
    if (e.userId == userConfig.userID) {
      role.value = userConfig.role;
      calculator.value.setOptions(getOptions(userConfig.role, selected.value));
    }
  };

  const onSyncMessageReceived = (msg) => {
    console.log(msg);
    const data = JSON.parse(msg.msgVal);
    switch (msg.msgNm) {
      case "changeCalc":
        setLastEvent(msg.msgVal);
        calculator.value.setState(data.calc);
        break;
      case "setSelectedParticipants":
        selected.value = data.selected;
        break;
      default:
        break;
    }
  };

  onMounted(() => {
    if (ConnectCustomSDK != undefined && cpu.value == null) {
      cpu.value = ConnectCustomSDK.SyncConnector || {};
      if (cpu.value) {
        cpu.value.init(
          onConfigured,
          "com.camerondahl.desmos",
          "1.0.001",
          "connectsdkhook"
        );
        cpu.value.registerCallback(
          "syncMessageReceived",
          onSyncMessageReceived
        );
        role.value = getConfig().role;
        cpu.value.registerCallback("roleChanged", onRoleChanged);
      }
    } else if (ConnectCustomSDK == undefined) {
      console.warn('SDK is undefined');
      role.value = "owner";
    }
  });

  return {
    cpu: computed(() => cpu.value),
    role: computed(() => role.value),
    selected: computed({
      get: () => {
        return selected.value
      },
      set: (value) => {
        selected.value = value;
      }
    }),
    getConfig,
  };
}