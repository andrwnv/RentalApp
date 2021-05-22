import { Sequelize, DataTypes } from 'sequelize';

const Connection = new Sequelize(
    'coursework_db',
    'postgres',
    '852456',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        logging: false
    },
);

const TablesName = {
    Client: 'clients',
    ClientType: 'clientType',
    PlannedTrips: 'clientPlannedTrips',
    ObjectReview: 'objectReview',
    ClientReview: 'clientReview',
    BookedObject: 'bookedObject',
    UserBookedHistory: 'userBookedHistory',
    RentedObject: 'rentedObject',
    UserRentalHistory: 'userRentalHistory',
    Object: 'object',
    ObjectType: 'objectType',
    AdditionalComfort: 'additionalComfort',
    Street: 'street',
    Country: 'country',
    Locality: 'locality',
    LocalityType: 'localityType',
    Report: 'reports',
    ReportReasons: 'reportReasons'
};


/* @brief: Data base tables. */

const Client = Connection.define(TablesName.Client, {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDay: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    eMail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    confirmHash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    eMailConfirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    photoLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    banned: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

const ClientType = Connection.define(TablesName.ClientType, {
    typeName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const PlannedTrips = Connection.define(TablesName.PlannedTrips, {
    beginDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    priceFrom: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceTo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requireRatingFrom: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requireRatingTo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comfortProps: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

const ObjectReview = Connection.define(TablesName.ObjectReview, {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const ClientReview = Connection.define(TablesName.ClientReview, {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const BookedObject = Connection.define(TablesName.BookedObject, {
    beginDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

const UserBookedHistory = Connection.define(TablesName.UserBookedHistory, {
    beginDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const RentedObject = Connection.define(TablesName.RentedObject, {
    beginDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

const UserRentalHistory = Connection.define(TablesName.UserRentalHistory, {
    beginDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const RentalObject = Connection.define(TablesName.Object, {
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    comfortProps: {
        type: DataTypes.JSON,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    mediaLinks: {
        type: DataTypes.JSON,
        allowNull: false
    },
    createMediaDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updateMediaDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    houseNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buildingTowerNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    apartmentNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    additionalComfortProps: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

const RentalObjectType = Connection.define(TablesName.ObjectType, {
    typeName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const AdditionalComfort = Connection.define(TablesName.AdditionalComfort, {
    nameOfComfort: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

const Street = Connection.define(TablesName.Street, {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Country = Connection.define(TablesName.Country, {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Locality = Connection.define(TablesName.Locality, {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const LocalityType = Connection.define(TablesName.LocalityType, {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Report = Connection.define(TablesName.Report, {});

const ReportReason = Connection.define(TablesName.ReportReasons, {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


/* @brief: Data base tables foreign keys. */

Client.belongsTo(ClientType, {
    foreignKey: {
        name: 'FK_clientType',
        allowNull: false
    }
});

PlannedTrips.belongsTo(Client, {
    foreignKey: {
        name: 'FK_client',
        allowNull: false
    }
});

ObjectReview.belongsTo(Client, {
    foreignKey: {
        name: 'FK_client',
        allowNull: false
    }
});

ObjectReview.belongsTo(RentalObject, {
    foreignKey: {
        name: 'FK_object',
        allowNull: false
    }
});

ClientReview.belongsTo(Client, {
    foreignKey: {
        name: 'FK_landLord',
        allowNull: false
    }
});

ClientReview.belongsTo(Client, {
    foreignKey: {
        name: 'FK_client',
        allowNull: false
    }
});

BookedObject.belongsTo(Client, {
    foreignKey: {
        name: 'FK_client',
        allowNull: false
    }
});

BookedObject.belongsTo(RentalObject, {
    foreignKey: {
        name: 'FK_object',
        allowNull: false
    }
});

UserBookedHistory.belongsTo(Client, {
    foreignKey: {
        name: 'FK_client',
        allowNull: false
    }
});

UserBookedHistory.belongsTo(RentalObject, {
    foreignKey: {
        name: 'FK_object',
        allowNull: false
    }
});

RentedObject.belongsTo(Client, {
    foreignKey: {
        name: 'FK_client',
        allowNull: false
    }
});

RentedObject.belongsTo(RentalObject, {
    foreignKey: {
        name: 'FK_object',
        allowNull: false
    }
});

UserRentalHistory.belongsTo(RentalObject, {
    foreignKey: {
        name: 'FK_object',
        allowNull: false
    }
});

RentalObject.belongsTo(Client, {
    foreignKey: {
        name: 'FK_landLord',
        allowNull: false
    }
});

RentalObject.belongsTo(Country, {
    foreignKey: {
        name: 'FK_country',
        allowNull: false
    }
});

RentalObject.belongsTo(Locality, {
    foreignKey: {
        name: 'FK_locality',
        allowNull: false
    }
});

RentalObject.belongsTo(LocalityType, {
    foreignKey: {
        name: 'FK_localityType',
        allowNull: false
    }
});

RentalObject.belongsTo(Street, {
    foreignKey: {
        name: 'FK_street',
        allowNull: false
    }
});

RentalObject.belongsTo(RentalObjectType, {
    foreignKey: {
        name: 'FK_objectType',
        allowNull: false
    }
});

AdditionalComfort.belongsTo(BookedObject, {
    foreignKey: {
        name: 'FK_bookingObject',
        allowNull: false
    }
});

AdditionalComfort.belongsTo(RentedObject, {
    foreignKey: {
        name: 'FK_rentObject',
        allowNull: false
    }
});

Report.belongsTo(Client, {
    foreignKey: {
        name: 'FK_client',
        allowNull: false
    }
});

Report.belongsTo(ReportReason, {
    foreignKey: {
        name: 'FK_reason',
        allowNull: false
    }
});

Report.belongsTo(ClientReview, {
    foreignKey: {
        name: 'FK_clientReview',
        allowNull: true
    }
});

Report.belongsTo(ObjectReview, {
    foreignKey: {
        name: 'FK_objectReview',
        allowNull: true
    }
});

export default Connection;
