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
  test(view, delay) {
    switch (view) {
      case 1:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openChooseDeliveryMethod, delay);
        setTimeout(this.close, delay * 4);
        break;
      case 2:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openHomeDelivery, delay);
        setTimeout(this.close, delay * 4);
        break;
      case 3:
        this.open();
        this.loadingSkeleton();
        setTimeout(this.openPaymentMethod, delay);
        setTimeout(this.close, delay * 4);
        break;
      default:
        break;
    }
  },
};
