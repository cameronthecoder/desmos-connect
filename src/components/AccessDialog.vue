<template>
  <div
    class="spectrum-Underlay"
    :class="{ 'is-open': isVisible }"
    id="spectrum-underlay"
  ></div>
  <div class="spectrum-Modal-wrapper" :class="{ 'is-open': isVisible }">
    <div class="spectrum-Modal" :class="{ 'is-open': isVisible }">
      <section
        class="spectrum-Dialog spectrum-Dialog--confirmation spectrum-Dialog--medium"
        role="dialog"
        tabindex="-1"
        aria-modal="true"
      >
        <div class="spectrum-Dialog-grid">
          <h1 class="spectrum-Dialog-heading spectrum-Dialog-heading--noHeader">
            Participant Access
          </h1>
          <hr
            class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider"
          />
          <section class="spectrum-Dialog-content">
            <p>
              Allow participants to edit the graph without giving them the
              presenter role.
            </p>
            <table class="spectrum-Table" style="width: 100%">
              <thead class="spectrum-Table-head">
                <tr>
                  <th
                    class="spectrum-Table-headCell spectrum-Table-checkboxCell"
                  >
                    <label class="spectrum-Checkbox spectrum-Table-checkbox">
                      <input
                        type="checkbox"
                        class="spectrum-Checkbox-input"
                        title="Select All"
                        v-model="selectAll"
                        :disabled="participants.length == 0"
                      />
                      <span class="spectrum-Checkbox-box">
                        <svg
                          class="spectrum-Icon spectrum-UIIcon-Checkmark75 spectrum-Checkbox-checkmark"
                          focusable="false"
                          aria-hidden="true"
                        >
                          <use xlink:href="#spectrum-css-icon-Checkmark75" />
                        </svg>
                      </span>
                    </label>
                  </th>
                  <th class="spectrum-Table-headCell">ID</th>
                  <th class="spectrum-Table-headCell">Name</th>
                  <th class="spectrum-Table-headCell">Role</th>
                </tr>
              </thead>
              <tbody class="spectrum-Table-body">
                <tr
                  v-for="participant in participants"
                  :key="participant.id"
                  :class="{
                    'spectrum-Table-row': true,
                    'is-selected': selected.includes(participant.id),
                  }"
                  tabindex="0"
                >
                  <td class="spectrum-Table-cell spectrum-Table-checkboxCell">
                    <label class="spectrum-Checkbox spectrum-Table-checkbox">
                      <input
                        type="checkbox"
                        class="spectrum-Checkbox-input"
                        title="Select"
                        :value="participant.id"
                        v-model="selected"
                        :disabled="
                          participant.role == 'owner' ||
                          participant.role == 'presenter'
                        "
                        :checked="
                          selectAll || selected.includes(participant.id)
                        "
                      />
                      <span class="spectrum-Checkbox-box">
                        <svg
                          class="spectrum-Icon spectrum-UIIcon-Checkmark75 spectrum-Checkbox-checkmark"
                          focusable="false"
                          aria-hidden="true"
                        >
                          <use xlink:href="#spectrum-css-icon-Checkmark75" />
                        </svg>
                      </span>
                    </label>
                  </td>
                  <td class="spectrum-Table-cell">{{ participant.id }}</td>
                  <td class="spectrum-Table-cell">
                    {{ participant.fullName }}
                  </td>
                  <td class="spectrum-Table-cell">
                    {{ displayRole(participant.role) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <div
            class="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter"
          >
            <button
              class="spectrum-Button spectrum-Button--sizeM spectrum-Button--secondary spectrum-ButtonGroup-item"
              type="button"
              @click="close"
            >
              <span class="spectrum-Button-label">Cancel</span>
            </button>
            <button
              class="spectrum-Button spectrum-Button--sizeM spectrum-Button--cta spectrum-ButtonGroup-item"
              type="button"
              @click="enableAccess"
            >
              <span class="spectrum-Button-label">Done</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useCPU } from "../functions/cpu";

export default {
  name: "App",
  props: {
    isVisible: Boolean,
  },
  emits: ["toggleModal"],
  setup(props, { emit }) {
    const { cpu, selected } = useCPU();
    const participants = ref([]);

    const enableAccess = () => {
      if (cpu.value) {
        cpu.value.dispatchSyncMessage(
          "setSelectedParticipants",
          JSON.stringify({ selected: selected.value }),
          false,
          false
        );
      }
      emit("toggleModal");
    };

    const close = () => {
      emit("toggleModal");
    };

    const onUserLeave = (event) => {
      for (let index = 0; index < participants.value.length; index++) {
        const element = participants.value[index];
        if (element.id == event.userID) {
          participants.value.splice(index, 1);
          break;
        }
      }
    };

    const displayRole = (role) => {
      return role == "owner"
        ? "Host"
        : role == "viewer"
        ? "Participant"
        : "Presenter";
    };

    const onUserJoin = (event) => {
      participants.value.push(event.user);
    };

    const onRoleChanged = (event) => {
      var user_in_list;
      for (let index = 0; index < participants.value.length; index++) {
        const user = participants.value[index];
        if (user.id == event.userId) {
          participants.value.splice(index, 1);
          participants.value.push(cpu.value.getUserDetails(event.userId).data);
          break;
        }
      }
    };

    onMounted(() => {
      if (cpu.value) {
        try {
          cpu.value.allowParticipantPublish("changeCalc", true);
        } catch {
          console.warn(
            "Attempted to allow participants to publish, but failed."
          );
        }
        const list = cpu.value.getUserList().data;
        list.forEach((userID) => {
          const user = cpu.value.getUserDetails(userID);
          participants.value.push(user.data);
        });
        cpu.value.registerCallback("userLeft", onUserLeave);
        cpu.value.registerCallback("userJoined", onUserJoin);
        cpu.value.registerCallback("roleChanged", onRoleChanged);
      }
    });

    const selectAll = computed({
      get: () => {
        return participants.value
          ? selected.value.length == participants.value.length
          : false;
      },
      set: (value) => {
        var _selected = [];

        if (value) {
          participants.value.forEach((participant) => {
            if (participant.role == "viewer") {
              _selected.push(participant.id);
            }
          });
        }

        selected.value = _selected;
      },
    });

    return {
      participants,
      selected,
      selectAll,
      displayRole,
      enableAccess,
      close,
    };
  },
};
</script>
