import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/connection/connection';

export class Client extends Model{
    public name!: string;
    public phone!: string;
    public email!: string;
    public site!: string;
    public CNPJ!: string;
    public logo!: string;
}

Client.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      clientName: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      email: { type: DataTypes.TEXT },
      site: { type: DataTypes.STRING },
      CNPJ: { type: DataTypes.STRING },
      logo: { type: DataTypes.STRING },
    },{
      sequelize,
      tableName: 'client',
    }
);