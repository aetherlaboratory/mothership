module.exports = {

"[project]/app/map/components/GeoStyles.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// components/map/GeoStyles.js
__turbopack_context__.s({
    "mapStyles": (()=>mapStyles)
});
const defaultGeoStyle = {
    fill: "#E5E7EB",
    stroke: "#9CA3AF",
    strokeWidth: 0.5,
    outline: "none"
};
const hoverGeoStyle = {
    fill: "#60A5FA",
    stroke: "#2563EB",
    outline: "none"
};
const pressedGeoStyle = {
    fill: "#2563EB",
    outline: "none"
};
const mapStyles = {
    default: defaultGeoStyle,
    hover: hoverGeoStyle,
    pressed: pressedGeoStyle
};
}}),
"[project]/app/map/components/WorldMapView.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// ✅ New: WorldMapView.js (flat map with animated pan + zoom transitions)
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-simple-maps/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$map$2f$components$2f$GeoStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/map/components/GeoStyles.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// 🌍 World countries TopoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
// 🔭 Define projection targets by region
const views = {
    usa: {
        center: [
            -95,
            38
        ],
        scale: 800
    },
    west: {
        center: [
            -90,
            15
        ],
        scale: 400
    },
    east: {
        center: [
            60,
            25
        ],
        scale: 400
    },
    world: {
        center: [
            0,
            20
        ],
        scale: 300
    }
};
const ease = (start, end, step, totalSteps)=>start + (end - start) * (step / totalSteps);
const WorldMapView = ({ activeRegion })=>{
    const [viewState, setViewState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(views.usa);
    const [currentRegion, setCurrentRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("usa");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!views[activeRegion] || activeRegion === currentRegion) return;
        const from = views[currentRegion];
        const to = views[activeRegion];
        const steps = 30;
        let step = 0;
        const interval = setInterval(()=>{
            step++;
            if (step > steps) {
                clearInterval(interval);
                setViewState(to);
                setCurrentRegion(activeRegion);
                return;
            }
            const nextCenter = [
                ease(from.center[0], to.center[0], step, steps),
                ease(from.center[1], to.center[1], step, steps)
            ];
            const nextScale = ease(from.scale, to.scale, step, steps);
            setViewState({
                center: nextCenter,
                scale: nextScale
            });
        }, 16); // ~60fps
        return ()=>clearInterval(interval);
    }, [
        activeRegion,
        currentRegion
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            margin: "0 auto"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComposableMap"], {
            projection: "geoMercator",
            projectionConfig: {
                center: viewState.center,
                scale: viewState.scale
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Geographies"], {
                geography: geoUrl,
                children: ({ geographies })=>geographies.map((geo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Geography"], {
                            geography: geo,
                            style: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$map$2f$components$2f$GeoStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapStyles"]
                        }, geo.rsmKey, false, {
                            fileName: "[project]/app/map/components/WorldMapView.js",
                            lineNumber: 67,
                            columnNumber: 15
                        }, this))
            }, void 0, false, {
                fileName: "[project]/app/map/components/WorldMapView.js",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/map/components/WorldMapView.js",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/map/components/WorldMapView.js",
        lineNumber: 56,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = WorldMapView;
}}),
"[project]/app/map/components/WorldMapView.js [app-ssr] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/map/components/WorldMapView.js [app-ssr] (ecmascript)"));
}}),

};

//# sourceMappingURL=app_map_components_08b4b03c._.js.map