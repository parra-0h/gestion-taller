"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/vehicles";
exports.ids = ["pages/api/vehicles"];
exports.modules = {

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ "(api)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pg__WEBPACK_IMPORTED_MODULE_0__]);\npg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    user: \"taller_user\",\n    host: \"localhost\",\n    database: \"taller_mecanico\",\n    password: \"password\",\n    port: 5432\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pool);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZGIudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFFMUIsTUFBTUMsSUFBSSxHQUFHLElBQUlELG9DQUFJLENBQUM7SUFDbEJFLElBQUksRUFBRSxhQUFhO0lBQ25CQyxJQUFJLEVBQUUsV0FBVztJQUNqQkMsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQkMsUUFBUSxFQUFFLFVBQVU7SUFDcEJDLElBQUksRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQUVGLGlFQUFlTCxJQUFJLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmFjYXAtcHJveWVjdG8vLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnO1xuXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICAgIHVzZXI6ICd0YWxsZXJfdXNlcicsXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgZGF0YWJhc2U6ICd0YWxsZXJfbWVjYW5pY28nLFxuICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgIHBvcnQ6IDU0MzIsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcG9vbDtcbiJdLCJuYW1lcyI6WyJQb29sIiwicG9vbCIsInVzZXIiLCJob3N0IiwiZGF0YWJhc2UiLCJwYXNzd29yZCIsInBvcnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./lib/db.ts\n");

/***/ }),

/***/ "(api)/./pages/api/vehicles/index.ts":
/*!*************************************!*\
  !*** ./pages/api/vehicles/index.ts ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db */ \"(api)/./lib/db.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);\n_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nasync function handler(req, res) {\n    if (req.method === \"GET\") {\n        try {\n            const { status  } = req.query;\n            let query = \"SELECT * FROM vehicles\";\n            const params = [];\n            if (status) {\n                query += \" WHERE status = $1\";\n                params.push(status);\n            }\n            query += \" ORDER BY created_at DESC\";\n            const { rows  } = await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].query(query, params);\n            res.status(200).json(rows);\n        } catch (error) {\n            console.error(error);\n            res.status(500).json({\n                error: \"Database error\"\n            });\n        }\n    } else if (req.method === \"POST\") {\n        try {\n            const { plate , model , arrival_description  } = req.body;\n            const query1 = `\n        INSERT INTO vehicles (plate, model, arrival_description, status)\n        VALUES ($1, $2, $3, 'arrived')\n        RETURNING *\n      `;\n            const { rows: rows1  } = await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].query(query1, [\n                plate,\n                model,\n                arrival_description\n            ]);\n            res.status(201).json(rows1[0]);\n        } catch (error1) {\n            console.error(error1);\n            res.status(500).json({\n                error: \"Database error\"\n            });\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"GET\",\n            \"POST\"\n        ]);\n        res.status(405).end(`Method ${req.method} Not Allowed`);\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdmVoaWNsZXMvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDNEI7QUFFYixlQUFlQyxPQUFPLENBQ2pDQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDdEI7SUFDRSxJQUFJRCxHQUFHLENBQUNFLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDdEIsSUFBSTtZQUNBLE1BQU0sRUFBRUMsTUFBTSxHQUFFLEdBQUdILEdBQUcsQ0FBQ0ksS0FBSztZQUM1QixJQUFJQSxLQUFLLEdBQUcsd0JBQXdCO1lBQ3BDLE1BQU1DLE1BQU0sR0FBRyxFQUFFO1lBRWpCLElBQUlGLE1BQU0sRUFBRTtnQkFDUkMsS0FBSyxJQUFJLG9CQUFvQixDQUFDO2dCQUM5QkMsTUFBTSxDQUFDQyxJQUFJLENBQUNILE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFFREMsS0FBSyxJQUFJLDJCQUEyQixDQUFDO1lBRXJDLE1BQU0sRUFBRUcsSUFBSSxHQUFFLEdBQUcsTUFBTVQscURBQVUsQ0FBQ00sS0FBSyxFQUFFQyxNQUFNLENBQUM7WUFDaERKLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDSyxJQUFJLENBQUNELElBQUksQ0FBQyxDQUFDO1FBQy9CLEVBQUUsT0FBT0UsS0FBSyxFQUFFO1lBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUMsQ0FBQztZQUNyQlIsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNLLElBQUksQ0FBQztnQkFBRUMsS0FBSyxFQUFFLGdCQUFnQjthQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0wsT0FBTyxJQUFJVCxHQUFHLENBQUNFLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDOUIsSUFBSTtZQUNBLE1BQU0sRUFBRVMsS0FBSyxHQUFFQyxLQUFLLEdBQUVDLG1CQUFtQixHQUFFLEdBQUdiLEdBQUcsQ0FBQ2MsSUFBSTtZQUN0RCxNQUFNVixNQUFLLEdBQUcsQ0FBQzs7OztNQUlyQixDQUFDO1lBQ0ssTUFBTSxFQUFFRyxJQUFJLEVBQUpBLEtBQUksR0FBRSxHQUFHLE1BQU1ULHFEQUFVLENBQUNNLE1BQUssRUFBRTtnQkFBQ08sS0FBSztnQkFBRUMsS0FBSztnQkFBRUMsbUJBQW1CO2FBQUMsQ0FBQztZQUM3RVosR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNLLElBQUksQ0FBQ0QsS0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsRUFBRSxPQUFPRSxNQUFLLEVBQUU7WUFDWkMsT0FBTyxDQUFDRCxLQUFLLENBQUNBLE1BQUssQ0FBQyxDQUFDO1lBQ3JCUixHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0ssSUFBSSxDQUFDO2dCQUFFQyxLQUFLLEVBQUUsZ0JBQWdCO2FBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxPQUFPO1FBQ0hSLEdBQUcsQ0FBQ2MsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUFDLEtBQUs7WUFBRSxNQUFNO1NBQUMsQ0FBQyxDQUFDO1FBQ3hDZCxHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ2EsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFaEIsR0FBRyxDQUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2luYWNhcC1wcm95ZWN0by8uL3BhZ2VzL2FwaS92ZWhpY2xlcy9pbmRleC50cz9kZTQwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IHBvb2wgZnJvbSAnQC9saWIvZGInO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICAgIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gICAgcmVzOiBOZXh0QXBpUmVzcG9uc2Vcbikge1xuICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHJlcS5xdWVyeTtcbiAgICAgICAgICAgIGxldCBxdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIHZlaGljbGVzJztcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gJyBXSEVSRSBzdGF0dXMgPSAkMSc7XG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goc3RhdHVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcXVlcnkgKz0gJyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnO1xuXG4gICAgICAgICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkocXVlcnksIHBhcmFtcyk7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyb3dzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0RhdGFiYXNlIGVycm9yJyB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IHBsYXRlLCBtb2RlbCwgYXJyaXZhbF9kZXNjcmlwdGlvbiB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgICAgSU5TRVJUIElOVE8gdmVoaWNsZXMgKHBsYXRlLCBtb2RlbCwgYXJyaXZhbF9kZXNjcmlwdGlvbiwgc3RhdHVzKVxuICAgICAgICBWQUxVRVMgKCQxLCAkMiwgJDMsICdhcnJpdmVkJylcbiAgICAgICAgUkVUVVJOSU5HICpcbiAgICAgIGA7XG4gICAgICAgICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkocXVlcnksIFtwbGF0ZSwgbW9kZWwsIGFycml2YWxfZGVzY3JpcHRpb25dKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHJvd3NbMF0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRGF0YWJhc2UgZXJyb3InIH0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnNldEhlYWRlcignQWxsb3cnLCBbJ0dFVCcsICdQT1NUJ10pO1xuICAgICAgICByZXMuc3RhdHVzKDQwNSkuZW5kKGBNZXRob2QgJHtyZXEubWV0aG9kfSBOb3QgQWxsb3dlZGApO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJwb29sIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsInF1ZXJ5IiwicGFyYW1zIiwicHVzaCIsInJvd3MiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwicGxhdGUiLCJtb2RlbCIsImFycml2YWxfZGVzY3JpcHRpb24iLCJib2R5Iiwic2V0SGVhZGVyIiwiZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/vehicles/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/vehicles/index.ts"));
module.exports = __webpack_exports__;

})();