

enum CriaLocalizada {
    'NÃO',
    'SIM',
    'VERIFICAÇÃO NÃO POSSIVEL',
    'NÃO HAVIA CRIA'
}

enum QuantidadeCria {
    'SEM CRIA',
    'POUCA CRIA',
    'MUITA CRIA'
}

enum EstadoCriaNova {
    'CRIA EM OVOS',
    'CRIA EM PUPAS',
    'CRIA EM OVOS E PUPAS',
}

enum EstadoCriaMadura {
    'CRIA MADURA ESCURAS',
    'CRIA MADURA CLARAS',
    'CRIA MADURA ESCURAS E CLARAS',
}

enum MelLocalizado {
    'NÃO',
    'SIM',
    'VERIFICAÇÃO NÃO POSSIVEL',  
    'NÃO HAVIA MEL'
}

enum QuantidadeMel {
    'SEM MEL',
    'POUCO MEL',
    'MUITO MEL',
}

enum EstadoMel {
    'MEL MADURO',
    'MEL VERDE',
    'MEL MADURO E VERDE',
}

enum PolenLocalizado {
    'NÃO',
    'SIM',
    'VERIFICAÇÃO NÃO POSSIVEL',
    'NÃO HAVIA POLEN'
}

enum QuantidadePolen {
    'SEM POLEN',
    'POUCO POLEN',
    'MUITO POLEN',
}

enum RainhaLocalizada {
    'NÃO',
    'SIM',
    'VERIFICAÇÃO NÃO POSSIVEL',
    'NÃO HAVIA RAINHA'
}

enum EstadoRainha {
    'RAINHA COM IDADE CONHECIDA',
    'RAINHA COM IDADE DESCONHECIDA',
}

enum AspectoRainha {
    'RAINHA JOVEM SAUDÁVEL',
    'RAINHA JOVEM ASPECTO MEDIANO',
    'RAINHA VELHA NÃO SAUDÁVEL',
}

export type ColmeiaPreModificacao = {
    estadoCriaNova?: {
        localizada?: CriaLocalizada
        quantidade?: QuantidadeCria
        estado?: EstadoCriaNova
    }
    estadoCriaMadura?: {
        localizada?: CriaLocalizada
        quantidade?: QuantidadeCria
        estado?: EstadoCriaMadura
    }
    estadoMel?: {
        localizada?: MelLocalizado
        quantidade?: QuantidadeMel
        estado?: EstadoMel
    }
    estadoPolen?: {
        localizada?: PolenLocalizado
        quantidade?: QuantidadePolen
    }
    estadoRainha?: {
        localizada?: RainhaLocalizada
        estado?: EstadoRainha
        aspecto?: AspectoRainha
    }
}
export type HiveDTO = {
    id: number, 
    numero: number, 
    apiarioId: number
    estadoCriaNova?: {
        localizada?: CriaLocalizada
        quantidade?: QuantidadeCria
        estado?: EstadoCriaNova
    }
    estadoCriaMadura?: {
        localizada?: CriaLocalizada
        quantidade?: QuantidadeCria
        estado?: EstadoCriaMadura
    }
    estadoMel?: {
        localizada?: MelLocalizado
        quantidade?: QuantidadeMel
        estado?: EstadoMel
    }
    estadoPolen?: {
        localizada?: PolenLocalizado
        quantidade?: QuantidadePolen
    }
    estadoRainha?: {
        localizada?: RainhaLocalizada
        estado?: EstadoRainha
        aspecto?: AspectoRainha
    }
}

export type ColmeiaPreCadastro = {
    id: number, 
    numero: number, 
    apiarioId: number
    
}
