
import {ApiProperty} from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity({name: 'seo-pages'})
export class SeoPages{

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Главная страница', description: 'Название страницы'})
    @Column({ type: 'text',
        nullable: true}
    )
    name: string;

    @ApiProperty({example: 'page', description: '1 уровень url'})
    @Column({ type: String,
        nullable: true}
    )
    url_1: string;

    @ApiProperty({example: 1, description: 'Тип страницы 1'})
    @Column({ type: Number,
        nullable: true}
    )
    url_1_type: number;

    @ApiProperty({example: 'page', description: '2 уровень url'})
    @Column({ type: String,
        nullable: true}
    )
    url_2: string;

    @ApiProperty({example: 1, description: 'Тип страницы 2'})
    @Column({ type: Number,
        nullable: true}
    )
    url_2_type: number;

    @ApiProperty({example: 'page', description: '3 уровень url'})
    @Column({ type: String,
        nullable: true}
    )
    url_3: string;

    @ApiProperty({example: 1, description: 'Тип страницы 3'})
    @Column({ type: Number,
        nullable: true}
    )
    url_3_type: number;

    @ApiProperty({example: 'page', description: '4 уровень url'})
    @Column({ type: String,
        nullable: true}
    )
    url_4: string;

    @ApiProperty({example: 1, description: 'Тип страницы 4'})
    @Column({ type: Number,
        nullable: true}
    )
    url_4_type: number;

    @ApiProperty({example: 'Заголовок страницы', description: 'Заголовок страницы title'})
    @Column({ type: 'text',
        nullable: true}
    )
    title: string;

    @ApiProperty({example: 'Описание страницы', description: 'Описание страницы description'})
    @Column({ type: 'text',
        nullable: true}
    )
    description: string;

    @ApiProperty({example: 'Заголовок h1', description: 'Описание страницы h1'})
    @Column({ type: 'text',
        nullable: true}
    )
    h1: string;

    @ApiProperty({example: true, description: 'Индекс страницы'})
    @Column({ type: Boolean,
        nullable: true}
    )
    pageIndex: boolean;

}


