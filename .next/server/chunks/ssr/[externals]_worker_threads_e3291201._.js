module.exports = {

"[externals]/worker_threads [external] (worker_threads, cjs, async loader)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_worker_threads_48168815._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/worker_threads [external] (worker_threads, cjs)");
    });
});
}}),

};