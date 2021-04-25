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
            Opt-In Analytics
          </h1>
          <hr
            class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider"
          />
          <section class="spectrum-Dialog-content">
            <p>Graphing Connect uses analytics to determine the amount of people that are using the pod. The only information Graphing Connect collects is the country you are in. <strong>Do we have permission to collect this data?</strong></p>
          </section>

          <div
            class="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter"
          >
            <button
              class="spectrum-Button spectrum-Button--sizeM spectrum-Button--secondary spectrum-ButtonGroup-item"
              type="button"
              @click="close"
            >
              <span class="spectrum-Button-label">No</span>
            </button>
            <button
              class="spectrum-Button spectrum-Button--sizeM spectrum-Button--secondary spectrum-ButtonGroup-item"
              type="button"
              @click="close"
            >
              <span class="spectrum-Button-label">Yes</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
    props: {
    isVisible: Boolean,
    },
    emits: ["toggleModal"],
    setup(props, { emit }) {
        localStorage.setItem('graphingConnectModal', true);
        const close = () => {
            emit("toggleModal");
        };


        return {
            close
        };
    },
};
</script>

<style>
.spectrum-Textfield {
  width: 100%;
}
</style>