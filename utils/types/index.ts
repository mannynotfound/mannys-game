import type { GetAccountResult } from '@wagmi/core';
import type { TokenId } from '@/utils/types/token';

export * from '@/utils/types/token';

export type FractionsObject = {
  owner: EthAddress;
  name: string;
  drop_id: number;
  token_id: number;
  message: string;
};

export type LeaderboardObject = {
  owner: EthAddress;
  name: string | null;
  tokens: number[];
  score: number;
};

export interface LeaderboardResponse {
  data: LeaderboardObject[];
  updated_at: number;
}

export type AchievementEarnedObject = {
  achievement_id: number;
  date_earned?: number;
  tx_hash?: string;
};

export type AchievementGamersResponseObject = {
  gamer: EthAddress;
  name: string;
  achievement_id: number;
  date_earned: number;
  tx_hash?: string;
};

export type EthAddress = `0x${string}` | undefined;

export type Account = GetAccountResult & {
  ens: {
    name: string | null | undefined;
    avatar: string | null | undefined;
  };
};

export type Gamer = {
  name: string;
  tokens: number[];
};

export type CameraMeta = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  pfp_mode: boolean;
};

export type AnimationMeta = {
  id: string;
  frame: number;
  paused: boolean;
};

export type AccessoriesMeta = {
  [slot: string]: string[];
};

export type SceneMeta = {
  background_color: string;
  texture_hd: boolean;
};

export type TokenUserMetadata = {
  camera: CameraMeta;
  animation: AnimationMeta;
  accessories: AccessoriesMeta;
  scene: SceneMeta;
};

// used in this app to render manny tokens
export type Token = {
  tokenId: TokenId;
  textureUrl?: string;
  animationName?: string;
};

export type MetadataAttribute = {
  trait_type: string;
  value: string | number | boolean;
};

// json structure used in public manny token metadata
export type TokenMetadata = {
  name: string;
  token_id: number;
  description: string;
  image: string;
  texture_url: string;
  texture_url_hd: string;
  animation_url: string;
  iframe_url: string;
  attributes: MetadataAttribute[];
};

export type Achievement = {
  id: number;
  title: string;
  type: string;
  date_created: number;
  requirement: {
    text: string;
  };
  image: string;
  points: number;
};

export type Skin =
  | 'Base Common'
  | 'Base Rare'
  | 'Zombie'
  | 'Inverted'
  | 'Silver'
  | 'Stone'
  | 'Albino'
  | 'Holo'
  | 'Gold'
  | 'Blitmap'
  | 'Burnt'
  | 'Eco-Friendly'
  | 'Mannydenza'
  | 'Right-Clicked'
  | 'Rugged'
  | 'Matrix'
  | 'Skull Trooper'
  | 'Pixelated'
  | 'Poorly Drawn'
  | 'Dr. Mannyhattan'
  | 'Ditto'
  | 'Galaxy'
  | 'Captain Mannypants';

type SkinOptions = {
  tokens: number[];
  description: string;
  emoji: string;
  points: number;
  specialEdition?: boolean;
};

export const SkinsConfig: Record<Skin, SkinOptions> = {
  'Base Common': {
    tokens: [
      405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419,
      420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434,
      435, 436, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450,
      451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465,
      466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480,
      481, 482, 483, 485, 486, 487, 488, 489, 491, 492, 493, 494, 495, 496, 497,
      498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512,
      513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527,
      528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542,
      543, 545, 546, 547, 548, 549, 551, 552, 553, 554, 555, 556, 557, 558, 559,
      561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575,
      576, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591,
      592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606,
      607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621,
      622, 623, 624, 625, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 638,
      639, 640, 641, 642, 643, 644, 645, 647, 648, 649, 650, 651, 652, 653, 654,
      655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 666, 667, 668, 669, 670,
      671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685,
      686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700,
      701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 712, 713, 714, 715, 716,
      717, 719, 720, 721, 722, 723, 724, 725, 726, 727, 729, 730, 731, 732, 733,
      734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 749,
      750, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765,
      766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 781,
      782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796,
      797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 810, 811, 812,
      813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827,
      828, 829, 830, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843,
      844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858,
      859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873,
      874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888,
      889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 900, 901, 902, 904, 905,
      907, 908, 909, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922,
      923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937,
      938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952,
      953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 967, 968,
      969, 970, 971, 972, 973, 974, 975, 977, 978, 979, 980, 981, 982, 984, 985,
      986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 1000,
      1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1011, 1012, 1013,
      1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025,
      1026, 1027, 1028, 1029, 1031, 1032, 1033, 1034, 1035, 1037, 1038, 1039,
      1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051,
      1052, 1053, 1054, 1055, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064,
      1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076,
      1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1086, 1087, 1088, 1089,
      1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101,
      1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113,
      1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125,
      1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136, 1137,
      1138, 1140, 1141, 1142, 1143, 1144, 1146, 1147, 1148, 1149, 1150, 1151,
      1153, 1154, 1155, 1157, 1158, 1159, 1160, 1162, 1163, 1164, 1165, 1166,
      1167, 1168, 1169, 1170, 1171, 1172, 1173, 1175, 1176, 1177, 1178, 1179,
      1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191,
      1192, 1193, 1194, 1195, 1196, 1198, 1200, 1201, 1202, 1203, 1204, 1205,
      1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217,
      1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1229, 1230,
      1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242,
      1243, 1244, 1245, 1246, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256,
      1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268,
      1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280,
      1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1293,
      1294, 1295, 1296, 1297, 1298, 1299, 1301, 1302, 1303, 1304, 1305, 1306,
      1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1316, 1317, 1319, 1320,
      1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330, 1333, 1334,
      1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346,
      1347, 1348, 1349, 1350, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359,
      1360, 1362, 1363, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373,
      1374, 1375, 1376, 1377, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386,
      1387, 1388, 1389, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1399, 1400,
      1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412,
      1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425,
      1426, 1427, 1428, 1430, 1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438,
      1439, 1440, 1441, 1442, 1443, 1445, 1446, 1448, 1449, 1450, 1451, 1452,
      1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464,
      1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473, 1475, 1476, 1477, 1478,
      1479, 1480, 1481, 1482, 1483, 1485, 1486, 1487, 1488, 1489, 1490, 1491,
      1492, 1493, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504,
      1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1515, 1516,
      1517, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1529,
      1530, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541,
      1542, 1543, 1544, 1545, 1546, 1547, 1548, 1549, 1550, 1551, 1552, 1553,
      1554, 1555, 1556, 1557, 1558, 1559, 1560, 1561, 1562, 1564, 1566, 1567,
      1568, 1569, 1570, 1572, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581,
      1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593,
      1594, 1595, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1607,
      1608, 1609, 1610, 1611, 1612, 1613, 1614, 1615, 1616,
    ],
    description:
      'The theme every project on mint.fun gets when a contract is created',
    emoji: 'common',
    points: 1,
  },
  'Base Rare': {
    tokens: [
      1, 3, 4, 5, 6, 8, 9, 12, 14, 15, 16, 18, 19, 20, 21, 22, 25, 26, 27, 28,
      29, 30, 31, 32, 35, 37, 38, 39, 40, 41, 43, 45, 46, 48, 49, 51, 52, 53,
      54, 55, 56, 57, 61, 62, 63, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 79,
      80, 81, 82, 83, 84, 86, 87, 88, 89, 95, 96, 97, 99, 100, 101, 102, 103,
      104, 105, 106, 107, 109, 110, 111, 112, 113, 114, 116, 117, 120, 121, 129,
      130, 131, 133, 134, 135, 136, 137, 139, 140, 146, 149, 151, 152, 153, 154,
      157, 158, 159, 161, 163, 164, 166, 169, 170, 174, 175, 176, 177, 178, 181,
      183, 188, 189, 191, 193, 194, 196, 198, 200, 201, 202, 203, 204, 205, 207,
      208, 213, 214, 215, 218, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229,
      230, 233, 236, 238, 239, 243, 245, 246, 249, 250, 251, 256, 258, 259, 260,
      261, 262, 263, 264, 266, 267, 268, 269, 270, 272, 274, 275, 276, 277, 278,
      279, 280, 282, 283, 285, 286, 288, 289, 290, 292, 293, 294, 295, 296, 300,
      301, 302, 305, 307, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319,
      320, 321, 322, 323, 324, 327, 328, 330, 331, 333, 334, 336, 337, 338, 339,
      342, 343, 344, 345, 346, 347, 350, 352, 353, 354, 356, 358, 359, 360, 361,
      362, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377,
      378, 379, 380, 383, 384, 385, 386, 388, 392, 393, 394, 395, 400, 402, 403,
    ],
    description:
      'Enables multiple thumbnail images on a carousel and more custom styling',
    emoji: 'baserare',
    points: 3,
  },
  Zombie: {
    tokens: [13, 143, 180, 255, 363],
    description: 'The second most rare Manny is an homage to cryptopunks.',
    emoji: 'zombie',
    points: 10,
  },
  Inverted: {
    tokens: [
      10, 17, 44, 60, 64, 77, 78, 144, 155, 165, 168, 216, 219, 298, 329, 397,
    ],
    description: 'A rare Manny created with ctrl+i in photoshop.',
    emoji: 'inverted',
    points: 7,
  },
  Silver: {
    tokens: [
      7, 24, 66, 76, 85, 127, 148, 167, 172, 186, 210, 287, 303, 304, 348, 396,
    ],
    description: "A rare Manny paying tribute to Manny's silver collection.",
    emoji: 'silver',
    points: 7,
  },
  Stone: {
    tokens: [
      11, 33, 36, 58, 108, 138, 171, 173, 184, 190, 209, 231, 234, 244, 308,
      332,
    ],
    description: 'A rare Manny evoking materiality and sculpture.',
    emoji: 'stone',
    points: 7,
  },
  Albino: {
    tokens: [
      59, 91, 93, 94, 115, 118, 119, 141, 145, 150, 160, 179, 192, 195, 235,
      237, 271, 273, 291, 297, 325, 326, 381, 401,
    ],
    description: 'A rare Manny in the style of an albino animal.',
    emoji: 'albino',
    points: 5,
  },
  Holo: {
    tokens: [
      42, 90, 92, 98, 122, 124, 132, 156, 162, 182, 197, 206, 240, 242, 253,
      306, 335, 341, 351, 382, 387, 390, 391, 399,
    ],
    description: 'A rare Manny inspired by holographic trading cards.',
    emoji: 'holo',
    points: 5,
  },
  Gold: {
    tokens: [404],
    description: 'The holy grail of mannys.game.',
    emoji: 'gold',
    points: 100,
  },
  Blitmap: {
    tokens: [
      23, 47, 125, 128, 211, 257, 340, 1606, 1596, 1474, 976, 809, 544, 1085,
      1465, 646,
    ],
    description: 'A rare manny using cc0 artwork from the Blitmap universe.',
    specialEdition: true,
    emoji: 'blitmap',
    points: 7,
  },
  Burnt: {
    tokens: [
      2, 147, 254, 265, 349, 357, 728, 637, 1315, 906, 1364, 1571, 751, 1332,
      1413, 1228,
    ],
    description: "A rare manny that's been burnt by one too many crypto scams.",
    specialEdition: true,
    emoji: 'burnt',
    points: 7,
  },
  'Eco-Friendly': {
    tokens: [
      123, 199, 212, 217, 232, 284, 389, 1573, 718, 1494, 1565, 490, 1199, 1331,
      1318, 1156,
    ],
    description:
      'A rare manny celebrating nature, not backed by carbon offsets.',
    specialEdition: true,
    emoji: 'ecofriendly',
    points: 7,
  },
  Mannydenza: {
    tokens: [
      50, 252, 34, 247, 665, 983, 1010, 1036, 1292, 1030, 831, 1361, 550, 748,
      780, 1152,
    ],
    description:
      'A rare manny with patterns generated by one of the most versatile algorithms to date.',
    specialEdition: true,
    emoji: 'mannydenza',
    points: 7,
  },
  'Right-Clicked': {
    tokens: [
      142, 187, 241, 281, 899, 910, 1563, 1145, 577, 1390, 966, 1300, 1247,
      1174, 1056, 1484,
    ],
    description:
      "A rare manny that's been right clicked and saved by too many NFT haters.",
    specialEdition: true,
    emoji: 'rightclicked',
    points: 7,
  },
  Rugged: {
    tokens: [
      126, 185, 248, 299, 999, 1139, 626, 1161, 1398, 1378, 711, 1528, 1444,
      1447, 1197, 437,
    ],
    description:
      "A rare manny that's draped in the artwork of the finest pixel rug from rugstore.exchange.",
    specialEdition: true,
    emoji: 'rugged',
    points: 7,
  },
  Matrix: {
    tokens: [355],
    description: 'A legendary manny that took the red pill.',
    specialEdition: true,
    emoji: 'matrix',
    points: 50,
  },
  'Skull Trooper': {
    tokens: [398],
    description: 'A legendary manny that started playing in season one.',
    specialEdition: true,
    emoji: 'skulltrooper',
    points: 50,
  },
  Pixelated: {
    tokens: [903],
    description:
      'A legendary manny rendered as pixel art by artist Mykola Dosenko.',
    specialEdition: true,
    emoji: 'pixelated',
    points: 50,
  },
  'Poorly Drawn': {
    tokens: [1248],
    description: 'A legendary manny hand drawn (poorly) by the artist himself.',
    specialEdition: true,
    emoji: 'poorlydrawn',
    points: 50,
  },
  'Dr. Mannyhattan': {
    tokens: [1351],
    description: "A legendary manny who's tired of Earth.",
    specialEdition: true,
    emoji: 'drmannyhattan',
    points: 50,
  },
  Ditto: {
    tokens: [1429],
    description:
      'A legendary manny that can reconstitute its entire cellular structure into what it sees.',
    specialEdition: true,
    emoji: 'ditto',
    points: 50,
  },
  Galaxy: {
    tokens: [484],
    description: 'A legendary manny created by Mika.',
    specialEdition: true,
    emoji: 'galaxy',
    points: 50,
  },
  'Captain Mannypants': {
    tokens: [560],
    description: 'A legendary manny created by Neoboy.',
    specialEdition: true,
    emoji: 'captainmannypants',
    points: 50,
  },
};

export type Web3 = {
  account: Account;
};

export interface AppProps {
  web3: Web3;
  mannys: Token[] | undefined;
}
