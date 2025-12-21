#!/bin/bash

# =================================================================
# YISHEN GLOBAL V5.0 - SOVEREIGN DEPLOYMENT PROTOCOL
# 作用: 全量同步本地资产至远程母舰服务器
# 指令: ./deploy.sh
# =================================================================

# --- [配置区] ---
# 请将以下信息修改为您服务器的真实数据
REMOTE_USER="root"
REMOTE_HOST="您的服务器IP地址"
REMOTE_DIR="/var/www/yishenglobal" # 您的网站在服务器上的物理路径

echo -e "\033[1;34m// INITIATING_SOVEREIGN_IGNITION...\033[0m"

# --- [第一步：环境自检] ---
if [ ! -f "index.html" ]; then
    echo -e "\033[1;31m[ERROR] 未在当前目录发现 index.html，请确保在根目录下执行！\033[0m"
    exit 1
fi

# --- [第二步：全量资产对撞] ---
# 使用 rsync 进行增量同步，速度最快且最稳定
echo -e "\033[1;32m// SYNCING_CORE_NODES: HTML, Assets, Sovereignty_Vault...\033[0m"

rsync -avz --progress \
    --exclude '.git' \
    --exclude 'deploy.sh' \
    --exclude 'link_fixer.py' \
    --exclude '.DS_Store' \
    ./ $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

# --- [第三步：权限与主权校准] ---
# 自动修复服务器上的权限，防止 403 访问受限或 PDF 无法下载
echo -e "\033[1;34m// CALIBRATING_PERMISSION_MATRIX...\033[0m"

ssh $REMOTE_USER@$REMOTE_HOST << EOF
    chown -R www-data:www-data $REMOTE_DIR
    find $REMOTE_DIR -type d -exec chmod 755 {} \;
    find $REMOTE_DIR -type f -exec chmod 644 {} \;
    echo "// REMOTE_PERMISSIONS_LOCKED"
EOF

# --- [第四步：清理与完成] ---
echo -e "\033[1;33m"
echo "=========================================================="
echo "// MISSION_ACCOMPLISHED: V5.0 MOTHER SHIP IS LIVE."
echo "// URL: http://$REMOTE_HOST"
echo "=========================================================="
echo -e "\033[0m"
