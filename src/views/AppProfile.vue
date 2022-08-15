<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Toggle from '../components/Toggle.vue'
import RegionSelector from '../components/RegionSelector.vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
const router = useRouter()

let D = $ref([
  [
    ['身份证号码', '港澳台学生填写港澳台通行证号码，外籍学生填写护照号码', ''],
    ['身份证件有效期', '', ''],
    ['姓名', '请填写学生姓名', ''],
    ['姓名拼音', '姓和名中间有空格 eg: zhang san', ''],
    ['英文姓名', '可留空', ''],
    ['性别', '', ''],
    ['籍贯', '学生的籍贯', ''],
    ['国籍', '学生的国籍', ''],
    ['港澳台侨胞', '', ''],
    ['出生日期', '', ''],
    ['联系电话', '', ''],
    ['邮政编码', '', ''],
    ['户口性质', '', ''],
    ['健康状况', '', ''],
    ['婚姻状况', '', ''],
    ['电子邮箱', '', ''],
    ['主页地址', '', ''],
    ['血型', '', ''],
    ['就读方式', '', ''],
    ['政治面貌', '', ''],
    ['宗教信仰', '', ''],
    ['学生来源', '', ''],
    ['特长', '', ''],
    ['入团年月', '默认选择该月1号', '']
  ],
  [
    ['现住址', '填写详细地址', ''],
    ['出生地', '填写完整的地区行政区划名称', ''],
    ['通讯地址', '填写详细地址', ''],
    ['户籍详细地址', '街道小区门牌号等详细地址', ''],
    ['家庭常住地区', '填写完整的地区行政区划名称', ''],
    ['家庭常住地详细地址', '街道小区门牌号等详细地址', '']
  ],
  [
    ['是否独生子女', '', ''],
    ['是否烈士或优抚子女', '', ''],
    ['是否择校生', '', ''],
    ['是否需要申请资助', '', ''],
    ['是否外来务工子女', '', ''],
    ['是否由政府购买学位', '', ''],
    ['是否在校', '', ''],
    ['是否提交真实材料', '', ''],
    ['是否孤儿', '', ''],
    ['是否寄宿', '', '']
  ],
  [
    ['残疾类型', '', ''],
    ['残疾证明类型', '', ''],
    ['残疾证书号', '', ''],
    ['残疾程度', '', ''],
    ['特教就读类型', '', ''],
    ['残疾情况说明', '', '']
  ],
  [
    ['父亲姓名', '', ''],
    ['父亲年龄', '', ''],
    ['父亲单位', '', ''],
    ['父亲联系方式', '', ''],
    ['父亲是否法定监护人', '', ''],
    ['父亲户口所在地行政区划', '', ''],
    ['父亲现住址', '', ''],
    ['父亲国籍', '', ''],
    ['父亲民族', '', ''],
    ['父亲证件类型', '', ''],
    ['父亲证件号码', '', ''],
    ['父亲关系说明', '', ''],
    ['父亲职务', '', ''],
    ['父亲出生日期', '', '']
  ],
  [
    ['母亲姓名', '', ''],
    ['母亲年龄', '', ''],
    ['母亲单位', '', ''],
    ['母亲联系方式', '', ''],
    ['母亲是否法定监护人', '', ''],
    ['母亲户口所在地行政区划', '', ''],
    ['母亲现住址', '', ''],
    ['母亲国籍', '', ''],
    ['母亲民族', '', ''],
    ['母亲证件类型', '', ''],
    ['母亲证件号码', '', ''],
    ['母亲关系说明', '', ''],
    ['母亲职务', '', ''],
    ['母亲出生日期', 'eg: 2008-01-01', '']
  ],
  [
    ['*是否乘坐校车', '', ''],
    ['*上下学方式', '', ''],
    ['*上下学距离(公里)', '填写数字', ''],
  ]
])

const fields = [
  { title: '填写指南', done: false },
  { title: '个人信息', data: D[0], done: false },
  { title: '个人地址', data: D[1], done: false },
  { title: '辅助信息', data: D[2], done: false },
  { title: '特教信息', data: D[3], done: false },
  { title: '父亲信息', data: D[4], done: false },
  { title: '母亲信息', data: D[5], done: false },
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
      填写指南
    </template>
    <template v-if="current === 1">
      <label class="label-item">
        <p class="label-text">{{ D[0][0][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][0][1]" v-model="D[0][0][2]">
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][1][0] }}:</p>
        <DatePicker v-model="D[0][1][2]" :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input class="label-input" :value="inputValue" v-on="inputEvents" />
          </template>
        </DatePicker>
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][2][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][2][1]" v-model="D[0][2][2]">
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][3][0] }}:</p>
        <input v-model="D[0][3][2]" class="label-input" type="text" :placeholder="D[0][3][1]"
          @input="D[0][3][2] = D[0][3][2].toLowerCase().replace(/[^a-z]/g, '')">
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][4][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][4][1]" v-model="D[0][4][2]">
      </label>
      <label class="inline-item">
        <p>{{ D[0][5][0] }}: </p>
        <select v-model="D[0][5][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </label>
      <label class="label-item">
        <p class="label-text"> {{ D[0][6][0] }}: </p>
        <RegionSelector v-model="D[0][6][2]" />
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][7][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][7][1]" v-model="D[0][7][2]">
      </label>
      <label class="inline-item">
        <p>{{ D[0][8][0] }}: </p>
        <select v-model="D[0][8][2]" class="inline-input">
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
      <label class="label-item">
        <p class="label-text">{{ D[0][9][0] }}:</p>
        <DatePicker v-model="D[0][9][2]" :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input class="label-input" :value="inputValue" v-on="inputEvents" />
          </template>
        </DatePicker>
      </label>
      <template v-for="i in 11">
        <label class="label-item" v-if="i > 9">
          <p class="label-text">{{ D[0][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[0][i][1]" v-model="D[0][i][2]">
        </label>
      </template>
      <label class="inline-item">
        <p>{{ D[0][12][0] }}: </p>
        <select v-model="D[0][12][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="农业户口">农业户口</option>
          <option value="非农业户口">非农业户口</option>
        </select>
      </label>
      <label class="inline-item">
        <p>{{ D[0][13][0] }}: </p>
        <select v-model="D[0][13][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="健康/良好">健康/良好</option>
          <option value="一般/较弱">一般/较弱</option>
          <option value="有慢性病">有慢性病</option>
          <option value="有生理缺陷">有生理缺陷</option>
          <option value="残疾">残疾</option>
        </select>
      </label>
      <label class="inline-item">
        <p>{{ D[0][14][0] }}: </p>
        <select v-model="D[0][14][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="未婚">未婚</option>
          <option value="已婚">已婚</option>
          <option value="丧偶">丧偶</option>
          <option value="离婚">离婚</option>
          <option value="未说明的婚姻状况">未说明的婚姻状况</option>
        </select>
      </label>
      <template v-for="i in 16">
        <label class="label-item" v-if="i > 14">
          <p class="label-text">{{ D[0][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[0][i][1]" v-model="D[0][i][2]">
        </label>
      </template>
      <label class="inline-item">
        <p>{{ D[0][17][0] }}: </p>
        <select v-model="D[0][17][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="未知血型">未知血型</option>
          <option value="A血型">A血型</option>
          <option value="B血型">B血型</option>
          <option value="AB血型">AB血型</option>
          <option value="O血型">O血型</option>
          <option value="RH阳性血型">RH阳性血型</option>
          <option value="RH阴性血型">RH阴性血型</option>
          <option value="HLA血型">HLA血型</option>
          <option value="未定血型">未定血型</option>
          <option value="其他血型">其他血型</option>
        </select>
      </label>
      <label class="inline-item">
        <p>{{ D[0][18][0] }}: </p>
        <select v-model="D[0][18][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="走读">走读</option>
          <option value="住校">住校</option>
          <option value="送教上门">送教上门</option>
        </select>
      </label>
      <label class="inline-item">
        <p>{{ D[0][19][0] }}: </p>
        <select v-model="D[0][19][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="中国共产党党员">中国共产党党员</option>
          <option value="中国共产党预备党员">中国共产党预备党员</option>
          <option value="中国共产主义青年团团员">中国共产主义青年团团员</option>
          <option value="群众">群众</option>
          <option value="中国国民党革命委员会会员">中国国民党革命委员会会员</option>
          <option value="中国民主同盟盟员">中国民主同盟盟员</option>
          <option value="中国民主建国会会员">中国民主建国会会员</option>
          <option value="中国民主促进会会员">中国民主促进会会员</option>
          <option value="中国农工民主党党员">中国农工民主党党员</option>
          <option value="中国致公党党员">中国致公党党员</option>
          <option value="九三学社社员">九三学社社员</option>
          <option value="台湾民主自治同盟盟员">台湾民主自治同盟盟员</option>
          <option value="无党派民主人士">无党派民主人士</option>
        </select>
      </label>
      <label class="label-item" v-if="D[0][19][2] === '中国共产主义青年团团员'">
        <p class="label-text">{{ D[0][23][0] }}:</p>
        <DatePicker v-model="D[0][23][2]" :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input class="label-input" :value="inputValue" v-on="inputEvents" :placeholder="D[0][23][1]" />
          </template>
        </DatePicker>
      </label>
      <label class="inline-item">
        <p>{{ D[0][20][0] }}: </p>
        <select v-model="D[0][20][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="无宗教信仰">无宗教信仰</option>
          <option value="佛教">佛教</option>
          <option value="喇嘛教">喇嘛教</option>
          <option value="道教">道教</option>
          <option value="天主教">天主教</option>
          <option value="基督教">基督教</option>
          <option value="东正教">东正教</option>
          <option value="伊斯兰教">伊斯兰教</option>
          <option value="其他">其他</option>
        </select>
      </label>
      <label class="inline-item">
        <p>{{ D[0][21][0] }}: </p>
        <select v-model="D[0][21][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="正常入学">正常入学</option>
          <option value="借读">借读</option>
          <option value="其他">其他</option>
        </select>
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[0][22][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[0][22][1]" v-model="D[0][22][2]">
      </label>
    </template>
    <template v-if="current === 2">
      <label class="label-item">
        <p class="label-text">{{ D[1][0][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[1][0][1]" v-model="D[1][0][2]">
      </label>
      <label class="label-item">
        <p class="label-text"> {{ D[1][1][0] }}: </p>
        <RegionSelector v-model="D[1][1][2]" />
      </label>
      <template v-for="i in 5">
        <label class="label-item" v-if="i > 1 && i !== 4">
          <template class="flex">
            <p class="label-text">{{ D[1][i][0] }}:</p>
          </template>
            <label><input type="checkbox" class="mr-2" @click="D[1][i][2] = D[1][i][2] === D[1][0][2] ? '' : D[1][0][2]">与现住址一致</label>
          <input class="label-input mt-2" type="text" :placeholder="D[1][i][1]" v-model="D[1][i][2]">
        </label>
      </template>
      <label class="label-item">
        <p class="label-text"> {{ D[1][4][0] }}: </p>
        <RegionSelector v-model="D[1][4][2]" />
      </label>
    </template>
    <template v-if="current === 3">
      <label v-for="i in 10" class="inline-item">
        <Toggle v-model="D[2][i - 1][2]" class="my-2">{{ D[2][i - 1][0] }}</Toggle>
      </label>
    </template>
    <template v-if="current === 4">
      <label class="inline-item">
        <p class="label-text">{{ D[3][0][0] }}: </p>
        <select v-model="D[3][0][2]" class="ml-2">
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
      <label class="inline-item" v-if="D[3][0][2] !== '无'">
        <p>{{ D[3][1][0] }}: </p>
        <select v-model="D[3][1][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="残疾证">残疾证</option>
          <option value="医学诊断证明">医学诊断证明</option>
        </select>
      </label>
      <label class="label-item" v-if="D[3][1][2] === '残疾证'">
        <p class="label-text">{{ D[3][2][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[3][2][1]" v-model="D[3][5][2]">
      </label>
      <label class="inline-item" v-if="D[3][1][2] === '残疾证'">
        <p>{{ D[3][3][0] }}: </p>
        <select v-model="D[3][3][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="1级">1级</option>
          <option value="2级">2级</option>
          <option value="3级">3级</option>
          <option value="4级">4级</option>
        </select>
      </label>
      <label class="inline-item" v-if="D[3][0][2] !== '无'">
        <p>{{ D[3][4][0] }}: </p>
        <select v-model="D[3][4][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="普通学校特教班就读">普通学校特教班就读</option>
          <option value="普通学校随班就读">普通学校随班就读</option>
          <option value="特教学校就读">特教学校就读</option>
          <option value="送教上门">送教上门</option>
          <option value="康复机构特教学校办学点就读">康复机构特教学校办学点就读</option>
          <option value="福利机构特教办学点就读">福利机构特教办学点就读</option>
        </select>
      </label>
      <label class="label-item" v-if="D[3][1][2] === '医学诊断证明'">
        <p class="label-text">{{ D[3][5][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[3][5][1]" v-model="D[3][5][2]">
      </label>
    </template>
     <template v-if="current === 5">
      <label v-for="i in 4" class="label-item">
        <p class="label-text">{{ D[4][i - 1][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[4][i - 1][1]" v-model="D[4][i - 1][2]">
      </label>
      <Toggle v-model="D[4][4][2]" class="my-2">{{ D[4][4][0] }}</Toggle>
      <label class="label-item">
        <p class="label-text"> {{ D[4][5][0] }}: </p>
        <RegionSelector v-model="D[4][5][2]" />
      </label>
      <template v-for="i in 8">
        <label class="label-item" v-if="i > 5">
          <p class="label-text">{{ D[4][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[4][i][1]" v-model="D[4][i][2]">
        </label>
      </template>
      <label class="inline-item">
        <p>{{ D[4][9][0] }}: </p>
        <select v-model="D[4][9][2]" class="inline-input">
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
      <template v-for="i in 12">
        <label class="label-item" v-if="i > 9">
          <p class="label-text">{{ D[4][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[4][i][1]" v-model="D[4][i][2]">
        </label>
      </template>
      <label class="label-item">
        <p class="label-text">{{ D[4][13][0] }}:</p>
        <DatePicker v-model="D[4][13][2]" :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input class="label-input" :value="inputValue" v-on="inputEvents" />
          </template>
        </DatePicker>
      </label>
    </template>
    <template v-if="current === 6">
      <label v-for="i in 4" class="label-item">
        <p class="label-text">{{ D[5][i - 1][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[5][i - 1][1]" v-model="D[5][i - 1][2]">
      </label>
      <Toggle v-model="D[5][4][2]" class="my-2">{{ D[5][4][0] }}</Toggle>
      <label class="label-item">
        <p class="label-text"> {{ D[5][5][0] }}: </p>
        <RegionSelector v-model="D[5][5][2]" />
      </label>
      <template v-for="i in 8">
        <label class="label-item" v-if="i > 5">
          <p class="label-text">{{ D[5][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[5][i][1]" v-model="D[5][i][2]">
        </label>
      </template>
      <label class="inline-item">
        <p>{{ D[5][9][0] }}: </p>
        <select v-model="D[5][9][2]" class="inline-input">
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
      <template v-for="i in 12">
        <label class="label-item" v-if="i > 9">
          <p class="label-text">{{ D[5][i][0] }}:</p>
          <input class="label-input" type="text" :placeholder="D[5][i][1]" v-model="D[5][i][2]">
        </label>
      </template>
      <label class="label-item">
        <p class="label-text">{{ D[5][13][0] }}:</p>
        <DatePicker v-model="D[5][13][2]" :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input class="label-input" :value="inputValue" v-on="inputEvents" />
          </template>
        </DatePicker>
      </label>
    </template>
    <template v-if="current === 7">
      <Toggle v-model="D[6][0][2]" class="my-2">{{ D[6][0][0] }}</Toggle>
      <label class="inline-item">
        <p>{{ D[6][1][0] }}: </p>
        <select v-model="D[6][1][2]" class="inline-input">
          <option disabled value="">请选择</option>
          <option value="步行">步行</option>
          <option value="自行车(含摩托车、电动自行车)">自行车(含摩托车、电动自行车)</option>
          <option value="公共交通(含城市公交、农村客运、地铁)">公共交通(含城市公交、农村客运、地铁)</option>
          <option value="家长自行接送">家长自行接送</option>
          <option value="校车">校车</option>
        </select>
      </label>
      <label class="label-item">
        <p class="label-text">{{ D[6][2][0] }}:</p>
        <input class="label-input" type="text" :placeholder="D[6][2][1]" v-model="D[6][2][2]">
      </label>
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
