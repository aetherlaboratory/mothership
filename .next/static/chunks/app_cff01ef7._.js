(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_cff01ef7._.js", {

"[project]/app/schedule/components/AppointmentForm.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AppointmentForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AppointmentForm({ selectedDate, slotRange, slotSize, startHour, onComplete }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [statusMessage, setStatusMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: null,
        text: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppointmentForm.useEffect": ()=>{
            const checkUser = {
                "AppointmentForm.useEffect.checkUser": ()=>{
                    const storedToken = localStorage.getItem('userToken');
                    const storedUser = localStorage.getItem('userData');
                    if (storedToken && storedUser) {
                        try {
                            setUser(JSON.parse(storedUser));
                            setToken(storedToken);
                        } catch (e) {
                            console.error('❌ Failed to parse userData:', e);
                        }
                    }
                    setLoading(false);
                }
            }["AppointmentForm.useEffect.checkUser"];
            checkUser();
            window.addEventListener('storage', checkUser);
            return ({
                "AppointmentForm.useEffect": ()=>window.removeEventListener('storage', checkUser)
            })["AppointmentForm.useEffect"];
        }
    }["AppointmentForm.useEffect"], []);
    const initialValues = {
        notes: '',
        appointment_type: '',
        image_gallery: []
    };
    const handleSubmit = async (values, { setSubmitting })=>{
        if (!user || !token) {
            setStatusMessage({
                type: 'error',
                text: 'You must be logged in to submit.'
            });
            setSubmitting(false);
            return;
        }
        const payload = {
            appointment_date: selectedDate.toISOString().split('T')[0],
            start_time: slotRange.startLabel,
            end_time: slotRange.endLabel,
            user_id: user.id,
            user_name: user.username || user.name,
            slot_type: slotSize + 'hr',
            created_by: user.id,
            status: 'pending',
            ...values
        };
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('https://mothership.wordifysites.com/wp-json/custom/v1/appointments', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setStatusMessage({
                type: 'success',
                text: 'Appointment booked successfully!'
            });
            onComplete?.();
        } catch (err) {
            console.error(err);
            setStatusMessage({
                type: 'error',
                text: 'Failed to book appointment. Try again.'
            });
        } finally{
            setSubmitting(false);
        }
    };
    if (loading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 border-t pt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold mb-3",
                children: "Confirm Appointment"
            }, void 0, false, {
                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm bg-gray-50 p-3 rounded border mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Date:"
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 88,
                                columnNumber: 12
                            }, this),
                            " ",
                            selectedDate.toDateString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Time:"
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 89,
                                columnNumber: 12
                            }, this),
                            " ",
                            slotRange.startLabel,
                            " → ",
                            slotRange.endLabel
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Duration:"
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 90,
                                columnNumber: 12
                            }, this),
                            " ",
                            slotSize,
                            " ",
                            slotSize > 1 ? 'Hours' : 'Hour'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-blue-600 mt-2",
                        children: "📌 All appointments are pending and will be reviewed."
                    }, void 0, false, {
                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Formik"], {
                initialValues: initialValues,
                onSubmit: handleSubmit,
                children: ({ isSubmitting })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        children: "Appointment Type"
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        type: "text",
                                        name: "appointment_type",
                                        className: "w-full border rounded p-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        children: "Notes"
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        as: "textarea",
                                        name: "notes",
                                        rows: "3",
                                        className: "w-full border rounded p-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        children: "Image Gallery"
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-dashed border-2 border-gray-300 rounded p-4 text-center text-sm text-gray-500",
                                        children: "Media uploader placeholder – hook in global media modal here later."
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        className: "bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50",
                                        children: isSubmitting ? 'Booking...' : 'Book Appointment'
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this),
                                    statusMessage.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-sm ${statusMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`,
                                        children: statusMessage.text
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                        lineNumber: 133,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600 font-medium",
                                children: "🔒 Please log in or register above to submit your appointment."
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/schedule/components/AppointmentForm.js",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
            }, void 0, false, {
                fileName: "[project]/app/schedule/components/AppointmentForm.js",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/schedule/components/AppointmentForm.js",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(AppointmentForm, "APKolCT0To+ZIU7576jwr/kZGc8=");
_c = AppointmentForm;
var _c;
__turbopack_context__.k.register(_c, "AppointmentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/api.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getAdminToken": (()=>getAdminToken),
    "getAdminTokenForMediaUpload": (()=>getAdminTokenForMediaUpload),
    "getProfileData": (()=>getProfileData),
    "getUserData": (()=>getUserData),
    "loginUser": (()=>loginUser),
    "registerUser": (()=>registerUser),
    "updateProfile": (()=>updateProfile),
    "uploadProfilePicture": (()=>uploadProfilePicture)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const WORDPRESS_API_URL = "https://mothership.wordifysites.com/wp-json/wp/v2";
const WOOCOMMERCE_API_URL = ("TURBOPACK compile-time value", "https://mothership.wordifysites.com") + "/wp-json/wc/v3";
const CONSUMER_KEY = ("TURBOPACK compile-time value", "ck_10613e4b0ff53998462aca063e2147ff17405411");
const CONSUMER_SECRET = ("TURBOPACK compile-time value", "cs_599880dc4ad10bf4107916c1768a6354b8ab3247");
const getUserData = async (token)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("https://mothership.wordifysites.com/wp-json/wp/v2/users/me?context=edit", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("✅ Dashboard User Data Retrieved:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching Dashboard user data:", error.response?.data || error.message);
        return null;
    }
};
const getAdminTokenForMediaUpload = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json")}/jwt-auth/v1/token`, {
            username: ("TURBOPACK compile-time value", "gerald"),
            password: ("TURBOPACK compile-time value", "gv12345")
        });
        console.log("✅ Admin JWT Token Retrieved:", response.data.token);
        return response.data.token;
    } catch (error) {
        console.error("❌ Failed to retrieve admin token:", error.response?.data || error.message);
        return null;
    }
};
const getProfileData = async (token)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${WORDPRESS_API_URL}/users/me?context=edit`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const user = response?.data;
        console.log("✅ Retrieved Full Profile Data:", user);
        // ✅ Store key profile info in localStorage for global UI access
        if (user) {
            localStorage.setItem("userName", user.nickname || user.username || "Guest");
            localStorage.setItem("userEmail", user.email || "");
            localStorage.setItem("firstName", user.first_name || "");
            localStorage.setItem("lastName", user.last_name || "");
        }
        return user;
    } catch (error) {
        console.error("❌ Error fetching profile data:", error.response?.data || error.message);
        return null;
    }
};
const uploadProfilePicture = async (imageFile)=>{
    try {
        const adminToken = await getAdminTokenForMediaUpload();
        if (!adminToken) {
            console.error("❌ Admin token not found. Cannot upload image.");
            return null;
        }
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("title", imageFile.name);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json")}/wp/v2/media`, formData, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
        console.log("✅ Profile Picture Uploaded:", response.data.source_url);
        return response.data.source_url;
    } catch (error) {
        console.error("❌ Profile picture upload failed:", error.response?.data || error.message);
        return null;
    }
};
const updateProfile = async (token, userData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json")}/wp/v2/users/me`, {
            first_name: userData.first_name,
            last_name: userData.last_name,
            nickname: userData.nickname,
            email: userData.email,
            billing_phone: userData.billing_phone,
            user_website: userData.user_website,
            custom_profile_image: userData.custom_profile_image || null
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log("✅ Profile Updated Successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating profile:", error.response?.data || error.message);
        return null;
    }
};
const registerUser = async (userData)=>{
    try {
        console.log("📌 Sending userData to registerUser:", userData);
        // 1️⃣ Get the Admin JWT Token Securely
        const adminToken = await getAdminToken();
        if (!adminToken) {
            console.error("❌ Cannot create user: Failed to authenticate admin.");
            return null;
        }
        // 2️⃣ Send Registration Request to Correct WordPress Endpoint
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json")}/wp/v2/users`, {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            first_name: userData.first_name,
            last_name: userData.last_name,
            roles: [
                "subscriber"
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        });
        console.log("✅ User registered successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Registration error:", error.response?.data || error.message);
        return null;
    }
};
const loginUser = async (username, password)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("https://mothership.wordifysites.com/wp-json/jwt-auth/v1/token", {
            username: username,
            password: password
        });
        console.log("✅ Full Login Response:", response.data);
        if (!response.data.token) {
            console.error("❌ No token received from WordPress!");
            return null;
        }
        const token = response.data.token;
        console.log("✅ Extracted Token:", token);
        // ✅ Store in localStorage
        localStorage.setItem("userToken", token);
        return token;
    } catch (error) {
        console.error("❌ Login error:", error.response?.data || error.message);
        return null;
    }
};
const getAdminToken = async ()=>{
    try {
        console.log("📌 Admin Username from ENV:", ("TURBOPACK compile-time value", "gerald"));
        console.log("📌 Admin Password from ENV:", ("TURBOPACK compile-time truthy", 1) ? "Loaded" : ("TURBOPACK unreachable", undefined));
        console.log("📌 WordPress API URL:", ("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json"));
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json")}/jwt-auth/v1/token`, {
            username: ("TURBOPACK compile-time value", "gerald"),
            password: ("TURBOPACK compile-time value", "gv12345")
        });
        console.log("✅ Admin JWT Token Retrieved:", response.data.token);
        return response.data.token;
    } catch (error) {
        console.error("❌ Failed to retrieve admin token:", error.response?.data || error.message);
        return null;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/lib/loginUser.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "loginUser": (()=>loginUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/api.js [app-client] (ecmascript)");
;
async function loginUser(username, password) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await res.json();
    if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userToken', data.token) // 🔁 sync with main key
        ;
        const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserData"])(data.token);
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
            return userData;
        } else {
            throw new Error('Failed to fetch user info');
        }
    } else {
        throw new Error(data.message);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/ScheduleLoginForm.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yup/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$loginUser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/loginUser.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const ScheduleLoginForm = ({ onSuccess })=>{
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const formik = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormik"])({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
            username: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().required('Username is required'),
            password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().required('Password is required')
        }),
        onSubmit: {
            "ScheduleLoginForm.useFormik[formik]": async (values)=>{
                setLoading(true);
                setError(null);
                try {
                    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$loginUser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(values.username, values.password);
                    const token = localStorage.getItem('userToken');
                    if (user && token) {
                        localStorage.setItem('userData', JSON.stringify(user));
                        onSuccess?.(user, token);
                        window.dispatchEvent(new CustomEvent('notify', {
                            detail: {
                                message: '✅ Successfully logged in!',
                                type: 'success'
                            }
                        }));
                    } else {
                        throw new Error('Login succeeded but user or token is missing.');
                    }
                } catch (err) {
                    console.error('❌ Login error:', err);
                    setError(err.message || 'Login failed.');
                }
                setLoading(false);
            }
        }["ScheduleLoginForm.useFormik[formik]"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-semibold text-center mb-4",
                children: "Login"
            }, void 0, false, {
                fileName: "[project]/app/components/ScheduleLoginForm.js",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-500 text-center",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/components/ScheduleLoginForm.js",
                lineNumber: 57,
                columnNumber: 17
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-blue-500 text-center",
                children: "🔄 Logging in..."
            }, void 0, false, {
                fileName: "[project]/app/components/ScheduleLoginForm.js",
                lineNumber: 58,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: formik.handleSubmit,
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-medium",
                                children: "Username"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ScheduleLoginForm.js",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "username",
                                ...formik.getFieldProps('username'),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ScheduleLoginForm.js",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            formik.touched.username && formik.errors.username && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm",
                                children: formik.errors.username
                            }, void 0, false, {
                                fileName: "[project]/app/components/ScheduleLoginForm.js",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ScheduleLoginForm.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-medium",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ScheduleLoginForm.js",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                name: "password",
                                ...formik.getFieldProps('password'),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ScheduleLoginForm.js",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            formik.touched.password && formik.errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm",
                                children: formik.errors.password
                            }, void 0, false, {
                                fileName: "[project]/app/components/ScheduleLoginForm.js",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ScheduleLoginForm.js",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600",
                        children: loading ? 'Logging in...' : 'Login'
                    }, void 0, false, {
                        fileName: "[project]/app/components/ScheduleLoginForm.js",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ScheduleLoginForm.js",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ScheduleLoginForm.js",
        lineNumber: 54,
        columnNumber: 5
    }, this);
};
_s(ScheduleLoginForm, "JJXDSvknFxscUfs6zZqSkjsP+LI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormik"]
    ];
});
_c = ScheduleLoginForm;
const __TURBOPACK__default__export__ = ScheduleLoginForm;
var _c;
__turbopack_context__.k.register(_c, "ScheduleLoginForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/RegisterForm.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yup/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const RegisterForm = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const formik = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormik"])({
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        validationSchema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
            username: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().required('Username is required'),
            first_name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().required('First Name is required'),
            last_name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().required('Last Name is required'),
            email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().email('Invalid email').required('Email is required'),
            password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(6, 'Password must be at least 6 characters').required('Password is required')
        }),
        onSubmit: {
            "RegisterForm.useFormik[formik]": async (values, { setSubmitting })=>{
                setError(null);
                setSuccess(null);
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerUser"])(values);
                if (result) {
                    setSuccess('✅ User registered successfully! Redirecting...');
                    // 🔔 Dispatch global notification
                    window.dispatchEvent(new CustomEvent('notify', {
                        detail: {
                            message: '🎉 Registration successful!',
                            type: 'success'
                        }
                    }));
                    // ✅ Auto-close modal after delay
                    setTimeout({
                        "RegisterForm.useFormik[formik]": ()=>{
                            router.push('/login');
                        }
                    }["RegisterForm.useFormik[formik]"], 1500);
                } else {
                    setError('❌ Registration failed. Check console for details.');
                }
                setSubmitting(false);
            }
        }["RegisterForm.useFormik[formik]"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-semibold text-center mb-4",
                children: "Register a New User"
            }, void 0, false, {
                fileName: "[project]/app/components/RegisterForm.js",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-500 text-center",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/components/RegisterForm.js",
                lineNumber: 62,
                columnNumber: 17
            }, this),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-green-500 text-center",
                children: success
            }, void 0, false, {
                fileName: "[project]/app/components/RegisterForm.js",
                lineNumber: 63,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: formik.handleSubmit,
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-medium",
                                children: "Username"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "username",
                                ...formik.getFieldProps('username'),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RegisterForm.js",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-medium",
                                children: "First Name"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "first_name",
                                ...formik.getFieldProps('first_name'),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RegisterForm.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-medium",
                                children: "Last Name"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "last_name",
                                ...formik.getFieldProps('last_name'),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RegisterForm.js",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-medium",
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                name: "email",
                                ...formik.getFieldProps('email'),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RegisterForm.js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-medium",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                name: "password",
                                ...formik.getFieldProps('password'),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RegisterForm.js",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RegisterForm.js",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: formik.isSubmitting,
                        className: "w-full bg-green-500 text-white p-2 rounded hover:bg-green-600",
                        children: formik.isSubmitting ? 'Registering...' : 'Register'
                    }, void 0, false, {
                        fileName: "[project]/app/components/RegisterForm.js",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RegisterForm.js",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/RegisterForm.js",
        lineNumber: 60,
        columnNumber: 5
    }, this);
};
_s(RegisterForm, "4z/cizsav3hqJIFWtpUOAdne3Zg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormik"]
    ];
});
_c = RegisterForm;
const __TURBOPACK__default__export__ = RegisterForm;
var _c;
__turbopack_context__.k.register(_c, "RegisterForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/schedule/components/UserSchedule.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UserSchedule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ScheduleLoginForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ScheduleLoginForm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RegisterForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/RegisterForm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function UserSchedule() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showLogin, setShowLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showRegister, setShowRegister] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserSchedule.useEffect": ()=>{
            const token = localStorage.getItem('userToken');
            console.log('🔍 Checking stored token:', token);
            if (!token) {
                console.warn('🔴 No user token found.');
                setUser(null);
                setLoading(false);
                return;
            }
            const fetchUser = {
                "UserSchedule.useEffect.fetchUser": async ()=>{
                    try {
                        const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserData"])(token);
                        if (userData) {
                            console.log('✅ User Data:', userData);
                            setUser(userData);
                        } else {
                            console.warn('🔴 Token exists but API returned no user');
                            setUser(null);
                        }
                    } catch (error) {
                        console.error('❌ Error fetching user:', error);
                        setUser(null);
                    }
                    setLoading(false);
                }
            }["UserSchedule.useEffect.fetchUser"];
            fetchUser();
        }
    }["UserSchedule.useEffect"], []);
    if (loading) return null;
    if (user && (user.name || user.username)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border rounded bg-gray-50 p-4 mb-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-700",
                    children: [
                        "👤 ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: user.name || user.username
                        }, void 0, false, {
                            fileName: "[project]/app/schedule/components/UserSchedule.js",
                            lineNumber: 55,
                            columnNumber: 49
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/schedule/components/UserSchedule.js",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500",
                    children: user.email
                }, void 0, false, {
                    fileName: "[project]/app/schedule/components/UserSchedule.js",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/schedule/components/UserSchedule.js",
            lineNumber: 54,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border rounded bg-yellow-50 p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-700",
                children: "You must be logged in to schedule an appointment."
            }, void 0, false, {
                fileName: "[project]/app/schedule/components/UserSchedule.js",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowLogin(true),
                        className: "px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700",
                        children: "Log In"
                    }, void 0, false, {
                        fileName: "[project]/app/schedule/components/UserSchedule.js",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowRegister(true),
                        className: "px-4 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700",
                        children: "Register"
                    }, void 0, false, {
                        fileName: "[project]/app/schedule/components/UserSchedule.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/schedule/components/UserSchedule.js",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            showLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-xl max-w-md w-full relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "absolute top-3 right-3 text-gray-500 hover:text-red-500",
                            onClick: ()=>setShowLogin(false),
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/schedule/components/UserSchedule.js",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "Log In"
                        }, void 0, false, {
                            fileName: "[project]/app/schedule/components/UserSchedule.js",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ScheduleLoginForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onSuccess: (user, token)=>{
                                setUser(user);
                                setShowLogin(false);
                                window.dispatchEvent(new Event('storage'));
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/schedule/components/UserSchedule.js",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/schedule/components/UserSchedule.js",
                    lineNumber: 81,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/schedule/components/UserSchedule.js",
                lineNumber: 80,
                columnNumber: 9
            }, this),
            showRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-xl max-w-lg w-full relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "absolute top-3 right-3 text-gray-500 hover:text-red-500",
                            onClick: ()=>setShowRegister(false),
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/schedule/components/UserSchedule.js",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "Register"
                        }, void 0, false, {
                            fileName: "[project]/app/schedule/components/UserSchedule.js",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RegisterForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/schedule/components/UserSchedule.js",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/schedule/components/UserSchedule.js",
                    lineNumber: 102,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/schedule/components/UserSchedule.js",
                lineNumber: 101,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/schedule/components/UserSchedule.js",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(UserSchedule, "Y4SrheUa1NR8FNtiR4UDzd4F6Mg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UserSchedule;
var _c;
__turbopack_context__.k.register(_c, "UserSchedule");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/schedule/components/Modal.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Modal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$schedule$2f$components$2f$AppointmentForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/schedule/components/AppointmentForm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$schedule$2f$components$2f$UserSchedule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/schedule/components/UserSchedule.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const slotOptions = [
    {
        label: '30 Minutes',
        value: 0.5
    },
    {
        label: '1 Hour',
        value: 1
    },
    {
        label: '2 Hours',
        value: 2
    },
    {
        label: '3 Hours',
        value: 3
    },
    {
        label: '8 Hours',
        value: 8
    }
];
const allHalfHourSlots = Array.from({
    length: 48
}, (_, i)=>i * 0.5);
const formatHour = (h)=>{
    const hour = Math.floor(h);
    const mins = h % 1 === 0.5 ? '30' : '00';
    const suffix = hour < 12 || hour === 24 ? 'AM' : 'PM';
    const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${display}:${mins} ${suffix}`;
};
function Modal({ onClose, selectedDate }) {
    _s();
    const [slotSize, setSlotSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [startHour, setStartHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const slotRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Modal.useMemo[slotRange]": ()=>{
            if (startHour === null) return null;
            const start = startHour;
            const end = start + slotSize;
            const formatTime = {
                "Modal.useMemo[slotRange].formatTime": (hourFloat)=>{
                    const hour = Math.floor(hourFloat);
                    const mins = hourFloat % 1 === 0.5 ? '30' : '00';
                    const period = hour < 12 || hour === 24 ? 'AM' : 'PM';
                    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    return `${hour12}:${mins} ${period}`;
                }
            }["Modal.useMemo[slotRange].formatTime"];
            return {
                startLabel: formatTime(start),
                endLabel: formatTime(end)
            };
        }
    }["Modal.useMemo[slotRange]"], [
        startHour,
        slotSize
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white px-6 pb-6 pt-3 rounded-xl w-full m-1 top-0 fixed shadow-xl h-full overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "absolute top-4 right-4 text-gray-400 hover:text-red-500",
                    onClick: onClose,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                        className: "w-6 h-6"
                    }, void 0, false, {
                        fileName: "[project]/app/schedule/components/Modal.js",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/schedule/components/Modal.js",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col lg:flex-row gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full lg:w-1/2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold mb-6",
                                    children: [
                                        "Book for ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(selectedDate, 'EEEE, MMMM do, yyyy')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/schedule/components/Modal.js",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-medium mb-2",
                                            children: "Select Time Slot Type:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/schedule/components/Modal.js",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: slotOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSlotSize(opt.value);
                                                        setStartHour(null);
                                                    },
                                                    className: `px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all ${slotSize === opt.value ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`,
                                                    children: opt.label
                                                }, opt.value, false, {
                                                    fileName: "[project]/app/schedule/components/Modal.js",
                                                    lineNumber: 74,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/schedule/components/Modal.js",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/schedule/components/Modal.js",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-medium mb-2",
                                            children: "Select Start Hour:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/schedule/components/Modal.js",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-6 gap-2 text-xs",
                                            children: allHalfHourSlots.map((h, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setStartHour(h),
                                                    className: `border rounded px-3 py-1 font-medium text-xs ${startHour === h ? 'bg-blue-500 text-white shadow' : 'hover:bg-blue-100'}`,
                                                    children: formatHour(h)
                                                }, idx, false, {
                                                    fileName: "[project]/app/schedule/components/Modal.js",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/schedule/components/Modal.js",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/schedule/components/Modal.js",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                slotRange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Selected Range:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/schedule/components/Modal.js",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-blue-600",
                                            children: [
                                                slotRange.startLabel,
                                                " → ",
                                                slotRange.endLabel
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/schedule/components/Modal.js",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/schedule/components/Modal.js",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$schedule$2f$components$2f$UserSchedule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/schedule/components/Modal.js",
                                    lineNumber: 121,
                                    columnNumber: 1
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/schedule/components/Modal.js",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        slotRange && startHour !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full lg:w-1/2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$schedule$2f$components$2f$AppointmentForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                selectedDate: selectedDate,
                                slotRange: slotRange,
                                slotSize: slotSize,
                                startHour: startHour,
                                onComplete: onClose
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/components/Modal.js",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/schedule/components/Modal.js",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/schedule/components/Modal.js",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/schedule/components/Modal.js",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/schedule/components/Modal.js",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(Modal, "USNMx2zs7czFyJ3KcKYPkbpbDsQ=");
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/schedule/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SchedulePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfWeek.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addDays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isSameMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isToday.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$schedule$2f$components$2f$Modal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/schedule/components/Modal.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function SchedulePage() {
    _s();
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const weekdays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];
    const handleDayClick = (date)=>{
        setSelectedDate(date);
        setModalOpen(true);
    };
    const goToPrevMonth = ()=>{
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
    const goToNextMonth = ()=>{
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    // Generate 42 days starting from Sunday of first week
    const days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SchedulePage.useMemo[days]": ()=>{
            const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(currentDate), {
                weekStartsOn: 0
            });
            return Array.from({
                length: 42
            }, {
                "SchedulePage.useMemo[days]": (_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(start, i)
            }["SchedulePage.useMemo[days]"]);
        }
    }["SchedulePage.useMemo[days]"], [
        currentDate
    ]);
    // Chunk days into 6 rows for the calendar
    const weeks = [];
    for(let i = 0; i < days.length; i += 7){
        weeks.push(days.slice(i, i + 7));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "calendar-bg bg-gray-50 mb-7 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "month-header bg-gray-700 w-full px-3 py-5 flex items-center justify-between mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToPrevMonth,
                                className: "text-center rounded-full bg-gray-900 pl-3 pr-4 py-2 rounded text-white",
                                children: "⫷"
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/page.js",
                                lineNumber: 60,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl text-white font-semibold",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(currentDate, 'MMMM yyyy')
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/page.js",
                                lineNumber: 61,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToNextMonth,
                                className: "text-center rounded-full bg-gray-900 pl-4 pr-3 py-2 rounded text-white",
                                children: "⫸"
                            }, void 0, false, {
                                fileName: "[project]/app/schedule/page.js",
                                lineNumber: 64,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/schedule/page.js",
                        lineNumber: 59,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border-collapse table-fixed calendar-table",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-gray-700 text-white",
                                        children: weekdays.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 text-center font-semibold",
                                                children: day
                                            }, day, false, {
                                                fileName: "[project]/app/schedule/page.js",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/schedule/page.js",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/schedule/page.js",
                                    lineNumber: 70,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: weeks.map((week, wi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: week.map((date, di)=>{
                                                const isCurrentMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameMonth"])(date, currentDate);
                                                const isTodayDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToday"])(date);
                                                const tdClass = [
                                                    'h-24',
                                                    'text-center',
                                                    'align-top',
                                                    'border',
                                                    'p-2',
                                                    'cursor-pointer',
                                                    'select-none',
                                                    'rounded',
                                                    'transition-all',
                                                    isTodayDate ? 'today-cell text-white font-bold' : '',
                                                    !isCurrentMonth ? 'text-gray-400' : '',
                                                    'hover:bg-blue-100'
                                                ].join(' ');
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    onClick: ()=>handleDayClick(date),
                                                    className: tdClass,
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'd')
                                                }, di, false, {
                                                    fileName: "[project]/app/schedule/page.js",
                                                    lineNumber: 101,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, wi, false, {
                                            fileName: "[project]/app/schedule/page.js",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/schedule/page.js",
                                    lineNumber: 77,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/schedule/page.js",
                            lineNumber: 69,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/schedule/page.js",
                        lineNumber: 68,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/schedule/page.js",
                lineNumber: 57,
                columnNumber: 1
            }, this),
            modalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$schedule$2f$components$2f$Modal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setModalOpen(false),
                selectedDate: selectedDate
            }, void 0, false, {
                fileName: "[project]/app/schedule/page.js",
                lineNumber: 118,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/schedule/page.js",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(SchedulePage, "a3QYMD+fSHoLdeD9hhJmDqtFQi0=");
_c = SchedulePage;
var _c;
__turbopack_context__.k.register(_c, "SchedulePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_cff01ef7._.js.map