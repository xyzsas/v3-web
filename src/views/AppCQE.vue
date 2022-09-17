<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Toggle from '../components/Toggle.vue'
import RegionSelector from '../components/RegionSelector.vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import CQECard from '../components/CQECard.vue'
const router = useRouter()

let D = $ref({
  '思想品德': {
    '日常操行': {
      '出勤情况': [0, 0, 0, 0, 0],
      '学习态度': [0, 0, 0, 0, 0],
      '团结协作': [0, 0, 0, 0, 0],
      '遵规守纪': [0, 0, 0, 0, 0],
      '诚实守信': [0, 0, 0, 0, 0],
      '文明礼仪': [0, 0, 0, 0, 0]
    },
    '德育活动': {
      '党团活动': [0, 0, 0, 0, 0],
      '公益活动': [0, 0, 0, 0, 0],
      '志愿服务': [0, 0, 0, 0, 0],
      '其他': [0, 0, 0, 0, 0]
    }
  }
})

const T = {
  '思想品德': {
    '日常操行': {
      '出勤情况': ['按时到校，按时上下课，按时午休晚睡，按时参加学校、班级组织的各种活动，不迟到，不早退，不旷课，有事请假，按规定进出校门。', '无旷课或迟到少于2次，评价为10分；违规离开学校一次扣分，旷课1次或迟到2-3次评价为扣1分；旷课2次或迟到4-5次为3分；旷课3次以上或迟到6次以上扣10分'],
      '学习态度': ['学习动机明确，态度端正，掌握有效的学习策略，能够独立思考。', '课堂、自习时对待学习的态度（1-5分）；自治自动和作业完成情况(1-5分）；整理本整理情况（1-5分）；对待考试的态度、学习效果（1-5分）。正课和自习睡觉、玩手机等与学习无关的事情，抄作业等采用扣分规则，每发现一次扣1分。'],
      '团结协作': ['为人友善，相互尊重，相互包容，和睦相处，有团队意识，有集体荣誉感，主动协同他人搞好各项事务。', '各种集体活动参加情况（1-5分）、小组内是否服从小组长安排（1-5分）、宿舍内是否认真完成值日（1-5分）、自主管理团队内是否认真履行职责，服从管理（1-5分）。'],
      '遵规守纪': ['具有法律和规则意识；遵守公共秩序和社会规则；遵守学校和班级的规章制度。', '遵守法律法规，遵守学校的规章制度（20分）。不遵守交通规则，不遵守文明城市创建要求的每次扣2分，参与打架、非法聚堆等非正常集体活动一次扣5分；有顶撞师长重大违纪的扣10分；宿舍内影响他人休息1次扣1分；教室内影响他人学习1次扣1分；进入营业性网吧的1次扣3分，不服从宿管管理扣5分。本项20分扣完为止。'],
      '诚实守信': ['言行一致，知错就改；信守承诺，拒绝欺骗。', '言行一致，知错就改；信守承诺，拒绝欺骗。（20分）个人有1次及以上违反家庭公约及宿舍公约和班级公约扣5分。携带手机在教学区违规使用的发现1次扣5分；考试作弊扣20分。本项20分扣完为止。'],
      '文明礼仪': ['仪表端正，举止得体；尊老爱幼，尊敬师长；礼貌待人；遵守社会公德。', '衣着得体，尊敬师长，文明交往，遵守社会公德。（20分）。化妆，烫发染发、不带首饰发现1次扣2分，不按规定穿校服一次扣2分，宿舍教室卫生区卫生不到位1次扣2分，影响他人文明观赏的1次扣2分，男女生交往过密影响校风校纪1次扣10分。'],
    },
    '德育活动': {
      '党团活动': ['勇于承担责任，积极组织和参与各类党团活动。', '优秀团员荣誉称号（校级1次加1分、市级1次加2分，省级1次加5分）、组织参加的党团活动的半小时以内的1次1分、组织参加的党团活动的半小时时以上1次加3分、活动内容及成效（1-10分）'],
      '公益活动': ['每学期至少参加一次，持续时间不少于半天，实效性强。', '参加的公益活动内容半小时以上的1次2分，过程、成效（1-10分）。'],
      '志愿服务': ['每学期至少参加一次，持续时间不少于半天，实效性强。', '参加的志愿者服务活动半小时以上的1次2分，过程、成效（1-10分）。'],
      '其他': ['', '未作说明但出现的事情，根据具体报综合素质评价委员会裁定。']
    },
    '评价主要依据': '《中学生日常行为规范（修订）》、《中小学生守则》、《中共中央国务院关于进一步加强和改进未成年人思想道德建设的若干意见》、《中小学文明礼仪教育纲要》、《江苏省普通高中课程设置及教学指导意见》'
  }
}

const fields = [
  { title: '填写指南', done: false },
  { title: '思想品德', done: false },
  { title: '学业水平', done: false },
  { title: '身心健康', done: false },
  { title: '艺术素养', done: false },
  { title: '社会实践和劳动教育', done: false },
  { title: '学期总表', done: false },
  { title: '三年汇总表', done: false }
]

let current = $ref(0) // index of field
</script>

<template>
  <BackHeader @back="router.push('/')">个人资料</BackHeader>
  <!-- fields selector -->
  <div class="overflow-x-auto bg-white border border-x-0 mb-4">
    <div class="flex">
      <div v-for="(v, i) in fields" class="my-4">
        <div class="flex flex-col justify-center items-center mx-2 px-2 cursor-pointer" @click="current = i">
          <button class="all-transition text-white font-bold text-lg rounded-full w-12 h-12 mb-1 text-center"
            :class="[current === i && 'ring', v.done ? 'bg-green-600' : 'bg-gray-500']">{{ i + 1 }}</button>
          <div class="text-xs whitespace-nowrap text-gray-500">{{ v.title }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-start p-4 sm:p-10">
    <template v-if="current === 0">
      填写指南
    </template>
    <template v-if="current === 1">
      <div class="text-2xl">日常操行</div>
      <div v-for="(v, k) in D.思想品德.日常操行">
        <CQECard v-model="D.思想品德.日常操行[k]" :title="k" :content="T.思想品德.日常操行[k][0]" :criterion="T.思想品德.日常操行[k][1]" :basis="T.思想品德.评价主要依据" />
      </div>
      <div class="text-2xl">德育活动</div>
      <div v-for="(v, k) in D.思想品德.德育活动">
        <CQECard v-model="D.思想品德.德育活动[k]" :title="k" :content="T.思想品德.德育活动[k][0]" :criterion="T.思想品德.德育活动[k][1]" :basis="T.思想品德.评价主要依据" />
      </div>
    </template>
    <template v-if="current === 2">
      
    </template>
    <template v-if="current === 3">
      
    </template>
    <template v-if="current === 4">
      
    </template>
    <template v-if="current === 5">
      
    </template>
    <template v-if="current === 6">
      
    </template>
    <template v-if="current === 7">
      
    </template>
  </div>
</template>

<style scoped>
.label-item {
  max-width: 640px;
  @apply block my-2 w-full;
}

.label-text {
  @apply my-1;
}

.label-input {
  transition: all 0.3s ease;
  @apply block w-full px-2 py-1 bg-white border focus:ring-2;
}

.inline-item {
  @apply block my-2 w-full flex items-center;
}

.inline-input {
  transition: all 0.3s ease;
  @apply mx-2 px-2 py-1 bg-white border focus:ring-2;
}
</style>
