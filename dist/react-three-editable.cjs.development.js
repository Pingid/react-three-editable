'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactDom = require('react-dom');
var reactThreeFiber = require('react-three-fiber');
var create = _interopDefault(require('zustand'));
var three = require('three');
var deepEqual = _interopDefault(require('fast-deep-equal'));
var drei = require('@react-three/drei');
var shallow = _interopDefault(require('zustand/shallow'));
var root = _interopDefault(require('react-shadow'));
var GiResize = require('@react-icons/all-files/gi/GiResize');
var GiMove = require('@react-icons/all-files/gi/GiMove');
var GiClockwiseRotation = require('@react-icons/all-files/gi/GiClockwiseRotation');
var reakit = require('reakit');
var Highlight = require('prism-react-renderer');
var Highlight__default = _interopDefault(Highlight);
var theme = _interopDefault(require('prism-react-renderer/themes/github'));
var FiChevronDown = require('@react-icons/all-files/fi/FiChevronDown');
var useMeasure = _interopDefault(require('react-use-measure'));
var fileSaver = require('file-saver');
var RiFocus3Line = require('@react-icons/all-files/ri/RiFocus3Line');
var GiPocketBow = require('@react-icons/all-files/gi/GiPocketBow');
var AiFillEye = require('@react-icons/all-files/ai/AiFillEye');
var BiGlobe = require('@react-icons/all-files/bi/BiGlobe');
var BiCube = require('@react-icons/all-files/bi/BiCube');
var GiIceCube = require('@react-icons/all-files/gi/GiIceCube');
var FaCube = require('@react-icons/all-files/fa/FaCube');
var GiCube = require('@react-icons/all-files/gi/GiCube');
var IoIosClose = require('@react-icons/all-files/io/IoIosClose');
var BsFillCollectionFill = require('@react-icons/all-files/bs/BsFillCollectionFill');
var GiLightProjector = require('@react-icons/all-files/gi/GiLightProjector');
var BiSun = require('@react-icons/all-files/bi/BiSun');
var GiLightBulb = require('@react-icons/all-files/gi/GiLightBulb');
var BsCameraVideoFill = require('@react-icons/all-files/bs/BsCameraVideoFill');
var reactHookForm = require('react-hook-form');
var MdRestore = require('@react-icons/all-files/md/MdRestore');
var TransformControls$1 = require('three/examples/jsm/controls/TransformControls');
var mergeRefs = _interopDefault(require('react-merge-refs'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

var config = function config(set, get) {
  setTimeout(function () {
    var existingHandler = three.DefaultLoadingManager.onProgress;

    three.DefaultLoadingManager.onProgress = function (url, loaded, total) {
      existingHandler(url, loaded, total);

      if (url.match(/\.hdr$/)) {
        set(function (state) {
          var newPaths = new Set(state.hdrPaths);
          newPaths.add(url);
          return {
            hdrPaths: Array.from(newPaths)
          };
        });
      }
    };
  });
  return {
    scene: null,
    gl: null,
    allowImplicitInstancing: false,
    orbitControlsRef: null,
    editables: {},
    canvasName: 'default',
    initialState: null,
    selected: null,
    transformControlsMode: 'translate',
    transformControlsSpace: 'world',
    viewportShading: 'rendered',
    editorOpen: false,
    sceneSnapshot: null,
    editablesSnapshot: null,
    hdrPaths: [],
    selectedHdr: null,
    showOverlayIcons: false,
    useHdrAsBackground: true,
    showGrid: true,
    showAxes: true,
    init: function init(scene, gl, allowImplicitInstancing, initialState) {
      var editables = get().editables;
      var newEditables = initialState ? Object.fromEntries(Object.entries(initialState.editables).map(function (_ref) {
        var _originalEditable$rol, _originalEditable$ini;

        var name = _ref[0],
            editable = _ref[1];
        var originalEditable = editables[name];
        return [name, {
          type: editable.type,
          role: (_originalEditable$rol = originalEditable == null ? void 0 : originalEditable.role) != null ? _originalEditable$rol : 'removed',
          properties: {
            transform: new three.Matrix4().fromArray(editable.properties.transform)
          },
          initialProperties: (_originalEditable$ini = originalEditable == null ? void 0 : originalEditable.initialProperties) != null ? _originalEditable$ini : {
            transform: new three.Matrix4()
          }
        }];
      })) : editables;
      set({
        scene: scene,
        gl: gl,
        allowImplicitInstancing: allowImplicitInstancing,
        editables: newEditables,
        initialState: initialState
      });
    },
    addEditable: function addEditable(type, uniqueName, initialProperties) {
      return set(function (state) {
        var _extends2;

        var properties = initialProperties;

        if (state.editables[uniqueName]) {
          if (state.editables[uniqueName].type !== type && "development" === 'development') {
            console.error("Warning: There is a mismatch between the serialized type of " + uniqueName + " and the one set when adding it to the scene.\n  Serialized: " + state.editables[uniqueName].type + ".\n  Current: " + type + ".\n  \n  This might have happened either because you changed the type of an object, in which case a re-export will solve the issue, or because you re-used the uniqueName for an object of a different type, which is an error.");
          }

          if (state.editables[uniqueName].role === 'active' && !state.allowImplicitInstancing) {
            throw Error("Scene already has an editable object named " + uniqueName + ".\n  If this is intentional, please set the allowImplicitInstancing prop of EditableManager to true.");
          } else {
            properties = state.editables[uniqueName].properties;
          }
        }

        return {
          editables: _extends({}, state.editables, (_extends2 = {}, _extends2[uniqueName] = {
            type: type,
            role: 'active',
            properties: properties,
            initialProperties: initialProperties
          }, _extends2))
        };
      });
    },
    setOrbitControlsRef: function setOrbitControlsRef(camera) {
      set({
        orbitControlsRef: camera
      });
    },
    removeEditable: function removeEditable(name) {
      return set(function (state) {
        var _extends3;

        var _state$editables = state.editables,
            removed = _state$editables[name],
            rest = _objectWithoutPropertiesLoose(_state$editables, [name].map(_toPropertyKey));

        return {
          editables: _extends({}, rest, (_extends3 = {}, _extends3[name] = _extends({}, removed, {
            role: 'removed'
          }), _extends3))
        };
      });
    },
    setEditableTransform: function setEditableTransform(uniqueName, transform) {
      set(function (state) {
        var _extends4;

        return {
          editables: _extends({}, state.editables, (_extends4 = {}, _extends4[uniqueName] = _extends({}, state.editables[uniqueName], {
            properties: {
              transform: transform
            }
          }), _extends4))
        };
      });
    },
    setSelected: function setSelected(name) {
      set({
        selected: name
      });
    },
    setSelectedHdr: function setSelectedHdr(hdr) {
      set({
        selectedHdr: hdr
      });
    },
    setTransformControlsMode: function setTransformControlsMode(mode) {
      set({
        transformControlsMode: mode
      });
    },
    setTransformControlsSpace: function setTransformControlsSpace(mode) {
      set({
        transformControlsSpace: mode
      });
    },
    setViewportShading: function setViewportShading(mode) {
      set({
        viewportShading: mode
      });
    },
    setShowOverlayIcons: function setShowOverlayIcons(show) {
      set({
        showOverlayIcons: show
      });
    },
    setUseHdrAsBackground: function setUseHdrAsBackground(use) {
      set({
        useHdrAsBackground: use
      });
    },
    setShowGrid: function setShowGrid(show) {
      set({
        showGrid: show
      });
    },
    setShowAxes: function setShowAxes(show) {
      set({
        showAxes: show
      });
    },
    setEditorOpen: function setEditorOpen(open) {
      set({
        editorOpen: open
      });
    },
    createSnapshot: function createSnapshot() {
      set(function (state) {
        var _state$scene;

        return {
          sceneSnapshot: (_state$scene = state.scene) == null ? void 0 : _state$scene.clone(),
          editablesSnapshot: state.editables
        };
      });
    },
    setSnapshotProxyObject: function setSnapshotProxyObject(proxyObject, uniqueName) {
      set(function (state) {
        var _extends5;

        return {
          editablesSnapshot: _extends({}, state.editablesSnapshot, (_extends5 = {}, _extends5[uniqueName] = _extends({}, state.editablesSnapshot[uniqueName], {
            proxyObject: proxyObject
          }), _extends5))
        };
      });
    },
    serialize: function serialize() {
      return {
        editables: Object.fromEntries(Object.entries(get().editables).map(function (_ref2) {
          var name = _ref2[0],
              editable = _ref2[1];
          return [name, {
            type: editable.type,
            properties: {
              transform: editable.properties.transform.toArray()
            }
          }];
        }))
      };
    },
    isPersistedStateDifferentThanInitial: function isPersistedStateDifferentThanInitial() {
      var initialState = get().initialState;
      var canvasName = get().canvasName;

      if (!initialState || !initialPersistedState) {
        return false;
      }

      return !deepEqual(initialPersistedState.canvases[canvasName], initialState);
    },
    applyPersistedState: function applyPersistedState() {
      var editables = get().editables;
      var canvasName = get().canvasName;

      if (!initialPersistedState) {
        return;
      }

      var newEditables = Object.fromEntries(Object.entries(initialPersistedState.canvases[canvasName].editables).map(function (_ref3) {
        var _originalEditable$rol2, _originalEditable$ini2;

        var name = _ref3[0],
            editable = _ref3[1];
        var originalEditable = editables[name];
        return [name, {
          type: editable.type,
          role: (_originalEditable$rol2 = originalEditable == null ? void 0 : originalEditable.role) != null ? _originalEditable$rol2 : 'removed',
          properties: {
            transform: new three.Matrix4().fromArray(editable.properties.transform)
          },
          initialProperties: (_originalEditable$ini2 = originalEditable == null ? void 0 : originalEditable.initialProperties) != null ? _originalEditable$ini2 : {
            transform: new three.Matrix4()
          }
        }];
      }));
      set({
        editables: newEditables
      });
    }
  };
};

var useEditorStore = /*#__PURE__*/create(config);

var initPersistence = function initPersistence(key) {
  var initialPersistedState = null;
  var unsub;

  {
    try {
      var rawPersistedState = localStorage.getItem(key);

      if (rawPersistedState) {
        initialPersistedState = JSON.parse(rawPersistedState);
      }
    } catch (e) {}

    unsub = useEditorStore.subscribe(function () {
      var canvasName = useEditorStore.getState().canvasName;
      var serialize = useEditorStore.getState().serialize;

      if (canvasName) {
        var _canvases;

        var editables = serialize();
        localStorage.setItem(key, JSON.stringify({
          canvases: (_canvases = {}, _canvases[canvasName] = editables, _canvases)
        }));
      }
    }, function (state) {
      return state.editables;
    });
  }

  return [initialPersistedState, unsub];
};

var _initPersistence = /*#__PURE__*/initPersistence('react-three-editable_'),
    initialPersistedState = _initPersistence[0],
    unsub = _initPersistence[1];

var configure = function configure(_temp) {
  var _ref4 = _temp === void 0 ? {} : _temp,
      _ref4$localStorageNam = _ref4.localStorageNamespace,
      localStorageNamespace = _ref4$localStorageNam === void 0 ? '' : _ref4$localStorageNam,
      _ref4$enablePersisten = _ref4.enablePersistence,
      enablePersistence = _ref4$enablePersisten === void 0 ? true : _ref4$enablePersisten;

  if (unsub) {
    unsub();
  }

  if (enablePersistence) {
    var persistence = initPersistence("react-three-editable_" + localStorageNamespace);
    initialPersistedState = persistence[0];
    unsub = persistence[1];
  } else {
    initialPersistedState = null;
    unsub = undefined;
  }

  return function (_temp2) {
    var _ref5 = _temp2 === void 0 ? {} : _temp2,
        _ref5$allowImplicitIn = _ref5.allowImplicitInstancing,
        allowImplicitInstancing = _ref5$allowImplicitIn === void 0 ? false : _ref5$allowImplicitIn,
        state = _ref5.state;

    return function (_ref6) {
      var gl = _ref6.gl,
          scene = _ref6.scene;
      var init = useEditorStore.getState().init;
      init(scene, gl, allowImplicitInstancing, state);
    };
  };
};

var css_248z = "/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */\n\n/*\nDocument\n========\n*/\n\n/**\nUse a better box model (opinionated).\n*/\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/**\nUse a more readable tab size (opinionated).\n*/\n\n:root {\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n     tab-size: 4;\n}\n\n/**\n1. Correct the line height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n*/\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/*\nSections\n========\n*/\n\n/**\nRemove the margin in all browsers.\n*/\n\nbody {\n  margin: 0;\n}\n\n/**\nImprove consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n*/\n\nbody {\n  font-family:\n\t\tsystem-ui,\n\t\t-apple-system, /* Firefox supports this but not yet `system-ui` */\n\t\t'Segoe UI',\n\t\tRoboto,\n\t\tHelvetica,\n\t\tArial,\n\t\tsans-serif,\n\t\t'Apple Color Emoji',\n\t\t'Segoe UI Emoji';\n}\n\n/*\nGrouping content\n================\n*/\n\n/**\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n}\n\n/*\nText-level semantics\n====================\n*/\n\n/**\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr[title] {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/**\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n2. Correct the odd 'em' font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family:\n\t\tui-monospace,\n\t\tSFMono-Regular,\n\t\tConsolas,\n\t\t'Liberation Mono',\n\t\tMenlo,\n\t\tmonospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/**\nPrevent 'sub' and 'sup' elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\nTabular data\n============\n*/\n\n/**\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n}\n\n/*\nForms\n=====\n*/\n\n/**\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\nRemove the inheritance of text transform in Edge and Firefox.\n1. Remove the inheritance of text transform in Firefox.\n*/\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\nCorrect the inability to style clickable types in iOS and Safari.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button;\n}\n\n/**\nRemove the inner border and padding in Firefox.\n*/\n\n::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\nRestore the focus styles unset by the previous rule.\n*/\n\n:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\nRemove the additional ':invalid' styles in Firefox.\nSee: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/**\nRemove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.\n*/\n\nlegend {\n  padding: 0;\n}\n\n/**\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to 'inherit' in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nInteractive\n===========\n*/\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background-color: transparent;\n  background-image: none;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * 1. Use the user's configured `sans` font-family (with Tailwind's default\n *    sans-serif font stack as a fallback) as a sane default.\n * 2. Use Tailwind's default \"normal\" line-height so the user isn't forced\n *    to override it to ensure consistency even when using the default theme.\n */\n\nhtml {\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 1 */\n  line-height: 1.5; /* 2 */\n}\n\n/**\n * Inherit font-family and line-height from `html` so users can set them as\n * a class directly on the `html` element.\n */\n\nbody {\n  font-family: inherit;\n  line-height: inherit;\n}\n\n/**\n * 1. Prevent padding and border from affecting element width.\n *\n *    We used to set this in the html element and inherit from\n *    the parent element for everything else. This caused issues\n *    in shadow-dom-enhanced elements like <details> where the content\n *    is wrapped by a div with box-sizing set to `content-box`.\n *\n *    https://github.com/mozdevs/cssremedy/issues/4\n *\n *\n * 2. Allow adding a border to an element by just adding a border-width.\n *\n *    By default, the way the browser specifies that an element should have no\n *    border is by setting it's border-style to `none` in the user-agent\n *    stylesheet.\n *\n *    In order to easily add borders to elements by just setting the `border-width`\n *    property, we change the default border-style for all elements to `solid`, and\n *    use border-width to hide them instead. This way our `border` utilities only\n *    need to set the `border-width` property instead of the entire `border`\n *    shorthand, making our border utilities much more straightforward to compose.\n *\n *    https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n/*\n * Ensure horizontal rules are visible by default\n */\n\nhr {\n  border-top-width: 1px;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #9ca3af;\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  color: #9ca3af;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  color: #9ca3af;\n}\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\ntable {\n  border-collapse: collapse;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/**\n * Reset links to optimize for opt-in styling instead of\n * opt-out.\n */\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/**\n * Reset form element properties that are easy to forget to\n * style explicitly so you don't inadvertently introduce\n * styles that deviate from your design system. These styles\n * supplement a partial reset that is already applied by\n * normalize.css.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n\n/**\n * Use the configured 'mono' font family for elements that\n * are expected to be rendered with a monospace font, falling\n * back to the system monospace stack if there is no configured\n * 'mono' font family.\n */\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n/**\n * Make replaced elements `display: block` by default as that's\n * the behavior you want almost all of the time. Inspired by\n * CSS Remedy, with `svg` added as well.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  vertical-align: middle;\n}\n\n/**\n * Constrain images and videos to the parent width and preserve\n * their instrinsic aspect ratio.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n\n      [type='text'],\n      [type='email'],\n      [type='url'],\n      [type='password'],\n      [type='number'],\n      [type='date'],\n      [type='datetime-local'],\n      [type='month'],\n      [type='search'],\n      [type='tel'],\n      [type='time'],\n      [type='week'],\n      [multiple],\n      textarea,\n      select\n     {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background-color: #fff;\n  border-color: #6b7280;\n  border-width: 1px;\n  border-radius: 0px;\n  padding-top: 0.5rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n[type='text']:focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #2563eb;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  border-color: #2563eb;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\ninput::placeholder, textarea::placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-date-and-time-value {\n  min-height: 1.5em;\n}\n\nselect {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 0.5rem center;\n  background-repeat: no-repeat;\n  background-size: 1.5em 1.5em;\n  padding-right: 2.5rem;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n}\n\n[multiple] {\n  background-image: initial;\n  background-position: initial;\n  background-repeat: unset;\n  background-size: initial;\n  padding-right: 0.75rem;\n  -webkit-print-color-adjust: unset;\n          color-adjust: unset;\n}\n\n\n      [type='checkbox'],\n      [type='radio']\n     {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  padding: 0;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  flex-shrink: 0;\n  height: 1rem;\n  width: 1rem;\n  color: #2563eb;\n  background-color: #fff;\n  border-color: #6b7280;\n  border-width: 1px;\n}\n\n[type='checkbox'] {\n  border-radius: 0px;\n}\n\n[type='radio'] {\n  border-radius: 100%;\n}\n\n\n      [type='checkbox']:focus,\n      [type='radio']:focus\n     {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 2px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #2563eb;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n\n      [type='checkbox']:checked,\n      [type='radio']:checked\n     {\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\");\n}\n\n[type='radio']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");\n}\n\n\n      [type='checkbox']:checked:hover,\n      [type='checkbox']:checked:focus,\n      [type='radio']:checked:hover,\n      [type='radio']:checked:focus\n     {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='checkbox']:indeterminate {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e\");\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n\n      [type='checkbox']:indeterminate:hover,\n      [type='checkbox']:indeterminate:focus\n     {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='file'] {\n  background: unset;\n  border-color: inherit;\n  border-width: 0;\n  border-radius: 0;\n  padding: 0;\n  font-size: unset;\n  line-height: inherit;\n}\n\n[type='file']:focus {\n  outline: 1px auto -webkit-focus-ring-color;\n}\n\n/*\n    Shadow dom base styles\n    ========\n    */\n\n#react-three-editable-editor-root {\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n     tab-size: 4;\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  margin: 0;\n  font-family: system-ui, -apple-system,\n      /* Firefox supports this but not yet `system-ui` */ 'Segoe UI', Roboto,\n      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';\n}\n\ncanvas {\n  outline: none\n}\n\n.bg-black {\n  --tw-bg-opacity: 1;\n  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));\n}\n\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n}\n\n.bg-gray-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));\n}\n\n.bg-gray-700 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(55, 65, 81, var(--tw-bg-opacity));\n}\n\n.bg-gray-800 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));\n}\n\n.bg-green-800 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(6, 95, 70, var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-200:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-900:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));\n}\n\n.hover\\:bg-green-900:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(6, 78, 59, var(--tw-bg-opacity));\n}\n\n.bg-opacity-40 {\n  --tw-bg-opacity: 0.4;\n}\n\n.bg-opacity-70 {\n  --tw-bg-opacity: 0.7;\n}\n\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgba(209, 213, 219, var(--tw-border-opacity));\n}\n\n.hover\\:border-gray-400:hover {\n  --tw-border-opacity: 1;\n  border-color: rgba(156, 163, 175, var(--tw-border-opacity));\n}\n\n.rounded-sm {\n  border-radius: 0.125rem;\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-md {\n  border-radius: 0.375rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.rounded-r {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n}\n\n.first\\:rounded-l:first-child {\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.last\\:rounded-r:last-child {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.border-r {\n  border-right-width: 1px;\n}\n\n.border-l {\n  border-left-width: 1px;\n}\n\n.block {\n  display: block;\n}\n\n.inline-block {\n  display: inline-block;\n}\n\n.inline {\n  display: inline;\n}\n\n.flex {\n  display: flex;\n}\n\n.inline-flex {\n  display: inline-flex;\n}\n\n.table {\n  display: table;\n}\n\n.grid {\n  display: grid;\n}\n\n.hidden {\n  display: none;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.items-start {\n  align-items: flex-start;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-start {\n  justify-content: flex-start;\n}\n\n.justify-end {\n  justify-content: flex-end;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.font-mono {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n.font-medium {\n  font-weight: 500;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.h-4 {\n  height: 1rem;\n}\n\n.h-5 {\n  height: 1.25rem;\n}\n\n.h-7 {\n  height: 1.75rem;\n}\n\n.h-8 {\n  height: 2rem;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.h-screen {\n  height: 100vh;\n}\n\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n\n.text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n\n.text-3xl {\n  font-size: 1.875rem;\n  line-height: 2.25rem;\n}\n\n.text-xxs {\n  font-size: 0.5rem;\n  line-height: 0.75rem;\n}\n\n.m-5 {\n  margin: 1.25rem;\n}\n\n.my-14 {\n  margin-top: 3.5rem;\n  margin-bottom: 3.5rem;\n}\n\n.mr-2 {\n  margin-right: 0.5rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.mt-3 {\n  margin-top: 0.75rem;\n}\n\n.mb-3 {\n  margin-bottom: 0.75rem;\n}\n\n.ml-3 {\n  margin-left: 0.75rem;\n}\n\n.mb-4 {\n  margin-bottom: 1rem;\n}\n\n.mb-5 {\n  margin-bottom: 1.25rem;\n}\n\n.max-w-md {\n  max-width: 28rem;\n}\n\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.overflow-y-auto {\n  overflow-y: auto;\n}\n\n.p-0 {\n  padding: 0px;\n}\n\n.p-1 {\n  padding: 0.25rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.p-5 {\n  padding: 1.25rem;\n}\n\n.p-0\\.5 {\n  padding: 0.125rem;\n}\n\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.pointer-events-none {\n  pointer-events: none;\n}\n\n.pointer-events-auto {\n  pointer-events: auto;\n}\n\n.fixed {\n  position: fixed;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.inset-0 {\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n\n.inset-1 {\n  top: 0.25rem;\n  right: 0.25rem;\n  bottom: 0.25rem;\n  left: 0.25rem;\n}\n\n.top-0 {\n  top: 0px;\n}\n\n.right-0 {\n  right: 0px;\n}\n\n.bottom-0 {\n  bottom: 0px;\n}\n\n.left-0 {\n  left: 0px;\n}\n\n.bottom-5 {\n  bottom: 1.25rem;\n}\n\n.left-5 {\n  left: 1.25rem;\n}\n\n* {\n  --tw-shadow: 0 0 #0000;\n}\n\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-2xl {\n  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n* {\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgba(59, 130, 246, 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n}\n\n.ring-4 {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.hover\\:ring-4:hover {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-4:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-inset:focus {\n  --tw-ring-inset: inset;\n}\n\n.focus\\:ring-offset-0:focus {\n  --tw-ring-offset-width: 0px;\n}\n\n.ring-green-800 {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(6, 95, 70, var(--tw-ring-opacity));\n}\n\n.hover\\:ring-gray-200:hover {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(229, 231, 235, var(--tw-ring-opacity));\n}\n\n.hover\\:ring-green-900:hover {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(6, 78, 59, var(--tw-ring-opacity));\n}\n\n.focus\\:ring-blue-300:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(147, 197, 253, var(--tw-ring-opacity));\n}\n\n.focus\\:ring-blue-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(59, 130, 246, var(--tw-ring-opacity));\n}\n\n.focus\\:ring-opacity-50:focus {\n  --tw-ring-opacity: 0.5;\n}\n\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\n}\n\n.text-gray-700 {\n  --tw-text-opacity: 1;\n  color: rgba(55, 65, 81, var(--tw-text-opacity));\n}\n\n.text-green-600 {\n  --tw-text-opacity: 1;\n  color: rgba(5, 150, 105, var(--tw-text-opacity));\n}\n\n.text-green-800 {\n  --tw-text-opacity: 1;\n  color: rgba(6, 95, 70, var(--tw-text-opacity));\n}\n\n.hover\\:text-green-500:hover {\n  --tw-text-opacity: 1;\n  color: rgba(16, 185, 129, var(--tw-text-opacity));\n}\n\n.align-middle {\n  vertical-align: middle;\n}\n\n.visible {\n  visibility: visible;\n}\n\n.whitespace-pre {\n  white-space: pre;\n}\n\n.w-4 {\n  width: 1rem;\n}\n\n.w-80 {\n  width: 20rem;\n}\n\n.w-auto {\n  width: auto;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.w-min {\n  width: -webkit-min-content;\n  width: -moz-min-content;\n  width: min-content;\n}\n\n.z-0 {\n  z-index: 0;\n}\n\n.z-50 {\n  z-index: 50;\n}\n\n.-z-10 {\n  z-index: -10;\n}\n\n.gap-1 {\n  gap: 0.25rem;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}\n\n.gap-4 {\n  gap: 1rem;\n}\n\n.gap-5 {\n  gap: 1.25rem;\n}\n\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.auto-rows-16 {\n  grid-auto-rows: 4rem;\n}\n\n.transform {\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.hover\\:scale-125:hover {\n  --tw-scale-x: 1.25;\n  --tw-scale-y: 1.25;\n}\n\n.transition-transform {\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n@-webkit-keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes ping {\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n@keyframes ping {\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes pulse {\n  50% {\n    opacity: .5;\n  }\n}\n\n@keyframes pulse {\n  50% {\n    opacity: .5;\n  }\n}\n\n@-webkit-keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    -webkit-animation-timing-function: cubic-bezier(0.8,0,1,1);\n            animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    -webkit-animation-timing-function: cubic-bezier(0,0,0.2,1);\n            animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    -webkit-animation-timing-function: cubic-bezier(0.8,0,1,1);\n            animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    -webkit-animation-timing-function: cubic-bezier(0,0,0.2,1);\n            animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n\n@media (min-width: 640px) {\n}\n\n@media (min-width: 768px) {\n}\n\n@media (min-width: 1024px) {\n}\n\n@media (min-width: 1280px) {\n}\n\n@media (min-width: 1536px) {\n}\n\n";

var Button = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return React__default.createElement(reakit.Button // @ts-ignore
  , Object.assign({
    // @ts-ignore
    ref: ref
  }, props, {
    className: props.className + " inline-flex justify-center rounded-md px-4 py-2 font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
  }));
});

var Heading = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return (// eslint-disable-next-line jsx-a11y/heading-has-content
    React__default.createElement("h1", Object.assign({
      ref: ref
    }, props, {
      className: props.className + " font-bold"
    }))
  );
});

var Code = function Code(_ref) {
  var children = _ref.children,
      block = _ref.block;
  return React__default.createElement(Highlight__default, Object.assign({}, Highlight.defaultProps, {
    theme: theme,
    code: children,
    language: "tsx"
  }), function (_ref2) {
    var className = _ref2.className,
        style = _ref2.style,
        tokens = _ref2.tokens,
        getLineProps = _ref2.getLineProps,
        getTokenProps = _ref2.getTokenProps;
    return React__default.createElement("code", {
      className: className + " font-mono whitespace-pre rounded " + (block ? 'block p-4' : 'inline p-1'),
      style: style
    }, tokens.map(function (line, i) {
      return React__default.createElement("div", Object.assign({}, getLineProps({
        line: line,
        key: i
      }), {
        className: block ? 'block' : 'inline'
      }), line.map(function (token, key) {
        return React__default.createElement("span", Object.assign({}, getTokenProps({
          token: token,
          key: key
        })));
      }));
    }));
  });
};

var Modal = function Modal(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  var dialog = _extends({}, reakit.useDialogState(), props);

  return React__default.createElement(reakit.DialogBackdrop // @ts-ignore
  , Object.assign({}, dialog, {
    className: "fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-start"
  }), React__default.createElement(reakit.Dialog // @ts-ignore
  , Object.assign({}, dialog, {
    className: "flex flex-col my-14 max-w-md w-full bg-white rounded-md shadow-lg focus:outline-none",
    "aria-label": "Dialog"
  }), children));
};
var ModalHeader = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
  var className = _ref2.className,
      props = _objectWithoutPropertiesLoose(_ref2, ["className"]);

  return React__default.createElement("header", Object.assign({
    ref: ref
  }, props, {
    className: className + " flex-0 px-6 py-4 text-xl font-semibold"
  }));
});
var ModalBody = /*#__PURE__*/React.forwardRef(function (_ref3, ref) {
  var className = _ref3.className,
      props = _objectWithoutPropertiesLoose(_ref3, ["className"]);

  return React__default.createElement("div", Object.assign({
    ref: ref
  }, props, {
    className: className + " flex-1 px-6 py-2"
  }));
});
var ModalFooter = /*#__PURE__*/React.forwardRef(function (_ref4, ref) {
  var className = _ref4.className,
      props = _objectWithoutPropertiesLoose(_ref4, ["className"]);

  return React__default.createElement("footer", Object.assign({
    ref: ref
  }, props, {
    className: className + " flex px-6 py-4 justify-end gap-3"
  }));
});

var PortalManager = function PortalManager(_ref) {
  var children = _ref.children;
  var wrapperRef = React__default.useRef(null); // force update on initial render

  var _useState = React.useState(false),
      forceUpdate = _useState[1];

  React.useLayoutEffect(function () {
    forceUpdate(function (i) {
      return !i;
    });
  }, []);
  return React__default.createElement(reakit.PortalContext.Provider, {
    value: wrapperRef.current
  }, children, React__default.createElement("div", {
    ref: wrapperRef,
    className: "relative z-50"
  }));
};

var OptionButton = function OptionButton(_ref) {
  var value = _ref.value,
      option = _ref.option,
      label = _ref.label,
      icon = _ref.icon,
      onClick = _ref.onClick;
  var tooltip = reakit.useTooltipState();
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(reakit.TooltipReference, Object.assign({}, tooltip, {
    as: reakit.Button,
    className: "flex relative items-center justify-center align-middle w-auto text-sm font-semibold h-7 px-2 first:rounded-l last:rounded-r focus:outline-none focus:ring focus:ring-blue-300 focus:ring-inset " + (option === value ? 'bg-green-800 hover:bg-green-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
    "aria-label": label,
    onClick: onClick
  }), icon), React__default.createElement(Tooltip, Object.assign({}, tooltip), label));
};

var Settings = function Settings(_ref2) {
  var children = _ref2.children;
  var tooltip = reakit.useTooltipState();
  var popover = reakit.usePopoverState();
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(reakit.TooltipReference, Object.assign({}, tooltip, {
    as: 'div',
    tabIndex: -1,
    className: "focus:outline-none"
  }), React__default.createElement(reakit.PopoverDisclosure // @ts-ignore
  , Object.assign({}, popover, {
    className: "flex relative items-center justify-center align-middle w-auto text-sm font-semibold h-7 px-1 rounded-r bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-inset"
  }), React__default.createElement(FiChevronDown.FiChevronDown, null))), React__default.createElement(Tooltip, Object.assign({}, tooltip), "Settings"), React__default.createElement(Popover, Object.assign({}, popover, {
    // this seems to be necessary to prevent the popup from forever being closed after the first opening
    hideOnClickOutside: false,
    "aria-label": "More options"
  }), children));
};

var CompactModeSelect = function CompactModeSelect(_ref3) {
  var value = _ref3.value,
      onChange = _ref3.onChange,
      options = _ref3.options,
      settingsPanel = _ref3.settingsPanel;
  return React__default.createElement(reakit.Group // @ts-ignore
  , {
    // @ts-ignore
    className: "flex"
  }, options.map(function (_ref4) {
    var label = _ref4.label,
        icon = _ref4.icon,
        option = _ref4.option;
    return React__default.createElement(OptionButton, {
      key: option,
      value: value,
      option: option,
      label: label,
      icon: icon,
      onClick: function onClick() {
        return onChange(option);
      }
    });
  }), settingsPanel && React__default.createElement(Settings, null, settingsPanel));
};

var Tooltip = function Tooltip(_ref) {
  var className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["className"]);

  return React__default.createElement(reakit.Tooltip // @ts-ignore
  , Object.assign({}, props, {
    className: className + " px-2 py-1  text-white bg-gray-700 rounded-sm text-sm pointer-events-none shadow-md"
  }));
};

var IconButton = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var label = _ref.label,
      icon = _ref.icon,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "icon", "className"]);

  var tooltip = reakit.useTooltipState();
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(reakit.TooltipReference, Object.assign({
    ref: ref
  }, props, tooltip, {
    as: reakit.Button,
    className: className + " flex relative items-center justify-center align-middle w-auto text-sm font-semibold h-7 px-2 first:rounded-l last:rounded-r bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-inset",
    "aria-label": label
  }), icon), React__default.createElement(Tooltip, Object.assign({}, tooltip), label));
});

var FormControlContext = /*#__PURE__*/React.createContext(undefined);
var FormControl = function FormControl(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  var _useId = reakit.unstable_useId(props),
      id = _useId.id;

  return React__default.createElement(FormControlContext.Provider, {
    value: id
  }, children);
};
var useFormControlContext = function useFormControlContext() {
  return React.useContext(FormControlContext);
};

var Input = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$id;

  var id = useFormControlContext();
  return React__default.createElement(reakit.Input // @ts-ignore
  , Object.assign({
    // @ts-ignore
    ref: ref
  }, props, {
    id: (_props$id = props.id) != null ? _props$id : id,
    className: props.className + " w-full h-8 px-3 border rounded-sm focus:outline-none focus:ring focus:ring-blue-300"
  }));
});

var Input$1 = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return React__default.createElement("legend", Object.assign({
    ref: ref
  }, props, {
    className: props.className + " font-medium mb-2"
  }));
});

var Popover = function Popover(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "children"]);

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(reakit.Popover // @ts-ignore
  , Object.assign({}, props, {
    className: "flex p-4 w-80 rounded overflow-hidden shadow-2xl focus:outline-none bg-white"
  }), props.visible && children));
};

var SettingsButton = function SettingsButton(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      label = _ref.label;
  var tooltip = reakit.useTooltipState();
  var popover = reakit.usePopoverState();
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(reakit.TooltipReference, Object.assign({}, tooltip, {
    as: 'div',
    tabIndex: -1,
    className: "inline-block focus:outline-none"
  }), React__default.createElement(reakit.PopoverDisclosure // @ts-ignore
  , Object.assign({}, popover, {
    className: "flex gap-1 relative items-center justify-center align-middle w-auto text-sm font-semibold h-7 px-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-inset"
  }), icon, React__default.createElement(FiChevronDown.FiChevronDown, null))), React__default.createElement(Tooltip, Object.assign({}, tooltip), label), React__default.createElement(Popover, Object.assign({}, popover, {
    // this seems to be necessary to prevent the popup from forever being closed after the first opening
    hideOnClickOutside: false,
    "aria-label": label
  }), children));
};

var Checkbox = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _props$id, _props$id2;

  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  var id = useFormControlContext();
  return React__default.createElement("div", {
    className: "flex items-start"
  }, React__default.createElement("div", {
    className: "flex items-center h-5"
  }, React__default.createElement(reakit.Checkbox // @ts-ignore
  , Object.assign({}, props, {
    id: (_props$id = props.id) != null ? _props$id : id,
    ref: ref,
    className: "focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:ring-offset-0 h-4 w-4 text-green-800 border-gray-300 hover:border-gray-400 rounded"
  }))), React__default.createElement("div", {
    className: "ml-3 text-sm"
  }, React__default.createElement("label", {
    htmlFor: (_props$id2 = props.id) != null ? _props$id2 : id,
    className: "font-medium text-gray-700"
  }, children)));
});

var TransformControlsModeSelect = function TransformControlsModeSelect(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return React__default.createElement(CompactModeSelect, {
    value: value,
    onChange: onChange,
    options: [{
      option: 'translate',
      label: 'Tool: Translate',
      icon: React__default.createElement(GiMove.GiMove, null)
    }, {
      option: 'rotate',
      label: 'Tool: Rotate',
      icon: React__default.createElement(GiClockwiseRotation.GiClockwiseRotation, null)
    }, {
      option: 'scale',
      label: 'Tool: Scale',
      icon: React__default.createElement(GiResize.GiResize, null)
    }]
  });
};

var ReferenceWindow = function ReferenceWindow(_ref) {
  var height = _ref.height;
  var canvasRef = React.useRef(null);

  var _useEditorStore = useEditorStore(function (state) {
    return [state.gl];
  }, shallow),
      gl = _useEditorStore[0];

  var _useMeasure = useMeasure(),
      ref = _useMeasure[0],
      bounds = _useMeasure[1];

  React.useLayoutEffect(function () {
    if (gl) {
      ref(gl == null ? void 0 : gl.domElement);
    }
  }, [gl, ref]);
  React.useEffect(function () {
    var animationHandle;

    var draw = function draw(gl) {
      return function () {
        animationHandle = requestAnimationFrame(draw(gl));

        if (!gl.domElement) {
          return;
        }

        var width = gl.domElement.width / gl.domElement.height * height;
        var ctx = canvasRef.current.getContext('2d'); // https://stackoverflow.com/questions/17861447/html5-canvas-drawimage-how-to-apply-antialiasing

        ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(gl.domElement, 0, 0, width, height);
      };
    };

    if (gl) {
      draw(gl)();
    }

    return function () {
      cancelAnimationFrame(animationHandle);
    };
  }, [gl, height]);
  return (gl == null ? void 0 : gl.domElement) ? React__default.createElement("div", {
    className: "rounded overflow-hidden shadow-2xl"
  }, React__default.createElement("canvas", {
    ref: canvasRef,
    width: (bounds.width || gl.domElement.width) / (bounds.height || gl.domElement.height) * height,
    height: height
  })) : null;
};

var TransformControlsSpaceSelect = function TransformControlsSpaceSelect(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return React__default.createElement(CompactModeSelect, {
    value: value,
    onChange: onChange,
    options: [{
      option: 'world',
      label: 'Space: World',
      icon: React__default.createElement(BiGlobe.BiGlobe, null)
    }, {
      option: 'local',
      label: 'Space: Local',
      icon: React__default.createElement(BiCube.BiCube, null)
    }]
  });
};

var EnvironmentPreview = function EnvironmentPreview(_ref) {
  var url = _ref.url,
      selected = _ref.selected,
      props = _objectWithoutPropertiesLoose(_ref, ["url", "selected"]);

  return React__default.createElement(reakit.Clickable, Object.assign({}, props, {
    as: "div",
    className: (selected ? 'ring-4 ring-green-800 hover:ring-green-900' : 'hover:ring-4 hover:ring-gray-200') + " focus:outline-none focus:ring-4 rounded overflow-hidden"
  }), React__default.createElement("div", {
    className: "h-full relative"
  }, url ? React__default.createElement(React__default.Fragment, null, React__default.createElement(reactThreeFiber.Canvas, null, React__default.createElement(React.Suspense, {
    fallback: null
  }, React__default.createElement(drei.OrbitControls, Object.assign({
    enableZoom: false,
    enablePan: false
  }, {})), React__default.createElement(drei.Environment // @ts-ignore
  , {
    // @ts-ignore
    files: url,
    path: "",
    background: true
  })), React__default.createElement(drei.TorusKnot, Object.assign({}, {}), React__default.createElement("meshStandardMaterial", {
    metalness: 1,
    roughness: 0
  }))), React__default.createElement("div", {
    className: "absolute inset-1 pointer-events-none flex flex-col justify-end items-center"
  }, React__default.createElement("div", {
    className: "bg-white p-0.5 text-xxs rounded shadow"
  }, url != null ? url : 'None'))) : React__default.createElement("div", {
    className: "flex justify-center items-center h-full bg-gray-100"
  }, React__default.createElement(IoIosClose.IoIosClose, {
    size: "3em"
  }))));
};

var ViewportShadingSettings = function ViewportShadingSettings() {
  var _useEditorStore = useEditorStore(function (state) {
    return [state.hdrPaths, state.selectedHdr, state.useHdrAsBackground, state.setSelectedHdr, state.setUseHdrAsBackground];
  }, shallow),
      hdrPaths = _useEditorStore[0],
      selectedHdr = _useEditorStore[1],
      useHdrAsBackground = _useEditorStore[2],
      setSelectedHdr = _useEditorStore[3],
      setUseHdrAsBackground = _useEditorStore[4];

  return React__default.createElement("div", {
    className: "w-full"
  }, React__default.createElement(Heading, {
    className: "text-xl mb-3"
  }, "Environment"), React__default.createElement("div", {
    className: "flex flex-col gap-3"
  }, React__default.createElement("div", {
    className: "grid grid-cols-2 gap-4 auto-rows-16"
  }, React__default.createElement(EnvironmentPreview, {
    url: null,
    selected: selectedHdr === null,
    onClick: function onClick() {
      setSelectedHdr(null);
    }
  }), hdrPaths.map(function (hdrPath) {
    return React__default.createElement(EnvironmentPreview, {
      key: hdrPath,
      url: hdrPath,
      selected: hdrPath === selectedHdr,
      onClick: function onClick() {
        setSelectedHdr(hdrPath);
      }
    });
  })), React__default.createElement(FormControl, null, React__default.createElement(Checkbox, {
    checked: useHdrAsBackground,
    onChange: function onChange() {
      return setUseHdrAsBackground(!useHdrAsBackground);
    }
  }, "Use as background"))));
};

var ViewportShadingSelect = function ViewportShadingSelect(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return React__default.createElement(CompactModeSelect, {
    value: value,
    onChange: onChange,
    options: [{
      option: 'wireframe',
      label: 'Display: Wireframe',
      icon: React__default.createElement(BiCube.BiCube, null)
    }, {
      option: 'flat',
      label: 'Display: Flat',
      icon: React__default.createElement(GiCube.GiCube, null)
    }, {
      option: 'solid',
      label: 'Display: Solid',
      icon: React__default.createElement(FaCube.FaCube, null)
    }, {
      option: 'rendered',
      label: 'Display: Rendered',
      icon: React__default.createElement(GiIceCube.GiIceCube, null)
    }],
    settingsPanel: React__default.createElement(ViewportShadingSettings, null)
  });
};

var ObjectButton = function ObjectButton(_ref) {
  var objectName = _ref.objectName,
      editableType = _ref.editableType,
      selected = _ref.selected,
      props = _objectWithoutPropertiesLoose(_ref, ["objectName", "editableType", "selected"]);

  var icon;

  switch (editableType) {
    case 'group':
      icon = React__default.createElement(BsFillCollectionFill.BsFillCollectionFill, null);
      break;

    case 'mesh':
      icon = React__default.createElement(GiCube.GiCube, null);
      break;

    case 'pointLight':
      icon = React__default.createElement(GiLightBulb.GiLightBulb, null);
      break;

    case 'spotLight':
      icon = React__default.createElement(GiLightProjector.GiLightProjector, null);
      break;

    case 'directionalLight':
      icon = React__default.createElement(BiSun.BiSun, null);
      break;

    case 'perspectiveCamera':
    case 'orthographicCamera':
      icon = React__default.createElement(BsCameraVideoFill.BsCameraVideoFill, null);
  }

  return React__default.createElement(reakit.Button // @ts-ignore
  , Object.assign({}, props, {
    className: "inline-flex justify-start items-center rounded-md px-4 py-2 font-medium focus:outline-none focus:ring focus:ring-blue-300 " + (objectName === selected ? 'bg-green-800 hover:bg-green-900 text-white' : 'text-gray-700 hover:bg-gray-200')
  }), React__default.createElement("span", {
    className: "mr-2"
  }, icon), objectName);
};

var SceneOutlinePanel = function SceneOutlinePanel() {
  var _useEditorStore = useEditorStore(function (state) {
    return [state.editablesSnapshot, state.selected, state.setSelected, state.createSnapshot];
  }, shallow),
      editablesSnapshot = _useEditorStore[0],
      selected = _useEditorStore[1],
      setSelected = _useEditorStore[2],
      createSnapshot = _useEditorStore[3];

  if (editablesSnapshot === null) {
    return null;
  }

  return React__default.createElement("div", {
    className: "flex flex-col overflow-y-auto w-80 h-full p-5 border-r bg-white"
  }, React__default.createElement(Heading, {
    className: "mb-5 ml-3 text-3xl"
  }, "Outline"), React__default.createElement(reakit.Group // @ts-ignore
  , {
    // @ts-ignore
    className: "flex flex-col gap-3 flex-1"
  }, Object.entries(editablesSnapshot).map(function (_ref2) {
    var name = _ref2[0],
        editable = _ref2[1];
    return editable.role === 'active' && React__default.createElement(ObjectButton, {
      key: name,
      objectName: name,
      editableType: editable.type,
      selected: selected,
      onClick: function onClick() {
        setSelected(name);
      }
    });
  })), React__default.createElement("div", {
    className: "flex-0 mt-3"
  }, React__default.createElement(Button, {
    className: "w-full",
    onClick: function onClick() {
      createSnapshot();
    }
  }, "Sync editor")));
};

var Vector3Input = function Vector3Input(_ref) {
  var register = _ref.register,
      onBlur = _ref.onBlur,
      label = _ref.label,
      name = _ref.name;
  return React__default.createElement("fieldset", null, React__default.createElement(Input$1, null, label), React__default.createElement("div", {
    className: "flex gap-3"
  }, React__default.createElement(FormControl, {
    id: name + "-x"
  }, React__default.createElement(Input, {
    name: name + "X",
    ref: register,
    onBlur: onBlur
  })), React__default.createElement(FormControl, {
    id: name + "-y"
  }, React__default.createElement(Input, {
    name: name + "Y",
    ref: register,
    onBlur: onBlur
  })), React__default.createElement(FormControl, {
    id: name + "-z"
  }, React__default.createElement(Input, {
    name: name + "Z",
    ref: register,
    onBlur: onBlur
  }))));
};

var PropertiesPanel = function PropertiesPanel() {
  var _useEditorStore = useEditorStore(function (state) {
    return [state.selected, state.setEditableTransform];
  }, shallow),
      selected = _useEditorStore[0],
      setEditableTransform = _useEditorStore[1];

  var getFormValuesFromEditable = React.useCallback(function () {
    if (!selected) {
      return;
    }

    var position = new three.Vector3();
    var rotation = new three.Quaternion();
    var scale = new three.Vector3();
    useEditorStore.getState().editables[selected].properties.transform.decompose(position, rotation, scale);
    var rotationEuler = new three.Euler();
    rotationEuler.setFromQuaternion(rotation);
    return {
      positionX: position.x.toFixed(2),
      positionY: position.y.toFixed(2),
      positionZ: position.z.toFixed(2),
      rotationX: rotationEuler.x.toFixed(2),
      rotationY: rotationEuler.y.toFixed(2),
      rotationZ: rotationEuler.z.toFixed(2),
      scaleX: scale.x.toFixed(2),
      scaleY: scale.y.toFixed(2),
      scaleZ: scale.z.toFixed(2)
    };
  }, [selected]);

  var _useForm = reactHookForm.useForm({
    defaultValues: getFormValuesFromEditable()
  }),
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register,
      setValue = _useForm.setValue,
      reset = _useForm.reset;

  React.useEffect(function () {
    if (!selected) {
      return;
    }

    var formValues = getFormValuesFromEditable();

    if (formValues) {
      Object.entries(formValues).forEach(function (_ref2) {
        var key = _ref2[0],
            value = _ref2[1];
        // avoids rerenders, unlike reset
        setValue(key, value);
      });
    }

    var unsub = useEditorStore.subscribe(function () {
      var formValues = getFormValuesFromEditable();

      if (formValues) {
        Object.entries(formValues).forEach(function (_ref3) {
          var key = _ref3[0],
              value = _ref3[1];
          // avoids rerenders, unlike reset
          setValue(key, value);
        });
      }
    }, function (state) {
      return state.editables[selected];
    });
    return function () {
      return unsub();
    };
  }, [getFormValuesFromEditable, selected, setValue]);
  return selected ? React__default.createElement("div", {
    className: "overflow-y-auto w-80 h-full p-5 border-l bg-white"
  }, React__default.createElement(Heading, {
    className: "mb-5 text-3xl"
  }, "Properties"), React__default.createElement("form", {
    onSubmit: handleSubmit(function (values) {
      var position = new three.Vector3(Number(values.positionX), Number(values.positionY), Number(values.positionZ));
      var rotation = new three.Quaternion().setFromEuler(new three.Euler(Number(values.rotationX), Number(values.rotationY), Number(values.rotationZ)));
      var scale = new three.Vector3(Number(values.scaleX), Number(values.scaleY), Number(values.scaleZ));
      var transform = new three.Matrix4().compose(position, rotation, scale);
      setEditableTransform(selected, transform);
    })
  }, React__default.createElement("div", {
    className: "flex flex-col gap-3"
  }, React__default.createElement("div", {
    className: "flex justify-between items-center text-xl font-medium"
  }, React__default.createElement("div", null, "Transforms"), React__default.createElement(reakit.Button // @ts-ignore
  , {
    // @ts-ignore
    className: "rounded-full focus:outline-none focus:ring transition-transform transform hover:scale-125",
    onClick: function onClick() {
      var editable = useEditorStore.getState().editables[selected];
      setEditableTransform(selected, editable.initialProperties.transform.clone());
    }
  }, React__default.createElement(MdRestore.MdRestore, null))), React__default.createElement(Vector3Input, {
    register: register,
    onBlur: function onBlur() {
      return reset(getFormValuesFromEditable());
    },
    label: "Position",
    name: "position"
  }), React__default.createElement(Vector3Input, {
    register: register,
    onBlur: function onBlur() {
      return reset(getFormValuesFromEditable());
    },
    label: "Rotation",
    name: "rotation"
  }), React__default.createElement(Vector3Input, {
    register: register,
    onBlur: function onBlur() {
      return reset(getFormValuesFromEditable());
    },
    label: "Scale",
    name: "scale"
  })), React__default.createElement(reakit.VisuallyHidden, {
    as: "input",
    type: "submit"
  }))) : null;
};

var ViewportShadingSettings$1 = function ViewportShadingSettings() {
  var _useEditorStore = useEditorStore(function (state) {
    return [state.showOverlayIcons, state.showGrid, state.showAxes, state.setShowOverlayIcons, state.setShowGrid, state.setShowAxes];
  }, shallow),
      showOverlayIcons = _useEditorStore[0],
      showGrid = _useEditorStore[1],
      showAxes = _useEditorStore[2],
      setShowOverlayIcons = _useEditorStore[3],
      setShowGrid = _useEditorStore[4],
      setShowAxes = _useEditorStore[5];

  return React__default.createElement("div", {
    className: "flex flex-col gap-3"
  }, React__default.createElement(FormControl, null, React__default.createElement(Checkbox // @ts-ignore
  , {
    // @ts-ignore
    checked: showOverlayIcons,
    onChange: function onChange() {
      return setShowOverlayIcons(!showOverlayIcons);
    }
  }, "Show overlay icons")), React__default.createElement(FormControl, null, React__default.createElement(Checkbox // @ts-ignore
  , {
    // @ts-ignore
    checked: showGrid,
    onChange: function onChange() {
      return setShowGrid(!showGrid);
    }
  }, "Show grid")), React__default.createElement(FormControl, null, React__default.createElement(Checkbox // @ts-ignore
  , {
    // @ts-ignore
    checked: showAxes,
    onChange: function onChange() {
      return setShowAxes(!showAxes);
    }
  }, "Show axes")));
};

var UI = function UI() {
  var _useEditorStore = useEditorStore(function (state) {
    return [state.transformControlsMode, state.transformControlsSpace, state.viewportShading, state.setTransformControlsMode, state.setTransformControlsSpace, state.setViewportShading, state.setEditorOpen, state.setEditableTransform];
  }, shallow),
      transformControlsMode = _useEditorStore[0],
      transformControlsSpace = _useEditorStore[1],
      viewportShading = _useEditorStore[2],
      setTransformControlsMode = _useEditorStore[3],
      setTransformControlsSpace = _useEditorStore[4],
      setViewportShading = _useEditorStore[5],
      setEditorOpen = _useEditorStore[6],
      setEditableTransform = _useEditorStore[7];

  return React__default.createElement("div", {
    className: "absolute inset-0 z-50 pointer-events-none"
  }, React__default.createElement("div", {
    className: "flex h-full"
  }, React__default.createElement("div", {
    className: "w-min pointer-events-auto"
  }, React__default.createElement(SceneOutlinePanel, null)), React__default.createElement("div", {
    className: "relative flex-1 m-5"
  }, React__default.createElement("div", {
    className: "flex items-start justify-between"
  }, React__default.createElement("div", {
    className: "flex gap-4"
  }, React__default.createElement("div", {
    className: "pointer-events-auto"
  }, React__default.createElement(TransformControlsModeSelect, {
    value: transformControlsMode,
    onChange: function onChange(value) {
      return setTransformControlsMode(value);
    }
  })), React__default.createElement("div", {
    className: "pointer-events-auto"
  }, React__default.createElement(TransformControlsSpaceSelect, {
    value: transformControlsSpace,
    onChange: setTransformControlsSpace
  })), React__default.createElement("div", {
    className: "pointer-events-auto"
  }, React__default.createElement(ViewportShadingSelect, {
    value: viewportShading,
    onChange: setViewportShading
  })), React__default.createElement("div", {
    className: "pointer-events-auto"
  }, React__default.createElement(IconButton, {
    label: "Focus on selected",
    icon: React__default.createElement(RiFocus3Line.RiFocus3Line, null),
    onClick: function onClick() {
      var _useEditorStore$getSt;

      var orbitControls = (_useEditorStore$getSt = useEditorStore.getState().orbitControlsRef) == null ? void 0 : _useEditorStore$getSt.current;
      var selected = useEditorStore.getState().selected;
      var focusObject;

      if (selected) {
        focusObject = useEditorStore.getState().editablesSnapshot[selected].proxyObject;
      }

      if (orbitControls && focusObject) {
        focusObject.getWorldPosition(orbitControls.target);
      }
    }
  })), React__default.createElement("div", {
    className: "pointer-events-auto"
  }, React__default.createElement(IconButton, {
    label: "Align object to view",
    icon: React__default.createElement(GiPocketBow.GiPocketBow, null),
    onClick: function onClick() {
      var _useEditorStore$getSt2, _useEditorStore$getSt3;

      var camera = (_useEditorStore$getSt2 = useEditorStore.getState().orbitControlsRef) == null ? void 0 : (_useEditorStore$getSt3 = _useEditorStore$getSt2.current) == null ? void 0 : _useEditorStore$getSt3.object;
      var selected = useEditorStore.getState().selected;
      var proxyObject;

      if (selected) {
        proxyObject = useEditorStore.getState().editablesSnapshot[selected].proxyObject;

        if (proxyObject && camera) {
          var direction = new three.Vector3();
          var position = camera.position.clone();
          camera.getWorldDirection(direction);
          proxyObject.position.set(0, 0, 0);
          proxyObject.lookAt(direction);
          proxyObject.parent.worldToLocal(position);
          proxyObject.position.copy(position);
          proxyObject.updateMatrix();
          setEditableTransform(selected, proxyObject.matrix.clone());
        }
      }
    }
  })), React__default.createElement("div", {
    className: "pointer-events-auto"
  }, React__default.createElement(SettingsButton, {
    icon: React__default.createElement(AiFillEye.AiFillEye, null),
    label: "Viewport settings"
  }, React__default.createElement(ViewportShadingSettings$1, null)))), React__default.createElement("div", {
    className: "absolute right-0 top-0 -z-10"
  }, React__default.createElement(ReferenceWindow, {
    height: 120
  }))), React__default.createElement(Button, {
    className: "absolute left-0 bottom-0 pointer-events-auto",
    onClick: function onClick() {
      return setEditorOpen(false);
    }
  }, "Close"), React__default.createElement(Button, {
    className: "absolute right-0 bottom-0 pointer-events-auto",
    onClick: function onClick() {
      var blob = new Blob([JSON.stringify(useEditorStore.getState().serialize())], {
        type: 'text/json;charset=utf-8'
      });
      fileSaver.saveAs(blob, 'editableState.json');
    }
  }, "Save")), React__default.createElement("div", {
    className: "w-min pointer-events-auto"
  }, React__default.createElement(PropertiesPanel, null))));
};

var EditableProxy = function EditableProxy(_ref) {
  var editableName = _ref.editableName,
      editableType = _ref.editableType,
      object = _ref.object;

  var _useEditorStore = useEditorStore(function (state) {
    return [state.selected, state.showOverlayIcons, state.setSelected, state.setSnapshotProxyObject];
  }, shallow),
      selected = _useEditorStore[0],
      showOverlayIcons = _useEditorStore[1],
      setSelected = _useEditorStore[2],
      setSnapshotProxyObject = _useEditorStore[3];

  React.useEffect(function () {
    setSnapshotProxyObject(object, editableName);
    return function () {
      return setSnapshotProxyObject(null, editableName);
    };
  }, [editableName, object, setSnapshotProxyObject]); // set up helper

  var Helper;

  switch (editableType) {
    case 'spotLight':
      Helper = three.SpotLightHelper;
      break;

    case 'directionalLight':
      Helper = three.DirectionalLightHelper;
      break;

    case 'pointLight':
      Helper = three.PointLightHelper;
      break;

    case 'perspectiveCamera':
    case 'orthographicCamera':
      Helper = three.CameraHelper;
      break;

    case 'group':
    case 'mesh':
      Helper = three.BoxHelper;
  }

  var helperArgs;
  var size = 1;
  var color = 'darkblue';

  switch (editableType) {
    case 'directionalLight':
    case 'pointLight':
      helperArgs = [size, color];
      break;

    case 'group':
    case 'mesh':
    case 'spotLight':
      helperArgs = [color];
      break;

    case 'perspectiveCamera':
    case 'orthographicCamera':
      helperArgs = [];
  }

  var icon;

  switch (editableType) {
    case 'group':
      icon = React__default.createElement(BsFillCollectionFill.BsFillCollectionFill, null);
      break;

    case 'mesh':
      icon = React__default.createElement(GiCube.GiCube, null);
      break;

    case 'pointLight':
      icon = React__default.createElement(GiLightBulb.GiLightBulb, null);
      break;

    case 'spotLight':
      icon = React__default.createElement(GiLightProjector.GiLightProjector, null);
      break;

    case 'directionalLight':
      icon = React__default.createElement(BiSun.BiSun, null);
      break;

    case 'perspectiveCamera':
    case 'orthographicCamera':
      icon = React__default.createElement(BsCameraVideoFill.BsCameraVideoFill, null);
  }

  var objectRef = React.useRef(object);
  React.useLayoutEffect(function () {
    objectRef.current = object;
  }, [object]);
  var dimensionless = ['spotLight', 'pointLight', 'directionalLight', 'perspectiveCamera', 'orthographicCamera'];

  var _useState = React.useState(false),
      hovered = _useState[0],
      setHovered = _useState[1];

  drei.useHelper.apply(void 0, [objectRef, selected === editableName || dimensionless.includes(editableType) || hovered ? Helper : null].concat(helperArgs));
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("group", {
    onClick: function onClick(e) {
      if (e.delta < 2) {
        e.stopPropagation();
        setSelected(editableName);
      }
    },
    onPointerOver: function onPointerOver(e) {
      e.stopPropagation();
      setHovered(true);
    },
    onPointerOut: function onPointerOut(e) {
      e.stopPropagation();
      setHovered(false);
    }
  }, React__default.createElement("primitive", {
    object: object
  }, showOverlayIcons && React__default.createElement(drei.Html, {
    center: true,
    className: "pointer-events-none p-1 rounded bg-white bg-opacity-70 shadow text-gray-700"
  }, icon), dimensionless.includes(editableType) && React__default.createElement(drei.Sphere, Object.assign({
    args: [2, 4, 2],
    onClick: function onClick(e) {
      if (e.delta < 2) {
        e.stopPropagation();
        setSelected(editableName);
      }
    },
    userData: {
      helper: true
    }
  }, {}), React__default.createElement("meshBasicMaterial", {
    visible: false
  })))));
};

var TransformControls = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var object = _ref.object,
      orbitControlsRef = _ref.orbitControlsRef,
      onObjectChange = _ref.onObjectChange,
      onDraggingChange = _ref.onDraggingChange,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "object", "orbitControlsRef", "onObjectChange", "onDraggingChange"]);

  var _useThree = reactThreeFiber.useThree(),
      camera = _useThree.camera,
      gl = _useThree.gl,
      invalidate = _useThree.invalidate;

  var controls = React.useMemo(function () {
    return new TransformControls$1.TransformControls(camera, gl.domElement);
  }, [camera, gl.domElement]);
  React.useLayoutEffect(function () {
    controls.attach(object);
    return function () {
      return void controls.detach();
    };
  }, [object, controls]);
  React.useEffect(function () {
    controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('change', invalidate);
    return function () {
      return controls == null ? void 0 : controls.removeEventListener == null ? void 0 : controls.removeEventListener('change', invalidate);
    };
  }, [controls, invalidate]);
  React.useEffect(function () {
    var callback = function callback(event) {
      if (orbitControlsRef && orbitControlsRef.current) {
        orbitControlsRef.current.enabled = !event.value;
      }
    };

    if (controls) {
      controls.addEventListener('dragging-changed', callback);
    }

    return function () {
      controls.removeEventListener('dragging-changed', callback);
    };
  }, [controls, orbitControlsRef]);
  React.useEffect(function () {
    if (onObjectChange) {
      controls.addEventListener('objectChange', onObjectChange);
    }

    return function () {
      if (onObjectChange) {
        controls.removeEventListener('objectChange', onObjectChange);
      }
    };
  }, [onObjectChange, controls]);
  React.useEffect(function () {
    if (onDraggingChange) {
      controls.addEventListener('dragging-changed', onDraggingChange);
    }

    return function () {
      if (onDraggingChange) {
        controls.removeEventListener('dragging-changed', onDraggingChange);
      }
    };
  }, [controls, onDraggingChange]);
  return React__default.createElement("primitive", Object.assign({
    dispose: null,
    object: controls,
    ref: ref
  }, props));
});

var ProxyManager = function ProxyManager(_ref) {
  var orbitControlsRef = _ref.orbitControlsRef;
  var isBeingEdited = React.useRef(false);

  var _useEditorStore = useEditorStore(function (state) {
    return [state.sceneSnapshot, state.selected, state.transformControlsMode, state.transformControlsSpace, state.viewportShading, state.setEditableTransform];
  }, shallow),
      sceneSnapshot = _useEditorStore[0],
      selected = _useEditorStore[1],
      transformControlsMode = _useEditorStore[2],
      transformControlsSpace = _useEditorStore[3],
      viewportShading = _useEditorStore[4],
      setEditableTransform = _useEditorStore[5];

  var sceneProxy = React.useMemo(function () {
    return sceneSnapshot == null ? void 0 : sceneSnapshot.clone();
  }, [sceneSnapshot]);

  var _useState = React.useState({}),
      editableProxies = _useState[0],
      setEditableProxies = _useState[1]; // set up scene proxies


  React.useLayoutEffect(function () {
    if (!sceneProxy) {
      return;
    }

    var editableProxies = {};
    sceneProxy.traverse(function (object) {
      if (object.userData.__editable) {
        // there are duplicate uniqueNames in the scene, only display one instance in the editor
        if (editableProxies[object.userData.__editableName]) {
          object.parent.remove(object);
        } else {
          editableProxies[object.userData.__editableName] = {
            portal: reactThreeFiber.createPortal(React__default.createElement(EditableProxy, {
              editableName: object.userData.__editableName,
              editableType: object.userData.__editableType,
              object: object
            }), object.parent),
            object: object
          };
        }
      }
    });
    setEditableProxies(editableProxies);
  }, [orbitControlsRef, sceneProxy]); // subscribe to external changes

  React.useEffect(function () {
    if (!selected) {
      return;
    }

    var unsub = useEditorStore.subscribe(function (transform) {
      if (isBeingEdited.current) {
        return;
      }

      var object = editableProxies[selected].object;
      transform.decompose(object.position, object.quaternion, object.scale);
    }, function (state) {
      return state.editables[selected].properties.transform;
    });
    return function () {
      return void unsub();
    };
  }, [editableProxies, selected]); // set up viewport shading modes

  var _useState2 = React.useState({}),
      renderMaterials = _useState2[0],
      setRenderMaterials = _useState2[1];

  React.useLayoutEffect(function () {
    if (!sceneProxy) {
      return;
    }

    var renderMaterials = {};
    sceneProxy.traverse(function (object) {
      var mesh = object;

      if (mesh.isMesh && !mesh.userData.helper) {
        renderMaterials[mesh.id] = mesh.material;
      }
    });
    setRenderMaterials(renderMaterials);
    return function () {
      Object.entries(renderMaterials).forEach(function (_ref2) {
        var id = _ref2[0],
            material = _ref2[1];
        sceneProxy.getObjectById(Number.parseInt(id)).material = material;
      });
    };
  }, [sceneProxy]);
  React.useLayoutEffect(function () {
    if (!sceneProxy) {
      return;
    }

    sceneProxy.traverse(function (object) {
      var mesh = object;

      if (mesh.isMesh && !mesh.userData.helper) {
        var material;

        switch (viewportShading) {
          case 'wireframe':
            mesh.material = new three.MeshBasicMaterial({
              wireframe: true,
              color: 'black'
            });
            break;

          case 'flat':
            // it is possible that renderMaterials hasn't updated yet
            if (!renderMaterials[mesh.id]) {
              return;
            }

            material = new three.MeshBasicMaterial();

            if (renderMaterials[mesh.id].hasOwnProperty('color')) {
              material.color = renderMaterials[mesh.id].color;
            }

            if (renderMaterials[mesh.id].hasOwnProperty('map')) {
              material.map = renderMaterials[mesh.id].map;
            }

            if (renderMaterials[mesh.id].hasOwnProperty('vertexColors')) {
              material.vertexColors = renderMaterials[mesh.id].vertexColors;
            }

            mesh.material = material;
            break;

          case 'solid':
            // it is possible that renderMaterials hasn't updated yet
            if (!renderMaterials[mesh.id]) {
              return;
            }

            material = new three.MeshPhongMaterial();

            if (renderMaterials[mesh.id].hasOwnProperty('color')) {
              material.color = renderMaterials[mesh.id].color;
            }

            if (renderMaterials[mesh.id].hasOwnProperty('map')) {
              material.map = renderMaterials[mesh.id].map;
            }

            if (renderMaterials[mesh.id].hasOwnProperty('vertexColors')) {
              material.vertexColors = renderMaterials[mesh.id].vertexColors;
            }

            mesh.material = material;
            break;

          case 'rendered':
            mesh.material = renderMaterials[mesh.id];
        }
      }
    });
  }, [viewportShading, renderMaterials, sceneProxy]);

  if (!sceneProxy) {
    return null;
  }

  return React__default.createElement(React__default.Fragment, null, React__default.createElement("primitive", {
    object: sceneProxy
  }), selected && React__default.createElement(TransformControls, {
    mode: transformControlsMode,
    space: transformControlsSpace,
    orbitControlsRef: orbitControlsRef,
    object: editableProxies[selected].object,
    onObjectChange: function onObjectChange() {
      setEditableTransform(selected, editableProxies[selected].object.matrix.clone());
    },
    onDraggingChange: function onDraggingChange(event) {
      return isBeingEdited.current = event.value;
    }
  }), Object.values(editableProxies).map(function (_ref3) {
    var portal = _ref3.portal;
    return portal;
  }));
};

var EditorScene = function EditorScene() {
  var orbitControlsRef = React.useRef();

  var _useThree = reactThreeFiber.useThree(),
      camera = _useThree.camera;

  var _useEditorStore = useEditorStore(function (state) {
    return [state.selectedHdr, state.useHdrAsBackground, state.showGrid, state.showAxes, state.setOrbitControlsRef];
  }, shallow),
      selectedHdr = _useEditorStore[0],
      useHdrAsBackground = _useEditorStore[1],
      showGrid = _useEditorStore[2],
      showAxes = _useEditorStore[3],
      setOrbitControlsRef = _useEditorStore[4];

  React.useEffect(function () {
    setOrbitControlsRef(orbitControlsRef);
  }, [camera, setOrbitControlsRef]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(React.Suspense, {
    fallback: null
  }, selectedHdr && React__default.createElement(drei.Environment // @ts-ignore
  , {
    // @ts-ignore
    files: selectedHdr,
    path: "",
    background: useHdrAsBackground
  })), showGrid && React__default.createElement("gridHelper", {
    args: [1000, 1000, 0x444444, 0x888888]
  }), showAxes && React__default.createElement("axesHelper", {
    args: [500]
  }), React__default.createElement("orbitControlsImpl", {
    ref: orbitControlsRef
  }), React__default.createElement(ProxyManager, {
    orbitControlsRef: orbitControlsRef
  }));
};

var Editor = function Editor() {
  var _useEditorStore2 = useEditorStore(function (state) {
    return [state.sceneSnapshot, state.editorOpen, state.initialState, state.setEditorOpen, state.setSelected, state.createSnapshot, state.isPersistedStateDifferentThanInitial, state.applyPersistedState];
  }, shallow),
      sceneSnapshot = _useEditorStore2[0],
      editorOpen = _useEditorStore2[1],
      initialState = _useEditorStore2[2],
      setEditorOpen = _useEditorStore2[3],
      setSelected = _useEditorStore2[4],
      createSnapshot = _useEditorStore2[5],
      isPersistedStateDifferentThanInitial = _useEditorStore2[6],
      applyPersistedState = _useEditorStore2[7];

  var _useState = React.useState(false),
      stateMismatch = _useState[0],
      setStateMismatch = _useState[1];

  React.useLayoutEffect(function () {
    if (initialState) {
      setStateMismatch(isPersistedStateDifferentThanInitial());
    } else {
      applyPersistedState();
    }
  }, [applyPersistedState, initialState, isPersistedStateDifferentThanInitial]);
  return React__default.createElement(root.div, null, React__default.createElement("div", {
    id: "react-three-editable-editor-root"
  }, React__default.createElement(PortalManager, null, React__default.createElement(reakit.unstable_IdProvider, null, React__default.createElement("div", {
    className: "relative z-50"
  }, React__default.createElement("div", {
    className: "fixed " + (editorOpen ? 'block' : 'hidden') + " inset-0"
  }, sceneSnapshot ? React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
    className: "relative z-0 h-full"
  }, React__default.createElement(reactThreeFiber.Canvas, {
    colorManagement: true,
    camera: {
      position: [20, 20, 20]
    },
    onCreated: function onCreated(_ref) {
      var gl = _ref.gl;
      gl.setClearColor('white');
    },
    shadowMap: true,
    pixelRatio: window.devicePixelRatio,
    onPointerMissed: function onPointerMissed() {
      return setSelected(null);
    }
  }, React__default.createElement(EditorScene, null))), React__default.createElement(UI, null)) : React__default.createElement("div", {
    className: "flex justify-center items-center bg-white h-screen"
  }, React__default.createElement("div", {
    className: "flex flex-col gap-5 items-center "
  }, React__default.createElement(Heading, {
    className: "text-2xl mb-4"
  }, "No canvas connected"), React__default.createElement("div", null, "Please use ", React__default.createElement(Code, null, "configure()"), " and", ' ', React__default.createElement(Code, null, "bind()"), " to connect a canvas to React Three Editable."), React__default.createElement(Code, {
    block: true
  }, "import React from 'react';\nimport { Canvas } from 'react-three-fiber';\nimport { configure, editable as e } from 'react-three-editable';\n\nconst bind = configure({\n  localStorageNamespace: \"MyProject\"\n});\n\nconst MyComponent = () => (\n  <Canvas onCreated={bind()}>\n    <e.mesh uniqueName=\"My First Editable Object\">\n      <sphereBufferGeometry />\n      <meshStandardMaterial color=\"rebeccapurple\" />\n    </e.mesh>\n  </Canvas>\n);"), React__default.createElement("div", null, "For more details, please consult the", ' ', React__default.createElement("a", {
    className: "rounded-md font-medium text-green-600 hover:text-green-500",
    href: "https://github.com/AndrewPrifer/react-three-editable",
    rel: "noreferrer",
    target: "_blank"
  }, "documentation"), "."), React__default.createElement(Button, {
    className: "",
    onClick: function onClick() {
      setEditorOpen(false);
    }
  }, "Close")))), editorOpen || React__default.createElement(Button, {
    className: "fixed bottom-5 left-5",
    onClick: function onClick() {
      if (!sceneSnapshot) {
        createSnapshot();
      }

      setEditorOpen(true);
    }
  }, "Editor")), React__default.createElement(Modal, {
    visible: stateMismatch
  }, React__default.createElement(ModalHeader, null, "Saved state found"), React__default.createElement(ModalBody, null, "Would you like to use initial state or saved state?"), React__default.createElement(ModalFooter, null, React__default.createElement(Button, {
    className: "flex-1",
    onClick: function onClick() {
      applyPersistedState();
      setStateMismatch(false);
    }
  }, "Saved"), React__default.createElement(Button, {
    className: "flex-1",
    onClick: function onClick() {
      setStateMismatch(false);
    }
  }, "Initial"))), React__default.createElement("style", {
    type: "text/css"
  }, css_248z)))));
};

var editable = function editable(Component, type) {
  return React.forwardRef(function (_ref, ref) {
    var uniqueName = _ref.uniqueName,
        position = _ref.position,
        rotation = _ref.rotation,
        scale = _ref.scale,
        props = _objectWithoutPropertiesLoose(_ref, ["uniqueName", "position", "rotation", "scale"]);

    var objectRef = React.useRef();

    var _useEditorStore = useEditorStore(function (state) {
      return [state.addEditable, state.removeEditable];
    }, shallow),
        addEditable = _useEditorStore[0],
        removeEditable = _useEditorStore[1];

    var transformDeps = [];
    ['x', 'y', 'z'].forEach(function (axis) {
      transformDeps.push(props["position-" + axis], props["rotation-" + axis], props["scale-" + axis]);
    });
    React.useLayoutEffect(function () {
      // calculate initial properties before adding the editable
      var pos = position ? _construct(three.Vector3, position) : new three.Vector3();
      var rot = rotation ? _construct(three.Vector3, rotation) : new three.Vector3();
      var scal = scale ? _construct(three.Vector3, scale) : new three.Vector3(1, 1, 1);
      ['x', 'y', 'z'].forEach(function (axis, index) {
        if (props["position-" + axis]) pos.setComponent(index, props["position-" + axis]);
        if (props["rotation-" + axis]) rot.setComponent(index, props["rotation-" + axis]);
        if (props["scale-" + axis]) scal.setComponent(index, props["scale-" + axis]);
      });
      var quaternion = new three.Quaternion().setFromEuler(new three.Euler().setFromVector3(rot));
      addEditable(type, uniqueName, {
        transform: new three.Matrix4().compose(pos, quaternion, scal)
      });
      return function () {
        removeEditable(uniqueName);
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addEditable, position, removeEditable, rotation, scale, uniqueName].concat(transformDeps));
    React.useLayoutEffect(function () {
      var object = objectRef.current; // source of truth is .position, .quaternion and .scale, not the matrix, so we have to do this instead of setting the matrix

      useEditorStore.getState().editables[uniqueName].properties.transform.decompose(object.position, object.quaternion, object.scale);
      var unsub = useEditorStore.subscribe(function (transform) {
        if (transform) {
          useEditorStore.getState().editables[uniqueName].properties.transform.decompose(object.position, object.quaternion, object.scale);
        }
      }, function (state) {
        return state.editables[uniqueName].properties.transform;
      });
      return function () {
        unsub();
      };
    }, [uniqueName]);
    return (// @ts-ignore
      React__default.createElement(Component, Object.assign({
        ref: mergeRefs([objectRef, ref])
      }, props, {
        userData: {
          __editable: true,
          __editableName: uniqueName,
          __editableType: type
        }
      }))
    );
  });
};

var createEditable = function createEditable(type) {
  return editable(type, type);
};

editable.group = /*#__PURE__*/createEditable('group');
editable.mesh = /*#__PURE__*/createEditable('mesh');
editable.spotLight = /*#__PURE__*/createEditable('spotLight');
editable.directionalLight = /*#__PURE__*/createEditable('directionalLight');
editable.pointLight = /*#__PURE__*/createEditable('pointLight');
editable.perspectiveCamera = /*#__PURE__*/createEditable('perspectiveCamera');
editable.orthographicCamera = /*#__PURE__*/createEditable('orthographicCamera');

{
  var editorRoot = /*#__PURE__*/document.createElement('div');
  document.body.appendChild(editorRoot);
  reactDom.render(React__default.createElement(Editor, null), editorRoot);
}

exports.configure = configure;
exports.editable = editable;
//# sourceMappingURL=react-three-editable.cjs.development.js.map
