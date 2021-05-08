export interface ClientType {
    typeName: string
}

interface Client {
    id: number,
    firstName: string,
    middleName?: string,
    lastName: string,
    phoneNumber: string,
    eMail: string,
    eMailConfirmed?: boolean,
    photoLink: string,
    rating: number,

    clientType: ClientType
}

export default Client;
