(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-loaders", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-loaders"] = factory(require("babylonjs"));
	else
		root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/loaders/src/STL/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/loaders/src/STL/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* reexport safe */ _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
/* harmony export */ });
/* harmony import */ var _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stlFileLoader */ "../../../dev/loaders/src/STL/stlFileLoader.ts");



/***/ }),

/***/ "../../../dev/loaders/src/STL/stlFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/STL/stlFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* binding */ STLFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/assetContainer */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);





/**
 * STL file type loader.
 * This is a babylon scene loader plugin.
 */
var STLFileLoader = /** @class */ (function () {
    function STLFileLoader() {
        /** @internal */
        this.solidPattern = /solid (\S*)([\S\s]*?)endsolid[ ]*(\S*)/g;
        /** @internal */
        this.facetsPattern = /facet([\s\S]*?)endfacet/g;
        /** @internal */
        this.normalPattern = /normal[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;
        /** @internal */
        this.vertexPattern = /vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;
        /**
         * Defines the name of the plugin.
         */
        this.name = "stl";
        /**
         * Defines the extensions the stl loader is able to load.
         * force data to come in as an ArrayBuffer
         * we'll convert to string if it looks like it's an ASCII .stl
         */
        this.extensions = {
            ".stl": { isBinary: true },
        };
    }
    /**
     * Import meshes into a scene.
     * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param scene The scene to import into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param meshes The meshes array to import into
     * @returns True if successful or false otherwise
     */
    STLFileLoader.prototype.importMesh = function (meshesNames, scene, data, rootUrl, meshes) {
        var matches;
        if (typeof data !== "string") {
            if (this._isBinary(data)) {
                // binary .stl
                var babylonMesh = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh("stlmesh", scene);
                this._parseBinary(babylonMesh, data);
                if (meshes) {
                    meshes.push(babylonMesh);
                }
                return true;
            }
            // ASCII .stl
            // convert to string
            data = new TextDecoder().decode(new Uint8Array(data));
        }
        //if arrived here, data is a string, containing the STLA data.
        while ((matches = this.solidPattern.exec(data))) {
            var meshName = matches[1];
            var meshNameFromEnd = matches[3];
            if (meshNameFromEnd && meshName != meshNameFromEnd) {
                babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Error in STL, solid name != endsolid name");
                return false;
            }
            // check meshesNames
            if (meshesNames && meshName) {
                if (meshesNames instanceof Array) {
                    if (!meshesNames.indexOf(meshName)) {
                        continue;
                    }
                }
                else {
                    if (meshName !== meshesNames) {
                        continue;
                    }
                }
            }
            // stl mesh name can be empty as well
            meshName = meshName || "stlmesh";
            var babylonMesh = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh(meshName, scene);
            this._parseASCII(babylonMesh, matches[2]);
            if (meshes) {
                meshes.push(babylonMesh);
            }
        }
        return true;
    };
    /**
     * Load into a scene.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns true if successful or false otherwise
     */
    STLFileLoader.prototype.load = function (scene, data, rootUrl) {
        var result = this.importMesh(null, scene, data, rootUrl, null);
        return result;
    };
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    STLFileLoader.prototype.loadAssetContainer = function (scene, data, rootUrl) {
        var container = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
        scene._blockEntityCollection = true;
        this.importMesh(null, scene, data, rootUrl, container.meshes);
        scene._blockEntityCollection = false;
        return container;
    };
    STLFileLoader.prototype._isBinary = function (data) {
        // check if file size is correct for binary stl
        var reader = new DataView(data);
        // A Binary STL header is 80 bytes, if the data size is not great than
        // that then it's not a binary STL.
        if (reader.byteLength <= 80) {
            return false;
        }
        var faceSize = (32 / 8) * 3 + (32 / 8) * 3 * 3 + 16 / 8;
        var nFaces = reader.getUint32(80, true);
        if (80 + 32 / 8 + nFaces * faceSize === reader.byteLength) {
            return true;
        }
        // US-ASCII begin with 's', 'o', 'l', 'i', 'd'
        var ascii = [115, 111, 108, 105, 100];
        for (var off = 0; off < 5; off++) {
            if (reader.getUint8(off) !== ascii[off]) {
                return true;
            }
        }
        return false;
    };
    STLFileLoader.prototype._parseBinary = function (mesh, data) {
        var reader = new DataView(data);
        var faces = reader.getUint32(80, true);
        var dataOffset = 84;
        var faceLength = 12 * 4 + 2;
        var offset = 0;
        var positions = new Float32Array(faces * 3 * 3);
        var normals = new Float32Array(faces * 3 * 3);
        var indices = new Uint32Array(faces * 3);
        var indicesCount = 0;
        for (var face = 0; face < faces; face++) {
            var start = dataOffset + face * faceLength;
            var normalX = reader.getFloat32(start, true);
            var normalY = reader.getFloat32(start + 4, true);
            var normalZ = reader.getFloat32(start + 8, true);
            for (var i = 1; i <= 3; i++) {
                var vertexstart = start + i * 12;
                // ordering is intentional to match ascii import
                positions[offset] = reader.getFloat32(vertexstart, true);
                normals[offset] = normalX;
                if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                    positions[offset + 2] = reader.getFloat32(vertexstart + 4, true);
                    positions[offset + 1] = reader.getFloat32(vertexstart + 8, true);
                    normals[offset + 2] = normalY;
                    normals[offset + 1] = normalZ;
                }
                else {
                    positions[offset + 1] = reader.getFloat32(vertexstart + 4, true);
                    positions[offset + 2] = reader.getFloat32(vertexstart + 8, true);
                    normals[offset + 1] = normalY;
                    normals[offset + 2] = normalZ;
                }
                offset += 3;
            }
            if (STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                indices[indicesCount] = indicesCount;
                indices[indicesCount + 1] = indicesCount + 2;
                indices[indicesCount + 2] = indicesCount + 1;
                indicesCount += 3;
            }
            else {
                indices[indicesCount] = indicesCount++;
                indices[indicesCount] = indicesCount++;
                indices[indicesCount] = indicesCount++;
            }
        }
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
        mesh.setIndices(indices);
        mesh.computeWorldMatrix(true);
    };
    STLFileLoader.prototype._parseASCII = function (mesh, solidData) {
        var positions = [];
        var normals = [];
        var indices = [];
        var indicesCount = 0;
        //load facets, ignoring loop as the standard doesn't define it can contain more than vertices
        var matches;
        while ((matches = this.facetsPattern.exec(solidData))) {
            var facet = matches[1];
            //one normal per face
            var normalMatches = this.normalPattern.exec(facet);
            this.normalPattern.lastIndex = 0;
            if (!normalMatches) {
                continue;
            }
            var normal = [Number(normalMatches[1]), Number(normalMatches[5]), Number(normalMatches[3])];
            var vertexMatch = void 0;
            while ((vertexMatch = this.vertexPattern.exec(facet))) {
                if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                    positions.push(Number(vertexMatch[1]), Number(vertexMatch[5]), Number(vertexMatch[3]));
                    normals.push(normal[0], normal[1], normal[2]);
                }
                else {
                    positions.push(Number(vertexMatch[1]), Number(vertexMatch[3]), Number(vertexMatch[5]));
                    // Flipping the second and third component because inverted
                    // when normal was declared.
                    normals.push(normal[0], normal[2], normal[1]);
                }
            }
            if (STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                indices.push(indicesCount, indicesCount + 2, indicesCount + 1);
                indicesCount += 3;
            }
            else {
                indices.push(indicesCount++, indicesCount++, indicesCount++);
            }
            this.vertexPattern.lastIndex = 0;
        }
        this.facetsPattern.lastIndex = 0;
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
        mesh.setIndices(indices);
        mesh.computeWorldMatrix(true);
    };
    /**
     * Defines if Y and Z axes are swapped or not when loading an STL file.
     * The default is false to maintain backward compatibility. When set to
     * true, coordinates from the STL file are used without change.
     */
    STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES = false;
    return STLFileLoader;
}());
if (babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
    babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new STLFileLoader());
}


/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts":
/*!***************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* reexport safe */ loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
/* harmony export */ });
/* harmony import */ var loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/STL/index */ "../../../dev/loaders/src/STL/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__[key];
        }
    }
}



/***/ }),

/***/ "babylonjs/Misc/observable":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/stlFileLoader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-stlFileLoader */ "../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5zdGxGaWxlTG9hZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFHQTs7O0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBNk9BO0FBcE9BOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUExT0E7Ozs7QUFJQTtBQUNBO0FBc09BO0FBQUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UkE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNoQkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0xPQURFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL1NUTC9pbmRleC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9TVEwvc3RsRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2x0cy9sb2FkZXJzL3NyYy9sZWdhY3kvbGVnYWN5LXN0bEZpbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy9leHRlcm5hbCB1bWQge1wicm9vdFwiOlwiQkFCWUxPTlwiLFwiY29tbW9uanNcIjpcImJhYnlsb25qc1wiLFwiY29tbW9uanMyXCI6XCJiYWJ5bG9uanNcIixcImFtZFwiOlwiYmFieWxvbmpzXCJ9Iiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9MT0FERVJTLy4vc3JjL3N0bEZpbGVMb2FkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLWxvYWRlcnNcIiwgW1wiYmFieWxvbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1sb2FkZXJzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJMT0FERVJTXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY19vYnNlcnZhYmxlX18pID0+IHtcbnJldHVybiAiLCJleHBvcnQgKiBmcm9tIFwiLi9zdGxGaWxlTG9hZGVyXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBJU2NlbmVMb2FkZXJQbHVnaW4sIElTY2VuZUxvYWRlclBsdWdpbkV4dGVuc2lvbnMgfSBmcm9tIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTG9hZGVyIH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5cclxuLyoqXHJcbiAqIFNUTCBmaWxlIHR5cGUgbG9hZGVyLlxyXG4gKiBUaGlzIGlzIGEgYmFieWxvbiBzY2VuZSBsb2FkZXIgcGx1Z2luLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNUTEZpbGVMb2FkZXIgaW1wbGVtZW50cyBJU2NlbmVMb2FkZXJQbHVnaW4ge1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIHNvbGlkUGF0dGVybiA9IC9zb2xpZCAoXFxTKikoW1xcU1xcc10qPyllbmRzb2xpZFsgXSooXFxTKikvZztcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZmFjZXRzUGF0dGVybiA9IC9mYWNldChbXFxzXFxTXSo/KWVuZGZhY2V0L2c7XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgbm9ybWFsUGF0dGVybiA9IC9ub3JtYWxbXFxzXSsoWy0rXT9bMC05XStcXC4/WzAtOV0qKFtlRV1bLStdP1swLTldKyk/KStbXFxzXSsoWy0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bLStdP1swLTldKyk/KStbXFxzXSsoWy0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bLStdP1swLTldKyk/KSsvZztcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyB2ZXJ0ZXhQYXR0ZXJuID0gL3ZlcnRleFtcXHNdKyhbLStdP1swLTldK1xcLj9bMC05XSooW2VFXVstK10/WzAtOV0rKT8pK1tcXHNdKyhbLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVstK10/WzAtOV0rKT8pK1tcXHNdKyhbLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVstK10/WzAtOV0rKT8pKy9nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgbmFtZSBvZiB0aGUgcGx1Z2luLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmFtZSA9IFwic3RsXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBleHRlbnNpb25zIHRoZSBzdGwgbG9hZGVyIGlzIGFibGUgdG8gbG9hZC5cclxuICAgICAqIGZvcmNlIGRhdGEgdG8gY29tZSBpbiBhcyBhbiBBcnJheUJ1ZmZlclxyXG4gICAgICogd2UnbGwgY29udmVydCB0byBzdHJpbmcgaWYgaXQgbG9va3MgbGlrZSBpdCdzIGFuIEFTQ0lJIC5zdGxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4dGVuc2lvbnM6IElTY2VuZUxvYWRlclBsdWdpbkV4dGVuc2lvbnMgPSB7XHJcbiAgICAgICAgXCIuc3RsXCI6IHsgaXNCaW5hcnk6IHRydWUgfSxcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIFkgYW5kIFogYXhlcyBhcmUgc3dhcHBlZCBvciBub3Qgd2hlbiBsb2FkaW5nIGFuIFNUTCBmaWxlLlxyXG4gICAgICogVGhlIGRlZmF1bHQgaXMgZmFsc2UgdG8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0aWJpbGl0eS4gV2hlbiBzZXQgdG9cclxuICAgICAqIHRydWUsIGNvb3JkaW5hdGVzIGZyb20gdGhlIFNUTCBmaWxlIGFyZSB1c2VkIHdpdGhvdXQgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIERPX05PVF9BTFRFUl9GSUxFX0NPT1JESU5BVEVTID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnQgbWVzaGVzIGludG8gYSBzY2VuZS5cclxuICAgICAqIEBwYXJhbSBtZXNoZXNOYW1lcyBBbiBhcnJheSBvZiBtZXNoIG5hbWVzLCBhIHNpbmdsZSBtZXNoIG5hbWUsIG9yIGVtcHR5IHN0cmluZyBmb3IgYWxsIG1lc2hlcyB0aGF0IGZpbHRlciB3aGF0IG1lc2hlcyBhcmUgaW1wb3J0ZWRcclxuICAgICAqIEBwYXJhbSBzY2VuZSBUaGUgc2NlbmUgdG8gaW1wb3J0IGludG9cclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGltcG9ydFxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIGZvciBzY2VuZSBhbmQgcmVzb3VyY2VzXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzIFRoZSBtZXNoZXMgYXJyYXkgdG8gaW1wb3J0IGludG9cclxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgc3VjY2Vzc2Z1bCBvciBmYWxzZSBvdGhlcndpc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcG9ydE1lc2gobWVzaGVzTmFtZXM6IGFueSwgc2NlbmU6IFNjZW5lLCBkYXRhOiBhbnksIHJvb3RVcmw6IHN0cmluZywgbWVzaGVzOiBOdWxsYWJsZTxBYnN0cmFjdE1lc2hbXT4pOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbWF0Y2hlcztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0JpbmFyeShkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYmluYXJ5IC5zdGxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25NZXNoID0gbmV3IE1lc2goXCJzdGxtZXNoXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnNlQmluYXJ5KGJhYnlsb25NZXNoLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNoZXMucHVzaChiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQVNDSUkgLnN0bFxyXG5cclxuICAgICAgICAgICAgLy8gY29udmVydCB0byBzdHJpbmdcclxuICAgICAgICAgICAgZGF0YSA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShuZXcgVWludDhBcnJheShkYXRhKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmIGFycml2ZWQgaGVyZSwgZGF0YSBpcyBhIHN0cmluZywgY29udGFpbmluZyB0aGUgU1RMQSBkYXRhLlxyXG5cclxuICAgICAgICB3aGlsZSAoKG1hdGNoZXMgPSB0aGlzLnNvbGlkUGF0dGVybi5leGVjKGRhdGEpKSkge1xyXG4gICAgICAgICAgICBsZXQgbWVzaE5hbWUgPSBtYXRjaGVzWzFdO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNoTmFtZUZyb21FbmQgPSBtYXRjaGVzWzNdO1xyXG4gICAgICAgICAgICBpZiAobWVzaE5hbWVGcm9tRW5kICYmIG1lc2hOYW1lICE9IG1lc2hOYW1lRnJvbUVuZCkge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJFcnJvciBpbiBTVEwsIHNvbGlkIG5hbWUgIT0gZW5kc29saWQgbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgbWVzaGVzTmFtZXNcclxuICAgICAgICAgICAgaWYgKG1lc2hlc05hbWVzICYmIG1lc2hOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzaGVzTmFtZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWVzaGVzTmFtZXMuaW5kZXhPZihtZXNoTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzaE5hbWUgIT09IG1lc2hlc05hbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc3RsIG1lc2ggbmFtZSBjYW4gYmUgZW1wdHkgYXMgd2VsbFxyXG4gICAgICAgICAgICBtZXNoTmFtZSA9IG1lc2hOYW1lIHx8IFwic3RsbWVzaFwiO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYmFieWxvbk1lc2ggPSBuZXcgTWVzaChtZXNoTmFtZSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJzZUFTQ0lJKGJhYnlsb25NZXNoLCBtYXRjaGVzWzJdKTtcclxuICAgICAgICAgICAgaWYgKG1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgbWVzaGVzLnB1c2goYmFieWxvbk1lc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgaW50byBhIHNjZW5lLlxyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBzY2VuZSB0byBsb2FkIGludG9cclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGltcG9ydFxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIGZvciBzY2VuZSBhbmQgcmVzb3VyY2VzXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwgb3IgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkKHNjZW5lOiBTY2VuZSwgZGF0YTogYW55LCByb290VXJsOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmltcG9ydE1lc2gobnVsbCwgc2NlbmUsIGRhdGEsIHJvb3RVcmwsIG51bGwpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGludG8gYW4gYXNzZXQgY29udGFpbmVyLlxyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBzY2VuZSB0byBsb2FkIGludG9cclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGltcG9ydFxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIGZvciBzY2VuZSBhbmQgcmVzb3VyY2VzXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgbG9hZGVkIGFzc2V0IGNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFzc2V0Q29udGFpbmVyKHNjZW5lOiBTY2VuZSwgZGF0YTogc3RyaW5nLCByb290VXJsOiBzdHJpbmcpOiBBc3NldENvbnRhaW5lciB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gbmV3IEFzc2V0Q29udGFpbmVyKHNjZW5lKTtcclxuICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmltcG9ydE1lc2gobnVsbCwgc2NlbmUsIGRhdGEsIHJvb3RVcmwsIGNvbnRhaW5lci5tZXNoZXMpO1xyXG4gICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzQmluYXJ5KGRhdGE6IGFueSkge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGZpbGUgc2l6ZSBpcyBjb3JyZWN0IGZvciBiaW5hcnkgc3RsXHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IERhdGFWaWV3KGRhdGEpO1xyXG5cclxuICAgICAgICAvLyBBIEJpbmFyeSBTVEwgaGVhZGVyIGlzIDgwIGJ5dGVzLCBpZiB0aGUgZGF0YSBzaXplIGlzIG5vdCBncmVhdCB0aGFuXHJcbiAgICAgICAgLy8gdGhhdCB0aGVuIGl0J3Mgbm90IGEgYmluYXJ5IFNUTC5cclxuICAgICAgICBpZiAocmVhZGVyLmJ5dGVMZW5ndGggPD0gODApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmFjZVNpemUgPSAoMzIgLyA4KSAqIDMgKyAoMzIgLyA4KSAqIDMgKiAzICsgMTYgLyA4O1xyXG4gICAgICAgIGNvbnN0IG5GYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoODAsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAoODAgKyAzMiAvIDggKyBuRmFjZXMgKiBmYWNlU2l6ZSA9PT0gcmVhZGVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVUy1BU0NJSSBiZWdpbiB3aXRoICdzJywgJ28nLCAnbCcsICdpJywgJ2QnXHJcbiAgICAgICAgY29uc3QgYXNjaWkgPSBbMTE1LCAxMTEsIDEwOCwgMTA1LCAxMDBdO1xyXG4gICAgICAgIGZvciAobGV0IG9mZiA9IDA7IG9mZiA8IDU7IG9mZisrKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWFkZXIuZ2V0VWludDgob2ZmKSAhPT0gYXNjaWlbb2ZmXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wYXJzZUJpbmFyeShtZXNoOiBNZXNoLCBkYXRhOiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBEYXRhVmlldyhkYXRhKTtcclxuICAgICAgICBjb25zdCBmYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoODAsIHRydWUpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhT2Zmc2V0ID0gODQ7XHJcbiAgICAgICAgY29uc3QgZmFjZUxlbmd0aCA9IDEyICogNCArIDI7XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGZhY2VzICogMyAqIDMpO1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KGZhY2VzICogMyAqIDMpO1xyXG4gICAgICAgIGNvbnN0IGluZGljZXMgPSBuZXcgVWludDMyQXJyYXkoZmFjZXMgKiAzKTtcclxuICAgICAgICBsZXQgaW5kaWNlc0NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZmFjZSA9IDA7IGZhY2UgPCBmYWNlczsgZmFjZSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gZGF0YU9mZnNldCArIGZhY2UgKiBmYWNlTGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxYID0gcmVhZGVyLmdldEZsb2F0MzIoc3RhcnQsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxZID0gcmVhZGVyLmdldEZsb2F0MzIoc3RhcnQgKyA0LCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsWiA9IHJlYWRlci5nZXRGbG9hdDMyKHN0YXJ0ICsgOCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleHN0YXJ0ID0gc3RhcnQgKyBpICogMTI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3JkZXJpbmcgaXMgaW50ZW50aW9uYWwgdG8gbWF0Y2ggYXNjaWkgaW1wb3J0XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbb2Zmc2V0XSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbb2Zmc2V0XSA9IG5vcm1hbFg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFTVExGaWxlTG9hZGVyLkRPX05PVF9BTFRFUl9GSUxFX0NPT1JESU5BVEVTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW29mZnNldCArIDJdID0gcmVhZGVyLmdldEZsb2F0MzIodmVydGV4c3RhcnQgKyA0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbb2Zmc2V0ICsgMV0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCArIDgsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxzW29mZnNldCArIDJdID0gbm9ybWFsWTtcclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxzW29mZnNldCArIDFdID0gbm9ybWFsWjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW29mZnNldCArIDFdID0gcmVhZGVyLmdldEZsb2F0MzIodmVydGV4c3RhcnQgKyA0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbb2Zmc2V0ICsgMl0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCArIDgsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxzW29mZnNldCArIDFdID0gbm9ybWFsWTtcclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxzW29mZnNldCArIDJdID0gbm9ybWFsWjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFNUTEZpbGVMb2FkZXIuRE9fTk9UX0FMVEVSX0ZJTEVfQ09PUkRJTkFURVMpIHtcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kaWNlc0NvdW50XSA9IGluZGljZXNDb3VudDtcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kaWNlc0NvdW50ICsgMV0gPSBpbmRpY2VzQ291bnQgKyAyO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc1tpbmRpY2VzQ291bnQgKyAyXSA9IGluZGljZXNDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzQ291bnQgKz0gMztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kaWNlc0NvdW50XSA9IGluZGljZXNDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc1tpbmRpY2VzQ291bnRdID0gaW5kaWNlc0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGljZXNDb3VudF0gPSBpbmRpY2VzQ291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCwgcG9zaXRpb25zKTtcclxuICAgICAgICBtZXNoLnNldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCwgbm9ybWFscyk7XHJcbiAgICAgICAgbWVzaC5zZXRJbmRpY2VzKGluZGljZXMpO1xyXG4gICAgICAgIG1lc2guY29tcHV0ZVdvcmxkTWF0cml4KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BhcnNlQVNDSUkobWVzaDogTWVzaCwgc29saWREYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICAgICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgICAgIGxldCBpbmRpY2VzQ291bnQgPSAwO1xyXG5cclxuICAgICAgICAvL2xvYWQgZmFjZXRzLCBpZ25vcmluZyBsb29wIGFzIHRoZSBzdGFuZGFyZCBkb2Vzbid0IGRlZmluZSBpdCBjYW4gY29udGFpbiBtb3JlIHRoYW4gdmVydGljZXNcclxuICAgICAgICBsZXQgbWF0Y2hlcztcclxuICAgICAgICB3aGlsZSAoKG1hdGNoZXMgPSB0aGlzLmZhY2V0c1BhdHRlcm4uZXhlYyhzb2xpZERhdGEpKSkge1xyXG4gICAgICAgICAgICBjb25zdCBmYWNldCA9IG1hdGNoZXNbMV07XHJcbiAgICAgICAgICAgIC8vb25lIG5vcm1hbCBwZXIgZmFjZVxyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxNYXRjaGVzID0gdGhpcy5ub3JtYWxQYXR0ZXJuLmV4ZWMoZmFjZXQpO1xyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbFBhdHRlcm4ubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgaWYgKCFub3JtYWxNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBub3JtYWwgPSBbTnVtYmVyKG5vcm1hbE1hdGNoZXNbMV0pLCBOdW1iZXIobm9ybWFsTWF0Y2hlc1s1XSksIE51bWJlcihub3JtYWxNYXRjaGVzWzNdKV07XHJcblxyXG4gICAgICAgICAgICBsZXQgdmVydGV4TWF0Y2g7XHJcbiAgICAgICAgICAgIHdoaWxlICgodmVydGV4TWF0Y2ggPSB0aGlzLnZlcnRleFBhdHRlcm4uZXhlYyhmYWNldCkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVNUTEZpbGVMb2FkZXIuRE9fTk9UX0FMVEVSX0ZJTEVfQ09PUkRJTkFURVMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMucHVzaChOdW1iZXIodmVydGV4TWF0Y2hbMV0pLCBOdW1iZXIodmVydGV4TWF0Y2hbNV0pLCBOdW1iZXIodmVydGV4TWF0Y2hbM10pKTtcclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2gobm9ybWFsWzBdLCBub3JtYWxbMV0sIG5vcm1hbFsyXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKE51bWJlcih2ZXJ0ZXhNYXRjaFsxXSksIE51bWJlcih2ZXJ0ZXhNYXRjaFszXSksIE51bWJlcih2ZXJ0ZXhNYXRjaFs1XSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBGbGlwcGluZyB0aGUgc2Vjb25kIGFuZCB0aGlyZCBjb21wb25lbnQgYmVjYXVzZSBpbnZlcnRlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gbm9ybWFsIHdhcyBkZWNsYXJlZC5cclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2gobm9ybWFsWzBdLCBub3JtYWxbMl0sIG5vcm1hbFsxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFNUTEZpbGVMb2FkZXIuRE9fTk9UX0FMVEVSX0ZJTEVfQ09PUkRJTkFURVMpIHtcclxuICAgICAgICAgICAgICAgIGluZGljZXMucHVzaChpbmRpY2VzQ291bnQsIGluZGljZXNDb3VudCArIDIsIGluZGljZXNDb3VudCArIDEpO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc0NvdW50ICs9IDM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzLnB1c2goaW5kaWNlc0NvdW50KyssIGluZGljZXNDb3VudCsrLCBpbmRpY2VzQ291bnQrKyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhQYXR0ZXJuLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZhY2V0c1BhdHRlcm4ubGFzdEluZGV4ID0gMDtcclxuICAgICAgICBtZXNoLnNldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kLCBwb3NpdGlvbnMpO1xyXG4gICAgICAgIG1lc2guc2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kLCBub3JtYWxzKTtcclxuICAgICAgICBtZXNoLnNldEluZGljZXMoaW5kaWNlcyk7XHJcbiAgICAgICAgbWVzaC5jb21wdXRlV29ybGRNYXRyaXgodHJ1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlmIChTY2VuZUxvYWRlcikge1xyXG4gICAgU2NlbmVMb2FkZXIuUmVnaXN0ZXJQbHVnaW4obmV3IFNUTEZpbGVMb2FkZXIoKSk7XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgTG9hZGVycyBmcm9tIFwibG9hZGVycy9TVEwvaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIExvYWRlcnMpIHtcclxuICAgICAgICBpZiAoISg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltrZXldKSB7XHJcbiAgICAgICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltrZXldID0gKDxhbnk+TG9hZGVycylba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJsb2FkZXJzL1NUTC9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2Nfb2JzZXJ2YWJsZV9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGxvYWRlcnMgZnJvbSBcIkBsdHMvbG9hZGVycy9sZWdhY3kvbGVnYWN5LXN0bEZpbGVMb2FkZXJcIjtcclxuZXhwb3J0IHsgbG9hZGVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBsb2FkZXJzO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=