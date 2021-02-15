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
            Import from URL
          </h1>
          <hr
            class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider"
          />
          <section class="spectrum-Dialog-content">
            <form class="spectrum-Form spectrum-Form--labelsAbove">
              <div class="spectrum-Form-item">
                <label
                  class="spectrum-FieldLabel spectrum-FieldLabel--sizeM spectrum-Form-itemLabel"
                  for="fieldLabelExample-emailaddress"
                  >URL</label
                >
                <div class="spectrum-Form-itemField">
                  <div
                    class="spectrum-Textfield spectrum-Textfield--quiet"
                    style="width: 100%"
                  >
                    <input
                      class="spectrum-Textfield-input"
                      aria-invalid="false"
                      type="text"
                      v-model="url"
                      placeholder="Example: https://www.desmos.com/calculator/fdpuho79tk"
                    />
                  </div>
                </div>
              </div>
            </form>
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
              @click="importFromURL"
              :disabled="loading || !validURL"
            >
              <span class="spectrum-Button-label">Import</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useCalculator } from "../functions/calculator";
export default {
  props: {
    isVisible: Boolean,
  },
  emits: ["toggleModal"],
  setup(props, { emit }) {
    const url = ref();
    const loading = ref(false);
    const close = () => {
      emit("toggleModal");
    };

    const { calculator } = useCalculator();

    const validURL = computed(() => {
      return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url.value);
    })
    const importFromURL = async () => {
      loading.value = true;
      await fetch(url.value, {
        headers: {
          Accept: "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          calculator.value.setState(data.state);
        })
        .finally(() => {
          loading.value = false;
          emit("toggleModal");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      close,
      url,
      loading,
      importFromURL,
      validURL
    };
  },
};
</script>

<style>
.spectrum-Textfield {
  width: 100%;
}
</style>