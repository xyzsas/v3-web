<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Toggle from '../components/Toggle.vue'
import RegionSelector from '../components/RegionSelector.vue'
const router = useRouter()

let D = $ref([
  [
    ['*身份证号码', '港澳台学生填写港澳台通行证号码，外籍学生填写护照号码', ''],
    ['*姓名', '请填写学生姓名', ''],
    ['姓名拼音', '姓和名中间有空格 eg: zhang san', ''],
    ['英文姓名', '可留空', ''],
    ['性别', '', ''],
    ['籍贯', '学生的籍贯', ''],
    ['*国籍', '学生的国籍', ''],
    ['是否为港澳台侨胞', '', '']
  ],
  [
    ['现居地', '学生的现居地', ''],
    ['出生地', '学生的出生地', ''],
    ['户籍详细地址', '', ''],
    ['户口所在地', '', ''],
    ['户口性质', '', '']
  ],
  [
    ['是否独生子女', '', ''],
    ['是否受过学前教育', '', ''],
    ['是否留守儿童', '', ''],
    ['是否孤儿', '', ''],
    ['是否烈士或优抚子女', '', ''],
    ['是否由政府购买学位', '', ''],
    ['是否需要申请资助', '', ''],
    ['是否择校生', '', ''],
    ['是否寄宿', '', ''],
    ['是否流动生', '', '']
  ],
  [
    ['*是否报道', '', ''],
    ['*是否孤儿', '', ''],
    ['*残疾类型', '', ''],
    ['*是否寄宿', '', ''],
    ['*出生日期', 'eg: 2008-01-01', ''],
    ['*残疾证明类型', '', ''],
    ['*残疾证书号', '', ''],
    ['*残疾程度', '', ''],
    ['*特教就读类型', '', ''],
    ['*残疾情况说明', '', '']
  ],
  [
    ['*第一监护人称谓', '第一监护人与学生的关系', ''],
    ['*第一监护人姓名', '', ''],
    ['*第一监护人年龄', '', ''],
    ['第一监护人单位', '', ''],
    ['第一监护人联系方式', '', ''],
    ['第一监护人是否法定监护人', '', ''],
    ['第一监护人户口所在地行政区划', '', ''],
    ['第一监护人现住址', '', ''],
    ['第一监护人国籍', '', ''],
    ['第一监护人民族', '', ''],
    ['第一监护人证件类型', '', ''],
    ['第一监护人证件号码', '', ''],
    ['第一监护人出生日期', 'eg: 2008-01-01', ''],
    ['第一监护人关系说明', '', ''],
    ['第一监护人职务', '', '']
  ],
  [
    ['*第二监护人称谓', '第一监护人与学生的关系', ''],
    ['*第二监护人姓名', '', ''],
    ['*第二监护人年龄', '', ''],
    ['第二监护人单位', '', ''],
    ['第二监护人联系方式', '', ''],
    ['第二监护人是否法定监护人', '', ''],
    ['第二监护人户口所在地行政区划', '', ''],
    ['第二监护人现住址', '', ''],
    ['第二监护人国籍', '', ''],
    ['第二监护人民族', '', ''],
    ['第二监护人证件类型', '', ''],
    ['第二监护人证件号码', '', ''],
    ['第二监护人出生日期', 'eg: 2008-01-01', ''],
    ['第二监护人关系说明', '', ''],
    ['第二监护人职务', '', '']
  ],
  [
    ['是否乘坐校车', '', ''],
    ['上下学方式', '学生上下学的交通方式', ''],
    ['上下学距离', '学生上下学的距离', ''],
  ]
])

const fields = [
  { title: '个人信息', data: D[0], done: false },
  { title: '个人地址', data: D[1], done: false },
  { title: '辅助信息', data: D[2], done: false },
  { title: '特教信息', data: D[3], done: false },
  { title: '第一监护人信息', data: D[4], done: false },
  { title: '第二监护人信息', data: D[5], done: false },
  { title: '交通方式', data: D[6], done: false },

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
      <label class="label-item">
        <p class="label-text">{{ D[0][0][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][0][1]" v-model="D[0][0][2]">
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][1][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][1][1]" v-model="D[0][1][2]">
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][2][0] }}:</p>
        <input v-model="D[0][2][2]" class="label-input" type="text" :placeholder="D[0][2][1]"
          @input="D[0][2][2] = D[0][2][2].toLowerCase().replace(/[^a-z]/g, '')">
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][3][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][3][1]" v-model="D[0][3][2]">
      </label>
      <label class="inline-item">
        <p>{{ D[0][4][0] }}: </p>
        <select v-model="D[0][4][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </label>
      <label class="label-item">
        <p class="label-text"> {{ D[0][5][0] }}: </p>
        <RegionSelector v-model="D[0][5][2]" />
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][6][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][6][1]" v-model="D[0][6][2]">
      </label>
      <label class="inline-item">
        <p>{{ D[0][7][0] }}: </p>
        <select v-model="D[0][7][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="无">无</option>
          <option value="香港">香港</option>
          <option value="香港同胞亲属">香港同胞亲属</option>
          <option value="澳门">澳门</option>
          <option value="澳门同胞亲属">澳门同胞亲属</option>
          <option value="台湾">台湾</option>
          <option value="台湾同胞亲属">台湾同胞亲属</option>
          <option value="海外华侨">海外华侨</option>
          <option value="侨眷">侨眷</option>
          <option value="归侨">归侨</option>
          <option value="归侨子女">归侨子女</option>
          <option value="归国留学人员">归国留学人员</option>
          <option value="非华裔中国人">非华裔中国人</option>
          <option value="外籍华裔人">外籍华裔人</option>
          <option value="外国人">外国人</option>
          <option value="其他">其他</option>
        </select>
      </label>
    </template>
    <template v-if="current === 1">
      <label class="label-item">
        <p class="label-text">{{ D[1][0][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[1][0][1]" v-model="D[1][0][2]">
      </label>
      <div v-for="i in 2">
        <label class="label-item">
          <template class="flex">
            <p class="label-text">{{ D[1][i][0] }}:</p>
            <button class="ml-2 text-sm" @click="D[1][i][2] = D[1][0][2]">复制现居地</button>
          </template>
          <input class="label-input" type="text" :placeholder="D[1][i][1]" v-model="D[1][i][2]">
        </label>
      </div>
      <label class="label-item">
        <p class="label-text"> {{ D[1][3][0] }}: </p>
        <RegionSelector class="ml-2" v-model="D[1][3][2]" />
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[1][4][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[1][4][1]" v-model="D[1][4][2]">
      </label>
    </template>
    <template v-if="current === 2">
      <div v-for="i in 10">
        <label class="inline-item">
          <p class="label-text">{{ D[2][i - 1][0] }}: </p>
          <input type="checkbox" :placeholder="D[2][i - 1][1]" v-model="D[2][i - 1][2]" class="ml-2" />
          <label for="checkbox" class="p-2 ml-2 text-lg">{{ D[2][i - 1][2] }}</label>
        </label>
      </div>
    </template>
    <template v-if="current === 3">
      <Toggle v-model="D[3][0][2]" class="my-2">{{ D[3][0][0] }}</Toggle>
      <Toggle v-model="D[3][1][2]" class="my-2">{{ D[3][1][0] }}</Toggle>
      <label class="inline-item">
        <p class="label-text">{{ D[3][2][0] }}: </p>
        <select v-model="D[3][2][2]" class="ml-2">
          <option disabled value="">请选择</option>
          <option value=无>无</option>
          <option value=肢体障碍>肢体障碍</option>
          <option value=听力障碍>听力障碍</option>
          <option value=视力障碍>视力障碍</option>
          <option value=言语障碍>言语障碍</option>
          <option value=智力障碍>智力障碍</option>
          <option value=精神障碍>精神障碍</option>
          <option value=多重障碍>多重障碍</option>
          <option value=其他残疾>其他残疾</option>
        </select>
      </label>
      <Toggle v-model="D[3][3][2]">{{ D[3][3][0] }}</Toggle>
      <label class="label-item">
        <p class="label-text">{{ D[3][4][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[3][4][1]" v-model="D[3][4][2]">
      </label>
      <label class="inline-item" v-if="D[3][2][2] !== '无'">
        <p>{{ D[3][5][0] }}: </p>
        <select v-model="D[3][5][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="残疾证">残疾证</option>
          <option value="医学诊断证明">医学诊断证明</option>
        </select>
      </label>
      <label class="label-item" v-if="D[3][5][2] === '残疾证'">
        <p class="label-text">{{ D[3][6][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[3][6][1]" v-model="D[3][6][2]">
      </label>
      <label class="inline-item" v-if="D[3][5][2] === '残疾证'">
        <p>{{ D[3][7][0] }}: </p>
        <select v-model="D[3][7][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="1级">1级</option>
          <option value="2级">2级</option>
          <option value="3级">3级</option>
          <option value="4级">4级</option>
        </select>
      </label>
       <label class="inline-item" v-if="D[3][2][2] !== '无'">
        <p>{{ D[3][8][0] }}: </p>
        <select v-model="D[3][8][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="普通学校特教班就读">普通学校特教班就读</option>
          <option value="普通学校随班就读">普通学校随班就读</option>
          <option value="特教学校就读">特教学校就读</option>
          <option value="送教上门">送教上门</option>
          <option value="康复机构特教学校办学点就读">康复机构特教学校办学点就读</option>
          <option value="福利机构特教办学点就读">福利机构特教办学点就读</option>
        </select>
      </label>
      <label class="label-item" v-if="D[3][5][2] === '医学诊断证明'">
        <p class="label-text">{{ D[3][9][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[3][9][1]" v-model="D[3][9][2]">
      </label>
    </template>
    <template v-if="current === 4">
      <div v-for="i in 5">
        <label class="label-item">
          <p class="label-text">{{ D[4][i - 1][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[4][i - 1][1]" v-model="D[4][i - 1][2]">
        </label>
      </div>
      <Toggle v-model="D[4][5][2]" class="my-2">{{ D[4][5][0] }}</Toggle>
      <label class="label-item">
        <p class="label-text"> {{ D[4][6][0] }}: </p>
        <RegionSelector v-model="D[4][6][2]" />
      </label>
      <div v-for="i in 9">
        <label class="label-item" v-if="i > 6">
          <p class="label-text">{{ D[4][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[4][i][1]" v-model="D[4][i][2]">
        </label>
      </div>
      <label class="inline-item">
        <p>{{ D[4][10][0] }}: </p>
        <select v-model="D[4][10][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="无户籍">无户籍</option>
          <option value="居民身份证">居民身份证</option>
          <option value="香港特区护照/身份证明">香港特区护照/身份证明</option>
          <option value="澳门特区护照/身份证明">澳门特区护照/身份证明</option>
          <option value="台湾居民来往大陆通行证">台湾居民来往大陆通行证</option>
          <option value="境外永久居住证">境外永久居住证</option>
          <option value="护照">护照</option>
          <option value="其他">其他</option>
        </select>
      </label>
      <div v-for="i in 14">
        <label class="label-item" v-if="i > 10">
          <p class="label-text">{{ D[4][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[4][i][1]" v-model="D[4][i][2]">
        </label>
      </div>
    </template>
    <template v-if="current === 5">
      <div v-for="i in 5">
        <label class="label-item">
          <p class="label-text">{{ D[5][i - 1][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[5][i - 1][1]" v-model="D[5][i - 1][2]">
        </label>
      </div>
      <Toggle v-model="D[5][5][2]" class="my-2">{{ D[5][5][0] }}</Toggle>
      <label class="label-item">
        <p class="label-text"> {{ D[5][6][0] }}: </p>
        <RegionSelector v-model="D[5][6][2]" />
      </label>
      <div v-for="i in 9">
        <label class="label-item" v-if="i > 6">
          <p class="label-text">{{ D[5][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[5][i][1]" v-model="D[5][i][2]">
        </label>
      </div>
      <label class="inline-item">
        <p>{{ D[5][10][0] }}: </p>
        <select v-model="D[5][10][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="无户籍">无户籍</option>
          <option value="居民身份证">居民身份证</option>
          <option value="香港特区护照/身份证明">香港特区护照/身份证明</option>
          <option value="澳门特区护照/身份证明">澳门特区护照/身份证明</option>
          <option value="台湾居民来往大陆通行证">台湾居民来往大陆通行证</option>
          <option value="境外永久居住证">境外永久居住证</option>
          <option value="护照">护照</option>
          <option value="其他">其他</option>
        </select>
      </label>
      <div v-for="i in 14">
        <label class="label-item" v-if="i > 10">
          <p class="label-text">{{ D[5][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[5][i][1]" v-model="D[5][i][2]">
        </label>
      </div>
    </template>
    <template v-if="current === 6">
      <label class="inline-item">
        <p class="label-text">{{ D[6][0][0] }}: </p>
        <input type="checkbox" :placeholder="D[6][0][1]" v-model="D[6][0][2]" class="ml-2" />
        <label for="checkbox" class="p-2 ml-2 text-lg">{{ D[6][0][2] }}</label>
      </label>
      <div v-for="i in 2">
        <label class="label-item">
          <p class="label-text">{{ D[6][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[6][i][1]" v-model="D[6][i][2]">
        </label>
      </div>
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
