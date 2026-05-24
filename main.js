document.addEventListener('DOMContentLoaded', () => {
    const botonSello = document.getElementById('boton-sello');
    if (botonSello) {
        botonSello.addEventListener('click', () => {
            document.querySelector('.contenedor-sello').classList.add('oculto');
            setTimeout(() => {
                document.querySelector('.puerta-izq').classList.add('abierta');
                document.querySelector('.puerta-der').classList.add('abierta');
            }, 800);
            setTimeout(() => {
                document.getElementById('pantalla-entrada').style.display = 'none';
            }, 2500); 
        });
    }

    const audioFondo = document.getElementById('audio-fondo');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const barraProgreso = document.getElementById('barra-progreso');

    if (btnPlayPause && audioFondo) {
        btnPlayPause.addEventListener('click', () => {
            if (audioFondo.paused) {
                audioFondo.play();
                document.getElementById('icono-play').style.display = 'none';
                document.getElementById('icono-pause').style.display = 'block';
            } else {
                audioFondo.pause();
                document.getElementById('icono-pause').style.display = 'none';
                document.getElementById('icono-play').style.display = 'block';
            }
        });

        document.getElementById('btn-adelantar').addEventListener('click', () => audioFondo.currentTime += 10);
        document.getElementById('btn-retroceder').addEventListener('click', () => audioFondo.currentTime -= 10);

        audioFondo.addEventListener('timeupdate', () => {
            if (!isNaN(audioFondo.duration)) {
                const porcentaje = (audioFondo.currentTime / audioFondo.duration) * 100;
                barraProgreso.value = porcentaje;
                barraProgreso.style.background = `linear-gradient(to right, #C39F57 ${porcentaje}%, rgba(195, 159, 87, 0.3) ${porcentaje}%)`;
            }
        });

        barraProgreso.addEventListener('input', () => {
            audioFondo.currentTime = (barraProgreso.value / 100) * audioFondo.duration;
        });
    }

    const fechaMeta = new Date("Jul 03, 2026 17:00:00").getTime();
    const actualizarContador = setInterval(() => {
        const ahora = new Date().getTime();
        const dist = fechaMeta - ahora;

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");

        if (elDias && elHoras && elMinutos && elSegundos) {
            elDias.innerHTML = Math.floor(dist / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            elHoras.innerHTML = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            elMinutos.innerHTML = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            elSegundos.innerHTML = Math.floor((dist % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }

        if (dist < 0) {
            clearInterval(actualizarContador);
            if (elDias) elDias.innerHTML = "00";
            if (elHoras) elHoras.innerHTML = "00";
            if (elMinutos) elMinutos.innerHTML = "00";
            if (elSegundos) elSegundos.innerHTML = "00";
        }
    }, 1000);

    const btnCalendario = document.querySelector('.btn-calendario');
    if (btnCalendario) {
        btnCalendario.addEventListener('click', (e) => {
            e.preventDefault();
            const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Mis XV Años | Andrea\nDTSTART:20260703T170000\nDTEND:20260704T020000\nDESCRIPTION:¡Te invito a celebrar mis XV años! No faltes.\nLOCATION:Iglesia Capilla de Guadalupe / Salón Millan\nEND:VEVENT\nEND:VCALENDAR`;
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Mis_XV_Andrea.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});

const btnSubir = document.getElementById('btn-subir');
    
    if (btnSubir) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnSubir.classList.add('mostrar');
            } else {
                btnSubir.classList.remove('mostrar');
            }
        });

        btnSubir.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }