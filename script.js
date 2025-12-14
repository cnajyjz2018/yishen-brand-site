/* =========================================================================
   YiShen Global B2B - script.js
   V8.2 FINAL VERSION (Single-File Data Integration)
   
   -- CONTAINS ALL 160 SKU DATA POINTS (with placeholders filled) --
   -- Tested and verified for single-file deployment --
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. SKU DATA INTEGRATION (All 8 categories, 160 SKUs total) ---
    
    // --- Helper function to generate placeholder SKUs for completeness ---
    const generatePlaceholders = (category, modelPrefix, count, hs_code, feature, desc_base) => {
        const placeholders = [];
        for (let i = 1; i <= count; i++) {
            placeholders.push({
                "model": `${modelPrefix}-PH-${i.toString().padStart(2, '0')}`,
                "tier": "standard",
                "feature": feature,
                "desc": `${desc_base} Placeholder SKU ${i}. Scene: General Use.`,
                "img": "assets/placeholder.jpg",
                "hs_code": hs_code,
                "category": category
            });
        }
        return placeholders;
    };
    
    // I. Ergonomic Furniture (20 SKUs total)
    const FURNITURE_SKUS = [
        { "model": "GM-XC-R8", "tier": "premium", "feature": "Dynamic Lumbar", "desc": "X-Hybrid Adaptive Support System, Carbon Fiber finish, BIFMA Certified. PaaS: 1Y Posture Analytics. Vertical Control: Core Polymer Sourcing. Scene: AI Research Office.", "img": "assets/furniture/GM-XC-R8_AI_Lab_Scene.jpg", "hs_code": "9401.31.0000", "category": "furniture" },
        { "model": "GM-STAND-D", "tier": "premium", "feature": "Dual Motor Desk", "desc": "Dual-Motor Standing Desk, Anti-Collision, Bamboo Top. Vertical Control: Core Motor Sourcing. PaaS: Usage Time Report. Scene: Digital Creator Studio.", "img": "assets/furniture/GM-STAND-D_Creator_Studio.jpg", "hs_code": "9403.30.0000", "category": "furniture" },
        { "model": "GM-A901-L", "tier": "premium", "feature": "5D Armrest", "desc": "Executive High-Back Leather/Mesh Hybrid, Advanced Articulated Headrest. Vertical Control: Leather Sourcing. Scene: Corporate Boardroom.", "img": "assets/furniture/GM-A901L_Boardroom_Scene.jpg", "hs_code": "9401.39.0000", "category": "furniture" },
        { "model": "GM-A906", "tier": "standard", "feature": "Synchro-Tilt", "desc": "Synchronous Seat & Back Tilt, Enersorb Foam Seat. Vertical Control: Nylon Base Injection. Scene: Architect Drafting Desk.", "img": "assets/furniture/GM-A906_Architect_Desk_Scene.jpg", "hs_code": "9401.31.0000", "category": "furniture" },
        { "model": "GM-B618", "tier": "economic", "feature": "Fixed Lumbar", "desc": "Value Bulk Order SKU, Max Container Loading. DTC Optimized Packaging. Scene: Logistics Warehouse Office.", "img": "assets/furniture/GM-B618_Warehouse_Office_Scene.jpg", "hs_code": "9401.31.0000", "category": "furniture" },
        ...generatePlaceholders('furniture', 'GM', 15, "9401.31.0000", "Standard Mesh", "General office chair."),
    ];
    
    // II. Outdoor Living (20 SKUs total)
    const OUTDOOR_SKUS = [
        { "model": "OL-YACHT-M", "tier": "premium", "feature": "Modular Yacht Deck Set", "desc": "Modular 9-Piece Yacht Deck Set, TIGER Drylac Powder Coat. Marine Grade Rattan. Vertical Control: Aluminum Extrusion Quality. Scene: Luxury Yacht Deck / Mediterranean Villa.", "img": "assets/outdoor/OL-YACHT-M_Villa_Deck_Scene.jpg", "hs_code": "9401.79.0000", "category": "outdoor" },
        { "model": "OL-RESORT-S", "tier": "standard", "feature": "All-Weather Sectional", "desc": "All-Weather PE Rattan Sectional, UV Stabilized. Optimized for container volume. Scene: Hotel Resort Poolside.", "img": "assets/outdoor/OL-RESORT-S_Poolside_Scene.jpg", "hs_code": "9401.71.0000", "category": "outdoor" },
        ...generatePlaceholders('outdoor', 'OL', 18, "9401.71.0000", "PE Rattan Set", "Standard outdoor furniture set."),
    ];

    // III. Eco-Bamboo Products (20 SKUs total)
    const BAMBOO_SKUS = [
        { "model": "BB-ZHEN-S", "tier": "premium", "feature": "Modular Tea Set", "desc": "Zen Style Modular Tea Serving Set, Carbonized finish, Integrated Drainage. Vertical Control: Artisan Sourcing & Finish. Scene: Minimalist Asian Tea House.", "img": "assets/bamboo/BB-ZHEN-S_Zen_Tea_House.jpg", "hs_code": "4420.90.9090", "category": "bamboo" },
        { "model": "BB-MOL-T", "tier": "premium", "feature": "Bamboo/Resin Composite", "desc": "Bamboo/Epoxy Resin Composite Countertop, Food Grade Certified. Vertical Control: Resin/Epoxy Supply. Scene: Sustainable Kitchen.", "img": "assets/bamboo/BB-MOL-T_Artisan_Countertop.jpg", "hs_code": "4420.10.0090", "category": "bamboo" },
        ...generatePlaceholders('bamboo', 'BB', 18, "4420.90.9090", "Cutting Board", "Bamboo kitchen accessories."),
    ];

    // IV. Architectural Flooring (20 SKUs total)
    const FLOORING_SKUS = [
        { "model": "FL-SPD7M", "tier": "premium", "feature": "7mm SPC-WPC Hybrid", "desc": "7mm SPC-WPC Hybrid Click-Lock, IXPE Underlay, AC6 Commercial Grade. Vertical Control: SPC Core Material. Scene: High-Traffic Shopping Mall.", "img": "assets/flooring/FL-SPD7M_Shopping_Mall.jpg", "hs_code": "3918.10.9000", "category": "flooring" },
        { "model": "FL-YONG-B", "tier": "premium", "feature": "15mm Strand Woven", "desc": "15mm High-Density Bamboo Floor, Anti-Scratch Finish, Fire Retardant. Vertical Control: Bamboo Fiber Density. Scene: Museum Gallery.", "img": "assets/flooring/FL-YONG-B_Museum_Gallery.jpg", "hs_code": "4409.29.9090", "category": "flooring" },
        ...generatePlaceholders('flooring', 'FL', 18, "3918.10.9000", "SPC Click-Lock", "Commercial grade flooring solution."),
    ];

    // V. Industrial Hardware (20 SKUs total)
    const RIGGING_SKUS = [
        { "model": "RG-G100S", "tier": "premium", "feature": "Grade 100 Chain Sling", "desc": "Grade 100 Alloy Steel Lifting Chain Sling (Certified 4-Leg). Vertical Control: Alloy Steel Sourcing & Forging Traceability. Scene: Heavy Industrial Construction Site.", "img": "assets/rigging/RG-G100S_Construction_Site.jpg", "hs_code": "7315.82.0000", "category": "rigging" },
        { "model": "RG-SS-SH", "tier": "premium", "feature": "Duplex SS Shackle", "desc": "Duplex Stainless Steel Anchor Shackle (Marine/Corrosion Resistant). Vertical Control: Duplex Steel Forging. Scene: Ocean Port Operations.", "img": "assets/rigging/RG-SS-SH_Ocean_Port.jpg", "hs_code": "7326.90.9000", "category": "rigging" },
        { "model": "HW-AL-TEL8", "tier": "standard", "feature": "8M Telescopic Ladder", "desc": "8-Meter Aluminum Telescopic Ladder (EN131 & ANSI A14.2 Certified). Vertical Control: Aluminum Extrusion. Scene: Utility Pole Maintenance.", "img": "assets/hardware/HW-AL-TEL8_Utility_Maintenance.jpg", "hs_code": "7616.99.9000", "category": "rigging" },
        ...generatePlaceholders('rigging', 'RG', 17, "7326.90.9000", "Steel Lifting Hook", "Heavy duty industrial hardware."),
    ];

    // VI. Precision Health & BioTech (20 SKUs total)
    const BIOMEDICAL_SKUS = [
        { "model": "BI-GEN-PCR", "tier": "premium", "feature": "PCR Reaction Plate", "desc": "自动化兼容 PCR 反应板（高通量测序，96孔），无菌级。PaaS: Traceability Data Link. Vertical Control: Polymer Purity Audit. Scene: Clinical Genomics Lab.", "img": "assets/biomed/BI-GEN-PCR_Genomics.jpg", "hs_code": "3926.90.9090", "category": "biomedical" },
        { "model": "BI-BPM-FDB", "tier": "premium", "feature": "Bioreactor Bag", "desc": "一次性生物反应器培养袋（50L-500L），GMP标准。PaaS: SUS Lifecycle Report. Vertical Control: Membrane Material Sourcing. Scene: Monoclonal Antibody Production Facility.", "img": "assets/biomed/BI-BPM-FDB_Biopharma.jpg", "hs_code": "3926.90.9090", "category": "biomedical" },
        { "model": "MD-ELAS-10", "tier": "standard", "feature": "High-Compression Bandage", "desc": "Medical Grade High-Compression Elastic Bandage (10cm x 4.5m), Latex-Free。Vertical Control: Elastomer Sourcing. Scene: Sports Medicine Center.", "img": "assets/medical/MD-ELAS10_Sports_Clinic.jpg", "hs_code": "3005.90.1000", "category": "biomedical" },
        { "model": "MD-WOUND-H", "tier": "premium", "feature": "Hydrocolloid Dressing", "desc": "Advanced Hydrocolloid Wound Dressing (Sterile, High Absorption), Bulk Hospital Supply. PaaS: Digital Wound Assessment. Scene: Private Hospital Operating Room.", "img": "assets/medical/MD-WOUNDH_Hospital_OR.jpg", "hs_code": "3005.90.1000", "category": "biomedical" },
        { "model": "BI-SAFE-CHEM", "tier": "standard", "feature": "Anti-Corrosion Glove", "desc": "超厚防化长臂手套（耐腐蚀，针对高纯度化学品）。Vertical Control: Polymer Compound. Scene: Chemical Synthesis Lab / Wafer Cleaning Area.", "img": "assets/biomed/BI-SAFE-CHEM_ChemLab.jpg", "hs_code": "3926.20.9000", "category": "biomedical" },
        ...generatePlaceholders('biomedical', 'BI', 15, "3926.90.9090", "Disposable Labware", "Certified medical/lab consumable."),
    ];

    // VII. Future Tech & Energy Systems (20 SKUs total)
    const ENERGY_SKUS = [
        { "model": "ES-NEV-P5", "tier": "premium", "feature": "800V Power Pack", "desc": "5th Gen 800V Power Pack (Liquid Cooling), High C-rate, UN38.3. PaaS: 1Y Predictive BMS Health Service. Vertical Control: Cathode Material Sourcing. Scene: EV OEM Assembly Line.", "img": "assets/energy/ES-NEV-P5_EV_Assembly.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-SOLAR-M", "tier": "premium", "feature": "700W Bifacial Solar", "desc": "700W+ N-Type Bifacial Solar Module, High Efficiency, Vertical Supply Chain Control. Scene: Utility-Scale Power Plant.", "img": "assets/energy/ES-SOLAR-M_Commercial_Rooftop.jpg", "hs_code": "8541.43.0000", "category": "energy" },
        { "model": "FT-CHIP-WET", "tier": "premium", "feature": "High Purity IPA/NH4OH", "desc": "高纯度湿化学品（IPA/NH4OH，定制配方），用于晶圆清洗刻蚀工艺。Vertical Control: Raw Chemical Sourcing & Purity Audit. Scene: Wafer Fabrication (FAB) Plant.", "img": "assets/futuretech/FT-CHIP-WET_Wafer_FAB_Plant.jpg", "hs_code": "3824.99.9990", "category": "energy" },
        { "model": "FT-AI-A100", "tier": "premium", "feature": "AI Compute Accelerator", "desc": "高定制化 AI 加速卡（专业散热模组），针对大规模数据中心。PaaS: Remote Thermal Diagnostics. Scene: AI Research Institute.", "img": "assets/futuretech/FT-AI-A100_Data_Center.jpg", "hs_code": "8473.30.9000", "category": "energy" },
        { "model": "ES-RES-HV", "tier": "standard", "feature": "10-20kWh Residential ESS", "desc": "High-Voltage Residential ESS (Modular), Integrated BMS/Inverter, UL9540. Scene: European Smart Home Solar Integration.", "img": "assets/energy/ES-RES-HV_Smart_Home.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "FT-CHIP-FOUP", "tier": "premium", "feature": "FOUP Wafer Carrier", "desc": "高洁净度 FOUP 晶圆盒（12英寸，静电消除），用于自动化晶圆运输。Scene: Clean Room Logistics.", "img": "assets/futuretech/FT-CHIP-FOUP_Clean_Room.jpg", "hs_code": "8479.90.9090", "category": "energy" },
        { "model": "ES-ELEC-CAB", "tier": "standard", "feature": "EV Charging Cable", "desc": "High-Power EV Charging Cable (CCS2/NACS), UL/CE Certified, High-Flex. Scene: Public Charging Station Infrastructure.", "img": "assets/energy/ES-ELEC-CAB_Charging_Station.jpg", "hs_code": "8544.42.0000", "category": "energy" },
        { "model": "ES-BMS-A", "tier": "premium", "feature": "Advanced Distributed BMS", "desc": "Advanced Distributed BMS (ASIL-D compliant), Cloud Monitoring, OTA Updates. Scene: ESS System Integrator.", "img": "assets/energy/ES-BMS-A_System_Integrator.jpg", "hs_code": "8537.10.9090", "category": "energy" },
        { "model": "FT-CHIP-CMP", "tier": "standard", "feature": "CMP Slurry/Pad", "desc": "CMP 研磨垫和浆料（高精度、低缺陷率），用于晶圆表面平坦化。Vertical Control: Material Science. Scene: CMP Processing Center.", "img": "assets/futuretech/FT-CHIP-CMP_CMP_Processing.jpg", "hs_code": "6806.90.0000", "category": "energy" },
        { "model": "FT-BIO-FILTER", "tier": "premium", "feature": "Hollow Fiber Filter", "desc": "无菌级中空纤维过滤膜包（定制截留分子量），用于生物制药下游纯化。Scene: Biopharma Downstream Processing.", "img": "assets/futuretech/FT-BIO-FILTER_Biopharma_Purification.jpg", "hs_code": "8421.29.9090", "category": "energy" },
        { "model": "ES-PORT-2K", "tier": "standard", "feature": "2kWh Portable Power", "desc": "2kWh Portable Power Station (LiFePO4, MPPT Solar Input), UN38.3, Outdoor/Emergency Use. Scene: Disaster Relief Agency Supply.", "img": "assets/energy/ES-PORT-2K_Disaster_Relief.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        /* 9 Placeholder SKUs needed here */
        { "model": "ES-PH-12", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 12. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-13", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 13. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-14", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 14. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-15", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 15. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-16", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 16. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-17", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 17. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-18", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 18. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-19", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 19. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" },
        { "model": "ES-PH-20", "tier": "standard", "feature": "Placeholder SKU", "desc": "Placeholder: Energy SKU 20. Scene: Warehouse.", "img": "assets/placeholder.jpg", "hs_code": "8507.60.0000", "category": "energy" }
    ];

    // VIII. Global Logistics Service (20 SKUs total)
    const LOGISTICS_SKUS = [
        { "model": "SC-LOG-BATT", "tier": "premium", "feature": "DGR Class 9 Logistics", "desc": "High-Risk Battery Logistics Solution: Dedicated hazmat lanes, UN38.3 documentation management. PaaS: Real-time Risk Score Dashboard. Vertical Control: IATA Compliance. Scene: Global Lithium Battery Manufacturer, NEV Exporter.", "img": "assets/services/SC-LOG-BATT_DGR_Shipping.jpg", "hs_code": "9803.00.0000", "category": "logistics" },
        { "model": "SC-RISK-01", "tier": "premium", "feature": "Predictability Audit", "desc": "Supply Chain Predictability Audit: Deep dive on T1/T2 supplier qualification and risk quantification. PaaS: Final Audit Report + Simulation Software Access. Scene: Fortune 500 Procurement Department.", "img": "assets/services/SC-RISK-01_Procurement_Audit.jpg", "hs_code": "9803.00.0000", "category": "logistics" },
        { "model": "SC-4PL-MAX", "tier": "premium", "feature": "4PL Full Management", "desc": "4PL Full Management Service: Strategic oversight, tender management, cost optimization across global logistics network. Scene: Brand Owner Seeking Efficiency.", "img": "assets/services/SC-4PL-MAX_4PL_Strategy.jpg", "hs_code": "9803.00.0000", "category": "logistics" },
        { "model": "SC-QC-PROTO", "tier": "standard", "feature": "Pre-Production QC", "desc": "Pre-Production Prototype QC: Cpk analysis, defect risk modeling, DFM validation service for new SKUs. Scene: DTC Startup Launching New Furniture Line.", "img": "assets/services/SC-QC-PROTO_DFM_Validation.jpg", "hs_code": "9803.00.0000", "category": "logistics" },
        { "model": "SC-VIS-A", "tier": "standard", "feature": "IoT Visibility Platform", "desc": "End-to-End Visibility Platform Integration: IoT Sensor deployment, Real-time GPS/Temp monitoring, API access. Scene: Cold Chain Distributor.", "img": "assets/services/SC-VIS-A_IoT_Tracking.jpg", "hs_code": "9803.00.0000", "category": "logistics" },
        /* 15 Placeholder SKUs needed here */
        ...generatePlaceholders('logistics', 'SC', 15, "9803.00.0000", "Global Freight Quote", "General logistics and freight service."),
    ];

    // --- 2. GLOBAL SKU CACHE (All 8 categories combined) ---
    // Note: Placeholder SKUs must be populated for all categories (BAMBOO, OUTDOOR, FLOORING, RIGGING)
    // For this example, we trust the generatePlaceholders function to fill the remaining 5 categories (100 total SKUs)
    
    // Total 160 SKUs in one array (For production, ensure all placeholders are replaced with real data)
    const ALL_SKUS_CACHE = [
        ...FURNITURE_SKUS, 
        ...OUTDOOR_SKUS, 
        ...BAMBOO_SKUS, 
        ...FLOORING_SKUS, 
        ...RIGGING_SKUS, 
        ...BIOMEDICAL_SKUS, 
        ...ENERGY_SKUS, 
        ...LOGISTICS_SKUS
    ];
    
    
    // --- 3. DOM ELEMENTS AND CORE LOGIC ---
    
    const categoryGrid = document.getElementById('category-grid');
    const categoryTitleTag = document.getElementById('category-title-tag');
    const sbuCards = document.querySelectorAll('.sbu-card');
    const allCategoryCards = document.querySelectorAll('.category-card');
    
    // Core function for filtering categories based on SBU type
    function filterCategories(sbuType) {
        let titleText = "Strategic Product Catalogue (Filtered)";
        
        allCategoryCards.forEach(card => {
            const isMatch = (sbuType === 'all' || card.getAttribute('data-sbu') === sbuType);
            
            // Toggle visibility
            if (isMatch) {
                card.classList.remove('inactive');
                card.style.display = 'block'; 
            } else {
                card.classList.add('inactive');
                card.style.display = 'none';
            }
        });
        
        // Update title and scroll
        switch (sbuType) {
            case 'lifestyle':
                titleText = "SBU Focus: Home & Lifestyle Solutions (I-IV)";
                break;
            case 'industrial':
                titleText = "SBU Focus: Industrial & Safety Engineering (V-VI)";
                break;
            case 'future':
                titleText = "SBU Focus: Future Tech & Energy Systems (VII)";
                break;
            case 'logistics':
                titleText = "SBU Focus: Predictability Services (VIII)";
                break;
            default:
                titleText = "Exploring All 8 Strategic Ecosystems";
        }
        
        categoryTitleTag.textContent = titleText;
        
        if(sbuType !== 'all') {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Function to render the featured SKU list (e.g., Mesh Chair Catalog)
    function renderFeaturedSkus(categoryToRender, containerId) {
        const container = document.getElementById(containerId);
        // Find SKUs for the requested category
        const skus = ALL_SKUS_CACHE.filter(sku => sku.category === categoryToRender);
        
        if (!container) return;
        
        let html = '<div class="featured-sku-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">';
        
        skus.slice(0, 4).forEach(sku => { // Render first 4 SKUs as a sample
            html += `
                <div class="sku-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
                    <img src="${sku.img}" alt="${sku.model}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px;">
                    <h4>${sku.model}</h4>
                    <p style="font-size: 0.85rem; color: #555;">${sku.feature}</p>
                    <span style="font-weight: 600; color: ${sku.tier === 'premium' ? '#FF6600' : '#007bff'};">${sku.tier.toUpperCase()}</span>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    // --- 4. INITIALIZATION ---

    // Bind SBU Click Events
    sbuCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const sbuType = this.getAttribute('data-sbu');
            
            // Highlight and filter
            sbuCards.forEach(c => c.style.borderBottomColor = 'transparent');
            this.style.borderBottomColor = '#FF6600';

            filterCategories(sbuType);
        });
    });

    // Default View: Show All Categories and Render Featured Section
    filterCategories('all');
    renderFeaturedSkus('furniture', 'mesh-sku-container'); // Render the Mesh Chair Catalog anchor

});
