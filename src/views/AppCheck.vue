<script>
  // @ is an alias to /src
  import { Icon } from "@iconify/vue"
  import * as echarts from 'echarts'
  import {onMounted} from "vue"
  export default {
    name: "Dashboard",
    data() {
      return {       
        tableTransaction: [
          {
            transaction: "用户授权",
            datetime: "Apr 22, 2022",
            statusTransaction: "completed",
          },
          {
            transaction: "消息管理",
            datetime: "May 2, 2022",
            statusTransaction: "completed",
          },
        
          {
            transaction: "综合素质评价",
            datetime: "May 5, 2022",
            statusTransaction: "progress",
          },
          {
            transaction: "投票",
            datetime: "May 5, 2022",
            statusTransaction: "cancelled",
          },
        ],
      };
      // end chart data line
    },
    components: { Icon },
    mounted() {},
    setup() {
    onMounted(() => { 
      let myChart = echarts.init(document.getElementById("myChart123"));
      myChart.setOption({
        xAxis: {
          data: ["14/02", "15/02", "16/02", "17/02", "18/02", "19/02", "20/02"]
        },
        yAxis:{},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [8, 15, 31, 33, 40, 42, 47]
          }
        ]
      });
      window.onresize = function () { 
        myChart.resize();
      };
    });
  }
  };
</script>

<template>
  <div class="h-screen dashboard p-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <svg
              class="mr-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              ></path>
            </svg>
            Dashboard
          </a>
        </li>
      </ol>
    </nav>
    <!-- end nav -->
    <div class="mt-3 w-full">
      <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
        Dashboard
      </h1>
    </div>
    <!-- grid wrapper card -->
    <div
      class="wrapper-card grid lg:grid-cols-4 grid-cols-1 md:grid-cols-1 gap-2 mt-1"
    >
      <!-- card  -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex"
      >
        <div class="p-2 max-w-sm">
          <div
            class="bg-orange-200 rounded-full w-14 h-14 text-lg p-3 text-orange-600 mx-auto"
          >
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
                  <path
                    d="M13 3.207L7.854 8.354h-.708L5.5 6.707l-3.646 3.647l-.708-.708l4-4h.708L7.5 7.293l5.146-5.147h.707l2 2l-.707.708L13 3.207Z"
                  />
                </g>
              </svg>
            </span>  
          </div>
       </div>
        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            289
          </p>
          <h2 class="font-normal text-gray-400 text-md mt-1">CQE使用次数</h2>
        </div>
      </div>
      <!-- end card -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex"
      >
        <div class="p-2 max-w-sm">
          <div
            class="bg-green-200 rounded-full w-14 h-14 text-lg p-3 text-green-600 mx-auto"
          >
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
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            256
          </p>
          <h2 class="font-normal text-gray-400 text-md mt-1">教师总数</h2>
        </div>
      </div>
      <!-- end card -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex"
      >
        <div class="p-2 max-w-sm">
          <div
            class="bg-red-200 rounded-full w-14 h-14 text-lg p-3 text-red-600 mx-auto"
          >
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
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            2,586
          </p>
          <h2 class="font-normal text-gray-400 text-md mt-1">
            学生总数
          </h2>
        </div>
      </div>
      <!-- end card -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-2 shadow flex"
      >
        <div class="p-2 max-w-sm">
          <div
            class="bg-purple-200 rounded-full w-14 h-14 text-lg p-3 text-purple-600 mx-auto"
          >
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
                  <path
                    d="M13 3.207L7.854 8.354h-.708L5.5 6.707l-3.646 3.647l-.708-.708l4-4h.708L7.5 7.293l5.146-5.147h.707l2 2l-.707.708L13 3.207Z"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            7,230
          </p>
          <h2 class="font-normal text-gray-400 text-md mt-1">总访问次数</h2>
        </div>
      </div>
      <!-- end card -->
    </div>
    <!-- end wrapper card -->
    <div
      class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border shadow"
    >
      <h2 class="font-bold text-xl text-gray-800 dark:text-gray-200">
        项目进展状况
      </h2>
      <p class="text-gray-400 font-lexend font-normal text-sm">
        这是目前学生事务系统开发进展
      </p>
      <div class="wrapping-table mt-3">
        <table
          class="w-full text-xs text-left text-gray-500 dark:text-gray-400 lg:overflow-auto overflow-x-scroll"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="text-xm px-16 py-2 pl-10">名称</th>
              <th scope="col" class="text-xm px-16 py-2">开始时间</th>
              <th scope="col" class="text-xm px-6 py-2">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
              v-for="items in tableTransaction"
              :key="items.transaction"
            >
              <td class="pl-10 px-16 py-3">
                {{ items.transaction }}
              </td>
              <td class="px-16 py-3">
                {{ items.datetime }}
              </td>
              <td class="px-6 py-3">
                <span
                  class="text-green-800 bg-green-300 px-3 py-1 rounded-md"
                  v-if="items.statusTransaction == 'completed'"
                >
                  {{ items.statusTransaction }}
                </span>
                <span
                  class="text-purple-800 bg-purple-300 px-3 py-1 rounded-md"
                  v-else-if="items.statusTransaction == 'progress'"
                >
                  {{ items.statusTransaction }}
                </span>
                <span
                  class="text-red-800 bg-red-300 px-3 py-1 rounded-md"
                  v-else
                >
                  {{ items.statusTransaction }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="wrapper-button mt-2">
        <select
          name=""
          id=""
          class="dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-300 border px-2 py-1 block rounded-md text-gray-500 dark:text-gray-400 text-sm"
        >
          <option value="">Last 1 years</option>
          <option value="">Last 2 years</option>
          <option value="">Last 3 years</option>
        </select>
        <button
          class="uppercase float-right -mt-7 border-b border-red-600 text-red-600"
        >
          进展报告
        </button>
      </div>
    </div>

    <div class="mt-2 lg:flex block lg:gap-4">
      <div
        class="bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border shadow"
      >
        <h2 class="font-bold text-xl text-gray-800 dark:text-gray-200">
          访问量
        </h2>
        <p class="text-gray-400 font-lexend text-sm">
          每天更新一次
        </p>
        <span class="float-right">
          <h2 class="text-red-500 -mt-12 flex">
            <span class="mr-2"> 12.2% </span
            ><span>
              <Icon icon="akar-icons:arrow-up" />
            </span>
          </h2>
        </span>
        <hr />
        <div class="wrapper-button mt-3">
          <select
            name=""
            id=""
            class="dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-300 border px-2 py-1 block rounded-md text-gray-500 dark:text-gray-400 text-sm"
          >
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">Last 30 days</option>
          </select>
          <button
            class="uppercase float-right -mt-7 border-b border-red-600 text-red-600"
          >
            CQE使用次数报告
          </button>
        <div class="pl-44 -mt-12">
        <div id="myChart123" :style="{width: '1200px', height: '325px'}"></div></div>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 p-5 lg:w-96 lg:mt-0 mt-2 shadow rounded-md w-full"
      >
        <h2 class="dark:text-gray-200 text-xl font-bold">Project Summary</h2>
        <p class="text-gray-400">展示了目前项目的进展状况。</p>
       
        <div class="mt-4 grid grid-cols-1 gap-2">
          <span class="text-left">
            <h1 class="font-bold text-ml dark:text-gray-200">
              学生事务系统启动时间
            </h1>
            <p class="text-gray-400 dark:text-gray-200">01/2023</p>
          </span>
          <span class="text-left">
            <h1 class="font-bold text-ml dark:text-gray-200">
              学生事务系统结束时间
            </h1>
            <p class="text-gray-400 dark:text-gray-200">02/2023</p>
          </span>
          <span class="text-left">
            <h1 class="font-bold text-ml dark:text-gray-200">
              综合素质评价启动时间
            </h1>
            <p class="text-gray-400 dark:text-gray-200">01/2023</p>
          </span>
          <span class="text-left">
            <h1 class="font-bold text-ml dark:text-gray-200">
              综合素质评价结束时间
            </h1>
            <p class="text-gray-400 dark:text-gray-200">02/2023</p>
          </span>
          <span class="text-left">
            <h1 class="font-bold text-ml dark:text-gray-200">
              项目进展
            </h1>
            <p class="text-gray-400 dark:text-gray-200">进行中</p>
          </span>
        </div>
      </div>
    </div>
    
  </div>
</template>
