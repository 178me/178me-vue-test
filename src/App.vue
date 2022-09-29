<script setup lang="ts">
const list = Array.from({ length: 300 }, (_, i) => {
  return {
    name: "用户" + i,
  }
})
</script>
<template>
  <div flex="~ row" w-screen h-screen overflow-y-hidden>
    <!-- 侧边栏 -->
    <div bg="red-500" h-full w-68px></div>
    <!-- page -->
    <div flex="~ col" bg="blue-300" w-full h-full>
      <!-- Header -->
      <div bg="red-300" shrink-0 w-full h-68px>Header</div>
      <!-- Content -->
      <div flex="~ col" overflow-y-hidden>
        <div bg="white" h="30px" w-full shrink-0></div>
        <div flex="~ col" bg="#0bdee2" overflow-y-scroll items-center>
          <div py-2 v-for="li in list">
            <span>
              {{ li.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
