const fs = require('fs')

const random = () => Math.random()

const calcularIA = () => {
    let r = random()
    return 10
}

const calcularTP = {
    SUSHI: () => {
        // COMPLETAR
        return 0
    },
    PLATO_CALIENTE: () => {
        // COMPLETAR
        return 0
    },
    ENSALADA: () => {
        // COMPLETAR
        return 0
    },
}

const obtenerMenorTC = (array) => {
    let menor = Number.MAX_VALUE, i = -1
    array.forEach((element, index) => {
        if (element < menor) {
            menor = element,
            i = index
        }
    });
    return i
}


// CONDICIONES INICIALES

let TIEMPO = 0, TIEMPOFINAL = 0
let TPLL = 0
let IA

//CANTIDAD DE COCINEROS POR TIPO DE PLATO
const SUSHI = 1, PLATO_CALIENTE = 2, ENSALADA = 2

// TIEMPOS COMPROMETIDO
let TCE = new Array(ENSALADA), 
    TCPC = new Array(PLATO_CALIENTE), 
    TCSH = new Array(SUSHI)

// INICIALIZAR VALORES DEL ARRAY EN 0
TCE.fill(0, 0)
TCPC.fill(0, 0)
TCSH.fill(0, 0)

// NUMERO DE ELEMENTOS POR CADA TIPO DE PLATO
let NE = 0, NPC = 0, NSH = 0

// SUMATORIA DE TIEMPO ESPERA POR CADA TIPO DE PLATO
let STEE = 0, STEPC = 0, STESH = 0

// SUMATORIAS DE TIEMPO OCIOSO POR CADA TIPO DE PLATO
let STOE = 0, STOPC = 0, STOSH = 0

// SUMATORIA DE PERMANENCIA EN EL SISTEMA POR CADA TIPO DE PLATO
let SPS = 0

while(true) {

    TIEMPO = TPLL

    IA = calcularIA()

    TPLL = TIEMPO + IA

    let r = random()
    let i
    let Tprep   // TIEMPO DE PREPARACION DEL PLATO

    if (r <= 0.25) {    // CASO DE ENSALADA

        i = obtenerMenorTC(TCE)
        Tprep = calcularTP.SUSHI()

        if (TIEMPO <= TCE[i]) {
            STEE += TCE[i] - TIEMPO
            TCE[i] = TCE[i] + Tprep
        } else {
            STOE += TIEMPO - TCE[i]
            TCE[i] = TIEMPO + Tprep
        }

        NE++
        SPS += TCE[i] - TIEMPO

    } else if (r <= 0.63) {     // CASO DE PLATO CALIENTE

        i = obtenerMenorTC(TCPC)
        Tprep = calcularTP.PLATO_CALIENTE()

        if (TIEMPO <= TCPC[i]) {
            STEPC += TCPC[i] - TIEMPO
            TCPC[i] = TCPC[i] + Tprep
        } else {
            STOPC += TIEMPO - TCPC[i]
            TCPC[i] = TIEMPO + Tprep
        }

        NPC++
        SPS += TCPC[i] - TIEMPO

    } else {    // CASO DE SUSHI

        i = obtenerMenorTC(TCSH)
        Tprep = calcularTP.ENSALADA()

        if (TIEMPO <= TCSH[i]) {
            STESH += TCSH[i] - TIEMPO
            TCSH[i] = TCSH[i] + Tprep
        } else {
            STOSH += T - TCSH[i]
            TCSH[i] = T + Tprep
        }

        NSH++
        SPS += TCSH[i] - TIEMPO

    }

    if (TIEMPO <= TIEMPOFINAL) break;
}

const resultados = {
    FECHA: Date.now().toLocaleString,
    PROMEDIO_DE_PERMANENCIA_EN_EL_SISTEMA: SPS / (NPC + NE + NSH),
    PLATO_CALIENTE : {
        PROMEDIO_DE_ESPERA_EN_COLA: STEPC / NPC,
        PORCENTAJE_DE_TIEMPO_OCIOSO: (STOPC * 100) / TIEMPO
    },
    ENSALADA: {
        PROMEDIO_DE_ESPERA_EN_COLA: STEE / NE,
        PORCENTAJE_DE_TIEMPO_OCIOSO: (STOE * 100) / TIEMPO
    },
    SUSHI: {
        PROMEDIO_DE_ESPERA_EN_COLA: STESH / NSH,
        PORCENTAJE_DE_TIEMPO_OCIOSO: (STOSH * 100) / TIEMPO
    },
    VARIABLES: {
        CANTIDAD_EMPLEADOS: {
            SUSHI,
            PLATO_CALIENTE,
            ENSALADA
        },
        CANTIDAD_DE_CLIENTES: {
            SUSHI: NSH,
            PLATO_CALIENTE: NPC,
            ENSALADA: NE
        },
        CANTIDAD_DE_CLIENTES: {
            SUSHI: NSH,
            PLATO_CALIENTE: NPC,
            ENSALADA: NE
        },
        TIEMPO_OCIOSO_TOTAL: {
            SUSHI: STOSH,
            PLATO_CALIENTE: STOPC,
            ENSALADA: STOE
        },
        TIEMPO_ESPERA_TOTAL: {
            SUSHI: STESH,
            PLATO_CALIENTE: STEPC,
            ENSALADA: STEE
        },
    }
}


// GUARDAR LA INFORMACION
const file = fs.readFileSync('./resultados.json')
const jsonFile = JSON.parse(file)
jsonFile.push(resultados)
fs.writeFileSync('./resultados.json', JSON.stringify(jsonFile))

console.log('FIN DE LA SIMULACION')
