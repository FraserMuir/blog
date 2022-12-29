// @ts-nocheck
import type { RenderableTreeNodes } from "@markdoc/markdoc";
import Markdoc from "@markdoc/markdoc";

const { Tag: MarkdocTag } = Markdoc;
type ComponentsType = Record<string, any>;

function escapeHTML(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export class Node {
  private node: RenderableTreeNodes;
  tag: string;
  props: Record<string, string | number>;
  children: Array | string;
  components: any | null | undefined;

  constructor(n: RenderableTreeNodes, components: ComponentsType) {
    this.node = n;
    this.components = components;
    let children = this.node?.children;
    if (typeof this.node === "string" || typeof this.node === "number") {
      // should render this in <Fragment set:html={children}></Fragment>
      children = escapeHTML(String(this.node));
      // children = String(this.node);
    } else if (this.node === null || typeof this.node !== "object" || !MarkdocTag.isTag(this.node)) {
      children = "";
    }
    this.children = children;

    let tag = this.node?.name;
    let props = this.node?.attributes;
    if (typeof this.node?.name === "string" && typeof components === "object" && Object.hasOwn(components, this.node?.name)) {
      tag = components[this.node?.name];
      props = {
        ...props,
        ...components[this.node?.name],
        children: this.children,
      };
    } else if (typeof this.node?.name === "string") {
      tag = this.node?.name;
      props = { ...this.node?.attributes };
    }
    this.tag = tag;
    this.props = props;
  }

  validateElement() {
    if (
      typeof this.node?.name === "string" &&
      // custom elements start with Uppercase
      this.node.name.charAt(0).toLowerCase() !== this.node.name.charAt(0) &&
      // TODO: this condition could be improved
      typeof components === "object" &&
      // component for the custom element not found
      !Object.hasOwn(this.components, this.node.name)
    ) {
      throw new Error(`No renderer provided for element: ${this.node.name}`);
    }
  }

  hasChildren() {
    return Array.isArray(this.node?.children);
  }

  shouldRenderChildren() {
    return (
      !Array.isArray(this.node) &&
      (typeof this.node === "string" ||
        typeof this.node === "number" ||
        this.node === null ||
        typeof this.node !== "object" ||
        !MarkdocTag.isTag(this.node))
    );
  }

  shouldRenderSelf() {
    return Array.isArray(this.node);
  }

  shouldRenderTag() {
    return !!this.tag;
  }
}
