#!/bin/bash

# =================================================================
# YISHEN GLOBAL V5.0 - SOVEREIGN DEPLOYMENT PROTOCOL
# 作用: 情报收割 + 资产审计 + 双态（云端/物理）全量部署
# 指令: chmod +x deploy.sh && ./deploy.sh
# =================================================================

# --- [颜色与火控定义] ---
RED='\033[0;31m'
BLUE='\033[0;34m'
GOLD='\033[0;33m'
NC='\033[0m'

# --- [远程服务器配置区] ---
REMOTE_USER="root"
REMOTE_HOST="您的服务器IP"
REMOTE_DIR="/var/www/yishenglobal"

echo -e "${BLUE}>>> [COMMAND_TERMINAL]: INITIATING_SOVEREIGN_IGNITION_V5...${NC}"

# --- [STAGE 01: 情报收割与资产生成] ---
echo -e "${GOLD}> STAGE_01: COLLIDING_GLOBAL_INTELLIGENCE_NODES...${NC}"
if python3 auto_data_harvester.py; then
    echo -e "${BLUE}>> [SUCCESS]: Intelligence payloads injected into asset-ledger.json${NC}"
else
    echo -e "${RED}!! [FATAL]: Data harvesting failed. Aborting deployment.${NC}"
    exit 1
fi

# --- [STAGE 02: 物理节点自检] ---
echo -e "${GOLD}> STAGE_02: AUDITING_PHYSICAL_ASSET_VAULT...${NC}"
REQUIRED_FILES=("asset-ledger.json" "vercel.json" "index.html" "crawler-engine.js" "technical-passport.html")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   - [VALIDATED]: $file"
    else
        echo -e "${RED}!! [ERROR]: Critical Node $file is missing.${NC}"
        exit 1
    fi
done

# --- [STAGE 03: 数字化主权索引同步] ---
echo -e "${GOLD}> STAGE_03: SYNCHRONIZING_SOVEREIGN_INDEX...${NC}"
cat <<EOF > sovereign-index.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yishenglobal.net/</loc><priority>1.0</priority></url>
  <url><loc>https://yishenglobal.net/briefing</loc><priority>0.9</priority></url>
  <url><loc>https://yishenglobal.net/matrix</loc><priority>0.8</priority></url>
</urlset>
EOF
echo -e "   - [INDEX_UPDATED]: sovereign-index.xml manifested."

# --- [STAGE 04: 云端分发 (Vercel Interception)] ---
echo -e "${GOLD}> STAGE_04: LAUNCHING_CLOUD_INTERCEPTION_LAYERS (Vercel)...${NC}"
if vercel --prod --yes; then
    echo -e "${BLUE}>> [CLOUD_SUCCESS]: Vercel Edge Nodes Active.${NC}"
else
    echo -e "${RED}!! [WARNING]: Vercel push failed. Proceeding to physical mirror...${NC}"
fi

# --- [STAGE 05: 物理镜像对撞 (Rsync Mirroring)] ---
# 仅当配置了 REMOTE_HOST 时执行
if [[ $REMOTE_HOST != "您的服务器IP" ]]; then
    echo -e "${GOLD}> STAGE_05: MIRRORING_TO_PHYSICAL_SQUAD (Rsync)...${NC}"
    rsync -avz --progress \
        --exclude '.git' \
        --exclude 'deploy.sh' \
        --exclude '.DS_Store' \
        ./ $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

    # 自动校准远程权限
    ssh $REMOTE_USER@$REMOTE_HOST "chown -R www-data:www-data $REMOTE_DIR && find $REMOTE_DIR -type d -exec chmod 755 {} \; && find $REMOTE_DIR -type f -exec chmod 644 {} \;"
    echo -e "${BLUE}>> [MIRROR_SUCCESS]: Physical server calibrated.${NC}"
fi

# --- [STAGE 06: 备案与任务终结] ---
echo -e "${GOLD}=========================================================="
echo -e "// MISSION_ACCOMPLISHED: V5.0 MOTHER SHIP IS LIVE."
echo -e "// DEPLOY_TIME: $(date)"
echo -e "==========================================================${NC}"
echo "[$(date)] DEPLOYMENT_V5_COMPLETE" >> deployment.log
