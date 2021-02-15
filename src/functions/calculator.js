import { computed, onMounted, ref } from "vue";
import { useCPU } from "./cpu";
const { cpu, getConfig } = useCPU();
const calculator = ref(null);
const expressions = ref();
const lastEvent = ref("{}");
const isUserIncluded = ref(false);
const calc = ref(null);

export function useCalculator() {
  const setLastEvent = (data) => {
    lastEvent.value = data;
  };

  const onCalculatorStateChanged = () => {
    if (cpu.value != null) {
      const userID = getConfig().userID;
      const data = JSON.parse(lastEvent.value);
      if (data.userID == userID || !data.userID) {
        cpu.value.dispatchSyncMessage(
          "changeCalc",
          JSON.stringify({ calc: calculator.value.getState(), userID: userID }),
          false,
          false
        );
      }
      setLastEvent("{}");
    }
    expressions.value = calculator.value.getExpressions();
  };

  const getOptions = (role, selectedParticipants = []) => {
    const userConfig = getConfig();
    const includes_user = selectedParticipants.filter(participant => participant == userConfig.userID).length == 1;
    isUserIncluded.value = includes_user;
    return {
      settingsMenu: role == "presenter" || role == "owner",
      zoomButtons: role == "presenter" || role == "owner",
      lockViewport: role === "viewer",
      expressions: role == "presenter" || role == "owner" || includes_user,
      images: role == "presenter" || role == "owner",
      keypad: role === "presenter" || role == "owner",
    };
  };

  onMounted(() => {
    if (cpu.value && calculator.value == null) {
      const userConfig = getConfig();
      calculator.value = Desmos.GraphingCalculator(
        calc.value,
        getOptions(userConfig.role)
      );
      calculator.value.observeEvent("change", onCalculatorStateChanged);
    } else if (calculator.value == null) {
      calculator.value = Desmos.GraphingCalculator(
        calc.value,
        getOptions("owner")
      );
      calculator.value.observeEvent("change", onCalculatorStateChanged);
    }
  });

  return {
    getOptions,
    calculator: computed(() => calculator.value),
    expressions: computed(() => expressions.value),
    lastEvent: computed(() => lastEvent.value),
    isUserIncluded: computed(() => isUserIncluded.value),
    calc: computed({
      get: () => {
        return calc.value
      },
      set: (value) => {
        calc.value = value;
      }
    }),
    setLastEvent,
  };
}
