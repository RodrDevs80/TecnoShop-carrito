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
              <label for="nombre_apellido">Nombre y apellido (tal cual figura en el DNI):</label>
        <input type="text" id="nombre_apellido" name="nombre_apellido" required>

        <label for="codigo_postal">Código postal:</label>
        <input type="text" id="codigo_postal" name="codigo_postal" required>

        <label for="provincia">Provincia:</label> 
        <input type="text" id="provincia" name="provincia" required>

        <label for="localidad">Localidad/Barrio:</label>
        <input type="text" id="localidad" name="localidad" required>

        <label for="calle">Calle/Avenida:</label>
        <input type="text" id="calle" name="calle" required>

        <label for="numero">Número:</label>
        <input type="text" id="numero" name="numero" required>

        <label for="telefono">Teléfono de contacto:</label>
        <input type="tel" id="telefono" name="telefono" required>

        <label for="indicaciones">Indicaciones adicionales (opcional):</label>
        <textarea id="indicaciones" name="indicaciones"></textarea>

        <input type="submit" value="Enviar">
      `;
    form.appendChild(closeBtn);
    modal.appendChild(form);
  },
  openConfirmHomeDelivery() {
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
  }
};
