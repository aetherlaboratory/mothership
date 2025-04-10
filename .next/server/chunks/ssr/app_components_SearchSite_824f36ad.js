module.exports = {

"[project]/app/components/SearchSite.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/components/SearchSite.js
__turbopack_context__.s({
    "default": (()=>SearchSite)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$flexsearch$2f$dist$2f$flexsearch$2e$bundle$2e$module$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/flexsearch/dist/flexsearch.bundle.module.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useSearchToggle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useSearchToggle.js [app-ssr] (ecmascript)"); // ✅ import toggle
'use client';
;
;
;
;
;
;
const mockData = [
    {
        id: 1,
        type: 'page',
        title: 'About Us',
        path: '/about',
        text: 'Learn more about our mission, values, and team.'
    },
    {
        id: 2,
        type: 'page',
        title: 'Services',
        path: '/services',
        text: 'We offer web development, design, and consulting services.'
    },
    {
        id: 3,
        type: 'user',
        title: 'Jane Doe',
        username: 'janedoe',
        path: '/view-profile/janedoe',
        image: 'https://placehold.co/300x300?text=Jane+Doe',
        text: 'Full-stack developer and admin user.'
    },
    {
        id: 4,
        type: 'user',
        title: 'John Smith',
        username: 'johnsmith',
        path: '/view-profile/johnsmith',
        image: 'https://placehold.co/300x300?text=John+Smith',
        text: 'Creative director and UX designer.'
    },
    {
        id: 5,
        type: 'user',
        title: 'Lisa Ray',
        username: 'lisaray',
        path: '/view-profile/lisaray',
        image: 'https://placehold.co/300x300?text=Lisa+Ray',
        text: 'Frontend engineer and component builder.'
    }
];
function SearchSite() {
    const { showSearch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useSearchToggle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchToggle"])() // ✅ gets global visibility state
    ;
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputTouched, setInputTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const newIndex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$flexsearch$2f$dist$2f$flexsearch$2e$bundle$2e$module$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Index"]({
            tokenize: 'forward',
            preset: 'match'
        });
        mockData.forEach((item)=>{
            let content = item.text;
            if (item.title) content += ' ' + item.title;
            newIndex.add(item.id, content);
        });
        setIndex(newIndex);
    }, []);
    const formik = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormik"])({
        initialValues: {
            search: ''
        },
        onSubmit: ()=>{}
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const runSearch = async ()=>{
            if (!index || !formik.values.search) {
                setResults([]);
                return;
            }
            const matches = await index.search(formik.values.search);
            const found = mockData.filter((item)=>matches.includes(item.id));
            setResults(found);
        };
        runSearch();
    }, [
        formik.values.search,
        index
    ]);
    const userResults = results.filter((item)=>item.type === 'user');
    const contentResults = results.filter((item)=>item.type !== 'user');
    if (!showSearch) return null // ✅ hidden until toggled
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate__animated animate__fadeInDown bg-white border border-gray-200 px-3 shadow-sm rounded-lg space-y-6 w-full max-w-7xl mx-auto mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: formik.handleSubmit,
                className: "space-y-4 w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "search",
                                    name: "search",
                                    type: "text",
                                    autoComplete: "off",
                                    onChange: formik.handleChange,
                                    onFocus: ()=>setInputTouched(true),
                                    value: formik.values.search,
                                    placeholder: "Search for pages, content, or users...",
                                    className: "w-7/12 sm:w-9/12 mx-auto block px-4 mt-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/SearchSite.js",
                                    lineNumber: 105,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto flex justify-end align-center pt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "text-lg px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition",
                                        children: "Search"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SearchSite.js",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/SearchSite.js",
                                    lineNumber: 118,
                                    columnNumber: 12
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/SearchSite.js",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        inputTouched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto w-full sm:w-8/12 md:w-9/12 block pt-2 pl-9 md:ml-0 animate__animated animate__fadeInDown",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap justify-center gap-2 pt-2",
                                children: [
                                    {
                                        label: 'Products',
                                        color: 'bg-red-600'
                                    },
                                    {
                                        label: 'Users',
                                        color: 'bg-green-600'
                                    },
                                    {
                                        label: 'Pages',
                                        color: 'bg-blue-600'
                                    },
                                    {
                                        label: 'Posts',
                                        color: 'bg-purple-600'
                                    },
                                    {
                                        label: 'Images',
                                        color: 'bg-pink-600'
                                    },
                                    {
                                        label: 'Videos',
                                        color: 'bg-yellow-500'
                                    },
                                    {
                                        label: 'Audio',
                                        color: 'bg-indigo-600'
                                    },
                                    {
                                        label: 'Schedule',
                                        color: 'bg-teal-600'
                                    },
                                    {
                                        label: 'Events',
                                        color: 'bg-orange-600'
                                    },
                                    {
                                        label: 'Food',
                                        color: 'bg-lime-600'
                                    },
                                    {
                                        label: 'Admin',
                                        color: 'bg-gray-700'
                                    }
                                ].map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm hover:opacity-90 transition ${btn.color}`,
                                        onClick: ()=>console.log('Filter clicked:', btn.label),
                                        children: btn.label
                                    }, btn.label, false, {
                                        fileName: "[project]/app/components/SearchSite.js",
                                        lineNumber: 149,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchSite.js",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this)
                        }, formik.values.search.length + '-' + inputTouched, false, {
                            fileName: "[project]/app/components/SearchSite.js",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/SearchSite.js",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/SearchSite.js",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            userResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-500 p-3 flex flex-wrap gap-4",
                children: userResults.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: user.path,
                        className: "relative w-[180px] h-[220px] rounded-xl overflow-hidden shadow group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: user.image,
                                alt: user.username,
                                className: "w-full h-full object-cover group-hover:scale-105 transition-transform"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchSite.js",
                                lineNumber: 174,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/40"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchSite.js",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm bg-black/60 px-2 py-1 rounded",
                                children: user.title
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchSite.js",
                                lineNumber: 180,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 right-2 h-3 w-3 bg-green-400 rounded-full shadow-md animate-pulse online-status"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchSite.js",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this)
                        ]
                    }, user.id, true, {
                        fileName: "[project]/app/components/SearchSite.js",
                        lineNumber: 169,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/SearchSite.js",
                lineNumber: 167,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    results.length === 0 && formik.values.search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 italic",
                        children: [
                            "No results found for “",
                            formik.values.search,
                            "”."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SearchSite.js",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-4",
                        children: contentResults.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "border rounded-lg p-4 hover:shadow-sm transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.path,
                                        className: "text-lg font-semibold text-blue-600 hover:underline",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SearchSite.js",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-700 mt-1",
                                        children: item.text
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SearchSite.js",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-400 block mt-1",
                                        children: [
                                            "Type: ",
                                            item.type
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/SearchSite.js",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/app/components/SearchSite.js",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/SearchSite.js",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SearchSite.js",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/SearchSite.js",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=app_components_SearchSite_824f36ad.js.map