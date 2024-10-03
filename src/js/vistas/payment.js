const payment = {
  open() {
    function removeBodyScroll() {
      document.body.style.overflow = "hidden";
    }
    removeBodyScroll();
    function setBackgroundOpacity() {
      const opacity = document.createElement("div");
      opacity.style.zIndex = 3;
      opacity.style.position = "absolute";
      opacity.style.left = "0px";
      opacity.style.bottom = "0px";
      opacity.classList.add("opacity");
      opacity.id = "opacity-payment";
      document.body.appendChild(opacity);
      document.body.style.overflow = "hidden";
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
    loading.style.width = "100px"
    loading.style.height = "100px"
    loading.style.zIndex = "5"
    loading.id = "payment-loading-skeleton"
    function removeLoading(){
        document.getElementById("payment-loading-skeleton").remove()
    }
    setTimeout(removeLoading,1000)

    document.getElementById("payment").appendChild(loading);
  },
};
