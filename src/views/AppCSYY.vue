<script setup>
import srpc from '../utils/srpc-local.js'
import state from '../state.js'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'
const route = useRoute()
srpc('https://a.aauth.link/other')

const token = route.query.token
const parseDate = t => moment(t).fromNow()

const U = ['', '', '', 'U0131', 'U0129', 'U0127', 'U0125', 'U0123', 'U0121', '', 'U0119', 'U0117',
'U0115', 'U0113', 'U0111', 'U0109', 'U0107', 'U0105', 'U0103', 'U0101', 'U0102',
'U0104', 'U0106', 'U0108', 'U0110', 'U0112', 'U0114', 'U0116', 'U0118', '', 'U0120',
'U0122', 'U0124', 'U0126', 'U0128', 'U0130', '', '', '', '', '', '', 'U0231', 'U0229', 'U0227',
'U0225', 'U0223', 'U0221', '', 'U0219', 'U0217', 'U0215', 'U0213', 'U0211', 'U0209',
'U0207', 'U0205', 'U0203', 'U0201', 'U0202', 'U0204', 'U0206', 'U0208', 'U0210',
'U0212', 'U0214', 'U0216', 'U0218', '', 'U0220', 'U0222', 'U0224', 'U0226', 'U0228',
'U0230', '', '', '', '', '', '', 'U0331', 'U0329', 'U0327', 'U0325', 'U0323', 'U0321', '', 'U0319',
'U0317', 'U0315', 'U0313', 'U0311', 'U0309', 'U0307', 'U0305', 'U0303', 'U0301',
'U0302', 'U0304', 'U0306', 'U0308', 'U0310', 'U0312', 'U0314', 'U0316', 'U0318', '',
'U0320', 'U0322', 'U0324', 'U0326', 'U0328', 'U0330', '', '', '', '', '', '', 'U0431', 'U0429',
'U0427', 'U0425', 'U0423', 'U0421', '', 'U0419', 'U0417', 'U0415', 'U0413', 'U0411',
'U0409', 'U0407', 'U0405', 'U0403', 'U0401', 'U0402', 'U0404', 'U0406', 'U0408',
'U0410', 'U0412', 'U0414', 'U0416', 'U0418', '', 'U0420', 'U0422', 'U0424', 'U0426',
'U0428', 'U0430', '', '', '', '', '', '', 'U0531', 'U0529', 'U0527', 'U0525', 'U0523', 'U0521', '',
'U0519', 'U0517', 'U0515', 'U0513', 'U0511', 'U0509', 'U0507', 'U0505', 'U0503',
'U0501', 'U0502', 'U0504', 'U0506', 'U0508', 'U0510', 'U0512', 'U0514', 'U0516',
'U0518', '', 'U0520', 'U0522', 'U0524', 'U0526', 'U0528', 'U0530', '', '', '', '', '', '', 'U0631',
'U0629', 'U0627', 'U0625', 'U0623', 'U0621', '', 'U0619', 'U0617', 'U0615', 'U0613',
'U0611', 'U0609', 'U0607', 'U0605', 'U0603', 'U0601', 'U0602', 'U0604', 'U0606',
'U0608', 'U0610', 'U0612', 'U0614', 'U0616', 'U0618', '', 'U0620', 'U0622', 'U0624',
'U0626', 'U0628', 'U0630', '', '', '', '', '', '', 'U0731', 'U0729', 'U0727', 'U0725', 'U0723',
'U0721', '', 'U0719', 'U0717', 'U0715', 'U0713', 'U0711', 'U0709', 'U0707', 'U0705',
'U0703', 'U0701', 'U0702', 'U0704', 'U0706', 'U0708', 'U0710', 'U0712', 'U0714',
'U0716', 'U0718', '', 'U0720', 'U0722', 'U0724', 'U0726', 'U0728', 'U0730', '', '', '']
const L = ['', '', '', 'L0131', 'L0129', 'L0127', 'L0125', 'L0123', 'L0121', '', 'L0119', 'L0117',
'L0115', 'L0113', 'L0111', 'L0109', 'L0107', 'L0105', 'L0103', 'L0101', 'L0102', 'L0104',
'L0106', 'L0108', 'L0110', 'L0112', 'L0114', 'L0116', 'L0118', '', 'L0120', 'L0122',
'L0124', 'L0126', 'L0128', 'L0130', '', '', '', '', '', 'L0233', 'L0231', 'L0229', 'L0227',
'L0225', 'L0223', 'L0221', '', 'L0219', 'L0217', 'L0215', 'L0213', 'L0211', 'L0209',
'L0207', 'L0205', 'L0203', 'L0201', 'L0202', 'L0204', 'L0206', 'L0208', 'L0210',
'L0212', 'L0214', 'L0216', 'L0218', '', 'L0220', 'L0222', 'L0224', 'L0226', 'L0228',
'L0230', 'L0232', '', '', '', '', 'L0333', 'L0331', 'L0329', 'L0327', 'L0325', 'L0323',
'L0321', '', 'L0319', 'L0317', 'L0315', 'L0313', 'L0311', 'L0309', 'L0307', 'L0305',
'L0303', 'L0301', 'L0302', 'L0304', 'L0306', 'L0308', 'L0310', 'L0312', 'L0314',
'L0316', 'L0318', '', 'L0320', 'L0322', 'L0324', 'L0326', 'L0328', 'L0330', 'L0332', '', '',
'', '', 'L0433', 'L0431', 'L0429', 'L0427', 'L0425', 'L0423', 'L0421', '', 'L0419', 'L0417',
'L0415', 'L0413', 'L0411', 'L0409', 'L0407', 'L0405', 'L0403', 'L0401', 'L0402',
'L0404', 'L0406', 'L0408', 'L0410', 'L0412', 'L0414', 'L0416', 'L0418', '', 'L0420',
'L0422', 'L0424', 'L0426', 'L0428', 'L0430', 'L0432', '', '', '', '', 'L0533', 'L0531',
'L0529', 'L0527', 'L0525', 'L0523', 'L0521', '', 'L0519', 'L0517', 'L0515', 'L0513',
'L0511', 'L0509', 'L0507', 'L0505', 'L0503', 'L0501', 'L0502', 'L0504', 'L0506',
'L0508', 'L0510', 'L0512', 'L0514', 'L0516', 'L0518', '', 'L0520', 'L0522', 'L0524',
'L0526', 'L0528', 'L0530', 'L0532', '', '', '', '', 'L0633', 'L0631', 'L0629', 'L0627',
'L0625', 'L0623', 'L0621', '', 'L0619', 'L0617', 'L0615', 'L0613', 'L0611', 'L0609',
'L0607', 'L0605', 'L0603', 'L0601', 'L0602', 'L0604', 'L0606', 'L0608', 'L0610',
'L0612', 'L0614', 'L0616', 'L0618', '', 'L0620', 'L0622', 'L0624', 'L0626', 'L0628',
'L0630', 'L0632', '', '', '', '', 'L0733', 'L0731', 'L0729', 'L0727', 'L0725', 'L0723',
'L0721', '', 'L0719', 'L0717', 'L0715', 'L0713', 'L0711', 'L0709', 'L0707', 'L0705',
'L0703', 'L0701', 'L0702', 'L0704', 'L0706', 'L0708', 'L0710', 'L0712', 'L0714',
'L0716', 'L0718', '', 'L0720', 'L0722', 'L0724', 'L0726', 'L0728', 'L0730', 'L0732', '', '',
'', 'L0835', 'L0833', 'L0831', 'L0829', 'L0827', 'L0825', 'L0823', 'L0821', '', 'L0819',
'L0817', 'L0815', 'L0813', 'L0811', 'L0809', 'L0807', 'L0805', 'L0803', 'L0801',
'L0802', 'L0804', 'L0806', 'L0808', 'L0810', 'L0812', 'L0814', 'L0816', 'L0818', '',
'L0820', 'L0822', 'L0824', 'L0826', 'L0828', 'L0830', 'L0832', 'L0834', '', '', 'L0935',
'L0933', 'L0931', 'L0929', 'L0927', 'L0925', 'L0923', 'L0921', '', 'L0919', 'L0917',
'L0915', 'L0913', 'L0911', 'L0909', 'L0907', 'L0905', 'L0903', 'L0901', 'L0902',
'L0904', 'L0906', 'L0908', 'L0910', 'L0912', 'L0914', 'L0916', 'L0918', '', 'L0920',
'L0922', 'L0924', 'L0926', 'L0928', 'L0930', 'L0932', 'L0934', '', '', '', '', 'L1031',
'L1029', 'L1027', 'L1025', 'L1023', 'L1021', '', 'L1019', 'L1017', 'L1015', 'L1013',
'L1011', 'L1009', 'L1007', 'L1005', 'L1003', 'L1001', 'L1002', 'L1004', 'L1006',
'L1008', 'L1010', 'L1012', 'L1014', 'L1016', 'L1018', '', 'L1020', 'L1022', 'L1024',
'L1026', 'L1028', 'L1030', '', '', '', '', '', '', 'L1131', 'L1129', 'L1127', 'L1125', 'L1123',
'L1121', '', 'L1119', 'L1117', 'L1115', 'L1113', 'L1111', 'L1109', 'L1107', 'L1105', 'L1103',
'L1101', 'L1102', 'L1104', 'L1106', 'L1108', 'L1110', 'L1112', 'L1114', 'L1116', 'L1118',
'', 'L1120', 'L1122', 'L1124', 'L1126', 'L1128', 'L1130', '', '', '', '', '', '', 'L1231', 'L1229',
'L1227', 'L1225', 'L1223', 'L1221', '', 'L1219', 'L1217', 'L1215', 'L1213', 'L1211',
'L1209', 'L1207', 'L1205', 'L1203', 'L1201', 'L1202', 'L1204', 'L1206', 'L1208',
'L1210', 'L1212', 'L1214', 'L1216', 'L1218', '', 'L1220', 'L1222', 'L1224', 'L1226',
'L1228', 'L1230', '', '', '', '', '', '', 'L1331', 'L1329', 'L1327', 'L1325', 'L1323', 'L1321', '',
'L1319', 'L1317', 'L1315', 'L1313', 'L1311', 'L1309', 'L1307', 'L1305', 'L1303',
'L1301', 'L1302', 'L1304', 'L1306', 'L1308', 'L1310', 'L1312', 'L1314', 'L1316',
'L1318', '', 'L1320', 'L1322', 'L1324', 'L1326', 'L1328', 'L1330', '', '', '', '', '', '', 'L1431',
'L1429', 'L1427', 'L1425', 'L1423', 'L1421', '', 'L1419', 'L1417', 'L1415', 'L1413',
'L1411', 'L1409', 'L1407', 'L1405', 'L1403', 'L1401', 'L1402', 'L1404', 'L1406',
'L1408', 'L1410', 'L1412', 'L1414', 'L1416', 'L1418', '', 'L1420', 'L1422', 'L1424',
'L1426', 'L1428', 'L1430', '', '', '', '', '', '', 'L1531', 'L1529', 'L1527', 'L1525', 'L1523',
'L1521', '', 'L1519', 'L1517', 'L1515', 'L1513', 'L1511', 'L1509', 'L1507', 'L1505',
'L1503', 'L1501', 'L1502', 'L1504', 'L1506', 'L1508', 'L1510', 'L1512', 'L1514',
'L1516', 'L1518', '', 'L1520', 'L1522', 'L1524', 'L1526', 'L1528', 'L1530', '', '', '', '', '', '',
'L1631', 'L1629', 'L1627', 'L1625', 'L1623', 'L1621', '', 'L1619', 'L1617', 'L1615',
'L1613', 'L1611', 'L1609', 'L1607', 'L1605', 'L1603', 'L1601', 'L1602', 'L1604',
'L1606', 'L1608', 'L1610', 'L1612', 'L1614', 'L1616', 'L1618', '', 'L1620', 'L1622',
'L1624', 'L1626', 'L1628', 'L1630', '', '', '', '', 'L1735', 'L1733', 'L1731', 'L1729',
'L1727', 'L1725', 'L1723', 'L1721', '', 'L1719', 'L1717', 'L1715', 'L1713', 'L1711',
'L1709', 'L1707', 'L1705', 'L1703', 'L1701', 'L1702', 'L1704', 'L1706', 'L1708',
'L1710', 'L1712', 'L1714', 'L1716', 'L1718', '', 'L1720', 'L1722', 'L1724', 'L1726',
'L1728', 'L1730', 'L1732', 'L1734', '', '', 'L1835', 'L1833', 'L1831',
'L1829', 'L1827', 'L1825', 'L1823', 'L1821', '', 'L1819', 'L1817', 'L1815', 'L1813',
'L1811', 'L1809', 'L1807', 'L1805', 'L1803', 'L1801', 'L1802', 'L1804', 'L1806',
'L1808', 'L1810', 'L1812', 'L1814', 'L1816', 'L1818', '', 'L1820', 'L1822', 'L1824',
'L1826', 'L1828', 'L1830', 'L1832', 'L1834', '', '', 'L1935', 'L1933',
'L1931', 'L1929', 'L1927', 'L1925', 'L1923', 'L1921', '', '', '', '', 'L1913', 'L1911',
'L1909', 'L1907', 'L1905', 'L1903', 'L1901', 'L1902', 'L1904', 'L1906', 'L1908',
'L1910', 'L1912', '', '', '', '', 'L1920', 'L1922', 'L1924', 'L1926', 'L1928', 'L1930',
'L1932', 'L1934', '']
let showCover = $ref(true), showIntro = $ref(true), showInput = $ref(false), showPayment = $ref(false), showAdmin = $ref(false)
let selected = $ref({}), data = $ref({})
let occupied = $ref({})

async function init () {
  state.loading = true
  occupied = token ? await srpc.csyy.admin.get(token) : await srpc.csyy.get()
  showCover = false
  showIntro = false
  showInput = false
  showPayment = false
  showAdmin = false
  state.loading = false
}

function getType (k) {
  if (!k) return
  if (k[0] === 'U') return 'D'
  if (k[1] === '0' && k[2] === '1' && k[3] < 2) return 'S'
  if (k[1] === '0' && k[2] > 1 && k[2] < 9 && k[3] < 2) return 'A'
  if (k[1] === '1' && (k[2] > 4 || k[2] > 2 && k[3] > 1)) return 'C'
  return 'B'
}

function getClass (k) {
  if (!k) return 'bg-white'
  if (token) {
    if (!occupied[k]?.status) return 'bg-gray-400'
    switch (occupied[k].status) {
      case 1: return 'bg-red-400'
      case 2: return 'bg-orange-400'
      case 3: return 'bg-sky-500'
    }
  }
  if (occupied[k]) return 'bg-gray-400'
  if (getType(k) === 'S') return 'bg-rose-400'
  if (getType(k) === 'A') return 'bg-orange-400'
  if (getType(k) === 'B') return 'bg-purple-400'
  if (getType(k) === 'C') return 'bg-cyan-400'
  if (getType(k) === 'D') return 'bg-sky-500'
}

function getText (k) {
  return (k[0] === 'U' ? '二楼' : '一楼') + k.substring(1, 3) + '排' + k.substring(3) + '座（' + getType(k) + '类）'
}

function select (k) {
  if (!k) return
  if (token) {
    showAdmin = { k }
    if (occupied[k].time) showAdmin = { k, ...occupied[k] }
    selected = { [k]: true }
    if (!showAdmin.label) return
    for (const k in occupied) {
      if (occupied[k].label === showAdmin.label) selected[k] = true
    }
    return
  }
  if (occupied[k]) return
  if (selected[k]) delete selected[k]
  else selected[k] = true
}

let price = $computed(() => {
  let sum = 0
  for (const k in selected) {
    if (getType(k) === 'A') sum += 128
    if (getType(k) === 'B') sum += 88
    if (getType(k) === 'C') sum += 58
    if (getType(k) === 'D') sum += 38
  }
  return sum
})

async function submit () {
  state.loading = true
  try {
    const res = await srpc.csyy.book(Object.keys(selected), data.name, data.wx, data.phone)
    if (res.ok) {
      await Swal.fire('订单创建成功！', '请抓紧时间支付，超时将取消订单', 'success')
      showPayment = res.label
    } else {
      await Swal.fire('创建订单失败', res.err, 'error')
      await init()
    }
    state.loading = false
  } catch {
    Swal.fire('订单创建失败！', '请更换浏览器重试', 'error')
  }
}

async function setStatus (s) {
  if (!token) return
  state.loading = true
  for (const k in selected) {
    if (!s) occupied[k] = {}
    else {
      occupied[k].status = s
      occupied[k].time = Date.now()
    }
    await srpc.csyy.admin.update(token, k, occupied[k])
  }
  state.loading = false
}

function showImg (url) {
  Swal.fire({
    html: `<img style="max-height: 80vh; margin: 0 auto;" src="${url}">`
  })
}
</script>

<template>
  <div class="flex flex-col w-full h-screen justify-center items-center bg-cover fixed z-30 top-0 all-transition" :class="showCover ? 'left-0' : '-left-full'" style="background-image: url(https://img1.imgtp.com/2023/07/12/AK87Bzca.jpg)">
    <div class="text-2xl text-white">扬州中学</div>
    <h2 class="text-4xl sm:text-6xl font-bold text-white m-6">慈善义演</h2>
    <button class="bg-white py-2 px-4 rounded shadow all-transition hover:shadow-md font-bold m-10" @click="showCover = false">点击购票</button>
  </div>
  <div class="w-full h-screen justify-center items-center bg-white fixed z-20 top-0 left-0 p-4 sm:p-10 overflow-y-auto" v-if="showIntro">
    <h2 class="text-2xl sm:text-4xl font-bold m-6">扬州中学慈善义演</h2>
    <p class="m-2">江苏省扬州中学作为具有浓厚人文情怀的百年名校，素有举办慈善义演活动的传统，往届活动均获得高度评价，成果丰硕，至今募捐善款金额已逾二十万元。除义演门票收入外，活动现场亦有丰富周边进行售卖，周边售卖所获收益去除成本后将与门票收入共同成为善款，捐赠至扬州红十字会。</p>
    <p class="m-2 font-bold">2023，第九届扬州中学慈善义演如约而至。</p>
    <p class="m-2">本届义演主题为<b>“爱逾山海，善行无疆”</b>。我们坚信每一片善心、每一个善举都能打破时间和空间的阻碍，点亮世界的每一处角落。在义演的舞台上，我们愿与您共同见证热爱与精彩，梦想与情怀。</p>
    <h3 class="text-lg font-bold m-2">义演具体信息如下：</h3>
    <p class="m-2">1、<b>活动时间：7月22日下午4:00—6:00</b><br>活动时长约为两小时，现场将在<b>下午3:00</b>开始检票入场，请您预留充足时间，绿色出行，从<b>扬州中学东门（淮海路20号）</b>进入，在演出正式开始前五分钟入座，以避免影响自己与他人的观看体验。<br>为避免现场拥堵，除现场取票外，您可选择在<b>7月20和21日的早晨9:00至下午5:00</b>前往<b>扬州中学东门传达室</b>提前兑票，并于义演当天凭票入场（如有条件，推荐提前兑票）。</p>
    <p class="m-2">2、<b>活动地点：江苏省扬州中学实验楼2楼报告厅</b><br>入校后请关注<b>检票处</b>位置，在检票处凭<b>短信核验码和姓名</b>核验门票，再领取<b>纸质票</b>入场。</p>
    <p class="m-2">3、活动购票方式：点击文末链接网址进入网站，根据流程指引进行线上选座购票（不支持退票），购票后将有确认短信发至手机，请注意查收。</p>
    <p class="m-2"><b>7月18日中午12:00</b>前购票的观众将获得随票附赠的<b>主题徽章</b>一套，将于现场验票时随纸质票一并发放。购买<b>A区票将附赠主题帆布包一件</b>，将放置于预定的座位上。</p>
    <p class="m-2">4、活动观看指南<br>演出前，请您将手机及时静音，演出过程中，请您遵守观赏之礼，遵循现场秩序，避免大声交谈，踢踏座椅等不文明行为，专心观赏演出，礼貌予以喝彩，爱护会场环境，及时清理垃圾。</p>
    <p class="m-2">感谢您的支持与配合，江苏省扬州中学慈善义演，期待您的到来。</p>
    <p class="m-2">如关于购票流程有任何疑问，或购票出现问题，请致电客服18752712819（工作时间8:00-21:00）</p>
    <button class="bg-blue-500 text-white py-2 px-4 rounded shadow all-transition hover:shadow-md font-bold my-4 mx-2 mb-20" @click="init">点击购票</button>
  </div>
  <div class="flex flex-col w-full justify-around items-center py-4">
    <h1 class="my-4 text-xl font-bold">扬州中学慈善义演购票</h1>
    <p>报告厅座位示意图</p>
    <img class="w-72 my-2" src="https://img1.imgtp.com/2023/07/11/u0Xqc46I.png">
    <p class="text-sm my-2 text-gray-500">请在下方点击选择座位, <b class="text-black">左右拖动</b>可查看全部座位</p>
    <p class="text-sm">7月18日中午12:00前购票将获赠主题徽章一套</p>
    <p class="text-sm my-2">每张A区票（橙色）将附赠主题帆布包一件</p>
    <div class="text m-1 p-1">一楼座位表</div>
    <div>（舞台）</div>
    <div class="grid m-2 max-w-full overflow-x-auto" style="grid-template-columns: repeat(39, 1fr);">
      <div v-for="k in L" class="border w-6 h-6 cursor-pointer text-xs flex items-center justify-center text-gray-600" :class="[getClass(k), selected[k] ? 'brightness-125' : '']" @click="select(k)">{{ k.substring(3) }}</div>
    </div>
    <div class="text m-1 p-1">二楼座位表</div>
    <div class="grid m-2 max-w-full overflow-x-auto" style="grid-template-columns: repeat(39, 1fr);">
      <div v-for="k in U" class="border w-6 h-6 cursor-pointer text-xs flex items-center justify-center text-gray-600" :class="[getClass(k), selected[k] ? 'brightness-125' : '']" @click="select(k)">{{ k.substring(3) }}</div>
    </div>
    <div class="flex items-center justify-end w-full">
      <p class="text-xs text-gray-500">您已选择{{ Object.keys(selected).length }}个座位</p>
      <button class="rounded all-transition font-bold text-white px-4 py-1 m-2" :class="Object.keys(selected).length ? 'bg-blue-600' : 'bg-gray-500'" :disabled="!Object.keys(selected).length" @click="showInput = true">查看选择</button>
    </div>
  </div>
  <Transition name="fade">
    <div class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-20" v-if="showInput || showAdmin" @click="showInput = showAdmin = false" />
  </Transition>
  <div class="fixed top-0 md:w-1/3 w-11/12 h-screen bg-white all-transition z-20 px-10 py-4 overflow-y-auto" :class="showInput ? 'right-0' : '-right-full'">
    <div class="text-xl font-bold my-1">您已选择：</div>
    <div class="my-1 flex items-center" v-for="(v, k) in selected">
      - {{ getText(k) }}
      <div v-if="getType(k) === 'A'" class="text-xs">赠帆布包</div>
      <XMarkIcon class="text-red-500 w-4 ml-1 cursor-pointer" @click="delete selected[k]" />
    </div>
    <div class="flex items-center">
      <div class="font-bold">合计金额：{{ price }}元</div>
      <div class="mx-2 text-xs">赠主题徽章</div>
    </div>
    <hr class="my-2">
    <div class="my-2">
      <div class="text-lg font-bold my-1 mt-4">姓名：</div>
      <input class="w-4/5 rounded px-2 py-1 border my-1 w-full" placeholder="请输入您的真实姓名"  v-model="data.name">
    </div>
    <div class="my-2">
      <div class="text-lg font-bold my-1">手机号：</div>
      <input class="w-4/5 rounded px-2 py-1 border my-1 w-full" placeholder="请输入您的手机号"  v-model="data.phone">
    </div>
    <div class="my-2">
      <div class="text-lg font-bold my-1">微信号：</div>
      <input class="w-4/5 rounded px-2 py-1 border my-1 w-full" placeholder="请输入您的微信号" v-model="data.wx">
      <div><a @click="showImg('https://img1.imgtp.com/2023/07/11/xVqCNzx6.jpg')" class="text-blue-400 text-sm underline underline-offset-1">如何查询微信号？</a></div>
    </div>
    <div class="flex items-center my-4">
      <button class="rounded all-transition font-bold text-white px-4 py-1" :class="data.name && data.wx && data.phone && Object.keys(selected).length ? 'bg-blue-600' : 'bg-gray-500'" :disabled="!(data.name && data.wx && data.phone && Object.keys(selected).length)" @click="submit">提交</button>
      <p class="text-gray-500 text-xs ml-2">如需返回选座请轻触屏幕左侧</p>
    </div>
  </div>
  <div class="fixed top-0 md:w-1/3 w-11/12 h-screen bg-white all-transition z-20 px-10 py-4 overflow-y-auto" :class="showAdmin ? 'right-0' : '-right-full'">
    <div class="text-xl font-bold my-1" v-if="showAdmin">管理： {{ getText(showAdmin?.k) }}</div>
    <div class="my-1 flex items-center" v-for="(v, k) in selected">
      <span :class="getClass(k)">- {{ getText(k) }}</span>
      <XMarkIcon class="text-red-500 w-4 ml-2 cursor-pointer" @click="delete selected[k]" />
    </div>
    <div class="font-bold">合计金额：{{ price }}元 ({{ showAdmin.label }})</div>
    <hr class="my-2">
    <div>姓名：{{ showAdmin.name }}</div>
    <div>手机号：{{ showAdmin.phone }}</div>
    <div>微信号：{{ showAdmin.wx }}</div>
    <div>{{ parseDate(showAdmin.time) }}</div>
    <div class="flex flex-col">
      <button class="bg-gray-500 py-1 px-3 rounded shadow all-transition hover:shadow-md my-2 text-white font-bold" @click="setStatus(0)">！！设为未售出！！</button>
      <button class="bg-red-500 py-1 px-3 rounded shadow all-transition hover:shadow-md my-2 text-white font-bold" @click="setStatus(1)">设为未付款</button>
      <button class="bg-orange-500 py-1 px-3 rounded shadow all-transition hover:shadow-md my-2 text-white font-bold" @click="setStatus(2)">设为已付款</button>
      <button class="bg-sky-500 py-1 px-3 rounded shadow all-transition hover:shadow-md my-2 text-white font-bold" @click="setStatus(3)">设为已取票</button>
    </div>
    <p class="my-2 text-xs">【扬州中学慈善义演】您的订单{{ showAdmin.label }}已确认，凭此短信取票并领取主题徽章。您可选择在7月20和21日的9:00-17:00前往扬州中学东门传达室提前兑票。您的座位是：{{ Object.keys(selected).map(getText).join('，') }}</p>
  </div>
  <div class="flex flex-col w-full h-screen justify-center items-center fixed top-0 left-0 z-30 bg-white" v-if="showPayment">
    <h2 class="text-3xl sm:text-6xl font-bold m-6">共需支付{{ price }}元</h2>
    <p class="text-2xl"><b class="text-red-500">请在支付时备注<code>{{ showPayment }}</code></b></p>
    <p><a @click="showImg('https://img1.imgtp.com/2023/07/11/SLrnawtO.png')" class="text-blue-400 text-sm underline underline-offset-1">如何添加备注？</a></p>
    <p class="m-2">支付完成后请等待工作人员审核！</p>
    <p >审核通过后您会收到短信通知</p>
    <img class="w-64 my-5" src="https://img1.imgtp.com/2023/07/11/bX72JFRN.png">
  </div>
  
</template>