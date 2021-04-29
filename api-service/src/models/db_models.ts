import { Sequelize, DataTypes } from 'sequelize';

const Connection = new Sequelize(
    'relay',
    'postgres',
    'postgres',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
);

const TablesName = {
    Client: 'client', // *
    ClientType: 'clientType', // *
    PlannedTrips: 'clientPlannedTrips', // *
    ObjectReview: 'objectReview', // *
    ClientReview: 'clientReview', // *
    BookedObject: 'bookedObject', // *
    UserBookedHistory: 'userBookedHistory', // *
    RentedObject: 'rentedObject', // *
    UserRentalHistory: 'userRentalHistory', // *
    Object: 'object', // *
    ObjectType: 'objectType', // *
    AdditionalComfort: 'additionalComfort', // *
    Street: 'street', // *
    Country: 'country', // *
    Locality: 'locality', // *
    LocalityType: 'localityType' // *
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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requireRating: {
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

const Object = Connection.define(TablesName.Object, {
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
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mediaLinks: {
        type: DataTypes.JSON,
        allowNull: false
    },
    createMediaDate: {
        type: DataTypes.DATE,
        allowNull:false
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
    }
});

const ObjectType = Connection.define(TablesName.ObjectType, {
    typeName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const AdditionalComfort  = Connection.define(TablesName.AdditionalComfort , {
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

const Street = Connection.define(TablesName.Street , {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Country = Connection.define(TablesName.Country , {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Locality = Connection.define(TablesName.Locality , {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const LocalityType = Connection.define(TablesName.LocalityType , {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


/* @brief: Data base tables foreign keys. */

Client.belongsTo(ClientType, {foreignKey: 'FK_clientType'});

PlannedTrips.belongsTo(Client, {foreignKey: 'FK_client'});

ObjectReview.belongsTo(Client, {foreignKey: 'FK_client'});
ObjectReview.belongsTo(Object, {foreignKey: 'FK_object'});

ClientReview.belongsTo(Client, {foreignKey: 'FK_landLord'});
ClientReview.belongsTo(Client, {foreignKey: 'FK_client'});

BookedObject.belongsTo(Client, {foreignKey: 'FK_client'});
BookedObject.belongsTo(Object, {foreignKey: 'FK_object'});

UserBookedHistory.belongsTo(Client, {foreignKey: 'FK_client'});
UserBookedHistory.belongsTo(Object, {foreignKey: 'FK_object'});

RentedObject.belongsTo(Client, {foreignKey: 'FK_client'});
RentedObject.belongsTo(Object, {foreignKey: 'FK_object'});

UserRentalHistory.belongsTo(Object, {foreignKey: 'FK_object'});

Object.belongsTo(Client, {foreignKey: 'FK_landLord'});
Object.belongsTo(Country, {foreignKey: 'FK_country'});
Object.belongsTo(Locality, {foreignKey: 'FK_locality'});
Object.belongsTo(LocalityType, {foreignKey: 'FK_localityType'});
Object.belongsTo(Street, {foreignKey: 'FK_street'});
Object.belongsTo(ObjectType, {foreignKey: 'FK_objectType'});

AdditionalComfort.belongsTo(BookedObject, {foreignKey: 'FK_bookingObject'});
AdditionalComfort.belongsTo(RentedObject, {foreignKey: 'FK_rentObject'});

export default Connection;
