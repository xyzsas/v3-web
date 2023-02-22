<script setup>
import BackHeader from '../components/BackHeader.vue'
import { QuestionMarkCircleIcon, UserIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { onMounted } from "vue"
import * as echarts from 'echarts'
onMounted(() => {
  let cqeView = echarts.init(document.getElementById("cqeView"));
  cqeView.setOption({
    xAxis: {
      data: ["", "", "", "", "", "", ""],
    },
    yAxis: {
    },
    series: [{
      name: "使用量",
      type: "line",
      data: [85, 90, 86, 100, 91, 120, 95],
    }, ],
  });
  let systemView = echarts.init(document.getElementById("systemView"));
  systemView.setOption({
    xAxis: {
      data: ["", "", "", "", "", "", ""],
    },
    yAxis: {},
    series: [{
      name: "使用量",
      type: "line",
      data: [550, 740, 695, 1052, 1305, 956, 1530],
    }, ],
  });
  window.onresize = function() {
    cqeView.resize();
    systemView.resize();
  };
})

const router = useRouter()
</script>

<template>
  <div class="h-screen bg-gray-200">
    <BackHeader @back="router.push('/')">Dashboard</BackHeader>
    <div class="wrapper-card grid lg:grid-cols-4 grid-cols-1 md:grid-cols-1 gap-3 mt-2 ml-5 mr-5">
      <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex">
        <div class="p-2 max-w-sm">
          <div class="bg-green-200 rounded-full w-14 h-14 text-lg p-3 text-green-600 mx-auto"><UserIcon class="w-8"/></div>
        </div>
        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-5xl">256</p>
          <h2 class="font-normatext-md mt-1">教师总数</h2>
        </div>
      </div>
      <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex">
        <div class="p-2 max-w-sm">
          <div class="bg-red-200 rounded-full w-14 h-14 text-lg p-3 text-red-600 mx-auto">
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="30px"
                height="30px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="none"
                  d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0ZM20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5Z"
                />
                <path
                  fill="currentColor"
                  d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8ZM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0Z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-5xl">2,586</p>
          <h2 class="font-normal text-md mt-1">学生总数</h2>
        </div>
      </div>
      <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex">
        <div class="p-2 max-w-sm">
          <div class="bg-orange-200 rounded-full w-14 h-14 text-lg p-3 text-orange-600 mx-auto"><QuestionMarkCircleIcon class="w-8"/></div>
       </div>
        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-5xl">5,289</p>
          <h2 class="font-normal text-md mt-1">CQE使用次数</h2>
        </div>
      </div>
      <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex">
        <div class="p-2 max-w-sm">
          <div class="bg-purple-200 rounded-full w-14 h-14 text-lg p-3 text-purple-600 mx-auto">
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="30px"
                height="30px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <g fill="currentColor">
                  <path d="M15 13v1H1.5l-.5-.5V0h1v13h13Z" />
                  <path d="M13 3.207L7.854 8.354h-.708L5.5 6.707l-3.646 3.647l-.708-.708l4-4h.708L7.5 7.293l5.146-5.147h.707l2 2l-.707.708L13 3.207Z"/>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-5xl">41,230</p>
          <h2 class="font-normal text-md mt-1">总访问次数</h2>
        </div>
      </div>
    </div>
    <div class="mt-2 ml-5 mr-5 lg:flex block lg:gap-3">
      <div class="bg-white dark:bg-gray-800 p-5 w-2/3 rounded-md border-solid border-gray-300 border-2">
        <div class="wrapper-card grid lg:grid-cols-2 grid-cols-1 md:grid-cols-1 gap-1 mt-1">
          <div class="card">
            <h2 class="font-bold text-2xl text-gray-800 dark:text-gray-200">学生事务系统访问量</h2>
            <p class="text-gray-400 font-lexend text-sm">系统每天凌晨1点刷新数据</p>
            <div id="systemView" style="height: 350px; width: 500px;"></div>
          </div>
          <div class="card">
            <h2 class="font-bold text-2xl text-gray-800 dark:text-gray-200">综合素质评价访问量</h2>
            <p class="text-gray-400 font-lexend text-sm">系统每天凌晨1点刷新数据</p>
            <div id="cqeView" style="height: 350px; width: 500px;"></div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-5 w-1/3 rounded-md border-solid border-gray-300 border-2">
        <h2 class="font-bold text-2xl dark:text-gray-200">安全检测</h2>
        <div class="mt-6 ml-4 grid grid-cols-2 gap-5">
          <span class="text-left">
            <h3 class="font-bold text-lg dark:text-gray-200 mb-5">综合素质评价</h3>
            <div class="all-transition text-white font-bold text-lg rounded-full w-10 h-10 mb-1 text-center ring bg-green-600"><CheckIcon/></div>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-lg dark:text-gray-200 mb-5">用户授权</h3>
            <div class="all-transition text-white font-bold text-lg rounded-full w-10 h-10 mb-1 text-center ring bg-green-600"><CheckIcon/></div>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-lg dark:text-gray-200 mb-5">消息管理</h3>
            <div class="all-transition text-white font-bold text-lg rounded-full w-10 h-10 mb-1 text-center ring bg-green-600"><CheckIcon/></div>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-lg dark:text-gray-200 mb-5">学生档案导入</h3>
            <div class="all-transition text-white font-bold text-lg rounded-full w-10 h-10 mb-1 text-center ring bg-green-600"><CheckIcon/></div>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-lg dark:text-gray-200 mb-5">二维码生成</h3>
            <div class="all-transition text-white font-bold text-lg rounded-full w-10 h-10 mb-1 text-center ring bg-green-600"><CheckIcon/></div>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-lg dark:text-gray-200 mb-5">选课管理</h3>
            <div class="all-transition text-white font-bold text-lg rounded-full w-10 h-10 mb-1 text-center ring bg-green-600"><CheckIcon/></div>
          </span>
        </div>
      </div>
    </div>  
    <div class="mt-2 lg:flex block lg:gap-2 ml-5 mr-5">
      <div class="bg-white dark:bg-gray-800 p-5 w-3/4 rounded-md border-solid border-gray-300 border-2">
      <h2 class="font-bold text-2xl text-gray-800 dark:text-gray-200">存储空间</h2>
        <div class="wrapper-card grid lg:grid-cols-1 grid-cols-1 md:grid-cols-1 gap-4 mt-2">
          <div class="card">
            <h2 class="ml-4 font-bold text-base text-gray-800 dark:text-gray-200">云盘存储</h2>
            <div class="flex text-black bg-gray-300 rounded-full overflow-hidden">
              <div class="bg-blue-500 rounded-full all-transition" :style="{ width: '18%'}" />
              <div class="font-bold relative pl-2 all-transition" :class="0.18 > 0.4 && 'right-16 text-white pl-0 w-0'">18%</div>
            </div>
          </div>
          <div class="card">
            <h2 class="ml-4 font-bold text-base text-gray-800 dark:text-gray-200">档案存储</h2>
            <div class="flex text-black bg-gray-300 rounded-full overflow-hidden">
              <div class="bg-blue-500 rounded-full all-transition" :style="{ width: '11%'}" />
              <div class="font-bold relative pl-2 all-transition" :class="0.11 > 0.4 && 'right-16 text-white pl-0 w-0'">11%</div>
            </div>
          </div>
          <div class="card">
            <h2 class="ml-4 font-bold text-base text-gray-800 dark:text-gray-200">选课存量</h2>
            <div class="flex text-black bg-gray-300 rounded-full overflow-hidden">
              <div class="bg-blue-500 rounded-full all-transition" :style="{ width: '14%'}" />
              <div class="font-bold relative pl-2 all-transition" :class="0.14 > 0.4 && 'right-16 text-white pl-0 w-0'">14%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-5 w-1/4 rounded-md border-solid border-gray-300 border-2">
        <h2 class="font-bold text-2xl text-gray-800 dark:text-gray-200">项目概述</h2>
        <div class="mt-4 grid grid-cols-2 gap-2">
          <span class="text-left">
            <h3 class="font-bold text-ml dark:text-gray-200">学生事务系统启动时间</h3>
            <p class="text-gray-400 dark:text-gray-200">01/2021</p>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-ml dark:text-gray-200">综合素质评价启动时间</h3>
            <p class="text-gray-400 dark:text-gray-200">07/2022</p>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-ml dark:text-gray-200">项目进展</h3>
            <p class="text-gray-400 dark:text-gray-200">进行中</p>
          </span>
          <span class="text-left">
            <h3 class="font-bold text-ml dark:text-gray-200">项目负责人</h3>
            <p class="text-gray-400 dark:text-gray-200">Shiheng Li</p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
