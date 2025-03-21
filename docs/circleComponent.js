export function createCircle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("No se encontró el contenedor: " + containerId);
        return () => ({ redPieces: 0, divisions: 0 });
    }

    // Crear un wrapper para el componente
    const wrapper = document.createElement("div");
    wrapper.className = "circle-wrapper";

    // Crear el contenedor para el deslizador de divisiones
    const divisionsContainer = document.createElement("div");
    divisionsContainer.className = "slider-container";

    const divisionsLabel = document.createElement("label");
    divisionsLabel.htmlFor = containerId + "_divisions";
    divisionsLabel.textContent = "Divisiones: ";
    // Span para mostrar el valor
    const divisionsValueSpan = document.createElement("span");
    divisionsValueSpan.id = containerId + "_divisionsValue";
    divisionsValueSpan.textContent = "1";
    divisionsLabel.appendChild(divisionsValueSpan);
    divisionsContainer.appendChild(divisionsLabel);
    divisionsContainer.appendChild(document.createElement("br"));

    const divisionsSlider = document.createElement("input");
    divisionsSlider.type = "range";
    divisionsSlider.id = containerId + "_divisions";
    divisionsSlider.min = "1";
    divisionsSlider.max = "10";
    divisionsSlider.value = "1";
    divisionsContainer.appendChild(divisionsSlider);
    wrapper.appendChild(divisionsContainer);

    // Crear el contenedor para el deslizador de piezas rojas
    const redPiecesContainer = document.createElement("div");
    redPiecesContainer.className = "slider-container";

    const redPiecesLabel = document.createElement("label");
    redPiecesLabel.htmlFor = containerId + "_redPieces";
    redPiecesLabel.textContent = "Piezas Rojas: ";
    const redPiecesValueSpan = document.createElement("span");
    redPiecesValueSpan.id = containerId + "_redPiecesValue";
    redPiecesValueSpan.textContent = "0";
    redPiecesLabel.appendChild(redPiecesValueSpan);
    redPiecesContainer.appendChild(redPiecesLabel);
    redPiecesContainer.appendChild(document.createElement("br"));

    const redPiecesSlider = document.createElement("input");
    redPiecesSlider.type = "range";
    redPiecesSlider.id = containerId + "_redPieces";
    redPiecesSlider.min = "0";
    redPiecesSlider.max = "0"; // Inicia en 0 ya que solo hay 1 división
    redPiecesSlider.value = "0";
    redPiecesContainer.appendChild(redPiecesSlider);
    wrapper.appendChild(redPiecesContainer);

    // Crear el canvas
    const canvas = document.createElement("canvas");
    canvas.id = containerId + "_canvas";
    canvas.width = 200;
    canvas.height = 200;
    wrapper.appendChild(canvas);

    // Agregar el componente al contenedor indicado
    container.appendChild(wrapper);

    // Obtener contexto del canvas
    const ctx = canvas.getContext("2d");

    // Función para dibujar el círculo y sus divisiones
    function drawCircleComponent() {
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 75;
        const divisions = parseInt(divisionsSlider.value);
        const redPieces = parseInt(redPiecesSlider.value);

        // Dibujar el contorno del círculo
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Si hay 1 división, es el círculo completo
        if (divisions === 1) {
            if (redPieces > 0) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
            }
        } else {
            const angleStep = (2 * Math.PI) / divisions;
            for (let i = 0; i < divisions; i++) {
                const startAngle = i * angleStep;
                const endAngle = startAngle + angleStep;
                // Colorear en rojo los primeros sectores según el slider
                if (i < redPieces) {
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.closePath();
                    ctx.fillStyle = "red";
                    ctx.fill();
                }
                // Dibujar la línea divisoria
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + radius * Math.cos(startAngle), centerY + radius * Math.sin(startAngle));
                ctx.stroke();
            }
        }
    }

    // Actualiza el deslizador de piezas rojas según las divisiones
    function updateRedPiecesSliderComponent() {
        const divisions = parseInt(divisionsSlider.value);
        redPiecesSlider.max = divisions;
        if (parseInt(redPiecesSlider.value) > divisions) {
            redPiecesSlider.value = divisions;
        }
        redPiecesValueSpan.textContent = redPiecesSlider.value;
    }

    // Eventos para mantener la coherencia y redibujar
    divisionsSlider.addEventListener("input", function () {
        divisionsValueSpan.textContent = divisionsSlider.value;
        updateRedPiecesSliderComponent();
        drawCircleComponent();
    });

    redPiecesSlider.addEventListener("input", function () {
        redPiecesValueSpan.textContent = redPiecesSlider.value;
        drawCircleComponent();
    });

    // Dibujo inicial
    drawCircleComponent();

    // Retornar función que devuelve la información actual
    return () => ({
        redPieces: parseInt(redPiecesSlider.value),
        divisions: parseInt(divisionsSlider.value)
    });
}
