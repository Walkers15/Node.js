module.exports = (sequelize, DataTypes)=>{
    sequelize.define('auction',{
        bid: {//입찰가
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        msg:{
            type: DataTypes.STRING(100),//입찰 당 메시지는 100글자로 제한
            allowNull: true,
        },
    },{
        timestamps: true,
        paranoid: true.,
    })
};