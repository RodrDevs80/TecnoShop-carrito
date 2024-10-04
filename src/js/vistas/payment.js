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
    function formChooseDeliveryMethod() {
      const form = document.createElement("form");
      form.id = "formChooseDeliveryMethod";
      form.innerHTML = `
      <h2>Selecciona tu método de entrega:</h2>
        <label>
            <input type="radio" name="opcion_envio" value="domicilio"> Enviar a domicilio
        </label>
        <label>
            <input type="radio" name="opcion_envio" value="punto_entrega"> Retirar en punto de entrega
        </label>
        <label>
            <input type="radio" name="opcion_envio" value="domicilio_vendedor"> Retirar en el domicilio del vendedor
        </label>
        <input type="submit" value="Continuar">
        <button type="submit">Cancelar</button>`;
      return form;
    }
    const payment = document.getElementById("payment");
    payment.appendChild(formChooseDeliveryMethod());
  },
  openHomeDelivery() {
    function formHomeDelivery() {
      const form = document.createElement("form");
      form.id = "formHomeDelivery";
      form.innerHTML = `
              <label for="nombre_apellido">Nombre
 y apellido (tal cual figura en el DNI):</label>
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

        <label for="telefono">Teléfono
 de contacto:</label>
        <input type="tel" id="telefono" name="telefono" required>

        <label for="indicaciones">Indicaciones adicionales (opcional):</label>
        <textarea id="indicaciones" name="indicaciones"></textarea>

        <input type="submit" value="Enviar">
        <button type="submit">Cancelar</button>
      `;
      return form;
    }
    const payment = document.getElementById("payment");
    payment.appendChild(formHomeDelivery());
  },
  openConfirmHomeDelivery() {
    function formConfirmHomeDelivery() {
      const form = document.createElement("form");
      form.id = "formConfirmHomeDelivery";
      form.innerHTML = `
    <h2>Confirmar direccion de envio</h2>
    <div class="shipping-info">
      <p><strong>Fecha estimada de llegada:</strong> Octubre 10, 2024</p>
      <p><strong>Direccion de envio:</strong> san martin 123, cordoba</p>
    </div>
    <input type="submit" value="Continuar">
    <button type="submit">Cancelar</button>`;
      return form;
    }
    const payment = document.getElementById("payment");
    payment.appendChild(formConfirmHomeDelivery());
  },
  openPaymentMethod() {
    function formPaymentMethod() {
      const form = document.createElement("form");
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
    <button type="submit">Cancelar</button>

      `;
      return form;
    }
    const payment = document.getElementById("payment");
    payment.appendChild(formPaymentMethod());
  },
  openEnterPaymentMethodInformation() {
    function formEnterPaymentMethodInformation() {
      const form = document.createElement("form");
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
    <button type="submit">Cancelar</button>
      `;
      return form;
    }
    const payment = document.getElementById("payment");
    payment.appendChild(formEnterPaymentMethodInformation());
  },
  openSelectCreditCardInstallments() {
    function formEnterPaymentMethodInformation() {
      const form = document.createElement("form");
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
    <button type="submit">Cancelar</button>
 `;
      return form;
    }
    const payment = document.getElementById("payment");
    payment.appendChild(formEnterPaymentMethodInformation());
  },
  test(view, delay) {
    switch (view) {
      case 1:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openChooseDeliveryMethod, delay);
        setTimeout(this.close, delay * 10);
        break;
      case 2:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openHomeDelivery, delay);
        setTimeout(this.close, delay * 10);
        break;
      case 3:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openConfirmHomeDelivery, delay);
        setTimeout(this.close, delay * 10);
        break;
      case 4:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openPaymentMethod, delay);
        setTimeout(this.close, delay * 10);
        break;
      case 5:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openEnterPaymentMethodInformation, delay);
        setTimeout(this.close, delay * 10);
        break;
      case 6:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openSelectCreditCardInstallments, delay);
        setTimeout(this.close, delay * 10);
        break;
      default:
        break;
    }
  },
};
