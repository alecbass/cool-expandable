import "./expandable.css";
type ExpandableAttribute = "open" | "shrunk-height" | "expanded-height";
/** An element which can have a smooth transition between its shrunked and expanded heights. */
export declare class Expandable extends HTMLElement {
    static observedAttributes: ExpandableAttribute[];
    connectedCallback(): void;
    attributeChangedCallback(name: ExpandableAttribute, _oldValue: string | null, newValue: string | null): void;
    /**
     * Gets the minimum height specified by the `shrunk-height` attribute, or the default of {@link DEFAULT_SHRUNK_HEIGHT}.
     *
     * @returns The specified height, or the default
     * @throws An error if the `shrunk-height` attribute is provided but is null
     */
    private get shrunkHeight();
    /**
     * Updates the element's height depending on if it is open or not.
     *
     * @param isOpen Whether this element is open or not
     *
     */
    private updateHeight;
}
declare global {
    interface HTMLElementTagNameMap {
        "cool-expandable": Expandable;
    }
}
export {};
