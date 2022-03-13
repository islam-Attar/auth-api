'use strict';


const Movies =  (sequelize, DataTypes) => sequelize.define('movies', {
            movieName:{
                type: DataTypes.STRING,
                allowNull: false
            },
            releaseDate:{
                type: DataTypes.STRING,
            }
});

module.exports = Movies ;