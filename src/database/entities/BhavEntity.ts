import { Column,  Entity, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm';
@Entity('bhav')
export class BhavEntity {
    /*
     @PrimaryGeneratedColumn()
    "id": number;
    */

    @PrimaryColumn('text')
    "symbol": string;

    @PrimaryColumn('text')
    "series": string;

    @Column({type: 'decimal'})
    "open": number;

    @Column({type: 'decimal'})
    "high": number;

    @Column({type: 'decimal'})
    "low": number;
    
    @Column({type: 'decimal'})
    "close": number;

    @Column({type: 'decimal'})
    "last": number;

    @Column({type: 'decimal'})
    "previous_close": number;

    @Column({type: 'decimal'})
    "total_traded_quantity": number;

    /* @Column({type: 'float64'})
    "total_traded_value": string; */
    
    @Column({ type: 'decimal', precision: 20, scale: 2, default: 0  })
    "total_traded_value": number; 
    
    @PrimaryColumn()
    "timestamp": string;

    @Column({type: 'decimal'})
    "total_trades": number;

    @Column('text')
    "isin": string;
}
