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
            About Desmos Connect
          </h1>
          <hr
            class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider"
          />
          <section class="spectrum-Dialog-content">
            <p class="spectrum-Body spectrum-Body--sizeS">
              Copyright 2020-2021 Cameron Dahl
            </p>
            <p class="spectrum-Body spectrum-Body--sizeS">
              This pod is not affiliated with Desmos or any of it's partners in
              any way.
            </p>
            <p class="spectrum-Body spectrum-Body--sizeS">Version: 1.0.1</p>
            <p class="spectrum-Body spectrum-Body--sizeS">
              This project is licensed under the MIT license.
            </p>
            <button
              @click="
                this.$window.top.open(
                  'https://github.com/cameronthecoder/desmos-connect',
                  '_blank',
                  'noopener'
                )
              "
              class="spectrum-ActionButton spectrum-ActionButton--sizeS"
            >
              <span class="spectrum-Button-label">Source Code</span>
            </button>
          </section>

          <div
            class="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter"
          >
            <button
              class="spectrum-Button spectrum-Button--sizeM spectrum-Button--secondary spectrum-ButtonGroup-item"
              type="button"
              @click="close"
            >
              <span class="spectrum-Button-label">Close</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
export default {
  props: {
    isVisible: Boolean,
  },
  emits: ["toggleModal"],
  setup(props, { emit }) {
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