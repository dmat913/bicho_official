import { Profile } from "@/types/profile";
import YUUKITANI_IMG from "@/public/profile/YUUKITANI.png";
import HIKARUIWASE_IMG from "@/public/profile/HIKARUIWASE.png";
import YUUTOKAGAWA_IMG from "@/public/profile/YUUTOKAGAWA.png";
import RYOUISHIKAWA_IMG from "@/public/profile/RYOUISHIKAWA.png";
import YUDAINAKATA_IMG from "@/public/profile/YUDAINAKATA.png";
import SATHUKITAKISHIMA_IMG from "@/public/profile/SATHUKITAKISHIMA.png";
// import SATOSHITAKANAYAGI_IMG from "@/public/profile/SATOSHITAKAYANAGI.png";
import AYUMUENOMOTO_IMG from "@/public/profile/AYUMUENOMOTO.png";
import DAIKIYAMAGUCHI_IMG from "@/public/profile/DAIKIYAMAGUCHI.png";
import YUUKIKIMURA_IMG from "@/public/profile/YUUKIKIMURA.png";
import GARI_IMG from "@/public/profile/GARI.png";
import NAONUKUI_IMG from "@/public/profile/NAONUKUI.png";
import GOUKOIDA_IMG from "@/public/profile/GOUKOIDA.png";
import TAIGAASAKO_IMG from "@/public/profile/TAIGAASAKO.png";
import RYOUKOBAYASHI_IMG from "@/public/profile/RYOUKOBAYASHI.png";
import YASUTOISHIKAWA_IMG from "@/public/profile/YASUTOISHIKAWA.png";
import RIKUOONO_IMG from "@/public/profile/RIKUOONO.png";

// 選手詳細画像
import Ryo1 from "@/public/profile/ryo/ryo1.jpeg";
import Yama1 from "@/public/profile/yama/Yama1.jpeg";
import Ayumu1 from "@/public/profile/ayumu/ayumu1.jpeg";
import Ayumu2 from "@/public/profile/ayumu/ayumu2.jpeg";
import Hikaru1 from "@/public/profile/hikaru/hikaru1.jpeg";
import Kagawa1 from "@/public/profile/kagawa/kagawa1.jpeg";
import Kagawa2 from "@/public/profile/kagawa/kagawa2.jpeg";
import Nao1 from "@/public/profile/nao/nao1.jpeg";
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
import GARI1 from "@/public/profile/gari/GARI1.jpeg"
import KAITO1 from "@/public/profile/kaito/KAITO1.jpeg"

// GKデータ
export const goalkeepers: Profile[] = [
  {
    number: "1",
    position: "GK",
    name: "広瀬空",
    englishName: "SORA HIROSE",
    img: null,
    isNew: true
  },
  {
    number: "21",
    position: "GK",
    name: "深見陽大",
    englishName: "YOUDAI FUKAMI",
    img: null,
    detail: {
      images: [Youdai1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "2",
            goal: "0",
            assist: "0"
        }]},
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
    img: YUUKIKIMURA_IMG,
  },
  {
    number: "28",
    position: "GK",
    name: "滝島皐",
    englishName: "SATHUKI TAKISHIMA",
    img: SATHUKITAKISHIMA_IMG,
    detail: {
      images: [Takishima1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "1",
            goal: "0",
            assist: "0"
        }]},
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
  {
    number: "30",
    position: "GK",
    name: "和田晃輝",
    englishName: "KOUKI WADA",
    img: null,
  },
];

// DFデータ
export const defenders: Profile[] = [
  {
    number: "2",
    name: "石川靖人",
    position: "CB/RB",
    englishName: "YASUTO ISHIKAWA",
    img: YASUTOISHIKAWA_IMG,
    detail: {
      images: [Yasuto1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "0",
            assist: "0"
        }]},
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
    number: "3",
    name: "木南海斗",
    position: "LB",
    englishName: "KAITO KINAMI",
    img: null,
    isNew: true,
    detail: {
      images: [KAITO1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "0",
            assist: "0"
        }]},
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
    number: "4",
    name: "賀川優斗",
    position: "CB/CDM",
    englishName: "YUUTO KAGAWA",
    img: YUUTOKAGAWA_IMG,
    detail: {
      images: [Kagawa1, Kagawa2],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "1",
            assist: "0"
        }]},
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
    number: "5",
    name: "小飯田豪",
    position: "CB",
    englishName: "GOU KOIDA",
    img: GOUKOIDA_IMG,
    detail: {
      images: [Koida1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "2",
            goal: "0",
            assist: "0"
        }]},
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
  {
    number: "13",
    name: "柳田卓也",
    position: "CB",
    englishName: "TAKUYA YANAGIDA",
    img: null,
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
    img: RIKUOONO_IMG,
    detail: {
      images: [Oono2, Oono1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "0",
            assist: "0"
        }]},
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
];

// MFデータ
export const midfielders: Profile[] = [
  {
    number: "8",
    name: "中田湧大",
    position: "CM",
    englishName: "YUUDAI NAKATA",
    img: YUDAINAKATA_IMG,
    detail: {
      images: [Yudai1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "0",
            assist: "0"
        }]},
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
    number: "9",
    name: "小林凌",
    position: "LW/LB",
    englishName: "RYOU KOBAYASHI",
    img: RYOUKOBAYASHI_IMG,
    detail: {
      images: [Koba1],
      competitionData: [
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
    number: "10",
    position: "CM/CDM",
    name: "横山博一",
    englishName: "HIROKAZU YOKOYAMA",
    img: GARI_IMG,
    detail: {
      images: [GARI1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "1",
            assist: "0"
        }]},
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
    number: "15",
    position: "CM/CDM/OMF/CB/LB/RB",
    name: "谷侑樹",
    englishName: "YUUKI TANI",
    img: YUUKITANI_IMG,
    detail: {
      images: [Tani1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "2",
            goal: "0",
            assist: "0"
        }]},
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
    img: DAIKIYAMAGUCHI_IMG,
    detail: {
      images: [Yama1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "0",
            assist: "1"
        }]},
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
    number: "19",
    name: "岩瀬輝",
    englishName: "HIKARU IWASE",
    position: "RW/RB/LW",
    img: HIKARUIWASE_IMG,
    detail: {
      images: [Hikaru1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "2",
            assist: "1"
        }]},
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
    number: "25",
    name: "荒井克弥",
    position: "CM",
    englishName: "KATHUYA ARAI",
    img: null,
  },
  {
    number: "37",
    name: "武田康希",
    position: "CM",
    englishName: "KOUKI TAKEDA",
    img: null,
    isNew: true,
    detail: {
      images: [],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "1",
            assist: "1"
        }]},
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
    number: "41",
    name: "浅子太我",
    position: "CDM",
    englishName: "TAIGA ASAKO",
    img: TAIGAASAKO_IMG,
    detail: {
      images: [AT1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "2",
            goal: "0",
            assist: "0"
        }]},
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
];

// FWデータ
export const forwards: Profile[] = [
  {
    number: "7",
    name: "貫井直",
    position: "CF",
    englishName: "NAO NUKUI",
    img: NAONUKUI_IMG,
    detail: {
      images: [Nao1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "2",
            goal: "0",
            assist: "0"
        }]},
        {
          competition: "川口市社会人サッカーリーグ",
          contents: [
            { year: "2024", gameCount: "5", goal: "0", assist: "0" },
            { year: "2023", gameCount: "6", goal: "1", assist: "0" },
            { year: "2022", gameCount: "7", goal: "1", assist: "0" },
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
            { year: "2024", gameCount: "2", goal: "0", assist: "0" },
            { year: "2022", gameCount: "1", goal: "1", assist: "0" },
          ],
        },
        {
          competition: "会長杯1次ラウンド兼彩の国カップ",
          contents: [
            { year: "2024", gameCount: "2", goal: "2", assist: "3" },
            { year: "2023", gameCount: "1", goal: "0", assist: "0" },
          ],
        },
      ],
    },
  },
  {
    number: "11",
    name: "榎本歩夢",
    position: "CF/RW",
    englishName: "AYUMU ENOMOTO",
    img: AYUMUENOMOTO_IMG,
    detail: {
      images: [Ayumu2, Ayumu1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "1",
            assist: "1"
        }]},
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
    img: RYOUISHIKAWA_IMG,
    detail: {
      images: [Ryo1],
      competitionData: [
        {
          competition: "埼玉県南部地区3部リーグ",
          contents: [{
            year: "2025",
            gameCount: "3",
            goal: "1",
            assist: "0"
        }]},
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
  {
    number: "23",
    position: "CF",
    name: "市橋洋大",
    englishName: "YOUDAI ICHIHASHI  vc",
    img: null,
  },
  {
    number: "34",
    name: "吉沢玲音",
    position: "CF",
    englishName: "REON YOSHIZAWA",
    img: null,
    isNew: true
  },
];
