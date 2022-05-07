const tipoComida = {
    SUSHI: 'SUSHI',
    CALIENTE: 'CALIENTE',
    ENSALDA: 'ENSALADA'
}

const TC = {
    SUSHI: [],
    CALIENTE: [],
    ENSALADA: []
}

const STO = {
    SUSHI: 0,
    CALIENTE: 0,
    ENSALDA: 0
}

const STE = {
    SUSHI: 0,
    CALIENTE: 0,
    ENSALDA: 0
}

const SPS = {
    SUSHI: 0,
    CALIENTE: 0,
    ENSALDA: 0
}

const NS = {
    SUSHI: 0,
    CALIENTE: 0,
    ENSALDA: 0
}

const calcularIA = () => 10

const calcularTA = {
    SUSHI: () => 10,
    CALIENTE: () => 13,
    FRIO: () => 15
}

const determinarPedido = () => tipoComida.SUSHI || tipoComida.CALIENTE || tipoComida.ENSALDA

const horasTrabajo = 8
const empleadosSushi = 1
const empleadosCaliente = 2
const empleadosEnsalada = 2

let TIEMPO = 0, TIEMPO_FINAL = 60 * horasTrabajo
let TPLL = 0
let IA, TA

let auxTC

while (true) {
    TIEMPO = TIEMPO_FINAL
    IA = calcularIA()
    TPLL = TIEMPO + IA
    tipoPedido = determinarPedido()
    TA = calcularTA[tipoPedido]()
    puestoAtencion = elejirMenorTC(TC[tipoComida])

    auxTC = TC[tipoPedido][puestoAtencion]

    if (auxTC <= TIEMPO) {
        STO[tipoPedido] += TIEMPO - auxTC
        auxTC = TIEMPO + TA

    } else {
        STE[tipoPedido] += auxTC - TIEMPO
        auxTC = auxTC + TA
    }

    SPS += auxTC - TIEMPO
    TC[tipoPedido][puestoAtencion] = auxTC

    if (TIEMPO > TIEMPO_FINAL) break;
}

