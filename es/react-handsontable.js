import React from 'react';
import Handsontable from 'handsontable';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var SettingsMapper =
/*#__PURE__*/
function () {
  function SettingsMapper() {
    _classCallCheck(this, SettingsMapper);

    this.registeredHooks = Handsontable.hooks.getRegistered();
  }
  /**
   * Parse component settings into Handosntable-compatible settings.
   *
   * @param {Object} properties Object containing properties from the HotTable object.
   * @returns {Object} Handsontable-compatible settings object.
   */


  _createClass(SettingsMapper, [{
    key: "getSettings",
    value: function getSettings(properties) {
      var newSettings = {};

      if (properties.settings) {
        var settings = properties.settings;

        for (var key in settings) {
          if (settings.hasOwnProperty(key)) {
            newSettings[key] = settings[key];
          }
        }
      }

      for (var _key in properties) {
        if (_key !== 'settings' && properties.hasOwnProperty(_key)) {
          newSettings[_key] = properties[_key];
        }
      }

      return newSettings;
    }
  }]);

  return SettingsMapper;
}();

var version="3.0.0";

/**
 * A Handsontable-ReactJS wrapper.
 *
 * To implement, use the `HotTable` tag with properties corresponding to Handsontable options.
 * For example:
 *
 * ```js
 * <HotTable id="hot" data={dataObject} contextMenu={true} colHeaders={true} width={600} height={300} stretchH="all" />
 *
 * // is analogous to
 * let hot = new Handsontable(document.getElementById('hot'), {
 *    data: dataObject,
 *    contextMenu: true,
 *    colHeaders: true,
 *    width: 600
 *    height: 300
 * });
 *
 * ```
 *
 * @class HotTable
 */

var HotTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HotTable, _React$Component);

  function HotTable() {
    var _this;

    _classCallCheck(this, HotTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HotTable).apply(this, arguments));
    /**
     * Reference to the `SettingsMapper` instance.
     *
     * @type {SettingsMapper}
     */

    _this.settingsMapper = new SettingsMapper();
    /**
     * The `id` of the main Handsontable DOM element.
     *
     * @type {String}
     */

    _this.id = null;
    /**
     * Reference to the Handsontable instance.
     *
     * @type {Object}
     */

    _this.hotInstance = null;
    /**
     * Reference to the main Handsontable DOM element.
     *
     * @type {HTMLElement}
     */

    _this.hotElementRef = null;
    return _this;
  }

  _createClass(HotTable, [{
    key: "setHotElementRef",

    /**
     * Set the reference to the main Handsontable DOM element.
     *
     * @param {HTMLElement} element The main Handsontable DOM element.
     */
    value: function setHotElementRef(element) {
      this.hotElementRef = element;
    }
    /**
     * Initialize Handsontable after the component has mounted.
     */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var newSettings = this.settingsMapper.getSettings(this.props);
      this.hotInstance = new Handsontable(this.hotElementRef, newSettings);
    }
    /**
     * Call the `updateHot` method and prevent the component from re-rendering the instance.
     *
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {Boolean}
     */

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      this.updateHot(this.settingsMapper.getSettings(nextProps));
      return false;
    }
    /**
     * Destroy the Handsontable instance when the parent component unmounts.
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.hotInstance.destroy();
    }
    /**
     * Render the table.
     */

  }, {
    key: "render",
    value: function render() {
      this.id = this.props.id || 'hot-' + Math.random().toString(36).substring(5);
      this.className = this.props.className || '';
      this.style = this.props.style || {};
      return React.createElement("div", {
        ref: this.setHotElementRef.bind(this),
        id: this.id,
        className: this.className,
        style: this.style
      });
    }
    /**
     * Call the `updateSettings` method for the Handsontable instance.
     *
     * @param {Object} newSettings The settings object.
     */

  }, {
    key: "updateHot",
    value: function updateHot(newSettings) {
      if (JSON.stringify(newSettings) !== JSON.stringify(this.props.settings)) {
        this.hotInstance.updateSettings(newSettings, false);
      }
    }
  }], [{
    key: "version",
    get: function get() {
      return version;
    }
  }]);

  return HotTable;
}(React.Component);

export { HotTable };
