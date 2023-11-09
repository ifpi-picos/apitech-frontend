
export type HiveDTO = {
    id: number, 
    numero: number, 
    apiarioId: number
    estadoCriaNova?: {
        localizada: number
        quantidade?: number
        estado?: number
    }
    estadoCriaMadura?: {
        localizada: number
        quantidade?: number
        estado?: number
    }
    estadoMel?: {
        localizada: number
        quantidade?: number
        estado?: number
    }
    estadoPolen?: {
        localizada: number
        quantidade?: number
    }
    estadoRainha?: {
        localizada: number
        estado?: number
        aspecto?: number
    }
}