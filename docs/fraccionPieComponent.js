import { createCircle } from './circleComponent.js';
export function fraccionPie(parentId, numerator, denominator) {
    const parent = document.getElementById(parentId);
    if (!parent) {
        console.error(`No se encontró el contenedor con ID "${parentId}"`);
        return;
    }

    // Crear el contenedor del par (fracción + círculo + botón)
    const pairDiv = document.createElement('div');
    pairDiv.className = 'pair';

    // Crear el bloque de fracción en formato matemático
    const fractionDiv = document.createElement('div');
    fractionDiv.className = 'fraction';

    const numeratorSpan = document.createElement('span');
    numeratorSpan.className = 'numerator';
    numeratorSpan.textContent = numerator;

    const fractionLine = document.createElement('div');
    fractionLine.className = 'fraction-line';

    const denominatorSpan = document.createElement('span');
    denominatorSpan.className = 'denominator';
    denominatorSpan.textContent = denominator;

    fractionDiv.appendChild(numeratorSpan);
    fractionDiv.appendChild(fractionLine);
    fractionDiv.appendChild(denominatorSpan);

    // Crear un contenedor para el círculo
    const circleContainer = document.createElement('div');
    circleContainer.className = 'circle-wrapper';

    // Generar un ID único para el canvas/círculo
    const uniqueId = `circle_${parentId}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    circleContainer.id = uniqueId;

    // Botón para comprobar fracción
    const checkButton = document.createElement('button');
    checkButton.textContent = 'comprobar fraccion';
    const divButton = document.createElement('div');
    divButton.appendChild(checkButton);

    // Agregar los elementos al contenedor principal "pair"
    pairDiv.appendChild(fractionDiv);
    pairDiv.appendChild(circleContainer);
    pairDiv.appendChild(divButton);

    // Insertar el "pair" en el contenedor padre
    parent.appendChild(pairDiv);

    // Inicializar el círculo con la función createCircle
    // Devuelve una función "getInfo" que te permite obtener { redPieces, divisions }
    const getInfo = createCircle(uniqueId);

    // Manejo del evento al pulsar "comprobar fraccion"
    checkButton.addEventListener('click', () => {
        const { redPieces, divisions } = getInfo();
        // Comparar con los valores esperados
        if (divisions === denominator && redPieces === numerator) {
            checkButton.textContent = '¡Correcto!';
            checkButton.style.backgroundColor = '#4CAF50';
            checkButton.style.color = 'white';
        } else {
            checkButton.textContent = 'Incorrecto, intenta de nuevo';
            checkButton.style.backgroundColor = '#f44336';
            checkButton.style.color = 'white';
        }
    });
}
