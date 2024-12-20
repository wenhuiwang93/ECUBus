



export interface LinDevice {
    label: string
    id: string
    handle: any
    busy?: boolean
}


export enum LinDirection {
    SEND,
    RECV,
    RECV_AUTO_LEN
}

export enum LinMode {
    MASTER,
    SLAVE
}


export enum LinChecksumType {
    CLASSIC,
    ENHANCED
}



export enum LIN_ERROR_ID {
    LIN_BUS_ERROR,
    LIN_READ_TIMEOUT,
    LIN_BUS_BUSY,
    LIN_BUS_CLOSED,
    LIN_INTERNAL_ERROR,
    LIN_PARAM_ERROR,
}

const linErrorMap: Record<LIN_ERROR_ID, string> = {
    [LIN_ERROR_ID.LIN_BUS_ERROR]: 'bus error',
    [LIN_ERROR_ID.LIN_READ_TIMEOUT]: 'read timeout',
    [LIN_ERROR_ID.LIN_BUS_BUSY]: 'bus busy',
    [LIN_ERROR_ID.LIN_INTERNAL_ERROR]: 'dll lib internal error',
    [LIN_ERROR_ID.LIN_BUS_CLOSED]: 'bus closed',
    [LIN_ERROR_ID.LIN_PARAM_ERROR]: 'param error'

}

export interface LinMsg{
    frameId:number
    data:Buffer
    direction:LinDirection
    checksumType:LinChecksumType
    checksum?:number
    ts?:number
}

export class LinError extends Error {
    errorId: LIN_ERROR_ID
    msgType?: LinMsg
   
    constructor(errorId: LIN_ERROR_ID, msg?:LinMsg, extMsg?: string) {
        super(linErrorMap[errorId] + (extMsg ? `,${extMsg}` : ''));
        this.errorId = errorId;
        this.msgType = msg
    
    }
}

const LinPidTable =
[
    0x80, 0xC1, 0x42, 0x03, 0xC4, 0x85, 0x06, 0x47,
    0x08, 0x49, 0xCA, 0x8B, 0x4C, 0x0D, 0x8E, 0xCF,
    0x50, 0x11, 0x92, 0xD3, 0x14, 0x55, 0xD6, 0x97,
    0xD8, 0x99, 0x1A, 0x5B, 0x9C, 0xDD, 0x5E, 0x1F,
    0x20, 0x61, 0xE2, 0xA3, 0x64, 0x25, 0xA6, 0xE7,
    0xA8, 0xE9, 0x6A, 0x2B, 0xEC, 0xAD, 0x2E, 0x6F,
    0xF0, 0xB1, 0x32, 0x73, 0xB4, 0xF5, 0x76, 0x37,
    0x78, 0x39, 0xBA, 0xFB, 0x3C, 0x7D, 0xFE, 0xBF
]

export function getPID(frameId:number){
    return LinPidTable[frameId]
}