class ProductModel extends HTMLElement {
  constructor() {
    super();
    this.openModelModal();
    this.addEventListener("click", this.loadContent);
  }

  loadContent() {
    // Loads the UI for the product model
    Shopify.loadFeatures([
      {
        name: "model-viewer-ui",
        version: "1.0",
        onLoad: this.setupModelViewerUI.bind(this),
      },
    ]);
  }

  setupModelViewerUI(errors) {
    if (errors) return;
    this.modelViewerUI = new Shopify.ModelViewerUI(
      document.querySelector("model-viewer")
    );
  }

  getMediaID() {
    const id = this.getAttribute("data-media-id");
    return id;
  }

  getModal() {
    // gets model div from template-product.liquid
    const modal = document.getElementById("productModelModal");
    return modal;
  }

  openModelModal() {
    const mediaID = this.getMediaID();
    const modal = this.getModal();

    if (!mediaID) return;

    const openModalButton = this.querySelector(
      `button[id="productModelOpenButton_${mediaID}"]`
    );

    openModalButton.addEventListener("click", function (e) {
      modal.querySelector("#body").innerHTML = "";

      const template = document.querySelector(
        `product-model[data-media-id="${mediaID}"] > template`
      );

      // creates deep clone of the content
      const clone = template.content.cloneNode(true);

      modal.querySelector("#body").appendChild(clone);
      modal
        .querySelector("#body > model-viewer")
        .setAttribute("reveal", "auto"); // we want to load immediately
    });
  }
}

const productModel = customElements.define("product-model", ProductModel);
