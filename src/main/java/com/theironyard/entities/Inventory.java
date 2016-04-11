package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by drewmunnerlyn on 4/8/16.
 */
@Entity
@Table(name = "inventories")
public class Inventory {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String category;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    int quantityAvailable;

    @Column(nullable = false)
    double price;

    @ManyToOne
    User user;

    public Inventory() {
    }

    public Inventory(String category, String name, int quantityAvailable, double price, User user) {
        this.category = category;
        this.name = name;
        this.quantityAvailable = quantityAvailable;
        this.price = price;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(int quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
