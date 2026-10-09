class ProfileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set profile(value) {
    this._profile = value;
    this.render();
  }

  render() {
    if (!this._profile) return;

    const style = document.createElement("style");
    style.textContent = `
      article {
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        width: min(100%, 560px);
        min-height: 330px;
        padding: 25px;
        border: 1px solid rgba(39, 54, 44, 0.08);
        border-radius: 14px;
        color: #27362c;
        background: var(--card-color, #f4c9b8);
        box-shadow: 0 12px 30px rgba(72, 68, 51, 0.08);
      }
      article::before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 5px;
        background: var(--card-accent, #ce6e50);
        content: "";
      }
      .label { margin: 0; color: #5a685d; font: 700 10px "DM Sans", sans-serif; letter-spacing: 0.1em; text-transform: uppercase; }
      .identity { display: flex; align-items: center; gap: 17px; margin-top: 27px; }
      .photo, .avatar { position: relative; z-index: 1; display: grid; width: 76px; aspect-ratio: 1; flex: 0 0 auto; margin: 0; place-items: center; border: 2px solid rgba(255, 255, 255, 0.78); border-radius: 50%; }
      .photo { object-fit: cover; }
      .avatar { color: #3a5542; background: rgba(255, 255, 255, 0.66); font: 500 30px "Fraunces", Georgia, serif; }
      .identity-copy { min-width: 0; }
      h2 { position: relative; z-index: 1; margin: 0; font: 500 31px/1.08 "Fraunces", Georgia, serif; overflow-wrap: anywhere; }
      .description, .about { position: relative; z-index: 1; max-width: 440px; margin: 9px 0 0; color: #46564a; font: 13px/1.6 "DM Sans", sans-serif; overflow-wrap: anywhere; }
      .about { margin-top: 18px; }
      .contacts { position: relative; z-index: 1; display: grid; gap: 9px; margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(39, 54, 44, 0.16); }
      .contact { display: grid; grid-template-columns: 68px minmax(0, 1fr); gap: 12px; margin: 0; font: 12px/1.5 "DM Sans", sans-serif; }
      .contact-label { color: #596a5d; font-weight: 700; }
      .contact-value { min-width: 0; color: #27362c; overflow-wrap: anywhere; }
      a.contact-value { text-decoration-thickness: 1px; text-underline-offset: 3px; }
      @media (max-width: 520px) { article { min-height: 0; padding: 22px; border-radius: 12px; } .identity { align-items: flex-start; gap: 14px; margin-top: 23px; } .photo, .avatar { width: 66px; } h2 { font-size: 28px; } .contact { grid-template-columns: 58px minmax(0, 1fr); gap: 8px; } }
    `;

    const article = document.createElement("article");
    article.setAttribute("aria-label", `${this._profile.name}'s profile card`);
    article.style.setProperty("--card-color", this._profile.color || "#d7e7c8");
    article.style.setProperty("--card-accent", this._profile.accent || "#688b4e");

    const label = document.createElement("p");
    label.className = "label";
    label.textContent = this._profile.label || "Profile";

    const identity = document.createElement("div");
    identity.className = "identity";

    if (this._profile.photo) {
      const photo = document.createElement("img");
      photo.className = "photo";
      photo.src = this._profile.photo;
      photo.alt = `${this._profile.name}'s profile photo`;
      identity.append(photo);
    } else {
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = this._profile.name.trim().charAt(0).toUpperCase();
      identity.append(avatar);
    }

    const identityCopy = document.createElement("div");
    identityCopy.className = "identity-copy";
    const name = document.createElement("h2");
    name.textContent = this._profile.name;
    identityCopy.append(name);

    if (this._profile.description) {
      const description = document.createElement("p");
      description.className = "description";
      description.textContent = this._profile.description;
      identityCopy.append(description);
    }

    identity.append(identityCopy);
    article.append(label, identity);

    if (this._profile.about) {
      const about = document.createElement("p");
      about.className = "about";
      about.textContent = this._profile.about;
      article.append(about);
    }

    const contacts = document.createElement("div");
    contacts.className = "contacts";
    const contactDetails = [
      { label: "Email", value: this._profile.email, href: this._profile.email ? `mailto:${this._profile.email}` : "" },
      { label: "Phone", value: this._profile.phone, href: this._profile.phone ? `tel:${this._profile.phone.replace(/[^\d+]/g, "")}` : "" },
      { label: "Location", value: this._profile.location }
    ];

    contactDetails.forEach(({ label: detailLabel, value, href }) => {
      if (!value) return;
      const row = document.createElement("p");
      row.className = "contact";

      const labelText = document.createElement("span");
      labelText.className = "contact-label";
      labelText.textContent = detailLabel;

      const detail = document.createElement(href ? "a" : "span");
      detail.className = "contact-value";
      detail.textContent = value;
      if (href) detail.href = href;

      row.append(labelText, detail);
      contacts.append(row);
    });

    if (contacts.childElementCount) article.append(contacts);

    this.shadowRoot.replaceChildren(style, article);
  }
}

class ProfileCardButton extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;

    const root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      button {
        display: inline-flex;
        min-height: 52px;
        align-items: center;
        gap: 18px;
        padding: 0 20px;
        border: 1px solid #d36549;
        border-radius: 7px;
        color: #fffaf1;
        background: #e87657;
        font: 700 13px "DM Sans", sans-serif;
        cursor: pointer;
        box-shadow: 0 5px 0 #cd6045;
        transition: background 150ms ease, transform 150ms ease, box-shadow 150ms ease;
      }
      button:hover { background: #d96b4f; transform: translateY(-2px); box-shadow: 0 7px 0 #cd6045; }
      button::after { content: "+"; font-size: 21px; font-weight: 400; line-height: 1; }
      button:focus-visible { outline: 3px solid #527f61; outline-offset: 4px; }
      @media (prefers-reduced-motion: reduce) { button { transition: none; } }
    `;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = this.getAttribute("label") || "Add profile card";
    button.setAttribute("aria-controls", "profile-card-region");
    button.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("profile-card-request", { bubbles: true, composed: true }));
    });

    root.append(style, button);
  }

  set label(value) {
    this.setAttribute("label", value);
    const button = this.shadowRoot?.querySelector("button");
    if (button) button.textContent = value;
  }
}

customElements.define("profile-card", ProfileCard);
customElements.define("profile-card-button", ProfileCardButton);