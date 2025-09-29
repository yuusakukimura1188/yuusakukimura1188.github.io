// --- モーショングラフィックスのデータ ---
const motionGraphicsData = [
    {
        id: 1,
        title: "ネオ・サイバーパルス",
        description: "未来都市の電脳空間をイメージした、グリッチと流体アニメーションの実験作。",
        downloadUrl: "motion_01_cyberpulse.zip", // ダウンロードファイル名 (ダミー)
        imagePlaceholder: "https://placehold.co/400x225/250f61/a5f3fc?text=NEO+01",
    },
    {
        id: 2,
        title: "オーロラ・グリッド",
        description: "ホログラフィックなグリッドが、幻想的なオーロラの光に包まれるループアニメーション。",
        downloadUrl: "motion_02_auroragrid.zip", // ダウンロードファイル名 (ダミー)
        imagePlaceholder: "https://placehold.co/400x225/6d28d9/fbcfe8?text=AURORA+02",
    },
    {
        id: 3,
        title: "シンギュラリティ・エッジ",
        description: "技術的特異点をテーマにした、高速でシャープなトランジションエフェクト集。",
        downloadUrl: "motion_03_singularity.zip", // ダウンロードファイル名 (ダミー)
        imagePlaceholder: "https://placehold.co/400x225/be185d/fecdd3?text=EDGE+03",
    },
    {
        id: 4,
        title: "フローティング・マター",
        description: "低速で漂う抽象的な粒子と、柔らかな光の屈折を表現したミニマルな作品。",
        downloadUrl: "motion_04_floating.zip", // ダウンロードファイル名 (ダミー)
        imagePlaceholder: "https://placehold.co/400x225/0891b2/e0f7fa?text=FLOW+04",
    },
];

// --- DOM要素を生成する関数 ---
function createMotionGraphicCard(data) {
    // カードのコンテナ要素: カスタムCSSクラス 'motion-card' を適用
    const card = document.createElement('div');
    card.className = 'motion-card';
    
    // 画像/動画のプレースホルダー
    const media = document.createElement('img');
    media.src = data.imagePlaceholder;
    media.alt = data.title + "のプレビュー";
    media.className = 'card-media'; // カスタムCSSクラス 'card-media' を適用

    // タイトル
    const title = document.createElement('h2');
    title.textContent = data.title;
    title.className = 'card-title'; // カスタムCSSクラス 'card-title' を適用

    // 説明
    const description = document.createElement('p');
    description.textContent = data.description;
    description.className = 'card-description'; // カスタムCSSクラス 'card-description' を適用

    // ダウンロードボタン
    const downloadButton = document.createElement('a');
    downloadButton.href = data.downloadUrl;
    downloadButton.download = data.downloadUrl; // ブラウザにファイル名として提案させる
    downloadButton.textContent = 'ダウンロード';
    downloadButton.className = 'download-btn'; // カスタムCSSクラス 'download-btn' を適用
    
    // ボタンがクリックされたときのフィードバック (ダウンロードはダミー)
    downloadButton.onclick = (e) => {
        // 実際にはサーバーからのファイル応答が必要です。ここではUX改善のための処理のみ。
        console.log(`${data.title} (${data.downloadUrl}) をダウンロード開始...`);
        
        const originalText = downloadButton.textContent;
        // ダウンロード中を示すクラス 'downloading' を適用
        downloadButton.textContent = 'ダウンロード中...';
        downloadButton.classList.add('downloading');
        downloadButton.classList.remove('download-btn');

        // NOTE: カスタムモーダルがないため、コンソールログで完了を通知し、元の状態に戻します。
        setTimeout(() => {
            console.log(`${data.title} のダウンロード処理が開始されました。`);
            downloadButton.textContent = originalText;
            downloadButton.classList.add('download-btn');
            downloadButton.classList.remove('downloading');
        }, 1000);
        
        // リンクの即時遷移を防ぐ
        e.preventDefault();
    };

    // カードに要素を追加
    card.appendChild(media);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(downloadButton);

    return card;
}

// --- ページのロード時にカードをレンダリング ---
window.onload = function() {
    const listContainer = document.getElementById('motion-graphics-list');
    
    if (listContainer) {
        motionGraphicsData.forEach(data => {
            const card = createMotionGraphicCard(data);
            listContainer.appendChild(card);
        });
    } else {
        console.error("コンテンツコンテナ要素が見つかりませんでした。");
    }
};