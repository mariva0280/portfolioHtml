// HACIENDO LAS VERIFICACIONES DE LOS INPUTS TYPE TEXT
function capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}
const inputsVal = {
    required: {
        msg:"Campo obligatorio",
        testeando: (entrada) => !entrada.trim()
    },
    lengthmin: {
        msg:"Insertar tres caracteres o más",
        testeando: (entrada) => entrada.trim().length < 3
    },
    noletters: {
        msg:"No se admiten letras",
        testeando: (entrada) => !/^[0-9]+$/.test(entrada)    
    },
    nonum :{
        msg:"No se admiten numeros",
        testeando: (entrada) => !/^[a-zA-Z]+$/.test(entrada)
    },
    lengthmax:{
        msg:"No se pueden insertar más de 12 digitos",
        testeando: (entrada) => entrada.trim().length > 12 || entrada.trim().length < 0
    },
    formatmail: {
        msg:"Insertar formato email",
        testeando: (entrada) => {
            const registro = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return !registro.test(entrada)
        }
    },
    textlimit: {
        msg:"No se admiten más de 300 caracteres",
        testeando: (entrada) => entrada.trim().length > 300
    }
}
// funcion para mostrar mensaje de alerta si tenemos algún error en los campos cuando le damos al boton enviar
function showErrorMessage() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea')
    for(const input of inputs) {
        const wrapControl = input.closest('.input-group')
        if(wrapControl.classList.contains('error')){
            alert("Por favor, complete todos los campos del formulario correctamente antes de enviarlo")
            return true
        }
    }
    return false
}
//seleccionamos el boton y le añadimos un evento de tipo click y si hay mensaje de error no haga la accion natural del boton que es la de enviar
const submitButton = document.querySelector('button[type="submit"]')
submitButton.addEventListener('click', (evento) =>{

    if(showErrorMessage()){
       evento.preventDefault()
    }
})


const changeInputs = (e) => {
    const elemento = e.target
    const valor = elemento.value
    if(elemento.type == 'text') {
        elemento.value = capitalizeFirstLetter(valor)
    }
    
    const wrapControl = elemento.closest('.input-group')
    const msgError = wrapControl.querySelectorAll('.msg-error')
    
    const validations = elemento.getAttribute('validations')?.split(' ')
    msgError?.forEach((mensaje)=> {
        mensaje.remove()
    })
    wrapControl.classList.remove('error')

    validations.forEach(validation => {
        const validationObj = inputsVal[validation]
        if(validationObj && validationObj.testeando(valor)){
            wrapControl.classList.add('error')
            const newErrorAlert = document.createElement('p')
            newErrorAlert.innerText = validationObj.msg
            newErrorAlert.classList.add('msg-error')
            const closeButton = document.createElement('span')
            closeButton.innerText = 'X'
            closeButton.classList.add('close-icon')
            closeButton.addEventListener('click', () => {
                wrapControl.removeChild(newErrorAlert)
            })
            newErrorAlert.appendChild(closeButton)
            wrapControl.append(newErrorAlert)
        }
    })
}

const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea')

inputs.forEach(element => {
    element.addEventListener('change', changeInputs)
})

// funcion para manejar el menu toggle

const menu = document.getElementById('menu')
const open = document.getElementById('toggle_open')
const close = document.getElementById('toggle_close')

open.addEventListener('click', toggleMenu)
close.addEventListener('click', toggleMenu)

function toggleMenu() {
    menu.classList.toggle('show-menu')

    if(menu.classList.contains('show-menu')) {
        open.style.display = 'none'
        close.style.display = 'block'
    } else {
        open.style.display = 'block'
        close.style.display = 'none'
    }
}