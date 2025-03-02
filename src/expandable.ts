import "./expandable.css";

type ExpandableAttribute = "open" | "shrunk-height" | "expanded-height";

const DEFAULT_SHRUNK_HEIGHT = "120px";

/** An element which can have a smooth transition between its shrunked and expanded heights. */
export class Expandable extends HTMLElement {
  static observedAttributes: ExpandableAttribute[] = [
    "open",
    "shrunk-height",
    "expanded-height",
  ];

  connectedCallback(): void {
    const isOpen = this.hasAttribute("open");
    this.updateHeight(isOpen);
  }

  attributeChangedCallback(
    name: ExpandableAttribute,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
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
  private get shrunkHeight(): string {
    const hasHeight = this.hasAttribute("shrunk-height");

    if (!hasHeight) {
      return DEFAULT_SHRUNK_HEIGHT;
    }

    const height = this.getAttribute("shrunk-height");

    if (height === null) {
      throw new Error(
        "<cool-expandable> element has a null `shrunk-height` attribute",
      );
    }

    return height;
  }

  /**
   * Updates the element's height depending on if it is open or not.
   *
   * @param isOpen Whether this element is open or not
   *
   */
  private updateHeight = (isOpen: boolean): void => {
    if (isOpen) {
      // Default to fitting all the content
      let expandedHeight = `${this.scrollHeight}px`;

      const hasSpecifiedExpandedHeight = this.hasAttribute("expanded-height");
      if (hasSpecifiedExpandedHeight) {
        expandedHeight = this.getAttribute("expanded-height")!;
      }

      this.style.height = expandedHeight;
    } else {
      this.style.height = this.shrunkHeight;
    }
  };
}

customElements.define("cool-expandable", Expandable);

declare global {
  interface HTMLElementTagNameMap {
    "cool-expandable": Expandable;
  }
}
