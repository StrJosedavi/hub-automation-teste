<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  customClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const baseClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background " +
  "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
</script>

<template>
  <input
    :type="type || 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[baseClass, props.customClass]"
    @input="onInput"
  />
</template>
