package com.restapi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "medias")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    String type;

    @Column(name = "image")
    private String image;

    @Column(name = "video")
    private String video;

    @Column(name = "pdf")
    private String pdf;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;
}
