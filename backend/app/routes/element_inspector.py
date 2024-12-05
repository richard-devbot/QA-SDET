from flask import Blueprint, request, jsonify, send_file
import requests
from bs4 import BeautifulSoup
import pandas as pd
import io
import logging

element_inspector_bp = Blueprint('element_inspector', __name__)

@element_inspector_bp.route('/api/proxy', methods=['POST'])
def proxy():
    data = request.json
    url = data['url']
    
    try:
        # Increase timeout and add user agent to prevent blocking
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,/;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.content, 'html.parser')

        # Update all relative URLs to absolute
        for tag in soup.find_all(['link', 'script', 'img', 'a']):
            for attr in ['href', 'src']:
                if tag.has_attr(attr):
                    try:
                        tag[attr] = requests.compat.urljoin(url, tag[attr])
                    except Exception:
                        pass

        # Inject our element inspection script
        script = soup.new_tag('script')
        script.string = """
        function getRelativeXPath(element) {
            if (!element) return '';
            try {
                let path = '';
                while (element !== document.body) {
                    let index = 1;
                    let sibling = element;
                    while (sibling.previousElementSibling) {
                        if (sibling.previousElementSibling.tagName === element.tagName) {
                            index++;
                        }
                        sibling = sibling.previousElementSibling;
                    }
                    path = /${element.tagName.toLowerCase()}[${index}]${path};
                    element = element.parentElement;
                    if (!element) break;
                }
                return /body${path};
            } catch (error) {
                console.warn('Error generating relative XPath:', error);
                return '';
            }
        }

        function getAbsoluteXPath(element) {
            if (!element) return '';
            try {
                const idx = (sib, name) => sib 
                    ? idx(sib.previousElementSibling, name||sib.tagName) + (sib.tagName == name)
                    : 1;
                const segs = elm => !elm || elm.nodeType !== 1 
                    ? ['']
                    : elm.id && document.getElementById(elm.id) === elm
                        ? [//*[@id="${elm.id}"]]
                        : [...segs(elm.parentNode), ${elm.tagName}[${idx(elm)}]];
                return segs(element).join('/').toLowerCase();
            } catch (error) {
                console.warn('Error generating absolute XPath:', error);
                return '';
            }
        }

        function getCssSelector(element) {
            if (!element) return '';
            try {
                const parts = [];
                while (element && element.nodeType === Node.ELEMENT_NODE) {
                    let selector = element.nodeName.toLowerCase();
                    if (element.id) {
                        selector += '#' + element.id;
                        parts.unshift(selector);
                        break;
                    } else {
                        let sibling = element;
                        let index = 1;
                        while (sibling.previousElementSibling) {
                            if (sibling.previousElementSibling.nodeName === element.nodeName) {
                                index++;
                            }
                            sibling = sibling.previousElementSibling;
                        }
                        if (index > 1) {
                            selector += :nth-of-type(${index});
                        }
                        parts.unshift(selector);
                        element = element.parentNode;
                    }
                }
                return parts.join(' > ');
            } catch (error) {
                console.warn('Error generating CSS selector:', error);
                return '';
            }
        }

        function getAllAttributes(element) {
            const attributes = {};
            try {
                for (const attr of element.attributes) {
                    attributes[attr.name] = attr.value;
                }
            } catch (error) {
                console.warn('Error getting attributes:', error);
            }
            return attributes;
        }

        function getComputedStyles(element) {
            try {
                const styles = window.getComputedStyle(element);
                const important = ['display', 'visibility', 'position', 'width', 'height', 
                    'color', 'background-color', 'font-size', 'font-family', 'margin', 
                    'padding', 'border', 'z-index', 'opacity'];
                const computedStyles = {};
                important.forEach(prop => {
                    computedStyles[prop] = styles.getPropertyValue(prop);
                });
                return computedStyles;
            } catch (error) {
                console.warn('Error getting computed styles:', error);
                return {};
            }
        }

        function getAccessibilityInfo(element) {
            try {
                return {
                    role: element.getAttribute('role') || '',
                    ariaLabel: element.getAttribute('aria-label') || '',
                    ariaDescribedBy: element.getAttribute('aria-describedby') || '',
                    ariaHidden: element.getAttribute('aria-hidden') || '',
                    tabIndex: element.getAttribute('tabindex') || '',
                    isKeyboardFocusable: element.tabIndex >= 0,
                    hasAccessibleName: element.getAttribute('aria-label') || 
                                     element.getAttribute('title') || 
                                     element.innerText || 
                                     element.getAttribute('alt') ? true : false
                };
            } catch (error) {
                console.warn('Error getting accessibility info:', error);
                return {};
            }
        }

        function getElementState(element) {
            try {
                return {
                    isVisible: !(element.offsetWidth === 0 && element.offsetHeight === 0),
                    isEnabled: !element.disabled,
                    isChecked: element.checked || false,
                    isRequired: element.required || false,
                    isReadOnly: element.readOnly || false,
                    isContentEditable: element.isContentEditable,
                    isFocused: document.activeElement === element,
                    isInViewport: element.getBoundingClientRect().top >= 0 && 
                                element.getBoundingClientRect().left >= 0 && 
                                element.getBoundingClientRect().bottom <= window.innerHeight && 
                                element.getBoundingClientRect().right <= window.innerWidth
                };
            } catch (error) {
                console.warn('Error getting element state:', error);
                return {};
            }
        }

        function getSiblingInfo(element) {
            try {
                return {
                    previousSibling: element.previousElementSibling ? {
                        tag: element.previousElementSibling.tagName,
                        id: element.previousElementSibling.id || '',
                        class: element.previousElementSibling.className || ''
                    } : null,
                    nextSibling: element.nextElementSibling ? {
                        tag: element.nextElementSibling.tagName,
                        id: element.nextElementSibling.id || '',
                        class: element.nextElementSibling.className || ''
                    } : null,
                    siblingPosition: Array.from(element.parentElement?.children || [])
                        .findIndex(child => child === element),
                    totalSiblings: element.parentElement?.children.length || 0
                };
            } catch (error) {
                console.warn('Error getting sibling info:', error);
                return {};
            }
        }

        function getCustomSelectors(element) {
            try {
                // Generate a unique selector using multiple attributes
                const generateUniqueSelector = () => {
                    const parts = [];
                    if (element.id) parts.push(#${element.id});
                    if (element.className) {
                        const classes = Array.from(element.classList).join('.');
                        if (classes) parts.push(.${classes});
                    }
                    if (element.name) parts.push([name="${element.name}"]);
                    if (element.tagName) parts.push(element.tagName.toLowerCase());
                    return parts.join('');
                };

                return {
                    uniqueSelector: generateUniqueSelector(),
                    dataTestId: element.getAttribute('data-testid') || '',
                    dataAutomationId: element.getAttribute('data-automation-id') || '',
                    customDataAttributes: Object.entries(element.dataset).reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {})
                };
            } catch (error) {
                console.warn('Error getting custom selectors:', error);
                return {};
            }
        }

        function getEventListeners(element) {
            try {
                const eventTypes = [
                    'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout',
                    'keydown', 'keyup', 'keypress', 'focus', 'blur', 'change', 'submit',
                    'touchstart', 'touchend', 'touchmove'
                ];
                
                const listeners = {};
                eventTypes.forEach(type => {
                    const hasListener = element[on${type}] !== null;
                    if (hasListener) {
                        listeners[type] = true;
                    }
                });
                
                // Check for addEventListener listeners using a test event
                eventTypes.forEach(type => {
                    const testEvent = new Event(type);
                    let hasListener = false;
                    
                    const tempListener = () => { hasListener = true; };
                    element.addEventListener(type, tempListener);
                    element.dispatchEvent(testEvent);
                    element.removeEventListener(type, tempListener);
                    
                    if (hasListener) {
                        listeners[type] = true;
                    }
                });
                
                return listeners;
            } catch (error) {
                console.warn('Error getting event listeners:', error);
                return {};
            }
        }

        function getShadowDOMInfo(element) {
            try {
                const shadowInfo = {
                    hasShadowRoot: false,
                    shadowElements: [],
                    shadowSelectors: []
                };

                if (element.shadowRoot) {
                    shadowInfo.hasShadowRoot = true;
                    const shadowElements = Array.from(element.shadowRoot.querySelectorAll('*'));
                    
                    shadowElements.forEach(el => {
                        shadowInfo.shadowElements.push({
                            tag: el.tagName,
                            id: el.id || '',
                            class: el.className || '',
                            text: el.textContent.trim()
                        });
                        
                        // Create shadow DOM specific selectors
                        const shadowPath = [];
                        let current = el;
                        while (current && current !== element.shadowRoot) {
                            let selector = current.tagName.toLowerCase();
                            if (current.id) selector += #${current.id};
                            if (current.className) selector += .${current.className.split(' ').join('.')};
                            shadowPath.unshift(selector);
                            current = current.parentElement;
                        }
                        shadowInfo.shadowSelectors.push(shadowPath.join(' > '));
                    });
                }
                
                return shadowInfo;
            } catch (error) {
                console.warn('Error getting shadow DOM info:', error);
                return { hasShadowRoot: false, shadowElements: [], shadowSelectors: [] };
            }
        }

        function getPerformanceMetrics(element) {
            try {
                const metrics = {
                    renderTime: 0,
                    layoutImpact: 0,
                    memoryEstimate: 0
                };

                // Measure render time
                const start = performance.now();
                element.style.visibility = 'hidden';
                element.style.visibility = '';
                metrics.renderTime = performance.now() - start;

                // Estimate layout impact
                const rect = element.getBoundingClientRect();
                const viewportArea = window.innerWidth * window.innerHeight;
                const elementArea = rect.width * rect.height;
                metrics.layoutImpact = (elementArea / viewportArea) * 100;

                // Estimate memory usage
                const serialized = element.outerHTML;
                metrics.memoryEstimate = new Blob([serialized]).size;

                return metrics;
            } catch (error) {
                console.warn('Error getting performance metrics:', error);
                return { renderTime: 0, layoutImpact: 0, memoryEstimate: 0 };
            }
        }

        function getFrameworkInfo(element) {
            try {
                const frameworks = {
                    react: false,
                    angular: false,
                    vue: false,
                    svelte: false
                };

                // React detection
                if (element.reactRootContainer || element[Object.keys(element).find(key => key.startsWith('_react'))]) {
                    frameworks.react = true;
                }

                // Angular detection
                if (element.getAttribute('ng-version') || element.getAttribute('_nghost')) {
                    frameworks.angular = true;
                }

                // Vue detection
                if (element._vue_ || element.getAttribute('data-v-')) {
                    frameworks.vue = true;
                }

                // Svelte detection
                if (element.constructor.name.includes('Svelte')) {
                    frameworks.svelte = true;
                }

                return frameworks;
            } catch (error) {
                console.warn('Error getting framework info:', error);
                return { react: false, angular: false, vue: false, svelte: false };
            }
        }

        function identifyElements() {
            const elements = Array.from(document.body.getElementsByTagName('*'));
            const totalElements = elements.length;
            const chunkSize = 50;
            let currentIndex = 0;

            function processChunk() {
                try {
                    const chunk = elements.slice(currentIndex, currentIndex + chunkSize);
                    const elementData = [];

                    chunk.forEach((element, index) => {
                        try {
                            const rect = element.getBoundingClientRect();
                            
                            // Skip invisible or zero-size elements
                            if (rect.width <= 0 || rect.height <= 0) return;

                            // Highlight element with safety checks
                            safeHighlightElement(element, currentIndex + index + 1);

                            const linkText = element.tagName === 'A' ? element.textContent.trim() : '';
                            
                            elementData.push({
                                id: currentIndex + index + 1,
                                tag: element.tagName,
                                elementId: element.id || '',
                                className: element.className || '',
                                relativeXPath: getRelativeXPath(element),
                                absoluteXPath: getAbsoluteXPath(element),
                                cssSelector: getCssSelector(element),
                                linkText: linkText,
                                partialLinkText: linkText ? linkText.substring(0, Math.min(30, linkText.length)) : '',
                                attributes: getAllAttributes(element),
                                text: element.textContent.trim(),
                                computedStyles: getComputedStyles(element),
                                accessibility: getAccessibilityInfo(element),
                                state: getElementState(element),
                                siblings: getSiblingInfo(element),
                                customSelectors: getCustomSelectors(element),
                                dimensions: {
                                    x: rect.x,
                                    y: rect.y,
                                    width: rect.width,
                                    height: rect.height,
                                    top: rect.top,
                                    right: rect.right,
                                    bottom: rect.bottom,
                                    left: rect.left
                                },
                                eventListeners: getEventListeners(element),
                                shadowDOM: getShadowDOMInfo(element),
                                performance: getPerformanceMetrics(element),
                                framework: getFrameworkInfo(element),
                                validation: {
                                    hasValidation: element instanceof HTMLFormElement || 
                                                 element instanceof HTMLInputElement || 
                                                 element instanceof HTMLSelectElement || 
                                                 element instanceof HTMLTextAreaElement,
                                    validationMessage: element.validationMessage || '',
                                    validity: element.validity ? {
                                        valueMissing: element.validity.valueMissing,
                                        typeMismatch: element.validity.typeMismatch,
                                        patternMismatch: element.validity.patternMismatch,
                                        tooLong: element.validity.tooLong,
                                        tooShort: element.validity.tooShort,
                                        rangeUnderflow: element.validity.rangeUnderflow,
                                        rangeOverflow: element.validity.rangeOverflow,
                                        stepMismatch: element.validity.stepMismatch,
                                        badInput: element.validity.badInput,
                                        customError: element.validity.customError,
                                        valid: element.validity.valid
                                    } : null
                                }
                            });
                        } catch (elementError) {
                            console.warn('Error processing element:', elementError);
                        }
                    });

                    // Send progress update with error handling
                    try {
                        window.parent.postMessage({
                            type: 'elementsIdentified',
                            elements: elementData,
                            progress: Math.min(1, (currentIndex + chunkSize) / totalElements)
                        }, '*');
                    } catch (messageError) {
                        console.error('Error sending message:', messageError);
                    }

                    currentIndex += chunkSize;
                    
                    // Schedule next chunk or complete
                    if (currentIndex < totalElements) {
                        setTimeout(processChunk, 0);
                    } else {
                        window.parent.postMessage({ type: 'identificationComplete' }, '*');
                    }
                } catch (chunkError) {
                    console.error('Chunk processing error:', chunkError);
                    // Attempt to continue processing
                    currentIndex += chunkSize;
                    if (currentIndex < totalElements) {
                        setTimeout(processChunk, 0);
                    }
                }
            }

            function safeHighlightElement(element, id) {
                try {
                    element.style.outline = '2px solid red';
                    const rect = element.getBoundingClientRect();
                    
                    const overlay = document.createElement('div');
                    overlay.textContent = id;
                    overlay.style.position = 'absolute';
                    overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
                    overlay.style.color = 'white';
                    overlay.style.padding = '2px 5px';
                    overlay.style.borderRadius = '3px';
                    overlay.style.fontSize = '12px';
                    overlay.style.zIndex = '10000';
                    overlay.style.pointerEvents = 'none';
                    
                    // Safer positioning
                    const left = Math.max(0, rect.left - 25);
                    const top = Math.max(0, rect.top - 25);
                    
                    overlay.style.left = `${left}px`;
                    overlay.style.top = `${top}px`;

                    document.body.appendChild(overlay);
                } catch (highlightError) {
                    console.warn('Highlight error:', highlightError);
                }
            }

            function safeGetXPath(element) {
                try {
                    if (element.id !== '')
                        return 'id("' + element.id + '")';
                    if (element === document.body)
                        return element.tagName;

                    let ix = 0;
                    const siblings = element.parentNode.childNodes;
                    for (let i = 0; i < siblings.length; i++) {
                        const sibling = siblings[i];
                        if (sibling === element)
                            return safeGetXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
                        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
                            ix++;
                    }
                    return '';
                } catch (xpathError) {
                    console.warn('XPath generation error:', xpathError);
                    return '';
                }
            }

            // Start processing
            processChunk();
        }

        // Expose the function to be called from the parent window
        window.identifyElements = identifyElements;
        """
        soup.body.append(script)

        # Set the base URL to ensure relative paths resolve correctly
        base_tag = soup.new_tag('base', href=url)
        soup.head.insert(0, base_tag)

        return jsonify({"html": str(soup)})
    
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to fetch URL: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@element_inspector_bp.route('/api/generate-csv', methods=['POST'])
def generate_csv():
    data = request.json
    elements = data['elements']
    filename = data.get('filename', 'web_elements.csv')
    
    df = pd.DataFrame(elements)
    csv_buffer = io.BytesIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)
    
    return send_file(
        csv_buffer,
        mimetype='text/csv',
        as_attachment=True,
        download_name=filename,
        max_age=0
    )
