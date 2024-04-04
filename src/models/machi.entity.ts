import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import User from "./user.entity"

@Entity()
export default class Machi extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    status!: boolean

    @Column({name: 'user_id'})
    userId!: number

    @ManyToOne(() => User, user => user.machis)
    user!: User

}