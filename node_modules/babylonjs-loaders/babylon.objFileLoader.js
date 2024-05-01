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

/***/ "../../../dev/loaders/src/OBJ/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/loaders/src/OBJ/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ _objFileLoader__WEBPACK_IMPORTED_MODULE_3__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser)
/* harmony export */ });
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _objLoadingOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objLoadingOptions */ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");
/* harmony import */ var _objFileLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objFileLoader */ "../../../dev/loaders/src/OBJ/objFileLoader.ts");






/***/ }),

/***/ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/mtlFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* binding */ MTLFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Class reading and parsing the MTL file bundled with the obj file.
 */
var MTLFileLoader = /** @class */ (function () {
    function MTLFileLoader() {
        /**
         * All material loaded from the mtl will be set here
         */
        this.materials = [];
    }
    /**
     * This function will read the mtl file and create each material described inside
     * This function could be improve by adding :
     * -some component missing (Ni, Tf...)
     * -including the specific options available
     *
     * @param scene defines the scene the material will be created in
     * @param data defines the mtl data to parse
     * @param rootUrl defines the rooturl to use in order to load relative dependencies
     * @param assetContainer defines the asset container to store the material in (can be null)
     */
    MTLFileLoader.prototype.parseMTL = function (scene, data, rootUrl, assetContainer) {
        if (data instanceof ArrayBuffer) {
            return;
        }
        //Split the lines from the file
        var lines = data.split("\n");
        // whitespace char ie: [ \t\r\n\f]
        var delimiter_pattern = /\s+/;
        //Array with RGB colors
        var color;
        //New material
        var material = null;
        //Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            // Blank line or comment
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
            }
            //Get the first parameter (keyword)
            var pos = line.indexOf(" ");
            var key = pos >= 0 ? line.substring(0, pos) : line;
            key = key.toLowerCase();
            //Get the data following the key
            var value = pos >= 0 ? line.substring(pos + 1).trim() : "";
            //This mtl keyword will create the new material
            if (key === "newmtl") {
                //Check if it is the first material.
                // Materials specifications are described after this keyword.
                if (material) {
                    //Add the previous material in the material array.
                    this.materials.push(material);
                }
                //Create a new material.
                // value is the name of the material read in the mtl file
                scene._blockEntityCollection = !!assetContainer;
                material = new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(value, scene);
                material._parentContainer = assetContainer;
                scene._blockEntityCollection = false;
            }
            else if (key === "kd" && material) {
                // Diffuse color (color under white light) using RGB values
                //value  = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.diffuseColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ka" && material) {
                // Ambient color (color under shadow) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.ambientColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ks" && material) {
                // Specular color (color when light is reflected from shiny surface) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set the color into the material
                material.specularColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ke" && material) {
                // Emissive color using RGB values
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                material.emissiveColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ns" && material) {
                //value = "Integer"
                material.specularPower = parseFloat(value);
            }
            else if (key === "d" && material) {
                //d is dissolve for current material. It mean alpha for BABYLON
                material.alpha = parseFloat(value);
                //Texture
                //This part can be improved by adding the possible options of texture
            }
            else if (key === "map_ka" && material) {
                // ambient texture map with a loaded image
                //We must first get the folder of the image
                material.ambientTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_kd" && material) {
                // Diffuse texture map with a loaded image
                material.diffuseTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ks" && material) {
                // Specular texture map with a loaded image
                //We must first get the folder of the image
                material.specularTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ns") {
                //Specular
                //Specular highlight component
                //We must first get the folder of the image
                //
                //Not supported by BABYLON
                //
                //    continue;
            }
            else if (key === "map_bump" && material) {
                //The bump texture
                var values = value.split(delimiter_pattern);
                var bumpMultiplierIndex = values.indexOf("-bm");
                var bumpMultiplier = null;
                if (bumpMultiplierIndex >= 0) {
                    bumpMultiplier = values[bumpMultiplierIndex + 1];
                    values.splice(bumpMultiplierIndex, 2); // remove
                }
                material.bumpTexture = MTLFileLoader._GetTexture(rootUrl, values.join(" "), scene);
                if (material.bumpTexture && bumpMultiplier !== null) {
                    material.bumpTexture.level = parseFloat(bumpMultiplier);
                }
            }
            else if (key === "map_d" && material) {
                // The dissolve of the material
                material.opacityTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
                //Options for illumination
            }
            else if (key === "illum") {
                //Illumination
                if (value === "0") {
                    //That mean Kd == Kd
                }
                else if (value === "1") {
                    //Color on and Ambient on
                }
                else if (value === "2") {
                    //Highlight on
                }
                else if (value === "3") {
                    //Reflection on and Ray trace on
                }
                else if (value === "4") {
                    //Transparency: Glass on, Reflection: Ray trace on
                }
                else if (value === "5") {
                    //Reflection: Fresnel on and Ray trace on
                }
                else if (value === "6") {
                    //Transparency: Refraction on, Reflection: Fresnel off and Ray trace on
                }
                else if (value === "7") {
                    //Transparency: Refraction on, Reflection: Fresnel on and Ray trace on
                }
                else if (value === "8") {
                    //Reflection on and Ray trace off
                }
                else if (value === "9") {
                    //Transparency: Glass on, Reflection: Ray trace off
                }
                else if (value === "10") {
                    //Casts shadows onto invisible surfaces
                }
            }
            else {
                // console.log("Unhandled expression at line : " + i +'\n' + "with value : " + line);
            }
        }
        //At the end of the file, add the last material
        if (material) {
            this.materials.push(material);
        }
    };
    /**
     * Gets the texture for the material.
     *
     * If the material is imported from input file,
     * We sanitize the url to ensure it takes the texture from aside the material.
     *
     * @param rootUrl The root url to load from
     * @param value The value stored in the mtl
     * @param scene
     * @returns The Texture
     */
    MTLFileLoader._GetTexture = function (rootUrl, value, scene) {
        if (!value) {
            return null;
        }
        var url = rootUrl;
        // Load from input file.
        if (rootUrl === "file:") {
            var lastDelimiter = value.lastIndexOf("\\");
            if (lastDelimiter === -1) {
                lastDelimiter = value.lastIndexOf("/");
            }
            if (lastDelimiter > -1) {
                url += value.substr(lastDelimiter + 1);
            }
            else {
                url += value;
            }
        }
        // Not from input file.
        else {
            url += value;
        }
        return new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Texture(url, scene, false, MTLFileLoader.INVERT_TEXTURE_Y);
    };
    /**
     * Invert Y-Axis of referenced textures on load
     */
    MTLFileLoader.INVERT_TEXTURE_Y = true;
    return MTLFileLoader;
}());


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJFileLoader: () => (/* binding */ OBJFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/assetContainer */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");






/**
 * OBJ file type loader.
 * This is a babylon scene loader plugin.
 */
var OBJFileLoader = /** @class */ (function () {
    /**
     * Creates loader for .OBJ files
     *
     * @param loadingOptions options for loading and parsing OBJ/MTL files.
     */
    function OBJFileLoader(loadingOptions) {
        /**
         * Defines the name of the plugin.
         */
        this.name = "obj";
        /**
         * Defines the extension the plugin is able to load.
         */
        this.extensions = ".obj";
        this._assetContainer = null;
        this._loadingOptions = loadingOptions || OBJFileLoader._DefaultLoadingOptions;
    }
    Object.defineProperty(OBJFileLoader, "INVERT_TEXTURE_Y", {
        /**
         * Invert Y-Axis of referenced textures on load
         */
        get: function () {
            return _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y;
        },
        set: function (value) {
            _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OBJFileLoader, "_DefaultLoadingOptions", {
        get: function () {
            return {
                computeNormals: OBJFileLoader.COMPUTE_NORMALS,
                optimizeNormals: OBJFileLoader.OPTIMIZE_NORMALS,
                importVertexColors: OBJFileLoader.IMPORT_VERTEX_COLORS,
                invertY: OBJFileLoader.INVERT_Y,
                invertTextureY: OBJFileLoader.INVERT_TEXTURE_Y,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                UVScaling: OBJFileLoader.UV_SCALING,
                materialLoadingFailsSilently: OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY,
                optimizeWithUV: OBJFileLoader.OPTIMIZE_WITH_UV,
                skipMaterials: OBJFileLoader.SKIP_MATERIALS,
                useLegacyBehavior: OBJFileLoader.USE_LEGACY_BEHAVIOR,
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Calls synchronously the MTL file attached to this obj.
     * Load function or importMesh function don't enable to load 2 files in the same time asynchronously.
     * Without this function materials are not displayed in the first frame (but displayed after).
     * In consequence it is impossible to get material information in your HTML file
     *
     * @param url The URL of the MTL file
     * @param rootUrl defines where to load data from
     * @param onSuccess Callback function to be called when the MTL file is loaded
     * @param onFailure
     */
    OBJFileLoader.prototype._loadMTL = function (url, rootUrl, onSuccess, onFailure) {
        //The complete path to the mtl file
        var pathOfFile = rootUrl + url;
        // Loads through the babylon tools to allow fileInput search.
        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadFile(pathOfFile, onSuccess, undefined, undefined, false, function (request, exception) {
            onFailure(pathOfFile, exception);
        });
    };
    /**
     * Instantiates a OBJ file loader plugin.
     * @returns the created plugin
     */
    OBJFileLoader.prototype.createPlugin = function () {
        return new OBJFileLoader(OBJFileLoader._DefaultLoadingOptions);
    };
    /**
     * If the data string can be loaded directly.
     * @returns if the data can be loaded directly
     */
    OBJFileLoader.prototype.canDirectLoad = function () {
        return false;
    };
    /**
     * Imports one or more meshes from the loaded OBJ data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    OBJFileLoader.prototype.importMeshAsync = function (meshesNames, scene, data, rootUrl) {
        //get the meshes from OBJ file
        return this._parseSolid(meshesNames, scene, data, rootUrl).then(function (meshes) {
            return {
                meshes: meshes,
                particleSystems: [],
                skeletons: [],
                animationGroups: [],
                transformNodes: [],
                geometries: [],
                lights: [],
                spriteManagers: [],
            };
        });
    };
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    OBJFileLoader.prototype.loadAsync = function (scene, data, rootUrl) {
        //Get the 3D model
        return this.importMeshAsync(null, scene, data, rootUrl).then(function () {
            // return void
        });
    };
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    OBJFileLoader.prototype.loadAssetContainerAsync = function (scene, data, rootUrl) {
        var _this = this;
        var container = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
        this._assetContainer = container;
        return this.importMeshAsync(null, scene, data, rootUrl)
            .then(function (result) {
            result.meshes.forEach(function (mesh) { return container.meshes.push(mesh); });
            result.meshes.forEach(function (mesh) {
                var material = mesh.material;
                if (material) {
                    // Materials
                    if (container.materials.indexOf(material) == -1) {
                        container.materials.push(material);
                        // Textures
                        var textures = material.getActiveTextures();
                        textures.forEach(function (t) {
                            if (container.textures.indexOf(t) == -1) {
                                container.textures.push(t);
                            }
                        });
                    }
                }
            });
            _this._assetContainer = null;
            return container;
        })
            .catch(function (ex) {
            _this._assetContainer = null;
            throw ex;
        });
    };
    /**
     * Read the OBJ file and create an Array of meshes.
     * Each mesh contains all information given by the OBJ and the MTL file.
     * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
     * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
     * @param scene defines the scene where are displayed the data
     * @param data defines the content of the obj file
     * @param rootUrl defines the path to the folder
     * @returns the list of loaded meshes
     */
    OBJFileLoader.prototype._parseSolid = function (meshesNames, scene, data, rootUrl) {
        var _this = this;
        var fileToLoad = ""; //The name of the mtlFile to load
        var materialsFromMTLFile = new _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader();
        var materialToUse = [];
        var babylonMeshesArray = []; //The mesh for babylon
        // Main function
        var solidParser = new _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser(materialToUse, babylonMeshesArray, this._loadingOptions);
        solidParser.parse(meshesNames, data, scene, this._assetContainer, function (fileName) {
            fileToLoad = fileName;
        });
        // load the materials
        var mtlPromises = [];
        // Check if we have a file to load
        if (fileToLoad !== "" && !this._loadingOptions.skipMaterials) {
            //Load the file synchronously
            mtlPromises.push(new Promise(function (resolve, reject) {
                _this._loadMTL(fileToLoad, rootUrl, function (dataLoaded) {
                    try {
                        //Create materials thanks MTLLoader function
                        materialsFromMTLFile.parseMTL(scene, dataLoaded, rootUrl, _this._assetContainer);
                        //Look at each material loaded in the mtl file
                        for (var n = 0; n < materialsFromMTLFile.materials.length; n++) {
                            //Three variables to get all meshes with the same material
                            var startIndex = 0;
                            var _indices = [];
                            var _index = void 0;
                            //The material from MTL file is used in the meshes loaded
                            //Push the indice in an array
                            //Check if the material is not used for another mesh
                            while ((_index = materialToUse.indexOf(materialsFromMTLFile.materials[n].name, startIndex)) > -1) {
                                _indices.push(_index);
                                startIndex = _index + 1;
                            }
                            //If the material is not used dispose it
                            if (_index === -1 && _indices.length === 0) {
                                //If the material is not needed, remove it
                                materialsFromMTLFile.materials[n].dispose();
                            }
                            else {
                                for (var o = 0; o < _indices.length; o++) {
                                    //Apply the material to the Mesh for each mesh with the material
                                    var mesh = babylonMeshesArray[_indices[o]];
                                    var material = materialsFromMTLFile.materials[n];
                                    mesh.material = material;
                                    if (!mesh.getTotalIndices()) {
                                        // No indices, we need to turn on point cloud
                                        material.pointsCloud = true;
                                    }
                                }
                            }
                        }
                        resolve();
                    }
                    catch (e) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error processing MTL file: '".concat(fileToLoad, "'"));
                        if (_this._loadingOptions.materialLoadingFailsSilently) {
                            resolve();
                        }
                        else {
                            reject(e);
                        }
                    }
                }, function (pathOfFile, exception) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error downloading MTL file: '".concat(fileToLoad, "'"));
                    if (_this._loadingOptions.materialLoadingFailsSilently) {
                        resolve();
                    }
                    else {
                        reject(exception);
                    }
                });
            }));
        }
        //Return an array with all Mesh
        return Promise.all(mtlPromises).then(function () {
            return babylonMeshesArray;
        });
    };
    /**
     * Defines if UVs are optimized by default during load.
     */
    OBJFileLoader.OPTIMIZE_WITH_UV = true;
    /**
     * Invert model on y-axis (does a model scaling inversion)
     */
    OBJFileLoader.INVERT_Y = false;
    /**
     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
     */
    OBJFileLoader.IMPORT_VERTEX_COLORS = false;
    /**
     * Compute the normals for the model, even if normals are present in the file.
     */
    OBJFileLoader.COMPUTE_NORMALS = false;
    /**
     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
     */
    OBJFileLoader.OPTIMIZE_NORMALS = false;
    /**
     * Defines custom scaling of UV coordinates of loaded meshes.
     */
    OBJFileLoader.UV_SCALING = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(1, 1);
    /**
     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
     */
    OBJFileLoader.SKIP_MATERIALS = false;
    /**
     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
     *
     * Defaults to true for backwards compatibility.
     */
    OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = true;
    /**
     * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
     */
    OBJFileLoader.USE_LEGACY_BEHAVIOR = false;
    return OBJFileLoader;
}());
if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
    //Add this loader into the register plugin
    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new OBJFileLoader());
}


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts":
/*!*********************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objLoadingOptions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../dev/loaders/src/OBJ/solidParser.ts":
/*!***************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/solidParser.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SolidParser: () => (/* binding */ SolidParser)
/* harmony export */ });
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__);








/**
 * Class used to load mesh data from OBJ content
 */
var SolidParser = /** @class */ (function () {
    /**
     * Creates a new SolidParser
     * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
     * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
     * @param loadingOptions defines the loading options to use
     */
    function SolidParser(materialToUse, babylonMeshesArray, loadingOptions) {
        this._positions = []; //values for the positions of vertices
        this._normals = []; //Values for the normals
        this._uvs = []; //Values for the textures
        this._colors = [];
        this._meshesFromObj = []; //[mesh] Contains all the obj meshes
        this._indicesForBabylon = []; //The list of indices for VertexData
        this._wrappedPositionForBabylon = []; //The list of position in vectors
        this._wrappedUvsForBabylon = []; //Array with all value of uvs to match with the indices
        this._wrappedColorsForBabylon = []; // Array with all color values to match with the indices
        this._wrappedNormalsForBabylon = []; //Array with all value of normals to match with the indices
        this._tuplePosNorm = []; //Create a tuple with indice of Position, Normal, UV  [pos, norm, uvs]
        this._curPositionInIndices = 0;
        this._hasMeshes = false; //Meshes are defined in the file
        this._unwrappedPositionsForBabylon = []; //Value of positionForBabylon w/o Vector3() [x,y,z]
        this._unwrappedColorsForBabylon = []; // Value of colorForBabylon w/o Color4() [r,g,b,a]
        this._unwrappedNormalsForBabylon = []; //Value of normalsForBabylon w/o Vector3()  [x,y,z]
        this._unwrappedUVForBabylon = []; //Value of uvsForBabylon w/o Vector3()      [x,y,z]
        this._triangles = []; //Indices from new triangles coming from polygons
        this._materialNameFromObj = ""; //The name of the current material
        this._objMeshName = ""; //The name of the current obj mesh
        this._increment = 1; //Id for meshes created by the multimaterial
        this._isFirstMaterial = true;
        this._grayColor = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(0.5, 0.5, 0.5, 1);
        this._materialToUse = materialToUse;
        this._babylonMeshesArray = babylonMeshesArray;
        this._loadingOptions = loadingOptions;
    }
    /**
     * Search for obj in the given array.
     * This function is called to check if a couple of data already exists in an array.
     *
     * If found, returns the index of the founded tuple index. Returns -1 if not found
     * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
     * @param obj Array<number>
     * @returns {boolean}
     */
    SolidParser.prototype._isInArray = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        return idx === -1 ? -1 : arr[obj[0]].idx[idx];
    };
    SolidParser.prototype._isInArrayUV = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [], uv: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        if (idx != 1 && obj[2] === arr[obj[0]].uv[idx]) {
            return arr[obj[0]].idx[idx];
        }
        return -1;
    };
    /**
     * This function set the data for each triangle.
     * Data are position, normals and uvs
     * If a tuple of (position, normal) is not set, add the data into the corresponding array
     * If the tuple already exist, add only their indice
     *
     * @param indicePositionFromObj Integer The index in positions array
     * @param indiceUvsFromObj Integer The index in uvs array
     * @param indiceNormalFromObj Integer The index in normals array
     * @param positionVectorFromOBJ Vector3 The value of position at index objIndice
     * @param textureVectorFromOBJ Vector3 The value of uvs
     * @param normalsVectorFromOBJ Vector3 The value of normals at index objNormale
     * @param positionColorsFromOBJ
     */
    SolidParser.prototype._setData = function (indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, positionVectorFromOBJ, textureVectorFromOBJ, normalsVectorFromOBJ, positionColorsFromOBJ) {
        //Check if this tuple already exists in the list of tuples
        var _index;
        if (this._loadingOptions.optimizeWithUV) {
            _index = this._isInArrayUV(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj, indiceUvsFromObj]);
        }
        else {
            _index = this._isInArray(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj]);
        }
        //If it not exists
        if (_index === -1) {
            //Add an new indice.
            //The array of indices is only an array with his length equal to the number of triangles - 1.
            //We add vertices data in this order
            this._indicesForBabylon.push(this._wrappedPositionForBabylon.length);
            //Push the position of vertice for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedPositionForBabylon.push(positionVectorFromOBJ);
            //Push the uvs for Babylon
            //Each element is a Vector3(u,v)
            this._wrappedUvsForBabylon.push(textureVectorFromOBJ);
            //Push the normals for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedNormalsForBabylon.push(normalsVectorFromOBJ);
            if (positionColorsFromOBJ !== undefined) {
                //Push the colors for Babylon
                //Each element is a BABYLON.Color4(r,g,b,a)
                this._wrappedColorsForBabylon.push(positionColorsFromOBJ);
            }
            //Add the tuple in the comparison list
            this._tuplePosNorm[indicePositionFromObj].normals.push(indiceNormalFromObj);
            this._tuplePosNorm[indicePositionFromObj].idx.push(this._curPositionInIndices++);
            if (this._loadingOptions.optimizeWithUV) {
                this._tuplePosNorm[indicePositionFromObj].uv.push(indiceUvsFromObj);
            }
        }
        else {
            //The tuple already exists
            //Add the index of the already existing tuple
            //At this index we can get the value of position, normal, color and uvs of vertex
            this._indicesForBabylon.push(_index);
        }
    };
    /**
     * Transform Vector() and BABYLON.Color() objects into numbers in an array
     */
    SolidParser.prototype._unwrapData = function () {
        //Every array has the same length
        for (var l = 0; l < this._wrappedPositionForBabylon.length; l++) {
            //Push the x, y, z values of each element in the unwrapped array
            this._unwrappedPositionsForBabylon.push(this._wrappedPositionForBabylon[l].x * this._handednessSign, this._wrappedPositionForBabylon[l].y, this._wrappedPositionForBabylon[l].z);
            this._unwrappedNormalsForBabylon.push(this._wrappedNormalsForBabylon[l].x * this._handednessSign, this._wrappedNormalsForBabylon[l].y, this._wrappedNormalsForBabylon[l].z);
            this._unwrappedUVForBabylon.push(this._wrappedUvsForBabylon[l].x, this._wrappedUvsForBabylon[l].y); //z is an optional value not supported by BABYLON
            if (this._loadingOptions.importVertexColors) {
                //Push the r, g, b, a values of each element in the unwrapped array
                this._unwrappedColorsForBabylon.push(this._wrappedColorsForBabylon[l].r, this._wrappedColorsForBabylon[l].g, this._wrappedColorsForBabylon[l].b, this._wrappedColorsForBabylon[l].a);
            }
        }
        // Reset arrays for the next new meshes
        this._wrappedPositionForBabylon.length = 0;
        this._wrappedNormalsForBabylon.length = 0;
        this._wrappedUvsForBabylon.length = 0;
        this._wrappedColorsForBabylon.length = 0;
        this._tuplePosNorm.length = 0;
        this._curPositionInIndices = 0;
    };
    /**
     * Create triangles from polygons
     * It is important to notice that a triangle is a polygon
     * We get 5 patterns of face defined in OBJ File :
     * facePattern1 = ["1","2","3","4","5","6"]
     * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
     * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
     * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
     * facePattern5 = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-4/-4/-4","-5/-5/-5","-6/-6/-6"]
     * Each pattern is divided by the same method
     * @param faces Array[String] The indices of elements
     * @param v Integer The variable to increment
     */
    SolidParser.prototype._getTriangles = function (faces, v) {
        //Work for each element of the array
        for (var faceIndex = v; faceIndex < faces.length - 1; faceIndex++) {
            //Add on the triangle variable the indexes to obtain triangles
            this._pushTriangle(faces, faceIndex);
        }
        //Result obtained after 2 iterations:
        //Pattern1 => triangle = ["1","2","3","1","3","4"];
        //Pattern2 => triangle = ["1/1","2/2","3/3","1/1","3/3","4/4"];
        //Pattern3 => triangle = ["1/1/1","2/2/2","3/3/3","1/1/1","3/3/3","4/4/4"];
        //Pattern4 => triangle = ["1//1","2//2","3//3","1//1","3//3","4//4"];
        //Pattern5 => triangle = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-1/-1/-1","-3/-3/-3","-4/-4/-4"];
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 1
     * In this pattern we get vertice positions
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern1 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        //For each element in the triangles array.
        //This var could contains 1 to an infinity of triangles
        for (var k = 0; k < this._triangles.length; k++) {
            // Set position indice
            var indicePositionFromObj = parseInt(this._triangles[k]) - 1;
            this._setData(indicePositionFromObj, 0, 0, // In the pattern 1, normals and uvs are not defined
            this._positions[indicePositionFromObj], // Get the vectors data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), // Create default vectors
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 2
     * In this pattern we get vertice positions and uvs
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern2 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1"
            //Split the data for getting position and uv
            var point = this._triangles[k].split("/"); // ["1", "1"]
            //Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            //Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, 0, //Default value for normals
            this._positions[indicePositionFromObj], //Get the values for each element
            this._uvs[indiceUvsFromObj], babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), //Default value for normals
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern3 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1/1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["1", "1", "1"]
            // Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            // Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            // Set normal indice
            var indiceNormalFromObj = parseInt(point[2]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj] //Set the vector for each component
            );
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 4
     * In this pattern we get vertice positions and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern4 = function (face, v) {
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1//1"
            //Split the data for getting position and normals
            var point = this._triangles[k].split("//"); // ["1", "1"]
            // We check indices, and normals
            var indicePositionFromObj = parseInt(point[0]) - 1;
            var indiceNormalFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, 1, //Default value for uv
            indiceNormalFromObj, this._positions[indicePositionFromObj], //Get each vector of data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), this._normals[indiceNormalFromObj], this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /*
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern5 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "-1/-1/-1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["-1", "-1", "-1"]
            // Set position indice
            var indicePositionFromObj = this._positions.length + parseInt(point[0]);
            // Set uv indice
            var indiceUvsFromObj = this._uvs.length + parseInt(point[1]);
            // Set normal indice
            var indiceNormalFromObj = this._normals.length + parseInt(point[2]);
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj], //Set the vector for each component
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    SolidParser.prototype._addPreviousObjMesh = function () {
        //Check if it is not the first mesh. Otherwise we don't have data.
        if (this._meshesFromObj.length > 0) {
            //Get the previous mesh for applying the data about the faces
            //=> in obj file, faces definition append after the name of the mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            //Set the data into Array for the mesh
            this._unwrapData();
            if (this._loadingOptions.useLegacyBehavior) {
                // Reverse tab. Otherwise face are displayed in the wrong sens
                this._indicesForBabylon.reverse();
            }
            //Set the information for the mesh
            //Slice the array to avoid rewriting because of the fact this is the same var which be rewrited
            this._handledMesh.indices = this._indicesForBabylon.slice();
            this._handledMesh.positions = this._unwrappedPositionsForBabylon.slice();
            this._handledMesh.normals = this._unwrappedNormalsForBabylon.slice();
            this._handledMesh.uvs = this._unwrappedUVForBabylon.slice();
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon.slice();
            }
            //Reset the array for the next mesh
            this._indicesForBabylon.length = 0;
            this._unwrappedPositionsForBabylon.length = 0;
            this._unwrappedColorsForBabylon.length = 0;
            this._unwrappedNormalsForBabylon.length = 0;
            this._unwrappedUVForBabylon.length = 0;
        }
    };
    SolidParser.prototype._optimizeNormals = function (mesh) {
        var positions = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
        var normals = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
        var mapVertices = {};
        if (!positions || !normals) {
            return;
        }
        for (var i = 0; i < positions.length / 3; i++) {
            var x = positions[i * 3 + 0];
            var y = positions[i * 3 + 1];
            var z = positions[i * 3 + 2];
            var key = x + "_" + y + "_" + z;
            var lst = mapVertices[key];
            if (!lst) {
                lst = [];
                mapVertices[key] = lst;
            }
            lst.push(i);
        }
        var normal = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        for (var key in mapVertices) {
            var lst = mapVertices[key];
            if (lst.length < 2) {
                continue;
            }
            var v0Idx = lst[0];
            for (var i = 1; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[v0Idx * 3 + 0] += normals[vIdx * 3 + 0];
                normals[v0Idx * 3 + 1] += normals[vIdx * 3 + 1];
                normals[v0Idx * 3 + 2] += normals[vIdx * 3 + 2];
            }
            normal.copyFromFloats(normals[v0Idx * 3 + 0], normals[v0Idx * 3 + 1], normals[v0Idx * 3 + 2]);
            normal.normalize();
            for (var i = 0; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[vIdx * 3 + 0] = normal.x;
                normals[vIdx * 3 + 1] = normal.y;
                normals[vIdx * 3 + 2] = normal.z;
            }
        }
        mesh.setVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
    };
    /**
     * Function used to parse an OBJ string
     * @param meshesNames defines the list of meshes to load (all if not defined)
     * @param data defines the OBJ string
     * @param scene defines the hosting scene
     * @param assetContainer defines the asset container to load data in
     * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
     */
    SolidParser.prototype.parse = function (meshesNames, data, scene, assetContainer, onFileToLoadFound) {
        var _this = this;
        var _a;
        if (this._loadingOptions.useLegacyBehavior) {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]); };
            this._handednessSign = 1;
        }
        else if (scene.useRightHandedSystem) {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex + 1], faces[faceIndex]); };
            this._handednessSign = 1;
        }
        else {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]); };
            this._handednessSign = -1;
        }
        // Split the file into lines
        var lines = data.split("\n");
        // Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim().replace(/\s\s/g, " ");
            var result = void 0;
            // Comment or newLine
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
                //Get information about one position possible for the vertices
            }
            else if (SolidParser.VertexPattern.test(line)) {
                result = line.match(/[^ ]+/g); // match will return non-null due to passing regex pattern
                // Value of result with line: "v 1.0 2.0 3.0"
                // ["v", "1.0", "2.0", "3.0"]
                // Create a Vector3 with the position x, y, z
                this._positions.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
                if (this._loadingOptions.importVertexColors) {
                    if (result.length >= 7) {
                        var r = parseFloat(result[4]);
                        var g = parseFloat(result[5]);
                        var b = parseFloat(result[6]);
                        this._colors.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(r > 1 ? r / 255 : r, g > 1 ? g / 255 : g, b > 1 ? b / 255 : b, result.length === 7 || result[7] === undefined ? 1 : parseFloat(result[7])));
                    }
                    else {
                        // TODO: maybe push NULL and if all are NULL to skip (and remove grayColor var).
                        this._colors.push(this._grayColor);
                    }
                }
            }
            else if ((result = SolidParser.NormalPattern.exec(line)) !== null) {
                //Create a Vector3 with the normals x, y, z
                //Value of result
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                //Add the Vector in the list of normals
                this._normals.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
            }
            else if ((result = SolidParser.UVPattern.exec(line)) !== null) {
                //Create a Vector2 with the normals u, v
                //Value of result
                // ["vt 0.1 0.2 0.3", "0.1", "0.2"]
                //Add the Vector in the list of uvs
                this._uvs.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(parseFloat(result[1]) * this._loadingOptions.UVScaling.x, parseFloat(result[2]) * this._loadingOptions.UVScaling.y));
                //Identify patterns of faces
                //Face could be defined in different type of pattern
            }
            else if ((result = SolidParser.FacePattern3.exec(line)) !== null) {
                //Value of result:
                //["f 1/1/1 2/2/2 3/3/3", "1/1/1 2/2/2 3/3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2", "3/3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern4.exec(line)) !== null) {
                //Value of result:
                //["f 1//1 2//2 3//3", "1//1 2//2 3//3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern4(result[1].trim().split(" "), // ["1//1", "2//2", "3//3"]
                1);
            }
            else if ((result = SolidParser.FacePattern5.exec(line)) !== null) {
                //Value of result:
                //["f -1/-1/-1 -2/-2/-2 -3/-3/-3", "-1/-1/-1 -2/-2/-2 -3/-3/-3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern5(result[1].trim().split(" "), // ["-1/-1/-1", "-2/-2/-2", "-3/-3/-3"]
                1);
            }
            else if ((result = SolidParser.FacePattern2.exec(line)) !== null) {
                //Value of result:
                //["f 1/1 2/2 3/3", "1/1 2/2 3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2", "3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern1.exec(line)) !== null) {
                //Value of result
                //["f 1 2 3", "1 2 3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2", "3"]
                1);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern1.exec(line)) !== null) {
                //Value of result
                //["l 1 2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2"]
                0);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern2.exec(line)) !== null) {
                //Value of result
                //["l 1/1 2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2"]
                0);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern3.exec(line)) !== null) {
                //Value of result
                //["l 1/1/1 2/2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2"]
                0);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if (SolidParser.GroupDescriptor.test(line) || SolidParser.ObjectDescriptor.test(line)) {
                // Create a new mesh corresponding to the name of the group.
                // Definition of the mesh
                var objMesh = {
                    name: line.substring(2).trim(),
                    indices: null,
                    positions: null,
                    normals: null,
                    uvs: null,
                    colors: null,
                    materialName: this._materialNameFromObj,
                    isObject: SolidParser.ObjectDescriptor.test(line),
                };
                this._addPreviousObjMesh();
                //Push the last mesh created with only the name
                this._meshesFromObj.push(objMesh);
                //Set this variable to indicate that now meshesFromObj has objects defined inside
                this._hasMeshes = true;
                this._isFirstMaterial = true;
                this._increment = 1;
                //Keyword for applying a material
            }
            else if (SolidParser.UseMtlDescriptor.test(line)) {
                //Get the name of the material
                this._materialNameFromObj = line.substring(7).trim();
                //If this new material is in the same mesh
                if (!this._isFirstMaterial || !this._hasMeshes) {
                    //Set the data for the previous mesh
                    this._addPreviousObjMesh();
                    //Create a new mesh
                    var objMesh = 
                    //Set the name of the current obj mesh
                    {
                        name: (this._objMeshName || "mesh") + "_mm" + this._increment.toString(),
                        indices: null,
                        positions: null,
                        normals: null,
                        uvs: null,
                        colors: null,
                        materialName: this._materialNameFromObj,
                        isObject: false,
                    };
                    this._increment++;
                    //If meshes are already defined
                    this._meshesFromObj.push(objMesh);
                    this._hasMeshes = true;
                }
                //Set the material name if the previous line define a mesh
                if (this._hasMeshes && this._isFirstMaterial) {
                    //Set the material name to the previous mesh (1 material per mesh)
                    this._meshesFromObj[this._meshesFromObj.length - 1].materialName = this._materialNameFromObj;
                    this._isFirstMaterial = false;
                }
                // Keyword for loading the mtl file
            }
            else if (SolidParser.MtlLibGroupDescriptor.test(line)) {
                // Get the name of mtl file
                onFileToLoadFound(line.substring(7).trim());
                // Apply smoothing
            }
            else if (SolidParser.SmoothDescriptor.test(line)) {
                // smooth shading => apply smoothing
                // Today I don't know it work with babylon and with obj.
                // With the obj file  an integer is set
            }
            else {
                //If there is another possibility
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("Unhandled expression at line : " + line);
            }
        }
        // At the end of the file, add the last mesh into the meshesFromObj array
        if (this._hasMeshes) {
            // Set the data for the last mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            if (this._loadingOptions.useLegacyBehavior) {
                //Reverse indices for displaying faces in the good sense
                this._indicesForBabylon.reverse();
            }
            //Get the good array
            this._unwrapData();
            //Set array
            this._handledMesh.indices = this._indicesForBabylon;
            this._handledMesh.positions = this._unwrappedPositionsForBabylon;
            this._handledMesh.normals = this._unwrappedNormalsForBabylon;
            this._handledMesh.uvs = this._unwrappedUVForBabylon;
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon;
            }
        }
        // If any o or g keyword not found, create a mesh with a random id
        if (!this._hasMeshes) {
            var newMaterial = null;
            if (this._indicesForBabylon.length) {
                if (this._loadingOptions.useLegacyBehavior) {
                    // reverse tab of indices
                    this._indicesForBabylon.reverse();
                }
                //Get positions normals uvs
                this._unwrapData();
            }
            else {
                // There is no indices in the file. We will have to switch to point cloud rendering
                for (var _i = 0, _b = this._positions; _i < _b.length; _i++) {
                    var pos = _b[_i];
                    this._unwrappedPositionsForBabylon.push(pos.x, pos.y, pos.z);
                }
                if (this._normals.length) {
                    for (var _c = 0, _d = this._normals; _c < _d.length; _c++) {
                        var normal = _d[_c];
                        this._unwrappedNormalsForBabylon.push(normal.x, normal.y, normal.z);
                    }
                }
                if (this._uvs.length) {
                    for (var _e = 0, _f = this._uvs; _e < _f.length; _e++) {
                        var uv = _f[_e];
                        this._unwrappedUVForBabylon.push(uv.x, uv.y);
                    }
                }
                if (this._colors.length) {
                    for (var _g = 0, _h = this._colors; _g < _h.length; _g++) {
                        var color = _h[_g];
                        this._unwrappedColorsForBabylon.push(color.r, color.g, color.b, color.a);
                    }
                }
                if (!this._materialNameFromObj) {
                    // Create a material with point cloud on
                    newMaterial = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(), scene);
                    newMaterial.pointsCloud = true;
                    this._materialNameFromObj = newMaterial.name;
                    if (!this._normals.length) {
                        newMaterial.disableLighting = true;
                        newMaterial.emissiveColor = babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                    }
                }
            }
            //Set data for one mesh
            this._meshesFromObj.push({
                name: babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(),
                indices: this._indicesForBabylon,
                positions: this._unwrappedPositionsForBabylon,
                colors: this._unwrappedColorsForBabylon,
                normals: this._unwrappedNormalsForBabylon,
                uvs: this._unwrappedUVForBabylon,
                materialName: this._materialNameFromObj,
                directMaterial: newMaterial,
                isObject: true,
            });
        }
        //Set data for each mesh
        for (var j = 0; j < this._meshesFromObj.length; j++) {
            //check meshesNames (stlFileLoader)
            if (meshesNames && this._meshesFromObj[j].name) {
                if (meshesNames instanceof Array) {
                    if (meshesNames.indexOf(this._meshesFromObj[j].name) === -1) {
                        continue;
                    }
                }
                else {
                    if (this._meshesFromObj[j].name !== meshesNames) {
                        continue;
                    }
                }
            }
            //Get the current mesh
            //Set the data with VertexBuffer for each mesh
            this._handledMesh = this._meshesFromObj[j];
            //Create a Mesh with the name of the obj mesh
            scene._blockEntityCollection = !!assetContainer;
            var babylonMesh = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Mesh(this._meshesFromObj[j].name, scene);
            babylonMesh._parentContainer = assetContainer;
            scene._blockEntityCollection = false;
            this._handledMesh._babylonMesh = babylonMesh;
            // If this is a group mesh, it should have an object mesh as a parent. So look for the first object mesh that appears before it.
            if (!this._handledMesh.isObject) {
                for (var k = j - 1; k >= 0; --k) {
                    if (this._meshesFromObj[k].isObject && this._meshesFromObj[k]._babylonMesh) {
                        babylonMesh.parent = this._meshesFromObj[k]._babylonMesh;
                        break;
                    }
                }
            }
            //Push the name of the material to an array
            //This is indispensable for the importMesh function
            this._materialToUse.push(this._meshesFromObj[j].materialName);
            if (((_a = this._handledMesh.positions) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                //Push the mesh into an array
                this._babylonMeshesArray.push(babylonMesh);
                continue;
            }
            var vertexData = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData(); //The container for the values
            //Set the data for the babylonMesh
            vertexData.uvs = this._handledMesh.uvs;
            vertexData.indices = this._handledMesh.indices;
            vertexData.positions = this._handledMesh.positions;
            if (this._loadingOptions.computeNormals) {
                var normals = new Array();
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData.ComputeNormals(this._handledMesh.positions, this._handledMesh.indices, normals);
                vertexData.normals = normals;
            }
            else {
                vertexData.normals = this._handledMesh.normals;
            }
            if (this._loadingOptions.importVertexColors) {
                vertexData.colors = this._handledMesh.colors;
            }
            //Set the data from the VertexBuffer to the current Mesh
            vertexData.applyToMesh(babylonMesh);
            if (this._loadingOptions.invertY) {
                babylonMesh.scaling.y *= -1;
            }
            if (this._loadingOptions.optimizeNormals) {
                this._optimizeNormals(babylonMesh);
            }
            //Push the mesh into an array
            this._babylonMeshesArray.push(babylonMesh);
            if (this._handledMesh.directMaterial) {
                babylonMesh.material = this._handledMesh.directMaterial;
            }
        }
    };
    // Descriptor
    /** Object descriptor */
    SolidParser.ObjectDescriptor = /^o/;
    /** Group descriptor */
    SolidParser.GroupDescriptor = /^g/;
    /** Material lib descriptor */
    SolidParser.MtlLibGroupDescriptor = /^mtllib /;
    /** Use a material descriptor */
    SolidParser.UseMtlDescriptor = /^usemtl /;
    /** Smooth descriptor */
    SolidParser.SmoothDescriptor = /^s /;
    // Patterns
    /** Pattern used to detect a vertex */
    SolidParser.VertexPattern = /^v(\s+[\d|.|+|\-|e|E]+){3,7}/;
    /** Pattern used to detect a normal */
    SolidParser.NormalPattern = /^vn(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a UV set */
    SolidParser.UVPattern = /^vt(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
    SolidParser.FacePattern1 = /^f\s+(([\d]{1,}[\s]?){3,})+/;
    /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
    SolidParser.FacePattern2 = /^f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.FacePattern3 = /^f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
    SolidParser.FacePattern4 = /^f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
    SolidParser.FacePattern5 = /^f\s+(((-[\d]{1,}\/-[\d]{1,}\/-[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a line(l vertex vertex) */
    SolidParser.LinePattern1 = /^l\s+(([\d]{1,}[\s]?){2,})+/;
    /** Pattern used to detect a second kind of line (l vertex/uvs vertex/uvs) */
    SolidParser.LinePattern2 = /^l\s+((([\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    /** Pattern used to detect a third kind of line (l vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.LinePattern3 = /^l\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    return SolidParser;
}());


/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts":
/*!***************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-objFileLoader.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.SolidParser)
/* harmony export */ });
/* harmony import */ var loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/OBJ/index */ "../../../dev/loaders/src/OBJ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[key];
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
  !*** ./src/objFileLoader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-objFileLoader */ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5vYmpGaWxlTG9hZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBSUE7O0FBRUE7QUFDQTtBQUFBO0FBTUE7O0FBRUE7QUFDQTtBQStNQTtBQTdNQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBdE5BOztBQUVBO0FBQ0E7QUFvTkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pPQTtBQUNBO0FBR0E7QUFDQTtBQUdBO0FBRUE7QUFHQTs7O0FBR0E7QUFDQTtBQW1FQTs7OztBQUlBO0FBQ0E7QUFsQkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQVVBO0FBQ0E7QUE5REE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBSkE7QUE4REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxUQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQVlBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFnUUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFVQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBZUE7O0FBRUE7QUFDQTtBQW1FQTs7Ozs7QUFLQTtBQUNBO0FBbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7O0FBYUE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3MkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNDBCQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5NEJBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDaEJBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvT0JKL210bEZpbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvT0JKL29iakZpbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvT0JKL3NvbGlkUGFyc2VyLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vbHRzL2xvYWRlcnMvc3JjL2xlZ2FjeS9sZWdhY3ktb2JqRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0xPQURFUlMvLi9zcmMvb2JqRmlsZUxvYWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtbG9hZGVyc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLWxvYWRlcnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkxPQURFUlNcIl0gPSBmYWN0b3J5KHJvb3RbXCJCQUJZTE9OXCJdKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NaXNjX29ic2VydmFibGVfXykgPT4ge1xucmV0dXJuICIsImV4cG9ydCAqIGZyb20gXCIuL210bEZpbGVMb2FkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vb2JqTG9hZGluZ09wdGlvbnNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc29saWRQYXJzZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vb2JqRmlsZUxvYWRlclwiO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbi8qKlxyXG4gKiBDbGFzcyByZWFkaW5nIGFuZCBwYXJzaW5nIHRoZSBNVEwgZmlsZSBidW5kbGVkIHdpdGggdGhlIG9iaiBmaWxlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1UTEZpbGVMb2FkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZlcnQgWS1BeGlzIG9mIHJlZmVyZW5jZWQgdGV4dHVyZXMgb24gbG9hZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIElOVkVSVF9URVhUVVJFX1kgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIG1hdGVyaWFsIGxvYWRlZCBmcm9tIHRoZSBtdGwgd2lsbCBiZSBzZXQgaGVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzOiBTdGFuZGFyZE1hdGVyaWFsW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCByZWFkIHRoZSBtdGwgZmlsZSBhbmQgY3JlYXRlIGVhY2ggbWF0ZXJpYWwgZGVzY3JpYmVkIGluc2lkZVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjb3VsZCBiZSBpbXByb3ZlIGJ5IGFkZGluZyA6XHJcbiAgICAgKiAtc29tZSBjb21wb25lbnQgbWlzc2luZyAoTmksIFRmLi4uKVxyXG4gICAgICogLWluY2x1ZGluZyB0aGUgc3BlY2lmaWMgb3B0aW9ucyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgc2NlbmUgdGhlIG1hdGVyaWFsIHdpbGwgYmUgY3JlYXRlZCBpblxyXG4gICAgICogQHBhcmFtIGRhdGEgZGVmaW5lcyB0aGUgbXRsIGRhdGEgdG8gcGFyc2VcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3R1cmwgdG8gdXNlIGluIG9yZGVyIHRvIGxvYWQgcmVsYXRpdmUgZGVwZW5kZW5jaWVzXHJcbiAgICAgKiBAcGFyYW0gYXNzZXRDb250YWluZXIgZGVmaW5lcyB0aGUgYXNzZXQgY29udGFpbmVyIHRvIHN0b3JlIHRoZSBtYXRlcmlhbCBpbiAoY2FuIGJlIG51bGwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYXJzZU1UTChzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZyB8IEFycmF5QnVmZmVyLCByb290VXJsOiBzdHJpbmcsIGFzc2V0Q29udGFpbmVyOiBOdWxsYWJsZTxBc3NldENvbnRhaW5lcj4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU3BsaXQgdGhlIGxpbmVzIGZyb20gdGhlIGZpbGVcclxuICAgICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgLy8gd2hpdGVzcGFjZSBjaGFyIGllOiBbIFxcdFxcclxcblxcZl1cclxuICAgICAgICBjb25zdCBkZWxpbWl0ZXJfcGF0dGVybiA9IC9cXHMrLztcclxuICAgICAgICAvL0FycmF5IHdpdGggUkdCIGNvbG9yc1xyXG4gICAgICAgIGxldCBjb2xvcjogbnVtYmVyW107XHJcbiAgICAgICAgLy9OZXcgbWF0ZXJpYWxcclxuICAgICAgICBsZXQgbWF0ZXJpYWw6IE51bGxhYmxlPFN0YW5kYXJkTWF0ZXJpYWw+ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy9Mb29rIGF0IGVhY2ggbGluZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2ldLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJsYW5rIGxpbmUgb3IgY29tbWVudFxyXG4gICAgICAgICAgICBpZiAobGluZS5sZW5ndGggPT09IDAgfHwgbGluZS5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9HZXQgdGhlIGZpcnN0IHBhcmFtZXRlciAoa2V5d29yZClcclxuICAgICAgICAgICAgY29uc3QgcG9zID0gbGluZS5pbmRleE9mKFwiIFwiKTtcclxuICAgICAgICAgICAgbGV0IGtleSA9IHBvcyA+PSAwID8gbGluZS5zdWJzdHJpbmcoMCwgcG9zKSA6IGxpbmU7XHJcbiAgICAgICAgICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9HZXQgdGhlIGRhdGEgZm9sbG93aW5nIHRoZSBrZXlcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHBvcyA+PSAwID8gbGluZS5zdWJzdHJpbmcocG9zICsgMSkudHJpbSgpIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vVGhpcyBtdGwga2V5d29yZCB3aWxsIGNyZWF0ZSB0aGUgbmV3IG1hdGVyaWFsXHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwibmV3bXRsXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgaXQgaXMgdGhlIGZpcnN0IG1hdGVyaWFsLlxyXG4gICAgICAgICAgICAgICAgLy8gTWF0ZXJpYWxzIHNwZWNpZmljYXRpb25zIGFyZSBkZXNjcmliZWQgYWZ0ZXIgdGhpcyBrZXl3b3JkLlxyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHByZXZpb3VzIG1hdGVyaWFsIGluIHRoZSBtYXRlcmlhbCBhcnJheS5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgbmV3IG1hdGVyaWFsLlxyXG4gICAgICAgICAgICAgICAgLy8gdmFsdWUgaXMgdGhlIG5hbWUgb2YgdGhlIG1hdGVyaWFsIHJlYWQgaW4gdGhlIG10bCBmaWxlXHJcblxyXG4gICAgICAgICAgICAgICAgc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKHZhbHVlLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5fcGFyZW50Q29udGFpbmVyID0gYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImtkXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIERpZmZ1c2UgY29sb3IgKGNvbG9yIHVuZGVyIHdoaXRlIGxpZ2h0KSB1c2luZyBSR0IgdmFsdWVzXHJcblxyXG4gICAgICAgICAgICAgICAgLy92YWx1ZSAgPSBcInIgZyBiXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gPG51bWJlcltdPnZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yID0gW3IsZyxiXVxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGdoZSBjb2xvciBpbnRvIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImthXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFtYmllbnQgY29sb3IgKGNvbG9yIHVuZGVyIHNoYWRvdykgdXNpbmcgUkdCIHZhbHVlc1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFsdWUgPSBcInIgZyBiXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gPG51bWJlcltdPnZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yID0gW3IsZyxiXVxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGdoZSBjb2xvciBpbnRvIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuYW1iaWVudENvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImtzXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNwZWN1bGFyIGNvbG9yIChjb2xvciB3aGVuIGxpZ2h0IGlzIHJlZmxlY3RlZCBmcm9tIHNoaW55IHN1cmZhY2UpIHVzaW5nIFJHQiB2YWx1ZXNcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhbHVlID0gXCJyIGcgYlwiXHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IDxudW1iZXJbXT52YWx1ZS5zcGxpdChkZWxpbWl0ZXJfcGF0dGVybiwgMykubWFwKHBhcnNlRmxvYXQpO1xyXG4gICAgICAgICAgICAgICAgLy9jb2xvciA9IFtyLGcsYl1cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBjb2xvciBpbnRvIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuc3BlY3VsYXJDb2xvciA9IENvbG9yMy5Gcm9tQXJyYXkoY29sb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJrZVwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbWlzc2l2ZSBjb2xvciB1c2luZyBSR0IgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IHZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5lbWlzc2l2ZUNvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm5zXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vdmFsdWUgPSBcIkludGVnZXJcIlxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuc3BlY3VsYXJQb3dlciA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJkXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vZCBpcyBkaXNzb2x2ZSBmb3IgY3VycmVudCBtYXRlcmlhbC4gSXQgbWVhbiBhbHBoYSBmb3IgQkFCWUxPTlxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGEgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHR1cmVcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBwYXJ0IGNhbiBiZSBpbXByb3ZlZCBieSBhZGRpbmcgdGhlIHBvc3NpYmxlIG9wdGlvbnMgb2YgdGV4dHVyZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfa2FcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYW1iaWVudCB0ZXh0dXJlIG1hcCB3aXRoIGEgbG9hZGVkIGltYWdlXHJcbiAgICAgICAgICAgICAgICAvL1dlIG11c3QgZmlyc3QgZ2V0IHRoZSBmb2xkZXIgb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbWJpZW50VGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibWFwX2tkXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIERpZmZ1c2UgdGV4dHVyZSBtYXAgd2l0aCBhIGxvYWRlZCBpbWFnZVxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSBNVExGaWxlTG9hZGVyLl9HZXRUZXh0dXJlKHJvb3RVcmwsIHZhbHVlLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9rc1wiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTcGVjdWxhciB0ZXh0dXJlIG1hcCB3aXRoIGEgbG9hZGVkIGltYWdlXHJcbiAgICAgICAgICAgICAgICAvL1dlIG11c3QgZmlyc3QgZ2V0IHRoZSBmb2xkZXIgb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zcGVjdWxhclRleHR1cmUgPSBNVExGaWxlTG9hZGVyLl9HZXRUZXh0dXJlKHJvb3RVcmwsIHZhbHVlLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9uc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvL1NwZWN1bGFyXHJcbiAgICAgICAgICAgICAgICAvL1NwZWN1bGFyIGhpZ2hsaWdodCBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgIC8vV2UgbXVzdCBmaXJzdCBnZXQgdGhlIGZvbGRlciBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvL05vdCBzdXBwb3J0ZWQgYnkgQkFCWUxPTlxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfYnVtcFwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1RoZSBidW1wIHRleHR1cmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1bXBNdWx0aXBsaWVySW5kZXggPSB2YWx1ZXMuaW5kZXhPZihcIi1ibVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBidW1wTXVsdGlwbGllcjogTnVsbGFibGU8c3RyaW5nPiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bXBNdWx0aXBsaWVySW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bXBNdWx0aXBsaWVyID0gdmFsdWVzW2J1bXBNdWx0aXBsaWVySW5kZXggKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMuc3BsaWNlKGJ1bXBNdWx0aXBsaWVySW5kZXgsIDIpOyAvLyByZW1vdmVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5idW1wVGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWVzLmpvaW4oXCIgXCIpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwuYnVtcFRleHR1cmUgJiYgYnVtcE11bHRpcGxpZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5idW1wVGV4dHVyZS5sZXZlbCA9IHBhcnNlRmxvYXQoYnVtcE11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfZFwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZGlzc29sdmUgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5vcGFjaXR5VGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL09wdGlvbnMgZm9yIGlsbHVtaW5hdGlvblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJpbGx1bVwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lsbHVtaW5hdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGhhdCBtZWFuIEtkID09IEtkXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29sb3Igb24gYW5kIEFtYmllbnQgb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9IaWdobGlnaHQgb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9SZWZsZWN0aW9uIG9uIGFuZCBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiNFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IEdsYXNzIG9uLCBSZWZsZWN0aW9uOiBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiNVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9SZWZsZWN0aW9uOiBGcmVzbmVsIG9uIGFuZCBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiNlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IFJlZnJhY3Rpb24gb24sIFJlZmxlY3Rpb246IEZyZXNuZWwgb2ZmIGFuZCBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiN1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IFJlZnJhY3Rpb24gb24sIFJlZmxlY3Rpb246IEZyZXNuZWwgb24gYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI4XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1JlZmxlY3Rpb24gb24gYW5kIFJheSB0cmFjZSBvZmZcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiOVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IEdsYXNzIG9uLCBSZWZsZWN0aW9uOiBSYXkgdHJhY2Ugb2ZmXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIjEwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0Nhc3RzIHNoYWRvd3Mgb250byBpbnZpc2libGUgc3VyZmFjZXNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVW5oYW5kbGVkIGV4cHJlc3Npb24gYXQgbGluZSA6IFwiICsgaSArJ1xcbicgKyBcIndpdGggdmFsdWUgOiBcIiArIGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQXQgdGhlIGVuZCBvZiB0aGUgZmlsZSwgYWRkIHRoZSBsYXN0IG1hdGVyaWFsXHJcbiAgICAgICAgaWYgKG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRleHR1cmUgZm9yIHRoZSBtYXRlcmlhbC5cclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGUgbWF0ZXJpYWwgaXMgaW1wb3J0ZWQgZnJvbSBpbnB1dCBmaWxlLFxyXG4gICAgICogV2Ugc2FuaXRpemUgdGhlIHVybCB0byBlbnN1cmUgaXQgdGFrZXMgdGhlIHRleHR1cmUgZnJvbSBhc2lkZSB0aGUgbWF0ZXJpYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSBzdG9yZWQgaW4gdGhlIG10bFxyXG4gICAgICogQHBhcmFtIHNjZW5lXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfR2V0VGV4dHVyZShyb290VXJsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHNjZW5lOiBTY2VuZSk6IE51bGxhYmxlPFRleHR1cmU+IHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHVybCA9IHJvb3RVcmw7XHJcbiAgICAgICAgLy8gTG9hZCBmcm9tIGlucHV0IGZpbGUuXHJcbiAgICAgICAgaWYgKHJvb3RVcmwgPT09IFwiZmlsZTpcIikge1xyXG4gICAgICAgICAgICBsZXQgbGFzdERlbGltaXRlciA9IHZhbHVlLmxhc3RJbmRleE9mKFwiXFxcXFwiKTtcclxuICAgICAgICAgICAgaWYgKGxhc3REZWxpbWl0ZXIgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0RGVsaW1pdGVyID0gdmFsdWUubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdERlbGltaXRlciA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gdmFsdWUuc3Vic3RyKGxhc3REZWxpbWl0ZXIgKyAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBOb3QgZnJvbSBpbnB1dCBmaWxlLlxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmwgKz0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHR1cmUodXJsLCBzY2VuZSwgZmFsc2UsIE1UTEZpbGVMb2FkZXIuSU5WRVJUX1RFWFRVUkVfWSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgSVNjZW5lTG9hZGVyUGx1Z2luQXN5bmMsIElTY2VuZUxvYWRlclBsdWdpbkZhY3RvcnksIElTY2VuZUxvYWRlclBsdWdpbiwgSVNjZW5lTG9hZGVyQXN5bmNSZXN1bHQgfSBmcm9tIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTG9hZGVyIH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFdlYlJlcXVlc3QgfSBmcm9tIFwiY29yZS9NaXNjL3dlYlJlcXVlc3RcIjtcclxuaW1wb3J0IHsgTVRMRmlsZUxvYWRlciB9IGZyb20gXCIuL210bEZpbGVMb2FkZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBPQkpMb2FkaW5nT3B0aW9ucyB9IGZyb20gXCIuL29iakxvYWRpbmdPcHRpb25zXCI7XHJcbmltcG9ydCB7IFNvbGlkUGFyc2VyIH0gZnJvbSBcIi4vc29saWRQYXJzZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuXHJcbi8qKlxyXG4gKiBPQkogZmlsZSB0eXBlIGxvYWRlci5cclxuICogVGhpcyBpcyBhIGJhYnlsb24gc2NlbmUgbG9hZGVyIHBsdWdpbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPQkpGaWxlTG9hZGVyIGltcGxlbWVudHMgSVNjZW5lTG9hZGVyUGx1Z2luQXN5bmMsIElTY2VuZUxvYWRlclBsdWdpbkZhY3Rvcnkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIFVWcyBhcmUgb3B0aW1pemVkIGJ5IGRlZmF1bHQgZHVyaW5nIGxvYWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgT1BUSU1JWkVfV0lUSF9VViA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIEludmVydCBtb2RlbCBvbiB5LWF4aXMgKGRvZXMgYSBtb2RlbCBzY2FsaW5nIGludmVyc2lvbilcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBJTlZFUlRfWSA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZlcnQgWS1BeGlzIG9mIHJlZmVyZW5jZWQgdGV4dHVyZXMgb24gbG9hZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJTlZFUlRfVEVYVFVSRV9ZKCkge1xyXG4gICAgICAgIHJldHVybiBNVExGaWxlTG9hZGVyLklOVkVSVF9URVhUVVJFX1k7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgSU5WRVJUX1RFWFRVUkVfWSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIE1UTEZpbGVMb2FkZXIuSU5WRVJUX1RFWFRVUkVfWSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jbHVkZSBpbiBtZXNoZXMgdGhlIHZlcnRleCBjb2xvcnMgYXZhaWxhYmxlIGluIHNvbWUgT0JKIGZpbGVzLiAgVGhpcyBpcyBub3QgcGFydCBvZiBPQkogc3RhbmRhcmQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSU1QT1JUX1ZFUlRFWF9DT0xPUlMgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogQ29tcHV0ZSB0aGUgbm9ybWFscyBmb3IgdGhlIG1vZGVsLCBldmVuIGlmIG5vcm1hbHMgYXJlIHByZXNlbnQgaW4gdGhlIGZpbGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ09NUFVURV9OT1JNQUxTID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIE9wdGltaXplIHRoZSBub3JtYWxzIGZvciB0aGUgbW9kZWwuIExpZ2h0aW5nIGNhbiBiZSB1bmV2ZW4gaWYgeW91IHVzZSBPcHRpbWl6ZVdpdGhVViA9IHRydWUgYmVjYXVzZSBuZXcgdmVydGljZXMgY2FuIGJlIGNyZWF0ZWQgZm9yIHRoZSBzYW1lIGxvY2F0aW9uIGlmIHRoZXkgcGVydGFpbiB0byBkaWZmZXJlbnQgZmFjZXMuXHJcbiAgICAgKiBVc2luZyBPcHRpbWl6ZWhOb3JtYWxzID0gdHJ1ZSB3aWxsIGhlbHAgc21vb3RoaW5nIHRoZSBsaWdodGluZyBieSBhdmVyYWdpbmcgdGhlIG5vcm1hbHMgb2YgdGhvc2UgdmVydGljZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgT1BUSU1JWkVfTk9STUFMUyA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGN1c3RvbSBzY2FsaW5nIG9mIFVWIGNvb3JkaW5hdGVzIG9mIGxvYWRlZCBtZXNoZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVVZfU0NBTElORyA9IG5ldyBWZWN0b3IyKDEsIDEpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTa2lwIGxvYWRpbmcgdGhlIG1hdGVyaWFscyBldmVuIGlmIGRlZmluZWQgaW4gdGhlIE9CSiBmaWxlIChtYXRlcmlhbHMgYXJlIGlnbm9yZWQpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNLSVBfTUFURVJJQUxTID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIGEgbWF0ZXJpYWwgZmFpbHMgdG8gbG9hZCBPQkogbG9hZGVyIHdpbGwgc2lsZW50bHkgZmFpbCBhbmQgb25TdWNjZXNzKCkgY2FsbGJhY2sgd2lsbCBiZSB0cmlnZ2VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTUFURVJJQUxfTE9BRElOR19GQUlMU19TSUxFTlRMWSA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhc3NldHMgd2l0aG91dCBoYW5kZWRuZXNzIGNvbnZlcnNpb25zLiBUaGlzIGZsYWcgaXMgZm9yIGNvbXBhdGliaWxpdHkuIFVzZSBpdCBvbmx5IGlmIGFic29sdXRlbHkgcmVxdWlyZWQuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVTRV9MRUdBQ1lfQkVIQVZJT1IgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIG5hbWUgb2YgdGhlIHBsdWdpbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hbWUgPSBcIm9ialwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBleHRlbnNpb24gdGhlIHBsdWdpbiBpcyBhYmxlIHRvIGxvYWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBleHRlbnNpb25zID0gXCIub2JqXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfYXNzZXRDb250YWluZXI6IE51bGxhYmxlPEFzc2V0Q29udGFpbmVyPiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGluZ09wdGlvbnM6IE9CSkxvYWRpbmdPcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBsb2FkZXIgZm9yIC5PQkogZmlsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9hZGluZ09wdGlvbnMgb3B0aW9ucyBmb3IgbG9hZGluZyBhbmQgcGFyc2luZyBPQkovTVRMIGZpbGVzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkaW5nT3B0aW9ucz86IE9CSkxvYWRpbmdPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGluZ09wdGlvbnMgPSBsb2FkaW5nT3B0aW9ucyB8fCBPQkpGaWxlTG9hZGVyLl9EZWZhdWx0TG9hZGluZ09wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0IF9EZWZhdWx0TG9hZGluZ09wdGlvbnMoKTogT0JKTG9hZGluZ09wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXB1dGVOb3JtYWxzOiBPQkpGaWxlTG9hZGVyLkNPTVBVVEVfTk9STUFMUyxcclxuICAgICAgICAgICAgb3B0aW1pemVOb3JtYWxzOiBPQkpGaWxlTG9hZGVyLk9QVElNSVpFX05PUk1BTFMsXHJcbiAgICAgICAgICAgIGltcG9ydFZlcnRleENvbG9yczogT0JKRmlsZUxvYWRlci5JTVBPUlRfVkVSVEVYX0NPTE9SUyxcclxuICAgICAgICAgICAgaW52ZXJ0WTogT0JKRmlsZUxvYWRlci5JTlZFUlRfWSxcclxuICAgICAgICAgICAgaW52ZXJ0VGV4dHVyZVk6IE9CSkZpbGVMb2FkZXIuSU5WRVJUX1RFWFRVUkVfWSxcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG4gICAgICAgICAgICBVVlNjYWxpbmc6IE9CSkZpbGVMb2FkZXIuVVZfU0NBTElORyxcclxuICAgICAgICAgICAgbWF0ZXJpYWxMb2FkaW5nRmFpbHNTaWxlbnRseTogT0JKRmlsZUxvYWRlci5NQVRFUklBTF9MT0FESU5HX0ZBSUxTX1NJTEVOVExZLFxyXG4gICAgICAgICAgICBvcHRpbWl6ZVdpdGhVVjogT0JKRmlsZUxvYWRlci5PUFRJTUlaRV9XSVRIX1VWLFxyXG4gICAgICAgICAgICBza2lwTWF0ZXJpYWxzOiBPQkpGaWxlTG9hZGVyLlNLSVBfTUFURVJJQUxTLFxyXG4gICAgICAgICAgICB1c2VMZWdhY3lCZWhhdmlvcjogT0JKRmlsZUxvYWRlci5VU0VfTEVHQUNZX0JFSEFWSU9SLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxscyBzeW5jaHJvbm91c2x5IHRoZSBNVEwgZmlsZSBhdHRhY2hlZCB0byB0aGlzIG9iai5cclxuICAgICAqIExvYWQgZnVuY3Rpb24gb3IgaW1wb3J0TWVzaCBmdW5jdGlvbiBkb24ndCBlbmFibGUgdG8gbG9hZCAyIGZpbGVzIGluIHRoZSBzYW1lIHRpbWUgYXN5bmNocm9ub3VzbHkuXHJcbiAgICAgKiBXaXRob3V0IHRoaXMgZnVuY3Rpb24gbWF0ZXJpYWxzIGFyZSBub3QgZGlzcGxheWVkIGluIHRoZSBmaXJzdCBmcmFtZSAoYnV0IGRpc3BsYXllZCBhZnRlcikuXHJcbiAgICAgKiBJbiBjb25zZXF1ZW5jZSBpdCBpcyBpbXBvc3NpYmxlIHRvIGdldCBtYXRlcmlhbCBpbmZvcm1hdGlvbiBpbiB5b3VyIEhUTUwgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB1cmwgVGhlIFVSTCBvZiB0aGUgTVRMIGZpbGVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgd2hlcmUgdG8gbG9hZCBkYXRhIGZyb21cclxuICAgICAqIEBwYXJhbSBvblN1Y2Nlc3MgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIE1UTCBmaWxlIGlzIGxvYWRlZFxyXG4gICAgICogQHBhcmFtIG9uRmFpbHVyZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9sb2FkTVRMKFxyXG4gICAgICAgIHVybDogc3RyaW5nLFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBvblN1Y2Nlc3M6IChyZXNwb25zZTogc3RyaW5nIHwgQXJyYXlCdWZmZXIsIHJlc3BvbnNlVXJsPzogc3RyaW5nKSA9PiBhbnksXHJcbiAgICAgICAgb25GYWlsdXJlOiAocGF0aE9mRmlsZTogc3RyaW5nLCBleGNlcHRpb24/OiBhbnkpID0+IHZvaWRcclxuICAgICkge1xyXG4gICAgICAgIC8vVGhlIGNvbXBsZXRlIHBhdGggdG8gdGhlIG10bCBmaWxlXHJcbiAgICAgICAgY29uc3QgcGF0aE9mRmlsZSA9IHJvb3RVcmwgKyB1cmw7XHJcblxyXG4gICAgICAgIC8vIExvYWRzIHRocm91Z2ggdGhlIGJhYnlsb24gdG9vbHMgdG8gYWxsb3cgZmlsZUlucHV0IHNlYXJjaC5cclxuICAgICAgICBUb29scy5Mb2FkRmlsZShwYXRoT2ZGaWxlLCBvblN1Y2Nlc3MsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmYWxzZSwgKHJlcXVlc3Q/OiBXZWJSZXF1ZXN0IHwgdW5kZWZpbmVkLCBleGNlcHRpb24/OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgb25GYWlsdXJlKHBhdGhPZkZpbGUsIGV4Y2VwdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBPQkogZmlsZSBsb2FkZXIgcGx1Z2luLlxyXG4gICAgICogQHJldHVybnMgdGhlIGNyZWF0ZWQgcGx1Z2luXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVBsdWdpbigpOiBJU2NlbmVMb2FkZXJQbHVnaW5Bc3luYyB8IElTY2VuZUxvYWRlclBsdWdpbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPQkpGaWxlTG9hZGVyKE9CSkZpbGVMb2FkZXIuX0RlZmF1bHRMb2FkaW5nT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUgZGF0YSBzdHJpbmcgY2FuIGJlIGxvYWRlZCBkaXJlY3RseS5cclxuICAgICAqIEByZXR1cm5zIGlmIHRoZSBkYXRhIGNhbiBiZSBsb2FkZWQgZGlyZWN0bHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbkRpcmVjdExvYWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0cyBvbmUgb3IgbW9yZSBtZXNoZXMgZnJvbSB0aGUgbG9hZGVkIE9CSiBkYXRhIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzTmFtZXMgYSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyBvZiB0aGUgbWVzaCBuYW1lcyB0aGF0IHNob3VsZCBiZSBsb2FkZWQgZnJvbSB0aGUgZmlsZVxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBzY2VuZSB0aGUgbWVzaGVzIHNob3VsZCBiZSBhZGRlZCB0b1xyXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIE9CSiBkYXRhIHRvIGxvYWRcclxuICAgICAqIEBwYXJhbSByb290VXJsIHJvb3QgdXJsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHJldHVybnMgYSBwcm9taXNlIGNvbnRhaW5pbmcgdGhlIGxvYWRlZCBtZXNoZXMsIHBhcnRpY2xlcywgc2tlbGV0b25zIGFuZCBhbmltYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbXBvcnRNZXNoQXN5bmMobWVzaGVzTmFtZXM6IGFueSwgc2NlbmU6IFNjZW5lLCBkYXRhOiBhbnksIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8SVNjZW5lTG9hZGVyQXN5bmNSZXN1bHQ+IHtcclxuICAgICAgICAvL2dldCB0aGUgbWVzaGVzIGZyb20gT0JKIGZpbGVcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VTb2xpZChtZXNoZXNOYW1lcywgc2NlbmUsIGRhdGEsIHJvb3RVcmwpLnRoZW4oKG1lc2hlcykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzaGVzOiBtZXNoZXMsXHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZVN5c3RlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2tlbGV0b25zOiBbXSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkdyb3VwczogW10sXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1Ob2RlczogW10sXHJcbiAgICAgICAgICAgICAgICBnZW9tZXRyaWVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGxpZ2h0czogW10sXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVNYW5hZ2VyczogW10sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnRzIGFsbCBvYmplY3RzIGZyb20gdGhlIGxvYWRlZCBPQkogZGF0YSBhbmQgYWRkcyB0aGVtIHRvIHRoZSBzY2VuZVxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBzY2VuZSB0aGUgb2JqZWN0cyBzaG91bGQgYmUgYWRkZWQgdG9cclxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBPQkogZGF0YSB0byBsb2FkXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCByb290IHVybCB0byBsb2FkIGZyb21cclxuICAgICAqIEByZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBjb21wbGV0ZXMgd2hlbiBvYmplY3RzIGhhdmUgYmVlbiBsb2FkZWQgdG8gdGhlIHNjZW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXN5bmMoc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcsIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vR2V0IHRoZSAzRCBtb2RlbFxyXG4gICAgICAgIHJldHVybiB0aGlzLmltcG9ydE1lc2hBc3luYyhudWxsLCBzY2VuZSwgZGF0YSwgcm9vdFVybCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiB2b2lkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGludG8gYW4gYXNzZXQgY29udGFpbmVyLlxyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBzY2VuZSB0byBsb2FkIGludG9cclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGltcG9ydFxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIGZvciBzY2VuZSBhbmQgcmVzb3VyY2VzXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgbG9hZGVkIGFzc2V0IGNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFzc2V0Q29udGFpbmVyQXN5bmMoc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcsIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8QXNzZXRDb250YWluZXI+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBuZXcgQXNzZXRDb250YWluZXIoc2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0Q29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbXBvcnRNZXNoQXN5bmMobnVsbCwgc2NlbmUsIGRhdGEsIHJvb3RVcmwpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4gY29udGFpbmVyLm1lc2hlcy5wdXNoKG1lc2gpKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbWVzaC5tYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWF0ZXJpYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIubWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIubWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRleHR1cmVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlcyA9IG1hdGVyaWFsLmdldEFjdGl2ZVRleHR1cmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlcy5mb3JFYWNoKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci50ZXh0dXJlcy5pbmRleE9mKHQpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50ZXh0dXJlcy5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hc3NldENvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hc3NldENvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBleDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIHRoZSBPQkogZmlsZSBhbmQgY3JlYXRlIGFuIEFycmF5IG9mIG1lc2hlcy5cclxuICAgICAqIEVhY2ggbWVzaCBjb250YWlucyBhbGwgaW5mb3JtYXRpb24gZ2l2ZW4gYnkgdGhlIE9CSiBhbmQgdGhlIE1UTCBmaWxlLlxyXG4gICAgICogaS5lLiB2ZXJ0aWNlcyBwb3NpdGlvbnMgYW5kIGluZGljZXMsIG9wdGlvbmFsIG5vcm1hbHMgdmFsdWVzLCBvcHRpb25hbCBVViB2YWx1ZXMsIG9wdGlvbmFsIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzTmFtZXMgZGVmaW5lcyBhIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIG9mIHRoZSBtZXNoIG5hbWVzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZCBmcm9tIHRoZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgc2NlbmUgd2hlcmUgYXJlIGRpc3BsYXllZCB0aGUgZGF0YVxyXG4gICAgICogQHBhcmFtIGRhdGEgZGVmaW5lcyB0aGUgY29udGVudCBvZiB0aGUgb2JqIGZpbGVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHBhdGggdG8gdGhlIGZvbGRlclxyXG4gICAgICogQHJldHVybnMgdGhlIGxpc3Qgb2YgbG9hZGVkIG1lc2hlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wYXJzZVNvbGlkKG1lc2hlc05hbWVzOiBhbnksIHNjZW5lOiBTY2VuZSwgZGF0YTogc3RyaW5nLCByb290VXJsOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PEFic3RyYWN0TWVzaD4+IHtcclxuICAgICAgICBsZXQgZmlsZVRvTG9hZDogc3RyaW5nID0gXCJcIjsgLy9UaGUgbmFtZSBvZiB0aGUgbXRsRmlsZSB0byBsb2FkXHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxzRnJvbU1UTEZpbGU6IE1UTEZpbGVMb2FkZXIgPSBuZXcgTVRMRmlsZUxvYWRlcigpO1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsVG9Vc2U6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgY29uc3QgYmFieWxvbk1lc2hlc0FycmF5OiBBcnJheTxNZXNoPiA9IFtdOyAvL1RoZSBtZXNoIGZvciBiYWJ5bG9uXHJcblxyXG4gICAgICAgIC8vIE1haW4gZnVuY3Rpb25cclxuICAgICAgICBjb25zdCBzb2xpZFBhcnNlciA9IG5ldyBTb2xpZFBhcnNlcihtYXRlcmlhbFRvVXNlLCBiYWJ5bG9uTWVzaGVzQXJyYXksIHRoaXMuX2xvYWRpbmdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgc29saWRQYXJzZXIucGFyc2UobWVzaGVzTmFtZXMsIGRhdGEsIHNjZW5lLCB0aGlzLl9hc3NldENvbnRhaW5lciwgKGZpbGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgZmlsZVRvTG9hZCA9IGZpbGVOYW1lO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBsb2FkIHRoZSBtYXRlcmlhbHNcclxuICAgICAgICBjb25zdCBtdGxQcm9taXNlczogQXJyYXk8UHJvbWlzZTx2b2lkPj4gPSBbXTtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgZmlsZSB0byBsb2FkXHJcbiAgICAgICAgaWYgKGZpbGVUb0xvYWQgIT09IFwiXCIgJiYgIXRoaXMuX2xvYWRpbmdPcHRpb25zLnNraXBNYXRlcmlhbHMpIHtcclxuICAgICAgICAgICAgLy9Mb2FkIHRoZSBmaWxlIHN5bmNocm9ub3VzbHlcclxuICAgICAgICAgICAgbXRsUHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkTVRMKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlVG9Mb2FkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290VXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZGF0YUxvYWRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NyZWF0ZSBtYXRlcmlhbHMgdGhhbmtzIE1UTExvYWRlciBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsc0Zyb21NVExGaWxlLnBhcnNlTVRMKHNjZW5lLCBkYXRhTG9hZGVkLCByb290VXJsLCB0aGlzLl9hc3NldENvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Mb29rIGF0IGVhY2ggbWF0ZXJpYWwgbG9hZGVkIGluIHRoZSBtdGwgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbWF0ZXJpYWxzRnJvbU1UTEZpbGUubWF0ZXJpYWxzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGhyZWUgdmFyaWFibGVzIHRvIGdldCBhbGwgbWVzaGVzIHdpdGggdGhlIHNhbWUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfaW5kaWNlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2luZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UaGUgbWF0ZXJpYWwgZnJvbSBNVEwgZmlsZSBpcyB1c2VkIGluIHRoZSBtZXNoZXMgbG9hZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgaW5kaWNlIGluIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdGhlIG1hdGVyaWFsIGlzIG5vdCB1c2VkIGZvciBhbm90aGVyIG1lc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChfaW5kZXggPSBtYXRlcmlhbFRvVXNlLmluZGV4T2YobWF0ZXJpYWxzRnJvbU1UTEZpbGUubWF0ZXJpYWxzW25dLm5hbWUsIHN0YXJ0SW5kZXgpKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5kaWNlcy5wdXNoKF9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4ID0gX2luZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBtYXRlcmlhbCBpcyBub3QgdXNlZCBkaXNwb3NlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5kZXggPT09IC0xICYmIF9pbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgbWF0ZXJpYWwgaXMgbm90IG5lZWRlZCwgcmVtb3ZlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHNGcm9tTVRMRmlsZS5tYXRlcmlhbHNbbl0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBfaW5kaWNlcy5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQXBwbHkgdGhlIG1hdGVyaWFsIHRvIHRoZSBNZXNoIGZvciBlYWNoIG1lc2ggd2l0aCB0aGUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNoID0gYmFieWxvbk1lc2hlc0FycmF5W19pbmRpY2VzW29dXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc0Zyb21NVExGaWxlLm1hdGVyaWFsc1tuXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNoLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVzaC5nZXRUb3RhbEluZGljZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBpbmRpY2VzLCB3ZSBuZWVkIHRvIHR1cm4gb24gcG9pbnQgY2xvdWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwucG9pbnRzQ2xvdWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihgRXJyb3IgcHJvY2Vzc2luZyBNVEwgZmlsZTogJyR7ZmlsZVRvTG9hZH0nYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm1hdGVyaWFsTG9hZGluZ0ZhaWxzU2lsZW50bHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChwYXRoT2ZGaWxlOiBzdHJpbmcsIGV4Y2VwdGlvbj86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihgRXJyb3IgZG93bmxvYWRpbmcgTVRMIGZpbGU6ICcke2ZpbGVUb0xvYWR9J2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm1hdGVyaWFsTG9hZGluZ0ZhaWxzU2lsZW50bHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChleGNlcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmV0dXJuIGFuIGFycmF5IHdpdGggYWxsIE1lc2hcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobXRsUHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYmFieWxvbk1lc2hlc0FycmF5O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5pZiAoU2NlbmVMb2FkZXIpIHtcclxuICAgIC8vQWRkIHRoaXMgbG9hZGVyIGludG8gdGhlIHJlZ2lzdGVyIHBsdWdpblxyXG4gICAgU2NlbmVMb2FkZXIuUmVnaXN0ZXJQbHVnaW4obmV3IE9CSkZpbGVMb2FkZXIoKSk7XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcbmltcG9ydCB7IENvbG9yMywgQ29sb3I0IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyLCBWZWN0b3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB7IEdlb21ldHJ5IH0gZnJvbSBcImNvcmUvTWVzaGVzL2dlb21ldHJ5XCI7XHJcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBWZXJ0ZXhEYXRhIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2gudmVydGV4RGF0YVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB0eXBlIHsgT0JKTG9hZGluZ09wdGlvbnMgfSBmcm9tIFwiLi9vYmpMb2FkaW5nT3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZS9NaXNjL2xvZ2dlclwiO1xyXG5cclxudHlwZSBNZXNoT2JqZWN0ID0ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgaW5kaWNlczogTnVsbGFibGU8QXJyYXk8bnVtYmVyPj47XHJcbiAgICBwb3NpdGlvbnM6IE51bGxhYmxlPEFycmF5PG51bWJlcj4+O1xyXG4gICAgbm9ybWFsczogTnVsbGFibGU8QXJyYXk8bnVtYmVyPj47XHJcbiAgICBjb2xvcnM6IE51bGxhYmxlPEFycmF5PG51bWJlcj4+O1xyXG4gICAgdXZzOiBOdWxsYWJsZTxBcnJheTxudW1iZXI+PjtcclxuICAgIG1hdGVyaWFsTmFtZTogc3RyaW5nO1xyXG4gICAgZGlyZWN0TWF0ZXJpYWw/OiBOdWxsYWJsZTxNYXRlcmlhbD47XHJcbiAgICBpc09iamVjdDogYm9vbGVhbjsgLy8gSWYgdGhlIGVudGl0eSBpcyBkZWZpbmVkIGFzIGFuIG9iamVjdCAoXCJvXCIpLCBvciBncm91cCAoXCJnXCIpXHJcbiAgICBfYmFieWxvbk1lc2g/OiBBYnN0cmFjdE1lc2g7IC8vIFRoZSBjb3JyZXNwb25kaW5nIEJhYnlsb24gbWVzaFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHVzZWQgdG8gbG9hZCBtZXNoIGRhdGEgZnJvbSBPQkogY29udGVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNvbGlkUGFyc2VyIHtcclxuICAgIC8vIERlc2NyaXB0b3JcclxuICAgIC8qKiBPYmplY3QgZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBPYmplY3REZXNjcmlwdG9yID0gL15vLztcclxuICAgIC8qKiBHcm91cCBkZXNjcmlwdG9yICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdyb3VwRGVzY3JpcHRvciA9IC9eZy87XHJcbiAgICAvKiogTWF0ZXJpYWwgbGliIGRlc2NyaXB0b3IgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTXRsTGliR3JvdXBEZXNjcmlwdG9yID0gL15tdGxsaWIgLztcclxuICAgIC8qKiBVc2UgYSBtYXRlcmlhbCBkZXNjcmlwdG9yICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVzZU10bERlc2NyaXB0b3IgPSAvXnVzZW10bCAvO1xyXG4gICAgLyoqIFNtb290aCBkZXNjcmlwdG9yICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNtb290aERlc2NyaXB0b3IgPSAvXnMgLztcclxuXHJcbiAgICAvLyBQYXR0ZXJuc1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSB2ZXJ0ZXggKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVmVydGV4UGF0dGVybiA9IC9edihcXHMrW1xcZHwufCt8XFwtfGV8RV0rKXszLDd9LztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgbm9ybWFsICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE5vcm1hbFBhdHRlcm4gPSAvXnZuKFxccytbXFxkfC58K3xcXC18ZXxFXSspKCArW1xcZHwufCt8XFwtfGV8RV0rKSggK1tcXGR8LnwrfFxcLXxlfEVdKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBVViBzZXQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVVZQYXR0ZXJuID0gL152dChcXHMrW1xcZHwufCt8XFwtfGV8RV0rKSggK1tcXGR8LnwrfFxcLXxlfEVdKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBmaXJzdCBraW5kIG9mIGZhY2UgKGYgdmVydGV4IHZlcnRleCB2ZXJ0ZXgpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZhY2VQYXR0ZXJuMSA9IC9eZlxccysoKFtcXGRdezEsfVtcXHNdPyl7Myx9KSsvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBzZWNvbmQga2luZCBvZiBmYWNlIChmIHZlcnRleC91dnMgdmVydGV4L3V2cyB2ZXJ0ZXgvdXZzKSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGYWNlUGF0dGVybjIgPSAvXmZcXHMrKCgoW1xcZF17MSx9XFwvW1xcZF17MSx9W1xcc10/KXszLH0pKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSB0aGlyZCBraW5kIG9mIGZhY2UgKGYgdmVydGV4L3V2cy9ub3JtYWwgdmVydGV4L3V2cy9ub3JtYWwgdmVydGV4L3V2cy9ub3JtYWwpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZhY2VQYXR0ZXJuMyA9IC9eZlxccysoKChbXFxkXXsxLH1cXC9bXFxkXXsxLH1cXC9bXFxkXXsxLH1bXFxzXT8pezMsfSkrKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIGZvdXJ0aCBraW5kIG9mIGZhY2UgKGYgdmVydGV4Ly9ub3JtYWwgdmVydGV4Ly9ub3JtYWwgdmVydGV4Ly9ub3JtYWwpKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFjZVBhdHRlcm40ID0gL15mXFxzKygoKFtcXGRdezEsfVxcL1xcL1tcXGRdezEsfVtcXHNdPyl7Myx9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgZmlmdGgga2luZCBvZiBmYWNlIChmIC12ZXJ0ZXgvLXV2cy8tbm9ybWFsIC12ZXJ0ZXgvLXV2cy8tbm9ybWFsIC12ZXJ0ZXgvLXV2cy8tbm9ybWFsKSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGYWNlUGF0dGVybjUgPSAvXmZcXHMrKCgoLVtcXGRdezEsfVxcLy1bXFxkXXsxLH1cXC8tW1xcZF17MSx9W1xcc10/KXszLH0pKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBsaW5lKGwgdmVydGV4IHZlcnRleCkgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTGluZVBhdHRlcm4xID0gL15sXFxzKygoW1xcZF17MSx9W1xcc10/KXsyLH0pKy87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIHNlY29uZCBraW5kIG9mIGxpbmUgKGwgdmVydGV4L3V2cyB2ZXJ0ZXgvdXZzKSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMaW5lUGF0dGVybjIgPSAvXmxcXHMrKCgoW1xcZF17MSx9XFwvW1xcZF17MSx9W1xcc10/KXsyLH0pKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSB0aGlyZCBraW5kIG9mIGxpbmUgKGwgdmVydGV4L3V2cy9ub3JtYWwgdmVydGV4L3V2cy9ub3JtYWwpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIExpbmVQYXR0ZXJuMyA9IC9ebFxccysoKChbXFxkXXsxLH1cXC9bXFxkXXsxLH1cXC9bXFxkXXsxLH1bXFxzXT8pezIsfSkrKS87XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGluZ09wdGlvbnM6IE9CSkxvYWRpbmdPcHRpb25zO1xyXG4gICAgcHJpdmF0ZSBfcG9zaXRpb25zOiBBcnJheTxWZWN0b3IzPiA9IFtdOyAvL3ZhbHVlcyBmb3IgdGhlIHBvc2l0aW9ucyBvZiB2ZXJ0aWNlc1xyXG4gICAgcHJpdmF0ZSBfbm9ybWFsczogQXJyYXk8VmVjdG9yMz4gPSBbXTsgLy9WYWx1ZXMgZm9yIHRoZSBub3JtYWxzXHJcbiAgICBwcml2YXRlIF91dnM6IEFycmF5PFZlY3RvcjI+ID0gW107IC8vVmFsdWVzIGZvciB0aGUgdGV4dHVyZXNcclxuICAgIHByaXZhdGUgX2NvbG9yczogQXJyYXk8Q29sb3I0PiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfbWVzaGVzRnJvbU9iajogQXJyYXk8TWVzaE9iamVjdD4gPSBbXTsgLy9bbWVzaF0gQ29udGFpbnMgYWxsIHRoZSBvYmogbWVzaGVzXHJcbiAgICBwcml2YXRlIF9oYW5kbGVkTWVzaDogTWVzaE9iamVjdDsgLy9UaGUgY3VycmVudCBtZXNoIG9mIG1lc2hlcyBhcnJheVxyXG4gICAgcHJpdmF0ZSBfaW5kaWNlc0ZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy9UaGUgbGlzdCBvZiBpbmRpY2VzIGZvciBWZXJ0ZXhEYXRhXHJcbiAgICBwcml2YXRlIF93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uOiBBcnJheTxWZWN0b3IzPiA9IFtdOyAvL1RoZSBsaXN0IG9mIHBvc2l0aW9uIGluIHZlY3RvcnNcclxuICAgIHByaXZhdGUgX3dyYXBwZWRVdnNGb3JCYWJ5bG9uOiBBcnJheTxWZWN0b3IyPiA9IFtdOyAvL0FycmF5IHdpdGggYWxsIHZhbHVlIG9mIHV2cyB0byBtYXRjaCB3aXRoIHRoZSBpbmRpY2VzXHJcbiAgICBwcml2YXRlIF93cmFwcGVkQ29sb3JzRm9yQmFieWxvbjogQXJyYXk8Q29sb3I0PiA9IFtdOyAvLyBBcnJheSB3aXRoIGFsbCBjb2xvciB2YWx1ZXMgdG8gbWF0Y2ggd2l0aCB0aGUgaW5kaWNlc1xyXG4gICAgcHJpdmF0ZSBfd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uOiBBcnJheTxWZWN0b3IzPiA9IFtdOyAvL0FycmF5IHdpdGggYWxsIHZhbHVlIG9mIG5vcm1hbHMgdG8gbWF0Y2ggd2l0aCB0aGUgaW5kaWNlc1xyXG4gICAgcHJpdmF0ZSBfdHVwbGVQb3NOb3JtOiBBcnJheTx7IG5vcm1hbHM6IEFycmF5PG51bWJlcj47IGlkeDogQXJyYXk8bnVtYmVyPjsgdXY6IEFycmF5PG51bWJlcj4gfT4gPSBbXTsgLy9DcmVhdGUgYSB0dXBsZSB3aXRoIGluZGljZSBvZiBQb3NpdGlvbiwgTm9ybWFsLCBVViAgW3Bvcywgbm9ybSwgdXZzXVxyXG4gICAgcHJpdmF0ZSBfY3VyUG9zaXRpb25JbkluZGljZXMgPSAwO1xyXG4gICAgcHJpdmF0ZSBfaGFzTWVzaGVzOiBCb29sZWFuID0gZmFsc2U7IC8vTWVzaGVzIGFyZSBkZWZpbmVkIGluIHRoZSBmaWxlXHJcbiAgICBwcml2YXRlIF91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uOiBBcnJheTxudW1iZXI+ID0gW107IC8vVmFsdWUgb2YgcG9zaXRpb25Gb3JCYWJ5bG9uIHcvbyBWZWN0b3IzKCkgW3gseSx6XVxyXG4gICAgcHJpdmF0ZSBfdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbjogQXJyYXk8bnVtYmVyPiA9IFtdOyAvLyBWYWx1ZSBvZiBjb2xvckZvckJhYnlsb24gdy9vIENvbG9yNCgpIFtyLGcsYixhXVxyXG4gICAgcHJpdmF0ZSBfdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy9WYWx1ZSBvZiBub3JtYWxzRm9yQmFieWxvbiB3L28gVmVjdG9yMygpICBbeCx5LHpdXHJcbiAgICBwcml2YXRlIF91bndyYXBwZWRVVkZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy9WYWx1ZSBvZiB1dnNGb3JCYWJ5bG9uIHcvbyBWZWN0b3IzKCkgICAgICBbeCx5LHpdXHJcbiAgICBwcml2YXRlIF90cmlhbmdsZXM6IEFycmF5PHN0cmluZz4gPSBbXTsgLy9JbmRpY2VzIGZyb20gbmV3IHRyaWFuZ2xlcyBjb21pbmcgZnJvbSBwb2x5Z29uc1xyXG4gICAgcHJpdmF0ZSBfbWF0ZXJpYWxOYW1lRnJvbU9iajogc3RyaW5nID0gXCJcIjsgLy9UaGUgbmFtZSBvZiB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgcHJpdmF0ZSBfb2JqTWVzaE5hbWU6IHN0cmluZyA9IFwiXCI7IC8vVGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgb2JqIG1lc2hcclxuICAgIHByaXZhdGUgX2luY3JlbWVudDogbnVtYmVyID0gMTsgLy9JZCBmb3IgbWVzaGVzIGNyZWF0ZWQgYnkgdGhlIG11bHRpbWF0ZXJpYWxcclxuICAgIHByaXZhdGUgX2lzRmlyc3RNYXRlcmlhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIF9ncmF5Q29sb3IgPSBuZXcgQ29sb3I0KDAuNSwgMC41LCAwLjUsIDEpO1xyXG4gICAgcHJpdmF0ZSBfbWF0ZXJpYWxUb1VzZTogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9iYWJ5bG9uTWVzaGVzQXJyYXk6IEFycmF5PE1lc2g+O1xyXG4gICAgcHJpdmF0ZSBfcHVzaFRyaWFuZ2xlOiAoZmFjZXM6IEFycmF5PHN0cmluZz4sIGZhY2VJbmRleDogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfaGFuZGVkbmVzc1NpZ246IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgU29saWRQYXJzZXJcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbFRvVXNlIGRlZmluZXMgdGhlIGFycmF5IHRvIGZpbGwgd2l0aCB0aGUgbGlzdCBvZiBtYXRlcmlhbHMgdG8gdXNlIChpdCB3aWxsIGJlIGZpbGxlZCBieSB0aGUgcGFyc2UgZnVuY3Rpb24pXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1lc2hlc0FycmF5IGRlZmluZXMgdGhlIGFycmF5IHRvIGZpbGwgd2l0aCB0aGUgbGlzdCBvZiBsb2FkZWQgbWVzaGVzIChpdCB3aWxsIGJlIGZpbGxlZCBieSB0aGUgcGFyc2UgZnVuY3Rpb24pXHJcbiAgICAgKiBAcGFyYW0gbG9hZGluZ09wdGlvbnMgZGVmaW5lcyB0aGUgbG9hZGluZyBvcHRpb25zIHRvIHVzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWF0ZXJpYWxUb1VzZTogc3RyaW5nW10sIGJhYnlsb25NZXNoZXNBcnJheTogQXJyYXk8TWVzaD4sIGxvYWRpbmdPcHRpb25zOiBPQkpMb2FkaW5nT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsVG9Vc2UgPSBtYXRlcmlhbFRvVXNlO1xyXG4gICAgICAgIHRoaXMuX2JhYnlsb25NZXNoZXNBcnJheSA9IGJhYnlsb25NZXNoZXNBcnJheTtcclxuICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucyA9IGxvYWRpbmdPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoIGZvciBvYmogaW4gdGhlIGdpdmVuIGFycmF5LlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gY2hlY2sgaWYgYSBjb3VwbGUgb2YgZGF0YSBhbHJlYWR5IGV4aXN0cyBpbiBhbiBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBJZiBmb3VuZCwgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZvdW5kZWQgdHVwbGUgaW5kZXguIFJldHVybnMgLTEgaWYgbm90IGZvdW5kXHJcbiAgICAgKiBAcGFyYW0gYXJyIEFycmF5PHsgbm9ybWFsczogQXJyYXk8bnVtYmVyPiwgaWR4OiBBcnJheTxudW1iZXI+IH0+XHJcbiAgICAgKiBAcGFyYW0gb2JqIEFycmF5PG51bWJlcj5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pc0luQXJyYXkoYXJyOiBBcnJheTx7IG5vcm1hbHM6IEFycmF5PG51bWJlcj47IGlkeDogQXJyYXk8bnVtYmVyPiB9Piwgb2JqOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgaWYgKCFhcnJbb2JqWzBdXSkge1xyXG4gICAgICAgICAgICBhcnJbb2JqWzBdXSA9IHsgbm9ybWFsczogW10sIGlkeDogW10gfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaWR4ID0gYXJyW29ialswXV0ubm9ybWFscy5pbmRleE9mKG9ialsxXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpZHggPT09IC0xID8gLTEgOiBhcnJbb2JqWzBdXS5pZHhbaWR4XTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc0luQXJyYXlVVihhcnI6IEFycmF5PHsgbm9ybWFsczogQXJyYXk8bnVtYmVyPjsgaWR4OiBBcnJheTxudW1iZXI+OyB1djogQXJyYXk8bnVtYmVyPiB9Piwgb2JqOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgaWYgKCFhcnJbb2JqWzBdXSkge1xyXG4gICAgICAgICAgICBhcnJbb2JqWzBdXSA9IHsgbm9ybWFsczogW10sIGlkeDogW10sIHV2OiBbXSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpZHggPSBhcnJbb2JqWzBdXS5ub3JtYWxzLmluZGV4T2Yob2JqWzFdKTtcclxuXHJcbiAgICAgICAgaWYgKGlkeCAhPSAxICYmIG9ialsyXSA9PT0gYXJyW29ialswXV0udXZbaWR4XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyW29ialswXV0uaWR4W2lkeF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0IHRoZSBkYXRhIGZvciBlYWNoIHRyaWFuZ2xlLlxyXG4gICAgICogRGF0YSBhcmUgcG9zaXRpb24sIG5vcm1hbHMgYW5kIHV2c1xyXG4gICAgICogSWYgYSB0dXBsZSBvZiAocG9zaXRpb24sIG5vcm1hbCkgaXMgbm90IHNldCwgYWRkIHRoZSBkYXRhIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXlcclxuICAgICAqIElmIHRoZSB0dXBsZSBhbHJlYWR5IGV4aXN0LCBhZGQgb25seSB0aGVpciBpbmRpY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW5kaWNlUG9zaXRpb25Gcm9tT2JqIEludGVnZXIgVGhlIGluZGV4IGluIHBvc2l0aW9ucyBhcnJheVxyXG4gICAgICogQHBhcmFtIGluZGljZVV2c0Zyb21PYmogSW50ZWdlciBUaGUgaW5kZXggaW4gdXZzIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gaW5kaWNlTm9ybWFsRnJvbU9iaiBJbnRlZ2VyIFRoZSBpbmRleCBpbiBub3JtYWxzIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25WZWN0b3JGcm9tT0JKIFZlY3RvcjMgVGhlIHZhbHVlIG9mIHBvc2l0aW9uIGF0IGluZGV4IG9iakluZGljZVxyXG4gICAgICogQHBhcmFtIHRleHR1cmVWZWN0b3JGcm9tT0JKIFZlY3RvcjMgVGhlIHZhbHVlIG9mIHV2c1xyXG4gICAgICogQHBhcmFtIG5vcm1hbHNWZWN0b3JGcm9tT0JKIFZlY3RvcjMgVGhlIHZhbHVlIG9mIG5vcm1hbHMgYXQgaW5kZXggb2JqTm9ybWFsZVxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uQ29sb3JzRnJvbU9CSlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhKFxyXG4gICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iajogbnVtYmVyLFxyXG4gICAgICAgIGluZGljZVV2c0Zyb21PYmo6IG51bWJlcixcclxuICAgICAgICBpbmRpY2VOb3JtYWxGcm9tT2JqOiBudW1iZXIsXHJcbiAgICAgICAgcG9zaXRpb25WZWN0b3JGcm9tT0JKOiBWZWN0b3IzLFxyXG4gICAgICAgIHRleHR1cmVWZWN0b3JGcm9tT0JKOiBWZWN0b3IyLFxyXG4gICAgICAgIG5vcm1hbHNWZWN0b3JGcm9tT0JKOiBWZWN0b3IzLFxyXG4gICAgICAgIHBvc2l0aW9uQ29sb3JzRnJvbU9CSj86IENvbG9yNFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy9DaGVjayBpZiB0aGlzIHR1cGxlIGFscmVhZHkgZXhpc3RzIGluIHRoZSBsaXN0IG9mIHR1cGxlc1xyXG4gICAgICAgIGxldCBfaW5kZXg6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMub3B0aW1pemVXaXRoVVYpIHtcclxuICAgICAgICAgICAgX2luZGV4ID0gdGhpcy5faXNJbkFycmF5VVYodGhpcy5fdHVwbGVQb3NOb3JtLCBbaW5kaWNlUG9zaXRpb25Gcm9tT2JqLCBpbmRpY2VOb3JtYWxGcm9tT2JqLCBpbmRpY2VVdnNGcm9tT2JqXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX2luZGV4ID0gdGhpcy5faXNJbkFycmF5KHRoaXMuX3R1cGxlUG9zTm9ybSwgW2luZGljZVBvc2l0aW9uRnJvbU9iaiwgaW5kaWNlTm9ybWFsRnJvbU9ial0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9JZiBpdCBub3QgZXhpc3RzXHJcbiAgICAgICAgaWYgKF9pbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgLy9BZGQgYW4gbmV3IGluZGljZS5cclxuICAgICAgICAgICAgLy9UaGUgYXJyYXkgb2YgaW5kaWNlcyBpcyBvbmx5IGFuIGFycmF5IHdpdGggaGlzIGxlbmd0aCBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHRyaWFuZ2xlcyAtIDEuXHJcbiAgICAgICAgICAgIC8vV2UgYWRkIHZlcnRpY2VzIGRhdGEgaW4gdGhpcyBvcmRlclxyXG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5wdXNoKHRoaXMuX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb24ubGVuZ3RoKTtcclxuICAgICAgICAgICAgLy9QdXNoIHRoZSBwb3NpdGlvbiBvZiB2ZXJ0aWNlIGZvciBCYWJ5bG9uXHJcbiAgICAgICAgICAgIC8vRWFjaCBlbGVtZW50IGlzIGEgVmVjdG9yMyh4LHkseilcclxuICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbi5wdXNoKHBvc2l0aW9uVmVjdG9yRnJvbU9CSik7XHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgdXZzIGZvciBCYWJ5bG9uXHJcbiAgICAgICAgICAgIC8vRWFjaCBlbGVtZW50IGlzIGEgVmVjdG9yMyh1LHYpXHJcbiAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRVdnNGb3JCYWJ5bG9uLnB1c2godGV4dHVyZVZlY3RvckZyb21PQkopO1xyXG4gICAgICAgICAgICAvL1B1c2ggdGhlIG5vcm1hbHMgZm9yIEJhYnlsb25cclxuICAgICAgICAgICAgLy9FYWNoIGVsZW1lbnQgaXMgYSBWZWN0b3IzKHgseSx6KVxyXG4gICAgICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24ucHVzaChub3JtYWxzVmVjdG9yRnJvbU9CSik7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zaXRpb25Db2xvcnNGcm9tT0JKICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgY29sb3JzIGZvciBCYWJ5bG9uXHJcbiAgICAgICAgICAgICAgICAvL0VhY2ggZWxlbWVudCBpcyBhIEJBQllMT04uQ29sb3I0KHIsZyxiLGEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5wdXNoKHBvc2l0aW9uQ29sb3JzRnJvbU9CSik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIHRoZSB0dXBsZSBpbiB0aGUgY29tcGFyaXNvbiBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMuX3R1cGxlUG9zTm9ybVtpbmRpY2VQb3NpdGlvbkZyb21PYmpdLm5vcm1hbHMucHVzaChpbmRpY2VOb3JtYWxGcm9tT2JqKTtcclxuICAgICAgICAgICAgdGhpcy5fdHVwbGVQb3NOb3JtW2luZGljZVBvc2l0aW9uRnJvbU9ial0uaWR4LnB1c2godGhpcy5fY3VyUG9zaXRpb25JbkluZGljZXMrKyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5vcHRpbWl6ZVdpdGhVVikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHVwbGVQb3NOb3JtW2luZGljZVBvc2l0aW9uRnJvbU9ial0udXYucHVzaChpbmRpY2VVdnNGcm9tT2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vVGhlIHR1cGxlIGFscmVhZHkgZXhpc3RzXHJcbiAgICAgICAgICAgIC8vQWRkIHRoZSBpbmRleCBvZiB0aGUgYWxyZWFkeSBleGlzdGluZyB0dXBsZVxyXG4gICAgICAgICAgICAvL0F0IHRoaXMgaW5kZXggd2UgY2FuIGdldCB0aGUgdmFsdWUgb2YgcG9zaXRpb24sIG5vcm1hbCwgY29sb3IgYW5kIHV2cyBvZiB2ZXJ0ZXhcclxuICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucHVzaChfaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zZm9ybSBWZWN0b3IoKSBhbmQgQkFCWUxPTi5Db2xvcigpIG9iamVjdHMgaW50byBudW1iZXJzIGluIGFuIGFycmF5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Vud3JhcERhdGEoKSB7XHJcbiAgICAgICAgLy9FdmVyeSBhcnJheSBoYXMgdGhlIHNhbWUgbGVuZ3RoXHJcbiAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgeCwgeSwgeiB2YWx1ZXMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSB1bndyYXBwZWQgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbi5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbltsXS54ICogdGhpcy5faGFuZGVkbmVzc1NpZ24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uW2xdLnksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uW2xdLnpcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24ucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWROb3JtYWxzRm9yQmFieWxvbltsXS54ICogdGhpcy5faGFuZGVkbmVzc1NpZ24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb25bbF0ueSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWROb3JtYWxzRm9yQmFieWxvbltsXS56XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbi5wdXNoKHRoaXMuX3dyYXBwZWRVdnNGb3JCYWJ5bG9uW2xdLngsIHRoaXMuX3dyYXBwZWRVdnNGb3JCYWJ5bG9uW2xdLnkpOyAvL3ogaXMgYW4gb3B0aW9uYWwgdmFsdWUgbm90IHN1cHBvcnRlZCBieSBCQUJZTE9OXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgciwgZywgYiwgYSB2YWx1ZXMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSB1bndyYXBwZWQgYXJyYXlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZENvbG9yc0ZvckJhYnlsb24ucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbltsXS5yLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uW2xdLmcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZENvbG9yc0ZvckJhYnlsb25bbF0uYixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbltsXS5hXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlc2V0IGFycmF5cyBmb3IgdGhlIG5leHQgbmV3IG1lc2hlc1xyXG4gICAgICAgIHRoaXMuX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdHVwbGVQb3NOb3JtLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY3VyUG9zaXRpb25JbkluZGljZXMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBmcm9tIHBvbHlnb25zXHJcbiAgICAgKiBJdCBpcyBpbXBvcnRhbnQgdG8gbm90aWNlIHRoYXQgYSB0cmlhbmdsZSBpcyBhIHBvbHlnb25cclxuICAgICAqIFdlIGdldCA1IHBhdHRlcm5zIG9mIGZhY2UgZGVmaW5lZCBpbiBPQkogRmlsZSA6XHJcbiAgICAgKiBmYWNlUGF0dGVybjEgPSBbXCIxXCIsXCIyXCIsXCIzXCIsXCI0XCIsXCI1XCIsXCI2XCJdXHJcbiAgICAgKiBmYWNlUGF0dGVybjIgPSBbXCIxLzFcIixcIjIvMlwiLFwiMy8zXCIsXCI0LzRcIixcIjUvNVwiLFwiNi82XCJdXHJcbiAgICAgKiBmYWNlUGF0dGVybjMgPSBbXCIxLzEvMVwiLFwiMi8yLzJcIixcIjMvMy8zXCIsXCI0LzQvNFwiLFwiNS81LzVcIixcIjYvNi82XCJdXHJcbiAgICAgKiBmYWNlUGF0dGVybjQgPSBbXCIxLy8xXCIsXCIyLy8yXCIsXCIzLy8zXCIsXCI0Ly80XCIsXCI1Ly81XCIsXCI2Ly82XCJdXHJcbiAgICAgKiBmYWNlUGF0dGVybjUgPSBbXCItMS8tMS8tMVwiLFwiLTIvLTIvLTJcIixcIi0zLy0zLy0zXCIsXCItNC8tNC8tNFwiLFwiLTUvLTUvLTVcIixcIi02Ly02Ly02XCJdXHJcbiAgICAgKiBFYWNoIHBhdHRlcm4gaXMgZGl2aWRlZCBieSB0aGUgc2FtZSBtZXRob2RcclxuICAgICAqIEBwYXJhbSBmYWNlcyBBcnJheVtTdHJpbmddIFRoZSBpbmRpY2VzIG9mIGVsZW1lbnRzXHJcbiAgICAgKiBAcGFyYW0gdiBJbnRlZ2VyIFRoZSB2YXJpYWJsZSB0byBpbmNyZW1lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0VHJpYW5nbGVzKGZhY2VzOiBBcnJheTxzdHJpbmc+LCB2OiBudW1iZXIpIHtcclxuICAgICAgICAvL1dvcmsgZm9yIGVhY2ggZWxlbWVudCBvZiB0aGUgYXJyYXlcclxuICAgICAgICBmb3IgKGxldCBmYWNlSW5kZXggPSB2OyBmYWNlSW5kZXggPCBmYWNlcy5sZW5ndGggLSAxOyBmYWNlSW5kZXgrKykge1xyXG4gICAgICAgICAgICAvL0FkZCBvbiB0aGUgdHJpYW5nbGUgdmFyaWFibGUgdGhlIGluZGV4ZXMgdG8gb2J0YWluIHRyaWFuZ2xlc1xyXG4gICAgICAgICAgICB0aGlzLl9wdXNoVHJpYW5nbGUoZmFjZXMsIGZhY2VJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1Jlc3VsdCBvYnRhaW5lZCBhZnRlciAyIGl0ZXJhdGlvbnM6XHJcbiAgICAgICAgLy9QYXR0ZXJuMSA9PiB0cmlhbmdsZSA9IFtcIjFcIixcIjJcIixcIjNcIixcIjFcIixcIjNcIixcIjRcIl07XHJcbiAgICAgICAgLy9QYXR0ZXJuMiA9PiB0cmlhbmdsZSA9IFtcIjEvMVwiLFwiMi8yXCIsXCIzLzNcIixcIjEvMVwiLFwiMy8zXCIsXCI0LzRcIl07XHJcbiAgICAgICAgLy9QYXR0ZXJuMyA9PiB0cmlhbmdsZSA9IFtcIjEvMS8xXCIsXCIyLzIvMlwiLFwiMy8zLzNcIixcIjEvMS8xXCIsXCIzLzMvM1wiLFwiNC80LzRcIl07XHJcbiAgICAgICAgLy9QYXR0ZXJuNCA9PiB0cmlhbmdsZSA9IFtcIjEvLzFcIixcIjIvLzJcIixcIjMvLzNcIixcIjEvLzFcIixcIjMvLzNcIixcIjQvLzRcIl07XHJcbiAgICAgICAgLy9QYXR0ZXJuNSA9PiB0cmlhbmdsZSA9IFtcIi0xLy0xLy0xXCIsXCItMi8tMi8tMlwiLFwiLTMvLTMvLTNcIixcIi0xLy0xLy0xXCIsXCItMy8tMy8tM1wiLFwiLTQvLTQvLTRcIl07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdHJpYW5nbGVzIGFuZCBwdXNoIHRoZSBkYXRhIGZvciBlYWNoIHBvbHlnb24gZm9yIHRoZSBwYXR0ZXJuIDFcclxuICAgICAqIEluIHRoaXMgcGF0dGVybiB3ZSBnZXQgdmVydGljZSBwb3NpdGlvbnNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjEoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9HZXQgdGhlIGluZGljZXMgb2YgdHJpYW5nbGVzIGZvciBlYWNoIHBvbHlnb25cclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcbiAgICAgICAgLy9Gb3IgZWFjaCBlbGVtZW50IGluIHRoZSB0cmlhbmdsZXMgYXJyYXkuXHJcbiAgICAgICAgLy9UaGlzIHZhciBjb3VsZCBjb250YWlucyAxIHRvIGFuIGluZmluaXR5IG9mIHRyaWFuZ2xlc1xyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCBwb3NpdGlvbiBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gcGFyc2VJbnQodGhpcy5fdHJpYW5nbGVzW2tdKSAtIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZXREYXRhKFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsIC8vIEluIHRoZSBwYXR0ZXJuIDEsIG5vcm1hbHMgYW5kIHV2cyBhcmUgbm90IGRlZmluZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLCAvLyBHZXQgdGhlIHZlY3RvcnMgZGF0YVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yMi5aZXJvKCksXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IzLlVwKCksIC8vIENyZWF0ZSBkZWZhdWx0IHZlY3RvcnNcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycyA/IHRoaXMuX2NvbG9yc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmVzZXQgdmFyaWFibGUgZm9yIHRoZSBuZXh0IGxpbmVcclxuICAgICAgICB0aGlzLl90cmlhbmdsZXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgYW5kIHB1c2ggdGhlIGRhdGEgZm9yIGVhY2ggcG9seWdvbiBmb3IgdGhlIHBhdHRlcm4gMlxyXG4gICAgICogSW4gdGhpcyBwYXR0ZXJuIHdlIGdldCB2ZXJ0aWNlIHBvc2l0aW9ucyBhbmQgdXZzXHJcbiAgICAgKiBAcGFyYW0gZmFjZVxyXG4gICAgICogQHBhcmFtIHZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4yKGZhY2U6IEFycmF5PHN0cmluZz4sIHY6IG51bWJlcikge1xyXG4gICAgICAgIC8vR2V0IHRoZSBpbmRpY2VzIG9mIHRyaWFuZ2xlcyBmb3IgZWFjaCBwb2x5Z29uXHJcbiAgICAgICAgdGhpcy5fZ2V0VHJpYW5nbGVzKGZhY2UsIHYpO1xyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vdHJpYW5nbGVba10gPSBcIjEvMVwiXHJcbiAgICAgICAgICAgIC8vU3BsaXQgdGhlIGRhdGEgZm9yIGdldHRpbmcgcG9zaXRpb24gYW5kIHV2XHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5fdHJpYW5nbGVzW2tdLnNwbGl0KFwiL1wiKTsgLy8gW1wiMVwiLCBcIjFcIl1cclxuICAgICAgICAgICAgLy9TZXQgcG9zaXRpb24gaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVBvc2l0aW9uRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzBdKSAtIDE7XHJcbiAgICAgICAgICAgIC8vU2V0IHV2IGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VVdnNGcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMV0pIC0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NldERhdGEoXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VQb3NpdGlvbkZyb21PYmosXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VVdnNGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgMCwgLy9EZWZhdWx0IHZhbHVlIGZvciBub3JtYWxzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NpdGlvbnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSwgLy9HZXQgdGhlIHZhbHVlcyBmb3IgZWFjaCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dnNbaW5kaWNlVXZzRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IzLlVwKCksIC8vRGVmYXVsdCB2YWx1ZSBmb3Igbm9ybWFsc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzID8gdGhpcy5fY29sb3JzW2luZGljZVBvc2l0aW9uRnJvbU9ial0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vUmVzZXQgdmFyaWFibGUgZm9yIHRoZSBuZXh0IGxpbmVcclxuICAgICAgICB0aGlzLl90cmlhbmdsZXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgYW5kIHB1c2ggdGhlIGRhdGEgZm9yIGVhY2ggcG9seWdvbiBmb3IgdGhlIHBhdHRlcm4gM1xyXG4gICAgICogSW4gdGhpcyBwYXR0ZXJuIHdlIGdldCB2ZXJ0aWNlIHBvc2l0aW9ucywgdXZzIGFuZCBub3JtYWxzXHJcbiAgICAgKiBAcGFyYW0gZmFjZVxyXG4gICAgICogQHBhcmFtIHZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4zKGZhY2U6IEFycmF5PHN0cmluZz4sIHY6IG51bWJlcikge1xyXG4gICAgICAgIC8vR2V0IHRoZSBpbmRpY2VzIG9mIHRyaWFuZ2xlcyBmb3IgZWFjaCBwb2x5Z29uXHJcbiAgICAgICAgdGhpcy5fZ2V0VHJpYW5nbGVzKGZhY2UsIHYpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAvL3RyaWFuZ2xlW2tdID0gXCIxLzEvMVwiXHJcbiAgICAgICAgICAgIC8vU3BsaXQgdGhlIGRhdGEgZm9yIGdldHRpbmcgcG9zaXRpb24sIHV2LCBhbmQgbm9ybWFsc1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHRoaXMuX3RyaWFuZ2xlc1trXS5zcGxpdChcIi9cIik7IC8vIFtcIjFcIiwgXCIxXCIsIFwiMVwiXVxyXG4gICAgICAgICAgICAvLyBTZXQgcG9zaXRpb24gaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVBvc2l0aW9uRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzBdKSAtIDE7XHJcbiAgICAgICAgICAgIC8vIFNldCB1diBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlVXZzRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzFdKSAtIDE7XHJcbiAgICAgICAgICAgIC8vIFNldCBub3JtYWwgaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZU5vcm1hbEZyb21PYmogPSBwYXJzZUludChwb2ludFsyXSkgLSAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2V0RGF0YShcclxuICAgICAgICAgICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGluZGljZVV2c0Zyb21PYmosXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VOb3JtYWxGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25zW2luZGljZVBvc2l0aW9uRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dnNbaW5kaWNlVXZzRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3JtYWxzW2luZGljZU5vcm1hbEZyb21PYmpdIC8vU2V0IHRoZSB2ZWN0b3IgZm9yIGVhY2ggY29tcG9uZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmVzZXQgdmFyaWFibGUgZm9yIHRoZSBuZXh0IGxpbmVcclxuICAgICAgICB0aGlzLl90cmlhbmdsZXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgYW5kIHB1c2ggdGhlIGRhdGEgZm9yIGVhY2ggcG9seWdvbiBmb3IgdGhlIHBhdHRlcm4gNFxyXG4gICAgICogSW4gdGhpcyBwYXR0ZXJuIHdlIGdldCB2ZXJ0aWNlIHBvc2l0aW9ucyBhbmQgbm9ybWFsc1xyXG4gICAgICogQHBhcmFtIGZhY2VcclxuICAgICAqIEBwYXJhbSB2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuNChmYWNlOiBBcnJheTxzdHJpbmc+LCB2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vdHJpYW5nbGVba10gPSBcIjEvLzFcIlxyXG4gICAgICAgICAgICAvL1NwbGl0IHRoZSBkYXRhIGZvciBnZXR0aW5nIHBvc2l0aW9uIGFuZCBub3JtYWxzXHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5fdHJpYW5nbGVzW2tdLnNwbGl0KFwiLy9cIik7IC8vIFtcIjFcIiwgXCIxXCJdXHJcbiAgICAgICAgICAgIC8vIFdlIGNoZWNrIGluZGljZXMsIGFuZCBub3JtYWxzXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVBvc2l0aW9uRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzBdKSAtIDE7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZU5vcm1hbEZyb21PYmogPSBwYXJzZUludChwb2ludFsxXSkgLSAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2V0RGF0YShcclxuICAgICAgICAgICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIDEsIC8vRGVmYXVsdCB2YWx1ZSBmb3IgdXZcclxuICAgICAgICAgICAgICAgIGluZGljZU5vcm1hbEZyb21PYmosXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NpdGlvbnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSwgLy9HZXQgZWFjaCB2ZWN0b3Igb2YgZGF0YVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yMi5aZXJvKCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3JtYWxzW2luZGljZU5vcm1hbEZyb21PYmpdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzID8gdGhpcy5fY29sb3JzW2luZGljZVBvc2l0aW9uRnJvbU9ial0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZSBmb3IgdGhlIG5leHQgbGluZVxyXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDcmVhdGUgdHJpYW5nbGVzIGFuZCBwdXNoIHRoZSBkYXRhIGZvciBlYWNoIHBvbHlnb24gZm9yIHRoZSBwYXR0ZXJuIDNcclxuICAgICAqIEluIHRoaXMgcGF0dGVybiB3ZSBnZXQgdmVydGljZSBwb3NpdGlvbnMsIHV2cyBhbmQgbm9ybWFsc1xyXG4gICAgICogQHBhcmFtIGZhY2VcclxuICAgICAqIEBwYXJhbSB2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuNShmYWNlOiBBcnJheTxzdHJpbmc+LCB2OiBudW1iZXIpIHtcclxuICAgICAgICAvL0dldCB0aGUgaW5kaWNlcyBvZiB0cmlhbmdsZXMgZm9yIGVhY2ggcG9seWdvblxyXG4gICAgICAgIHRoaXMuX2dldFRyaWFuZ2xlcyhmYWNlLCB2KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy90cmlhbmdsZVtrXSA9IFwiLTEvLTEvLTFcIlxyXG4gICAgICAgICAgICAvL1NwbGl0IHRoZSBkYXRhIGZvciBnZXR0aW5nIHBvc2l0aW9uLCB1diwgYW5kIG5vcm1hbHNcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLl90cmlhbmdsZXNba10uc3BsaXQoXCIvXCIpOyAvLyBbXCItMVwiLCBcIi0xXCIsIFwiLTFcIl1cclxuICAgICAgICAgICAgLy8gU2V0IHBvc2l0aW9uIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VQb3NpdGlvbkZyb21PYmogPSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoICsgcGFyc2VJbnQocG9pbnRbMF0pO1xyXG4gICAgICAgICAgICAvLyBTZXQgdXYgaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVV2c0Zyb21PYmogPSB0aGlzLl91dnMubGVuZ3RoICsgcGFyc2VJbnQocG9pbnRbMV0pO1xyXG4gICAgICAgICAgICAvLyBTZXQgbm9ybWFsIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VOb3JtYWxGcm9tT2JqID0gdGhpcy5fbm9ybWFscy5sZW5ndGggKyBwYXJzZUludChwb2ludFsyXSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZXREYXRhKFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlVXZzRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGluZGljZU5vcm1hbEZyb21PYmosXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NpdGlvbnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V2c1tpbmRpY2VVdnNGcm9tT2JqXSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbHNbaW5kaWNlTm9ybWFsRnJvbU9ial0sIC8vU2V0IHRoZSB2ZWN0b3IgZm9yIGVhY2ggY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMgPyB0aGlzLl9jb2xvcnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1Jlc2V0IHZhcmlhYmxlIGZvciB0aGUgbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkUHJldmlvdXNPYmpNZXNoKCkge1xyXG4gICAgICAgIC8vQ2hlY2sgaWYgaXQgaXMgbm90IHRoZSBmaXJzdCBtZXNoLiBPdGhlcndpc2Ugd2UgZG9uJ3QgaGF2ZSBkYXRhLlxyXG4gICAgICAgIGlmICh0aGlzLl9tZXNoZXNGcm9tT2JqLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9HZXQgdGhlIHByZXZpb3VzIG1lc2ggZm9yIGFwcGx5aW5nIHRoZSBkYXRhIGFib3V0IHRoZSBmYWNlc1xyXG4gICAgICAgICAgICAvLz0+IGluIG9iaiBmaWxlLCBmYWNlcyBkZWZpbml0aW9uIGFwcGVuZCBhZnRlciB0aGUgbmFtZSBvZiB0aGUgbWVzaFxyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaCA9IHRoaXMuX21lc2hlc0Zyb21PYmpbdGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGludG8gQXJyYXkgZm9yIHRoZSBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy51c2VMZWdhY3lCZWhhdmlvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV2ZXJzZSB0YWIuIE90aGVyd2lzZSBmYWNlIGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHdyb25nIHNlbnNcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGluZm9ybWF0aW9uIGZvciB0aGUgbWVzaFxyXG4gICAgICAgICAgICAvL1NsaWNlIHRoZSBhcnJheSB0byBhdm9pZCByZXdyaXRpbmcgYmVjYXVzZSBvZiB0aGUgZmFjdCB0aGlzIGlzIHRoZSBzYW1lIHZhciB3aGljaCBiZSByZXdyaXRlZFxyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5pbmRpY2VzID0gdGhpcy5faW5kaWNlc0ZvckJhYnlsb24uc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zID0gdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbi5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5ub3JtYWxzID0gdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24uc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gudXZzID0gdGhpcy5fdW53cmFwcGVkVVZGb3JCYWJ5bG9uLnNsaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5jb2xvcnMgPSB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vUmVzZXQgdGhlIGFycmF5IGZvciB0aGUgbmV4dCBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZFBvc2l0aW9uc0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWROb3JtYWxzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW1pemVOb3JtYWxzKG1lc2g6IEFic3RyYWN0TWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG1lc2guZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQpO1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbHMgPSBtZXNoLmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCk7XHJcbiAgICAgICAgY29uc3QgbWFwVmVydGljZXM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyW10gfSA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoIXBvc2l0aW9ucyB8fCAhbm9ybWFscykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGggLyAzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgeCA9IHBvc2l0aW9uc1tpICogMyArIDBdO1xyXG4gICAgICAgICAgICBjb25zdCB5ID0gcG9zaXRpb25zW2kgKiAzICsgMV07XHJcbiAgICAgICAgICAgIGNvbnN0IHogPSBwb3NpdGlvbnNbaSAqIDMgKyAyXTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0geCArIFwiX1wiICsgeSArIFwiX1wiICsgejtcclxuXHJcbiAgICAgICAgICAgIGxldCBsc3QgPSBtYXBWZXJ0aWNlc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIWxzdCkge1xyXG4gICAgICAgICAgICAgICAgbHN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBtYXBWZXJ0aWNlc1trZXldID0gbHN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxzdC5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbmV3IFZlY3RvcjMoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBtYXBWZXJ0aWNlcykge1xyXG4gICAgICAgICAgICBjb25zdCBsc3QgPSBtYXBWZXJ0aWNlc1trZXldO1xyXG4gICAgICAgICAgICBpZiAobHN0Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2MElkeCA9IGxzdFswXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsc3QubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZJZHggPSBsc3RbaV07XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3YwSWR4ICogMyArIDBdICs9IG5vcm1hbHNbdklkeCAqIDMgKyAwXTtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdjBJZHggKiAzICsgMV0gKz0gbm9ybWFsc1t2SWR4ICogMyArIDFdO1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2MElkeCAqIDMgKyAyXSArPSBub3JtYWxzW3ZJZHggKiAzICsgMl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vcm1hbC5jb3B5RnJvbUZsb2F0cyhub3JtYWxzW3YwSWR4ICogMyArIDBdLCBub3JtYWxzW3YwSWR4ICogMyArIDFdLCBub3JtYWxzW3YwSWR4ICogMyArIDJdKTtcclxuICAgICAgICAgICAgbm9ybWFsLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsc3QubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZJZHggPSBsc3RbaV07XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3ZJZHggKiAzICsgMF0gPSBub3JtYWwueDtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdklkeCAqIDMgKyAxXSA9IG5vcm1hbC55O1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2SWR4ICogMyArIDJdID0gbm9ybWFsLno7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQsIG5vcm1hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBwYXJzZSBhbiBPQkogc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzTmFtZXMgZGVmaW5lcyB0aGUgbGlzdCBvZiBtZXNoZXMgdG8gbG9hZCAoYWxsIGlmIG5vdCBkZWZpbmVkKVxyXG4gICAgICogQHBhcmFtIGRhdGEgZGVmaW5lcyB0aGUgT0JKIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGhvc3Rpbmcgc2NlbmVcclxuICAgICAqIEBwYXJhbSBhc3NldENvbnRhaW5lciBkZWZpbmVzIHRoZSBhc3NldCBjb250YWluZXIgdG8gbG9hZCBkYXRhIGluXHJcbiAgICAgKiBAcGFyYW0gb25GaWxlVG9Mb2FkRm91bmQgZGVmaW5lcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgaWYgYSBNVEwgZmlsZSBpcyBmb3VuZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGFyc2UobWVzaGVzTmFtZXM6IGFueSwgZGF0YTogc3RyaW5nLCBzY2VuZTogU2NlbmUsIGFzc2V0Q29udGFpbmVyOiBOdWxsYWJsZTxBc3NldENvbnRhaW5lcj4sIG9uRmlsZVRvTG9hZEZvdW5kOiAoZmlsZVRvTG9hZDogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLnVzZUxlZ2FjeUJlaGF2aW9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3B1c2hUcmlhbmdsZSA9IChmYWNlcywgZmFjZUluZGV4KSA9PiB0aGlzLl90cmlhbmdsZXMucHVzaChmYWNlc1swXSwgZmFjZXNbZmFjZUluZGV4XSwgZmFjZXNbZmFjZUluZGV4ICsgMV0pO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kZWRuZXNzU2lnbiA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wdXNoVHJpYW5nbGUgPSAoZmFjZXMsIGZhY2VJbmRleCkgPT4gdGhpcy5fdHJpYW5nbGVzLnB1c2goZmFjZXNbMF0sIGZhY2VzW2ZhY2VJbmRleCArIDFdLCBmYWNlc1tmYWNlSW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGVkbmVzc1NpZ24gPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3B1c2hUcmlhbmdsZSA9IChmYWNlcywgZmFjZUluZGV4KSA9PiB0aGlzLl90cmlhbmdsZXMucHVzaChmYWNlc1swXSwgZmFjZXNbZmFjZUluZGV4XSwgZmFjZXNbZmFjZUluZGV4ICsgMV0pO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kZWRuZXNzU2lnbiA9IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3BsaXQgdGhlIGZpbGUgaW50byBsaW5lc1xyXG4gICAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICAvLyBMb29rIGF0IGVhY2ggbGluZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2ldLnRyaW0oKS5yZXBsYWNlKC9cXHNcXHMvZywgXCIgXCIpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgLy8gQ29tbWVudCBvciBuZXdMaW5lXHJcbiAgICAgICAgICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gMCB8fCBsaW5lLmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vR2V0IGluZm9ybWF0aW9uIGFib3V0IG9uZSBwb3NpdGlvbiBwb3NzaWJsZSBmb3IgdGhlIHZlcnRpY2VzXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoU29saWRQYXJzZXIuVmVydGV4UGF0dGVybi50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBsaW5lLm1hdGNoKC9bXiBdKy9nKSE7IC8vIG1hdGNoIHdpbGwgcmV0dXJuIG5vbi1udWxsIGR1ZSB0byBwYXNzaW5nIHJlZ2V4IHBhdHRlcm5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWYWx1ZSBvZiByZXN1bHQgd2l0aCBsaW5lOiBcInYgMS4wIDIuMCAzLjBcIlxyXG4gICAgICAgICAgICAgICAgLy8gW1widlwiLCBcIjEuMFwiLCBcIjIuMFwiLCBcIjMuMFwiXVxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgVmVjdG9yMyB3aXRoIHRoZSBwb3NpdGlvbiB4LCB5LCB6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NpdGlvbnMucHVzaChuZXcgVmVjdG9yMyhwYXJzZUZsb2F0KHJlc3VsdFsxXSksIHBhcnNlRmxvYXQocmVzdWx0WzJdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgciA9IHBhcnNlRmxvYXQocmVzdWx0WzRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZyA9IHBhcnNlRmxvYXQocmVzdWx0WzVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHBhcnNlRmxvYXQocmVzdWx0WzZdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9ycy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IENvbG9yNChyID4gMSA/IHIgLyAyNTUgOiByLCBnID4gMSA/IGcgLyAyNTUgOiBnLCBiID4gMSA/IGIgLyAyNTUgOiBiLCByZXN1bHQubGVuZ3RoID09PSA3IHx8IHJlc3VsdFs3XSA9PT0gdW5kZWZpbmVkID8gMSA6IHBhcnNlRmxvYXQocmVzdWx0WzddKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBtYXliZSBwdXNoIE5VTEwgYW5kIGlmIGFsbCBhcmUgTlVMTCB0byBza2lwIChhbmQgcmVtb3ZlIGdyYXlDb2xvciB2YXIpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvcnMucHVzaCh0aGlzLl9ncmF5Q29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTm9ybWFsUGF0dGVybi5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBWZWN0b3IzIHdpdGggdGhlIG5vcm1hbHMgeCwgeSwgelxyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vIFtcInZuIDEuMCAyLjAgMy4wXCIsIFwiMS4wXCIsIFwiMi4wXCIsIFwiMy4wXCJdXHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0aGUgVmVjdG9yIGluIHRoZSBsaXN0IG9mIG5vcm1hbHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbHMucHVzaChuZXcgVmVjdG9yMyhwYXJzZUZsb2F0KHJlc3VsdFsxXSksIHBhcnNlRmxvYXQocmVzdWx0WzJdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLlVWUGF0dGVybi5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBWZWN0b3IyIHdpdGggdGhlIG5vcm1hbHMgdSwgdlxyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vIFtcInZ0IDAuMSAwLjIgMC4zXCIsIFwiMC4xXCIsIFwiMC4yXCJdXHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0aGUgVmVjdG9yIGluIHRoZSBsaXN0IG9mIHV2c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXZzLnB1c2gobmV3IFZlY3RvcjIocGFyc2VGbG9hdChyZXN1bHRbMV0pICogdGhpcy5fbG9hZGluZ09wdGlvbnMuVVZTY2FsaW5nLngsIHBhcnNlRmxvYXQocmVzdWx0WzJdKSAqIHRoaXMuX2xvYWRpbmdPcHRpb25zLlVWU2NhbGluZy55KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JZGVudGlmeSBwYXR0ZXJucyBvZiBmYWNlc1xyXG4gICAgICAgICAgICAgICAgLy9GYWNlIGNvdWxkIGJlIGRlZmluZWQgaW4gZGlmZmVyZW50IHR5cGUgb2YgcGF0dGVyblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5GYWNlUGF0dGVybjMuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9bXCJmIDEvMS8xIDIvMi8yIDMvMy8zXCIsIFwiMS8xLzEgMi8yLzIgMy8zLzNcIi4uLl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjMoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvMS8xXCIsIFwiMi8yLzJcIiwgXCIzLzMvM1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkZhY2VQYXR0ZXJuNC5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL1tcImYgMS8vMSAyLy8yIDMvLzNcIiwgXCIxLy8xIDIvLzIgMy8vM1wiLi4uXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuNChcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMS8vMVwiLCBcIjIvLzJcIiwgXCIzLy8zXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuRmFjZVBhdHRlcm41LmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdDpcclxuICAgICAgICAgICAgICAgIC8vW1wiZiAtMS8tMS8tMSAtMi8tMi8tMiAtMy8tMy8tM1wiLCBcIi0xLy0xLy0xIC0yLy0yLy0yIC0zLy0zLy0zXCIuLi5dXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm41KFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCItMS8tMS8tMVwiLCBcIi0yLy0yLy0yXCIsIFwiLTMvLTMvLTNcIl1cclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5GYWNlUGF0dGVybjIuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9bXCJmIDEvMSAyLzIgMy8zXCIsIFwiMS8xIDIvMiAzLzNcIi4uLl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjIoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvMVwiLCBcIjIvMlwiLCBcIjMvM1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkZhY2VQYXR0ZXJuMS5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vW1wiZiAxIDIgM1wiLCBcIjEgMiAzXCIuLi5dXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4xKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxXCIsIFwiMlwiLCBcIjNcIl1cclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBhIG1lc2ggb3IgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAvLyBFYWNoIHRpbWUgdGhpcyBrZXl3b3JkIGlzIGFuYWx5emVkLCBjcmVhdGUgYSBuZXcgT2JqZWN0IHdpdGggYWxsIGRhdGEgZm9yIGNyZWF0aW5nIGEgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTGluZVBhdHRlcm4xLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy9bXCJsIDEgMlwiXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMShcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMVwiLCBcIjJcIl1cclxuICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBhIG1lc2ggb3IgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAvLyBFYWNoIHRpbWUgdGhpcyBrZXl3b3JkIGlzIGFuYWx5emVkLCBjcmVhdGUgYSBuZXcgT2JqZWN0IHdpdGggYWxsIGRhdGEgZm9yIGNyZWF0aW5nIGEgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTGluZVBhdHRlcm4yLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy9bXCJsIDEvMSAyLzJcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjIoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvMVwiLCBcIjIvMlwiXVxyXG4gICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGEgbWVzaCBvciBhbiBvYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIEVhY2ggdGltZSB0aGlzIGtleXdvcmQgaXMgYW5hbHl6ZWQsIGNyZWF0ZSBhIG5ldyBPYmplY3Qgd2l0aCBhbGwgZGF0YSBmb3IgY3JlYXRpbmcgYSBiYWJ5bG9uTWVzaFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5MaW5lUGF0dGVybjMuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAvL1tcImwgMS8xLzEgMi8yLzJcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjMoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvMS8xXCIsIFwiMi8yLzJcIl1cclxuICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBhIG1lc2ggb3IgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAvLyBFYWNoIHRpbWUgdGhpcyBrZXl3b3JkIGlzIGFuYWx5emVkLCBjcmVhdGUgYSBuZXcgT2JqZWN0IHdpdGggYWxsIGRhdGEgZm9yIGNyZWF0aW5nIGEgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5Hcm91cERlc2NyaXB0b3IudGVzdChsaW5lKSB8fCBTb2xpZFBhcnNlci5PYmplY3REZXNjcmlwdG9yLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBtZXNoIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5hbWUgb2YgdGhlIGdyb3VwLlxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5pdGlvbiBvZiB0aGUgbWVzaFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqTWVzaDogTWVzaE9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBsaW5lLnN1YnN0cmluZygyKS50cmltKCksIC8vU2V0IHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG9iaiBtZXNoXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB1dnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTmFtZTogdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaixcclxuICAgICAgICAgICAgICAgICAgICBpc09iamVjdDogU29saWRQYXJzZXIuT2JqZWN0RGVzY3JpcHRvci50ZXN0KGxpbmUpLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZFByZXZpb3VzT2JqTWVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgbGFzdCBtZXNoIGNyZWF0ZWQgd2l0aCBvbmx5IHRoZSBuYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXNoZXNGcm9tT2JqLnB1c2gob2JqTWVzaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhpcyB2YXJpYWJsZSB0byBpbmRpY2F0ZSB0aGF0IG5vdyBtZXNoZXNGcm9tT2JqIGhhcyBvYmplY3RzIGRlZmluZWQgaW5zaWRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNNZXNoZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNGaXJzdE1hdGVyaWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luY3JlbWVudCA9IDE7XHJcbiAgICAgICAgICAgICAgICAvL0tleXdvcmQgZm9yIGFwcGx5aW5nIGEgbWF0ZXJpYWxcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5Vc2VNdGxEZXNjcmlwdG9yLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBuYW1lIG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaiA9IGxpbmUuc3Vic3RyaW5nKDcpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoaXMgbmV3IG1hdGVyaWFsIGlzIGluIHRoZSBzYW1lIG1lc2hcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzRmlyc3RNYXRlcmlhbCB8fCAhdGhpcy5faGFzTWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoZSBwcmV2aW91cyBtZXNoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkUHJldmlvdXNPYmpNZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBuZXcgbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iak1lc2g6IE1lc2hPYmplY3QgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBvYmogbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAodGhpcy5fb2JqTWVzaE5hbWUgfHwgXCJtZXNoXCIpICsgXCJfbW1cIiArIHRoaXMuX2luY3JlbWVudC50b1N0cmluZygpLCAvL1NldCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBvYmogbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNlczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbHM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbE5hbWU6IHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc09iamVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5jcmVtZW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JZiBtZXNoZXMgYXJlIGFscmVhZHkgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc2hlc0Zyb21PYmoucHVzaChvYmpNZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYXNNZXNoZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIG1hdGVyaWFsIG5hbWUgaWYgdGhlIHByZXZpb3VzIGxpbmUgZGVmaW5lIGEgbWVzaFxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oYXNNZXNoZXMgJiYgdGhpcy5faXNGaXJzdE1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIG1hdGVyaWFsIG5hbWUgdG8gdGhlIHByZXZpb3VzIG1lc2ggKDEgbWF0ZXJpYWwgcGVyIG1lc2gpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVzaGVzRnJvbU9ialt0aGlzLl9tZXNoZXNGcm9tT2JqLmxlbmd0aCAtIDFdLm1hdGVyaWFsTmFtZSA9IHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNGaXJzdE1hdGVyaWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBLZXl3b3JkIGZvciBsb2FkaW5nIHRoZSBtdGwgZmlsZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFNvbGlkUGFyc2VyLk10bExpYkdyb3VwRGVzY3JpcHRvci50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIG5hbWUgb2YgbXRsIGZpbGVcclxuICAgICAgICAgICAgICAgIG9uRmlsZVRvTG9hZEZvdW5kKGxpbmUuc3Vic3RyaW5nKDcpLnRyaW0oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgc21vb3RoaW5nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoU29saWRQYXJzZXIuU21vb3RoRGVzY3JpcHRvci50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzbW9vdGggc2hhZGluZyA9PiBhcHBseSBzbW9vdGhpbmdcclxuICAgICAgICAgICAgICAgIC8vIFRvZGF5IEkgZG9uJ3Qga25vdyBpdCB3b3JrIHdpdGggYmFieWxvbiBhbmQgd2l0aCBvYmouXHJcbiAgICAgICAgICAgICAgICAvLyBXaXRoIHRoZSBvYmogZmlsZSAgYW4gaW50ZWdlciBpcyBzZXRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlcmUgaXMgYW5vdGhlciBwb3NzaWJpbGl0eVxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLkxvZyhcIlVuaGFuZGxlZCBleHByZXNzaW9uIGF0IGxpbmUgOiBcIiArIGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdCB0aGUgZW5kIG9mIHRoZSBmaWxlLCBhZGQgdGhlIGxhc3QgbWVzaCBpbnRvIHRoZSBtZXNoZXNGcm9tT2JqIGFycmF5XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc01lc2hlcykge1xyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGRhdGEgZm9yIHRoZSBsYXN0IG1lc2hcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2ggPSB0aGlzLl9tZXNoZXNGcm9tT2JqW3RoaXMuX21lc2hlc0Zyb21PYmoubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMudXNlTGVnYWN5QmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vUmV2ZXJzZSBpbmRpY2VzIGZvciBkaXNwbGF5aW5nIGZhY2VzIGluIHRoZSBnb29kIHNlbnNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vR2V0IHRoZSBnb29kIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcERhdGEoKTtcclxuICAgICAgICAgICAgLy9TZXQgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guaW5kaWNlcyA9IHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5wb3NpdGlvbnMgPSB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5ub3JtYWxzID0gdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb247XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLnV2cyA9IHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLmNvbG9ycyA9IHRoaXMuX3Vud3JhcHBlZENvbG9yc0ZvckJhYnlsb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIGFueSBvIG9yIGcga2V5d29yZCBub3QgZm91bmQsIGNyZWF0ZSBhIG1lc2ggd2l0aCBhIHJhbmRvbSBpZFxyXG4gICAgICAgIGlmICghdGhpcy5faGFzTWVzaGVzKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdNYXRlcmlhbDogTnVsbGFibGU8U3RhbmRhcmRNYXRlcmlhbD4gPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5kaWNlc0ZvckJhYnlsb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMudXNlTGVnYWN5QmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXZlcnNlIHRhYiBvZiBpbmRpY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vR2V0IHBvc2l0aW9ucyBub3JtYWxzIHV2c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlcmUgaXMgbm8gaW5kaWNlcyBpbiB0aGUgZmlsZS4gV2Ugd2lsbCBoYXZlIHRvIHN3aXRjaCB0byBwb2ludCBjbG91ZCByZW5kZXJpbmdcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcG9zIG9mIHRoaXMuX3Bvc2l0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZFBvc2l0aW9uc0ZvckJhYnlsb24ucHVzaChwb3MueCwgcG9zLnksIHBvcy56KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbm9ybWFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5vcm1hbCBvZiB0aGlzLl9ub3JtYWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLnB1c2gobm9ybWFsLngsIG5vcm1hbC55LCBub3JtYWwueik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl91dnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB1diBvZiB0aGlzLl91dnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkVVZGb3JCYWJ5bG9uLnB1c2godXYueCwgdXYueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb2xvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb2xvciBvZiB0aGlzLl9jb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5wdXNoKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBtYXRlcmlhbCB3aXRoIHBvaW50IGNsb3VkIG9uXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwgPSBuZXcgU3RhbmRhcmRNYXRlcmlhbChHZW9tZXRyeS5SYW5kb21JZCgpLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hdGVyaWFsLnBvaW50c0Nsb3VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaiA9IG5ld01hdGVyaWFsLm5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbm9ybWFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwuZGlzYWJsZUxpZ2h0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwuZW1pc3NpdmVDb2xvciA9IENvbG9yMy5XaGl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TZXQgZGF0YSBmb3Igb25lIG1lc2hcclxuICAgICAgICAgICAgdGhpcy5fbWVzaGVzRnJvbU9iai5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEdlb21ldHJ5LlJhbmRvbUlkKCksXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzOiB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uczogdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbixcclxuICAgICAgICAgICAgICAgIGNvbG9yczogdGhpcy5fdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbixcclxuICAgICAgICAgICAgICAgIG5vcm1hbHM6IHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgdXZzOiB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24sXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbE5hbWU6IHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmosXHJcbiAgICAgICAgICAgICAgICBkaXJlY3RNYXRlcmlhbDogbmV3TWF0ZXJpYWwsXHJcbiAgICAgICAgICAgICAgICBpc09iamVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1NldCBkYXRhIGZvciBlYWNoIG1lc2hcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX21lc2hlc0Zyb21PYmoubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgLy9jaGVjayBtZXNoZXNOYW1lcyAoc3RsRmlsZUxvYWRlcilcclxuICAgICAgICAgICAgaWYgKG1lc2hlc05hbWVzICYmIHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc2hlc05hbWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzaGVzTmFtZXMuaW5kZXhPZih0aGlzLl9tZXNoZXNGcm9tT2JqW2pdLm5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXNoZXNGcm9tT2JqW2pdLm5hbWUgIT09IG1lc2hlc05hbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9HZXQgdGhlIGN1cnJlbnQgbWVzaFxyXG4gICAgICAgICAgICAvL1NldCB0aGUgZGF0YSB3aXRoIFZlcnRleEJ1ZmZlciBmb3IgZWFjaCBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoID0gdGhpcy5fbWVzaGVzRnJvbU9ialtqXTtcclxuICAgICAgICAgICAgLy9DcmVhdGUgYSBNZXNoIHdpdGggdGhlIG5hbWUgb2YgdGhlIG9iaiBtZXNoXHJcblxyXG4gICAgICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISFhc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgY29uc3QgYmFieWxvbk1lc2ggPSBuZXcgTWVzaCh0aGlzLl9tZXNoZXNGcm9tT2JqW2pdLm5hbWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgYmFieWxvbk1lc2guX3BhcmVudENvbnRhaW5lciA9IGFzc2V0Q29udGFpbmVyO1xyXG4gICAgICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLl9iYWJ5bG9uTWVzaCA9IGJhYnlsb25NZXNoO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgZ3JvdXAgbWVzaCwgaXQgc2hvdWxkIGhhdmUgYW4gb2JqZWN0IG1lc2ggYXMgYSBwYXJlbnQuIFNvIGxvb2sgZm9yIHRoZSBmaXJzdCBvYmplY3QgbWVzaCB0aGF0IGFwcGVhcnMgYmVmb3JlIGl0LlxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhbmRsZWRNZXNoLmlzT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gaiAtIDE7IGsgPj0gMDsgLS1rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21lc2hlc0Zyb21PYmpba10uaXNPYmplY3QgJiYgdGhpcy5fbWVzaGVzRnJvbU9ialtrXS5fYmFieWxvbk1lc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1lc2gucGFyZW50ID0gdGhpcy5fbWVzaGVzRnJvbU9ialtrXS5fYmFieWxvbk1lc2ghO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgbmFtZSBvZiB0aGUgbWF0ZXJpYWwgdG8gYW4gYXJyYXlcclxuICAgICAgICAgICAgLy9UaGlzIGlzIGluZGlzcGVuc2FibGUgZm9yIHRoZSBpbXBvcnRNZXNoIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsVG9Vc2UucHVzaCh0aGlzLl9tZXNoZXNGcm9tT2JqW2pdLm1hdGVyaWFsTmFtZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zPy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgbWVzaCBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYWJ5bG9uTWVzaGVzQXJyYXkucHVzaChiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YTogVmVydGV4RGF0YSA9IG5ldyBWZXJ0ZXhEYXRhKCk7IC8vVGhlIGNvbnRhaW5lciBmb3IgdGhlIHZhbHVlc1xyXG4gICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhlIGJhYnlsb25NZXNoXHJcbiAgICAgICAgICAgIHZlcnRleERhdGEudXZzID0gdGhpcy5faGFuZGxlZE1lc2gudXZzO1xyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLmluZGljZXMgPSB0aGlzLl9oYW5kbGVkTWVzaC5pbmRpY2VzO1xyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLnBvc2l0aW9ucyA9IHRoaXMuX2hhbmRsZWRNZXNoLnBvc2l0aW9ucztcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmNvbXB1dGVOb3JtYWxzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICAgICAgICAgIFZlcnRleERhdGEuQ29tcHV0ZU5vcm1hbHModGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zLCB0aGlzLl9oYW5kbGVkTWVzaC5pbmRpY2VzLCBub3JtYWxzKTtcclxuICAgICAgICAgICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IG5vcm1hbHM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhEYXRhLm5vcm1hbHMgPSB0aGlzLl9oYW5kbGVkTWVzaC5ub3JtYWxzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRleERhdGEuY29sb3JzID0gdGhpcy5faGFuZGxlZE1lc2guY29sb3JzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZyb20gdGhlIFZlcnRleEJ1ZmZlciB0byB0aGUgY3VycmVudCBNZXNoXHJcbiAgICAgICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2goYmFieWxvbk1lc2gpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW52ZXJ0WSkge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2guc2NhbGluZy55ICo9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5vcHRpbWl6ZU5vcm1hbHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGltaXplTm9ybWFscyhiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgbWVzaCBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuX2JhYnlsb25NZXNoZXNBcnJheS5wdXNoKGJhYnlsb25NZXNoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYW5kbGVkTWVzaC5kaXJlY3RNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2gubWF0ZXJpYWwgPSB0aGlzLl9oYW5kbGVkTWVzaC5kaXJlY3RNYXRlcmlhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBMb2FkZXJzIGZyb20gXCJsb2FkZXJzL09CSi9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gTG9hZGVycykge1xyXG4gICAgICAgIGlmICghKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0pIHtcclxuICAgICAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5Mb2FkZXJzKVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcImxvYWRlcnMvT0JKL2luZGV4XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY19vYnNlcnZhYmxlX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgbG9hZGVycyBmcm9tIFwiQGx0cy9sb2FkZXJzL2xlZ2FjeS9sZWdhY3ktb2JqRmlsZUxvYWRlclwiO1xyXG5leHBvcnQgeyBsb2FkZXJzIH07XHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRlcnM7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==