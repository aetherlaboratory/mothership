(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_history_149a32e6._.js", {

"[project]/app/history/CartHistory.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2d$cart$2f$dist$2f$react$2d$use$2d$cart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-use-cart/dist/react-use-cart.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const CartHistory = ()=>{
    _s();
    const { addItem, emptyCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2d$cart$2f$dist$2f$react$2d$use$2d$cart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [cartHistory, setCartHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartHistory.useEffect": ()=>{
            const loadHistory = {
                "CartHistory.useEffect.loadHistory": ()=>{
                    const savedCarts = JSON.parse(localStorage.getItem("cartHistory")) || [];
                    console.log("📜 Loaded Cart History:", savedCarts);
                    // ✅ Reverse to show latest first
                    setCartHistory(savedCarts.reverse());
                }
            }["CartHistory.useEffect.loadHistory"];
            loadHistory();
        }
    }["CartHistory.useEffect"], []);
    // ✅ Delete Cart from History
    const deleteCart = (index)=>{
        const updatedHistory = cartHistory.filter((_, i)=>i !== index);
        localStorage.setItem("cartHistory", JSON.stringify(updatedHistory));
        setCartHistory(updatedHistory);
        // ✅ Trigger notification
        window.dispatchEvent(new CustomEvent("notify", {
            detail: {
                message: "🗑️ Deleted a saved cart",
                type: "error"
            }
        }));
        console.log(`🗑️ Deleted cart at index ${index}`);
    };
    // ✅ Restore Cart to Main Cart
    const restoreCart = (cart)=>{
        emptyCart(); // ✅ Clear current cart before restoring
        cart.items.forEach((item)=>{
            addItem(item); // ✅ Add each item back
        });
        // ✅ Trigger notification
        window.dispatchEvent(new CustomEvent("notify", {
            detail: {
                message: "♻️ Restored a saved cart",
                type: "success"
            }
        }));
        console.log(`♻️ Restored cart from ${cart.timestamp}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold mb-4",
                children: "Deleted Cart History"
            }, void 0, false, {
                fileName: "[project]/app/history/CartHistory.js",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            cartHistory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600",
                children: "No deleted carts yet."
            }, void 0, false, {
                fileName: "[project]/app/history/CartHistory.js",
                lineNumber: 55,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-4",
                children: cartHistory.map((cart, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "p-4 border rounded-md shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    "Deleted on: ",
                                    new Date(cart.timestamp).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/history/CartHistory.js",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-2 space-y-2",
                                children: cart.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex justify-between text-gray-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/history/CartHistory.js",
                                                lineNumber: 65,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Qty: ",
                                                    item.quantity
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/history/CartHistory.js",
                                                lineNumber: 66,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/history/CartHistory.js",
                                        lineNumber: 64,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/history/CartHistory.js",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>restoreCart(cart),
                                        className: "px-4 py-2 bg-green-500 text-white rounded",
                                        children: "♻️ Restore Cart"
                                    }, void 0, false, {
                                        fileName: "[project]/app/history/CartHistory.js",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>deleteCart(index),
                                        className: "px-4 py-2 bg-red-500 text-white rounded",
                                        children: "🗑️ Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/app/history/CartHistory.js",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/history/CartHistory.js",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/app/history/CartHistory.js",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/history/CartHistory.js",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/history/CartHistory.js",
        lineNumber: 52,
        columnNumber: 5
    }, this);
};
_s(CartHistory, "jdjZHkfEojzuB8ZNtEXy3ahPS9c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2d$cart$2f$dist$2f$react$2d$use$2d$cart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CartHistory;
const __TURBOPACK__default__export__ = CartHistory;
var _c;
__turbopack_context__.k.register(_c, "CartHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/history/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$history$2f$CartHistory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/history/CartHistory.js [app-client] (ecmascript)"); // ✅ Import Cart History tab
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const HistoryPage = ()=>{
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Cart");
    const [tabs, setTabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HistoryPage.useEffect": ()=>{
            // ✅ Dynamically detect available history sections (for now, just "Cart")
            setTabs([
                "Cart"
            ]);
        }
    }["HistoryPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-semibold text-center mb-4",
                children: "History"
            }, void 0, false, {
                fileName: "[project]/app/history/page.js",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-4 border-b pb-2",
                children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab),
                        className: `px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`,
                        children: [
                            tab,
                            " History"
                        ]
                    }, tab, true, {
                        fileName: "[project]/app/history/page.js",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/history/page.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: activeTab === "Cart" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$history$2f$CartHistory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/history/page.js",
                    lineNumber: 36,
                    columnNumber: 34
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/history/page.js",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/history/page.js",
        lineNumber: 16,
        columnNumber: 5
    }, this);
};
_s(HistoryPage, "sJcjiGMLKDFZO1wB48d+e5akzEY=");
_c = HistoryPage;
const __TURBOPACK__default__export__ = HistoryPage;
var _c;
__turbopack_context__.k.register(_c, "HistoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_history_149a32e6._.js.map