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

    clientType: {
        typeName: string
    }
}

export default Client;
