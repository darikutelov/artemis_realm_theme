class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
  }

  onVariantChange() {
    console.log("Variant changed");
    this.getSelectedOptions();
    this.getSelectedVariant();

    if (this.currentVariant) {
      this.updateURL();
      this.updateFormID();
      this.updatePrice();
    }
  }

  getSelectedOptions() {
    this.options = Array.from(
      this.querySelectorAll("select"),
      (select) => select.value
    );
    console.log(this.options);
  }

  getVariantJSON() {
    const jsonAsText = this.querySelector(
      '[type="application/json"]'
    ).textContent;
    this.variantData = this.variantData || JSON.parse(jsonAsText);
    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVariantJSON().find((variant) => {
      const findings = !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);

      if (findings) return variant;
    });

    console.log(this.currentVariant);
  }

  updateURL() {
    if (!this.currentVariant) return;
    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }

  updateFormID() {
    // form id comes from the id here: " form 'product', product, id: 'product-form'
    const form_input = document
      .querySelector("#product-form")
      .querySelector('input[name="id"]');
    form_input.value = this.currentVariant.id;
  }

  updatePrice() {
    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
    )
      .then((response) => response.text())
      .then((responseText) => {
        const id = `price-${this.dataset.section}`;
        const html = new DOMParser().parseFromString(responseText, "text/html");

        const oldPrice = document.getElementById(id);
        const newPrice = html.getElementById(id);

        if (oldPrice && newPrice) oldPrice.innerHTML = newPrice.innerHTML;
      });
  }
}

if (!customElements.get("variant-selector")) {
  customElements.define("variant-selector", VariantSelector);
}
