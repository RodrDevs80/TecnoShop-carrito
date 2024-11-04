//manejo del modal
const showModal = document.getElementById("mostrar-modal-boot");
const myModalBoot = document.getElementById("myModal-boot");
const cerrarBoot = document.querySelector(".close-modal-boot");

showModal.addEventListener("click", () => {
    myModalBoot.style.display = "block";
});
cerrarBoot.addEventListener("click", () => {
    myModalBoot.style.display = "none";
});
/**boot variables*/
const enviarSms = document.getElementById("enviar-sms");
const respuestaUser = document.getElementById("respuesta-user");
const chatBody = document.getElementById("chat-body");
let separador = 0;
let bandera = false;
let bandera2 = false;
const usuario = {
    nombre: "",
    celular: "",
    horarioLlamada: "",
};
//funciones
const primeraEntrada = () => {
    chat(
        chatBody,
        `<div class="message incoming"><p id="verde">Elige una de las opciones marcando el numero de la misma,(ejemplo -> ingresa: 1 -> si la opción es la primera )</p></div> `
    );
    chat(
        chatBody,
        `<div class="message incoming">
  <ol style="margin: 15px;">
  <li><p>Dudas frecuentes con tus compras</p></li>
  <li><p>Contactarte con un representante</p></li>
  </ol>
  </div> `
    );

    limpiar(respuestaUser);
    focalizar(respuestaUser);
};

const limpiar = (elemento) => {
    elemento.value = "";
};
const focalizar = (elemento) => {
    elemento.focus();
};
const alerta = (titulo, texto, icono, btn, show = true) => {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        showConfirmButton: show,
        confirmButtonText: btn != null ? btn : "Ok",
    });
};
const chat = (elemento, contenido) => {
    elemento.innerHTML += contenido;
};
const saliendo = () => {
    setTimeout(() => {
        alerta(
            "Llamada Programada!",
            `${usuario.nombre} se te llamara dentro de las 48hs al celular:${usuario.celular} en el horario de: ${usuario.horarioLlamada} horas`,
            "success",
            null,
            false
        );
    }, 1000);
};
const recargando = () => {
    setTimeout(() => {
        location.reload();
    }, 9000);
};

//principal
enviarSms.addEventListener("click", () => {
    if (separador == 0) {
        if (usuario.nombre.length == 0) {
            usuario.nombre = respuestaUser.value;
            chat(
                chatBody,
                `<div class="message outgoing"><p>${usuario.nombre}</p></div>`
            );
            limpiar(respuestaUser);
            chat(
                chatBody,
                `<div class="message incoming"><p>Hola ${usuario.nombre} 🖖, ingresa tu celular 📱: </p></div> `
            );
        } else {
            usuario.celular = "+54" + respuestaUser.value;
        }

        if (usuario.celular.length != 0) {
            chat(
                chatBody,
                `<div class="message outgoing"><p>${usuario.celular}</p></div>`
            );
            chat(
                chatBody,
                `<div class="message incoming"><p>Muchas gracias! , ${usuario.nombre}, puedo ayudarte en los siguientes temas:</p></div> `
            );
            primeraEntrada();
            separador++;
        }
    } else {
        let opcion = respuestaUser.value;
        if (separador == 1) {
            if (bandera) {
                switch (opcion) {
                    case "1":
                        chat(
                            chatBody,
                            `<div class="message outgoing"><p>${opcion}</p></div>`
                        );
                        chat(
                            chatBody,
                            `<div class="message incoming">
                      <p>Nos pondremos en contacto contigo en el horario de:</p>
                      <ul style="margin: 15px;">
                      <li><p>0.90 a 12.00</p></li>
                      </ul>
                      </div>`
                        );
                        usuario.horarioLlamada = "0.90 a 12.00";
                        saliendo();
                        recargando();
                        break;
                    case "2":
                        chat(
                            chatBody,
                            `<div class="message outgoing"><p>${opcion}</p></div>`
                        );
                        chat(
                            chatBody,
                            `<div class="message incoming">
                      <p>Nos pondremos en contacto contigo en el horario de:</p>
                      <ul style="margin: 15px;">
                      <li><p>13.00 a 17.00</p></li>
                      </ul>
                      </div>`
                        );
                        usuario.horarioLlamada = "13.00 a 17.00";
                        saliendo();
                        recargando();
                        break;
                    case "3":
                        chat(
                            chatBody,
                            `<div class="message outgoing"><p>${opcion}</p></div>`
                        );
                        chat(
                            chatBody,
                            `<div class="message incoming">
                      <p>Nos pondremos en contacto contigo en el horario de:</p>
                      <ul style="margin: 15px;">
                      <li><p>18.00 a 21.00</p></li>
                      </ul>
                      </div>`
                        );
                        usuario.horarioLlamada = "18.00 a 21.00";
                        saliendo();
                        recargando();
                        break;
                    default:
                        alerta("Dato no valido!!!", "Se ingreso una opcion no valida -> Reiniciando...", "error", null, false);
                        recargando();
                        break;
                }
            } else if (!isNaN(opcion) && Number(opcion) <= 2) {
                chat(chatBody, `<div class="message outgoing"><p>${opcion}</p></div>`);
                limpiar(respuestaUser);
                focalizar(respuestaUser);
                if (opcion == "1") {
                    chat(
                        chatBody,
                        `<div class="message incoming">
      <ol style="margin: 15px;">
      <li><p>Cómo pagar tu compra</p></li>
      <li><p>Cómo recibir o retirar el producto</p></li>
      <li><p>Cómo funciona mi beneficio de envíos gratis</p></li>
      </ol>
      <p>Elige una opcion del 1 al 3</p>
      </div> `
                    );
                    limpiar(respuestaUser);
                    focalizar(respuestaUser);
                } else {
                    if (!bandera2) {
                        chat(
                            chatBody,
                            `<div class="message incoming">
                            <p>Elige un franja Horaria para que te llamemos:</p>
                            <ol style="margin: 15px;">
                            <li><p>0.90 a 12.00</p></li>
                            <li><p>13.00 a 17.00</p></li>
                            <li><p>18.00 a 21.00</p></li>
                            </ol>
                            </div>`
                        );
                        bandera2 = true;
                    }
                    if (bandera2) {
                        bandera = true;
                    }
                }
                if (!bandera) {
                    separador++;
                }
            } else {
                limpiar(respuestaUser);
                focalizar(respuestaUser);
                alerta(
                    "Error!",
                    `Ingreso ${opcion}. Ingrese un opción valida : 1 o 2 `,
                    "error",
                    "Aceptar"
                );
            }
        } else if (separador == 2) {
            if (!isNaN(opcion) && Number(opcion) <= 3) {
                chat(chatBody, `<div class="message outgoing"><p>${opcion}</p></div>`);
                switch (opcion) {
                    case "1":
                        chat(
                            chatBody,
                            `<div class="message incoming">
               <p>
               Podés pagar con cualquiera de estos medios: Tarjetas de crédito, débito (Visa, MasterCard, American Express,Nativa,Naranja).Tu compra va a estar 100% protegida.
               Si el producto no es lo que esperabas, te devolveremos el dinero.
               </p>
               </div>`
                        );
                        chat(
                            chatBody,
                            `<div class="message incoming">
                <ol style="margin: 15px;">
                <li><p>Salir</p></li>
                <li><p>Realizar otra consulta</p></li>
                </ol>
                </div> `
                        );
                        limpiar(respuestaUser);
                        focalizar(respuestaUser);
                        separador++;
                        break;
                    case "2":
                        chat(
                            chatBody,
                            `<div class="message incoming">
              <p>Recibir el producto en mi casa</p>
              <ul style="margin: 15px;">
              <li><p>Podés recibir el producto en todo el país.</p></li>
              <li><p>Calculás el costo y tiempo de envío desde la publicación y luego pagás todo junto.</p></li>
              <li><p>Hacés el seguimiento del envío desde: <a href="https://www.correoargentino.com.ar/seguimiento-de-envios" target="_blank" rel="noopener noreferrer">Correo Argentino</a></p></li>
              </ul>
              <p>Retirar el producto en una sucursal de correo</p>
              <ul style="margin: 15px;">
              <li><p>Podés elegir la opción de retiro en sucursal de correo y te avisaremos cuando tu compra llegue a la sucursal que seleccionaste. Dependiendo de quien retire, necesitará presentar lo siguiente:</p>
              <ol style="margin: 15px;">
              <li><p>Si retira la persona designada, debe presentar su DNI y el código de seguimiento que figura en los mails de envío o en tu cuenta.</p></li>
              <li><p>También puede retirar cualquier mayor de edad, en caso de que la persona designada no pueda hacerlo</p></li>
              </ol>
              </li>
              </ul>
              </div>`
                        );
                        chat(
                            chatBody,
                            `<div class="message incoming">
              <ol style="margin: 15px;">
              <li><p>Salir</p></li>
              <li><p>Realizar otra consulta</p></li>
              </ol>
              </div> `
                        );
                        limpiar(respuestaUser);
                        focalizar(respuestaUser);
                        separador++;
                        break;
                    case "3":
                        chat(
                            chatBody,
                            `<div class="message incoming"><p>Podés encontrar envío gratis en muchos de productos nuevos desde $ 500 dolares. Para asegurarte que lo tengan, busca el camion celeste con la leyenda "FREE" en el detalle de la publicación.</p></div>`
                        );
                        chat(
                            chatBody,
                            `<div class="message incoming">
              <ol style="margin: 15px;">
              <li><p>Salir</p></li>
              <li><p>Realizar otra consulta</p></li>
              </ol>
              </div> `
                        );
                        limpiar(respuestaUser);
                        focalizar(respuestaUser);
                        separador++;
                        break;
                    default:
                        console.log("Se ingreso un opcion no valida");
                        break;
                }
            } else {
                alerta(
                    "Error!",
                    `Ingreso ${opcion}. Ingrese un opción valida : 1 a 3 `,
                    "error",
                    "Aceptar"
                );
            }
        } else {
            if (separador == 3) {
                if (opcion == "1") {
                    location.reload();
                } else {
                    limpiar(chatBody);
                    focalizar(chatBody);
                    primeraEntrada();
                    separador = 1;
                }
            }
        }
    }
});
