var i18n = i18n || {};
(function (Module) {
    /** Creates a DOM observer for maintaining translations through DOM evolutions */
    function CreateDomObserver() {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function (addedNode) {
                        if (addedNode.nodeType === Node.ELEMENT_NODE) {
                            TranslateNode(addedNode);
                        }
                    });
                } else if (mutation.type === "attributes") {
                    TranslateNode(mutation.target);
                }
            });
        });

        observer.observe(document, {
            childList: true,
            attributes: true,
            attributeFilter: ["data-i18n"],
            subtree: true
        });
    };

    /** Translates the text of a node based on its data-i18n attribute */
    function TranslateNode(tag) {
        var translationKey = tag.getAttribute("data-i18n");
        if (translationKey !== null) {
            var translationValue = CommonHelper.GetProperty(Module.t, translationKey)();
            $(tag).text(translationValue);
        }
    };

    /** Loads the translations into i18n.t */
    function LoadTranslations(translations, langCode) {
        Module.t = {};

        var data = JSON.parse(translations);
        data.forEach(function (phrase) {
            Module.t[phrase[0]] = Module.t[phrase[0]] || {};

            if (phrase.length === 4) {
                Module.t[phrase[0]][phrase[1]] = new Function(phrase[2], phrase[3]);
            } else if (phrase.length === 3) {
                Module.t[phrase[0]][phrase[1]] = new Function(phrase[2]);
            }
        });

        try {
            sessionStorage.setItem(config.storageKeys.translation + langCode, translations);
        } catch (error) {
            console.error("Could not cache i18n to sessionStorage:", error);
        }
    };

    /** Loads the i18n Module
     * param callback is the function to call after the module is loaded
     * param languageCode (optional) is the language to use
     */
    Module.Load = function (callback, languageCode) {
        var langCode = languageCode || config.variationCode || config.defaulti18n;
        var i18n_cached = null;

        try {
            i18n_cached = sessionStorage.getItem(config.storageKeys.translation + langCode);
        } catch (error) {
            console.error("Could not load i18n from sessionStorage:", error);
        }

        if (i18n_cached !== null) {
            LoadTranslations(i18n_cached, langCode);
            Module.TranslateNow();
            CreateDomObserver();
            callback();
            return;
        } else {
            require(["i18n/" + langCode + ".js"], function (translations) {
                LoadTranslations(translations);
                Module.TranslateNow();
                CreateDomObserver();
                callback();
            });
        }
    };

    /** Parse all HTML of the page to translate tags with a data-i18n attribute */
    Module.TranslateNow = function () {
        $("[data-i18n]").each(function (index, tag) {
            TranslateNode(tag);
        });
    };
})(i18n);
