/**
 * 字符串前后去除空白
 *
 * @returns {string}
 */
String.prototype.trim = function () {
    return this.replace(/(^[\\s]*)|([\\s]*$)/g, "");
};

/**
 * 字符串前去除空白
 *
 * @returns {string}
 */
String.prototype.ltrim = function () {
    return this.replace(/(^[\\s]*)/g, "");
};

/**
 * 字符串后去除空白
 *
 * @returns {string}
 */
String.prototype.rtrim = function () {
    return this.replace(/([\\s]*$)/g, "");
};

/**
 * 字符串是否以某字符串开头
 *
 * @param str
 * @returns {boolean}
 */
String.prototype.startsWith = function (str) {
    if (!str || str.length > this.length) {
        return false;
    }

    return new RegExp("^" + str).test(this);
};

/**
 * 字符串是否以某字符串结尾
 *
 * @param str
 */
String.prototype.endsWith = function (str) {
    if (!str || str.length > this.length) {
        return false;
    }

    return new RegExp(str + "$").test(this);
};

/**
 * 左补全
 *
 * @param length
 * @param filler
 */
String.prototype.leftPad = function (length, filler) {
    return this._fillIfNeed(length, filler, true);
};

/**
 * 右补全
 *
 * @param length
 * @param filler
 */
String.prototype.rightPad = function (length, filler) {
    return this._fillIfNeed(length, filler, false);
};

String.prototype._fillIfNeed = function (length, filler, before) {
    var _filler = "";
    if (length <= this.length) {
        return this;
    }

    for (var i = 0, n = length - this.length; i < n; i += 1) {
        _filler += filler;
    }

    if (before) {
        return _filler + this;
    } else {
        return this + _filler;
    }
};

String.espMatcher = /&ensp;|&emsp;|&nbsp;|&lt;|&gt;|&amp;|&quot;|&copy;|&reg;|&times;|&divide;/gi;

String.prototype.replaceEscape = function () {
    return this.replace(String.espMatcher, "");
};

Array.prototype.contains = function (elem) {
    if (this.indexOf) {
        return this.indexOf(elem) >= 0;
    }

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] === elem) {
            return true;
        }
    }

    return false;

};

var ObjectUtil = {

    /**
     * 获取Object的属性，如果没有返回默认值
     *
     * @param obj
     * @param prop
     * @returns {*}
     */
    getProperty: function (obj, prop/*, defaultValue*/) {
        var defaultValue = arguments[2];

        if (!obj) {
            return defaultValue;
        }

        var result = obj[prop];
        if (result === undefined) {
            result = defaultValue;
        }

        return result;
    },

    copyProperty: function (target, source) {
        if (source) {
            ObjectUtil.each(source, function (prop, value) {
                target[prop] = value;
            });
        }
    },

    deepClone: function (obj) {
        var result = {};

        if (!obj) {
            return obj;
        }

        var _this = arguments.callee;

        ObjectUtil.each(obj, function (prop, value) {
            // 防止死循环
            if (obj === value) {
                return;
            }

            if (TypeUtil.isObject(value) || TypeUtil.isArray(value)) {
                result[prop] = _this(value);
            } else {
                result[prop] = value;
            }
        });

        return result;
    },

    isEmpty: function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    },

    each: function (obj, callback) {
        if (!obj) return;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                callback(prop, obj[prop]);
            }
        }
    }

};

var TypeUtil = {

    /**
     * 尝试调用可能不存在的function
     *
     * @param funcName
     */
    tryCall: function (funcName) {
        try {
            if (typeof (eval(funcName + "()")) == 'function') {
                return funcName();
            }
        } catch (e) {
            return null;
        }
    },

    /**
     * 判断是否是字符串
     *
     * @param value
     * @returns {Boolean}
     */
    isString: function (value) {
        return typeof (value) === "string";
    },

    /**
     * 判断是否是数字
     *
     * @param value
     * @returns {Boolean}
     */
    isNumber: function (value) {
        return Object.prototype.toString.call(value) === "[object Number]";
    },

    /**
     * 判断是否是布尔
     *
     * @param value
     * @returns {Boolean}
     */
    isBoolean: function (value) {
        return typeof value === "boolean";
    },

    /**
     * 转换成布尔值
     *
     * @param value
     */
    toBoolean: function (value) {
        return value ? true : false;
    },

    /**
     * 判断是否是数组
     *
     * @param value
     * @returns {Boolean}
     */
    isArray: function (value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    },

    /**
     * 判断是否是函数
     *
     * @param fn
     * @returns {Boolean}
     */
    isFunction: function (fn) {
        return !!fn && !fn.nodeName && fn.constructor != String && fn.constructor != RegExp && fn.constructor != Array
            && /function/i.test(fn + "");
    },

    /**
     * 判断是否是object
     *
     * @param obj
     * @returns {Boolean}
     */
    isObject: function (obj) {
        return typeof (obj) === 'object';
    },

    /**
     * 判断是否JQuery对象
     *
     * @param obj
     * @returns {Boolean}
     */
    isJQueryObject: function (obj) {
        return obj instanceof jQuery;
    },

    /**
     * 是不是没有值，可以是0,"",false
     *
     * @param obj
     */
    isNone: function (obj) {
        return !obj && (obj === undefined || obj === null || isNaN(obj));
    },

    /**
     * 函数是否包含参数
     *
     * @param args
     * @returns {Boolean}
     */
    hasArguments: function (args) {
        return args.length;
    },

    apply: function (obj, Parent, args) {
        if (!obj._clazz) {
            obj._clazz = obj.constructor;
        }

        if (!obj._parents) {
            obj._parents = [];
        }

        obj._parents.push(Parent);

        Parent.apply(obj, args);
    },

    /**
     * 让Child类继承Parent类
     *
     * @param Child
     * @param Parent
     */
    extend: function (Child, Parent) {
        var F = function () {
        };

        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
    },

    /**
     *
     * @param result
     */
    judgeResult: function (result) {
        if (result.length === 0) {
            return undefined;
        }

        if (result.length === 1) {
            return result[0];
        }

        return result;
    },

    /**
     * 用定期'中断'的方式来执行
     * @param items
     * @param func
     */
    process: function (items, func /*, callback*/) {
        var i = 0;

        var callback = arguments[2];

        (function () {
            var st = +new Date();
            for (; i < items.length; i++) {
                if ((+new Date()) - st < 100) {
                    func(items[i], i);
                } else {
                    setTimeout(arguments.callee, 0);
                    return;
                }
            }

            if (callback) {
                callback();
            }
        })();
    }

};

var HtmlUtil = {

    genId: function () {
        return Math.floor(Math.random() * 1000) + "-" + new Date().getTime();
    },

    /**
     * 是否页面有给定ID的元素
     *
     * @param id
     * @returns {boolean}
     */
    hasElement: function (id) {
        return document.getElementById(id) ? true : false;
    },

    isIE6To8: function () {
        return !-[1,];
    },

    addClass: function (tag, clazz) {
        if (!tag.hasClass(clazz)) {
            tag.addClass(clazz);
        }
    }

};

HtmlUtil.createTagIfNeeded = function (name, selector /*, attributes, parent*/) {
    var tag = $(selector);

    if (tag.length > 0) {
        return tag;
    }

    return HtmlUtil.createTag(name, arguments[2], arguments[3]);
};

HtmlUtil.createTag = function (name /*, attributes, parent*/) {
    var tag = $('<' + name + '/>');

    var attributes = arguments.length > 1 ? arguments[1] : null;
    var parent = arguments.length > 2 ? arguments[2] : null;

    if (TypeUtil.isJQueryObject(attributes)) {
        parent = attributes;
        attributes = null;
    }

    if (!parent) {
        parent = $(document.body);
    }

    ObjectUtil.each(attributes, function (prop, value) {
        tag.attr(prop, value);
    });

    parent.append(tag);

    return tag;
};

// 获取当前JS路径
if (typeof(_CURRENT_FOLDER_ ) == 'undefined') {
    _CURRENT_FOLDER_ = {};
}
var _SCRIPTS_ = document['scripts'];
_CURRENT_FOLDER_['orange'] = _SCRIPTS_[_SCRIPTS_.length - 1].src.substring(0, _SCRIPTS_[_SCRIPTS_.length - 1].src.lastIndexOf("/") + 1);

/**
 * Widget基类
 *
 * 其中htmlObj为一个jquery对象。
 *
 * new OwWidget(htmlObj, options);会初始化一个Orange Widget，并且保存初始化时的选项。
 * 第二次就可以不提供options来初始化一个Widget了，此时初始化选项可以读回。
 * 但是要注意，如果提供的htmlObj代表了多个OrangeWidget，除非选项相同，不然会出现最后一个Widget的选项覆盖前面的问题。
 * 所以当使用第二次初始化OwWidget并且htmlObj代表多个对象的时候，要确保初始化选项一致，不然可能会出现潜在的问题。
 * 重要的属性用this.key来赋值，确保能再次读取到
 */
function OwWidget(htmlObj/*, initOptions, init*/) {
    if (!TypeUtil.hasArguments(arguments)) {
        throw new Error('html object must not be null');
    }

    if (!TypeUtil.isJQueryObject(htmlObj)) htmlObj = $(htmlObj);
    if (htmlObj.length === 0) throw new Error('html object matches none elements');

    var initOptions = arguments[1], init = arguments[2];

    if (TypeUtil.isBoolean(initOptions)) {
        init = initOptions;
        initOptions = {};
    }

    init = (init === undefined) ? false : init;
    initOptions = initOptions ? initOptions : {};

    this.htmlObj = htmlObj;

    // 判断OwWidget是否初始化只会判断第一个对象
    if (!init) {
        if (!htmlObj[0].init) {
            // 如果没有初始化，那么这次调用强制变为初始化操作
            init = true;
        }
    }

    if (!init) {
        var widget = OwWidget.prototype._restoreWidget.apply(this, arguments);

        if (widget) {
            return widget;
        }

        // 读取初始化选项
        return this._loadInitOptions();
    }

    // 保存初始化选项
    this._saveInitOptions(initOptions);

    this.htmlObj.addClass('ow-widget');

    // 调用抽象函数init
    this.init();
}

OwWidget.prototype._restoreWidget = function () {
    if (this._clazz) {// 从实现类初始化，跳过
        return null;
    }

    return new (this.htmlObj[0]._clazz)(arguments[0], arguments[1], arguments[2]);
};

OwWidget.prototype._loadInitOptions = function () {
    var self = this;

    this.htmlObj.each(function () {
        if (this.initOptions) {
            self.initOptions = jQuery.extend(true, {}, this.initOptions);
            return false;
        }
    });

    this.htmlObj.each(function () {
        for (var attr in this._key) {
            if (!this._key.hasOwnProperty(attr)) {
                continue;
            }
            var value = this._key[attr];
            if (this._key === value) {
                continue;
            }

            self[attr] = value;
        }

    });
};

OwWidget.prototype._saveInitOptions = function (initOptions) {
    initOptions = initOptions || {};

    var self = this;

    this.initOptions = jQuery.extend(true, {}, initOptions);

    this.htmlObj.each(function () {
        this.initOptions = self.initOptions;
        this.init = true;
        this._key = {};
        this._clazz = self._clazz;
        this._parents = self._parents;
    });
};

OwWidget.prototype.key = function (prop, value) {
    this[prop] = value;
    this.htmlObj.each(function () {
        this._key[prop] = value;
    });

    return value;
};

/**
 * 以原始对象的形式读取属性
 *
 * @param name
 * @returns {*}
 */
OwWidget.prototype.option = function (name /* , defaultValue, validValues*/) {
    return this.initOptions[name] = OwWidget.prototype._option.apply(this, arguments);
};

OwWidget.prototype._option = function (name /* , defaultValue, validValues*/) {
    var defaultValue = arguments[1], validValues = arguments[2];
    if (TypeUtil.isArray(defaultValue)) {
        validValues = defaultValue;
        defaultValue = undefined;
    }

    if (!TypeUtil.isNone(validValues) && !TypeUtil.isArray(validValues)) {
        validValues = [validValues];
    }

    var value = ObjectUtil.getProperty(this.initOptions, name);

    if (TypeUtil.isNone(value)) {
        value = this.htmlObj.attr(name);
    }

    if (TypeUtil.isNone(value) && !TypeUtil.isNone(defaultValue)) {
        value = defaultValue
    }

    if (TypeUtil.isNone(value)) {
        return value;
    }

    if (validValues) {
        if (!validValues.contains(value)) {
            value = defaultValue;
        }
    }

    return value;
};

/**
 * 以字符串的形式读取属性
 *
 * @param name
 * @returns {*}
 */
OwWidget.prototype.stringOption = function (name /* , defaultValue, validValues */) {
    var value = OwWidget.prototype._option.apply(this, arguments);
    if (TypeUtil.isNone(value)) {
        return value;
    }

    return this.initOptions[name] = TypeUtil.isString(value) ? value : value.toString();
};

/**
 * 以布尔的形式读取属性
 *
 * @param name
 * @returns {*}
 */
OwWidget.prototype.booleanOption = function (name /* , defaultValue */) {
    return this.initOptions[name] = OwWidget.prototype._booleanOption.apply(this, arguments);
};

OwWidget.prototype._booleanOption = function (name /* , defaultValue */) {
    if (arguments.length > 2 || TypeUtil.isArray(arguments[1])) {
        throw new Error('there are only two valid value in boolean options: true/false');
    }

    if (arguments.length == 2 && arguments[1] !== true && arguments[1] !== false) {
        throw new Error('invalid default value');
    }

    var value = OwWidget.prototype._option.apply(this, arguments);

    if (!value) {
        return false;
    }

    value = TypeUtil.isString(value) ? value.toLowerCase() : value;

    if (TypeUtil.isNumber(value)) {
        return value !== 0;
    }

    if (TypeUtil.isBoolean(value)) {
        return value;
    }

    return ['true', 'y'].contains(value);
};

/**
 * 以数字的形式读取属性
 *
 * @param name
 * @returns {*}
 */
OwWidget.prototype.numberOption = function (name /* , defaultValue, validValues */) {
    var value = +OwWidget.prototype._option.apply(this, arguments);
    if (isNaN(value)) {
        this.initOptions[name] = undefined;
    }

    return this.initOptions[name] = value;
};

/**
 * 返回function
 *
 * @param name
 */
OwWidget.prototype.functionOption = function (name /* , defaultValue */) {
    if (arguments.length == 2 && !TypeUtil.isFunction(arguments[1])) {
        throw new Error('invalid default value');
    }

    // 不再推荐使用eval的方式执行函数，所以返回值必须是function类型，不然就返回undefined
    var value = this._option(name, arguments[1]);

    return this.initOptions[name] = TypeUtil.isFunction(value) ? value : undefined;
};

/**
 * 设置事件回调
 *
 * @param event
 * @param cb
 * @returns {function(this:*)|*}
 */
OwWidget.prototype.on = function (event, cb) {
    return this.htmlObj.bind(event, cb);
};

/**
 * 发送事件
 *
 * @param event
 * @param data
 */
OwWidget.prototype.emit = function (event, data) {
    this.htmlObj.trigger(event, data);
};

/**
 * 初始化方法，所有子类都要实现
 */
OwWidget.prototype.init = function () {
    throw new Error('all orange widget must override init');
};

/**
 * 将控件禁用
 *
 * @param enabled
 */
OwWidget.prototype.setEnabled = function (enabled) {
    enabled ? this.htmlObj.removeAttr('disabled') : this.htmlObj.attr('disabled', 'disabled');
};

/**
 * --------------------------------------------------------------------------------------
 * 弹出框(非模态)
 * --------------------------------------------------------------------------------------
 * @param htmlObj
 * @constructor
 */
function OwPopover(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwWidget, arguments);
}
TypeUtil.extend(OwPopover, OwWidget);

OwPopover.counter = 0;

OwPopover.prototype.init = function () {
    var height = this.numberOption('height'),
        width = this.numberOption('width'),
        backdrop = this.booleanOption('backdrop', true),
        keyboard = this.booleanOption('keyboard', true),
        self = this;

    if (height) this.htmlObj.css('height', height + 'px');
    if (width) this.htmlObj.css('width', width + 'px');

    this.htmlObj.addClass('ow-popover ow-popover-dropdown dropdown-menu');
    this.htmlObj.css('z-index', 1050 + (OwPopover.counter++) + "");

    if (backdrop) {
        var excludes = [];
        excludes.push(this.htmlObj);

        if (!TypeUtil.isBoolean(backdrop)) {
            excludes.push(backdrop);
        }

        var cb = function (e) {
            var f = true;
            $.each(excludes, function (i) {
                if (excludes[i].has(e.target).length || excludes[i].is(e.target)) {
                    f = false;
                }
            });

            if (f) self.hide();
        };

        $(document.body).on('click', cb).on('contextmenu', cb);
    }

    // ESC 关闭
    if (keyboard) {
        $(document).keyup(function (event) {
            switch (event.keyCode) {
                case 27:
                    self.hide(false);
            }
        });
    }
};

OwPopover.prototype.toggle = function (point) {
    this.htmlObj.is(":hidden") ? this.show(point) : this.hide();
};

OwPopover.prototype.show = function (point/* , preventEvent */) {
    var preventEvent = arguments[1];

    if (!this.isHidden()) {
        return;
    }

    if (!preventEvent) {
        this.emit('before.show');
    }

    this.htmlObj.css('left', point.left);
    this.htmlObj.css('top', point.top);
    this.htmlObj.show();

    if (!preventEvent) {
        this.emit('after.show');
    }
};

OwPopover.prototype.hide = function (/* preventEvent */) {
    var preventEvent = arguments[0];

    if (this.isHidden()) {
        return;
    }

    if (!preventEvent) {
        this.emit('before.hide');
    }

    this.htmlObj.hide();

    if (!preventEvent) {
        this.emit('after.hide');
    }
};

OwPopover.prototype.isHidden = function () {
    return this.htmlObj.is(':hidden');
};

OwPopover.prototype.html = function () {
    return TypeUtil.hasArguments(arguments) ? this.htmlObj.html(arguments[0]) : this.htmlObj.html();
};

/**
 * --------------------------------------------------------------------------------------
 * 分页
 * --------------------------------------------------------------------------------------
 * 可用参数
 * uri 每个分页的URI，用于分页的参数用%page%代替
 * on-page 点击页面回调 [function]
 * simple 是否使用简易模式(只显示上下页) [boolean, false(default)]
 * pages 总页数 [number]
 * current 当前页 [number]
 *
 * @param htmlObj
 * @constructor
 */
function OwPagination(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwWidget, arguments);
}
TypeUtil.extend(OwPagination, OwWidget);

OwPagination.prototype.init = function () {
    this.uri = this.key('uri', this.stringOption('uri'));
    this.onPage = this.key('onPage', this.functionOption('on-page'));
    this.simple = this.key('simple', this.booleanOption('simple', false));

    this._init(this.numberOption('pages', 1), this.numberOption('current', 1));
};

OwPagination.prototype._init = function (/*pages, current*/) {
    this.pages = arguments[0] ? this.key('pages', arguments[0]) : this.key('pages', 1);
    this.current = arguments[1] ? this.key('current', arguments[1]) : this.key('current', 1);

    var html = new EJS({url: _CURRENT_FOLDER_['orange'] + 'template/pagination.ejs'}).render({
        pages: this.pages,
        current: this.current,
        simple: this.simple
    });
    this.htmlObj.html(html);

    var onPage = this.onPage;
    var uri = this.uri;
    var self = this;

    this.htmlObj.find('li[p]').unbind('click').click(function () {
        var current = parseInt($(this).attr('p'));
        if (onPage) {
            onPage(current);
        }

        if (uri) {
            window.location.href = uri.replace('%page%', current + "");
            return;
        }

        self._init(self.pages, current);
    });
};

OwPagination.prototype.reset = function (/*pages, current*/) {
    this._init(arguments[0], arguments[1]);
};

OwPagination.prototype.limit = function (pages) {
    if (typeof pages === 'undefined' || !TypeUtil.isNumber(pages)) {
        throw new Error('pages must be a number');
    }

    this.key('pages', pages);
    this._init(this.pages, this.current);
};

OwPagination.prototype.extend = function () {
    this.key('pages', this.pages + 1);
};


/**
 * --------------------------------------------------------------------------------------
 * 树型
 * --------------------------------------------------------------------------------------
 *
 * @param htmlObj
 * @constructor
 */
function OwTreeView(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwWidget, arguments);
}
TypeUtil.extend(OwTreeView, OwWidget);

OwTreeView.prototype.init = function () {
    this.filter = this.key('filter', this.booleanOption('filter', false));

    this._initTree();
};

/**
 * 初始化树
 *
 * @returns {*}
 * @private
 */
OwTreeView.prototype._initTree = function () {
    var format = this.stringOption('format', 'ajax-json'),// 数据格式
        data = this.stringOption('data'),// 数据
        checkbox = this.checkbox = this.key('checkbox', this.booleanOption('checkbox', false)),// 是否显示勾选框
        onLoaded = this.functionOption('after-loaded'),// 载入完成回调
        onSelect = this.functionOption('after-select'),// 选中回调
        selectable = this.option('selectable'),// 节点是否可以被选中，可以是一个函数，参数是node，container，可以是字符串leaf, all
        onDblClick = this.functionOption('after-dblclick'),// 双击回调
        search = this.option('search', false),
        container = this.htmlObj, self = this;

    var options = {
        'core': {
            'themes': {
                'name': 'proton',
                'responsive': true
            }
        }
    };

    switch (format) {
        case 'json':
            if (!data) {
                throw new Error('data must not be null');
            }
            options.core.data = JSON.parse(data);
            break;
        case 'html':
            break;
        case 'custom':
            options.core.data = data;
            break;
        case 'ajax-json':
        default:
            options.core.data = {
                'url': data,
                'dataType': 'json'
            };
    }

    this.model = this.key('model', []);

    // 利用model.jstree回调记录所有加入到jstree的数据
    this.htmlObj.on('model.jstree', function (e, data) {
        if (data.nodes) {
            self.model = self.model.concat(data.nodes);
        }
    });

    // 插件初始化
    options.plugins = [];

    // 多选不响应select和dblclick
    if (checkbox) {
        options.checkbox = {tie_selection: false};
        options.plugins.push('checkbox');
    } else {
        if (selectable) {
            if (selectable === 'leaf') {
                // 只能选择叶子节点
                selectable = function (node, container) {
                    var tree = container.jstree(true);
                    return !tree.is_parent(node)
                };
            } else if (!TypeUtil.isFunction(selectable)) {
                selectable = null;
            }
        }

        this.htmlObj.on('select_node.jstree', function (e, data) {
            if (selectable) {
                if (!selectable(data.node, container)) {
                    var tree = container.jstree(true);
                    tree.deselect_node(data.node, true);
                    return;
                }
            }

            if (onSelect) {
                onSelect(data.node, container);
            }
        });

        this.htmlObj.on('dblclick.jstree', function (e, data) {
            var tree = container.jstree(true);
            var node = tree.get_node(e.target);
            if (!tree.is_selected(node)) {
                return;
            }

            if (onDblClick) {
                onDblClick(node, container);
            }

        });
    }

    if (search) {
        options.plugins.push('search');

        if (TypeUtil.isObject(search)) {
            options.search = {};

            if (search.callback) {
                options.search.search_callback = search.callback;
            }

            options.search.show_only_matches = search.show_only_matches ? true : false;
        }
    }

    this.htmlObj.on('ready.jstree', function (e, data) {
        if (onLoaded) {
            onLoaded(container);
        }
    });

    return this.tree = this.htmlObj.jstree(options);
};

/**
 * 获取选中的节点
 */
OwTreeView.prototype.getSelected = function (/* full */) {
    var full = arguments[0] ? true : false,
        tree = this.htmlObj.jstree(true);

    return this.checkbox ? tree.get_checked(full) : tree.get_selected(full);
};

/**
 * 获取选中的节点
 */
OwTreeView.prototype.setSelected = function (node/*, selected*/) {
    var tree = this.htmlObj.jstree(true);
    var selected = arguments.length === 1 ? true : (arguments[1] ? true : false);

    return this.checkbox
        ? (selected ? tree.check_node(node) : tree.uncheck_node(node))
        : (selected ? tree.select_node(node) : tree.deselect_node(node));
};

OwTreeView.prototype.selectAll = function (/* selected */) {
    var tree = this.htmlObj.jstree(true);
    var selected = arguments.length === 0 ? true : (arguments[1] ? true : false);

    return this.checkbox
        ? (selected ? tree.check_all() : tree.uncheck_all())
        : (selected ? tree.select_all() : tree.deselect_all());
};

/**
 * 返回实现的jstree树对象
 */
OwTreeView.prototype.underline = function (/* full */) {
    return this.htmlObj.jstree(true);
};

OwTreeView.prototype.dataModel = function () {
    return this.model;
};

var OwFlash = {

    /**
     * 信息提示框
     *
     * @param text
     */
    info: function (text/* , countdown */) {
        this.show({
            name: "ow-info-flash",
            text: text,
            title: "提示",
            style: "alert-info",
            countdown: arguments[1]
        });
    },

    /**
     * 确认提示框
     *
     * @param text
     * @param callback
     */
    confirm: function (text, callback) {
        this.show({
            name: "ow-confirm-flash",
            text: text,
            title: "确认",
            style: "alert-warning",
            buttons: [
                {
                    button: "<button type='button' class='btn btn-success ow-btn-sm' data-dismiss='modal'>确定</button>",
                    callback: function () {
                        callback();
                    }
                },
                {
                    button: "<button type='button' class='btn btn-default ow-btn-sm' data-dismiss='modal'>关闭</button>",
                    callback: function () {
                        $("#ow-confirm-flash").modal("hide");
                    }
                }
            ],
            countdown: false
        });
    },

    /**
     * 成功提示框
     *
     * @param text
     */
    success: function (text/*, countdown*/) {
        this.show({
            name: "ow-success-dialog",
            text: text,
            title: "成功",
            style: "alert-success",
            countdown: arguments[1]
        });
    },

    /**
     * 错误提示框
     *
     * @param text
     */
    failure: function (text/*, countdown*/) {
        this.show({
            name: "ow-danger-dialog",
            text: text,
            title: "错误",
            style: "alert-danger",
            countdown: TypeUtil.isNone(arguments[1]) ? false : TypeUtil.toBoolean(arguments[1])
        });
    },

    /**
     * 显示Flash
     *
     */
    show: function (/* options */) {
        var options = arguments[0] || {},
            name = options.name || 'ow_flash',
            buttons = options.buttons || [],
            countdown = TypeUtil.isNone(options.countdown) ? true : TypeUtil.toBoolean(options.countdown);

        if (OwDialog.wrap(name)) {
            var content = "<div class='alert " + options.style + "'>" +
                "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
                "<h4>" + options.title + "</h4>" +
                "<p id='" + name + "-text' class='ow-hint-content'></p>" +
                "<p id='" + name + "-buttons' class='ow-hint-buttons'></p>" +
                "</div>";

            $("#" + name + "-content").html(content);
        }

        $("#" + name + "-text").html(options.text);
        $("#" + name + "-buttons").html("");

        if (buttons.length === 0) {
            var callback = function () {
                $("#" + name).modal("hide");
            };

            var button = $('#' + name + '-close-btn');
            if (button.length === 0) {
                button = $('<button id="' + name + '-close-btn" class="btn btn-default">关闭</button>');
            }

            if (countdown) {
                var timeout = options['timeout'] || 3;

                button.owCountDownButton({
                    'timeout': timeout,
                    'callback': callback
                });
            }

            buttons.push({
                'button': button,
                'callback': callback
            });
        }

        ObjectUtil.each(buttons, function (index, btn) {
            var button = $(btn.button);
            $("#" + name + "-buttons").append(button);

            var callback = btn.callback;

            if (callback) {
                if (!TypeUtil.isJQueryObject(button)) {
                    button = $(button);
                }

                button.each(function () {
                    button.callback = callback;
                });

                button.click(function () {
                    (button.callback)();
                });
            }
        });

        $("#" + name).modal("show");

    }

};

var OwDialog = {

    wrap: function (id) {
        var dialog;

        if (!HtmlUtil.hasElement(id)) {
            dialog = HtmlUtil.createTag('div', {'id': id});
        } else {
            dialog = $('#' + id);
            if (dialog.hasClass('modal')) {
                return false;
            }
        }

        dialog.attrs({
            'class': 'modal',
            'tabindex': '-1',
            'role': 'dialog',
            'aria-labelledby': id + '-label',
            'aria-hidden': 'true'
        });

        if (!HtmlUtil.isIE6To8()) {
            dialog.addClass("fade");
        }

        if (!dialog.html() || dialog.html().trim() === "") {
            dialog.append('<div id="' + id + '-content" class="modal-dialog"></div>');
        }

        return true;
    }
};

/**
 * --------------------------------------------------------------------------------------
 * 可录值控件
 * --------------------------------------------------------------------------------------
 * @param htmlObj
 * @constructor
 */
function OwFormControl(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwWidget, arguments);
}
TypeUtil.extend(OwFormControl, OwWidget);

/**
 * 所有表单控件都要实现value函数，用于返回值
 */
OwFormControl.prototype.value = function () {
    throw new Error('all orange form control widget must override getValue');
};

/**
 * --------------------------------------------------------------------------------------
 * checkbox && radio
 * --------------------------------------------------------------------------------------
 * @param htmlObj
 * @constructor
 */
function OwCheck(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwFormControl, arguments);
}
TypeUtil.extend(OwCheck, OwFormControl);

OwCheck.prototype.init = function () {
    this.htmlObj.iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: "20%"
    });
};

/**
 * 查看选中状态
 */
OwCheck.prototype.isChecked = function () {
    return this.htmlObj.parents('div:first').hasClass('checked');
};

/**
 * 设置是否选中
 *
 * @param checked [boolean]
 */
OwCheck.prototype.setChecked = function (checked) {
    this.htmlObj.iCheck(checked === true ? 'check' : 'uncheck');
};

/**
 * 设置是否可用
 *
 * @param enabled [boolean]
 */
OwCheck.prototype.setEnabled = function (enabled) {
    this.htmlObj.iCheck(enabled === true ? 'enable' : 'disable');
};

/**
 * 切换选中状态
 */
OwCheck.prototype.toggle = function () {
    this.htmlObj.iCheck('toggle');
};

/**
 * 销毁控件
 */
OwCheck.prototype.destroy = function () {
    this.htmlObj.iCheck('destroy');
};

/**
 * 更新控件
 */
OwCheck.prototype.update = function () {
    this.htmlObj.iCheck('update');
};

/**
 * 触发事件，重写OwWidget的on函数
 *
 * 事件包括 ifClicked, ifChanged, ifChecked, ifUnchecked, ifDisabled, ifEnabled, ifCreated, ifDestroyed
 *
 * @param event
 * @param cb
 */
OwCheck.prototype.on = function (event, cb) {
    // 分成两组，iCheck的内置事件和用户自定义事件
    OwCheck.events.contains(event) ? this.htmlObj.on(event, cb) : OwWidget.prototype.on.apply(this, arguments);
};

OwCheck.events = ['ifClicked', 'ifChanged', 'ifChecked', 'ifUnchecked', 'ifDisabled', 'ifEnabled', 'ifCreated', 'ifDestroyed'];

/**
 * 所有表单控件都要实现value函数，用于返回值
 */
OwCheck.prototype.value = function () {
    return this.isChecked();
};

/**
 * 获取当前checkbox组选中的value
 */
OwCheck.prototype.getGroupCheckedValue = function () {
    var result = new Array();
    $.each(this.htmlObj, function () {
        if (this.checked)
            result.push(this.value);
    });
    return TypeUtil.judgeResult(result);
};

/**
 * --------------------------------------------------------------------------------------
 * 日期输入框
 * --------------------------------------------------------------------------------------
 * 可用参数:
 * data-date-format 日期格式，比如yyyy-mm-dd hh:ii
 *
 * @param htmlObj
 * @constructor
 */
function OwDateInput(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwFormControl, arguments);
}
TypeUtil.extend(OwDateInput, OwFormControl);

OwDateInput.VIEW = {
    YEAR: 4,
    MONTH: 3,
    DAY: 2,
    HOUR: 1,
    MINUTE: 0,
    SECOND: -1
};

OwDateInput.prototype.init = function () {
    var options = {
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: true,
        autoclose: true,
        todayHighlight: true,
        forceParse: false,
        pickerPosition: "bottom-left"
    };

    switch (this.stringOption('data-date-format', 'yyyy-mm-dd')) {
        case 'yyyy':
            options.startView = OwDateInput.VIEW.YEAR;
            options.minView = OwDateInput.VIEW.YEAR;
            break;
        case 'yyyy-mm':
            options.startView = OwDateInput.VIEW.YEAR;
            options.minView = OwDateInput.VIEW.MONTH;
            break;
        case 'yyyy-mm-dd':
            options.startView = OwDateInput.VIEW.DAY;
            options.minView = OwDateInput.VIEW.DAY;
            break;
        case 'yyyy-mm-dd hh':
            options.startView = OwDateInput.VIEW.DAY;
            options.minView = OwDateInput.VIEW.HOUR;
            break;
        case 'yyyy-mm-dd hh:ii':
            options.startView = OwDateInput.VIEW.DAY;
            options.minView = OwDateInput.VIEW.MINUTE;
            break;
    }

    this.htmlObj.datetimepicker(options);

    var htmlObj = this.htmlObj;

    // 控件禁用处理
    this.htmlObj.datetimepicker().on('show', function () {
        if (htmlObj.attr('disabled')) {
            htmlObj.datetimepicker('hide');
        }
    });
};

OwDateInput.prototype.value = function () {
    return this.htmlObj.is('input') ? this.htmlObj.val() : this.htmlObj.find('input').val();
};

/**
 * --------------------------------------------------------------------------------------
 * 参照输入
 * --------------------------------------------------------------------------------------
 * 可用参数:
 * focus-ref 可通过focus事件触发参照弹出的控件 [string, jquery selector]
 * click-ref 可通过click事件触发参照弹出的控件 [string, jquery selector]
 * backdrop 是否可以点击任意处关闭 [boolean]
 * width 参照框宽度 [number]
 * height 参照框高度 [number]
 *
 * @param htmlObj
 * @constructor
 */
function OwRefInput(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwFormControl, arguments);
}
TypeUtil.extend(OwRefInput, OwFormControl);

OwRefInput.prototype.init = function () {
    var focus = this.stringOption('focus-ref', '.focus-ref'),
        click = this.stringOption('click-ref', '.click-ref');

    this.focusRef = this.key('focusRef', this.htmlObj.find(focus));
    this.clickRef = this.key('clickRef', this.htmlObj.find(click));

    if (this.focusRef.length === 0) {
        throw new Error('ref dialog trigger must be specified');
    }

    // STEP 1. 初始化popover
    this.popover = this._buildPopover();

    // STEP 2. 绑定事件
    this._bindRefActions();

    // STEP 3. 初始化控件
    var refObj = this.initRef(this.initPopover());

    var self = this;

    if (this.popover && this.popover.on) {
        if (TypeUtil.isFunction(this.popoverOptions['before-show'])) {
            this.popover.on('before.show', function () {
                (self.popoverOptions['before-show'])(refObj);
            });
        }

        this.popover.on('before.hide', function () {
            self.onDismiss(refObj);
        });

        this.popover.on('after.show', function () {
            if (self.htmlObj.attr('disabled')) {
                self.popover.hide();
            }
        });
    }
};

OwRefInput.prototype._buildPopover = function () {
    var option = this.popoverOptions = this.option('popover') || {};
    option.width = TypeUtil.isNumber(option.width) ? option.width : 200;
    option.height = TypeUtil.isNumber(option.height) ? option.height : 300;
    option.backdrop = TypeUtil.isBoolean(option.backdrop) ? option.backdrop : true;
    option.keyboard = TypeUtil.isBoolean(option.keyboard) ? option.keyboard : true;

    var dialog = $('<div></div>');
    $(document.body).append(dialog);

    return new OwPopover(dialog, option);
};

OwRefInput.prototype._bindRefActions = function () {
    var self = this;

    var focusRef = this.focusRef;

    if (focusRef.length !== 0) {
        focusRef.focus(function () {
            if (self.popover.isHidden()) {
                focusRef.focusing = true;
                focusRef.click();
            } else {
                focusRef.refocus = true;
            }
        });

        focusRef.click(function (e) {
            if (focusRef.is(':focus') && !focusRef.focusing && !focusRef.refocus) {
                self.popover.toggle(self._calculatePoint());
            }

            focusRef.focusing = false;
            focusRef.refocus = false;

            // 防止将事件传播到
            e.preventDefault();
            e.stopPropagation();
        });
    }

    var clickRef = this.clickRef;

    if (clickRef.length !== 0) {
        clickRef.click(function (e) {
            self.popover.toggle(self._calculatePoint());

            e.preventDefault();
            e.stopPropagation();
        });
    }

};

/**
 * 计算popover的弹出点
 *
 * @returns {{top: *, left: *}}
 * @private
 */
OwRefInput.prototype._calculatePoint = function () {
    var focusRef = this.focusRef,
        clickRef = this.clickRef,

        top = this.htmlObj.offset().top + 8,
        left;

    if (clickRef.length === 0) {
        left = focusRef.offset().left + focusRef.width() - this.popover.htmlObj.width() + 8;
    } else {
        left = clickRef.offset().left + clickRef.width() - this.popover.htmlObj.width() + 8;
    }

    return {top: top, left: left};
};

/**
 * 子类可以继承这个函数来初始化popover，默认是为popover设置一个可以显示滚动条的div
 */
OwRefInput.prototype.initPopover = function () {
    var options = this._showOptions();
    options.id = HtmlUtil.genId();

    var html = new EJS({url: _CURRENT_FOLDER_['orange'] + 'template/default_ref_popover.ejs'}).render(options);

    this.popover.html(html);
    this._bindBtnActions(options.id);

    return options.id;
};

/**
 * 如果使用默认的popover布局，子类可以通过重写此函数控制默认行为
 *
 * @private
 */
OwRefInput.prototype._showOptions = function () {
    return {
        width: this.popoverOptions.width - 10,
        height: this.popoverOptions.height - 10,
        quick_select: false
    };
};

/**
 * 为默认的按钮绑定事件
 *
 * @private
 */
OwRefInput.prototype._bindBtnActions = function (id) {
    var self = this;

    this.confirmBtn = this.key('confirmBtn', $('#' + id + '-ok'));
    this.cancelBtn = this.key('cancelBtn', $('#' + id + '-cancel'));

    this.confirmBtn.click(function () {
        self.popover.hide();
    });

    this.cancelBtn.click(function () {
        self.popover.hide(true);
    });
};

OwRefInput.prototype.triggerConfirm = function () {
    this.confirmBtn.click();
};

OwRefInput.prototype.triggerCancel = function () {
    this.cancelBtn.click();
};

/**
 * 子类继承这个函数来初始化参照框，加入可以选择的内容
 *
 * @param parent
 * @returns {undefined}
 */
OwRefInput.prototype.initRef = function (parent) {

};

/**
 * 当参照框关闭的时候调用，由子类决定如何实现
 *
 * @param refObj
 */
OwRefInput.prototype.onDismiss = function (refObj) {

};

/**
 * --------------------------------------------------------------------------------------
 * 树形参照
 * --------------------------------------------------------------------------------------
 *
 * @param htmlObj
 * @constructor
 */
function OwTreeInput(htmlObj/*, initOptions, init*/) {
    TypeUtil.apply(this, OwRefInput, arguments);
}
TypeUtil.extend(OwTreeInput, OwRefInput);

/**
 * 初始化树型参照
 *
 * @param parent
 */
OwTreeInput.prototype.initRef = function (parent) {
    var treeParent = this._findTreeParent(parent),
        treeOptions = this.option('treeview', {}),
        self = this,
        initFunc = function (container) {
            var initValue = self.focusRef.val();
            if (initValue) {
                initValue = initValue.split(/\s*,\s*/);
                TypeUtil.process(self.treeView.dataModel(), function (item) {
                    if ($.inArray(item, initValue) >= 0) {
                        self.treeView.setSelected(item, true);
                    }
                }, function () {
                    self.onDismiss(self.treeView);
                });
            }
        }, dblClick = function (node, container) {
            self.triggerConfirm();
        };

    this.treeOptions = this.key('treeOptions', treeOptions);

    if (treeOptions['after-loaded']) {
        treeOptions['after-loaded'] = function (container) {
            initFunc(container);
            treeOptions['after-loaded'](container);
        }
    } else {
        treeOptions['after-loaded'] = initFunc;
    }

    if (!treeOptions.checkbox) {
        if (treeOptions['after-dblclick']) {
            treeOptions['after-dblclick'] = function (node, container) {
                dblClick(node, container);
                treeOptions['after-dblclick'](node, container);
            }
        } else {
            treeOptions['after-dblclick'] = dblClick;
        }
    }

    // 初始化树
    this.treeView = this.key('treeView', new OwTreeView(treeParent, treeOptions));

    this._initSearch();

    // 初始化查询框

    return this.treeView;
};

OwTreeInput.prototype._findTreeParent = function (parent) {
    if (!parent) throw new Error('you must specify the tree parent');

    var _parent;

    if (TypeUtil.isJQueryObject(parent)) {
        if (parent.length === 0)  throw new Error('tree parent must exist');
        _parent = parent;
    } else if (TypeUtil.isString(parent)) {
        _parent = $('#' + parent);
        if (_parent.length === 0) {
            _parent = $(parent);
        }

        if (_parent.length === 0) throw new Error('tree parent must exist');
    } else {
        throw new Error('you must specify the tree parent');
    }

    // 如果没有ID那么补一个
    var id = _parent.attr('id');
    if (!id) {
        id = HtmlUtil.genId();
        _parent.attr('id', id);
    }

    return _parent;
};

OwTreeInput.prototype._initSearch = function () {
    if (!(this.treeOptions.search)) {
        return;
    }

    this.search = this.key('search', $(new EJS({url: _CURRENT_FOLDER_['orange'] + 'template/search_field.ejs'}).render()));
    this.popover.htmlObj.prepend(this.search);

    var lastest, self = this;

    var searchCB = function (keyword) {
        if (!keyword) {
            clearCB();
            return;
        }

        if (lastest === keyword) {
            // 不要重复查询
            return;
        }

        lastest = keyword;

        self.treeView.underline().search(keyword);
    };

    var clearCB = function () {
        lastest = null;

        self.treeView.underline().clear_search();
    };

    // TODO 回车
    this.search.children('input').blur(function () {
        searchCB($.trim($(this).val()));
    }).keyup(function (event) {
        if (event.keyCode === 13) {
            searchCB($.trim($(this).val()));
        }
    });

    this.search.children('span.tree-search-cancel').click(function () {
        self.search.children('input').val('');
        clearCB();
    });
};

/**
 * 选中某个树节点
 *
 */
OwTreeInput.prototype.onDismiss = function (/*tree*/) {
    var leafOnly = this.booleanOption('leaf-only', true),
        tree = arguments.length > 0 ? arguments[0] : undefined,
        self = this, selected, result = [];

    if (!tree) {
        tree = this.treeView;
    }

    selected = tree.getSelected(true);

    self.focusRef.val('处理中...');

    // TODO treeOptions应该用KEY
    if (!this.treeOptions.checkbox) {
        self._setValue(selected);
        return;
    }

    if (leafOnly) {
        TypeUtil.process(selected, function (node) {
            if (!tree.underline().is_parent(node)) {
                result.push(node);
            }
        }, function () {
            self._setValue(result);
        });
    } else {
        var selectedIds = $.map(selected, function (node) {
            return node.id;
        });

        TypeUtil.process(selected, function (node) {
            var parentId = tree.underline().get_parent(node);

            if ($.inArray(parentId, selectedIds) === -1) {
                result.push(node);
            }
        }, function () {
            self._setValue(result);
        });
    }
};

OwTreeInput.prototype._setValue = function (selected) {
    var text = '';
    switch (selected.length) {
        case 0:
            break;
        case 1:
            text = selected[0].text;
            break;
        case 2:
            text = selected[0].text + ',' + selected[1].text;
            break;
        default:
            text = selected[0].text + '等' + selected.length + '个';
    }

    this.focusRef.val(text);
    this.focusRef.attr('id-value', $.map(selected, function (node) {
        return node.id;
    }).join(','));
};

OwTreeInput.prototype.value = function (/* value */) {
    var value = arguments[0], tree = this.treeView, self = this, model = tree.dataModel();

    if (arguments.length === 0) {
        return this.focusRef.attr('id-value');
    }

    if (!value) {
        TypeUtil.process(model, function (node) {
            tree.setSelected(node, false);
        }, function () {
            self.onDismiss();
        });
        return;
    }

    if (TypeUtil.isString(value)) {
        value = value.split(/\s*,\s*/);
    } else if (!TypeUtil.isArray(value)) {
        throw new Error('parameter error for OwTreeInput.value, must be Array or String');
    }

    this.focusRef.val('处理中...');

    tree.selectAll(false);

    TypeUtil.process(model, function (node) {
        if ($.inArray(node, value) !== -1) {
            tree.setSelected(node);
        }
    }, function () {
        self.onDismiss();
    });

};

/**
 * Radio
 *
 */
jQuery.fn.owRadio = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwCheck($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * Checkbox
 *
 */
jQuery.fn.owCheckbox = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwCheck($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * 日期输入框
 *
 */
jQuery.fn.owDateInput = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwDateInput($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * 弹出框
 *
 */
jQuery.fn.owPopover = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwPopover($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * 参照输入
 *
 */
jQuery.fn.owRefInput = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwRefInput($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * 树
 */
jQuery.fn.owTreeView = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwTreeView($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * 树参照输入
 *
 */
jQuery.fn.owTreeRefInput = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwTreeInput($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * 一次设置多个属性
 */
jQuery.fn.attrs = function (attrs) {
    var self = this;
    ObjectUtil.each(attrs, function (key, value) {
        self.attr(key, value);
    });
};

/**
 * 分页
 *
 */
jQuery.fn.owPagination = function (/*options*/) {
    var result = [];
    var options = arguments[0];
    this.each(function () {
        result.push(new OwPagination($(this), options));
    });

    return TypeUtil.judgeResult(result);
};

/**
 * 激活placeholder
 */
jQuery.fn.owPlaceholder = function (/* hint */) {
    // 浏览器原生支持placeholder，不需要进一步处理
    if ('placeholder' in document.createElement('input')) {
        return;
    }

    this.each(function () {
        // 如果提供了参数hint，那么如果控件没有提供placeholder属性，使用默认的hint
        var text = $(this).attr('placeholder') || arguments[0];
        if (!text) {
            return;
        }

        var self = $(this);

        $(this).focus(function () {
            if (!($(this).val()) || $(this).val() === text) {
                $(this).removeClass('ow-placeholder');
                $(this).val("");
            }
        }).blur(function () {
            if (!($(this).val()) || $(this).val() === text) {
                $(this).addClass('ow-placeholder');
                $(this).val(text);
            }
        }).parents("form").eq(0).submit(function () {
            if (self.val() === text) {
                self.removeClass('ow-placeholder');
                self.val("");
            }
        });

        $(this).trigger("blur");
    });
};

jQuery.fn.owCountDownButton = function (/*options*/) {
    var options = arguments[0] || {};

    var timeout = options.timeout || 3,
        callback = options.callback;

    var countdown = function (button, timeout) {
        var text = button.html();
        button.html(text + '(' + timeout + ')');

        var intervalId = window.setInterval(function () {
            if (timeout - 1 <= 0) {
                button.html(text);
                if (callback) {
                    callback(button);
                }

                window.clearInterval(intervalId);
            }

            button.html(text + "(" + (timeout - 1) + ")");
            timeout -= 1;
        }, 1000);
    };

    this.each(function () {
        countdown($(this), timeout)
    });

};
