import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from "typeorm"
import Token from "./token.entity"
import Task from "./task.entity"
import Machi from "./machi.entity"

@Entity()
export default class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
    
    @Column()
    email!: string
    
    @Column()
    password!: string

    @OneToMany(() => Token, token => token.user)
    tokens!:Token[]

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[]

    @OneToMany(() => Machi, machi => machi.user)
    machis!: Machi[]
}   