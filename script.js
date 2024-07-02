var currentTab = 0;
var forms = document.getElementsByClassName("question-form");
var progressBar = document.querySelector(".progress-bar");

showCurrentForm();

function showCurrentForm() {
    // Oculta todos los formularios
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = "none";
    }
    // Muestra el formulario actual
    forms[currentTab].style.display = "block";
    updateProgress();
}

function nextPrev(n) {
    var x = document.getElementsByClassName("question-form");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("enviarBtn").style.display = "block";
        document.querySelector(".progress-bar").innerText = "Completo";
        return false;
    }
    x[currentTab].style.display = "block"; // Aseguramos que el siguiente formulario se muestre
    updateProgress();
}

function validateForm() {
    var questions = forms[currentTab].getElementsByClassName("question");
    var todasNunca = true;

    for (var i = 0; i < questions.length; i++) {
        var select = questions[i].getElementsByTagName("select")[0];
        if (select.value !== "1") {
            todasNunca = false;
            break;
        }
    }

    if (todasNunca) {
        alert("No puedes avanzar si todas tus respuestas son 'Nunca'.");
        return false;
    }

    return true;
}

function updateProgress() {
    var percent = (currentTab + 1) / forms.length * 100;
    progressBar.style.width = percent + "%";
    progressBar.innerText = percent.toFixed(0) + "%";
}

function calcularPuntuacion() {
    var todasNunca = true;

    for (var i = 0; i < forms.length; i++) {
        var questions = forms[i].getElementsByClassName("question");
        for (var j = 0; j < questions.length; j++) {
            var select = questions[j].querySelector('select');
            if (select.value !== "1") {
                todasNunca = false;
                break;
            }
        }
        if (!todasNunca) {
            break;
        }
    }

    if (todasNunca) {
        alert("No puedes calcular la puntuación si todas tus respuestas son 'Nunca'.");
        return null;
    }

    var totalPuntos = 0;
    for (var i = 0; i < forms.length; i++) {
        var questions = forms[i].getElementsByClassName("question");
        for (var j = 0; j < questions.length; j++) {
            var select = questions[j].querySelector('select');
            totalPuntos += parseInt(select.value);
        }
    }

    return totalPuntos;
}

function enviarPuntuacion() {
    var totalPuntos = calcularPuntuacion();

    if (totalPuntos !== null) {
        if (totalPuntos >= 0 && totalPuntos <= 50) {
            window.location.href = 'mensaje.html?mensaje=Nivel%20Básico';
        } else if (totalPuntos > 50 && totalPuntos <= 70) {
            window.location.href = 'mensaje.html?mensaje=Nivel%20Intermedio';
        } else if (totalPuntos > 70 && totalPuntos <= 90) {
            window.location.href = 'mensaje.html?mensaje=Nivel%20Avanzado';
        } else if (totalPuntos > 90 && totalPuntos <= 100) {
            window.location.href = 'mensaje.html?mensaje=Nivel%20Experto';
        }
    }
}
