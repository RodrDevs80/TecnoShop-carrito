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
};
