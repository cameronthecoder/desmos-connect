<template>
  <div v-if="expression.type == 'expression' && expression.latex != ''">
    <div class="expression">
      <span
        class="expression_color"
        :style="{ backgroundColor: expression.color }"
      />
      <h3 ref="expressionLatex" class="latex" />
    </div>
  </div>
  <div v-else-if="expression.type == 'text'">
    <div class="expression">
      <h3>{{expression.text}}</h3>
    </div>
  </div>
</template>

<script>
import { watch, onMounted, ref, watchEffect } from "vue";
import katex from "katex";
export default {
  props: {
    expression: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  setup(props) {
    const expressionLatex = ref();
    let latexToHTML;

    onMounted(() => {
      latexToHTML = watchEffect(() => {
        katex.render(props.expression.latex, expressionLatex.value, {
          throwOnError: true,
        });
      });
    });

    return {
      expressionLatex,
      latexToHTML,
    };
  },
};
</script>
<style>
.expression .latex {
  line-height: 3px;
}
.expression {
  padding: 5px;
  margin-bottom: 3px;
  background-color: rgb(206, 204, 204);
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.expression_color {
  height: 25px;
  margin-right: 5px;
  flex: none;
  width: 25px;
  border: 3px solid white;
  border-radius: 50%;
  display: inline-block;
}
</style>
