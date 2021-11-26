<template>
  <div>
    <svg viewBox="-10 -10 420 320">
      <path d="M0,0L100,100" />
      <g v-for="(d, i) in data">
        <path :d="lines[i]" stroke="teal"/>
        <circle :r="rs[i]" :cx="i * interval" fill="#1f78b4">
          <animate attributeName="cy" from="300" :to="300 - data[i]" dur="0.3s" repeatCount="1" fill="freeze" />
        </circle>
      </g>
      <path class="cross" :d="path" stroke="teal" fill="none" />
    </svg>
  </div>
</template>
<script setup>
let data = $ref([92, 101, 130, 111, 121, 151, 97, 112, 160, 120, 83, 96, 146, 132, 150, 150, 144])
let rs = $ref([])
let lines = $ref([])
const interval = 400 / (data.length - 1)
const sqrt = d3.scaleSqrt().domain([80, 160]).range([2, 4])

for (const i in data) {
  rs.push(sqrt(data[i]))
  lines.push(d3.line()([[i * interval, 0], [i * interval, 300]]))
}
let path = $ref('')
let i = 0
path = d3.line()
  .x(d => i++ * interval)
  .y(d => (300 - d))(data)

console.log(path)

</script>
<style scoped>
svg {
  width: 800px;
  background-color: rgba(243, 244, 246);
}
path {
  stroke-dasharray: 2;
}
.cross {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: offset 0.3s ease;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
}
@keyframes offset {
  to {
    stroke-dashoffset: 0;
  }
}
circle {
  stroke: rgba(117, 183, 130);
  stroke-width: 1px;
  stroke-linejoin: round;
  animation: hover 0.1s linear;
  animation-fill-mode: forwards;
}
circle:hover {
  stroke-width: 3px;
}
</style>
