const payment = {
  open() {
    function removeBodyScroll() {
      document.body.style.overflow = "hidden";
    }
    removeBodyScroll();
    function setBackgroundOpacity() {
      const opacity = document.createElement("div");
      opacity.id = "opacity-payment";
      document.body.appendChild(opacity);
    }
    setBackgroundOpacity();
    function setModal() {
      const modal = document.createElement("div");
      modal.id = "payment";
      document.body.appendChild(modal);
    }
    setModal();
  },
  close() {
    function setBodyScroll() {
      document.body.style.overflow = "auto";
    }
    setBodyScroll();
    function removeBackgroundOpacity() {
      const opacity = document.getElementById("opacity-payment");
      opacity.remove();
    }
    removeBackgroundOpacity();
    function removeModal() {
      const modal = document.getElementById("payment");
      modal.remove();
    }
    removeModal();
  },
  loadingSkeleton() {
    const loading = document.createElement("img");
    loading.src = "src/assets/img/loading.svg";
    loading.style.width = "100px";
    loading.style.height = "100px";
    loading.style.zIndex = "5";
    loading.id = "payment-loading-skeleton";
    function removeLoading() {
      document.getElementById("payment-loading-skeleton").remove();
    }
    setTimeout(removeLoading, 1000);

    document.getElementById("payment").appendChild(loading);
  },
  openChooseDeliveryMethod() {
    const form = document.createElement("form");
    const modal = document.getElementById("payment");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "formChooseDeliveryMethod";
    form.innerHTML = `
      <h2>Selecciona tu método de entrega:</h2>
        <label>
            <input type="radio" name="opcion_envio" value="domicilio"> Enviar a domicilio
        </label>
        <label>
            <input type="radio" name="opcion_envio" value="punto_entrega"> Retirar en el local
        </label>
        <input type="submit" value="Continuar">
        `;
    form.appendChild(closeBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { opcion_envio } = form.elements;
      opcion_envio.forEach((radio) => {
        if (radio.checked) {
          this.data.deliveryMethod = radio.value;
        }
      });
      switch (this.data.deliveryMethod) {
        case "domicilio":
          modal.innerHTML = "";
          this.openHomeDelivery();
          break;
        case "punto_entrega":
          modal.innerHTML = "";
          this.openPaymentMethod();
          break;
        default:
          break;
      }
    });
    modal.appendChild(form);
  },
  openHomeDelivery() {
    const form = document.createElement("form");
    const modal = document.getElementById("payment");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "formHomeDelivery";
    form.innerHTML = `
              <label for="fullName">Nombre y apellido (tal cual figura en el DNI):</label>
        <input type="text" id="fullName" name="fullName" required>

        <label for="postalCode">Código postal:</label>
        <input type="text" id="postalCode" name="postalCode" required>

        <label for="province">Provincia:</label> 
        <input type="text" id="province" name="province" required>

        <label for="neighborhood">Localidad/Barrio:</label>
        <input type="text" id="neighborhood" name="neighborhood" required>

        <label for="street">Calle/Avenida:</label>
        <input type="text" id="street" name="street" required>

        <label for="number">Número:</label>
        <input type="text" id="number" name="number" required>

        <label for="contactPhone">Teléfono de contacto:</label>
        <input type="tel" id="contactPhone" name="contactPhone" required>

        <label for="indications">Indicaciones adicionales (opcional):</label>
        <textarea id="indications" name="indications"></textarea>

        <input type="submit" value="Enviar">
      `;
    form.appendChild(closeBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const {
        fullName,
        postalCode,
        province,
        neighborhood,
        street,
        number,
        contactPhone,
        indications,
      } = form.elements;
      if (
        fullName.value &&
        postalCode.value &&
        province.value &&
        neighborhood.value &&
        street.value &&
        number.value &&
        contactPhone.value
      ) {
        this.data.homeDeliveryInfo.fullName = fullName.value;
        this.data.homeDeliveryInfo.postalCode = postalCode.value;
        this.data.homeDeliveryInfo.province = province.value;
        this.data.homeDeliveryInfo.neighborhood = neighborhood.value;
        this.data.homeDeliveryInfo.street = street.value;
        this.data.homeDeliveryInfo.number = number.value;
        this.data.homeDeliveryInfo.contactPhone = contactPhone.value;
        this.data.homeDeliveryInfo.indications = indications.value;
        console.log(this.data.gethomeDeliveryInfo());
        form.remove()
        this.openConfirmHomeDelivery();
        
      }
    });
    modal.appendChild(form);
  },
  openConfirmHomeDelivery() {
    this.view = 3;
    const modal = document.getElementById("payment");
    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "formConfirmHomeDelivery";
    form.innerHTML = `
    <h2>Confirmar direccion de envio</h2>
    <div class="shipping-info">
      <p><strong>Fecha estimada de llegada:</strong> Octubre 10, 2024</p>
      <p><strong>Direccion de envio:</strong> san martin 123, cordoba</p>
    </div>
    <input type="submit" value="Continuar">`;
    form.appendChild(closeBtn);
    modal.appendChild(form);
  },
  openPaymentMethod() {
    this.view = 4;
    const modal = document.getElementById("payment");
    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "formPaymentMethod";
    form.innerHTML = `
                  <h2>Selecciona tu método de pago:</h2>
    <label>
        <input type="radio" name="metodo_pago" value="credito"> Tarjeta de crédito
    </label>
    <label>
        <input type="radio" name="metodo_pago" value="debito"> Tarjeta de débito
    </label>
    <input type="submit" value="Continuar">
      `;

    modal.appendChild(form);
    form.appendChild(closeBtn);
  },
  openEnterPaymentMethodInformation() {
    this.view = 5;
    const modal = document.getElementById("payment");
    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "formEnterPaymentMethodInformation";
    form.innerHTML = `
                   <h2>Ingresa la Informacion de tu Tarjeta</h2>
    <!-- Número de tarjeta -->
    <label for="card-number">Numero de Tarjeta:</label>
    <input type="text" id="card-number" name="card-number" maxlength="16" placeholder="1234 5678 9012 3456" required />
    <br />

    <!-- Nombre y apellido -->
    <label for="card-name">Nombre Completo del Titular:</label>
    <input type="text" id="card-name" name="card-name" placeholder="Nombre Completo" required />
    <br />

    <!-- Fecha de vencimiento -->
    <label for="expiry-date">Fecha de Vencimiento:</label>
    <input type="month" id="expiry-date" name="expiry-date" required />
    <br />

    <!-- Código de seguridad -->
    <label for="security-code">Codigo de Seguridad (CVV):</label>
    <input type="text" id="security-code" name="security-code" maxlength="3" placeholder="123" required />
    <br />

    <!-- DNI del titular -->
    <label for="dni">DNI del Titular:</label>
    <input type="text" id="dni" name="dni" placeholder="Ingresa numero de DNI" required />
    <br />

    <input type="submit" value="Continuar">
      `;
    form.appendChild(closeBtn);
    modal.appendChild(form);
  },
  openSelectCreditCardInstallments() {
    this.view = 6;
    const modal = document.getElementById("payment");
    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "formEnterPaymentMethodInformation";
    form.innerHTML = `  <h2>Seleccioná las cuotas de tarjeta de credito</h2>
  <div>
    <p>Mastercard **** 3564</p>
    <label>
      <input type="radio" name="installments" value="1" />
      1x $ 65.699
    </label>
    <br />
    <label>
      <input type="radio" name="installments" value="2" />
      2x $ 34.626
    </label>
    <br />
    <label>
      <input type="radio" name="installments" value="3" />
      3x $ 23.489
    </label>
    <br />
    <label>
      <input type="radio" name="installments" value="6" />
      6x $ 12.474
    </label>
    <br />
    <label>
      <input type="radio" name="installments" value="9" />
      9x $ 8.978
    </label>
    <br />
    <label>
      <input type="radio" name="installments" value="12" />
      12x $ 7.296
    </label>
    <br />
  </div>
    <input type="submit" value="Continuar">
 `;
    form.appendChild(closeBtn);
    modal.appendChild(form);
  },
  openConfirmPurchase() {
    this.view = 7;
    const modal = document.getElementById("payment");
    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "formConfirmPurchase";
    form.innerHTML = ` 
    <div>
      <h2>Detalle de Envio</h2>
      <p><strong>Nombre:</strong> Juan Perez</p>
      <p><strong>Direccion:</strong> san martin 1234, cordoba</p>
      <p><strong>Ciudad:</strong> cordoba</p>
      <p><strong>Codigo Postal:</strong> 12345</p>
    </div>

    <div>
      <h2>Detalle de pago</h2>
      <p><strong>Metodo de pago:</strong> Mastercard **** 3564</p>
      <p><strong>cuotas:</strong> 3x $ 23.489</p>
    </div>

    <div>
    <h2>Resumen de compra</h2>
      <div>
        <div><span>Producto</span><span>x3</span><span>$1234.54</span></div>
        <div><span>Producto</span><span>x3</span><span>$1234.54</span></div>
        <div><span>Producto</span><span>x3</span><span>$1234.54</span></div>
      </div>
      <p>Total: $12345.67</p>
    </div>

    <input type="submit" value="Confirmar Compra">
 `;
    form.appendChild(closeBtn);
    modal.appendChild(form);
  },
  openThankYou() {
    this.view = 8;
    const ty = document.createElement("section");
    const modal = document.getElementById("payment");
    const closeBtn = document.createElement("a");
    closeBtn.textContent = "Volver";
    closeBtn.classList.add("cerrar-modal");
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ty.remove();
      this.close();
    });
    ty.id = "thankYou";
    ty.innerHTML = `
            <div class="modal-container">
      <h2 class="modal-titulo">Gracias por comprar en TecnoShop</h2>
      <p class="modal-parrafo">¡Su compra fue realizada con exito!</p>
    </div>
      `;
    modal.appendChild(ty);
    document.querySelector("#thankYou > div").appendChild(closeBtn);
  },
  test(view) {
    switch (view) {
      case 1:
        this.open();
        this.openChooseDeliveryMethod();
        break;
      case 2:
        this.open();
        this.openHomeDelivery();
        break;
      case 3:
        this.open();
        this.openConfirmHomeDelivery();
        break;
      case 4:
        this.open();
        this.openPaymentMethod();
        break;
      case 5:
        this.open();
        this.openEnterPaymentMethodInformation();
        break;
      case 6:
        this.open();
        this.openSelectCreditCardInstallments();
        break;
      case 7:
        this.open();
        this.openConfirmPurchase();
        break;
      case 8:
        this.open();
        this.openThankYou();
        break;
      default:
        break;
    }
  },
  data: {
    deliveryMethod: null,
    homeDeliveryInfo: {
      fullName: null,
      postalCode: null,
      province: null,
      neighborhood: null,
      street: null,
      number: null,
      contactPhone: null,
      indications: null,
    },
    paymentMethod: {
      creditCard: false,
      debitCard: false,
    },
    cardInfo: {
      type: null,
      Installments: null,
      number: null,
      name: null,
      securityCode: null,
      expiryDate: null,
      dni: null,
    },
    getDeliveryMethod() {
      if (this.deliveryMethod.delivery) {
        return "delivery";
      }
      if (this.deliveryMethod.delivery) {
        return "local";
      }
    },
    gethomeDeliveryInfo() {
      return this.homeDeliveryInfo;
    },
    getPaymentMethod() {
      if (this.paymentMethod.creditCard) {
        return "creditCard";
      }
      if (this.paymentMethod.debitCard) {
        return "debitCard";
      }
    },
    getCardInfo() {
      return this.cardInfo;
    },
  },
};
