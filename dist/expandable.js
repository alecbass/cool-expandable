import "./expandable.css";
const DEFAULT_SHRUNK_HEIGHT = "120px";
/** An element which can have a smooth transition between its shrunked and expanded heights. */
export class Expandable extends HTMLElement {
    static observedAttributes = [
        "open",
        "shrunk-height",
        "expanded-height",
    ];
    connectedCallback() {
        const isOpen = this.hasAttribute("open");
        this.updateHeight(isOpen);
    }
    attributeChangedCallback(name, _oldValue, newValue) {
        if (name === "open") {
            const isOpen = newValue !== null;
            this.updateHeight(isOpen);
        }
    }
    /**
     * Gets the minimum height specified by the `shrunk-height` attribute, or the default of {@link DEFAULT_SHRUNK_HEIGHT}.
     *
     * @returns The specified height, or the default
     * @throws An error if the `shrunk-height` attribute is provided but is null
     */
    get shrunkHeight() {
        const hasHeight = this.hasAttribute("shrunk-height");
        if (!hasHeight) {
            return DEFAULT_SHRUNK_HEIGHT;
        }
        const height = this.getAttribute("shrunk-height");
        if (height === null) {
            throw new Error("<cool-expandable> element has a null `shrunk-height` attribute");
        }
        return height;
    }
    /**
     * Updates the element's height depending on if it is open or not.
     *
     * @param isOpen Whether this element is open or not
     *
     */
    updateHeight = (isOpen) => {
        if (isOpen) {
            // Default to fitting all the content
            let expandedHeight = `${this.scrollHeight}px`;
            const hasSpecifiedExpandedHeight = this.hasAttribute("expanded-height");
            if (hasSpecifiedExpandedHeight) {
                expandedHeight = this.getAttribute("expanded-height");
            }
            this.style.height = expandedHeight;
        }
        else {
            this.style.height = this.shrunkHeight;
        }
    };
}
customElements.define("cool-expandable", Expandable);
