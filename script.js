'use strict';
/* ═══════════════════════════════════════════════════════════
   INDIA CRIME ANALYTICS DASHBOARD – script.js
═══════════════════════════════════════════════════════════ */

/* ─── COLOR PALETTE ─── */
const PALETTE = [
  '#3b82f6','#8b5cf6','#06b6d4','#10b981',
  '#f59e0b','#ef4444','#ec4899','#f97316',
  '#14b8a6','#a855f7'
];

const COLOR_SCHEMES = {
  default: ['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#f97316','#14b8a6','#a855f7'],
  warm:    ['#ef4444','#f97316','#f59e0b','#fbbf24','#dc2626','#b45309','#c2410c','#92400e','#7c2d12','#fde68a'],
  cool:    ['#06b6d4','#0ea5e9','#3b82f6','#6366f1','#8b5cf6','#14b8a6','#0891b2','#0284c7','#4f46e5','#7c3aed'],
  mono:    ['#94a3b8','#cbd5e1','#64748b','#475569','#334155','#1e293b','#e2e8f0','#f1f5f9','#b0bec5','#78909c']
};

let activeScheme = COLOR_SCHEMES.default;

/* ─── STATE COORDINATES ─── */
const STATE_COORDS = {
  "Uttar Pradesh":      [26.8,  80.9],
  "Maharashtra":        [19.7,  75.7],
  "Madhya Pradesh":     [22.9,  78.6],
  "Rajasthan":          [27.0,  74.2],
  "Bihar":              [25.6,  85.1],
  "West Bengal":        [22.9,  87.8],
  "Karnataka":          [15.3,  75.7],
  "Andhra Pradesh":     [15.9,  79.7],
  "Tamil Nadu":         [11.1,  78.6],
  "Gujarat":            [22.3,  71.2],
  "Odisha":             [20.9,  85.1],
  "Telangana":          [17.4,  78.5],
  "Jharkhand":          [23.6,  85.3],
  "Assam":              [26.2,  92.9],
  "Punjab":             [31.1,  75.3],
  "Haryana":            [29.1,  76.1],
  "Chhattisgarh":       [21.3,  81.9],
  "Kerala":             [ 9.9,  76.3],
  "Uttarakhand":        [30.1,  79.3],
  "Himachal Pradesh":   [31.1,  77.2],
  "Jammu & Kashmir":    [33.7,  76.9],
  "Delhi":              [28.7,  77.1],
  "Goa":                [15.3,  74.1],
  "Tripura":            [23.9,  91.9],
  "Manipur":            [24.7,  93.9],
  "Meghalaya":          [25.5,  91.4],
  "Nagaland":           [26.2,  94.6],
  "Sikkim":             [27.5,  88.5]
};

/* ─── CRIME DATASET (28 states × 5 years = 140 records) ─── */
const CRIME_DATA = [
  // ── Uttar Pradesh ──
  {year:2019,state:"Uttar Pradesh",murder:3200,theft:45000,robbery:8900,kidnapping:12000,assault:22000,cyber:15000,domestic:18000,fraud:9000,drugs:11000,rape:3100,total:180000,population:220000000,literacy:67.7,unemployment:4.2,crimeRate:81.8},
  {year:2020,state:"Uttar Pradesh",murder:3050,theft:42000,robbery:8200,kidnapping:11500,assault:21000,cyber:18000,domestic:17500,fraud:10000,drugs:11500,rape:2950,total:175000,population:222000000,literacy:68.1,unemployment:5.1,crimeRate:78.8},
  {year:2021,state:"Uttar Pradesh",murder:3100,theft:44000,robbery:8500,kidnapping:11800,assault:21500,cyber:21000,domestic:18200,fraud:11000,drugs:12000,rape:3000,total:182000,population:224000000,literacy:68.5,unemployment:4.8,crimeRate:81.2},
  {year:2022,state:"Uttar Pradesh",murder:3250,theft:46000,robbery:9000,kidnapping:12200,assault:22500,cyber:25000,domestic:18800,fraud:12000,drugs:12500,rape:3150,total:190000,population:226000000,literacy:69.0,unemployment:4.5,crimeRate:84.1},
  {year:2023,state:"Uttar Pradesh",murder:3300,theft:47500,robbery:9200,kidnapping:12500,assault:23000,cyber:29000,domestic:19200,fraud:13000,drugs:13000,rape:3200,total:197000,population:228000000,literacy:69.5,unemployment:4.3,crimeRate:86.4},
  // ── Maharashtra ──
  {year:2019,state:"Maharashtra",murder:2100,theft:38000,robbery:6500,kidnapping:8000,assault:16000,cyber:22000,domestic:14000,fraud:18000,drugs:9000,rape:2200,total:155000,population:120000000,literacy:82.9,unemployment:3.8,crimeRate:129.2},
  {year:2020,state:"Maharashtra",murder:1950,theft:35000,robbery:6000,kidnapping:7500,assault:15000,cyber:26000,domestic:13500,fraud:19000,drugs:9200,rape:2050,total:148000,population:121000000,literacy:83.2,unemployment:4.5,crimeRate:122.3},
  {year:2021,state:"Maharashtra",murder:2000,theft:37000,robbery:6200,kidnapping:7800,assault:15500,cyber:30000,domestic:14200,fraud:20000,drugs:9500,rape:2100,total:158000,population:122000000,literacy:83.5,unemployment:4.2,crimeRate:129.5},
  {year:2022,state:"Maharashtra",murder:2150,theft:39000,robbery:6700,kidnapping:8200,assault:16500,cyber:35000,domestic:14800,fraud:22000,drugs:10000,rape:2250,total:168000,population:123000000,literacy:83.8,unemployment:4.0,crimeRate:136.6},
  {year:2023,state:"Maharashtra",murder:2200,theft:40500,robbery:6900,kidnapping:8500,assault:17000,cyber:40000,domestic:15200,fraud:24000,drugs:10500,rape:2300,total:176000,population:124000000,literacy:84.1,unemployment:3.9,crimeRate:141.9},
  // ── Madhya Pradesh ──
  {year:2019,state:"Madhya Pradesh",murder:2800,theft:32000,robbery:7200,kidnapping:9500,assault:19000,cyber:8000,domestic:16000,fraud:7000,drugs:8500,rape:4200,total:148000,population:85000000,literacy:69.3,unemployment:3.5,crimeRate:174.1},
  {year:2020,state:"Madhya Pradesh",murder:2650,theft:30000,robbery:6800,kidnapping:9000,assault:18000,cyber:9500,domestic:15500,fraud:7500,drugs:8800,rape:4000,total:142000,population:86000000,literacy:69.7,unemployment:4.2,crimeRate:165.1},
  {year:2021,state:"Madhya Pradesh",murder:2700,theft:31500,robbery:7000,kidnapping:9200,assault:18500,cyber:11000,domestic:16200,fraud:8000,drugs:9000,rape:4100,total:150000,population:87000000,literacy:70.1,unemployment:4.0,crimeRate:172.4},
  {year:2022,state:"Madhya Pradesh",murder:2850,theft:33000,robbery:7400,kidnapping:9700,assault:19500,cyber:13000,domestic:16800,fraud:8500,drugs:9300,rape:4300,total:158000,population:88000000,literacy:70.5,unemployment:3.8,crimeRate:179.5},
  {year:2023,state:"Madhya Pradesh",murder:2900,theft:34000,robbery:7600,kidnapping:10000,assault:20000,cyber:15000,domestic:17200,fraud:9000,drugs:9600,rape:4400,total:164000,population:89000000,literacy:70.9,unemployment:3.6,crimeRate:184.3},
  // ── Rajasthan ──
  {year:2019,state:"Rajasthan",murder:1800,theft:28000,robbery:5500,kidnapping:7000,assault:14000,cyber:7000,domestic:12000,fraud:6000,drugs:7500,rape:5500,total:120000,population:80000000,literacy:66.1,unemployment:5.8,crimeRate:150.0},
  {year:2020,state:"Rajasthan",murder:1700,theft:26000,robbery:5200,kidnapping:6700,assault:13500,cyber:8500,domestic:11500,fraud:6500,drugs:7700,rape:5200,total:115000,population:81000000,literacy:66.5,unemployment:6.5,crimeRate:142.0},
  {year:2021,state:"Rajasthan",murder:1750,theft:27500,robbery:5400,kidnapping:6900,assault:14000,cyber:10000,domestic:12200,fraud:7000,drugs:7900,rape:5400,total:122000,population:82000000,literacy:66.9,unemployment:6.2,crimeRate:148.8},
  {year:2022,state:"Rajasthan",murder:1850,theft:29000,robbery:5700,kidnapping:7200,assault:14500,cyber:12000,domestic:12800,fraud:7500,drugs:8100,rape:5600,total:129000,population:83000000,literacy:67.3,unemployment:6.0,crimeRate:155.4},
  {year:2023,state:"Rajasthan",murder:1900,theft:30000,robbery:5900,kidnapping:7500,assault:15000,cyber:14000,domestic:13200,fraud:8000,drugs:8300,rape:5800,total:135000,population:84000000,literacy:67.7,unemployment:5.8,crimeRate:160.7},
  // ── Bihar ──
  {year:2019,state:"Bihar",murder:2500,theft:22000,robbery:6000,kidnapping:10000,assault:17000,cyber:4000,domestic:14000,fraud:4500,drugs:6000,rape:1200,total:110000,population:125000000,literacy:61.8,unemployment:7.2,crimeRate:88.0},
  {year:2020,state:"Bihar",murder:2350,theft:20500,robbery:5700,kidnapping:9500,assault:16000,cyber:5000,domestic:13500,fraud:5000,drugs:6200,rape:1150,total:105000,population:126000000,literacy:62.2,unemployment:8.0,crimeRate:83.3},
  {year:2021,state:"Bihar",murder:2400,theft:21500,robbery:5900,kidnapping:9800,assault:16500,cyber:6000,domestic:14200,fraud:5500,drugs:6400,rape:1180,total:112000,population:127000000,literacy:62.6,unemployment:7.8,crimeRate:88.2},
  {year:2022,state:"Bihar",murder:2550,theft:23000,robbery:6200,kidnapping:10200,assault:17500,cyber:7500,domestic:14800,fraud:6000,drugs:6600,rape:1250,total:118000,population:128000000,literacy:63.0,unemployment:7.5,crimeRate:92.2},
  {year:2023,state:"Bihar",murder:2600,theft:24000,robbery:6400,kidnapping:10500,assault:18000,cyber:9000,domestic:15200,fraud:6500,drugs:6800,rape:1280,total:124000,population:129000000,literacy:63.4,unemployment:7.3,crimeRate:96.1},
  // ── West Bengal ──
  {year:2019,state:"West Bengal",murder:1600,theft:30000,robbery:5000,kidnapping:6500,assault:13000,cyber:9000,domestic:11000,fraud:8000,drugs:7000,rape:1800,total:130000,population:100000000,literacy:76.3,unemployment:4.5,crimeRate:130.0},
  {year:2020,state:"West Bengal",murder:1500,theft:28000,robbery:4700,kidnapping:6200,assault:12500,cyber:11000,domestic:10500,fraud:8500,drugs:7200,rape:1700,total:124000,population:101000000,literacy:76.7,unemployment:5.2,crimeRate:122.8},
  {year:2021,state:"West Bengal",murder:1550,theft:29500,robbery:4900,kidnapping:6400,assault:13000,cyber:13000,domestic:11200,fraud:9000,drugs:7400,rape:1750,total:132000,population:102000000,literacy:77.1,unemployment:5.0,crimeRate:129.4},
  {year:2022,state:"West Bengal",murder:1650,theft:31000,robbery:5200,kidnapping:6700,assault:13500,cyber:15500,domestic:11800,fraud:9500,drugs:7600,rape:1850,total:140000,population:103000000,literacy:77.5,unemployment:4.8,crimeRate:135.9},
  {year:2023,state:"West Bengal",murder:1700,theft:32000,robbery:5400,kidnapping:7000,assault:14000,cyber:18000,domestic:12200,fraud:10000,drugs:7800,rape:1900,total:147000,population:104000000,literacy:77.9,unemployment:4.6,crimeRate:141.3},
  // ── Karnataka ──
  {year:2019,state:"Karnataka",murder:1400,theft:35000,robbery:4500,kidnapping:5500,assault:12000,cyber:18000,domestic:10000,fraud:15000,drugs:6500,rape:1600,total:140000,population:68000000,literacy:75.4,unemployment:3.2,crimeRate:205.9},
  {year:2020,state:"Karnataka",murder:1300,theft:33000,robbery:4200,kidnapping:5200,assault:11500,cyber:22000,domestic:9500,fraud:16000,drugs:6700,rape:1500,total:134000,population:69000000,literacy:75.8,unemployment:3.9,crimeRate:194.2},
  {year:2021,state:"Karnataka",murder:1350,theft:34500,robbery:4400,kidnapping:5400,assault:12000,cyber:26000,domestic:10200,fraud:17000,drugs:6900,rape:1550,total:143000,population:70000000,literacy:76.2,unemployment:3.7,crimeRate:204.3},
  {year:2022,state:"Karnataka",murder:1450,theft:36000,robbery:4700,kidnapping:5700,assault:12500,cyber:31000,domestic:10800,fraud:18500,drugs:7100,rape:1650,total:153000,population:71000000,literacy:76.6,unemployment:3.5,crimeRate:215.5},
  {year:2023,state:"Karnataka",murder:1500,theft:37500,robbery:4900,kidnapping:6000,assault:13000,cyber:36000,domestic:11200,fraud:20000,drugs:7300,rape:1700,total:162000,population:72000000,literacy:77.0,unemployment:3.3,crimeRate:225.0},
  // ── Andhra Pradesh ──
  {year:2019,state:"Andhra Pradesh",murder:1200,theft:25000,robbery:3800,kidnapping:4500,assault:10000,cyber:10000,domestic:9000,fraud:8000,drugs:5500,rape:1400,total:105000,population:53000000,literacy:67.0,unemployment:4.0,crimeRate:198.1},
  {year:2020,state:"Andhra Pradesh",murder:1100,theft:23000,robbery:3500,kidnapping:4200,assault:9500,cyber:12000,domestic:8500,fraud:8500,drugs:5700,rape:1300,total:100000,population:54000000,literacy:67.4,unemployment:4.7,crimeRate:185.2},
  {year:2021,state:"Andhra Pradesh",murder:1150,theft:24500,robbery:3700,kidnapping:4400,assault:10000,cyber:14000,domestic:9200,fraud:9000,drugs:5900,rape:1350,total:108000,population:55000000,literacy:67.8,unemployment:4.5,crimeRate:196.4},
  {year:2022,state:"Andhra Pradesh",murder:1250,theft:26000,robbery:4000,kidnapping:4700,assault:10500,cyber:17000,domestic:9800,fraud:9500,drugs:6100,rape:1450,total:115000,population:56000000,literacy:68.2,unemployment:4.3,crimeRate:205.4},
  {year:2023,state:"Andhra Pradesh",murder:1300,theft:27000,robbery:4200,kidnapping:5000,assault:11000,cyber:20000,domestic:10200,fraud:10000,drugs:6300,rape:1500,total:122000,population:57000000,literacy:68.6,unemployment:4.1,crimeRate:214.0},
  // ── Tamil Nadu ──
  {year:2019,state:"Tamil Nadu",murder:1100,theft:32000,robbery:3500,kidnapping:4000,assault:11000,cyber:16000,domestic:9500,fraud:14000,drugs:7000,rape:1300,total:135000,population:78000000,literacy:80.1,unemployment:3.5,crimeRate:173.1},
  {year:2020,state:"Tamil Nadu",murder:1000,theft:30000,robbery:3200,kidnapping:3800,assault:10500,cyber:19000,domestic:9000,fraud:15000,drugs:7200,rape:1200,total:128000,population:79000000,literacy:80.5,unemployment:4.2,crimeRate:162.0},
  {year:2021,state:"Tamil Nadu",murder:1050,theft:31500,robbery:3400,kidnapping:3900,assault:11000,cyber:22000,domestic:9700,fraud:16000,drugs:7400,rape:1250,total:137000,population:80000000,literacy:80.9,unemployment:4.0,crimeRate:171.3},
  {year:2022,state:"Tamil Nadu",murder:1150,theft:33000,robbery:3700,kidnapping:4100,assault:11500,cyber:26000,domestic:10300,fraud:17500,drugs:7600,rape:1350,total:146000,population:81000000,literacy:81.3,unemployment:3.8,crimeRate:180.2},
  {year:2023,state:"Tamil Nadu",murder:1200,theft:34500,robbery:3900,kidnapping:4300,assault:12000,cyber:30000,domestic:10700,fraud:19000,drugs:7800,rape:1400,total:155000,population:82000000,literacy:81.7,unemployment:3.6,crimeRate:189.0},
  // ── Gujarat ──
  {year:2019,state:"Gujarat",murder:900,theft:28000,robbery:3000,kidnapping:3500,assault:9000,cyber:12000,domestic:8000,fraud:11000,drugs:6000,rape:900,total:115000,population:65000000,literacy:78.0,unemployment:2.8,crimeRate:176.9},
  {year:2020,state:"Gujarat",murder:850,theft:26000,robbery:2800,kidnapping:3300,assault:8500,cyber:14500,domestic:7500,fraud:12000,drugs:6200,rape:850,total:110000,population:66000000,literacy:78.4,unemployment:3.5,crimeRate:166.7},
  {year:2021,state:"Gujarat",murder:880,theft:27500,robbery:2900,kidnapping:3400,assault:9000,cyber:17000,domestic:8200,fraud:13000,drugs:6400,rape:880,total:118000,population:67000000,literacy:78.8,unemployment:3.3,crimeRate:176.1},
  {year:2022,state:"Gujarat",murder:950,theft:29000,robbery:3100,kidnapping:3600,assault:9500,cyber:20000,domestic:8800,fraud:14000,drugs:6600,rape:950,total:126000,population:68000000,literacy:79.2,unemployment:3.1,crimeRate:185.3},
  {year:2023,state:"Gujarat",murder:980,theft:30000,robbery:3300,kidnapping:3800,assault:10000,cyber:23000,domestic:9200,fraud:15000,drugs:6800,rape:980,total:133000,population:69000000,literacy:79.6,unemployment:2.9,crimeRate:192.8},
  // ── Odisha ──
  {year:2019,state:"Odisha",murder:1300,theft:18000,robbery:3200,kidnapping:4000,assault:9500,cyber:4000,domestic:8500,fraud:4000,drugs:5000,rape:2200,total:90000,population:46000000,literacy:72.9,unemployment:5.5,crimeRate:195.7},
  {year:2020,state:"Odisha",murder:1200,theft:17000,robbery:3000,kidnapping:3800,assault:9000,cyber:5000,domestic:8000,fraud:4500,drugs:5200,rape:2100,total:86000,population:47000000,literacy:73.3,unemployment:6.2,crimeRate:183.0},
  {year:2021,state:"Odisha",murder:1250,theft:18000,robbery:3100,kidnapping:3900,assault:9300,cyber:6000,domestic:8700,fraud:5000,drugs:5400,rape:2150,total:92000,population:48000000,literacy:73.7,unemployment:6.0,crimeRate:191.7},
  {year:2022,state:"Odisha",murder:1350,theft:19000,robbery:3300,kidnapping:4100,assault:9800,cyber:7500,domestic:9300,fraud:5500,drugs:5600,rape:2250,total:98000,population:49000000,literacy:74.1,unemployment:5.8,crimeRate:200.0},
  {year:2023,state:"Odisha",murder:1400,theft:20000,robbery:3500,kidnapping:4300,assault:10200,cyber:9000,domestic:9700,fraud:6000,drugs:5800,rape:2300,total:104000,population:50000000,literacy:74.5,unemployment:5.6,crimeRate:208.0},
  // ── Telangana ──
  {year:2019,state:"Telangana",murder:900,theft:22000,robbery:2800,kidnapping:3500,assault:8500,cyber:14000,domestic:7500,fraud:12000,drugs:5000,rape:1000,total:100000,population:38000000,literacy:66.5,unemployment:3.8,crimeRate:263.2},
  {year:2020,state:"Telangana",murder:850,theft:20500,robbery:2600,kidnapping:3300,assault:8000,cyber:17000,domestic:7000,fraud:13000,drugs:5200,rape:950,total:96000,population:39000000,literacy:66.9,unemployment:4.5,crimeRate:246.2},
  {year:2021,state:"Telangana",murder:880,theft:21500,robbery:2700,kidnapping:3400,assault:8300,cyber:20000,domestic:7700,fraud:14000,drugs:5400,rape:980,total:103000,population:40000000,literacy:67.3,unemployment:4.3,crimeRate:257.5},
  {year:2022,state:"Telangana",murder:950,theft:23000,robbery:2900,kidnapping:3600,assault:8800,cyber:24000,domestic:8300,fraud:15500,drugs:5600,rape:1050,total:111000,population:41000000,literacy:67.7,unemployment:4.1,crimeRate:270.7},
  {year:2023,state:"Telangana",murder:980,theft:24000,robbery:3100,kidnapping:3800,assault:9200,cyber:28000,domestic:8700,fraud:17000,drugs:5800,rape:1080,total:118000,population:42000000,literacy:68.1,unemployment:3.9,crimeRate:281.0},
  // ── Jharkhand ──
  {year:2019,state:"Jharkhand",murder:1500,theft:15000,robbery:4000,kidnapping:5000,assault:10000,cyber:3000,domestic:9000,fraud:3000,drugs:4500,rape:1800,total:80000,population:38000000,literacy:66.4,unemployment:6.8,crimeRate:210.5},
  {year:2020,state:"Jharkhand",murder:1400,theft:14000,robbery:3700,kidnapping:4700,assault:9500,cyber:3800,domestic:8500,fraud:3500,drugs:4700,rape:1700,total:76000,population:39000000,literacy:66.8,unemployment:7.5,crimeRate:194.9},
  {year:2021,state:"Jharkhand",murder:1450,theft:14800,robbery:3900,kidnapping:4900,assault:9800,cyber:4500,domestic:9200,fraud:4000,drugs:4900,rape:1750,total:82000,population:40000000,literacy:67.2,unemployment:7.3,crimeRate:205.0},
  {year:2022,state:"Jharkhand",murder:1550,theft:15800,robbery:4100,kidnapping:5100,assault:10300,cyber:5500,domestic:9800,fraud:4500,drugs:5100,rape:1850,total:88000,population:41000000,literacy:67.6,unemployment:7.1,crimeRate:214.6},
  {year:2023,state:"Jharkhand",murder:1600,theft:16500,robbery:4300,kidnapping:5300,assault:10700,cyber:6500,domestic:10200,fraud:5000,drugs:5300,rape:1900,total:93000,population:42000000,literacy:68.0,unemployment:6.9,crimeRate:221.4},
  // ── Assam ──
  {year:2019,state:"Assam",murder:1100,theft:14000,robbery:3000,kidnapping:4000,assault:8000,cyber:3500,domestic:7500,fraud:3000,drugs:5500,rape:2000,total:75000,population:35000000,literacy:72.2,unemployment:6.0,crimeRate:214.3},
  {year:2020,state:"Assam",murder:1000,theft:13000,robbery:2800,kidnapping:3800,assault:7500,cyber:4500,domestic:7000,fraud:3500,drugs:5700,rape:1900,total:71000,population:36000000,literacy:72.6,unemployment:6.7,crimeRate:197.2},
  {year:2021,state:"Assam",murder:1050,theft:13800,robbery:2900,kidnapping:3900,assault:7800,cyber:5500,domestic:7700,fraud:4000,drugs:5900,rape:1950,total:77000,population:37000000,literacy:73.0,unemployment:6.5,crimeRate:208.1},
  {year:2022,state:"Assam",murder:1150,theft:14800,robbery:3100,kidnapping:4100,assault:8300,cyber:6800,domestic:8300,fraud:4500,drugs:6100,rape:2050,total:83000,population:38000000,literacy:73.4,unemployment:6.3,crimeRate:218.4},
  {year:2023,state:"Assam",murder:1200,theft:15500,robbery:3300,kidnapping:4300,assault:8700,cyber:8000,domestic:8700,fraud:5000,drugs:6300,rape:2100,total:89000,population:39000000,literacy:73.8,unemployment:6.1,crimeRate:228.2},
  // ── Punjab ──
  {year:2019,state:"Punjab",murder:1000,theft:20000,robbery:2500,kidnapping:3000,assault:8000,cyber:6000,domestic:7000,fraud:5000,drugs:8000,rape:900,total:85000,population:30000000,literacy:75.8,unemployment:4.5,crimeRate:283.3},
  {year:2020,state:"Punjab",murder:950,theft:18500,robbery:2300,kidnapping:2800,assault:7500,cyber:7500,domestic:6500,fraud:5500,drugs:8200,rape:850,total:81000,population:30500000,literacy:76.2,unemployment:5.2,crimeRate:265.6},
  {year:2021,state:"Punjab",murder:980,theft:19500,robbery:2400,kidnapping:2900,assault:7800,cyber:9000,domestic:7200,fraud:6000,drugs:8400,rape:880,total:87000,population:31000000,literacy:76.6,unemployment:5.0,crimeRate:280.6},
  {year:2022,state:"Punjab",murder:1050,theft:21000,robbery:2600,kidnapping:3100,assault:8300,cyber:11000,domestic:7800,fraud:6500,drugs:8600,rape:950,total:93000,population:31500000,literacy:77.0,unemployment:4.8,crimeRate:295.2},
  {year:2023,state:"Punjab",murder:1080,theft:22000,robbery:2800,kidnapping:3300,assault:8700,cyber:13000,domestic:8200,fraud:7000,drugs:8800,rape:980,total:99000,population:32000000,literacy:77.4,unemployment:4.6,crimeRate:309.4},
  // ── Haryana ──
  {year:2019,state:"Haryana",murder:1100,theft:22000,robbery:2800,kidnapping:3500,assault:9000,cyber:7000,domestic:8000,fraud:5500,drugs:6000,rape:1500,total:95000,population:29000000,literacy:75.6,unemployment:5.0,crimeRate:327.6},
  {year:2020,state:"Haryana",murder:1000,theft:20500,robbery:2600,kidnapping:3300,assault:8500,cyber:8500,domestic:7500,fraud:6000,drugs:6200,rape:1400,total:90000,population:29500000,literacy:76.0,unemployment:5.7,crimeRate:305.1},
  {year:2021,state:"Haryana",murder:1050,theft:21500,robbery:2700,kidnapping:3400,assault:8800,cyber:10000,domestic:8200,fraud:6500,drugs:6400,rape:1450,total:97000,population:30000000,literacy:76.4,unemployment:5.5,crimeRate:323.3},
  {year:2022,state:"Haryana",murder:1150,theft:23000,robbery:2900,kidnapping:3600,assault:9300,cyber:12000,domestic:8800,fraud:7000,drugs:6600,rape:1550,total:104000,population:30500000,literacy:76.8,unemployment:5.3,crimeRate:341.0},
  {year:2023,state:"Haryana",murder:1200,theft:24000,robbery:3100,kidnapping:3800,assault:9700,cyber:14000,domestic:9200,fraud:7500,drugs:6800,rape:1600,total:111000,population:31000000,literacy:77.2,unemployment:5.1,crimeRate:358.1},
  // ── Chhattisgarh ──
  {year:2019,state:"Chhattisgarh",murder:1400,theft:16000,robbery:3500,kidnapping:4500,assault:9000,cyber:2500,domestic:8000,fraud:2500,drugs:4000,rape:2500,total:78000,population:30000000,literacy:70.3,unemployment:4.8,crimeRate:260.0},
  {year:2020,state:"Chhattisgarh",murder:1300,theft:15000,robbery:3300,kidnapping:4300,assault:8500,cyber:3200,domestic:7500,fraud:3000,drugs:4200,rape:2400,total:74000,population:30500000,literacy:70.7,unemployment:5.5,crimeRate:242.6},
  {year:2021,state:"Chhattisgarh",murder:1350,theft:15800,robbery:3400,kidnapping:4400,assault:8800,cyber:3900,domestic:8200,fraud:3500,drugs:4400,rape:2450,total:80000,population:31000000,literacy:71.1,unemployment:5.3,crimeRate:258.1},
  {year:2022,state:"Chhattisgarh",murder:1450,theft:16800,robbery:3600,kidnapping:4600,assault:9300,cyber:4800,domestic:8800,fraud:4000,drugs:4600,rape:2550,total:86000,population:31500000,literacy:71.5,unemployment:5.1,crimeRate:273.0},
  {year:2023,state:"Chhattisgarh",murder:1500,theft:17500,robbery:3800,kidnapping:4800,assault:9700,cyber:5800,domestic:9200,fraud:4500,drugs:4800,rape:2600,total:92000,population:32000000,literacy:71.9,unemployment:4.9,crimeRate:287.5},
  // ── Kerala ──
  {year:2019,state:"Kerala",murder:500,theft:25000,robbery:1500,kidnapping:2000,assault:7000,cyber:12000,domestic:6000,fraud:10000,drugs:4000,rape:600,total:90000,population:35000000,literacy:96.2,unemployment:6.5,crimeRate:257.1},
  {year:2020,state:"Kerala",murder:470,theft:23000,robbery:1400,kidnapping:1900,assault:6500,cyber:14500,domestic:5500,fraud:11000,drugs:4200,rape:570,total:86000,population:35500000,literacy:96.4,unemployment:7.2,crimeRate:242.3},
  {year:2021,state:"Kerala",murder:490,theft:24500,robbery:1450,kidnapping:1950,assault:6800,cyber:17000,domestic:6200,fraud:12000,drugs:4400,rape:590,total:93000,population:36000000,literacy:96.6,unemployment:7.0,crimeRate:258.3},
  {year:2022,state:"Kerala",murder:520,theft:26000,robbery:1550,kidnapping:2050,assault:7200,cyber:20000,domestic:6800,fraud:13000,drugs:4600,rape:620,total:100000,population:36500000,literacy:96.8,unemployment:6.8,crimeRate:273.9},
  {year:2023,state:"Kerala",murder:540,theft:27000,robbery:1650,kidnapping:2150,assault:7600,cyber:23000,domestic:7200,fraud:14000,drugs:4800,rape:640,total:107000,population:37000000,literacy:97.0,unemployment:6.6,crimeRate:289.2},
  // ── Uttarakhand ──
  {year:2019,state:"Uttarakhand",murder:400,theft:10000,robbery:1200,kidnapping:1500,assault:4000,cyber:3000,domestic:3500,fraud:2500,drugs:2500,rape:700,total:42000,population:11000000,literacy:78.8,unemployment:4.2,crimeRate:381.8},
  {year:2020,state:"Uttarakhand",murder:380,theft:9500,robbery:1100,kidnapping:1400,assault:3800,cyber:3700,domestic:3300,fraud:2800,drugs:2600,rape:670,total:40000,population:11200000,literacy:79.2,unemployment:4.9,crimeRate:357.1},
  {year:2021,state:"Uttarakhand",murder:390,theft:10000,robbery:1150,kidnapping:1450,assault:3900,cyber:4400,domestic:3600,fraud:3100,drugs:2700,rape:690,total:43000,population:11400000,literacy:79.6,unemployment:4.7,crimeRate:377.2},
  {year:2022,state:"Uttarakhand",murder:420,theft:10700,robbery:1250,kidnapping:1550,assault:4100,cyber:5300,domestic:3900,fraud:3400,drugs:2800,rape:720,total:46000,population:11600000,literacy:80.0,unemployment:4.5,crimeRate:396.6},
  {year:2023,state:"Uttarakhand",murder:440,theft:11200,robbery:1350,kidnapping:1650,assault:4300,cyber:6200,domestic:4100,fraud:3700,drugs:2900,rape:740,total:49000,population:11800000,literacy:80.4,unemployment:4.3,crimeRate:415.3},
  // ── Himachal Pradesh ──
  {year:2019,state:"Himachal Pradesh",murder:200,theft:6000,robbery:500,kidnapping:600,assault:2000,cyber:1500,domestic:1800,fraud:1200,drugs:1500,rape:400,total:20000,population:7500000,literacy:82.8,unemployment:3.5,crimeRate:266.7},
  {year:2020,state:"Himachal Pradesh",murder:190,theft:5700,robbery:470,kidnapping:570,assault:1900,cyber:1900,domestic:1700,fraud:1350,drugs:1550,rape:380,total:19000,population:7600000,literacy:83.2,unemployment:4.2,crimeRate:250.0},
  {year:2021,state:"Himachal Pradesh",murder:195,theft:6000,robbery:490,kidnapping:590,assault:1950,cyber:2300,domestic:1850,fraud:1500,drugs:1600,rape:390,total:21000,population:7700000,literacy:83.6,unemployment:4.0,crimeRate:272.7},
  {year:2022,state:"Himachal Pradesh",murder:210,theft:6400,robbery:520,kidnapping:620,assault:2050,cyber:2800,domestic:2000,fraud:1650,drugs:1650,rape:410,total:23000,population:7800000,literacy:84.0,unemployment:3.8,crimeRate:294.9},
  {year:2023,state:"Himachal Pradesh",murder:220,theft:6700,robbery:550,kidnapping:650,assault:2150,cyber:3300,domestic:2100,fraud:1800,drugs:1700,rape:430,total:25000,population:7900000,literacy:84.4,unemployment:3.6,crimeRate:316.5},
  // ── Jammu & Kashmir ──
  {year:2019,state:"Jammu & Kashmir",murder:600,theft:8000,robbery:1500,kidnapping:2000,assault:5000,cyber:2000,domestic:4000,fraud:1500,drugs:3000,rape:500,total:40000,population:13000000,literacy:67.2,unemployment:7.5,crimeRate:307.7},
  {year:2020,state:"Jammu & Kashmir",murder:560,theft:7500,robbery:1400,kidnapping:1900,assault:4700,cyber:2500,domestic:3700,fraud:1700,drugs:3100,rape:470,total:38000,population:13200000,literacy:67.6,unemployment:8.2,crimeRate:287.9},
  {year:2021,state:"Jammu & Kashmir",murder:580,theft:7900,robbery:1450,kidnapping:1950,assault:4850,cyber:3000,domestic:4100,fraud:1900,drugs:3200,rape:490,total:41000,population:13400000,literacy:68.0,unemployment:8.0,crimeRate:306.0},
  {year:2022,state:"Jammu & Kashmir",murder:620,theft:8400,robbery:1550,kidnapping:2050,assault:5100,cyber:3600,domestic:4400,fraud:2100,drugs:3300,rape:520,total:44000,population:13600000,literacy:68.4,unemployment:7.8,crimeRate:323.5},
  {year:2023,state:"Jammu & Kashmir",murder:650,theft:8800,robbery:1650,kidnapping:2150,assault:5350,cyber:4200,domestic:4700,fraud:2300,drugs:3400,rape:540,total:47000,population:13800000,literacy:68.8,unemployment:7.6,crimeRate:340.6},
  // ── Delhi ──
  {year:2019,state:"Delhi",murder:500,theft:40000,robbery:3000,kidnapping:4000,assault:10000,cyber:20000,domestic:8000,fraud:18000,drugs:5000,rape:1600,total:145000,population:20000000,literacy:86.2,unemployment:4.8,crimeRate:725.0},
  {year:2020,state:"Delhi",murder:470,theft:37000,robbery:2800,kidnapping:3800,assault:9500,cyber:24000,domestic:7500,fraud:19000,drugs:5200,rape:1500,total:138000,population:20500000,literacy:86.6,unemployment:5.5,crimeRate:673.2},
  {year:2021,state:"Delhi",murder:490,theft:39000,robbery:2900,kidnapping:3900,assault:9800,cyber:28000,domestic:8200,fraud:20500,drugs:5400,rape:1550,total:148000,population:21000000,literacy:87.0,unemployment:5.3,crimeRate:704.8},
  {year:2022,state:"Delhi",murder:520,theft:41500,robbery:3100,kidnapping:4100,assault:10300,cyber:33000,domestic:8800,fraud:22000,drugs:5600,rape:1650,total:158000,population:21500000,literacy:87.4,unemployment:5.1,crimeRate:735.0},
  {year:2023,state:"Delhi",murder:540,theft:43000,robbery:3300,kidnapping:4300,assault:10700,cyber:38000,domestic:9200,fraud:24000,drugs:5800,rape:1700,total:167000,population:22000000,literacy:87.8,unemployment:4.9,crimeRate:759.1},
  // ── Goa ──
  {year:2019,state:"Goa",murder:80,theft:4000,robbery:300,kidnapping:200,assault:1000,cyber:1500,domestic:800,fraud:1200,drugs:600,rape:100,total:12000,population:1500000,literacy:88.7,unemployment:3.0,crimeRate:800.0},
  {year:2020,state:"Goa",murder:75,theft:3700,robbery:280,kidnapping:190,assault:950,cyber:1800,domestic:750,fraud:1300,drugs:620,rape:95,total:11500,population:1520000,literacy:89.1,unemployment:3.7,crimeRate:756.6},
  {year:2021,state:"Goa",murder:78,theft:3900,robbery:290,kidnapping:195,assault:980,cyber:2100,domestic:820,fraud:1400,drugs:640,rape:98,total:12500,population:1540000,literacy:89.5,unemployment:3.5,crimeRate:811.7},
  {year:2022,state:"Goa",murder:85,theft:4200,robbery:310,kidnapping:210,assault:1030,cyber:2500,domestic:880,fraud:1500,drugs:660,rape:105,total:13500,population:1560000,literacy:89.9,unemployment:3.3,crimeRate:865.4},
  {year:2023,state:"Goa",murder:90,theft:4400,robbery:330,kidnapping:220,assault:1080,cyber:2900,domestic:920,fraud:1600,drugs:680,rape:110,total:14500,population:1580000,literacy:90.3,unemployment:3.1,crimeRate:917.7},
  // ── Tripura ──
  {year:2019,state:"Tripura",murder:300,theft:5000,robbery:800,kidnapping:1000,assault:3000,cyber:800,domestic:2500,fraud:700,drugs:1500,rape:500,total:22000,population:4000000,literacy:87.2,unemployment:5.5,crimeRate:550.0},
  {year:2020,state:"Tripura",murder:280,theft:4700,robbery:750,kidnapping:950,assault:2800,cyber:1000,domestic:2300,fraud:800,drugs:1550,rape:470,total:21000,population:4050000,literacy:87.6,unemployment:6.2,crimeRate:518.5},
  {year:2021,state:"Tripura",murder:290,theft:4900,robbery:780,kidnapping:980,assault:2900,cyber:1200,domestic:2600,fraud:900,drugs:1600,rape:490,total:23000,population:4100000,literacy:88.0,unemployment:6.0,crimeRate:561.0},
  {year:2022,state:"Tripura",murder:310,theft:5200,robbery:820,kidnapping:1020,assault:3100,cyber:1450,domestic:2800,fraud:1000,drugs:1650,rape:520,total:25000,population:4150000,literacy:88.4,unemployment:5.8,crimeRate:602.4},
  {year:2023,state:"Tripura",murder:320,theft:5400,robbery:850,kidnapping:1050,assault:3200,cyber:1700,domestic:2950,fraud:1100,drugs:1700,rape:540,total:27000,population:4200000,literacy:88.8,unemployment:5.6,crimeRate:642.9},
  // ── Manipur ──
  {year:2019,state:"Manipur",murder:350,theft:4000,robbery:900,kidnapping:1200,assault:3500,cyber:600,domestic:2800,fraud:500,drugs:2000,rape:300,total:20000,population:3000000,literacy:76.9,unemployment:6.0,crimeRate:666.7},
  {year:2020,state:"Manipur",murder:330,theft:3800,robbery:850,kidnapping:1150,assault:3300,cyber:750,domestic:2600,fraud:580,drugs:2050,rape:280,total:19000,population:3050000,literacy:77.3,unemployment:6.7,crimeRate:623.0},
  {year:2021,state:"Manipur",murder:340,theft:4000,robbery:880,kidnapping:1180,assault:3400,cyber:900,domestic:2900,fraud:650,drugs:2100,rape:290,total:21000,population:3100000,literacy:77.7,unemployment:6.5,crimeRate:677.4},
  {year:2022,state:"Manipur",murder:360,theft:4200,robbery:920,kidnapping:1220,assault:3600,cyber:1100,domestic:3100,fraud:720,drugs:2150,rape:310,total:23000,population:3150000,literacy:78.1,unemployment:6.3,crimeRate:730.2},
  {year:2023,state:"Manipur",murder:380,theft:4400,robbery:960,kidnapping:1260,assault:3800,cyber:1300,domestic:3300,fraud:790,drugs:2200,rape:330,total:25000,population:3200000,literacy:78.5,unemployment:6.1,crimeRate:781.3},
  // ── Meghalaya ──
  {year:2019,state:"Meghalaya",murder:250,theft:3500,robbery:600,kidnapping:800,assault:2500,cyber:500,domestic:2000,fraud:400,drugs:1200,rape:250,total:16000,population:3200000,literacy:74.4,unemployment:5.8,crimeRate:500.0},
  {year:2020,state:"Meghalaya",murder:235,theft:3300,robbery:570,kidnapping:760,assault:2350,cyber:630,domestic:1880,fraud:460,drugs:1240,rape:235,total:15200,population:3250000,literacy:74.8,unemployment:6.5,crimeRate:467.7},
  {year:2021,state:"Meghalaya",murder:242,theft:3450,robbery:585,kidnapping:780,assault:2420,cyber:760,domestic:2060,fraud:520,drugs:1280,rape:242,total:16500,population:3300000,literacy:75.2,unemployment:6.3,crimeRate:500.0},
  {year:2022,state:"Meghalaya",murder:258,theft:3650,robbery:615,kidnapping:820,assault:2580,cyber:920,domestic:2220,fraud:580,drugs:1320,rape:258,total:17800,population:3350000,literacy:75.6,unemployment:6.1,crimeRate:531.3},
  {year:2023,state:"Meghalaya",murder:270,theft:3800,robbery:640,kidnapping:850,assault:2700,cyber:1080,domestic:2340,fraud:640,drugs:1360,rape:270,total:19000,population:3400000,literacy:76.0,unemployment:5.9,crimeRate:558.8},
  // ── Nagaland ──
  {year:2019,state:"Nagaland",murder:200,theft:2500,robbery:500,kidnapping:600,assault:2000,cyber:300,domestic:1500,fraud:250,drugs:1000,rape:150,total:11000,population:2100000,literacy:79.6,unemployment:7.0,crimeRate:523.8},
  {year:2020,state:"Nagaland",murder:188,theft:2350,robbery:470,kidnapping:570,assault:1880,cyber:380,domestic:1410,fraud:290,drugs:1030,rape:141,total:10500,population:2130000,literacy:80.0,unemployment:7.7,crimeRate:492.9},
  {year:2021,state:"Nagaland",murder:194,theft:2450,robbery:485,kidnapping:585,assault:1940,cyber:460,domestic:1550,fraud:330,drugs:1060,rape:146,total:11500,population:2160000,literacy:80.4,unemployment:7.5,crimeRate:532.4},
  {year:2022,state:"Nagaland",murder:206,theft:2600,robbery:515,kidnapping:615,assault:2060,cyber:560,domestic:1670,fraud:370,drugs:1090,rape:155,total:12500,population:2190000,literacy:80.8,unemployment:7.3,crimeRate:570.8},
  {year:2023,state:"Nagaland",murder:215,theft:2720,robbery:540,kidnapping:640,assault:2150,rape:162,domestic:1760,fraud:410,drugs:1120,cyber:660,total:13500,population:2220000,literacy:81.2,unemployment:7.1,crimeRate:608.1},
  // ── Sikkim ──
  {year:2019,state:"Sikkim",murder:50,theft:1200,robbery:150,kidnapping:180,assault:600,cyber:300,domestic:500,fraud:200,drugs:400,rape:60,total:4500,population:650000,literacy:81.4,unemployment:3.8,crimeRate:692.3},
  {year:2020,state:"Sikkim",murder:47,theft:1130,robbery:141,kidnapping:170,assault:564,cyber:378,domestic:470,fraud:231,drugs:412,rape:56,total:4300,population:660000,literacy:81.8,unemployment:4.5,crimeRate:651.5},
  {year:2021,state:"Sikkim",murder:49,theft:1180,robbery:147,kidnapping:176,assault:588,cyber:456,domestic:518,fraud:262,drugs:424,rape:58,total:4700,population:670000,literacy:82.2,unemployment:4.3,crimeRate:701.5},
  {year:2022,state:"Sikkim",murder:52,theft:1260,robbery:157,kidnapping:185,assault:624,cyber:552,domestic:560,fraud:293,drugs:436,rape:62,total:5100,population:680000,literacy:82.6,unemployment:4.1,crimeRate:750.0},
  {year:2023,state:"Sikkim",murder:55,theft:1320,robbery:165,kidnapping:194,assault:660,cyber:648,domestic:590,fraud:324,drugs:448,rape:65,total:5500,population:690000,literacy:83.0,unemployment:3.9,crimeRate:797.1}
];

/* ═══════════════════════════════════════════════════════════
   CHART INSTANCES REGISTRY
═══════════════════════════════════════════════════════════ */
const CHARTS = {};

function destroyChart(id) {
  if (CHARTS[id]) { CHARTS[id].destroy(); delete CHARTS[id]; }
}

/* ═══════════════════════════════════════════════════════════
   UTILITY HELPERS
═══════════════════════════════════════════════════════════ */
function getLatestYear() { return 2023; }

function filterData(opts = {}) {
  return CRIME_DATA.filter(d => {
    if (opts.year && opts.year !== 'all' && d.year !== +opts.year) return false;
    if (opts.state && opts.state !== 'all' && d.state !== opts.state) return false;
    return true;
  });
}

function groupByState(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.state]) map[d.state] = { ...d, count: 1 };
    else {
      ['murder','theft','robbery','kidnapping','assault','cyber','domestic','fraud','drugs','rape','total'].forEach(k => {
        map[d.state][k] += d[k];
      });
      map[d.state].count++;
    }
  });
  return Object.values(map);
}

function groupByYear(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.year]) map[d.year] = { year: d.year, total: 0, murder: 0, theft: 0, cyber: 0, rape: 0, drugs: 0, fraud: 0 };
    map[d.year].total    += d.total;
    map[d.year].murder   += d.murder;
    map[d.year].theft    += d.theft;
    map[d.year].cyber    += d.cyber;
    map[d.year].rape     += d.rape;
    map[d.year].drugs    += d.drugs;
    map[d.year].fraud    += d.fraud;
  });
  return Object.values(map).sort((a, b) => a.year - b.year);
}

function topNByTotal(data, n = 10) {
  return [...data].sort((a, b) => b.total - a.total).slice(0, n);
}

function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toString();
}

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════ */
function countUp(el, target, duration = 1500, isFloat = false) {
  const start = 0;
  const step = target / (duration / 16);
  let current = start;
  const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    const val = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN');
    el.innerHTML = val + suffix;
  }, 16);
}

/* ═══════════════════════════════════════════════════════════
   KPI CARDS
═══════════════════════════════════════════════════════════ */
function renderKPIs() {
  const latest = filterData({ year: getLatestYear() });
  const prev   = filterData({ year: 2019 });

  const totalLatest = latest.reduce((s, d) => s + d.total, 0);
  const totalPrev   = prev.reduce((s, d) => s + d.total, 0);
  const growth      = ((totalLatest - totalPrev) / totalPrev * 100).toFixed(1);

  const byState = groupByState(latest);
  const sorted  = [...byState].sort((a, b) => b.crimeRate - a.crimeRate);
  const mostDangerous = sorted[0].state;
  const safest        = sorted[sorted.length - 1].state;

  const totalCyber  = latest.reduce((s, d) => s + d.cyber, 0);
  const totalRape   = latest.reduce((s, d) => s + d.rape, 0);
  const womenIndex  = Math.max(0, (100 - (totalRape / totalLatest * 1000)).toFixed(1));

  const kpiTotal     = document.getElementById('kpi-total');
  const kpiStates    = document.getElementById('kpi-states');
  const kpiDangerous = document.getElementById('kpi-dangerous');
  const kpiSafest    = document.getElementById('kpi-safest');
  const kpiGrowth    = document.getElementById('kpi-growth');
  const kpiWomen     = document.getElementById('kpi-women');
  const kpiCyber     = document.getElementById('kpi-cyber');
  const kpiPredicted = document.getElementById('kpi-predicted');

  if (kpiTotal)     countUp(kpiTotal, totalLatest);
  if (kpiStates)    countUp(kpiStates, 28);
  if (kpiDangerous) kpiDangerous.textContent = mostDangerous;
  if (kpiSafest)    kpiSafest.textContent = safest;
  if (kpiGrowth)    { kpiGrowth.innerHTML = `${growth}<span>%</span>`; }
  if (kpiWomen)     countUp(kpiWomen, +womenIndex, 1500, true);
  if (kpiCyber)     countUp(kpiCyber, totalCyber);
  if (kpiPredicted) { kpiPredicted.innerHTML = `12.4<span>%</span>`; }
}

/* ═══════════════════════════════════════════════════════════
   CHART DEFAULTS
═══════════════════════════════════════════════════════════ */
function chartDefaults() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#e2e8f0', font: { size: 11 } } },
      tooltip: { backgroundColor: '#1a2540', titleColor: '#e2e8f0', bodyColor: '#94a3b8', borderColor: 'rgba(99,179,237,0.2)', borderWidth: 1 }
    },
    scales: {
      x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(99,179,237,0.08)' } },
      y: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(99,179,237,0.08)' } }
    }
  };
}

/* ═══════════════════════════════════════════════════════════
   BAR CHART – Top 10 States
═══════════════════════════════════════════════════════════ */
function renderBarChart() {
  destroyChart('barChart');
  const data = topNByTotal(groupByState(filterData({ year: 2023 })), 10);
  const ctx  = document.getElementById('barChart');
  if (!ctx) return;
  CHARTS.barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.state),
      datasets: [{
        label: 'Total Cases',
        data: data.map(d => d.total),
        backgroundColor: activeScheme.map(c => c + 'cc'),
        borderColor: activeScheme,
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      ...chartDefaults(),
      plugins: { ...chartDefaults().plugins, legend: { display: false } },
      scales: {
        x: { ...chartDefaults().scales.x, ticks: { ...chartDefaults().scales.x.ticks, maxRotation: 35 } },
        y: { ...chartDefaults().scales.y }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   LINE CHART – Yearly Trend
═══════════════════════════════════════════════════════════ */
function renderLineChart() {
  destroyChart('lineChart');
  const yearly = groupByYear(CRIME_DATA);
  const ctx    = document.getElementById('lineChart');
  if (!ctx) return;
  CHARTS.lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: yearly.map(d => d.year),
      datasets: [
        { label: 'Total Crimes', data: yearly.map(d => d.total), borderColor: activeScheme[0], backgroundColor: activeScheme[0] + '22', fill: true, tension: 0.4, pointRadius: 5, pointHoverRadius: 7 },
        { label: 'Cyber Crime',  data: yearly.map(d => d.cyber), borderColor: activeScheme[2], backgroundColor: activeScheme[2] + '22', fill: false, tension: 0.4, pointRadius: 4 },
        { label: 'Theft',        data: yearly.map(d => d.theft), borderColor: activeScheme[4], backgroundColor: activeScheme[4] + '22', fill: false, tension: 0.4, pointRadius: 4 }
      ]
    },
    options: { ...chartDefaults() }
  });
}

/* ═══════════════════════════════════════════════════════════
   DOUGHNUT CHART – Crime Type Distribution
═══════════════════════════════════════════════════════════ */
function renderDoughnut() {
  destroyChart('doughnutChart');
  const data = filterData({ year: 2023 });
  const cats = ['murder','theft','robbery','kidnapping','assault','cyber','domestic','fraud','drugs','rape'];
  const totals = cats.map(c => data.reduce((s, d) => s + d[c], 0));
  const ctx = document.getElementById('doughnutChart');
  if (!ctx) return;
  CHARTS.doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Murder','Theft','Robbery','Kidnapping','Assault','Cyber','Domestic','Fraud','Drugs','Rape'],
      datasets: [{ data: totals, backgroundColor: activeScheme, borderColor: '#111827', borderWidth: 2, hoverOffset: 8 }]
    },
    options: {
      ...chartDefaults(),
      scales: {},
      plugins: { ...chartDefaults().plugins, legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 10 }, boxWidth: 12 } } },
      cutout: '65%'
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   RADAR CHART – Multi-Category by State
═══════════════════════════════════════════════════════════ */
function renderRadar() {
  destroyChart('radarChart');
  const top5 = topNByTotal(groupByState(filterData({ year: 2023 })), 5);
  const cats  = ['murder','theft','robbery','kidnapping','assault','cyber','domestic','fraud'];
  const ctx   = document.getElementById('radarChart');
  if (!ctx) return;
  CHARTS.radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Murder','Theft','Robbery','Kidnapping','Assault','Cyber','Domestic','Fraud'],
      datasets: top5.map((d, i) => ({
        label: d.state,
        data: cats.map(c => d[c]),
        borderColor: activeScheme[i],
        backgroundColor: activeScheme[i] + '22',
        pointBackgroundColor: activeScheme[i],
        borderWidth: 2
      }))
    },
    options: {
      ...chartDefaults(),
      scales: {
        r: {
          ticks: { color: '#94a3b8', backdropColor: 'transparent', font: { size: 9 } },
          grid: { color: 'rgba(99,179,237,0.1)' },
          pointLabels: { color: '#94a3b8', font: { size: 10 } }
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   AREA CHART – Cumulative Growth
═══════════════════════════════════════════════════════════ */
function renderAreaChart() {
  destroyChart('areaChart');
  const yearly = groupByYear(CRIME_DATA);
  let cum = 0;
  const cumData = yearly.map(d => { cum += d.total; return cum; });
  const ctx = document.getElementById('areaChart');
  if (!ctx) return;
  CHARTS.areaChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: yearly.map(d => d.year),
      datasets: [{
        label: 'Cumulative Cases',
        data: cumData,
        borderColor: activeScheme[2],
        backgroundColor: `rgba(6,182,212,0.15)`,
        fill: true, tension: 0.4, pointRadius: 5, borderWidth: 2
      }]
    },
    options: { ...chartDefaults() }
  });
}

/* ═══════════════════════════════════════════════════════════
   SCATTER CHART – Population vs Crime Rate
═══════════════════════════════════════════════════════════ */
function renderScatter() {
  destroyChart('scatterChart');
  const data = groupByState(filterData({ year: 2023 }));
  const ctx  = document.getElementById('scatterChart');
  if (!ctx) return;
  CHARTS.scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'States',
        data: data.map(d => ({ x: d.population / 1e6, y: d.crimeRate, label: d.state })),
        backgroundColor: activeScheme.map(c => c + 'bb'),
        pointRadius: 7, pointHoverRadius: 10
      }]
    },
    options: {
      ...chartDefaults(),
      plugins: {
        ...chartDefaults().plugins,
        tooltip: {
          ...chartDefaults().plugins.tooltip,
          callbacks: {
            label: ctx => `${ctx.raw.label}: Pop ${ctx.raw.x.toFixed(0)}M, Rate ${ctx.raw.y}`
          }
        }
      },
      scales: {
        x: { ...chartDefaults().scales.x, title: { display: true, text: 'Population (Millions)', color: '#94a3b8' } },
        y: { ...chartDefaults().scales.y, title: { display: true, text: 'Crime Rate per 100K', color: '#94a3b8' } }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   CRIME ANALYTICS SECTION
═══════════════════════════════════════════════════════════ */
function renderCrimeAnalytics(opts = {}) {
  const data = filterData(opts);
  renderAnalyticsCatChart(data);
  renderAnalyticsAgeChart(data);
  renderHeatmap(data);
}

function renderAnalyticsCatChart(data) {
  destroyChart('analyticsCatChart');
  const cats   = ['murder','theft','robbery','kidnapping','assault','cyber','domestic','fraud','drugs','rape'];
  const labels = ['Murder','Theft','Robbery','Kidnapping','Assault','Cyber','Domestic','Fraud','Drugs','Rape'];
  const totals = cats.map(c => data.reduce((s, d) => s + d[c], 0));
  const ctx    = document.getElementById('analyticsCatChart');
  if (!ctx) return;
  CHARTS.analyticsCatChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Cases',
        data: totals,
        backgroundColor: activeScheme.map(c => c + 'cc'),
        borderColor: activeScheme,
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      ...chartDefaults(),
      plugins: { ...chartDefaults().plugins, legend: { display: false } },
      indexAxis: 'y'
    }
  });
}

function renderAnalyticsAgeChart(data) {
  destroyChart('analyticsAgeChart');
  // Simulate age distribution from total
  const total = data.reduce((s, d) => s + d.total, 0);
  const ageDist = [
    Math.round(total * 0.18),
    Math.round(total * 0.32),
    Math.round(total * 0.28),
    Math.round(total * 0.22)
  ];
  const ctx = document.getElementById('analyticsAgeChart');
  if (!ctx) return;
  CHARTS.analyticsAgeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['18–25','26–35','36–50','50+'],
      datasets: [{
        label: 'Cases by Age Group',
        data: ageDist,
        backgroundColor: [activeScheme[0]+'cc', activeScheme[1]+'cc', activeScheme[4]+'cc', activeScheme[5]+'cc'],
        borderColor: [activeScheme[0], activeScheme[1], activeScheme[4], activeScheme[5]],
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      ...chartDefaults(),
      plugins: { ...chartDefaults().plugins, legend: { display: false } }
    }
  });
}

/* ─── HEATMAP ─── */
function renderHeatmap(data) {
  const container = document.getElementById('heatmapContainer');
  if (!container) return;

  const states = [...new Set(data.map(d => d.state))].sort();
  const cats   = ['murder','theft','robbery','kidnapping','assault','cyber','domestic','fraud','drugs','rape'];
  const labels = ['Murder','Theft','Robbery','Kidnap','Assault','Cyber','Domestic','Fraud','Drugs','Rape'];

  // Aggregate per state
  const stateMap = {};
  states.forEach(s => { stateMap[s] = {}; cats.forEach(c => stateMap[s][c] = 0); });
  data.forEach(d => { cats.forEach(c => { if (stateMap[d.state]) stateMap[d.state][c] += d[c]; }); });

  // Find max per category for normalization
  const maxes = {};
  cats.forEach(c => { maxes[c] = Math.max(...states.map(s => stateMap[s][c])); });

  function heatColor(val, max) {
    const ratio = max > 0 ? val / max : 0;
    const r = Math.round(239 * ratio);
    const g = Math.round(68 + (185 - 68) * (1 - ratio));
    const b = Math.round(68 * (1 - ratio));
    return `rgba(${r},${g},${b},${0.3 + ratio * 0.65})`;
  }

  let html = '<table class="heatmap-table"><thead><tr><th>State</th>';
  labels.forEach(l => { html += `<th>${l}</th>`; });
  html += '</tr></thead><tbody>';

  states.forEach(s => {
    html += `<tr><td>${s}</td>`;
    cats.forEach(c => {
      const val = stateMap[s][c];
      const bg  = heatColor(val, maxes[c]);
      html += `<td style="background:${bg};color:#e2e8f0;">${fmt(val)}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════
   LEAFLET MAP
═══════════════════════════════════════════════════════════ */
let leafletMap = null;

function renderMap() {
  const container = document.getElementById('crimeMap');
  if (!container) return;

  if (leafletMap) { leafletMap.remove(); leafletMap = null; }

  leafletMap = L.map('crimeMap', { zoomControl: true, scrollWheelZoom: false }).setView([22.5, 82.0], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 10
  }).addTo(leafletMap);

  const latest = groupByState(filterData({ year: 2023 }));
  const maxTotal = Math.max(...latest.map(d => d.total));

  latest.forEach(d => {
    const coords = STATE_COORDS[d.state];
    if (!coords) return;
    const radius = 15 + (d.total / maxTotal) * 45;
    const color  = d.crimeRate > 400 ? '#ef4444' : d.crimeRate > 250 ? '#f59e0b' : d.crimeRate > 150 ? '#3b82f6' : '#10b981';

    L.circleMarker(coords, {
      radius,
      fillColor: color,
      color: '#fff',
      weight: 1.5,
      opacity: 0.9,
      fillOpacity: 0.55
    }).addTo(leafletMap).bindPopup(`
      <div class="map-popup">
        <strong>${d.state}</strong>
        Total Cases: <b>${d.total.toLocaleString('en-IN')}</b><br/>
        Crime Rate: <b>${d.crimeRate}</b> per 100K<br/>
        Cyber: <b>${d.cyber.toLocaleString('en-IN')}</b><br/>
        Murder: <b>${d.murder.toLocaleString('en-IN')}</b>
      </div>
    `);
  });
}

/* ═══════════════════════════════════════════════════════════
   DATATABLE
═══════════════════════════════════════════════════════════ */
let dataTableInstance = null;

function renderDataTable() {
  const tbody = document.getElementById('stateTableBody');
  if (!tbody) return;

  const data = groupByState(filterData({ year: 2023 })).sort((a, b) => b.total - a.total);

  tbody.innerHTML = data.map(d => `
    <tr>
      <td><strong>${d.state}</strong></td>
      <td>${d.total.toLocaleString('en-IN')}</td>
      <td>${d.murder.toLocaleString('en-IN')}</td>
      <td>${d.theft.toLocaleString('en-IN')}</td>
      <td>${d.cyber.toLocaleString('en-IN')}</td>
      <td><span class="badge" style="background:${d.crimeRate>400?'#ef4444':d.crimeRate>250?'#f59e0b':'#3b82f6'}">${d.crimeRate}</span></td>
      <td>${(d.population / 1e6).toFixed(1)}M</td>
    </tr>
  `).join('');

  if (dataTableInstance) { dataTableInstance.destroy(); dataTableInstance = null; }
  if (typeof $ !== 'undefined' && $.fn.DataTable) {
    dataTableInstance = $('#stateTable').DataTable({
      pageLength: 10,
      order: [[1, 'desc']],
      language: { search: 'Search states:' }
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   PREDICTION LOGIC
═══════════════════════════════════════════════════════════ */
function linearRegression(xs, ys) {
  const n  = xs.length;
  const sx = xs.reduce((a, b) => a + b, 0);
  const sy = ys.reduce((a, b) => a + b, 0);
  const sxy = xs.reduce((s, x, i) => s + x * ys[i], 0);
  const sxx = xs.reduce((s, x) => s + x * x, 0);
  const slope     = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept };
}

function predictCrime(data, years = 5) {
  const yearly = groupByYear(data);
  const xs = yearly.map(d => d.year);
  const ys = yearly.map(d => d.total);
  const { slope, intercept } = linearRegression(xs, ys);
  const lastYear = Math.max(...xs);
  return Array.from({ length: years }, (_, i) => {
    const yr = lastYear + i + 1;
    return { year: yr, predicted: Math.round(slope * yr + intercept) };
  });
}

function renderPredictions() {
  const yearly    = groupByYear(CRIME_DATA);
  const predicted = predictCrime(CRIME_DATA, 5);

  // Combined line chart
  destroyChart('predLineChart');
  const ctx1 = document.getElementById('predLineChart');
  if (ctx1) {
    CHARTS.predLineChart = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: [...yearly.map(d => d.year), ...predicted.map(d => d.year)],
        datasets: [
          {
            label: 'Historical',
            data: [...yearly.map(d => d.total), ...Array(5).fill(null)],
            borderColor: activeScheme[0],
            backgroundColor: activeScheme[0] + '22',
            fill: true, tension: 0.4, pointRadius: 5, borderWidth: 2
          },
          {
            label: 'Predicted',
            data: [...Array(yearly.length - 1).fill(null), yearly[yearly.length - 1].total, ...predicted.map(d => d.predicted)],
            borderColor: activeScheme[5],
            backgroundColor: activeScheme[5] + '22',
            fill: true, tension: 0.4, pointRadius: 5, borderWidth: 2,
            borderDash: [6, 3]
          }
        ]
      },
      options: { ...chartDefaults() }
    });
  }

  // High-risk states bar
  destroyChart('predBarChart');
  const ctx2 = document.getElementById('predBarChart');
  if (ctx2) {
    const stateData = groupByState(filterData({ year: 2023 }));
    const top8 = topNByTotal(stateData, 8);
    const { slope: s, intercept: ic } = linearRegression([2019,2020,2021,2022,2023], [1,1.02,1.05,1.08,1.12]);
    CHARTS.predBarChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: top8.map(d => d.state),
        datasets: [{
          label: 'Predicted 2028',
          data: top8.map(d => Math.round(d.total * 1.18)),
          backgroundColor: activeScheme[5] + 'cc',
          borderColor: activeScheme[5],
          borderWidth: 1, borderRadius: 5
        }, {
          label: 'Current 2023',
          data: top8.map(d => d.total),
          backgroundColor: activeScheme[0] + 'cc',
          borderColor: activeScheme[0],
          borderWidth: 1, borderRadius: 5
        }]
      },
      options: {
        ...chartDefaults(),
        scales: {
          x: { ...chartDefaults().scales.x, ticks: { ...chartDefaults().scales.x.ticks, maxRotation: 35 } },
          y: { ...chartDefaults().scales.y }
        }
      }
    });
  }

  // Prediction cards
  const yearly2 = groupByYear(CRIME_DATA);
  const cyberGrowth = ((yearly2[4].cyber - yearly2[0].cyber) / yearly2[0].cyber * 100).toFixed(0);
  const fraudGrowth = ((yearly2[4].fraud - yearly2[0].fraud) / yearly2[0].fraud * 100).toFixed(0);

  const p1 = document.getElementById('pred-stat-1');
  const p2 = document.getElementById('pred-stat-2');
  if (p1) p1.textContent = `+${Math.round(cyberGrowth * 1.4)}% by 2028`;
  if (p2) p2.textContent = `+${Math.round(fraudGrowth * 1.3)}% by 2028`;
}

/* ═══════════════════════════════════════════════════════════
   AI INSIGHTS
═══════════════════════════════════════════════════════════ */
function generateInsights(data) {
  const byState  = groupByState(filterData({ year: 2023 }));
  const sorted   = [...byState].sort((a, b) => b.crimeRate - a.crimeRate);
  const mostDang = sorted[0];
  const safest   = sorted[sorted.length - 1];

  const yearly   = groupByYear(data);
  const cyberGrowth = ((yearly[4].cyber - yearly[0].cyber) / yearly[0].cyber * 100).toFixed(1);
  const fraudGrowth = ((yearly[4].fraud - yearly[0].fraud) / yearly[0].fraud * 100).toFixed(1);
  const totalGrowth = ((yearly[4].total - yearly[0].total) / yearly[0].total * 100).toFixed(1);

  const totalCyber2023 = filterData({ year: 2023 }).reduce((s, d) => s + d.cyber, 0);
  const totalCyber2019 = filterData({ year: 2019 }).reduce((s, d) => s + d.cyber, 0);

  const highLiteracy = [...byState].sort((a, b) => b.literacy - a.literacy)[0];
  const lowLiteracy  = [...byState].sort((a, b) => a.literacy - b.literacy)[0];

  return [
    {
      icon: 'fa-triangle-exclamation', color: '#ef4444', title: 'Highest Crime Rate',
      text: `⚠️ ${mostDang.state} recorded the highest crime rate at ${mostDang.crimeRate} per 100K population in 2023, with ${mostDang.total.toLocaleString('en-IN')} total cases.`
    },
    {
      icon: 'fa-chart-line', color: '#f59e0b', title: 'Fastest Growing Crime',
      text: `📈 Cyber crimes grew by ${cyberGrowth}% from 2019 to 2023 — the fastest growing category, driven by digital payments and online fraud.`
    },
    {
      icon: 'fa-shield-halved', color: '#10b981', title: 'Safest State',
      text: `🛡️ ${safest.state} has the lowest crime rate at ${safest.crimeRate} per 100K, benefiting from strong community policing and high literacy (${safest.literacy}%).`
    },
    {
      icon: 'fa-money-bill-wave', color: '#3b82f6', title: 'Financial Fraud Surge',
      text: `💳 Financial fraud cases increased by ${fraudGrowth}% between 2019–2023, correlating with the rapid expansion of UPI transactions and digital banking.`
    },
    {
      icon: 'fa-graduation-cap', color: '#8b5cf6', title: 'Literacy & Crime Correlation',
      text: `📚 States with higher literacy (${highLiteracy.state}: ${highLiteracy.literacy}%) show lower violent crime rates, while ${lowLiteracy.state} (${lowLiteracy.literacy}% literacy) reports higher assault and kidnapping rates.`
    },
    {
      icon: 'fa-arrow-trend-up', color: '#06b6d4', title: 'Overall Crime Trend',
      text: `📊 India's total reported crimes grew by ${totalGrowth}% from 2019 to 2023. Urban states like Delhi, Maharashtra, and Karnataka account for over 35% of all cyber crime cases.`
    }
  ];
}

function typewriterEffect(el, text, speed = 18) {
  el.textContent = '';
  el.classList.add('typing-cursor');
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(timer); el.classList.remove('typing-cursor'); }
  }, speed);
}

function renderAIInsights() {
  const grid = document.getElementById('insightsGrid');
  if (!grid) return;
  const insights = generateInsights(CRIME_DATA);
  grid.innerHTML = insights.map((ins, idx) => `
    <div class="col-md-6 col-xl-4">
      <div class="insight-card">
        <div class="insight-icon" style="color:${ins.color}">
          <i class="fa ${ins.icon}"></i>
        </div>
        <div class="insight-title">${ins.title}</div>
        <div class="insight-text" id="insight-text-${idx}"></div>
      </div>
    </div>
  `).join('');

  // Staggered typewriter
  insights.forEach((ins, idx) => {
    setTimeout(() => {
      const el = document.getElementById(`insight-text-${idx}`);
      if (el) typewriterEffect(el, ins.text, 12);
    }, idx * 600);
  });
}

/* ═══════════════════════════════════════════════════════════
   SECTION NAVIGATION
═══════════════════════════════════════════════════════════ */
let currentSection = 'dashboard';

function showSection(id) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

  const section = document.getElementById(`section-${id}`);
  if (section) section.classList.add('active');

  const link = document.querySelector(`.sidebar-link[data-section="${id}"]`);
  if (link) link.classList.add('active');

  currentSection = id;

  // Lazy-render sections on first visit
  if (id === 'crime-analytics') renderCrimeAnalytics();
  if (id === 'state-analysis')  { renderMap(); renderDataTable(); }
  if (id === 'predictions')     renderPredictions();
  if (id === 'ai-insights')     renderAIInsights();
}

/* ═══════════════════════════════════════════════════════════
   FILTERS
═══════════════════════════════════════════════════════════ */
function populateFilters() {
  const stateSelect = document.getElementById('filterState');
  if (!stateSelect) return;
  const states = [...new Set(CRIME_DATA.map(d => d.state))].sort();
  states.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s; opt.textContent = s;
    stateSelect.appendChild(opt);
  });
}

function getFilterValues() {
  return {
    year:  document.getElementById('filterYear')?.value  || 'all',
    state: document.getElementById('filterState')?.value || 'all'
  };
}

function applyFilters() {
  const opts = getFilterValues();
  renderCrimeAnalytics(opts);
}

function resetFilters() {
  ['filterYear','filterState','filterCategory','filterGender','filterAge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = 'all';
  });
  renderCrimeAnalytics();
}

/* ═══════════════════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════════════════ */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('themeIcon');
  if (icon) { icon.className = isDark ? 'fa fa-sun' : 'fa fa-moon'; }
  const settingTheme = document.getElementById('settingTheme');
  if (settingTheme) settingTheme.checked = !isDark;
  // Redraw charts for new theme
  setTimeout(() => {
    if (currentSection === 'dashboard') initDashboard();
    if (currentSection === 'crime-analytics') renderCrimeAnalytics(getFilterValues());
    if (currentSection === 'predictions') renderPredictions();
  }, 100);
}

/* ═══════════════════════════════════════════════════════════
   EXPORT / SNAPSHOT / CSV
═══════════════════════════════════════════════════════════ */
function exportPDF() {
  window.print();
}

function takeSnapshot() {
  alert('Snapshot: Use your browser\'s built-in screenshot tool (Ctrl+Shift+S / Cmd+Shift+4) to capture the dashboard.\n\nFor programmatic snapshots, add html2canvas library.');
}

function uploadCSV() {
  const input = document.getElementById('csvInput');
  if (!input || !input.files.length) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const lines = e.target.result.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const parsed = lines.slice(1).map(line => {
      const vals = line.split(',');
      const obj = {};
      headers.forEach((h, i) => { obj[h] = isNaN(vals[i]) ? vals[i]?.trim() : +vals[i]; });
      return obj;
    }).filter(d => d.state && d.year);
    if (parsed.length > 0) {
      CRIME_DATA.push(...parsed);
      alert(`✅ Loaded ${parsed.length} records from CSV. Refreshing dashboard…`);
      initDashboard();
    } else {
      alert('⚠️ Could not parse CSV. Ensure columns: year, state, murder, theft, robbery, kidnapping, assault, cyber, domestic, fraud, drugs, rape, total, population, crimeRate');
    }
  };
  reader.readAsText(file);
}

/* ═══════════════════════════════════════════════════════════
   LOADING SCREEN
═══════════════════════════════════════════════════════════ */
function initLoadingScreen() {
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) screen.classList.add('hidden');
  }, 2200);
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR TOGGLE
═══════════════════════════════════════════════════════════ */
function initSidebar() {
  const toggle  = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('mainContent');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      sidebar.classList.toggle('mobile-open');
    } else {
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('expanded');
    }
  });

  // Close sidebar on mobile when clicking outside
  document.addEventListener('click', e => {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   SETTINGS
═══════════════════════════════════════════════════════════ */
function initSettings() {
  const settingTheme = document.getElementById('settingTheme');
  if (settingTheme) {
    settingTheme.addEventListener('change', toggleTheme);
  }

  const colorScheme = document.getElementById('colorScheme');
  if (colorScheme) {
    colorScheme.addEventListener('change', () => {
      activeScheme = COLOR_SCHEMES[colorScheme.value] || COLOR_SCHEMES.default;
      initDashboard();
      if (currentSection === 'crime-analytics') renderCrimeAnalytics(getFilterValues());
      if (currentSection === 'predictions') renderPredictions();
    });
  }

  const lastUpdated = document.getElementById('lastUpdated');
  if (lastUpdated) lastUpdated.textContent = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ═══════════════════════════════════════════════════════════
   INIT DASHBOARD
═══════════════════════════════════════════════════════════ */
function initDashboard() {
  renderKPIs();
  renderBarChart();
  renderLineChart();
  renderDoughnut();
  renderRadar();
  renderAreaChart();
  renderScatter();
}

/* ═══════════════════════════════════════════════════════════
   EVENT LISTENERS & BOOT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Loading screen
  initLoadingScreen();

  // Sidebar
  initSidebar();

  // Settings
  initSettings();

  // Populate filter dropdowns
  populateFilters();

  // Show dashboard
  showSection('dashboard');
  initDashboard();

  // Sidebar navigation
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      if (section) showSection(section);
      // Close mobile sidebar
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar')?.classList.remove('mobile-open');
      }
    });
  });

  // Filter buttons
  const applyBtn = document.getElementById('applyFiltersBtn');
  if (applyBtn) applyBtn.addEventListener('click', applyFilters);

  const resetBtn = document.getElementById('resetFiltersBtn');
  if (resetBtn) resetBtn.addEventListener('click', resetFilters);

  // Filter dropdowns – live update
  ['filterYear','filterState','filterCategory','filterGender','filterAge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  // Theme toggle (navbar button)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Export PDF
  const exportBtn = document.getElementById('exportPDFBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportPDF);

  // Snapshot
  const snapBtn = document.getElementById('snapshotBtn');
  if (snapBtn) snapBtn.addEventListener('click', takeSnapshot);

  // CSV Upload
  const csvInput = document.getElementById('csvInput');
  if (csvInput) csvInput.addEventListener('change', uploadCSV);

  // Render map and table after a short delay (ensures DOM is ready)
  setTimeout(() => {
    renderMap();
    renderDataTable();
  }, 2400);
});
