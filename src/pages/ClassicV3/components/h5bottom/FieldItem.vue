<template>
  <div class="field-item">
    <div>{{ label }}</div>
    <div class="content">
      <template v-if="content">{{ content }}</template>
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FieldItem',
  props: {
    label: {
      type: String,
      require: true,
    },
    content: {
      type: [String, Number],
      require: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.field-item {
  font-size: .22rem;
  line-height: .33rem;
  color: var(--color-des);
  display: flex;

  & + & {
    margin-top: var(--space-common-sm);
  }
}

.content {
  margin-left: auto;
  color: var(--color-content);

  a {
    color: inherit;
    text-decoration: underline;
  }
}
</style>