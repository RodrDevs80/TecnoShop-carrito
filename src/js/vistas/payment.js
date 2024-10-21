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
      <h2>Enviar a domicilio</h2>
              <label for="fullName">Nombre y apellido (tal cual figura en el DNI):</label>
        <input type="text" id="fullName" name="fullName" required>

        <label for="postalCode">Código postal:</label>
        <input type="text" id="postalCode" name="postalCode" required>

        <label for="province">Provincia:</label> 
        <input type="text" id="province" name="province" required>

        <label for="city">Ciudad:</label>
        <input type="text" id="city" name="city" required>

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
        city,
        street,
        number,
        contactPhone,
        indications,
      } = form.elements;
      if (
        fullName.value &&
        postalCode.value &&
        province.value &&
        city.value &&
        street.value &&
        number.value &&
        contactPhone.value
      ) {
        this.data.homeDeliveryInfo.fullName = fullName.value;
        this.data.homeDeliveryInfo.postalCode = postalCode.value;
        this.data.homeDeliveryInfo.province = province.value;
        this.data.homeDeliveryInfo.city = city.value;
        this.data.homeDeliveryInfo.street = street.value;
        this.data.homeDeliveryInfo.number = number.value;
        this.data.homeDeliveryInfo.contactPhone = contactPhone.value;
        this.data.homeDeliveryInfo.indications = indications.value;
        form.remove();
        this.openConfirmHomeDelivery();
      }
    });
    modal.appendChild(form);
  },
  openConfirmHomeDelivery() {
    function obtenerFechaFormateada(diasSumar = 4) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + diasSumar);
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const nombreMes = meses[fecha.getMonth()];
      const dia = fecha.getDate();
      const anio = fecha.getFullYear();
      return `${nombreMes} ${dia}, ${anio}`;
    }
    function obtenerDireccionFormateada(data) {
      const { city, street, number } = data;
      return `${street} ${number}, ${city}`;
    }

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
      <p><strong>Fecha estimada de llegada:</strong> ${obtenerFechaFormateada()}</p>
      <p><strong>Direccion de envio:</strong> ${obtenerDireccionFormateada(
        this.data.homeDeliveryInfo
      )}</p>
    </div>
    <input type="submit" value="Continuar">`;
    form.appendChild(closeBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.remove();
      this.openPaymentMethod();
    });
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

    form.appendChild(closeBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { metodo_pago } = form.elements;
      metodo_pago.forEach((radio) => {
        if (radio.checked) {
          this.data.paymentMethod = radio.value;
        }
      });
      if (this.data.paymentMethod) {
        form.remove();
        this.openEnterPaymentMethodInformation();
      }
    });
    modal.appendChild(form);
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
    <label for="cardnumber">Numero de Tarjeta:</label>
    <input type="text" id="cardnumber" name="cardnumber" maxlength="16" placeholder="1234 5678 9012 3456" required />
    <br />

    <!-- Nombre y apellido -->
    <label for="cardname">Nombre Completo del Titular:</label>
    <input type="text" id="cardname" name="cardname" placeholder="Nombre Completo" required />
    <br />

    <!-- Fecha de vencimiento -->
    <label for="expirydate">Fecha de Vencimiento:</label>
    <input type="month" id="expirydate" name="expirydate" required />
    <br />

    <!-- Código de seguridad -->
    <label for="securitycode">Codigo de Seguridad (CVV):</label>
    <input type="text" id="securitycode" name="securitycode" maxlength="3" placeholder="123" required />
    <br />

    <!-- DNI del titular -->
    <label for="dni">DNI del Titular:</label>
    <input type="text" id="dni" name="dni" placeholder="Ingresa numero de DNI" required />
    <br />

    <input type="submit" value="Continuar">
      `;
    form.appendChild(closeBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const { cardnumber, cardname, expirydate, securitycode, dni } =
        form.elements;
      if (cardnumber && cardname && expirydate && securitycode && dni) {
        this.data.cardInfo.type = this.data.paymentMethod;
        this.data.cardInfo.number = cardnumber.value;
        this.data.cardInfo.name = cardname.value;
        this.data.cardInfo.securityCode = securitycode.value;
        this.data.cardInfo.expiryDate = expirydate.value;
        this.data.cardInfo.dni = dni.value;
        form.remove();

        switch (this.data.cardInfo.type) {
          case "credito":
            this.openSelectCreditCardInstallments();
            break;
          case "debito":
            this.openConfirmPurchase();
            break;
          default:
            break;
        }
      }
    });
    modal.appendChild(form);
  },
  openSelectCreditCardInstallments() {
    function identificarTarjeta(numeroTarjeta) {
      // Convertir el número de tarjeta a cadena
      const numero = numeroTarjeta.toString();

      // Verificar la longitud mínima del número de tarjeta
      // if (numero.length < 15) {
      //     return "Número de tarjeta inválido";
      // }

      // Verificar si es American Express (comienza con 34 o 37)
      const primerosDosDigitos = parseInt(numero.substring(0, 2));
      if (primerosDosDigitos === 34 || primerosDosDigitos === 37) {
        return "American Express";
      }

      // Verificar si es Visa (comienza con 4)
      const primerDigito = parseInt(numero.charAt(0));
      if (primerDigito === 4) {
        return "Visa";
      }

      // Verificar si es Mastercard (comienza con 51-55 o 2221-2720)
      const primerosSeisDigitos = parseInt(numero.substring(0, 6));
      const primerosDosDigitosMC = parseInt(numero.substring(0, 2));

      if (
        (primerosDosDigitosMC >= 51 && primerosDosDigitosMC <= 55) ||
        (primerosSeisDigitos >= 222100 && primerosSeisDigitos <= 272099)
      ) {
        return "Mastercard";
      }

      // Si no coincide con ninguna de las anteriores
      return "Empresa emisora no identificada";
    }
    const modal = document.getElementById("payment");
    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", () => {
      form.remove();
      this.close();
    });
    form.id = "SelectCreditCardInstallments";
    if (carrito.calcularTotal() >= 500 && payment.data.deliveryMethod =="domicilio") {
      form.innerHTML = `
      <h2>Seleccioná las cuotas de tarjeta de credito</h2>
    <div>
      <p>${identificarTarjeta(
        this.data.cardInfo.number
      )} **** ${this.data.cardInfo.number.slice(-4)}</p>
      <label>
        <input type="radio" name="installments" value="1" />
        1x $ ${carrito.calcularTotal().toFixed(2)} (Envio Gratis!!)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="2" />
        2x $ ${(carrito.calcularTotal() / 2).toFixed(2)} (Envio Gratis!!)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="3" />
        3x $ ${(carrito.calcularTotal() / 3).toFixed(2)} (Envio Gratis!!)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="6" />
        6x $ ${(carrito.calcularTotal() / 6).toFixed(2)} (Envio Gratis!!)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="9" />
        9x $ ${(carrito.calcularTotal() / 9).toFixed(2)} (Envio Gratis!!)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="12" />
        12x $ ${(carrito.calcularTotal() / 12).toFixed(2)} (Envio Gratis!!)
      </label>
      <br />
    </div>
      <input type="submit" value="Continuar">
   `;
    } else if(carrito.calcularTotal() < 500 && payment.data.deliveryMethod =="domicilio"){
      form.innerHTML = `  
      <h2>Seleccioná las cuotas de tarjeta de credito</h2>
    <div>
      <p>${identificarTarjeta(
        this.data.cardInfo.number
      )} **** ${this.data.cardInfo.number.slice(-4)}</p>
      <label>
        <input type="radio" name="installments" value="1" />
        1x $ ${(carrito.calcularTotal()+6).toFixed(2)} </br>($6 de Envio Incluidos)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="2" />
        2x $ ${((carrito.calcularTotal()+6) / 2).toFixed(2)} </br>($6 de Envio Incluidos)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="3" />
        3x $ ${((carrito.calcularTotal()+6) / 3).toFixed(2)} </br>($6 de Envio Incluidos)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="6" />
        6x $ ${((carrito.calcularTotal()+6) / 6).toFixed(2)} </br>($6 de Envio Incluidos)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="9" />
        9x $ ${((carrito.calcularTotal()+6) / 9).toFixed(2)} </br>($6 de Envio Incluidos)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="12" />
        12x $ ${((carrito.calcularTotal()+6) / 12).toFixed(2)} </br>($6 de Envio Incluidos)
      </label>
      <br />
    </div>
      <input type="submit" value="Continuar">
   `;
    } else if(payment.data.deliveryMethod == "punto_entrega"){
      form.innerHTML = `
      <h2>Seleccioná las cuotas de tarjeta de credito</h2>
    <div>
      <p>${identificarTarjeta(
        this.data.cardInfo.number
      )} **** ${this.data.cardInfo.number.slice(-4)}</p>
      <label>
        <input type="radio" name="installments" value="1" />
        1x $ ${carrito.calcularTotal().toFixed(2)} (Retira en el local)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="2" />
        2x $ ${(carrito.calcularTotal() / 2).toFixed(2)} (Retira en el local)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="3" />
        3x $ ${(carrito.calcularTotal() / 3).toFixed(2)} (Retira en el local)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="6" />
        6x $ ${(carrito.calcularTotal() / 6).toFixed(2)} (Retira en el local)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="9" />
        9x $ ${(carrito.calcularTotal() / 9).toFixed(2)} (Retira en el local)
      </label>
      <br />
      <label>
        <input type="radio" name="installments" value="12" />
        12x $ ${(carrito.calcularTotal() / 12).toFixed(2)} (Retira en el local)
      </label>
      <br />
    </div>
      <input type="submit" value="Continuar">
   `;
    }

    form.appendChild(closeBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { installments } = form.elements;
      installments.forEach((radio) => {
        if (radio.checked) {
          this.data.cardInfo.installments = radio.value;
        }
      });
      if (this.data.cardInfo.installments != null) {
        form.remove();
        this.openConfirmPurchase();
      }
    });
    modal.appendChild(form);
  },
  openConfirmPurchase() {
    function identificarTarjeta(numeroTarjeta) {
      // Convertir el número de tarjeta a cadena
      const numero = numeroTarjeta.toString();

      // Verificar la longitud mínima del número de tarjeta
      // if (numero.length < 15) {
      //     return "Número de tarjeta inválido";
      // }

      // Verificar si es American Express (comienza con 34 o 37)
      const primerosDosDigitos = parseInt(numero.substring(0, 2));
      if (primerosDosDigitos === 34 || primerosDosDigitos === 37) {
        return "American Express";
      }

      // Verificar si es Visa (comienza con 4)
      const primerDigito = parseInt(numero.charAt(0));
      if (primerDigito === 4) {
        return "Visa";
      }

      // Verificar si es Mastercard (comienza con 51-55 o 2221-2720)
      const primerosSeisDigitos = parseInt(numero.substring(0, 6));
      const primerosDosDigitosMC = parseInt(numero.substring(0, 2));

      if (
        (primerosDosDigitosMC >= 51 && primerosDosDigitosMC <= 55) ||
        (primerosSeisDigitos >= 222100 && primerosSeisDigitos <= 272099)
      ) {
        return "Mastercard";
      }

      // Si no coincide con ninguna de las anteriores
      return "Empresa emisora no identificada";
    }
    function resumenProductosHtml() {
      const containerOfProducts = document.createElement("div");
      carrito.productos.forEach((p) => {
        const product = document.createElement("div");
        product.classList.add("payment-product-item");
        product.innerHTML = `<span class="p-name"><b>Producto: </b>${
          p.nombre
        }</span><span class="p-quantity"><b>Unidades</b>: ${
          p.cantidad
        }</span><span class="p-unit-price"><b>Precio por Unidad</b>: $${p.precio.toFixed(
          2
        )}</span><span class="p-sub-total"><b>Subtotal</b>: $${(p.precio*p.cantidad).toFixed(2)}</span>`;

        containerOfProducts.appendChild(product);
      });

      return containerOfProducts.innerHTML;
    }

    function htmlFormatDeliveryInfo(data) {
      let html = ""
      
      if (data.deliveryMethod=="domicilio") {
        html=`
        <div>
          <h2>Detalle de Envio</h2>
          <p><strong>Nombre:</strong> ${data.homeDeliveryInfo.fullName}</p>
          <p><strong>Direccion:</strong> ${data.homeDeliveryInfo.street} ${data.homeDeliveryInfo.number}</p>
          <p><strong>Ciudad:</strong> ${data.homeDeliveryInfo.city}, ${data.homeDeliveryInfo.province}</p>
          <p><strong>Codigo Postal:</strong> ${data.homeDeliveryInfo.postalCode}</p>
        </div>
            `
    } else if(data.deliveryMethod=="punto_entrega"){
      html=`
      <div>
        <h2>Retirar en el local</h2>
        <p><b>Direccion:</b>  Avenida Siempreviva 742, Springfield, EEUU</p>
        <p style="font-size: small; color:grey">Luego de confirmar la compra, acercate a nuestro local con tu comprobante para retirar los productos</p>
      </div>
          `
    }

    return html
    }
    function htmlFormatPaymentInfo(data, paymentTotal) {
      let html = ""
      if (data.deliveryMethod=="punto_entrega" ) {
        switch (data.paymentMethod) {
          case "credito":
  
          html=`<p><strong>Metodo de pago:</strong> ${identificarTarjeta(data.cardInfo.number)} **** ${data.cardInfo.number.slice(-4)} (Credito)</p>
          <p><strong>Productos:</strong> $${paymentTotal.toFixed(2)} </p>
          <p><strong>Cuotas:</strong> ${data.cardInfo.installments}x $${(paymentTotal / data.cardInfo.installments).toFixed(2)} </p>
          <p><strong>Total:</strong> $${paymentTotal.toFixed(2)}</p>
          `
          break;
          case "debito":
            html=`<p><strong>Metodo de pago:</strong> ${identificarTarjeta(data.cardInfo.number)} **** ${data.cardInfo.number.slice(-4)} (Debito)</p>
            <p><strong>Productos:</strong> $${paymentTotal.toFixed(2)} 
            <p><strong>Total:</strong> $${paymentTotal.toFixed(2)}
            `
          break;
        
          default:
            break;
        }
    } else if(data.deliveryMethod=="domicilio" && (paymentTotal>=500)){
      switch (data.paymentMethod) {
        case "credito":

        html=`
        <p><strong>Metodo de pago:</strong> ${identificarTarjeta(data.cardInfo.number)} **** ${data.cardInfo.number.slice(-4)} (Credito)</p>
        <p><strong>Productos:</strong> $${paymentTotal.toFixed(2)} </p>
        <p><strong>Envio:</strong> Gratis!!</p>
        <p><strong>Total:</strong> $${(paymentTotal).toFixed(2)}</p>
        <p><strong>Cuotas:</strong> ${data.cardInfo.installments}x $${((paymentTotal) / data.cardInfo.installments).toFixed(2)} </p>
        `
        break;
        case "debito":
          html=`
          <p><strong>Metodo de pago:</strong> ${identificarTarjeta(data.cardInfo.number)} **** ${data.cardInfo.number.slice(-4)} (Debito)</p>
          <p><strong>Productos:</strong> $${paymentTotal.toFixed(2)}</p> 
          <p><strong>Envio: Gratis!!</strong></p>
          <p><strong>Total:</strong> $${(paymentTotal).toFixed(2)}</p>

          `
        break;
      
        default:
          break;
      }
    } else if(data.deliveryMethod=="domicilio" && (paymentTotal<500)){
      switch (data.paymentMethod) {
        case "credito":

        html=`
        <p><strong>Metodo de pago:</strong> ${identificarTarjeta(data.cardInfo.number)} **** ${data.cardInfo.number.slice(-4)} (Credito)</p>
        <p><strong>Productos:</strong> $${paymentTotal.toFixed(2)} </p>
        <p><strong>Envio:</strong> $6</p>
        <p><strong>Total:</strong> $${(paymentTotal+6).toFixed(2)}</p>
        <p><strong>Cuotas:</strong> ${data.cardInfo.installments}x $${((paymentTotal+6) / data.cardInfo.installments).toFixed(2)} </p>
        `
        break;
        case "debito":
          html=`
          <p><strong>Metodo de pago:</strong> ${identificarTarjeta(data.cardInfo.number)} **** ${data.cardInfo.number.slice(-4)} (Debito)</p>
          <p><strong>Productos:</strong> $${paymentTotal.toFixed(2)}</p> 
          <p><strong>Envio:</strong> $6</p>
          <p><strong>Total:</strong> $${(paymentTotal+6).toFixed(2)}</p>

          `
        break;
      
        default:
          break;
      }
    }
   
    return html
    }
    function htmlFormatPurchaseTotalInfo(data,paymentTotal){
      let html =``
      if (data.deliveryMethod=="punto_entrega") {
        // total sin envio
        html =`
      <p><b>Total:</b> $${paymentTotal.toFixed(2)}</p>
        `
      } else if(paymentTotal >= 500 && data.deliveryMethod=="domicilio"){
        // envio gratis
        // total
        html = `
        <span><b>Envio</b>: Gratis!!</span>
        <p><b>Total:</b> $${paymentTotal.toFixed(2)}</p>

        `
      } else if(paymentTotal < 500 && data.deliveryMethod=="domicilio"){
        // envio 
        // total + envio
        html = `
        <span><b>Envio</b>: $6</span>
        <p><b>Total:</b> $${(paymentTotal+6).toFixed(2)}</p>

        `
      }
      return html
    }
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
    ${htmlFormatDeliveryInfo(this.data)}
    <div>
      <h2>Detalle de pago</h2>
      ${htmlFormatPaymentInfo(this.data,carrito.calcularTotal())}
    </div>

    <div>
    <h2>Resumen de compra</h2>
      <div class="container-of-products">
      ${resumenProductosHtml()}
      ${htmlFormatPurchaseTotalInfo(this.data,carrito.calcularTotal())}
      </div>
    </div>

    <input type="submit" value="Confirmar Compra">
 `;
    form.appendChild(closeBtn);
    form.addEventListener("submit", () => {
      form.remove();
      this.openThankYou();
    });
    modal.appendChild(form);
  },
  openThankYou() {
    const ty = document.createElement("section");
    const modal = document.getElementById("payment");
    const closeBtn = document.createElement("a");
    closeBtn.textContent = "Descargar Comporobante";
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
  data: {
    deliveryMethod: null,
    homeDeliveryInfo: {
      fullName: null,
      postalCode: null,
      province: null,
      city: null,
      street: null,
      number: null,
      contactPhone: null,
      indications: null,
    },
    paymentMethod: null,
    cardInfo: {
      type: null,
      installments: null,
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
  test(vistaNumber) {
    if (document.getElementById("payment") != null) {
      this.close();
      this.open();
    } else {
      this.open();
    }
    this.data = {
      deliveryMethod: "domicilio",
      homeDeliveryInfo: {
        fullName: "Juan Perez",
        postalCode: "5196",
        province: "Cordoba",
        city: "Santa Rosa",
        street: "San Martin",
        number: "546",
        contactPhone: "351123456",
        indications: "Casa de rejas negras",
      },
      paymentMethod: "credito",
      cardInfo: {
        type: "credito",
        installments: "1",
        number: "413246557",
        name: "juan perez",
        securityCode: "123",
        expiryDate: "05/2024",
        dni: "30495561",
      },
    };
    switch (vistaNumber) {
      case 1:
        this.openChooseDeliveryMethod();
        break;
      case 2:
        this.openHomeDelivery();
        break;
      case 3:
        this.openConfirmHomeDelivery();
        break;
      case 4:
        this.openPaymentMethod();
        break;
      case 5:
        this.openEnterPaymentMethodInformation();
        break;
      case 6:
        this.openSelectCreditCardInstallments();
        break;
      case 7:
        this.openConfirmPurchase();
        break;
      case 8:
        this.openThankYou();
        break;
      default:
        break;
    }
  },
};
