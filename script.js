// --- モーショングラフィックスのデータ ---
const motionGraphicsData = [
    {
        id: 1,
        title: "円形シェイプアニメーション",
        description: "円形シェイプアニメーションのループ素材。",
        // サムネイル画像（動画がロードされるまで表示される静止画）
        imagePlaceholder: "./assets/previews/circular-shape-animation.psd", 
        // **ホバー再生用の動画ファイルパス (.mp4 推奨)**
        videoPreview: "./assets/previews/circular-shape-animation.mp4", 
        // ダウンロードファイルパス
        downloadUrl: "./assets/downloads/circular-shape-animation.zip",
    },
    {
        id: 2,
        title: "and more... ",
        description: "",
        imagePlaceholder: "./assets/previews/motion_02_auroragrid_thumb.jpg", 
        videoPreview: "./assets/previews/motion_02_auroragrid_preview.mp4", 
        downloadUrl: "./assets/downloads/motion_02_auroragrid.zip", 
    },
    {
        id: 3,
        title: "and more...",
        description: "",
        imagePlaceholder: "./assets/previews/motion_03_singularity_thumb.jpg", 
        videoPreview: "./assets/previews/motion_03_singularity_preview.mp4", 
        downloadUrl: "./assets/downloads/motion_03_singularity.zip", 
    },
    {
        id: 4,
        title: "and more...",
        description: "",
        imagePlaceholder: "./assets/previews/motion_04_floating_thumb.jpg", 
        videoPreview: "./assets/previews/motion_04_floating_preview.mp4", 
        downloadUrl: "./assets/downloads/motion_04_floating.zip", 
    },
];

// --- DOM要素を生成する関数 ---
function createMotionGraphicCard(data) {
    // カードのコンテナ要素
    const card = document.createElement('div');
    card.className = 'motion-card';
    
    // === 変更点: 画像の代わりに動画要素を生成し、ホバーイベントを設定 ===
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'card-media-container'; // アスペクト比維持用のコンテナ

    // 動画要素
    const video = document.createElement('video');
    video.className = 'card-media'; 
    video.src = data.videoPreview;
    video.poster = data.imagePlaceholder; // 動画がロードされるまで表示する画像 (サムネイル)
    video.loop = true;
    video.muted = true; // 自動再生にはmuted属性が必須
    video.setAttribute('playsinline', ''); // iOSでのインライン再生を許可
    video.preload = 'auto'; // 高速な再生開始のため

    mediaContainer.appendChild(video);
    // === 変更点 終了 ===

    // ホバーイベントリスナーの設定 (カード全体に設定)
    card.addEventListener('mouseenter', () => {
        // マウスが乗ったら再生開始し、時間をリセットしてループの初めから
        video.currentTime = 0; 
        video.play().catch(e => {
            // 自動再生がブロックされた場合の処理 (通常はmutedで解決)
            console.log("動画の自動再生に失敗しました (ブロックされた可能性):", e);
        });
    });

    card.addEventListener('mouseleave', () => {
        // マウスが離れたら一時停止
        video.pause();
    });

    // タイトル
    const title = document.createElement('h2');
    title.textContent = data.title;
    title.className = 'card-title'; 

    // 説明
    const description = document.createElement('p');
    description.textContent = data.description;
    description.className = 'card-description'; 

    // ダウンロードボタン
    const downloadButton = document.createElement('a');
    downloadButton.href = data.downloadUrl;
    downloadButton.download = data.downloadUrl.split('/').pop(); 
    downloadButton.textContent = 'ダウンロード';
    downloadButton.className = 'download-btn'; 
    
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
        // 実際にはブラウザがダウンロードを開始します。
        setTimeout(() => {
            console.log(`${data.title} のダウンロード処理が開始されました。`);
            downloadButton.textContent = originalText;
            downloadButton.classList.add('download-btn');
            downloadButton.classList.remove('downloading');
        }, 1000);
        
        // リンクの即時遷移を防ぐ
        // e.preventDefault(); // 実際にはダウンロードを許可するためコメントアウト
    };

    // カードに要素を追加
    card.appendChild(mediaContainer); // 動画コンテナを追加
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