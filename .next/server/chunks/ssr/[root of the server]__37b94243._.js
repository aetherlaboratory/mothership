module.exports = {

"[project]/app/dummy-data/blogDummyData.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("[{\"id\":1,\"title\":{\"rendered\":\"Short Film: Dreamscape\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film1-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film1.mp4\",\"video_thumbnail\":\"/images/film1-thumbnail.jpg\",\"video_description\":\"An experimental short film exploring the subconscious through surreal landscapes.\"}},{\"id\":2,\"title\":{\"rendered\":\"Music Video: Electric Skies\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film2-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film2.mp4\",\"video_thumbnail\":\"/images/film2-thumbnail.jpg\",\"video_description\":\"A high-energy visual journey through neon cityscapes synchronized with electronic beats.\"}},{\"id\":3,\"title\":{\"rendered\":\"Documentary: Forgotten Archives\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film3-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film3.mp4\",\"video_thumbnail\":\"/images/film3-thumbnail.jpg\",\"video_description\":\"A deep dive into uncovered footage from lost civilizations and unknown societies.\"}},{\"id\":4,\"title\":{\"rendered\":\"Animation: Shadow Spirits\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film4-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film4.mp4\",\"video_thumbnail\":\"/images/film4-thumbnail.jpg\",\"video_description\":\"An animated fantasy tale about creatures living in the forgotten spaces between light and dark.\"}},{\"id\":5,\"title\":{\"rendered\":\"Promo: The Future Project\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film5-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film5.mp4\",\"video_thumbnail\":\"/images/film5-thumbnail.jpg\",\"video_description\":\"A promotional teaser for a visionary product launch set in a sci-fi universe.\"}},{\"id\":6,\"title\":{\"rendered\":\"Art Film: Cracked Mirrors\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film6-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film6.mp4\",\"video_thumbnail\":\"/images/film6-thumbnail.jpg\",\"video_description\":\"A silent expressionist film exploring identity, reflection, and inner chaos.\"}}]"));}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ {"00a6ba0d9799e5d375f3aed6eb77773e84d516ac55":"fetchPosts","40bfefa75d96e7b3a2d7523ef240a313543cf76e24":"fetchPost","703809d22d242b41a9d78eedab35bcb2537806e622":"updatePost"} */ __turbopack_context__.s({
    "fetchPost": (()=>fetchPost),
    "fetchPosts": (()=>fetchPosts),
    "updatePost": (()=>updatePost)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
// ==============================
// /app/crud/fetch/blogFetch.js
// Handles GET and PUT requests to WordPress REST API for blog posts
// ==============================
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$blogDummyData$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/app/dummy-data/blogDummyData.json (json)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const API_URL = ("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json");
const DUMMY_DATA_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'app/dummy-data/blogDummyData.json');
let isUsingDummy = false;
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchPosts() {
    try {
        const res = await fetch(`${API_URL}/wp/v2/posts?per_page=20`);
        if (!res.ok) throw new Error('Failed to fetch WordPress posts');
        const data = await res.json();
        isUsingDummy = false;
        return {
            source: 'wp',
            data
        };
    } catch (error) {
        console.warn('[Fallback] Loading local dummy posts');
        isUsingDummy = true;
        return {
            source: 'dummy',
            data: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$blogDummyData$2e$json__$28$json$29$__["default"]
        };
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchPost(id) {
    if (isUsingDummy) {
        const found = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$blogDummyData$2e$json__$28$json$29$__["default"].find((item)=>item.id === id);
        if (!found) throw new Error('Dummy post not found');
        return found;
    }
    const res = await fetch(`${API_URL}/wp/v2/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch WordPress post');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updatePost(id, newData, token) {
    if (isUsingDummy) {
        try {
            const index = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$blogDummyData$2e$json__$28$json$29$__["default"].findIndex((v)=>v.id === id);
            if (index === -1) throw new Error('Dummy post not found');
            const updated = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$blogDummyData$2e$json__$28$json$29$__["default"][index],
                title: {
                    rendered: newData.title
                },
                content: {
                    rendered: newData.content
                }
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$blogDummyData$2e$json__$28$json$29$__["default"][index] = updated;
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(DUMMY_DATA_PATH, JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$blogDummyData$2e$json__$28$json$29$__["default"], null, 2));
            return updated;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update dummy post');
        }
    }
    const res = await fetch(`${API_URL}/wp/v2/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newData)
    });
    if (!res.ok) throw new Error('Failed to update WordPress post');
    return await res.json();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchPosts,
    fetchPost,
    updatePost
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchPosts, "00a6ba0d9799e5d375f3aed6eb77773e84d516ac55", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchPost, "40bfefa75d96e7b3a2d7523ef240a313543cf76e24", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePost, "703809d22d242b41a9d78eedab35bcb2537806e622", null);
}}),
"[project]/app/dummy-data/videoDummyData.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("[{\"id\":1,\"title\":{\"rendered\":\"Short Film: Dreamscape\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film1-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film1.mp4\",\"video_thumbnail\":\"/images/film1-thumbnail.jpg\",\"video_description\":\"An experimental short film exploring the subconscious through surreal landscapes.\"}},{\"id\":2,\"title\":{\"rendered\":\"Music Video: Electric Skies\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film2-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film2.mp4\",\"video_thumbnail\":\"/images/film2-thumbnail.jpg\",\"video_description\":\"A high-energy visual journey through neon cityscapes synchronized with electronic beats.\"}},{\"id\":3,\"title\":{\"rendered\":\"Documentary: Forgotten Archives\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film3-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film3.mp4\",\"video_thumbnail\":\"/images/film3-thumbnail.jpg\",\"video_description\":\"A deep dive into uncovered footage from lost civilizations and unknown societies.\"}},{\"id\":4,\"title\":{\"rendered\":\"Animation: Shadow Spirits\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film4-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film4.mp4\",\"video_thumbnail\":\"/images/film4-thumbnail.jpg\",\"video_description\":\"An animated fantasy tale about creatures living in the forgotten spaces between light and dark.\"}},{\"id\":5,\"title\":{\"rendered\":\"Promo: The Future Project\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film5-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film5.mp4\",\"video_thumbnail\":\"/images/film5-thumbnail.jpg\",\"video_description\":\"A promotional teaser for a visionary product launch set in a sci-fi universe.\"}},{\"id\":6,\"title\":{\"rendered\":\"Art Film: Cracked Mirrors\"},\"_embedded\":{\"wp:featuredmedia\":[{\"source_url\":\"/images/film6-thumbnail.jpg\"}]},\"meta\":{\"video_file\":\"/videos/film6.mp4\",\"video_thumbnail\":\"/images/film6-thumbnail.jpg\",\"video_description\":\"A silent expressionist film exploring identity, reflection, and inner chaos.\"}}]"));}}),
"[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/crud/fetch/videoFetch.js
/* __next_internal_action_entry_do_not_use__ {"00d0282050ed5bfe22f551f92550d090d31644e3b0":"fetchVideos","405e787f28b01fba1f49b3773354d69225f469ab1e":"fetchVideo","70b3f36c41a9dbc31c3f5e40ec65c6f47eccd785b7":"updateVideo"} */ __turbopack_context__.s({
    "fetchVideo": (()=>fetchVideo),
    "fetchVideos": (()=>fetchVideos),
    "updateVideo": (()=>updateVideo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$videoDummyData$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/app/dummy-data/videoDummyData.json (json)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const API_URL = ("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json");
const DUMMY_DATA_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'app/dummy-data/videoDummyData.json');
let isUsingDummy = false;
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchVideos() {
    try {
        const res = await fetch(`${API_URL}/wp/v2/films?per_page=20`);
        if (!res.ok) throw new Error('Failed to fetch WordPress films');
        const data = await res.json();
        isUsingDummy = false;
        return data;
    } catch (error) {
        console.warn('[Fallback] Loading local dummy videos');
        isUsingDummy = true;
        return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$videoDummyData$2e$json__$28$json$29$__["default"];
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchVideo(id) {
    if (isUsingDummy) {
        const found = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$videoDummyData$2e$json__$28$json$29$__["default"].find((item)=>item.id === id);
        if (!found) throw new Error('Dummy video not found');
        return found;
    }
    const res = await fetch(`${API_URL}/wp/v2/films/${id}`);
    if (!res.ok) throw new Error('Failed to fetch WordPress video');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateVideo(id, newData, token) {
    if (isUsingDummy) {
        try {
            const index = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$videoDummyData$2e$json__$28$json$29$__["default"].findIndex((v)=>v.id === id);
            if (index === -1) throw new Error('Dummy video not found');
            const updated = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$videoDummyData$2e$json__$28$json$29$__["default"][index],
                title: {
                    rendered: newData.title
                },
                content: {
                    rendered: newData.content
                }
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$videoDummyData$2e$json__$28$json$29$__["default"][index] = updated;
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(DUMMY_DATA_PATH, JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dummy$2d$data$2f$videoDummyData$2e$json__$28$json$29$__["default"], null, 2));
            return updated;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update dummy video');
        }
    }
    const res = await fetch(`${API_URL}/wp/v2/films/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newData)
    });
    if (!res.ok) throw new Error('Failed to update WordPress video');
    return await res.json();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchVideos,
    fetchVideo,
    updateVideo
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchVideos, "00d0282050ed5bfe22f551f92550d090d31644e3b0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchVideo, "405e787f28b01fba1f49b3773354d69225f469ab1e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateVideo, "70b3f36c41a9dbc31c3f5e40ec65c6f47eccd785b7", null);
}}),
"[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ {"0077267bc7755f0589166ffbfae3cd9afe0fa79053":"fetchAudios","40bbfb233dcdfc385b2bca6297655fe5227c0e56e4":"fetchAudio","70faea3cfdba0c8009952c5556ba65ca72b77ddfd6":"updateAudio"} */ __turbopack_context__.s({
    "fetchAudio": (()=>fetchAudio),
    "fetchAudios": (()=>fetchAudios),
    "updateAudio": (()=>updateAudio)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
// ==============================
// /app/crud/fetch/audioFetch.js
// Handles GET and PUT requests to WordPress REST API for audio posts
// ==============================
const API_URL = ("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json");
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchAudios() {
    const res = await fetch(`${API_URL}/wp/v2/audio?per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchAudio(id) {
    const res = await fetch(`${API_URL}/wp/v2/audio/${id}`);
    if (!res.ok) throw new Error('Failed to fetch single post');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateAudio(id, data, token) {
    const res = await fetch(`${API_URL}/wp/v2/audio/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchAudios,
    fetchAudio,
    updateAudio
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchAudios, "0077267bc7755f0589166ffbfae3cd9afe0fa79053", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchAudio, "40bbfb233dcdfc385b2bca6297655fe5227c0e56e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAudio, "70faea3cfdba0c8009952c5556ba65ca72b77ddfd6", null);
}}),
"[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ {"00c43ff61276083fa5e7f0e3c707e5e258754e77df":"fetchArtworks","40d1cb28e04e10a129499bb74aee20b3ff323050d4":"fetchArtwork","70b099a0a03957dabd16c4d4f89bb4750e88a2db5d":"updateArtwork"} */ __turbopack_context__.s({
    "fetchArtwork": (()=>fetchArtwork),
    "fetchArtworks": (()=>fetchArtworks),
    "updateArtwork": (()=>updateArtwork)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
// ==============================
// /app/crud/fetch/artworkFetch.js
// Handles GET and PUT requests to WordPress REST API for artwork posts
// ==============================
const API_URL = ("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json");
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchArtworks() {
    const res = await fetch(`${API_URL}/wp/v2/2dart?per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchArtwork(id) {
    const res = await fetch(`${API_URL}/wp/v2/2dart/${id}`);
    if (!res.ok) throw new Error('Failed to fetch single post');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateArtwork(id, data, token) {
    const res = await fetch(`${API_URL}/wp/v2/2dart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchArtworks,
    fetchArtwork,
    updateArtwork
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchArtworks, "00c43ff61276083fa5e7f0e3c707e5e258754e77df", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchArtwork, "40d1cb28e04e10a129499bb74aee20b3ff323050d4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateArtwork, "70b099a0a03957dabd16c4d4f89bb4750e88a2db5d", null);
}}),
"[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ {"00effa17b3ef4102ef9f018f1407a555c93c01d3c6":"fetchPhotos","40ad649e1af7e7829fc75b5778f618ad077bdb2b8d":"fetchPhoto","70afd8c3cace23a395f498e63b6a48db67f4089331":"updatePhoto"} */ __turbopack_context__.s({
    "fetchPhoto": (()=>fetchPhoto),
    "fetchPhotos": (()=>fetchPhotos),
    "updatePhoto": (()=>updatePhoto)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
// ==============================
// /app/crud/fetch/photoFetch.js
// Handles GET and PUT requests to WordPress REST API for photo posts
// ==============================
const API_URL = ("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json");
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchPhotos() {
    const res = await fetch(`${API_URL}/wp/v2/photos?per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchPhoto(id) {
    const res = await fetch(`${API_URL}/wp/v2/photos/${id}`);
    if (!res.ok) throw new Error('Failed to fetch single post');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updatePhoto(id, data, token) {
    const res = await fetch(`${API_URL}/wp/v2/photos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchPhotos,
    fetchPhoto,
    updatePhoto
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchPhotos, "00effa17b3ef4102ef9f018f1407a555c93c01d3c6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchPhoto, "40ad649e1af7e7829fc75b5778f618ad077bdb2b8d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePhoto, "70afd8c3cace23a395f498e63b6a48db67f4089331", null);
}}),
"[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ {"006aecbb96f88aace38f707601a72c8271c794e206":"fetch3ds","401aa3bac96a4b381dfb6e2361a626d7536840e20e":"fetch3d","7029862e9f3409ca26addfddc5aae17a255b5e3b54":"update3d"} */ __turbopack_context__.s({
    "fetch3d": (()=>fetch3d),
    "fetch3ds": (()=>fetch3ds),
    "update3d": (()=>update3d)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
// ==============================
// /app/crud/fetch/models3dFetch.js
// Handles GET and PUT requests to WordPress REST API for models3d posts
// ==============================
const API_URL = ("TURBOPACK compile-time value", "https://mothership.wordifysites.com/wp-json");
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetch3ds() {
    const res = await fetch(`${API_URL}/wp/v2/3dart?per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetch3d(id) {
    const res = await fetch(`${API_URL}/wp/v2/3dart/${id}`);
    if (!res.ok) throw new Error('Failed to fetch single post');
    return await res.json();
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ update3d(id, data, token) {
    const res = await fetch(`${API_URL}/wp/v2/3dart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetch3ds,
    fetch3d,
    update3d
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetch3ds, "006aecbb96f88aace38f707601a72c8271c794e206", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetch3d, "401aa3bac96a4b381dfb6e2361a626d7536840e20e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(update3d, "7029862e9f3409ca26addfddc5aae17a255b5e3b54", null);
}}),
"[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}}),
"[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => "[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "006aecbb96f88aace38f707601a72c8271c794e206": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetch3ds"]),
    "0077267bc7755f0589166ffbfae3cd9afe0fa79053": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAudios"]),
    "00a6ba0d9799e5d375f3aed6eb77773e84d516ac55": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchPosts"]),
    "00c43ff61276083fa5e7f0e3c707e5e258754e77df": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchArtworks"]),
    "00d0282050ed5bfe22f551f92550d090d31644e3b0": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchVideos"]),
    "00effa17b3ef4102ef9f018f1407a555c93c01d3c6": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchPhotos"]),
    "401aa3bac96a4b381dfb6e2361a626d7536840e20e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetch3d"]),
    "405e787f28b01fba1f49b3773354d69225f469ab1e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchVideo"]),
    "40ad649e1af7e7829fc75b5778f618ad077bdb2b8d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchPhoto"]),
    "40bbfb233dcdfc385b2bca6297655fe5227c0e56e4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAudio"]),
    "40bfefa75d96e7b3a2d7523ef240a313543cf76e24": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchPost"]),
    "40d1cb28e04e10a129499bb74aee20b3ff323050d4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchArtwork"]),
    "7029862e9f3409ca26addfddc5aae17a255b5e3b54": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["update3d"]),
    "703809d22d242b41a9d78eedab35bcb2537806e622": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePost"]),
    "70afd8c3cace23a395f498e63b6a48db67f4089331": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePhoto"]),
    "70b099a0a03957dabd16c4d4f89bb4750e88a2db5d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateArtwork"]),
    "70b3f36c41a9dbc31c3f5e40ec65c6f47eccd785b7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateVideo"]),
    "70faea3cfdba0c8009952c5556ba65ca72b77ddfd6": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAudio"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => "[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "006aecbb96f88aace38f707601a72c8271c794e206": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["006aecbb96f88aace38f707601a72c8271c794e206"]),
    "0077267bc7755f0589166ffbfae3cd9afe0fa79053": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["0077267bc7755f0589166ffbfae3cd9afe0fa79053"]),
    "00a6ba0d9799e5d375f3aed6eb77773e84d516ac55": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["00a6ba0d9799e5d375f3aed6eb77773e84d516ac55"]),
    "00c43ff61276083fa5e7f0e3c707e5e258754e77df": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["00c43ff61276083fa5e7f0e3c707e5e258754e77df"]),
    "00d0282050ed5bfe22f551f92550d090d31644e3b0": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["00d0282050ed5bfe22f551f92550d090d31644e3b0"]),
    "00effa17b3ef4102ef9f018f1407a555c93c01d3c6": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["00effa17b3ef4102ef9f018f1407a555c93c01d3c6"]),
    "401aa3bac96a4b381dfb6e2361a626d7536840e20e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["401aa3bac96a4b381dfb6e2361a626d7536840e20e"]),
    "405e787f28b01fba1f49b3773354d69225f469ab1e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["405e787f28b01fba1f49b3773354d69225f469ab1e"]),
    "40ad649e1af7e7829fc75b5778f618ad077bdb2b8d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40ad649e1af7e7829fc75b5778f618ad077bdb2b8d"]),
    "40bbfb233dcdfc385b2bca6297655fe5227c0e56e4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40bbfb233dcdfc385b2bca6297655fe5227c0e56e4"]),
    "40bfefa75d96e7b3a2d7523ef240a313543cf76e24": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40bfefa75d96e7b3a2d7523ef240a313543cf76e24"]),
    "40d1cb28e04e10a129499bb74aee20b3ff323050d4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40d1cb28e04e10a129499bb74aee20b3ff323050d4"]),
    "7029862e9f3409ca26addfddc5aae17a255b5e3b54": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["7029862e9f3409ca26addfddc5aae17a255b5e3b54"]),
    "703809d22d242b41a9d78eedab35bcb2537806e622": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["703809d22d242b41a9d78eedab35bcb2537806e622"]),
    "70afd8c3cace23a395f498e63b6a48db67f4089331": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["70afd8c3cace23a395f498e63b6a48db67f4089331"]),
    "70b099a0a03957dabd16c4d4f89bb4750e88a2db5d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["70b099a0a03957dabd16c4d4f89bb4750e88a2db5d"]),
    "70b3f36c41a9dbc31c3f5e40ec65c6f47eccd785b7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["70b3f36c41a9dbc31c3f5e40ec65c6f47eccd785b7"]),
    "70faea3cfdba0c8009952c5556ba65ca72b77ddfd6": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["70faea3cfdba0c8009952c5556ba65ca72b77ddfd6"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => "[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$crud$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$blogFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$videoFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$audioFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$artworkFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$photographyFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$crud$2f$fetch$2f$models3dFetch$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/crud/page/actions.js { ACTIONS_MODULE0 => "[project]/app/crud/fetch/blogFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/crud/fetch/videoFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/crud/fetch/audioFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/app/crud/fetch/artworkFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/app/crud/fetch/photographyFetch.js [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/app/crud/fetch/models3dFetch.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/app/layout.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.js [app-rsc] (ecmascript)"));
}}),
"[project]/app/crud/page.js (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/crud/page.js <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/crud/page.js <module evaluation>", "default");
}}),
"[project]/app/crud/page.js (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/crud/page.js from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/crud/page.js", "default");
}}),
"[project]/app/crud/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$page$2e$js__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/crud/page.js (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$page$2e$js__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/app/crud/page.js (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$crud$2f$page$2e$js__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/app/crud/page.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/crud/page.js [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__37b94243._.js.map