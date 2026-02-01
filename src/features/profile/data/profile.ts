import { Profile } from "@/types/profile";
// 選手詳細画像
import Ryo1 from "@/public/profile/ryo/ryo1.jpeg";
import Yama1 from "@/public/profile/yama/Yama1.jpeg";
import Ayumu1 from "@/public/profile/ayumu/ayumu1.jpeg";
import Ayumu2 from "@/public/profile/ayumu/ayumu2.jpeg";
import Hikaru1 from "@/public/profile/hikaru/hikaru1.jpeg";
import Kagawa1 from "@/public/profile/kagawa/kagawa1.jpeg";
import Kagawa2 from "@/public/profile/kagawa/kagawa2.jpeg";
import Oono1 from "@/public/profile/oono/oono1.jpeg";
import Oono2 from "@/public/profile/oono/oono2.jpeg";
import Yudai1 from "@/public/profile/yudai/yudai1.jpeg";
import Yasuto1 from "@/public/profile/yasuto/yasuto1.jpeg";
import Tani1 from "@/public/profile/tani/tani1.jpeg";
import AT1 from "@/public/profile/AT/AT1.jpeg";
import Youdai1 from "@/public/profile/youdai/youdai1.jpeg";
import Takishima1 from "@/public/profile/takishima/takishima1.jpeg";
import Koida1 from "@/public/profile/koida/koida1.jpeg";
import Koba1 from "@/public/profile/koba/koba1.jpeg";
import GARI1 from "@/public/profile/gari/GARI1.jpeg";
import KAITO1 from "@/public/profile/kaito/KAITO1.jpeg";

// GKデータ
export const goalkeepers: Profile[] = [
  {
    number: "23",
    position: "GK",
    name: "深見陽大",
    englishName: "YOUDAI FUKAMI",
    img: null,
    detail: {
      images: [Youdai1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "6",
              goal: "0",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
      ],
    },
  },
  {
    number: "27",
    position: "GK",
    name: "木村有貴",
    englishName: "YUUKI KIMURA",
    img: null,
  },
  {
    number: "28",
    position: "GK",
    name: "滝島皐",
    englishName: "SATHUKI TAKISHIMA",
    img: null,
    detail: {
      images: [Takishima1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "5",
              goal: "0",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "4", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
      ],
    },
  },
];

// DFデータ
export const defenders: Profile[] = [
  {
    number: "4",
    name: "賀川優斗",
    position: "CB/CDM",
    englishName: "YUUTO KAGAWA",
    img: null,
    detail: {
      images: [Kagawa1, Kagawa2],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "2",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [
            { year: "2024", gameCount: "5", goal: "1", assist: "0" },
            { year: "2023", gameCount: "6", goal: "1", assist: "0" },
            { year: "2022", gameCount: "7", goal: "1", assist: "4" },
          ],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [
            { year: "2024", gameCount: "1", goal: "0", assist: "0" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "1" },
            { year: "2022", gameCount: "1", goal: "1", assist: "0" },
          ],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "2" },
            { year: "2023", gameCount: "1", goal: "0", assist: "2" },
          ],
        },
      ],
    },
  },
  {
    number: "6",
    name: "石川靖人",
    position: "CB/RB",
    englishName: "YASUTO ISHIKAWA",
    img: null,
    detail: {
      images: [Yasuto1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "10",
              goal: "1",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "5", goal: "0", assist: "0" }],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
      ],
    },
  },
  {
    number: "15",
    name: "木南海斗",
    position: "LB",
    englishName: "KAITO KINAMI",
    img: null,
    detail: {
      images: [KAITO1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "0",
              assist: "0",
            },
          ],
        },
        // {
        //   competition: "川口市社会人サッカーリーグ",
        //   contents: [{ year: "2024", gameCount: "5", goal: "0", assist: "0" }],
        // },
        // {
        //   competition: "全国クラブ選手権埼玉県予選",
        //   contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        // },
        // {
        //   competition: "南部地区ブロック決勝大会",
        //   contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        // },
        // {
        //   competition: "会長杯1次ラウンド兼彩の国カップ",
        //   contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        // },
      ],
    },
  },

  // {
  //   number: "22",
  //   name: "高柳智",
  //   englishName: "SATOSHI TAKAYANAGI",
  //   img: SATOSHITAKANAYAGI_IMG,
  // },
  {
    number: "26",
    name: "大野莉久",
    position: "LB/RB/CB",
    englishName: "RIKU OONO",
    img: null,
    detail: {
      images: [Oono2, Oono1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "0",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [
            { year: "2024", gameCount: "5", goal: "0", assist: "0" },
            { year: "2023", gameCount: "6", goal: "0", assist: "0" },
            { year: "2022", gameCount: "7", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [
            { year: "2024", gameCount: "1", goal: "0", assist: "0" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "0" },
            { year: "2022", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "0" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
      ],
    },
  },
  {
    number: "33",
    name: "相馬海音",
    position: "CB",
    englishName: "MION SOUMA",
    img: null,
  },
  {
    number: "99",
    name: "小飯田豪",
    position: "CB",
    englishName: "GOU KOIDA",
    img: null,
    detail: {
      images: [Koida1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "5",
              goal: "0",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [
            { year: "2024", gameCount: "5", goal: "0", assist: "0" },
            { year: "2023", gameCount: "6", goal: "0", assist: "0" },
            { year: "2022", gameCount: "7", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "0" },
            { year: "2022", gameCount: "1", goal: "1", assist: "0" },
          ],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "0" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
      ],
    },
  },
];

// MFデータ
export const midfielders: Profile[] = [
  {
    number: "5",
    position: "CM/CDM/OMF/CB/LB/RB",
    name: "谷侑樹",
    englishName: "YUUKI TANI",
    img: null,
    detail: {
      images: [Tani1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "8",
              goal: "0",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "5", goal: "1", assist: "0" }],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
      ],
    },
  },

  {
    number: "7",
    name: "浅子太我",
    position: "CDM",
    englishName: "TAIGA ASAKO",
    img: null,
    detail: {
      images: [AT1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "10",
              goal: "1",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "5", goal: "0", assist: "0" }],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
      ],
    },
  },
  {
    number: "8",
    name: "中田湧大",
    position: "CM",
    englishName: "YUUDAI NAKATA",
    img: null,
    detail: {
      images: [Yudai1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "1",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [
            { year: "2024", gameCount: "5", goal: "1", assist: "0" },
            { year: "2023", gameCount: "6", goal: "0", assist: "0" },
            { year: "2022", gameCount: "7", goal: "1", assist: "1" },
          ],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [
            { year: "2024", gameCount: "1", goal: "0", assist: "0" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "0" },
            { year: "2022", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [
            { year: "2024", gameCount: "3", goal: "0", assist: "0" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
      ],
    },
  },

  {
    number: "10",
    position: "CM/CDM",
    name: "横山博一",
    englishName: "HIROKAZU YOKOYAMA",
    img: null,
    detail: {
      images: [GARI1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "3",
              assist: "1",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2023", gameCount: "2", goal: "1", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
      ],
    },
  },
  {
    number: "13",
    name: "岩瀬輝",
    englishName: "HIKARU IWASE",
    position: "RW/RB/LW",
    img: null,
    detail: {
      images: [Hikaru1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "2",
              assist: "3",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "5", goal: "0", assist: "0" }],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [{ year: "2024", gameCount: "3", goal: "2", assist: "1" }],
        },
      ],
    },
  },
  {
    number: "14",
    name: "小林凌",
    position: "LW/LB",
    englishName: "RYOU KOBAYASHI",
    img: null,
    detail: {
      images: [Koba1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "2",
              goal: "0",
              assist: "0",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "2", goal: "0", assist: "0" }],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
      ],
    },
  },
  {
    number: "16",
    position: "CM",
    name: "宮野太郎",
    englishName: "TAROU MIYANO",
    img: null,
  },
  {
    number: "17",
    name: "山口大貴",
    position: "CM/OMF",
    englishName: "DAIKI YAMAGUCHI",
    img: null,
    detail: {
      images: [Yama1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "1",
              assist: "1",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [
            { year: "2024", gameCount: "5", goal: "0", assist: "2" },
            { year: "2023", gameCount: "6", goal: "1", assist: "0" },
            { year: "2022", gameCount: "7", goal: "2", assist: "4" },
          ],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [
            { year: "2024", gameCount: "1", goal: "0", assist: "0" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [
            { year: "2024", gameCount: "3", goal: "1", assist: "0" },
            { year: "2022", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [
            { year: "2024", gameCount: "3", goal: "1", assist: "0" },
            { year: "2023", gameCount: "1", goal: "1", assist: "0" },
          ],
        },
      ],
    },
  },
  {
    number: "22",
    position: "CM",
    name: "河口朝陽",
    englishName: "ASAHI KAWAGUCHI",
    img: null,
  },
  {
    number: "29",
    name: "大山ごう",
    position: "",
    englishName: "GOU OYAMA",
    img: null,
    isNew: true,
  },
  {
    number: "",
    position: "CM",
    name: "春川由瑛斗",
    englishName: "YUITO HARUKAWA",
    img: null,
    isNew: true,
  },
];

// FWデータ
export const forwards: Profile[] = [
  {
    number: "9",
    name: "榎本歩夢",
    position: "CF/RW",
    englishName: "AYUMU ENOMOTO",
    img: null,
    detail: {
      images: [Ayumu2, Ayumu1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "10",
              goal: "5",
              assist: "2",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [{ year: "2024", gameCount: "5", goal: "1", assist: "0" }],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [{ year: "2024", gameCount: "3", goal: "3", assist: "0" }],
        },
      ],
    },
  },
  {
    number: "11",
    name: "武田康希",
    position: "CM",
    englishName: "KOUKI TAKEDA",
    img: null,
    detail: {
      images: [],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "11",
              goal: "1",
              assist: "1",
            },
          ],
        },
        // {
        //   competition: "川口市社会人サッカーリーグ",
        //   contents: [{ year: "2024", gameCount: "5", goal: "0", assist: "0" }],
        // },
        // {
        //   competition: "全国クラブ選手権埼玉県予選",
        //   contents: [{ year: "2024", gameCount: "1", goal: "0", assist: "0" }],
        // },
        // {
        //   competition: "南部地区ブロック決勝大会",
        //   contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        // },
        // {
        //   competition: "会長杯1次ラウンド兼彩の国カップ",
        //   contents: [{ year: "2024", gameCount: "3", goal: "0", assist: "0" }],
        // },
      ],
    },
  },
  {
    number: "12",
    name: "多田未来",
    position: "CF",
    englishName: "TADA MIKURU",
    img: null,
  },
  {
    number: "18",
    name: "石川諒",
    position: "LW/CF/OMF",
    englishName: "RYOU ISHIKAWA",
    img: null,
    detail: {
      images: [Ryo1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [
            {
              year: "2025",
              gameCount: "10",
              goal: "4",
              assist: "3",
            },
          ],
        },
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [
            { year: "2024", gameCount: "5", goal: "3", assist: "0" },
            { year: "2023", gameCount: "6", goal: "2", assist: "0" },
            { year: "2022", gameCount: "7", goal: "10", assist: "0" },
          ],
        },
        {
          competition: "全国クラブ選手権埼玉県予選",
          contents: [
            { year: "2024", gameCount: "1", goal: "1", assist: "0" },
            { year: "2023", gameCount: "1", goal: "2", assist: "0" },
          ],
        },
        {
          competition: "南部地区ブロック決勝大会",
          contents: [
            { year: "2024", gameCount: "3", goal: "1", assist: "0" },
            { year: "2022", gameCount: "1", goal: "1", assist: "0" },
          ],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [
            { year: "2024", gameCount: "3", goal: "3", assist: "1" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
      ],
    },
  },
  {
    number: "20",
    name: "黒岩亮太",
    position: "CF/RB/LB",
    englishName: "RYOUTA KUROIWA",
    img: null,
  },
];
