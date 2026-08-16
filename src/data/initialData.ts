import { SiteData } from '../types';

export const initialSiteData: SiteData = {
  profile: {
    name: '柯沛絨',
    englishName: 'Pei-Jung Ke',
    school: '聖功女中',
    grade: '高中一年級',
    tagline: '喜歡戶外活動 爬山露營之類的',
    interests: ['爬山', '音樂', '露營', '科技探索'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    aboutIntro:
      '哈囉！我是沛絨，目前就讀聖功女中高一。在課業之餘，我熱愛走進大自然登山與露營，感受山林間的微風與壯麗景色；同時我也非常熱愛音樂，常常藉由吉他與音樂創作抒發心情。對我來說，學習是一場持續探索未知的冒險，我喜歡將生活中的好奇心轉化為動手實作的專題！',
    learningFocus:
      '目前主要專注於高一基礎學科紮實奠定、資訊科技與 AI 工具的實際應用，並嘗試將自然科學與戶外探索經驗結合，進行跨領域的自主學習與專案研究。',
    currentLearning:
      '正在自學 Python 程式設計基礎、自然語言與生成式 AI 工具應用、吉他彈唱技巧，以及參與學校的自然探究與實作專題課程。',
    futureGoals:
      '希望在高中三年累積更多跨領域專案成果，挑戰全國性青少年科技或環境創客競賽，並在未來進入能結合科技應用與人本關懷的理想大學科系！',
    adminEmail: 'kpr12199@gmail.com',
  },
  projects: [
    {
      id: 'proj-1',
      title: '山林生態與植物影像智慧辨識助手',
      date: '2026-03',
      category: 'AI 與資訊科技',
      summary: '結合登山興趣與現代 AI 影像辨識技術，打造適合初學者在野外快速辨識台灣常見高山植物的小工具。',
      content:
        '在多次登山過程中，我發現同行的夥伴常常好奇路邊看見的蕨類與原生植物名稱。本專案透過收集台灣中高海拔常見的 20 種植物圖片，利用輕量化 AI 影像模型進行微調訓練，並結合簡單直覺的手機網頁介面，讓登山愛好者在拍照後能快速獲得植物科屬、特徵與登山安全提醒。',
      challenge:
        '在初期收集樣本時，山區光線變化大，且部分植物在不同季節有不同形態，導致初期模型在背光或局部特寫時辨識準確率較低。',
      solution:
        '增加多種光線條件與角度的資料集擴增（Data Augmentation），並加入特徵輔助提示詞，引導使用者拍攝葉脈或花朵特寫以提升辨識精準度。',
      reflection:
        '這次專題讓我第一次體會到「科技源於生活需求」的真諦。將自己最喜歡的爬山愛好與資訊技術結合，不僅讓學習過程充滿樂趣，也深刻體會到資料品質對 AI 預測的重要性。',
      images: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      videoUrl: '',
      order: 1,
    },
    {
      id: 'proj-2',
      title: '智慧感測與避障循跡自走車',
      date: '2025-11',
      category: '機器人與創客',
      summary: '運用微控制器與超音波、紅外線感測器，設計能自主避開障礙並循黑線前進的智慧型巡邏小車。',
      content:
        '本專案為創客實作競賽項目。團隊由 3 位同學組成，我主要負責電路焊接配線、車體機構組裝以及感測器觸發邏輯的調校。小車配備了雙紅外線循線模組以及超音波測距雷達，能在遇到突發路障時主動煞車並重新規劃繞行路徑。',
      challenge:
        '在測試場地切換時，由於不同地面材質反光度差異，紅外線循線感測器的數值常產生飄移，導致小車在彎道處容易脫軌。',
      solution:
        '設計了開機自動校正（Auto Calibration）常式，讓小車在每次出發前先取樣當前地面的黑白反射臨界值，大幅提升適應力與穩定度。',
      reflection:
        '硬體除錯比純寫程式更需要耐心，一個接觸不良或感測器微小角度偏差都會影響結果。透過團隊合作與反覆實驗，我學會了系統性排查問題的方法。',
      images: [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      ],
      videoUrl: '',
      order: 2,
    },
    {
      id: 'proj-3',
      title: '從野營生活探索大自然音景與原創旋律',
      date: '2025-08',
      category: '音樂與跨領域創作',
      summary: '錄製露營時的大自然環境聲音（流水、鳥鳴、營火），並以此為靈感譜寫吉他抒情短曲。',
      content:
        '在暑假一次三天兩夜的高山露營中，我攜帶隨身收音設備記錄了清晨的鳥鳴、溪流的潺潺水聲以及夜晚劈啪作響的營火聲。回到家後，我將這些聲音作為背景氛圍音軌，並以木吉他彈奏溫暖明亮的旋律，完成了三首「山林隨想」短曲並進行數位混音。',
      challenge:
        '戶外收音時風噪聲過大，且初次使用數位音樂工作站（DAW）進行音訊降噪與多軌對齊時常感到生疏。',
      solution:
        '自製簡易防風毛套改善收音品質，並利用線上教學逐步學習 EQ 等化器與混響（Reverb）調節，讓自然環境音與吉他原聲和諧共融。',
      reflection:
        '音樂與大自然是我在忙碌學業生活中的最佳療癒方式。這項專案讓我學會數位音樂製作的基本工作流，也體會到美感與技術可以完美結合。',
      images: [
        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
      ],
      videoUrl: '',
      order: 3,
    },
  ],
  timeline: [
    {
      id: 'time-1',
      year: '2024',
      title: '第一次接觸程式設計與邏輯思維',
      description: '在國三暑假透過線上課程自學 Python 與 Scratch，啟發對運算思維與科技創作的濃厚興趣。',
      category: '基礎養成',
      order: 1,
    },
    {
      id: 'time-2',
      year: '2025',
      title: '進入聖功女中 · 參與校內科學創客社團',
      description: '展開高中生活，加入創客與機器人研習，與同學組隊完成智慧循跡自走車專案。',
      category: '校園歷程',
      order: 2,
    },
    {
      id: 'time-3',
      year: '2025',
      title: '百岳登山初體驗與大自然音景收音創作',
      description: '完成人生首座百岳登頂，並將露營山林中的自然聲響結合吉他譜寫原創樂曲。',
      category: '多元探索',
      order: 3,
    },
    {
      id: 'time-4',
      year: '2026',
      title: '自主探究專案：AI 植物生態辨識工具',
      description: '結合理科知識與生成式 AI 工具，完成第一版可實際使用的植物影像輔助辨識原型。',
      category: '自主學習',
      order: 4,
    },
    {
      id: 'time-5',
      year: '未來',
      title: '持續拓展跨領域專案與競賽挑戰',
      description: '預計參與全國青少年科技創作競賽，並持續深化環境永續與數位科技的連結。',
      category: '未來展望',
      order: 5,
    },
  ],
  skills: [
    {
      id: 'cat-1',
      name: '資訊與數位科技',
      skills: ['AI 工具應用', 'Python 基礎', '自走車與感測器', '網頁前端基礎', '邏輯思考'],
      order: 1,
    },
    {
      id: 'cat-2',
      name: '多元探索與個人專長',
      skills: ['高山徒步與登山', '露營野炊', '木吉他彈唱', '音訊錄製與混音', '自然觀察'],
      order: 2,
    },
    {
      id: 'cat-3',
      name: '軟實力與表達',
      skills: ['專案簡報與表達', '團隊溝通協作', '視覺排版設計', '自主學習規劃', '反思日誌撰寫'],
      order: 3,
    },
  ],
  updatedAt: new Date().toISOString(),
};
